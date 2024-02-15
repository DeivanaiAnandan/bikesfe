import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  Input,
  Divider,
  DatePicker,
  Checkbox,
  Modal,
} from "antd";
import { getAllBikes } from "../redux/actions/bikesActions";
import { bookBike } from "../redux/actions/bookingActions";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';

import 'aos/dist/aos.css'; 
const { RangePicker } = DatePicker;

function BookingBike() {
  const navigate = useNavigate(); // Use the useNavigate hook to navigate
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [bike, setBike] = useState([]);
  const dispatch = useDispatch();
  const { bikeid } = useParams();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ridingGears, setRidingGears] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // console.log(bikeid)

  useEffect(() => {
    if (bikes.length == 0) {
      dispatch(getAllBikes());
    } else {
      setBike(bikes.find((o) => o._id === bikeid));
    }
  }, [bikes]);

  useEffect(() => {
    setTotalAmount(totalHours * bike.pricePerHour);

    if (ridingGears) {
      setTotalAmount(totalAmount + 20 * totalHours);
    }
  }, [ridingGears, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
    // console.log(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
    setTo(moment(values[1].$d).format("MMM DD YYYY HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

 
  function onToken(token){
    console.log(token)
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      bike: bike._id,
      totalHours,
      totalAmount,
      ridingGearsRequired: ridingGears,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookBike(reqObj));
  }

  return (
    <>
      <DefaultLayout>
        <>
          {loading && <Spinner />}
          <Row
            justify="center"
            className="d-flex justify-content-between align-items-center"
            style={{ minHeight: "90vh" }}
          >
            <Col lg={10} sm={24} xs={24} className="p-3">
              <img
                src={bike.image}
                className="bikeimg2 bs1 w-100"
                data-aos="flip-left"
                data-aos-duration="1500"
              /> 
            </Col>
            <Col lg={10} sm={24} xs={24} className="text-right">
              <Divider
                type="horizontal"
                dashed
                style={{ borderColor: "orangered", borderWidth: "0px" }}
              >
                Bike Info
              </Divider>
              <div style={{ textAlign: "right" }} className='p-3'>
                <p>{bike.name}</p>
                <p>{bike.pricePerHour} Price Per hour /-</p>
              </div>
              <Divider
                type="horizontal"
                dashed
                style={{ borderColor: "orangered", borderWidth: "0px" }}
              >
                Select Time Slots
              </Divider>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="MMM DD YYYY HH:mm"
                onChange={selectTimeSlots}
              />
              <br />
              <button
                className="btn1 mt-2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                See Booked Time Slots
              </button>
              {from && to && (
                <div style={{ textAlign: "right" }} className='p-3'>
                  <p>Total Hours: {totalHours}</p>
                  <p>
                    Price Per hour: <b>{bike.pricePerHour}</b>
                  </p>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRidingGears(true);
                      } else {
                        setRidingGears(false);
                      }
                    }}
                  >
                    Require Riding Gears
                  </Checkbox>
                  <h3>Total Amount : {totalAmount}</h3>
                  <StripeCheckout
                  shippingAddress
        token={onToken}
        currency="INR"
        amount={totalAmount*100}
        stripeKey="pk_test_51OWapgSJm2ijl0R8LmtJVfwUIPAxuZAmXOyCmEBD8lFEgFjR0B0GLXwBm8cQzk7smr7z9qG0vJvNnrw3YqWr8nlG006XGSYGYm"
      >

                  <button className="btn1" >
                    Book Now
                  </button>
                  </StripeCheckout>
                </div>
              )}
            </Col>
            {bike.name && (
              <Modal
                open={showModal}
                closable={false}
                footer={false}
                title="Booked Time Slots"
              >
                <div className="p-2">
                  {bike.bookedTimeSlots.map((slot,index) => {
                    return ( 
                      <button key={index} className="btn1 mt-2">
                        {/* {slot.from}-{slot.to} */}
                        {moment(slot.from).format('MMM DD yyyy HH:mm')}-{moment(slot.to).format('MMM DD yyyy HH:mm')}

                      </button>
                    );
                  })}
                  <div className="text-right mt-5">
                    <button
                      className="btn1"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </Row>
        </>
      </DefaultLayout>
    </>
  );
}

export default BookingBike;

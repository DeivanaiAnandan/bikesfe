import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllBikes } from "../redux/actions/bikesActions";
import { Button, Row, Col, DatePicker, Flex } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";
import { deleteBike } from "../redux/actions/bikesActions";
AOS.init();

const { RangePicker } = DatePicker;

function AdminHome() {
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalbikes, setTotalbikes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, []);

  useEffect(() => {
    setTotalbikes(bikes);
  }, [bikes]);

  return (
    <>
      <DefaultLayout>
        <Row justify="center" gutter={16} className="mt-2">
          <Col lg={20} sm={24}>
            <div className="d-flex admbtn" >
              <h3 >Admin Panel</h3>
              <button className="btn1 pdbtn" >
                <a href="/addbike">Add Bike</a>
              </button>
            </div>
          </Col>
        </Row>

        {loading == true && <Spinner />}
        {/* <h1>Home Page</h1>
        <h1>The length of bikes array is {bikes.length}</h1> */}
        {/* <Button type="primary">Antd Button</Button> */}
        <Row justify="center" gutter={16} className="mt-5">
          {totalbikes.map((bikes) => {
            return (
              <Col key={bikes._id} lg={5} sm={24} xs={24}>
                <div className="bike p-2 bs1">
                  <img src={bikes.image} className="bikeimg" />

                  <div className="bike-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p>{bikes.name}</p>
                      <p> Price Per Hour {bikes.pricePerHour} /-</p>
                    </div>

                    <div className="mr-4">
                      <Link to={`/editbike/${bikes._id}`}>
                        <EditOutlined
                          className="mr-5"
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </Link>
                    </div>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this bike?"
                      onConfirm={() => {dispatch(deleteBike({bikeid : bikes._id}))}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </>
  );
}

export default AdminHome;

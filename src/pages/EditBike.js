import React , {useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { addBike, editBike } from '../redux/actions/bikesActions';
import { getAllBikes } from '../redux/actions/bikesActions'
import { useNavigate, useParams } from "react-router-dom";

function EditBike() {
const {bikes} = useSelector(state=>state.bikesReducer)
const dispatch = useDispatch();
const [bike, setBike] = useState();
const { bikeid } = useParams();
const [totalbikes, setTotalbikes] = useState([]);

useEffect(() => {
    if (bikes.length == 0) {
        dispatch(getAllBikes());
      } else {
        setTotalbikes(bikes);
        setBike(bikes.find((o) => o._id === bikeid));
        console.log(bike)
      }
    }, [totalbikes]);


  function onFinish(values){
    values._id = bike._id;
   
    dispatch(editBike(values))
    console.log(values)
  }


  return (
    <DefaultLayout>
        <Row justify='center mt-5'>
          <Col lg={12} sm={24} xs={24} className='p-2'>
            {totalbikes.length>0 && (<Form initialValues={bike} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
              <h3>Edit Bike</h3>
              
              <Form.Item name='name' label='Bike name' rules={[{required:true}]}>
                <Input></Input>
              </Form.Item>
              <Form.Item name='image' label='Image Url' rules={[{required:true}]}>
                <Input></Input>
              </Form.Item>
              <Form.Item name='pricePerHour' label='Price per hour' rules={[{required:true}]}>
                <Input></Input>
              </Form.Item>
              <Form.Item name='mileage' label='Mileage' rules={[{required:true}]}>
                <Input></Input>
              </Form.Item>
              <div className='text-right'>
              <button>Edit Bike</button>
              </div>
              
            </Form>)}
            
          </Col>
        </Row>
    </DefaultLayout>
  )
}

export default EditBike
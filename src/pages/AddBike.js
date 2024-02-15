import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux';
import { addBike } from '../redux/actions/bikesActions';

function AddBike() {

const dispatch = useDispatch();

  function onFinish(values){
    values.bookedTimeSlots=[];
    dispatch(addBike(values))
    console.log(values)
  }


  return (
    <DefaultLayout>
        <Row justify='center mt-5'>
          <Col lg={12} sm={24} xs={24} className='p-2'>
            <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
              <h3>Add New Bike</h3>
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
              <button>Add Bike</button>
              </div>
              
            </Form>
          </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddBike
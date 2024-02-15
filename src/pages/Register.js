import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from '../redux/actions/userActions'
import Spinner from '../components/Spinner';
import DefaultLayout from "../components/DefaultLayout";

function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
  function onFinish(values) {
    dispatch(userRegister(values))
    console.log(values)
}
  return (
    <>
      <div className="login">
      {loading && (<Spinner />)}
        <Row gutter={16} className="d-flex align-items-center">

          <Col lg={16} style={{ position: "relative" }}>
            <img 
            data-aos='slide-left'
            data-aos-duration='1500'
            src="https://raw.githubusercontent.com/DeivanaiAnandan/bikeimages/main/bullet350.webp?token=GHSAT0AAAAAACIV4LEQPLJO7HGMQUCFNAE6ZM6S3LA"></img>
            <h1 className="login-logo">DEVBIKES</h1>
          </Col>
          
          <Col lg={8} className="text-left p-5">
            <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
              <h1>Register</h1>
              <hr />
              <Form.Item
                name="username" 
                label="Username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                name="cpassword"
                label="Confirm Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>

              <button className="btn1 mt-2">Register</button>

              <hr />

              <Link to="/login">Click Here to Login</Link>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Register;

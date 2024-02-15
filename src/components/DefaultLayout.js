import React from "react";
import { Menu, Button, Dropdown, Row, Col } from "antd";
import { Link } from "react-router-dom";
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menu = (
    <Menu>
        <Menu.Item>
        <a
         
          href="/"
        >
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          
          href="/userbookings"
        >
          My Bookings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
         
          href="/admin"
        >
          Admin
        </a>
      </Menu.Item>
      <Menu.Item onClick={()=>{
          localStorage.removeItem('user');
          window.location.href='/login'
      }}>
          <li style={{color:'orangered'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} xs={24} sm={24}>
          <div className="d-flex justify-content-between">
          <h1><b><Link to='/' style={{color:'orangered', textDecoration:'none'}}>DevBikes</Link></b></h1>
          <Dropdown overlay={menu} placement="bottom">
            <Button>{user.username}</Button>
          </Dropdown>
        </div>
          </Col>
        </Row>
       
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
      <hr />

           <p>Desinged and Developed By</p>

           

           <p>DEV</p></div>
    </>
  );
}

export default DefaultLayout;

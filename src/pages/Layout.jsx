import React from "react";
import {Outlet} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css';
import Card from 'react-bootstrap/Card';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHeart);
const Layout = () => {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container className="myMargin">
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{active:'white'}} href="/courses">Courses</Nav.Link>
            <Nav.Link href="/addNewCourse">Add new course</Nav.Link>
          </Nav>
          </Container>
        </Navbar> 
        <Outlet />

        <Card.Footer className="text-center" style={{ marginLeft: '30px', marginBottom: '40px', marginRight: '30px', marginTop:'20px', borderRadius:0, border:'none', backgroundColor:'#f8f9fa', padding:'10px'}}>
          <Card.Body>
            <Card.Text>Made with <FontAwesomeIcon icon=" fa-solid fa-heart" color="red" /> love in Athens, Greece</Card.Text>
          </Card.Body>
        </Card.Footer>
      </>
    );
};

export default Layout;
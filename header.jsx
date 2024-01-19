import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "./Logo/Arixa Logo-02.svg";

class CustomNavbar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="primary" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="Logo"
              width="auto"
              height="30"
              className="d-inline-block align-top logo-react"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
            <Nav className="justify-content-center">
              <Nav.Link href="/" className=" words">
                Home
              </Nav.Link>
              {/* Blocks link (non-React page) */}
              <Nav.Link href="/block" className=" words">
                Blocks
              </Nav.Link>
              {/* Script link (React page) */}
              <Nav.Link as={Link} to="/script" className=" words">
                Script
              </Nav.Link>
              {/* Add other navigation links as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default CustomNavbar;

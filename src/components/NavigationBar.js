import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";

const NavigationBar = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <img src={logo} className="App-logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Feed</Nav.Link>
            <NavDropdown title="Groups" id="basic-nav-dropdown">
              <NavDropdown.Item >Baby</NavDropdown.Item>
              <NavDropdown.Item >Toddler</NavDropdown.Item>
              <NavDropdown.Item >Small Child</NavDropdown.Item>
              <NavDropdown.Item >Healthcare</NavDropdown.Item>
              <NavDropdown.Item >Activities</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>My Network</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

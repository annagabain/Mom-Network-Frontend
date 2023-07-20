import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} className="App-logo left" alt="logo" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink exact to="/" activeClassName="Active">
              Home
            </NavLink>

            <NavLink exact to="/feed"  activeClassName="Active">
              Feed
            </NavLink>

            {/* <NavDropdown title="Groups" id="basic-nav-dropdown">
              <NavDropdown.Item>Baby</NavDropdown.Item>
              <NavDropdown.Item>Toddler</NavDropdown.Item>
              <NavDropdown.Item>Small Child</NavDropdown.Item>
              <NavDropdown.Item>Healthcare</NavDropdown.Item>
              <NavDropdown.Item>Activities</NavDropdown.Item>
            </NavDropdown> */}

            <NavLink exact to="/network"  activeClassName="Active">
              Network
            </NavLink>
          </Nav>
        </Navbar.Collapse>

        <NavLink exact to="/login"  activeClassName="Active">
          Log In
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

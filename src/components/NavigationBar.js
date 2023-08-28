import "../App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavigationBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>Hello {currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink exact to="/login" activeClassName="Active">
        Login
      </NavLink>
      <NavLink exact to="/register" activeClassName="Active">
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="App-logo left" alt="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row>
            <Nav className="me-auto">
              <Col sm={12} className="text-same-line left">
                <NavLink exact to="/create" activeClassName="Active">
                  + New Post
                </NavLink>

                <NavLink exact to="/" activeClassName="Active">
                  Home
                </NavLink>

                <NavLink exact to="/feed" activeClassName="Active">
                  Feed
                </NavLink>

                {/* <NavDropdown
                  title="Groups"
                  id="basic-nav-dropdown"
                  activeClassName="Active"
                >
                  <NavLink exact to="/groups/baby" activeClassName="active">
                    Baby
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/toddler" activeClassName="active">
                    Toddler
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/small-child"
                    activeClassName="active"
                  >
                    Small Child
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/healthcare"
                    activeClassName="active"
                  >
                    Healthcare
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/activities"
                    activeClassName="active"
                  >
                    Activities
                  </NavLink>
                </NavDropdown> */}

                <NavLink exact to="/network" activeClassName="Active">
                  Network
                </NavLink>
              </Col>
              {/* <div className="ms-auto"> */}
              <Col sm={12} className="text-same-line right">
                  <h5>{currentUser ? loggedInIcons : loggedOutIcons}</h5>
              </Col>
            </Nav>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

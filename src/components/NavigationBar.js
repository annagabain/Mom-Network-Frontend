import "../App.css";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

import axios from "axios";
import { Container } from "react-bootstrap";

const NavigationBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavDropdown
        title={
          currentUser ? (
            <>
              Hello {currentUser.username}
              {currentUser.profile_image && (
                <img
                  alt="profile"
                  src={currentUser.profile_image}
                  style={{
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                />
              )}
            </>
          ) : (
            "Guest"
          )
        }
      >
        <NavLink to="/" onClick={handleSignOut}>
          Log out
        </NavLink>
      </NavDropdown>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/register">
        Register
      </NavLink>
    </>
  );

  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <Navbar expand="lg">
              <Navbar.Brand>
                <img src={logo} className="App-logo" alt="logo" />
              </Navbar.Brand>
              <div className="green"></div>

              <Navbar.Toggle />

              <Navbar.Collapse>
                <NavLink exact to="/feed">
                  Feed
                </NavLink>
                <NavLink exact to="/mom-network">
                  Mom-Network
                </NavLink>
                <NavDropdown title="Thematic-Pages" id="basic-nav-dropdown">
                  <NavLink exact to="/pages">
                    All
                  </NavLink>
                  <NavLink exact to="/pages/1">
                    Baby
                  </NavLink>

                  <NavLink exact to="/pages/2">
                    Toddler
                  </NavLink>

                  <NavLink exact to="/pages/3">
                    Small Child
                  </NavLink>

                  <NavLink exact to="/pages/4">
                    Healthcare
                  </NavLink>

                  <NavLink exact to="/pages/5">
                    General Activities
                  </NavLink>
                </NavDropdown>
                {/* Conditionally show "+ New Post" NavLink only on xs screens */}
                <NavLink
                  exact
                  to="/createnewpost"
                  className="d-md-none" // This class hides the NavLink on screens larger than xs
                >
                  + New Post
                </NavLink>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col md={4} style={{ padding: "1.5rem" }}>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavigationBar;

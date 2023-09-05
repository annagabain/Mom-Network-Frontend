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
      Hello {currentUser?.username}
      {currentUser?.profile_image && (
        <img
          alt="profile"
          src={currentUser?.profile_image}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            marginLeft: "10px",
          }}
        />
      )}
      <NavLink to="/" onClick={handleSignOut}>
        Log out
      </NavLink>
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
                <NavLink exact to="/network">
                  Network
                </NavLink>
                <NavDropdown title="Groups" id="basic-nav-dropdown">
                  <NavLink exact to="/groups/baby">
                    Baby
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/toddler">
                    Toddler
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/small-child">
                    Small Child
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/healthcare">
                    Healthcare
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/activities">
                    Activities
                  </NavLink>
                </NavDropdown>
                <NavLink exact to="/createnewpost">
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

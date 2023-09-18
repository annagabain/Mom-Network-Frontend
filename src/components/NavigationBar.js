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
        <NavLink to={`/profiles/${currentUser.pk}`}>My profile</NavLink>
        <br></br>
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
                <NavDropdown title="Thematic-Groups" id="basic-nav-dropdown">
                  <NavLink exact to="/thematic-groups">
                    All
                  </NavLink>
                  <NavLink exact to="/thematic-groups/1">
                    <i className="fa-solid fa-baby-carriage"></i> Baby
                  </NavLink>

                  <NavLink exact to="/thematic-groups/2">
                    <i className="fa-solid fa-baby"> </i> Toddler
                  </NavLink>

                  <NavLink exact to="/thematic-groups/3">
                    <i className="fa-solid fa-child-dress"></i> Small Child
                  </NavLink>

                  <NavLink exact to="/thematic-groups/4">
                    <i className="fa-solid fa-hands-holding-child"></i>{" "}
                    Healthcare
                  </NavLink>

                  <NavLink exact to="/thematic-groups/5">
                    <i className="fa-regular fa-calendar"></i> General
                    Activities
                  </NavLink>
                </NavDropdown>
                <NavLink exact to="/newsletter">
                  Newletter
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

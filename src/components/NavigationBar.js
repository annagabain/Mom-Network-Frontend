import "../App.css";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavigationBar = () => {
  const currentUser = useCurrentUser();
  
  const loggedInIcons = <>hello {currentUser?.username}</>;
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
      <Navbar.Brand>
        <img src={logo} className="App-logo left" alt="logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink exact to="/" activeClassName="Active">
            Home
          </NavLink>

          <NavLink exact to="/feed" activeClassName="Active">
            Feed
          </NavLink>

          <NavDropdown title="Groups" id="basic-nav-dropdown" activeClassName="Active">
            <NavLink exact to="/groups/baby" activeClassName="active">
              Baby
            </NavLink>
            <br />
            <NavLink exact to="/groups/toddler" activeClassName="active">
              Toddler
            </NavLink>
            <br />
            <NavLink exact to="/groups/small-child" activeClassName="active">
              Small Child
            </NavLink>
            <br />
            <NavLink exact to="/groups/healthcare" activeClassName="active">
              Healthcare
            </NavLink>
            <br />
            <NavLink exact to="/groups/activities" activeClassName="active">
              Activities
            </NavLink>
          </NavDropdown>

          <NavLink exact to="/network" activeClassName="Active">
            Network
          </NavLink>

          <div className="ms-auto">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

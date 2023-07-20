import React from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const HomePageIntro = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <h1>Mom Network</h1>
      <h2>share ideas with other parents</h2>
      <br />

      <NavLink exact to="/login">
        <Button className="button">Log In</Button>
      </NavLink>
      <span>or</span>
      <NavLink exact to="/register">
        <Button className="button" variant="primary">
          Register
        </Button>
      </NavLink>
      <br />
      <br />
    </>
  );
};

export default HomePageIntro;

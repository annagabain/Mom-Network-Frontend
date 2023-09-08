import React, { useState } from "react";
// import React, { useContext, useState } from "react";
import axios from "axios";
// import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// import { Link, useHistory } from "react-router-dom";
import {useHistory} from "react-router-dom";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// import { SetCurrentUserContext } from "../../App";

function LogInForm() {
  const setCurrentUser = useSetCurrentUser();
  // const setCurrentUser = useContext(SetCurrentUserContext);

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = logInData;
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      history.push("/feed");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <br />
      {/* <h3>Login</h3> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="d-none">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.username?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.password?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Button className="button" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {/* <Container className="mt-3">
        <Link to="/register">
          Don't have an account? <span>Register</span>
        </Link>{" "}
      </Container> */}

    </>
  );
}

export default LogInForm;

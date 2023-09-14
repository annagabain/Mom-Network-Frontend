import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios"; // Import Axios for making API requests

function SubscribeToNewsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Make a POST request to the newsletter subscription API
      const response = await axios.post(
        "https://mom-network-backend.herokuapp.com/newsletter/",
        formData
      );
  
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Subscription successful!");
        setErrorMessage("");
        // Clear the form
        setFormData({
          name: "",
          email: "",
        });
      } else {
        setSuccessMessage("");
        setErrorMessage("Subscription failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setSuccessMessage("");
      setErrorMessage("Subscription failed. Please try again later.");
    }
  };
  

  return (
    <div>
        <br></br>
      <h2>Subscribe to Newsletter</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Subscribe</Button>
      </Form>
    </div>
  );
}

export default SubscribeToNewsletter;

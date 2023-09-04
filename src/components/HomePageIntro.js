import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import homepageImageSrc from "../images/pexels-pixabay-51953.jpg";
import "../App.css";

const HomePageIntro = () => {
  const currentUser = useCurrentUser(); // Get the current user
  return (
    <>
      <br />
      <br />
      <br />
      <div className="home-page-intro">
        <Container>
          <Row>
            <Col xs={8} md={6}>
              <div className="background-image">
                <img
                  src={homepageImageSrc}
                  alt="Mother holding a child at sunset"
                />
              </div>
            </Col>
            <Col xs={8} md={6}>
              <div className="title">
                <h1>Mom Network</h1>
                <h2>Share ideas with other parents</h2>
              </div>
              <br />
              <br />
              <br />
              {/* Conditionally render the buttons */}
              {!currentUser ? ( // If there's no logged-in user
                <>
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
              ) : null}
              ----------Login component here and navbar hidden
              <br></br>
              ----------Then redirect to Feed and hide this page, revealing the
              navbar
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer">
        <br></br>
        <div>Image credit: pexels-pixabay-51953</div>
      </footer>
    </>
  );
};

export default HomePageIntro;

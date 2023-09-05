import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import homepageImageSrc from "../images/pexels-pixabay-51953.jpg";
import "../App.css";

import LogInForm from "../pages/auth/LogInForm";

const HomePageIntro = () => {
  return (
    <>
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
            <Col xs={12} md={6}>
              <div className="title">
                {/* <h1>Mom Network</h1> */}
                <h1 className="text-center text-md-start d-none d-sm-block">
                  Mom Network
                </h1>
                <h2 className="text-center text-md-start d-none d-sm-block">
                  Share ideas with other parents
                </h2>

                <h3 className="d-block d-sm-none text-center text-md-start">
                  Mom Network
                </h3>
                <h6 className="d-block d-sm-none text-center text-md-start">
                  Share ideas with other parents
                </h6>
              </div>
              <br />
              <br />
              <br />
              <LogInForm />
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

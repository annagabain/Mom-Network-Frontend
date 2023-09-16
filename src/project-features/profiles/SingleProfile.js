import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Form, Row } from "react-bootstrap";
import MessagesApiComponent from "../messages/MessagesApiComponent";
// import SingleMessage from "../messages/SingleMessage";
import CreateNewMessage from "../messages/CreateNewMessage";

function SingleProfile() {
  const { profileId } = useParams();
  const history = useHistory();

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific profile using the profileId parameter
    axiosReq
      .get(`/profiles/${profileId}`)
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);

  return (
    <>
      <div>
        <br />
        <br />
        {/* <h2>Profile Details</h2> */}
        <Button
          className="button left"
          onClick={() => {
            history.push("/mom-network"); // Navigate back to the profiles list
          }}
        >
          Go back to Profiles
        </Button>
        <br />
        <br />
        <br />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Row>
            <Col xs={12} md={8}>
              <Card className="mb-3">
                <Card.Body>
                  {/* Edit profile if owner */}
                  <Row>
                    {profile.is_owner && (
                      <div>
                        {" "}
                        {/* Edit */}
                        <i
                          className="fa-solid fa-pen btn right"
                          onClick={() => {
                            history.push(`/edit-profile/${profile.id}`);
                          }}
                        ></i>
                      </div>
                    )}
                  </Row>
                  <br />

                  <Row>
                    <Col xs={6} md={4}>
                      {profile.image && (
                        <img
                          src={profile.image}
                          alt={`Profile of ${profile.owner}`}
                          style={{
                            borderRadius: "50%",
                            width: "180px",
                            height: "180px",
                          }}
                        />
                      )}
                    </Col>
                    <Col xs={12} md={8}>
                      <h4>{profile.owner}</h4>

                      <p>Name: {profile.name}</p>
                      <p>Member since: {profile.created_at}</p>
                      <p>Bio: {profile.content}</p>
                    </Col>
                  </Row>
                  <br></br>

                  {/* A placeholder for following a Profile (User) */}
                  <p>
                    {" "}
                    FOLLOW{" "}
                    <i
                      className="fa-solid fa-user-plus"
                      style={{ fontSize: "36px", color: "beige" }}
                    ></i>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <CreateNewMessage
                profileId={profileId}
                profileOwner={profile.owner}
              />
              <br></br>
              <br></br>
              <br></br>
              <MessagesApiComponent
                profileId={profileId}
                profileOwner={profile.owner}
              />
              <br></br>
              {/* <SingleMessage/> */}
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default SingleProfile;

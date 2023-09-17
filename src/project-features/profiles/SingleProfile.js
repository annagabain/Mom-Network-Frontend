import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import MessagesApiComponent from "../messages/MessagesApiComponent";
import CreateNewMessage from "../messages/CreateNewMessage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const SingleProfile = () => {
  const currentUser = useCurrentUser();
  const { profileId } = useParams();
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log("profileId", profileId)

  useEffect(() => {
    // Fetch the specific profile using the profileId parameter
    axiosReq
      .get(`/profiles/${profileId}`)
      .then((response) => {
        console.log("Profile API Response:", response.data); // Log the response data
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);

  const profileOwner = profile.owner;

  const isCreateNewMessageVisible =
    currentUser && currentUser.username !== profile.owner;

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
          <>
            <Row>
              <Col
                id="Profile details"
                xs={12}
                md={isCreateNewMessageVisible ? 8 : 12}
              >
                <Card className="mb-3">
                  <Card.Body>

                    {/* Edit profile if owner */}
                    <Row>
                      {profile.is_owner && (
                        <div>
                          <h2>My Profile</h2>
                          <Button
                            className="button btn right"
                            onClick={() => {
                              history.push(`/edit-profile/${profile.id}`);
                            }}
                          >
                            <i className="fa-solid fa-pen icon-inside-button"></i>
                            Edit
                          </Button>
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
                        Username: <h4>{profile.owner}</h4>
                        <p>Full Name: {profile.name}</p>
                        <p>Member since: {profile.created_at}</p>
                        <p>Bio: {profile.content}</p>
                      </Col>
                    </Row>
                    <br></br>

                    {/* A placeholder for following a Profile (User) */}
                    {/* <p>
                      {" "}
                      FOLLOW{" "}
                      <i
                        className="fa-solid fa-user-plus"
                        style={{ fontSize: "36px", color: "beige" }}
                      ></i>
                    </p> */}
                  </Card.Body>
                </Card>
              </Col>

              {/* Create New message card is here */}
              {isCreateNewMessageVisible && (
                <Col xs={12} md={4} id="CreateNewMessage">
                  <CreateNewMessage
                    profile={profile}
                    profileId={profileId}
                    profileOwner={profileOwner}
                  />
                  <br></br>
                </Col>
              )}
            </Row>

            {/* Existing messages to this profile owner are here */}
            <Row>
              <MessagesApiComponent
                profile={profile}
                profileId={profileId}
                profileOwner={profileOwner}
              />
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProfile;

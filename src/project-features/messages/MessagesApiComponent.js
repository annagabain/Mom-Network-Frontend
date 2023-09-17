import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const MessagesApiComponent = (profile, profileOwner) => {
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]); // Store profiles data

  // console.log("Profile Owner:", profile.profileOwner);
  // console.log("Current User's username:", currentUser.username);

  useEffect(() => {
    setLoading(true);

    if (currentUser) {
      fetch(
        `https://mom-network-backend.herokuapp.com/messages/?sender=${currentUser}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData.results);
          console.log("data", responseData.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            "Could not fetch the Mom Network API because of this error: ",
            error.message
          );
          setLoading(false);
        });
      // Fetch profiles data
      fetch("https://mom-network-backend.herokuapp.com/profiles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setProfiles(responseData.results);
        })
        .catch((error) => {
          console.log("Could not fetch profiles:", error.message);
        });
    }
  }, [currentUser, profileOwner]);

  const getProfileImage = (senderUsername) => {
    const matchingProfile = profiles.find(
      (profile) => profile.owner === senderUsername
    );
    return matchingProfile ? matchingProfile.image : null;
  };

  return (
    <>
      <div className="left" style={{ width: "100%" }}>
        {/* <i style={{ color: "green" }}>Fetching Messages Test:</i> */}
        <br></br>
        <br></br>

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          data
            .filter(
              (message) => message.recipient_username === profile.profileOwner
            )

            .map((message) => (
              <Container key={message.id}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col sm={4}>
                        <Row className="left">
                          <Card.Subtitle className="mb-2 text-muted left">
                            From: {message.sender_username}{" "}
                            {getProfileImage(message.sender_username) && (
                              <img
                                src={getProfileImage(message.sender_username)}
                                alt="Sender's Profile"
                                style={{
                                  borderRadius: "50%",
                                  width: "50px",
                                  height: "50px",
                                }}
                              />
                            )}
                          </Card.Subtitle>
                        </Row>
                      </Col>
                      <Col sm={12}>
                        <Card.Text className="mb-2">
                          Subject: {message.title}{" "}
                        </Card.Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={4} className="left">
                        {/* <Card.Subtitle className="mb-2 text-muted left">
                          To: {message.recipient_username}
                        </Card.Subtitle> */}
                      </Col>
                      <Col sm={12}>
                        <Card.Title>{message.message_content}</Card.Title>
                      </Col>{" "}
                      <Link
                        className="btn right"
                        to={`/profiles/${message.sender}`}
                      >
                        View {message.sender_username}'s Profile and leave a
                        message
                      </Link>
                    </Row>
                  </Card.Body>
                </Card>{" "}
                <br></br>
                <br></br>
              </Container>
            ))
        )}

        {!loading &&
          profile.profileOwner !== currentUser.username &&
          !data.some(
            (message) =>
              message.sender === currentUser.pk &&
              message.recipient_username === profile.profileOwner
          ) && (
            <>
              {" "}
              <p>
                No messages between you and {profile.profileOwner} just yet.
              </p>
              <p>Be the first to send a message!</p>
            </>
          )}
      </div>
    </>
  );
};

export default MessagesApiComponent;

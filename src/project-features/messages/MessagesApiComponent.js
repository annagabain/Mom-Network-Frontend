import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import CreateNewMessage from "../messages/CreateNewMessage";
import { Container } from "react-bootstrap";

const MessagesApiComponent = (profile, profileId, profileOwner) => {
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();

  console.log("Profile Owner:", profile.profileOwner);
  console.log("Current User's username:", currentUser.username);

  const [loading, setLoading] = useState(true);

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
          // console.log("data", responseData.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            "Could not fetch the Mom Network API because of this error: ",
            error.message
          );
          setLoading(false);
        });
    }
  }, [currentUser, profileOwner]);

  return (
    <>
      {currentUser && currentUser.username !== profile.profileOwner && (
        <CreateNewMessage
          profile={profile}
          profileId={profileId}
          profileOwner={profileOwner}
        />
      )}

      <br></br>
      <br></br>

      <div className="left" style={{ width: "100%" }}>
        {/* <i style={{ color: "green" }}>Fetching Messages Test:</i> */}
        <br></br>
        <br></br>

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          data
            .filter(
              (message) =>
                // message.sender === currentUser.pk &&
                message.recipient_username === profile.profileOwner
            )
            .map((message) => (
              <Container key={message.id}>
                <Card>
                  <Card.Body>
                    <Card.Text className="mb-2 left">Title: {message.title}</Card.Text>
                    <br></br>
                    <br></br>


                    <Card.Subtitle className="mb-2 text-muted left">
                      From: {message.sender_username} Add Avatar here
                    </Card.Subtitle>

                    <br></br>

                    <Card.Subtitle className="mb-2 text-muted left">
                      To: {message.recipient_username}
                    </Card.Subtitle>

                    <br></br>
                    <br></br>

                    <Card.Title>{message.message_content}</Card.Title>
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

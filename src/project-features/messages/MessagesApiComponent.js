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

      <div className="left">
        <i style={{ color: "green" }}>Fetching Messages Test:</i>
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
                    <div style={{ backgroundColor: "pink" }}>
                      <p className="left">From: {message.sender_username}</p>
                      <br></br>
                      <br></br>
                      <p className="left">To: {message.recipient_username}</p>
                      <br></br>
                    </div>

                    <div>
                    <br></br>

                      <p>Title: {message.title}</p>
                      <p>Message: {message.message_content}</p>
                    </div>
                  </Card.Body>
                </Card>
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

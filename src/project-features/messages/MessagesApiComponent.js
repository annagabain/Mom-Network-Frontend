import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import CreateNewMessage from "../messages/CreateNewMessage";

const MessagesApiComponent = (profile, profileId, profileOwner) => {
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();

  // console.log("Profile Owner:", profile.profileOwner);


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
      {currentUser && currentUser.username !== profileOwner && (
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
              <Card>
                <Card.Body>
                  <div key={message.id}>
                    <p>Title: {message.title}</p>
                    <p>Sender: {message.sender_username}</p>
                    <p>Recipient: {message.recipient_username}</p>
                    <p>Message: {message.message_content}</p>
                  </div>
                </Card.Body>
              </Card>
            ))
        )}

        {!loading &&
          !data.some(
            (message) =>
              message.sender === currentUser.pk &&
              message.recipient_username === profile.profileOwner
          ) && (
            <>
              {" "}
              <p>
                No messages between you and {profile.profileOwner}{" "}
                just yet.
              </p>
              <p>Be the first to send a message!</p>
            </>
          )}
      </div>
    </>
  );
};

export default MessagesApiComponent;

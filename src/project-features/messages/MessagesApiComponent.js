import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const MessagesApiComponent = (profileId, profileOwner) => {
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();
  const currentlyDisplayedProfileUsername = profileId
    ? profileId.profileOwner
    : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("Current User:", currentUser);
    // console.log("Profile Owner:", profileOwner);
    // console.log("ProfileId:", profileId);
    // console.log("ProfileId Owner:", profileId.profileOwner); //the username of the profile that is currently displayed

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
    }
  }, [currentUser]);

  return (
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
              message.sender === currentUser.pk &&
              message.recipient_username === currentlyDisplayedProfileUsername
          )
          .map((message) => (
            <div key={message.id}>
              <p>Title: {message.title}</p>
              <p>Sender: {message.sender_username}</p>
              <p>Recipient: {message.recipient_username}</p>
              <p>Message: {message.message_content}</p>
              <hr />
            </div>
          ))
      )}

      {!loading &&
        !data.some(
          (message) =>
            message.sender === currentUser.pk &&
            message.recipient_username === currentlyDisplayedProfileUsername
        ) && (
          <>
            {" "}
            <p>
              No messages between you and {currentlyDisplayedProfileUsername} just
              yet.
            </p>
            <p>Be the first to send a message!</p>
          </>
        )}
    </div>
  );
};

export default MessagesApiComponent;

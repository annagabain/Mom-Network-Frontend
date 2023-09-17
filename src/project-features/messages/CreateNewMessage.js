import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CreateMessageComponent = ({ profile, profileId, profileOwner }) => {
  const currentUser = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

//  console.log(profile.profileOwner)
//  console.log(profile.profileId)


  const handleMessageSubmit = async () => {
    setIsSubmitting(true);

    const messageData = {
      title: newTitle,
      sender: currentUser.pk,
      recipient: profile.profileId,
      recipient_username: profile.profileOwner,
      message_content: newMessage,
    };

    axiosReq
      .post("/messages/", messageData)
      .then(() => {
        axiosReq.get(`/messages/`).then((response) => {
          setIsSubmitting(false);
          setNewMessage("");
          setNewTitle("");
          // Handle the response data if needed
          console.log(response.data.results);
          console.log("Profile Owner (now recipient_username):", profile.profileOwner);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        console.log("Profile Owner (now recipient_username):", profile.profileOwner);

        setIsSubmitting(false);
      });
  };

  

  return (
    <>
      <p style={{ color: "green" }}>CreateNewMessage component sits inside the MessagesApiComponent:</p>

      <Card style={{ backgroundColor: "lightgrey" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>
                Write a Message to{" "}
                <span style={{ fontWeight: "bold" }}>{profile.profileOwner}</span>
                <br></br>
                <br></br>
                <i className="fa-regular fa-envelope fa-2xl"></i>
              </Form.Label>{" "}
              <br></br>
              <br></br>
              <Form.Control
                type="text"
                placeholder="Enter message title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button
              className="button"
              variant="primary"
              type="button"
              onClick={handleMessageSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Message"}
            </Button>
          </Form>
        </Card.Body>
      </Card>


    </>
  );
};

export default CreateMessageComponent;

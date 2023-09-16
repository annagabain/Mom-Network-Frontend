import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CreateMessageComponent = ({ profileId, profileOwner }) => {
  const currentUser = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("Current User:", currentUser.pk);
  console.log("ProfileId:", profileId);
  console.log("Profile Owner (will become recipient_username):", profileOwner);

  const handleMessageSubmit = async () => {
    setIsSubmitting(true);

    const messageData = {
      title: newTitle,
      sender: currentUser.pk,
      recipient: profileId,
      recipient_username: profileOwner,
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
          console.log("Profile Owner (now recipient_username):", profileOwner);
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <p>CreateNewMessage component</p>
      <Card
        style={{ backgroundColor: "lightgrey" }}
      >
        <Card.Body>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Write a Message &#9993;</Form.Label>
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
    </div>
  );
};

export default CreateMessageComponent;

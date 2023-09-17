import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"; 
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CreateMessageComponent = ({ profile }) => {
  const currentUser = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log("profile.owner", profile.owner);
  console.log("profile.id", profile.id);

  const handleMessageSubmit = async () => {
    setIsSubmitting(true);

    const messageData = {
      title: newTitle,
      sender: currentUser.pk,
      recipient: profile.id,
      recipient_username: profile.owner,
      message_content: newMessage,
    };

    axiosReq
      .post("/messages/", messageData)
      .then(() => {
        axiosReq.get(`/messages/`).then((response) => {
          setIsSubmitting(false);
          setNewMessage("");
          setNewTitle("");
          setShowSuccess(true); 
          // Handle the response data if needed
          console.log(response.data.results);
          console.log("Profile Owner (now recipient_username):", profile.owner);
          // window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        console.log("Profile Owner (now recipient_username):", profile.owner);

        setIsSubmitting(false);
      });
  };

  return (
    <>
      {/* <p style={{ color: "green" }}>CreateNewMessage component sits inside the MessagesApiComponent:</p> */}

      <Card style={{ backgroundColor: "lightgrey" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>
                Write a Message to{" "}
                <span style={{ fontWeight: "bold" }}>{profile.owner}</span>
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
           {/* Success message */}
           {showSuccess && (
            <Alert variant="success" className="mt-3">
              Message successfully sent!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateMessageComponent;

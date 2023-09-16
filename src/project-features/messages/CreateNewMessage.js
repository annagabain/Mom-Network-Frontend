import React, { useState} from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateNewMessage({ profileId }) {
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // Fetch messages for the current profile
  //   axiosReq
  //     .get(`/messages/?profile=${profileId}`)
  //     .then((response) => {
  //       setMessages(response.data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [profileId]);

  const handleMessageSubmit = () => {
    setIsSubmitting(true);

    // Create the message object to send to the API
    const messageData = {
      profile: profileId,
      message_text: newMessage,
    };

    axiosReq
      .profile("/messages/", messageData)
      .then(() => {
        // Refresh the messages after adding a new message
        axiosReq.get(`/messages/?profile=${profileId}`).then((response) => {
          // setMessages(response.data.results);
          setIsSubmitting(false);
          setNewMessage(""); // Clear the message input field
        });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };


  return (
    <div>
     <p>CreateNewMessage component</p>

      {/* Message Form */}
      <Card className="mb-3" style={{ width: "66%" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="message">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button
              className="button"
              type="submit"
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
}

export default CreateNewMessage;

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// import { useHistory, useParams, Link } from "react-router-dom";
import { useHistory, useParams} from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";

function EditMyMessage() {
  const [errors, setErrors] = useState({});
  const [messageData, setMessageData] = useState({
    message_text: "",
  });

  const { message_text } = messageData;
  const history = useHistory();
  const { messageId } = useParams();

  useEffect(() => {
    // Fetch message data based on messageId and populate the form fields
    const messageIdInt = parseInt(messageId, 10);
    if (isNaN(messageIdInt)) {
        // Handle the case where messageId is not a valid integer
        console.error("Invalid messageId:", messageId);
        return;
      }
    
      axiosReq
        .get(`/messages/${messageIdInt}`) // Use messageIdInt in the URL
        .then((response) => {
          const { message_text } = response.data;
          setMessageData({
            message_text,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Handle 404 error, e.g., display a message or redirect the user
            console.log("Message not found");
          } else {
            // Handle other errors
            console.log("Error fetching message data:", error);
          }
        });
    }, [messageId]);
  
  
  
  

  const handleChange = (event) => {
    setMessageData({
      ...messageData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if message_text is provided
    if (!message_text) {
      setErrors({ message_text: ["Please provide a message."] });
      return;
    }

    try {
      await axiosReq.put(`/messages/${messageId}`, messageData);
      history.goBack();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <h2>Edit Message</h2>
      <Form onSubmit={handleSubmit}>
        <div className="text-center">
          <Form.Group className="mb-3">
            <Form.Label>Edit Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="message_text"
              value={message_text}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.message_text?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button onClick={() => history.goBack()} className="button">
            Cancel
          </Button>
          <Button type="submit" className="button">
            Save Changes
          </Button>
          {/* <Link to={`/messages/${messageId}`} className="button">
            Go to Message
          </Link> */}
        </div>
      </Form>
    </>
  );
}

export default EditMyMessage;

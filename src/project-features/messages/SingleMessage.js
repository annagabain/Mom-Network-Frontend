import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function SingleMessage() {
  const { messageId } = useParams();
  const history = useHistory();

  const [message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State to manage the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axiosReq
      .get(`/messages/${messageId}`)
      .then((response) => {
        setMessage(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [messageId]);

  const handleDelete = () => {
    // Close the delete modal
    setShowDeleteModal(false);

    axiosReq.delete(`/messages/${messageId}`).then(() => {
      history.push("/feed"); // Redirect to the appropriate page after deletion
    });
  };

  return (
    <div>

      <br />
      <br />
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card className="mb-3" style={{ width: "66%" }}>
          <Card.Body>
            <p>
              {message.owner} {"  "}
              {message.profile_image && (
                <img
                  src={message.profile_image}
                  alt={`face ${message.owner.username}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}
            </p>
            <h4>{message.message_text}</h4>

            {/* Conditionally render the Edit and Delete buttons */}
            {message.is_owner && (
              <div>
                <Button
                  className="button right"
                  onClick={() => {
                    // Navigate to the edit page for this message
                    history.push(`/edit-message/${message.id}`);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  className="right"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </div>
            )}

            {/* Message Delete Confirmation Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this message?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      )}

    </div>
  );
}

export default SingleMessage;

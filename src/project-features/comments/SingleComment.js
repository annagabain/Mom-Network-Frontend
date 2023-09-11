import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditMyComment from "../comments/EditMyComment";

function SingleComment() {
  const { commentId } = useParams();
  const history = useHistory();

  const [comment, setComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State to manage the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axiosReq
      .get(`/comments/${commentId}`)
      .then((response) => {
        setComment(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentId]);

  const handleDelete = () => {
    // Close the delete modal
    setShowDeleteModal(false);

    axiosReq.delete(`/comments/${commentId}`).then(() => {
      history.push("/feed"); // Redirect to the appropriate page after deletion
    });
  };

  return (
    <div>
      <br />
      <br />
      <Button
        className="button left"
        onClick={() => {
          history.push("/feed");
        }}
      >
        Go back to your Feed
      </Button>
      <br />
      <br />
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card className="mb-3" style={{ width: "66%" }}>
          <Card.Body>
            <p>
              {comment.owner} {"  "}
              {comment.profile_image && (
                <img
                  src={comment.profile_image}
                  alt={`face ${comment.owner.username}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}
            </p>
            <h4>{comment.comment_text}</h4>

            {/* Conditionally render the Edit and Delete buttons */}
            {comment.is_owner && (
              <div>
                <Button
                  className="button right"
                  onClick={() => {
                    // Navigate to the edit page for this comment
                    history.push(`/edit-comment/${comment.id}`);
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

            {/* Comment Delete Confirmation Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this comment?
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

      {/* Render the EditMyComment component for editing */}
      {!isLoading && <EditMyComment commentId={comment.id} />}
    </div>
  );
}

export default SingleComment;

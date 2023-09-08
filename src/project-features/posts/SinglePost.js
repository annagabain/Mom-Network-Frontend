import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CommentApiComponent from "../comments/CommentApiComponent";

function SinglePost() {
  const { postId } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State to manage the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axiosReq
      .get(`/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handleDelete = () => {
    // Close the delete modal
    setShowDeleteModal(false);

    axiosReq.delete(`/posts/${postId}`).then(() => {
      history.push("/feed");
    });
  };

  return (
    <div>
      <br />
      <br />
      <h2>Single Post</h2>
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
              {post.owner} {"  "}
              {post.profile_image && (
                <img
                  src={post.profile_image}
                  alt={`face ${post.owner.username}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}
            </p>
            {post.post_image && (
              <img
                src={post.post_image}
                alt={`Content for ${post.id}`}
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            )}
            <h4>{post.content}</h4>

            {/* Conditionally render the Delete button */}
            {post.is_owner && (
              <div>
                <Button
                  className="button right"
                  onClick={() => {
                    // Navigate to the edit page for this post
                    history.push(`/edit-post/${post.id}`);
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

            {/* POST Delete Confirmation Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this post?
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
      <CommentApiComponent postId={postId} />
    </div>
  );
}

export default SinglePost;

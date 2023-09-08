import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function SinglePost() {
  const { postId } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State to manage the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State to manage the new comment
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to store existing comments
  const [comments, setComments] = useState([]);

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

    // Fetch existing comments for this post
    axiosReq
      .get(`/comments/?post=${postId}`)
      .then((response) => {
        setComments(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handleCommentSubmit = () => {
    setIsSubmitting(true);

    // Create the comment object to send to the API
    const commentData = {
      post: postId,
      comment_text: newComment,
    };

    axiosReq
      .post("/comments/", commentData)
      .then(() => {
        // Refresh the comments after adding a new comment
        axiosReq.get(`/comments/?post=${postId}`).then((response) => {
          setComments(response.data.results);
          setIsSubmitting(false);
          setNewComment(""); // Clear the comment input field
        });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  const handleDelete = () => {
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

            {/* Edit and Delete Options */}
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

            {/* Delete Confirmation Modal */}
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
      {/* Display existing comments */}
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Card className="mb-3" key={comment.id} style={{ width: "66%" }}>
          <Card.Body>
            <div>
              <p>{comment.owner} says:</p>
              <p>{comment.comment_text}</p>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Comment Form */}
      <Card className="mb-3" style={{ width: "66%" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="comment">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button
              className="button"
              type="submit"
              onClick={handleCommentSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SinglePost;

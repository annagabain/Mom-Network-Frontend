import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateNewComment from "../comments/CreateNewComment";
import CommentsApiComponent from "../comments/CommentsApiComponent";

function SinglePost() {
  const { postId } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // State to manage the confirmation modals
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleDeletePost = () => {
    setShowDeletePostModal(false);

    axiosReq.delete(`/posts/${postId}`).then(() => {
      history.push("/feed");
    });
  };

  const handleDeleteComment = (commentId) => {
    // Open the delete modal and set the commentToDelete
    setShowDeleteCommentModal(true);
    setItemToDelete({ id: commentId, isComment: true });
  };

  const handleConfirmDeletePost = () => {
    setShowDeletePostModal(false);

    axiosReq.delete(`/posts/${postId}`).then(() => {
      history.push("/feed");
    });
  };

  const handleConfirmDeleteComment = () => {
    setShowDeleteCommentModal(false);

    if (itemToDelete !== null && itemToDelete.isComment) {
      const commentIdInt = parseInt(itemToDelete.id, 10);

      axiosReq
        .delete(`/comments/${commentIdInt}`)
        .then(() => {
          console.log("Comment deleted successfully.");
          // Refresh the page
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
        });

      setItemToDelete(null);
    }
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

            {post.is_owner && (
              <div>
                <Button
                  className="button right"
                  onClick={() => {
                    history.push(`/edit-post/${post.id}`);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  className="right"
                  onClick={() => {
                    setShowDeletePostModal(true);
                    setItemToDelete({ id: postId, isComment: false });
                  }}
                >
                  Delete Post
                </Button>
              </div>
            )}

            <Modal
              show={showDeletePostModal}
              onHide={() => setShowDeletePostModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDeletePostModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDeletePost}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showDeleteCommentModal}
              onHide={() => setShowDeleteCommentModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteCommentModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDeleteComment}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      )}

      <CreateNewComment postId={postId} />
      <CommentsApiComponent
        postId={postId}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
}

export default SinglePost;

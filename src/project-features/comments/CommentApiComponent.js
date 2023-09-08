import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CommentApiComponent({ postId }) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the current post
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

  // Rest of your comment-related code

  return (
    <div>
      {/* Display existing comments for the current post */}
      <h3>Comments</h3>
      {comments.map((comment) => {
        if (comment.post === parseInt(postId)) {
          return (
            <Card className="mb-3" key={comment.id} style={{ width: "66%" }}>
              <Card.Body>
                <div>
                  <p>{comment.owner} says:</p>
                  <p>{comment.comment_text}</p>
                </div>

                {/* Placeholder for Edit and Delete Options */}
                {comment.is_owner && (
                  <div>
                    <Button className="button right">E</Button>{" "}
                    <Button variant="danger" className="right">
                      D
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        }
        return null;
      })}

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

export default CommentApiComponent;

import React, { useState} from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateNewComment({ postId }) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          // setComments(response.data.results);
          setIsSubmitting(false);
          setNewComment(""); // Clear the comment input field
        });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };


  return (
    <div>
     

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

export default CreateNewComment;

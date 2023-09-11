import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EditMyComment() {
  const [errors, setErrors] = useState({});
  const [commentData, setCommentData] = useState({
    comment_text: "",
  });

  const { comment_text } = commentData;
  const history = useHistory();
  const { commentId } = useParams();

  useEffect(() => {
    // Fetch comment data based on commentId and populate the form fields
    const commentIdInt = parseInt(commentId, 10);
    if (isNaN(commentIdInt)) {
        // Handle the case where commentId is not a valid integer
        console.error("Invalid commentId:", commentId);
        return;
      }
    
      axiosReq
        .get(`/comments/${commentIdInt}`) // Use commentIdInt in the URL
        .then((response) => {
          const { comment_text } = response.data;
          setCommentData({
            comment_text,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Handle 404 error, e.g., display a message or redirect the user
            console.log("Comment not found");
          } else {
            // Handle other errors
            console.log("Error fetching comment data:", error);
          }
        });
    }, [commentId]);
  
  
  
  

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if comment_text is provided
    if (!comment_text) {
      setErrors({ comment_text: ["Please provide a comment."] });
      return;
    }

    try {
      await axiosReq.put(`/comments/${commentId}`, commentData);
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
      <h2>Edit Comment</h2>
      <Form onSubmit={handleSubmit}>
        <div className="text-center">
          <Form.Group className="mb-3">
            <Form.Label>Edit Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="comment_text"
              value={comment_text}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.comment_text?.map((message, idx) => (
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
          {/* <Link to={`/comments/${commentId}`} className="button">
            Go to Comment
          </Link> */}
        </div>
      </Form>
    </>
  );
}

export default EditMyComment;

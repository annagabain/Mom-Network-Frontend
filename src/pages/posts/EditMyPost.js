import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EditMyPost() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [comments, setComments] = useState([]); // Initialize comments as an empty array

  const { content } = postData;
  const history = useHistory();
  const { postId } = useParams();

  useEffect(() => {
    // Fetch post data based on postId and populate the form fields
    axiosReq
      .get(`/posts/${postId}`)
      .then((response) => {
        const { content } = response.data;
        setPostData({
          content,
        });
      })
      .catch((error) => {
        console.log("Error fetching post data:", error);
      });

    // Fetch comments associated with the post
    axiosReq
      .get(`/comments/?post=${postId}`)
      .then((response) => {
        console.log("Fetched comments:", response.data); // Debugging: Log the fetched comments
        setComments(response.data.results); // Assign the 'results' array to comments
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      });
  }, [postId]);

  console.log("Comments state:", comments); // Debugging: Log the comments state

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // Handle image file input separately
      setImageFile(event.target.files[0]);
    } else {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if either content or an image is provided
    if (!content && !imageFile) {
      setErrors({ content: ["Please provide either content or an image."] });
      return;
    }

    const formData = new FormData();

    formData.append("content", content);
    if (imageFile) {
      formData.append("post_image", imageFile); // Make sure to use "post_image" as the field name
    }

    try {
      await axiosReq.put(`/posts/${postId}`, formData); // Use PUT to update the post
      history.push(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChange} />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
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
    </div>
  );

  // // Render comments
  // const commentList = (
  //   <div>
  //     <h3>Comments</h3>
  //     {comments.map((comment) => (
  //       <div key={comment.id}>
  //         <p>{comment.owner} says:</p>
  //         <p>{comment.comment_text}</p>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <>
      <br />
      <br />
      <br />
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Container>
          <div>{textFields}</div>

          {/* <h3>Comments</h3>
          {comments.map((comment) => (
            <Card>
              <Card.Body>
                <div key={comment.id}>
                  <p>{comment.owner} says:</p>
                  <p>{comment.comment_text}</p>
                </div>
              </Card.Body>
            </Card>
          ))} */}
        </Container>
      </Form>
    </>
  );
}

export default EditMyPost;

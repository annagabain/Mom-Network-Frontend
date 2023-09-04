import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EditMyPost() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);

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
        console.log(error);
      });
  }, [postId]);

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

  return (
    <>
      <br />
      <br />
      <br />
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Container>
          <div>{textFields}</div>
        </Container>
      </Form>
    </>
  );
}

export default EditMyPost;

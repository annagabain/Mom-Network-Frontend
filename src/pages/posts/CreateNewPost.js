import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function CreateNewPost() {

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    content: "",
  });

  const { content } = postData;
  
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("content", content);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      // history.push(`/posts/${data.id}`);
      history.push(`/feed`);
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
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button onClick={() => history.goBack()} className="button">
        Cancel
      </Button>
      <Button type="submit" className="button">
        Post
      </Button>
    </div>
  );

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <h2>Create a Post</h2>

      <Form onSubmit={handleSubmit}>
        <Container>
          <div>{textFields}</div>
        </Container>
      </Form>
    </>
  );
}

export default CreateNewPost;

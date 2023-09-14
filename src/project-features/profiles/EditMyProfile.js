import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

function EditMyProfile() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });

  const { name, content, image } = profileData;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user's profile data and populate the form fields
    axiosReq
      .get(`/profiles/${currentUser.profile_id}`)
      .then((response) => {
        const { name, content, image } = response.data;
        setProfileData({ name, content, image });
      })
      .catch((error) => {
        console.log("Error fetching profile data:", error);
      });
  }, [currentUser.profile_id]);

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // Handle image file input separately
      imageFile.current = event.target.files[0];
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setProfileData({
        ...profileData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile.current) {
      formData.append("image", imageFile.current);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${currentUser.profile_id}`, formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      history.goBack();
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        {image && (
          <img src={image} alt="Profile" style={{ maxWidth: "100px" }} />
        )}
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
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Container>
          <div>{textFields}</div>
        </Container>
      </Form>
    </>
  );
}

export default EditMyProfile;

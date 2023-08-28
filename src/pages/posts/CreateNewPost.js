import React from "react";
import { Form, Button } from "react-bootstrap";

function CreateNewPost() {
  return (
    <div>
      <br />
      <br />
      <h2>Create a new Post (Dummy form)</h2>
      <Form>
      <Form.Group className="mb-3">
          <Form.Control
            type="text"
          />
        </Form.Group>
      <Button className="button" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateNewPost;

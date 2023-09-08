import React from "react";
import Button from "react-bootstrap/Button";

function DeleteButton({ onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete();
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;

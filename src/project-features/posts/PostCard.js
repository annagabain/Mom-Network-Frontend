import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Card className="mb-3" style={{ width: "100%" }}>
      <Card.Body>
        {post.post_image && (
          <img
            src={post.post_image}
            alt={`Content for ${post.id}`}
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
        )}
        <h4>{post.content}</h4>
        <div>
          {post.profile_image && (
            <img
              src={post.profile_image}
              alt={`face ${post.owner.username}`}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
          )}
        </div>
        <span>
          {post.owner} shared on {post.updated_at}
        </span>
        <br></br>
        <br></br>
        {/* Add like and comment logic here */}
        <p>
          <span> LIKE: {post.likes_count} </span>
          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            <span> COMMENT: {post.comments_count} </span>
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

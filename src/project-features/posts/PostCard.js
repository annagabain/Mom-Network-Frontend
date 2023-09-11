import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Card className="mb-3" style={{ width: "100%" }}>
      <Card.Body>
        <span className="left">
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
          {post.owner} | {post.updated_at}
        </span>
        <br></br>
        <br></br>

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
          {post.likes_count} likes
          <span> {post.comments_count} Comments </span>
        </div>
        <br></br>

        {/* Add like and comment logic here */}
        <p>
          <span>
            {/* haveliked */}
            LIKE <i class="fa fa-thumbs-up" style={{ fontSize: "36px" }} />
            {/* tolike */}
            <i class="fa fa-thumbs-o-up" style={{ fontSize: "24px" }} />
          </span>
          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            COMMENT
          </Link>
          <i
            class="fa fa-comment-o"
            style={{ fontSize: "24px" }}
            aria-hidden="true"
          ></i>
        </p>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

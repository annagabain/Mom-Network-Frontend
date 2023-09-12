import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PostCard = ({ post, handleLike, handleUnlike }) => {
  const currentUser = useCurrentUser();
  const [isLiked, setIsLiked] = useState(post.like_id !== null); // Initialize based on API data

  useEffect(() => {
    // Update the local isLiked state based on the API data
    setIsLiked(post.like_id !== null);
  }, [post.like_id]);

  
  const handleLikeClick = () => {
  
    console.log("handleLikeClick called"); 
  
    if (!isLiked) {
      handleLike(post.id);
      setIsLiked(true); // Update local state when liked
    } else {
      handleUnlike(post.id, post.like_id);
      setIsLiked(false); // Update local state when unliked
    }
  };
  
  

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
        <br />
        <br />

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
        <br />

        <p>
          {currentUser ? ( 
            isLiked ? (
              // <span onClick={handleUnlike(post.id, post.like_id)}>
              <span onClick={handleLikeClick}>

                <i className="fa fa-thumbs-up" style={{ fontSize: "36px", color: "green" }} />
              </span>
            ) : (
              <span onClick={handleLikeClick}>
                <i className="fa fa-thumbs-o-up" style={{ fontSize: "24px", color: "orange" }} />
              </span>
            )
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="fa fa-thumbs-o-up" style={{ fontSize: "24px", color: "red" }} />
            </OverlayTrigger>
          )}

          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            COMMENT
          </Link>
          <i
            className="fa fa-comment-o"
            style={{ fontSize: "24px" }}
            aria-hidden="true"
          ></i>
        </p>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

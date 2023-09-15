import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Likes = ({ post, setPosts }) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === post.owner;
//   console.log("Current post.like_id:", post.like_id);

  const handleLike = async () => {
    console.log("handle like clicked!");

    try {
      const { data } = await axiosRes.post("/likes/", { post: post.id });
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? { ...p, likes_count: p.likes_count + 1, like_id: data.id }
            : p
        )
      );
      //   setLiked(true);  // Update liked state
      console.log("Liked! New post.like_id:", data.id); // Log the updated like_id
    } catch (err) {
      console.log("Failed to like post", err);
    }
  };

  const handleUnlike = async () => {
    console.log("handle un like clicked!");
    try {
      await axiosRes.delete(`/likes/${post.like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((p) =>
          p.id === post.id
            ? { ...p, likes_count: p.likes_count - 1, like_id: null }
            : p
        ),
      }));
      //   setLiked(false);  // Update liked state
      console.log("Unliked! Removed post.like_id:", post.like_id); // Log the removed like_id
    } catch (err) {
      console.log("Failed to unlike post", err);
    }
  };

  return (
    <>
      {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can't like your own post!</Tooltip>}
        >
          <i className="fa fa-heart" style={{ color: "yellow" }} />
        </OverlayTrigger>
      ) : !post.like_id ? (
        <span onClick={handleLike}>
          <i className={`fa fa-heart-o`} />
        </span>
      ) : post.like_id ? (
        <span onClick={handleUnlike}>
          <i className={`fa fa-heart`} />
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts!</Tooltip>}
        >
          <i className="fa fa-heart-o" />
        </OverlayTrigger>
      )}
      {post.likes_count}
    </>
  );
};

export default Likes;

// import React, { useEffect, useState, useCallback } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Form from "react-bootstrap/Form";
// import CreateNewPost from "./CreateNewPost";
// import InfiniteScroll from "react-infinite-scroll-component";
// import MyNetworkPlaceholder from "./MyNetworkPlaceholder";
// import MyPagesPlaceholder from "./MyPagesPlaceholder";
// import PostCard from "./PostCard";

// const PostsApiComponent = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchData = useCallback(() => {
//     fetch(`https://mom-network-backend.herokuapp.com/posts/?page=${page}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.results && data.results.length === 0) {
//           setHasMore(false);
//         } else if (data && data.results) {
//           setPosts((prevPosts) => [...prevPosts, ...data.results]);
//           setPage(page + 1);
//         }
//       })
//       .catch((error) => {
//         console.log(
//           "Could not fetch the Mom Network API because of this error: ",
//           error.message
//         );
//       });
//   }, [page]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredPosts = posts.filter((post) => {
//     const contentMatch = post.content
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const ownerMatch = post.owner
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return contentMatch || ownerMatch;
//   });

//   return (
//     <div>
//       <br />
//       <br />
//       <Form.Group>
//         <Form.Control
//           type="text"
//           placeholder="Search posts"
//           id="searchform"
//           style={{ width: "18rem" }}
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//       </Form.Group>

//       <br />
//       <br />

//       <Row>
//         <Col md={8}>
//           <InfiniteScroll
//             dataLength={filteredPosts.length}
//             next={fetchData}
//             hasMore={hasMore}
//             loader={hasMore ? <p>The Posts are Loading...</p> : null}
//             endMessage={<p>No more posts to show</p>}
//           >
//             {filteredPosts.map((post, index) => (
//               <PostCard key={`${post.id}-${index}`} post={post} />
//             ))}
//           </InfiniteScroll>
//         </Col>
//         <Col md={4}>
//           <div>
//             <CreateNewPost />
//           </div>
//           <br />
//           <br />

//           {/* Placeholder for My pages */}
//           <MyPagesPlaceholder />

//           <br />
//           <br />

//           {/* Placeholder for My Network */}
//           <MyNetworkPlaceholder />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PostsApiComponent;

import React, { useEffect, useState, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CreateNewPost from "./CreateNewPost";
import InfiniteScroll from "react-infinite-scroll-component";
import MyNetworkPlaceholder from "./MyNetworkPlaceholder";
import MyPagesPlaceholder from "./MyPagesPlaceholder";
import PostCard from "./PostCard";
import { axiosRes } from "../../api/axiosDefaults"; // Import axiosRes

const PostsApiComponent = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(() => {
    fetch(`https://mom-network-backend.herokuapp.com/posts/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && data.results.length === 0) {
          setHasMore(false);
        } else if (data && data.results) {
          setPosts((prevPosts) => [...prevPosts, ...data.results]);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.log(
          "Could not fetch the Mom Network API because of this error: ",
          error.message
        );
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLike = async (postId) => {
    try {
      // Send a POST request to like the post with the given postId
      const { data } = await axiosRes.post("/likes/", { post: postId });

      // Update the likes count and like_id in the posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: post.likes_count + 1,
              like_id: data.id,
            };
          }
          return post;
        })
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleUnlike = async (postId, likeId) => {
    try {
      // Send a DELETE request to unlike the post with the given postId and likeId
      await axiosRes.delete(`/likes/${likeId}/`);

      // Update the likes count and like_id in the posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: post.likes_count - 1,
              like_id: null,
            };
          }
          return post;
        })
      );
    } catch (err) {
      console.error("Error unliking post:", err);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const contentMatch = post.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const ownerMatch = post.owner
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return contentMatch || ownerMatch;
  });

  return (
    <div>
      <br />
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search posts"
          id="searchform"
          style={{ width: "18rem" }}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </Form.Group>

      <br />
      <br />

      <Row>
        <Col md={8}>
          <InfiniteScroll
            dataLength={filteredPosts.length}
            next={fetchData}
            hasMore={hasMore}
            loader={hasMore ? <p>The Posts are Loading...</p> : null}
            endMessage={<p>No more posts to show</p>}
          >
            {filteredPosts.map((post, index) => (
              <PostCard
                post={post}
                handleLike={handleLike}
                key={`${post.id}-${index}`}
                onLike={handleLike}
                onUnlike={handleUnlike}
              />
            ))}
          </InfiniteScroll>
        </Col>
        <Col md={4}>
          <div>
            <CreateNewPost />
          </div>
          <br />
          <br />

          {/* Placeholder for My pages */}
          <MyPagesPlaceholder />

          <br />
          <br />

          {/* Placeholder for My Network */}
          <MyNetworkPlaceholder />
        </Col>
      </Row>
    </div>
  );
};

export default PostsApiComponent;

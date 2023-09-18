import React, { useEffect, useState, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CreateNewPost from "./CreateNewPost";
import InfiniteScroll from "react-infinite-scroll-component";
// import MyNetworkPlaceholder from "./MyNetworkPlaceholder";
// import MyPagesPlaceholder from "./MyPagesPlaceholder";
import PostCard from "./PostCard";
// import Likes from "../likes/Likes";

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
          const updatedPosts = data.results.map((post) => ({
            ...post,
            like_id: post.like_id,
          }));
          setPosts((prevPosts) => [...prevPosts, ...updatedPosts]);
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
      {/* Anchor tag to CreateNewPost, visible only on xs screens */}
      <a href="#createNewPost" className="sticky d-md-none">
      + New Post
      </a>
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
            {/* Contents of each post Displayed on frontend */}
            {filteredPosts.map((post, index) => {
              // console.log("Post like_id:", post.like_id); // for debugging

              return (
                <PostCard
                  post={{ ...post, like_id: post.like_id }}
                  key={`${post.id}-${index}`}
                  setPosts={setPosts}
                />
              );
            })}
          </InfiniteScroll>
        </Col>
        <Col md={4}>
          <div id="createNewPost">
            <CreateNewPost />
          </div>
          <br />
          <br />

          {/* Placeholder for My thematic-groups */}
          {/* <MyPagesPlaceholder /> */}

          <br />
          <br />

          {/* Placeholder for My Network */}
          {/* <MyNetworkPlaceholder /> */}
        </Col>
      </Row>
    </div>
  );
};

export default PostsApiComponent;

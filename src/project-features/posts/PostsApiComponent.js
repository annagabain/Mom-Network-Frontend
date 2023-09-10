import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CreateNewPost from "./CreateNewPost";
import InfiniteScroll from "react-infinite-scroll-component";
import MyNetworkPlaceholder from "./MyNetworkPlaceholder";
import MyPagesPlaceholder from "./MyPagesPlaceholder";

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
            loader={hasMore ? <p>The Posts are Loading...</p> : null} // Display "Loading..." only when there are more posts to load
            endMessage={<p>No more posts to show</p>} // Display "No more posts to show" when no more posts are available
          >
            {filteredPosts.map((post, index) => (
              <Card
                key={`${post.id}-${index}`}
                className="mb-3"
                style={{ width: "100%" }}
              >
                <Link
                  to={`/posts/${post.id}`}
                  className="post-link"
                  key={post.id}
                >
                  <Card.Body>
                    {post.post_image && (
                      <img
                        src={post.post_image}
                        alt={`Content for ${post.id}`}
                        style={{
                          maxWidth: "100%",
                          width: "100%",
                          height: "600px",
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
                    <p>
                      This post has {post.comments_count} comments and{" "}
                      {post.likes_count} likes
                    </p>
                  </Card.Body>
                </Link>
              </Card>
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

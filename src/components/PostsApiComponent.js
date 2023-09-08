import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CreateNewPost from "../pages/posts/CreateNewPost";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsApiComponent = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(() => {
    fetch(`https://mom-network-backend.herokuapp.com/posts/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...data.results]);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.log("Could not fetch the Mom Network API because of this error: ", error.message);
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const contentMatch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const ownerMatch = post.owner.toLowerCase().includes(searchQuery.toLowerCase());
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
            {filteredPosts.map((post) => (
              <Card key={post.id} className="mb-3" style={{ width: "100%" }}>
                <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
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

          {/* Placeholder for My Groups */}
          <div className="my-groups">
            <h3>My Groups</h3>
            <div></div>
            <p>Baby </p>
            <p> Toddler </p>
            <p> Small Child </p>
            <p> Healthcare </p>
            <p> Activities</p>
          </div>

          <br />
          <br />

          {/* Placeholder for My Network */}
          <div className="my-network">
            <h3>Following</h3>
            <div>
              <span>
                Henry{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
              <span>
                {" "}
                Jane{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
              <span>
                {" "}
                UserTwo{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
            </div>
            <br />
            <div>
              <span>
                {" "}
                Jane{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
              <span>
                {" "}
                Jane{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
              <span>
                {" "}
                Jane{" "}
                <img
                  src={require("../wireframes/group.png")}
                  alt={`Profile of `}
                  style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostsApiComponent;

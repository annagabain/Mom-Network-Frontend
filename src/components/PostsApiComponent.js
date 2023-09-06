import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const PostsApiComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://mom-network-backend.herokuapp.com/posts/")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(
          "Could not fetch the Mom Network API because of this error: ",
          error.message
        );
        setIsLoading(false);
      });
  }, []);

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
      <h2>Posts</h2>
      <br />
      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search posts"
          style={{ width: "33%" }}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </Form.Group>

      <br />
      <br />

      <Row>
        <Col md={8}>
          {isLoading ? (
            <p>The Posts are Loading...</p>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="mb-3" style={{ width: "100%" }}>
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
                  </Card.Body>
                </Link>
              </Card>
            ))
          )}
        </Col>
        <Col md={4}>
          {/* Placeholder for Create New Post */}
          <div>
            <h3> + NEW POST</h3>
            <div>button here</div>
          </div>
          <br></br>
          <br></br>

          {/* Placeholder for My Groups */}
          <div className="my-groups">
            <h3>My Groups</h3>
            <div>
              {/* <img
                src={require("../wireframes/group.png")}
                alt={`groups placeholder`}
                style={{
                  width: "200px",
                  marginRight: "10px",
                }}
              /> */}
            </div>
            <p>Baby </p>
            <p> Toddler </p>
            <p> Small Child </p>
            <p> Healthcare </p>
            <p> Activities</p>
          </div>

          <br></br>
          <br></br>

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
            <br></br>

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

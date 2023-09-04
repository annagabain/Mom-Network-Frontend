import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const PostsApiComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      <br />
      <br />
      <h2>Posts</h2>

      {isLoading ? (
        <p>The Posts are Loading...</p>
      ) : (
        posts.map((post) => (
          <Link to={`/posts/${post.id}`} className="post-link">
            <Card key={post.id} className="mb-3" style={{ width: "66%" }}>
              <Card.Body>
                
                {post.post_image && (
                  <img
                    src={post.post_image}
                    alt={`Content for ${post.id}`}
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
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
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default PostsApiComponent;

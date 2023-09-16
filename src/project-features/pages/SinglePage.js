import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// PAGE IS DISPLAYED AS A THEMATIC GROUP IN THE FRONTEND

const SinglePage = ({ match }) => {
  const history = useHistory();
  const goBackToPages = () => {
    history.push("/thematic-groups");
  };
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pageId = match.params.pageId;

    // Fetch the page details using the pageId
    fetch(`https://mom-network-backend.herokuapp.com/page/${pageId}`)
      .then((response) => response.json())
      .then((data) => {
        setPage(data); // Set the page data
        setIsLoading(false); // Set isLoading to false once data is fetched
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log("Could not fetch page details: ", error.message);
        setIsLoading(false); // Set isLoading to false in case of an error
      });
  }, [match.params.pageId]);

  return (
    <div>
      <br></br>
      <br></br>

      <button className="button btn left" onClick={goBackToPages}>
        Go to thematic-groups overview
      </button>
      <br></br>
      <br></br>

      {/* <h2>Page Details</h2> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Card>
            <Card.Body>
              <h2>{page.title} Group</h2>
              {page.image && (
                <img
                  src={page.image}
                  alt={`Page: ${page.title}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              )}{" "}
              <p>Admin: {page.admin_username}</p>
              <h4>{page.description}</h4>
              <p>This page has {page.followers_count} followers</p>
              {/* A placeholder for following a Group (Page) */}
              <p>
                {" "}
                FOLLOW{" "}
                <i
                  className="fa-solid fa-people-group"
                  style={{ fontSize: "36px", color: "beige" }}
                ></i>
              </p>
            </Card.Body>
          </Card>
          <br></br>
          <br></br>
          <h4 className="left">Related Posts:</h4>
          <br></br>
          <br></br>
          {page?.posts?.map((post) => (
            <div key={post.id}>
              <Card>
                <Card.Body>
                  <p>
                    {post.owner} says: <h3>{post.content}</h3>
                  </p>
                  {post.post_image && (
                    <img
                      src={post.post_image}
                      alt={`Page: ${post.content}`}
                      style={{
                        width: "50%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                    />
                  )}{" "}
                </Card.Body>
              </Card>
              <br></br>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default SinglePage;

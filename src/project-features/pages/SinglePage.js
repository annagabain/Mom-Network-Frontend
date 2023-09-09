import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SinglePage = ({ match }) => {
  const history = useHistory();
  const goBackToPages = () => {
    history.push("/pages");
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

      <button className="button left" onClick={goBackToPages}>
        Go to pages overview
      </button>
      <br></br>
      <br></br>

      {/* <h2>Page Details</h2> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
          )}
          <h2>{page.title}</h2>
          {/* 
          <p>id{page.id}</p> */}
          <p>Admin: {page.admin_username}</p>
          <h4>{page.description}</h4>
          {/* <h2>followers{page.followers}</h2> */}
          <p>This page has {page.followers_count} followers</p>
          <br></br>
          <h4 className="left">Related Posts:</h4>
          <br></br>
          <br></br>
          <Card>
            {page.posts.map((post) => (
              <div key={post.id}>
                <h5>{post.title}</h5>
                <p>
                  {post.owner} says: {post.content}
                </p>
                {/* Render other post details as needed */}
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SinglePage;

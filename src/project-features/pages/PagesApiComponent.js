import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; 

// PAGES ARE DISPLAYED AS THEMATIC GROUPS IN THE FRONTEND

const PageApiComponent = () => {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://mom-network-backend.herokuapp.com/page/")
      .then((response) => response.json())
      .then((data) => {
        // Check if data has a "results" property
        const pagesData = data.results || [];

        // Set the "results" array to the pages state
        setPages(pagesData);
        setIsLoading(false); // Set isLoading to false once data is fetched
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(
          "Could not fetch the Mom Network API because of this error: ",
          error.message
        );
        setIsLoading(false); // Set isLoading to false in case of an error
      });
  }, []);

  return (
    <>
      <br />
      <br />
      {/* <h2>Pages</h2> */}
      <h2>Thematic Groups</h2>

      <br />
      <br />

      {isLoading ? (
        <p>The Page is Loading...</p>
      ) : (
        <div className="row">
          {pages.map((page) => (
            <div className="col-md-4" key={page.id}>
              <Card>
                <Card.Body>
                  <h4>{page.title}</h4>

                  <Link to={`/thematic-groups/${page.id}`}>
                    <div style={{ marginBottom: "20px", cursor: "pointer" }}>
                      {page.image && (
                        <img
                          src={page.image}
                          alt={`Page: ${page.title}`}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </Link>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PageApiComponent;

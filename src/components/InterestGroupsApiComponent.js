import React, { useEffect, useState } from "react";

const PageApiComponent = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("https://mom-network-backend.herokuapp.com/page/")
      .then((response) => response.json())
      .then((data) => {
        // Check if data has a "results" property
        const pagesData = data.results || [];

        // Set the "results" array to the pages state
        setPages(pagesData);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(
          "Could not fetch the Mom Network API because of this error: ",
          error.message
        );
      });
  }, []);

  // Function to group pages into columns
  const groupPagesIntoColumns = (pages, columnsCount) => {
    const pagesPerColumn = Math.ceil(pages.length / columnsCount);
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      const startIndex = i * pagesPerColumn;
      const endIndex = startIndex + pagesPerColumn;
      columns.push(pages.slice(startIndex, endIndex));
    }

    return columns;
  };

  // Group pages into three columns
  const columns = groupPagesIntoColumns(pages, 3);

  return (
    <div>
      <br />
      <br />
      <h2>Groups of Interest (Pages)</h2>
      <br />
      <br />

      <div className="row">
        {columns.map((column, columnIndex) => (
          <div className="col-md-4" key={columnIndex}>
            {column.map((page) => (
              <div key={page.id} style={{ marginBottom: "20px" }}>
                <h4>{page.title}</h4>
                {page.image && (
                  <img
                    src={page.image}
                    alt={`Page: ${page.title}`}
                    style={{
                      width: "400px",
                      height: "200px", // Make the image square
                      objectFit: "cover", // Maintain aspect ratio and cover the entire container
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageApiComponent;

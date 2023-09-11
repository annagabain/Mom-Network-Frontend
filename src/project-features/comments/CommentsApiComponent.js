import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CommentsApiComponent({ postId }) {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = [];
        let page = 1;

        // Fetch comments from all pages until there are no more pages
        while (true) {
          const response = await fetch(
            `https://mom-network-backend.herokuapp.com/comments/?page=${page}`
          );
          const data = await response.json();

          if (!data.results || data.results.length === 0) {
            // No more comments to fetch
            break;
          }

          allComments.push(...data.results);
          page++;
        }
        console.log("Fetched comments:", allComments); // Log the fetched comments
        setComments(allComments);
        setIsLoading(false); // Set loading state to false when comments are loaded
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    if (postId) {
      const postIdInt = parseInt(postId, 10);
      const filtered = comments
        .filter((comment) => comment.post === postIdInt)
        .reverse(); // Reverse the order to show newest comments first
      setFilteredComments(filtered);
    }
  }, [postId, comments]);

  return (
    <div>
      <h1>Comments</h1>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {filteredComments.map((comment) => (
            <Card className="mb-3" key={comment.id} style={{ width: "66%" }}>
              <Card.Body>
                <div>
                <p>ID: {comment.id}</p>

                  <p>{comment.owner} says:</p>
                  <p>{comment.comment_text}</p>
                  <p>{comment.is_owner} Delete here: </p>
                </div>

                {/* Console.log comment.is_owner here */}
                {console.log(comment.is_owner)}

                {/* Placeholder for Edit and Delete Options */}
                {comment.is_owner && (
                  <div>
                    <Button className="button right">E</Button>{" "}
                    <Button variant="danger" className="right">
                      D
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default CommentsApiComponent;

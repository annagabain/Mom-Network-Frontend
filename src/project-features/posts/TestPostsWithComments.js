import React, { useEffect, useState } from "react";

function TestPostsWithComments({ postId }) {
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
      const filtered = comments.filter((comment) => comment.post === postIdInt);
      setFilteredComments(filtered);
    }
  }, [postId, comments]);

  return (
    <div>
      <h1>Test Comments</h1>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul>
          {filteredComments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.id}</p>
              <p>{comment.comment_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestPostsWithComments;

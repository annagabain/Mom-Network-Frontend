import React, { useEffect, useState } from 'react';

const PostsApiComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://mom-network-backend.herokuapp.com/posts/')
      .then(response => response.json())
      .then(data => {
        setPosts(data.results);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.log('Could not fetch the Mom Network API because of this error: ', error.message)
      });
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default PostsApiComponent;

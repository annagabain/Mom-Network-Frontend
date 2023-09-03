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

  // return (
  //   <div>
  //     <br/>
  //     <br/>
  //     <h2>Posts</h2>
  //     <pre style={{color: "green"}}>{JSON.stringify(posts, null, 2)}</pre>
  //   </div>
  // );
  return (
    <div>
      <br/>
      <br/>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <p>Author: {post.owner}</p>
          <h4>{post.content}</h4>
          <p>Created At: {post.created_at}, Updated At: {post.updated_at}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostsApiComponent;

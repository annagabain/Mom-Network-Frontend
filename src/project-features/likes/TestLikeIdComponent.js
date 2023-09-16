import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Likes from './Likes';


// Trying to access the like_id
const TestLikeIdComponent = () => {
  const [likeIds, setLikeIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikeIds = async () => {
      try {
        const response = await axios.get('https://mom-network-backend.herokuapp.com/likes');
        const fetchedLikeIds = response.data.results.map((like) => like.id);
        setLikeIds(fetchedLikeIds);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch like IDs:', error);
      }
    };

    fetchLikeIds();
  }, []);

  return <div>{<Likes likeIds={likeIds} />}</div>;
};

export default TestLikeIdComponent;

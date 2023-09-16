import React, { useEffect, useState } from 'react';

const MessagesApiComponent = () => {
  const [data, setData] = useState(null); // Changed initial state to null

  useEffect(() => {
    fetch('https://mom-network-backend.herokuapp.com/messages/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results); // Set data to the results array
        console.log('data', responseData.results);
      })
      .catch((error) => {
        console.log('Could not fetch the Mom Network API because of this error: ', error.message);
      });
  }, []);

  return (
    <div className='left'>
      <i style={{ color: 'green' }}>
        Fetching Messages Test:
        {data ? (
          data.map((message) => (

            <div key={message.id}>
              <p>Title: {message.title}</p>
              <p>Sender: {message.sender_username}</p>
              <p>Recipient: {message.recipient_username}</p>
              <p>Message: {message.message_content}</p> 
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </i>
    </div>
  );
};

export default MessagesApiComponent;

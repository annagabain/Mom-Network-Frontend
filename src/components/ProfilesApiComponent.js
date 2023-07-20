import React, { useEffect, useState } from 'react';

const ProfilesApiComponent = () => {
  // const [data, setData] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('https://mom-network-backend.herokuapp.com/profiles')
      .then(response => response.json())
      .then(data => {
        setProfiles(data);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.log('Could not fetch the Mom Network API because of this error: ', error.message)
      });
  }, []);

  return (
    <div>
      <h2>Profiles</h2>
      {/* {profiles.map(profile => (
        <div key={profile.id}>
          <p>{profile.owner}</p>
          <img src={profile.image} alt="Profile Image" />
        </div> */}
      <pre style={{color: "green"}}>{JSON.stringify(profiles, null, 2)}</pre>

      {/* ))} */}
    </div>
  );
};

export default ProfilesApiComponent;

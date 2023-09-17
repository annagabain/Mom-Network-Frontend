import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ProfilesApiComponent = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    fetch("https://mom-network-backend.herokuapp.com/profiles")
      .then((response) => response.json())
      .then((data) => {
        // Check if data has a "results" property
        const profilesData = data.results || [];

        // Set the "results" array to the profiles state
        setProfiles(profilesData);
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

  // Function to group profiles into columns
  const groupProfilesIntoColumns = (profiles, columnsCount) => {
    const profilesPerColumn = Math.ceil(profiles.length / columnsCount);
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      const startIndex = i * profilesPerColumn;
      const endIndex = startIndex + profilesPerColumn;
      columns.push(profiles.slice(startIndex, endIndex));
    }

    return columns;
  };

  // Group profiles into three columns
  const columns = groupProfilesIntoColumns(profiles, 3);

  return (
    <div>
      <br />
      <br />
      {/* <h2>Profiles</h2> */}
      <br />
      <br />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {columns.map((column, columnIndex) => (
            <div className="col-md-4" key={columnIndex}>
              {column.map((profile) => (
                <div key={profile.id} style={{ marginBottom: "20px" }}>
                  {/* Wrap each profile card with a Link */}
                  <h4>{profile.owner}</h4>

                  <Link to={`/profiles/${profile.id}`}>
                    {profile.image && (
                      <img
                        src={profile.image}
                        alt={`Profile of ${profile.owner}`}
                        style={{
                          borderRadius: "50%",
                          width: "180px",
                          height: "180px",
                        }}
                      />
                    )}
                    <br></br>
                    {/* Display "My Profile" under the logged-in user's profile */}
                    {profile.owner === currentUser.username && (
                      <span style={{ fontSize: "12px", color: "green" }}>
                        My Profile
                      </span>
                    )}
                  </Link>

                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesApiComponent;

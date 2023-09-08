import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SingleProfile() {
  const { profileId } = useParams();
  const history = useHistory();

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific profile using the profileId parameter
    axiosReq
      .get(`/profiles/${profileId}`)
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);

  return (
    <>
      <div>
        <br />
        <br />
        <h2>Profile Details</h2>
        <Button
          className="button left"
          onClick={() => {
            history.push("/mom-network"); // Navigate back to the profiles list
          }}
        >
          Go back to Profiles
        </Button>
        <br />
        <br />
        <br />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Card className="mb-3" style={{ width: "66%" }}>
            <Card.Body>
              <h4>{profile.owner}</h4>
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
              <p>Name: {profile.name}</p>
              <p>Member since: {profile.created_at}</p>
              <p>Bio: {profile.content}</p>
            </Card.Body>
          </Card>
        )}
      </div>
      <Card>
        <Card.Body>
          <div>Message component here</div>
        </Card.Body>
      </Card>
    </>
  );
}

export default SingleProfile;

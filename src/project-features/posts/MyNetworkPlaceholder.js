import React from 'react'
import groupImage from "../../wireframes/group.png";


function MyNetworkPlaceholder() {
  return (
    <div className="my-network">
    <h3>Following <i className="fa-solid fa-user-plus"></i></h3>
    <div>
      <span>
        Henry{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
      <span>
        {" "}
        Jane{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
      <span>
        {" "}
        UserTwo{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
    </div>
    <br />
    <div>
      <span>
        {" "}
        Jane{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
      <span>
        {" "}
        Jane{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
      <span>
        {" "}
        Jane{" "}
        <img
          src={groupImage}
          alt={`Profile of `}
          style={{
            borderRadius: "50%",
            width: "20px",
            height: "20px",
          }}
        />
      </span>
    </div>
  </div>
  )
}

export default MyNetworkPlaceholder
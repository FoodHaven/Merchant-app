import React from "react";
import Addition from "../../assets/addition.png";

// props:

const CampaignCard = (props) => {
  return (
    <div
      className="flex mr-12 rounded-md shadow-lg p-8 text-center cursor-pointer items-center justify-center"
      style={{ width: "300px", height: "400px" }}
    >
      <img src={Addition} style={{ width: "100px", height: "100px" }}></img>
    </div>
  );
};

export default CampaignCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CampaignContent = (props) => {
  const [timeDiff, setTimeDiff] = useState([0, 0]);
  useEffect(() => {
    // const currTime = new Date().toISOString();
    const currTime = new Date();
    var eventDate = new Date(props.item.deadline);
    var diff = eventDate - currTime;

    let days = Math.floor(diff / 60000 / 60 / 24);

    let hours = Math.floor(diff / 60000 / 60 - days * 24);

    setTimeDiff([days, hours]);
    // console.log(Math.floor(diff / 60000 / 60));
  }, []);

  return (
    <Link to={"/campaign/" + props.item.id}>
      <div
        className="mr-12 rounded-md shadow-lg p-8  cursor-pointer"
        style={{ width: "300px", height: "400px" }}
      >
        <div>
          <img
            className="rounded-lg mb-3"
            src={props.item.img_url}
            style={{ height: "200px", width: "100%" }}
          />
        </div>
        <div className="text-lg font-bold">{props.item.title}</div>
        <div className="flex flex-row items-center">
          <div className="text-base mr-3">Status: Live</div>
        </div>
        <div>Responses: {props.item.final_vote}</div>
        <div className="flex flex-row items-center">
          <div>Time left:</div>{" "}
          <div
            className="pl-2 pr-2 pt-1 pb-1 rounded-md ml-2"
            style={{ backgroundColor: "#baffbe" }}
          >
            {timeDiff[0]} days {timeDiff[1]} hours
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignContent;

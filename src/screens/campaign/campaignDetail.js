import React from "react";
import Header from "../../components/header/header";
import Restaurantnav from "../../components/sidenav/restaurantnav.js";
import RecordList from "../../components/recordList";

const CampaignDetail = (props) => {
  return (
    <div className="max-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row">
        <Restaurantnav />
        <RecordList />
      </div>
    </div>
  );
};
export default CampaignDetail;

import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import CampaignCard from "../../components/cards/campaignCard";
import CampaignContent from "../../components/cards/campaignContent";
import Newcampaign from "../../components/modals/newcampaign";
import { useSelector, useDispatch } from "react-redux";
import { fetchingCampaign } from "../../utils/redux/reducers/campaign";
import MoonLoader from "react-spinners/MoonLoader";
import { fetchItems } from "../../utils/redux/reducers/items";
import "../../styles/animation.css";

const CampaignDashboard = () => {
  const dispatch = useDispatch();
  const campaignList = useSelector((state) => state.campaignReducer);
  const isLoading = useSelector((state) => state.loadingReducer);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchingCampaign());
  }, []);

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(fetchingCampaign());
    dispatch(fetchItems());
  }, []);

  // headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({ id: 5 }),

  const remove = () => {
    const configObj = {
      method: "DELETE",
    };

    fetch(
      "http://chenyoung01.pythonanywhere.com/deals/8",
      configObj
    ).then((res) => console.log("bruh"));
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row">
        {isLoading ? (
          <div class="fade-in">
            <div className="flex flex-row p-16 flex-wrap">
              <div onClick={toggleModal}>
                <CampaignCard />
              </div>
              {campaignList.map((item) => (
                <CampaignContent item={item} link="/sample" />
              ))}
            </div>
            <Newcampaign
              modalIsOpen={modalIsOpen}
              afterOpenModal={afterOpenModal}
              closeModal={closeModal}
            />
          </div>
        ) : (
          <div className="flex w-full mt-32 content-center">
            <div className="m=0 m-auto">
              <MoonLoader size={70} color={"#123abc"} />
            </div>
          </div>
        )}
      </div>
      ;
    </div>
  );
};

export default CampaignDashboard;

// const sample1 = {
//   name: "Crazy sushi deal",
//   status: "Live",
//   responses: 132,
//   timeleft: 90,
//   image:
//     "https://images.japancentre.com/recipes/pics/18/main/makisushi.jpg?1557308201",
// };

// const sample2 = {
//   name: "Sick deal",
//   status: "Ended",
//   responses: 12,
//   timeleft: 0,
//   image:
//     "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
// };

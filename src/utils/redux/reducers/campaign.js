// Actions
import { SETLOADING } from "./loading";
import { fetchGeneral } from "../../api/record";
import { BASE_URL } from "../../api/base";

const SET_CAMPAIGN = (payload) => {
  return { type: "SET_CAMPAIGN", payload };
};

// Reducers
const campaignReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CAMPAIGN":
      return action.payload;
    default:
      return state;
  }
};

const fetchingCampaign = (dispatch) => {
  // console.log()
  console.log(BASE_URL + "deals/?format=json");
  return (dispatch) => {
    dispatch(SETLOADING(0));
    fetchGeneral(BASE_URL + "deals/?format=json")
      .then((res) => {
        dispatch(SET_CAMPAIGN(res));
        dispatch(SETLOADING(1));
      })
      .catch((err) => console.log(err));
  };
};

export { SET_CAMPAIGN, campaignReducer, fetchingCampaign };

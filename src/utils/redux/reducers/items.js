import { fetchGeneral } from "../../api/record";
import { BASE_URL } from "../../api/base";
// async action
const fetchItems = (dispatch) => {
  return (dispatch) => {
    fetchGeneral(BASE_URL + "items/")
      .then((data) => {
        dispatch(SET_ITEMS(data));
      })
      .catch((err) => console.log(err));
  };
};

const SET_ITEMS = (payload) => {
  return {
    type: "SET_ITEMS",
    payload,
  };
};

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export { fetchItems, SET_ITEMS, itemsReducer };

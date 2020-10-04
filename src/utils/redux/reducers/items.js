import { fetchGeneral } from "../../api/record";
// async action
const fetchItems = (dispatch) => {
  return (dispatch) => {
    fetchGeneral("http://chenyoung01.pythonanywhere.com/items/")
      .then((data) => {
        dispatch(SET_ITEMS(data));
      })
      .catch((err) => console.log(err));
  };
};

// const fetchingRecord = (dispatch) => {
//     return (dispatch) => {
//       dispatch(SETLOADING(0));
//       FetchRecord()
//         .then((data) => {
//           console.log(data);
//           dispatch(POPULATE_RECORD(data));
//           dispatch(SETLOADING(1));
//         })
//         .catch((err) => console.log(err));
//     };
//   };

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

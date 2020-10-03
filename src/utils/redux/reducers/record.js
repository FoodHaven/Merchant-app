import axios from "axios";
import { record } from "../../api/record";
import { SETLOADING } from "./loading";
import { FetchRecord } from "../../api/record";
import { mockRecord } from "../../data/mockRecord";

const SET_TAGS = (payload) => {
  return { type: "SET_TAGS", tags: payload };
};

const SET_FILTER_INPUT = (payload) => {
  return { type: "SET_FILTER_INPUT", input: payload };
};

const filterTags = [
  { keyword: "small", value: false },
  { keyword: "medium", value: false },
  { keyword: "large", value: false },
];

const tagReducer = (state = filterTags, action) => {
  switch (action.type) {
    case "SET_TAGS":
      return action.tags;
    default:
      return state;
  }
};

const filterInputReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER_INPUT":
      return action.input;
    default:
      return state;
  }
};

const POPULATE_RECORD = (payload) => {
  console.log("In action");
  return {
    type: "POPULATE_RECORD",
    payload,
  };
};
const recordReducer = (state = [], action) => {
  switch (action.type) {
    case "POPULATE_RECORD":
      return action.payload;
    case "ADD_RECORD":
      return [...state, action.record];
    case "DELETE_RECORD":
      // takes in recordID
      return state;
    case "SET_FLAGGED":
      return state.map((item, index) => {
        if (item.id !== action.payload.objectID) {
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          flagged: item.flagged,
        };
      });

    default:
      return state;
  }
};

const fetchingRecord = (dispatch) => {
  return (dispatch) => {
    dispatch(SETLOADING(0));
    FetchRecord()
      .then((data) => {
        console.log(data);
        dispatch(POPULATE_RECORD(data));
        dispatch(SETLOADING(1));
      })
      .catch((err) => console.log(err));
  };
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Price range selector

const priceRangeReducer = (state = 300, action) => {
  switch (action.type) {
    case "SET_RANGE":
      return action.payload;
    default:
      return state;
  }
};

const SET_RANGE = (payload) => {
  return {
    type: "SET_RANGE",
    payload,
  };
};

//set Flagged (in record) /////
// Action
const SET_FLAGGED = (payload) => {
  return {
    type: "SET_FLAGGED",
    objectID: payload.ID,
    value: payload.value,
  };
};

// Reducer

export {
  recordReducer,
  SET_TAGS,
  tagReducer,
  filterInputReducer,
  SET_FILTER_INPUT,
  SET_RANGE,
  priceRangeReducer,
  fetchingRecord,
  SET_FLAGGED,
};

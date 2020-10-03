import { combineReducers } from "redux";

// Reducers
import { NavselectReducer } from "./navselect";
import { loadingReducer } from "./loading";
import {
  recordReducer,
  tagReducer,
  filterInputReducer,
  priceRangeReducer,
} from "./record";
import { campaignReducer } from "./campaign";

const masterReducer = combineReducers({
  recordReducer,
  campaignReducer,
  loadingReducer,
  NavselectReducer,
  tagReducer,
  filterInputReducer,
  priceRangeReducer,
});

export default masterReducer;

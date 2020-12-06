import { combineReducers } from "redux";
// import * as types from "../types";

import pingReducer from "./ping.reducer";
import photosReducer from "./photos.reducer";

// // COMBINED REDUCERS
const rootReducer = {
  ping: pingReducer,
  photos: photosReducer,
};

export default combineReducers(rootReducer);

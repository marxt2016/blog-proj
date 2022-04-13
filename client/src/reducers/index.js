import { combineReducers } from "redux";
import posts from "./posts";
import authorizeReducer from "./authorize";

export default combineReducers({
  posts,
  authorizeReducer,
});

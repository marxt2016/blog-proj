import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth";
import postReducer from "./posts";

const rootReducer = combineReducers({
  posts: postReducer,
  auth: userReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

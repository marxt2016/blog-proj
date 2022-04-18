import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import reducers from "./reducers";
// import { createStore, applyMiddleware, compose } from "redux";
import { createStore } from "./store/createStore";
// import thunk from "redux-thunk";
import "./index.css";
import App from "./App";

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

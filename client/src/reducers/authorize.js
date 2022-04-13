import { AUTHORIZE, LOGOUT } from "../constants/actionTypes";

const authorizeReducer = (state = { authorizeData: null }, action) => {
  switch (action.type) {
    case AUTHORIZE:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return { ...state, authorizeData: action?.payload };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authorizeData: null };
    default:
      return state;
  }
};
export default authorizeReducer;

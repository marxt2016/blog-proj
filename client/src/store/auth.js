import userService from "../services/users.service";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },
    authReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },

    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const { authRequested, authReceived, authRequestFailed, logout } = actions;

export const signup = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await userService.signUp(formData);
    history.push("/");
    localStorage.setItem("profile", JSON.stringify(data));
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const signin = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await userService.signIn(formData);
    localStorage.setItem("profile", JSON.stringify(data));
    history.push("/");
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const signinG = (data) => async (dispatch) => {
  dispatch(authRequested());
  try {
    localStorage.setItem("profile", JSON.stringify(data));
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorage.clear();
  dispatch(logout());
};

export const getStatusLoggedIn = () => (state) => localStorage.getItem("profile") ? true : state.auth.isLoggedIn;
export const getUserDetails = () => (state) => localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : state.auth.entities;

export default userReducer;

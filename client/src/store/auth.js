import userService from "../services/users.service";
import { createSlice } from "@reduxjs/toolkit";
import { deleteUserProfile, getUserProfile, setUserProfile } from "../services/localStorage.service";

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: getUserProfile(),
    isLoading: true,
    error: null,
    isLoggedIn: getUserProfile() ? true : false,
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
const { authRequested, authReceived, authRequestFailed, logout, currentUserReceived } = actions;

export const signup = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await userService.signUp(formData);
    history.push("/");
    setUserProfile(data);
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const signin = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await userService.signIn(formData);

    if (data) {
      console.log(data);
      setUserProfile(data);
      dispatch(authReceived(data));
      history.push("/");
    }
  } catch (error) {
    dispatch(authRequestFailed(error.response.data.error.message));
  }
};
export const signinG = (data) => async (dispatch) => {
  dispatch(authRequested());
  try {
    setUserProfile(data);
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  deleteUserProfile();
  dispatch(logout());
};
export const loadUser = () => async (dispatch) => {
  dispatch(authRequested());
  try {
    const result = await userService.getCurrentUser();
    dispatch(currentUserReceived(result));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const getStatusLoggedIn = () => (state) => state.auth.isLoggedIn;
export const getUserDetails = () => (state) => state.auth.entities;
export const getCurrentUser = () => (state) => state.auth.currentUser;
export const getError = () => (state) => state.auth.error;

export default userReducer;

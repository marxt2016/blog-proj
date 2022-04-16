import userService from "../services/users.service";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },
    authReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const { authRequested, authReceived, authRequestFailed } = actions;

export const signup = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { data } = await userService.signUp(formData);
    history.push("/");
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const signin = (formData, history) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { data } = await userService.signIn(formData);
    history.push("/");
    dispatch(authReceived(data));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export default userReducer;

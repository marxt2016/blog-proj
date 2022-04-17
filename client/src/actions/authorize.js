import * as api from "../api";
import { AUTHORIZE } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log(formData);
    dispatch({ type: AUTHORIZE, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTHORIZE, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

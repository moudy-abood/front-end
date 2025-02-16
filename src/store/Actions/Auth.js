import * as actionTypes from "../ActionTypes/Auth";
import API from "../Services/API";

export const signUp = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_START,
    });
    try {
      const signUpData = {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };

      const response = await API.post("/user", signUpData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.SIGNUP_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.SIGNUP_FAIL,
        error: error.response?.data?.validation?.body?.message,
      });
      return { success: false };
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN,
    });
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const response = await API.post("/login", loginData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error?.response,
        error: error?.response?.data?.validation?.body?.message,
      });
      return { success: false };
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT,
  };
};

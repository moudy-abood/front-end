import axios from "axios";

import * as actionTypes from "../actionTypes/user/auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (data) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const authData = {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        role: "ADMIN",
      };
      const configs = axios.create({
        baseURL: "http://localhost:3000",
      });
      const response = await configs.post("/user", authData);
      localStorage.setItem("token", response.data.token);
      dispatch(authSuccess(response.data.idToken));
    } catch (err) {
      dispatch(authFail(err.response.data.validation.body.message));
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

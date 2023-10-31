import axios from "axios";

import * as actionTypes from "../../ActionTypes/User/Auth";

export const auth = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_START,
    });
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
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        idToken: response.data.payload,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        error: error.message,
      });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN
    })
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const configs = axios.create({
        baseURL: "http://localhost:3000",
      });
      const response = await configs.post("/user/login", loginData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        idToken: response.data.payload,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        error: error.message,
      })
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

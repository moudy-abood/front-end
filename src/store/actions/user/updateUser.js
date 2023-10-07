import axios from "axios";

import * as actionTypes from "../actionTypes/user/user";

export const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_START,
  };
};

export const updateUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAIL,
    error,
  };
};

export const updateUserSuccess = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    dispatch(updateUserStart());
    const token = localStorage.getItem("token");
    const configs = axios.create({
      baseURL: "http://localhost:3000",
      headers: { Authorization: `Bearer ${token}` },
    });
    configs
      .put("/user", {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      })
      .then((res) => {
        dispatch(updateUserSuccess());
      })
      .catch((err) => {
        dispatch(updateUserFail(err.data));
      });
  };
};

import axios from "axios";

import * as actionTypes from "../actionTypes/user/user";

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_PROFILE_START,
  };
};

export const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_PROFILE_FAIL,
    error,
  };
};

export const deleteUserSuccess = (payload) => {
  return {
    type: actionTypes.DELETE_PROFILE_SUCCESS,
    payload,
  };
};

export const deleteUser = (uuid) => {
  return async (dispatch) => {
    dispatch(deleteUserStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = configs.delete(`/user/${uuid}`);
      localStorage.removeItem("token");
      dispatch(deleteUserSuccess(response));
    } catch (error) {
      dispatch(deleteUserFail(error.message) || "User not found");
    }
  };
};

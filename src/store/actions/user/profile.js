import axios from "axios";

import * as actionTypes from "../actionTypes/user/user";

export const profileFetchStart = () => {
  return {
    type: actionTypes.FETCH_PROFILE_START,
  };
};

export const profileFetchFail = (error) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error,
  };
};

export const profileFetchSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    uuid: payload.uuid,
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    email: payload.email,
  };
};

export const fetchProfile = () => async (dispatch) => {
  dispatch(profileFetchStart());
  try {
    const token = localStorage.getItem("token");
    const configs = axios.create({
      baseURL: "http://localhost:3000/user",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await configs.get("profile");
    dispatch(profileFetchSuccess(data.data));
  } catch (err) {
    dispatch(profileFetchFail(err));
  }
};

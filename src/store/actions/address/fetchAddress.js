import axios from "axios";

import * as actionTypes from "../actionTypes/address";

export const fetchAddressStart = () => {
  return {
    type: actionTypes.FETCH_ADDRESSES_START,
  };
};

export const fetchAddressFail = (error) => {
  return {
    type: actionTypes.FETCH_ADDRESSES_FAIL,
    error,
  };
};

export const fetchAddressSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_ADDRESSES_SUCCESS,
    payload,
  };
};

export const fetchAddresses = () => {
  return async (dispatch) => {
    dispatch(fetchAddressStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await configs.get("/address");
      dispatch(fetchAddressSuccess(response.data));
    } catch (error) {
      dispatch(fetchAddressFail(error));
    }
  };
};

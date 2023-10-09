import axios from "axios";

import * as actionTypes from "../actionTypes/address";

export const deleteAddressStart = () => {
  return {
    type: actionTypes.DELETE_ADDRESS_START,
  };
};

export const deleteAddressFail = (payload) => {
  return {
    type: actionTypes.DELETE_ADDRESS_FAIL,
    error: payload.error,
  };
};

export const deleteAddressSuccess = (payload) => {
  return {
    type: actionTypes.DELETE_ADDRESS_SUCCESS,
    payload,
  };
};

export const deleteAddress = (uuid) => {
  return async (dispatch) => {
    dispatch(deleteAddressStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await configs.delete(`/address/${uuid}`);
      dispatch(deleteAddressSuccess(response));
    } catch (error) {
      dispatch(deleteAddressFail(error.message) || "Address no found");
    }
  };
};

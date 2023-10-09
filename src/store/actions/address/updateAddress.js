import axios from "axios";

import * as actionTypes from "../actionTypes/address";

export const updateAddressStart = () => {
  return {
    type: actionTypes.UPDATE_ADDRESS_START,
  };
};

export const updateAddressFail = (error) => {
  return {
    type: actionTypes.UPDATE_ADDRESS_FAIL,
    error,
  };
};

export const updateAddressSuccess = (payload) => {
  return {
    type: actionTypes.UPDATE_ADDRESS_SUCCESS,
    payload,
  };
};

export const updateAddress = (data) => {
  return async (dispatch) => {
    dispatch(updateAddressStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await configs.put(`/address/${data.uuid}`, {
        country: data.country,
        city: data.city,
        street: data.street,
        postalCode: data.postalCode,
      });
      dispatch(updateAddressSuccess(response));
    } catch (error) {
      dispatch(updateAddressFail(error));
    }
  };
};

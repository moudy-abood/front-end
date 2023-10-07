import axios from "axios";

import * as actionTypes from "../actionTypes/address";

export const addressStart = () => {
  return {
    type: actionTypes.ADDRESS_START,
  };
};

export const addressFail = (error) => {
  return {
    type: actionTypes.ADDRESS_FAIL,
    error,
  };
};

export const addressSuccess = (token) => {
  return {
    type: actionTypes.ADDRESS_SUCCESS,
    idToken: token,
  };
};

export const createAddress = (data) => {
  return async (dispatch) => {
    dispatch(addressStart());
    try {
      const addressData = {
        country: data.country,
        city: data.city,
        street: data.street,
        postalCode: data.postalCode,
      };
      const token = localStorage.getItem("token");
      const configs = axios.create({
        headers: { Authorization: `Bearer ${token}` },
        baseURL: "http://localhost:3000",
      });

      const response = await configs.post("/address", addressData);
      return dispatch(addressSuccess(response));
    } catch (err) {
      dispatch(addressFail(err.response.data.validation.body.message));
    }
  };
};

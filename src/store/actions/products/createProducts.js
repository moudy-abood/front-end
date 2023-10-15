import axios from "axios";

import * as actionTypes from "../actionTypes/products";

export const createProductsStart = () => {
  return {
    type: actionTypes.CREATE_PRODUCTS_START,
  };
};

export const createProductsFail = (error) => {
  return {
    type: actionTypes.CREATE_PRODUCTS_FAIL,
    error,
  };
};

export const createProductsSuccess = (payload) => {
  return {
    type: actionTypes.CREATE_PRODUCTS_SUCCESS,
    payload,
  };
};

export const createProducts = (data) => {
  return async (dispatch) => {
    dispatch(createProductsStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        headers: { Authorization: `Bearer ${token}` },
        baseURL: "http://localhost:3000",
      });
      const response = await configs.post("/product", data);
      dispatch(createProductsSuccess(response));
    } catch (error) {
      dispatch(createProductsFail(error.message));
    }
  };
};

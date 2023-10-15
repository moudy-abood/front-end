import axios from "axios";

import * as actionTypes from "../actionTypes/products";

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error,
  };
};

export const fetchProductsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await configs.get("/product");
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFail(error.message));
    }
  };
};

import axios from "axios";

import * as actionTypes from "../actionTypes/products";

export const deleteProductStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};

export const deleteProductFail = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAIL,
    error,
  };
};

export const deleteProductSuccess = (payload) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload
    }
}

export const deleteProduct= (data) => {
  return async (dispatch) => {
    dispatch(deleteProductStart());
    try {
      const token = localStorage.getItem("token");
      const configs = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await configs.delete(`/product/${data.uuid}`);
      dispatch(deleteProductSuccess(response));
    } catch (error) {
      dispatch(deleteProductFail(error.message));
    }
  };
};

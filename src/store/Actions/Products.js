import * as actionTypes from "../ActionTypes/Products";
import * as services from "../Services/ProductsServices";

export const createProducts = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_PRODUCTS,
    });
    try {
      const response = await services.createProductsService(data);
      dispatch({
        type: actionTypes.CREATE_PRODUCTS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_PRODUCTS_FAIL,
        error: error.message,
      });
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS,
    });
    try {
      const response = await services.getProductsService();
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error.message,
      });
    }
  };
};

export const updateProduct = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT,
    });
    try {
      const response = await services.updateProductService(data);
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        error: error.message,
      });
    }
  };
};

export const deleteProduct = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
    });
    try {
      const response = await services.deleteProductService(data);
      dispatch({
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error.message,
      });
    }
  };
};

import * as actionTypes from "../ActionTypes/Product";
import * as services from "../Services/ProductServices";

export const createProducts = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_PRODUCTS,
    });
    try {
      await services.createProductsService(data);
      dispatch({
        type: actionTypes.CREATE_PRODUCTS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_PRODUCTS_FAIL,
        error: error.message,
      });
    }
  };
};

export const fetchAllProducts = (options) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_ALL,
    });
    try {
      const response = await services.getAllProductsService(options);
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_ALL_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_ALL_FAIL,
        error: error.message,
      });
    }
  };
};

// this function might not be needed, keeping it for later
export const fetchProducts = (page) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS,
    });
    try {
      const response = await services.getProductsService(page);
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

export const getCategoryProducts = (options) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCTS_BY_CATEGORY,
    });
    try {
      const response = await services.getCategoryProducts(options);
      dispatch({
        type: actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL,
        error: error.message,
      });
    }
  };
};

export const fetchProduct = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_PRODUCT
    });
    try {
      const response = await services.getProductService(data)
      dispatch({
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error.message,
      });
    }
  }
}

export const updateProduct = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT,
    });
    try {
      await services.updateProductService(data);
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
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
      await services.deleteProductService(data);
      dispatch({
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error.message,
      });
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_CATEGORIES,
    });
    try {
      const response = await services.getCategories();
      dispatch({
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_CATEGORIES_FAIL,
        error: error.message,
      });
    }
  };
};

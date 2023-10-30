import * as actionTypes from "../ActionTypes/Cart";
import * as services from "../Services/CartServices";

export const createCart = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_CART,
    });
    try {
      const response = await services.createCartService();
      dispatch({
        type: actionTypes.CREATE_CART_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_CART_FAIL,
        error: error.message,
      });
    }
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_CART,
    });
    try {
      const response = await services.getCartService();
      dispatch({
        type: actionTypes.FETCH_CART_SUCCESS,
        cartUuid: response.uuid,
        status: response.status,
        items: response.Items,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_CART_FAIL,
        error: error.message,
      });
    }
  };
};

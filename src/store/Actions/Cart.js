import * as actionTypes from "../ActionTypes/Cart";
import * as services from "../Services/CartServices";

export const createCart = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_CART,
    });
    try {
      await services.createCartService();
      dispatch({
        type: actionTypes.CREATE_CART_SUCCESS,
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

export const createItems = (data, cartUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ITEM,
    });
    try {
      await services.createItemService(data, cartUuid);
      dispatch({
        type: actionTypes.CREATE_ITEM_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ITEM_FAIL,
        error: error.message,
      });
      return { success: false };
    }
  };
};

export const updateItem = (itemUuid, newQuantity, cartUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ITEM,
    });
    try {
      await services.updateItemService(itemUuid, newQuantity, cartUuid);
      dispatch({
        type: actionTypes.UPDATE_ITEM_SUCCESS,
        itemUuid,
        newQuantity,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

export const deleteItem = (uuid, cartUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ITEM,
    });
    try {
      await services.deleteItemService(uuid, cartUuid);
      dispatch({
        type: actionTypes.DELETE_ITEM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

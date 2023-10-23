import * as actionTypes from "../ActionTypes/Items";
import * as services from "../Services/ItemsServices";

export const createItems = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ITEM,
    });
    try {
      const response = await services.createItemService(data);
      dispatch({
        type: actionTypes.CREATE_ITEM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

export const updateItem = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ITEM,
    });
    try {
      const response = await services.updateItemService(data);
      dispatch({
        type: actionTypes.UPDATE_ITEM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

export const deleteItem = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ITEM,
    });
    try {
      const response = await services.deleteItemService(uuid);
      dispatch({
        type: actionTypes.DELETE_ITEM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

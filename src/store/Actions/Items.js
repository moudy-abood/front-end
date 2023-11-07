import * as actionTypes from "../ActionTypes/Items";
import * as services from "../Services/ItemsServices";

export const createItems = (data,cartUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ITEM,
    });
    try {
      await services.createItemService(data, cartUuid);
      dispatch({
        type: actionTypes.CREATE_ITEM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ITEM_FAIL,
        error: error.message,
      });
    }
  };
};

export const updateItem = (data, cartUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ITEM,
    });
    try {
      await services.updateItemService(data, cartUuid);
      dispatch({
        type: actionTypes.UPDATE_ITEM_SUCCESS,
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

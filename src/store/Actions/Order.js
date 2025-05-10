import * as actionTypes from "../ActionTypes/Order";
import * as services from "../Services/OrderServices";

export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ORDER,
    });
    try {
      await services.createOrderService(data);
      dispatch({
        type: actionTypes.CREATE_ORDER_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ORDER_FAIL,
        error: error?.validation?.body?.message,
      });
      return { success: false };
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ORDERS,
    });
    try {
      const response = await services.getOrdersService();
      dispatch({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error.message,
      });
    }
  };
};

export const fetchOrder = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ORDER,
    });
    try {
      const response = await services.getOrderService(uuid);
      dispatch({
        type: actionTypes.FETCH_ORDER_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error.message,
      });
    }
  };
};

export const updateOrder = (uuid, updateField) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ORDER,
    });
    try {
      await services.updateOrderService(uuid, updateField);
      dispatch({
        type: actionTypes.UPDATE_ORDER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ORDER_FAIL,
        error: error.message,
      });
    }
  };
};

export const deleteOrder = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ORDER,
    });
    try {
      await services.deleteOrderService(uuid);
      dispatch({
        type: actionTypes.DELETE_ORDER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error.message,
      });
    }
  };
};

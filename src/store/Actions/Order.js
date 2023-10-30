import { type } from "@testing-library/user-event/dist/type";
import * as actionTypes from "../ActionTypes/Order";
import * as services from "../Services/OrderServices";

export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ORDER,
    });
    try {
      const response = await services.createOrderService(data);
      dispatch({
        type: actionTypes.CREATE_ORDER_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ORDER_FAIL,
        error: error.message,
      });
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


export const updateOrder = (uuid, updateField) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ORDER
    })
    try {
      const response = await services.updateOrderService(uuid, updateField)
      dispatch({
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ORDER_FAIL,
        error: error.message,
      })
    }
  }
}

export const deleteOrder = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ORDER,
    })
    try {
      const response = await services.deleteOrderService(uuid);
      dispatch({
        type: actionTypes.DELETE_ORDER_SUCCESS,
        payload: response,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error.message,
      })
    }
  }
}
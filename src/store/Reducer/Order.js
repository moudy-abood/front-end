import * as actionTypes from "../ActionTypes/Order";

const initialState = {
  cartUuid: "",
  address: {},
  temporaryAddress: {},
  total: 0,
  orders: [],
  order: {},
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        cartUuid: action?.payload,
        address: action?.payload,
        temporaryAddress: action?.payload,
        total: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        order: action?.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default orderReducer;

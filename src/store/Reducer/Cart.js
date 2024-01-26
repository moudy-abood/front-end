import * as actionTypes from "../ActionTypes/Cart";

const initialState = {
  cartUuid: "",
  status: "",
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CART:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_CART_SUCCESS:
      return {
        ...state,
        cartUuid: action?.cartUuid,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_CART:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        cartUuid: action?.cartUuid,
        status: action?.status,
        items: action?.items,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default cartReducer;

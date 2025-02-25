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
    case actionTypes.CREATE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_ITEM_SUCCESS:      
      return {
        ...state,
        items: state?.items?.map((item) =>
          item?.uuid === action?.itemUuid
            ? { ...item, quantity: action?.newQuantity }
            : item
        ),
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default cartReducer;

import * as actionTypes from "../ActionTypes/Products";

const initialState = {
  products: [],
  product: {},
  uuid: "",
  loading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        uuid: action?.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default productsReducer;

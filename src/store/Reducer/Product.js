import * as actionTypes from "../ActionTypes/Product";

const initialState = {
  products: [],
  allProducts: [],
  product: {},
  search: "",
  category: [],
  productsByCategory: [],
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
    case actionTypes.FETCH_PRODUCTS_ALL:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS_ALL_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_PRODUCTS_ALL_SUCCESS:
      return {
        ...state,
        allProducts: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action?.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        category: action?.payload,
        loading: false,
        error: null,
      };

    case actionTypes.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productsByCategory: action?.payload,
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
        currentPage: action?.payload,
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

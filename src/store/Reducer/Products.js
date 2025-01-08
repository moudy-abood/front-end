import * as actionTypes from "../ActionTypes/Products";

const initialState = {
  products: [],
  allProducts: [],
  product: {},
  search: "",
  category: [],
  productsByCategory: [],
  selectedCategory: "",
  uuid: "",
  page: 1,
  totalCount: "",
  totalPages: "",
  currentPage: "",
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
        currentPage: action?.payload,
        totalPages: action?.payload,
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

    case actionTypes.SEARCH_BAR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SEARCH_BAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.SEARCH_BAR_SUCCESS:
      return {
        ...state,
        search: action?.payload,
        error: null,
      };
    case actionTypes.GET_CURRENT_PAGE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CURRENT_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.GET_CURRENT_PAGE_SUCCESS:
      return {
        ...state,
        page: action?.payload,
        error: null,
      };
    case actionTypes.SELECTED_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SELECTED_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.SELECTED_CATEGORY_SUCCESS:
      return {
        ...state,
        selectedCategory: action?.payload,
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

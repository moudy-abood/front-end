import * as actionTypes from "../../actions/actionTypes/products";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const fetchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default fetchProductsReducer;

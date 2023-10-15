import * as actionTypes from "../../actions/actionTypes/products";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default updateProductReducer;

import * as actionTypes from "../../actions/actionTypes/products";

const initialState = {
  uuid: "",
  loading: false,
  error: null,
};

const deleteProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        uuid: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default deleteProductReducer;

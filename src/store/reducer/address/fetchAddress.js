import * as actionTypes from "../../actions/actionTypes/address";

const initialState = {
  addresses: [],
  error: null,
  loading: false,
};

const fetchAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADDRESSES_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.FETCH_ADDRESSES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default fetchAddressReducer;

import * as actionTypes from "../../actions/actionTypes/address";

const initialState = {
  uuid: "",
  loading: false,
  error: null,
};

const deleteAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_ADDRESS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.DELETE_ADDRESS_SUCCESS:
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

export default deleteAddressReducer;

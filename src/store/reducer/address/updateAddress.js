import * as actionTypes from "../../actions/actionTypes/address";

const initialState = {
  country: "",
  city: "",
  street: "",
  postalCode: 0,
  error: null,
  loading: false,
};

const updateAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ADDRESS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
      return {
        country: action.country,
        city: action.country,
        street: action.street,
        postalCode: action.postalCode,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default updateAddressReducer;

import * as actionTypes from "../ActionTypes/Address";

const initialState = {
  addresses: [],
  address: {},
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ADDRESSES_FAIL:
      return {
        ...state,
        error: action?.error,
        loading: false,
      };
    case actionTypes.FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action?.payload,
        error: null,
        loading: false,
      };
    case actionTypes.UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        error: action?.error,
        loading: false,
      };
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
      return {
        country: action?.country,
        city: action?.country,
        street: action?.street,
        postalCode: action?.postalCode,
        error: null,
        loading: false,
      };
    case actionTypes.DELETE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_ADDRESS_SUCCESS:
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

export default addressReducer;

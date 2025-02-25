import * as actionTypes from "../ActionTypes/User";

const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        uuid: action?.uuid,
        name: action?.name,
        phoneNumber: action?.phoneNumber,
        email: action?.email,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        email:action?.payload?.email,
        name: action?.payload?.name,
        phoneNumber: action?.payload?.phoneNumber,
      };
    case actionTypes.UPDATE_USER_CREDENTIALS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_USER_CREDENTIALS_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.UPDATE_USER_CREDENTIALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default profileReducer;

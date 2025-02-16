import * as actionTypes from "../ActionTypes/Auth";

const initialState = {
  error: null,
  failedLogin: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.error,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        error: null,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        failedLogin: action?.payload,
        error: action?.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

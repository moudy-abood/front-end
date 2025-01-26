import * as actionTypes from "../../ActionTypes/User/Auth";

const initialState = {
  token: null,
  error: null,
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
        token: action?.tokenId,
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
        token: null,
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
        error: action?.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action?.tokenId,
      };
    default:
      return state;
  }
};

export default authReducer;

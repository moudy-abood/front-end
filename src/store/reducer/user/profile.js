import * as actionTypes from "../../ActionTypes/User/User";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        uuid: action.uuid,
        name: action.name,
        phoneNumber: action.phoneNumber,
        email: action.email,
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        name: action.name,
        phoneNumber: action.phoneNumber,
        email: action.email,
        password: action.password,
      };
    case actionTypes.DELETE_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DELETE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.DELETE_PROFILE_SUCCESS:
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

export default profileReducer;

import * as actionTypes from "../../actions/actionTypes/user/user";

const initialState = {
  uuid: "",
  loading: false,
  error: null,
};

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PROFILE_START:
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

export default deleteUserReducer;

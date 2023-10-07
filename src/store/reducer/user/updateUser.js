import * as actionTypes from "../../actions/actionTypes/user/user";

const initialState = {
  name: null,
  phoneNumber: null,
  email: null,
  password: null,
  loading: false,
  error: null,
};

const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE_START:
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
    default:
      return state;
  }
};

export default updateUserReducer;

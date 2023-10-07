import * as actionTypes from "../../actions/actionTypes/user/user";

const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.PROFILE_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        name: action.name,
        phoneNumber: action.phoneNumber,
        email: action.email,
      };

    default:
      return state;
  }
};

export default profileReducer;

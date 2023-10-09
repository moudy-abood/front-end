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
    case actionTypes.FETCH_PROFILE_START:
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
        name: action.name,
        phoneNumber: action.phoneNumber,
        email: action.email,
      };

    default:
      return state;
  }
};

export default profileReducer;

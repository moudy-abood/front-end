import * as actionTypes from "../../ActionTypes/User/Auth";
import API from "../../Services/API";

export const signUp = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_START,
    });
    try {
      const signUpData = {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };

      const response = await API.post("/user", signUpData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: response.data.payload,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SIGNUP_FAIL,
        error: error.message,
      });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN
    })
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const response = await API.post("/login", loginData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        idToken: response.data.payload,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        error: error.message,
      })
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT,
  };
};

import * as actionTypes from "../../ActionTypes/User/Auth";
import API from "../../Services/API";

export const auth = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_START,
    });
    try {
      const authData = {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };

      const response = await API.post("/register", authData);
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        idToken: response.data.payload,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
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
    type: actionTypes.AUTH_LOGOUT,
  };
};

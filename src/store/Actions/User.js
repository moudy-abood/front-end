import * as actionTypes from "../ActionTypes/User";
import * as services from "../Services/UserServices";

export const fetchUser = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_USER,
  });
  try {
    const response = await services.getUserService();
    dispatch({
      type: actionTypes.FETCH_USER_SUCCESS,
      name: response.name,
      phoneNumber: response.phoneNumber,
      email: response.email,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_USER_FAIL,
      error: error.message,
    });
  }
};

export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_USER,
    });
    try {
      await services.updateUserService(data);
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: data,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_USER_FAIL,
        error: error,
      });
      return { success: false };
    }
  };
};

export const updateUserCredentials = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_USER_CREDENTIALS,
    });
    try {
      await services.updateUserCredentialsService(data);
      dispatch({
        type: actionTypes.UPDATE_USER_CREDENTIALS_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_USER_CREDENTIALS_FAIL,
        error: error?.validation?.body?.message || error,
      });
      return { success: false };
    }
  };
};

export const deleteUser = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_USER,
    });
    try {
      await services.deleteUserService(uuid);
      localStorage.removeItem("token");
      dispatch({
        type: actionTypes.DELETE_USER_SUCCESS,
      });
    } catch (error) {
      dispatch(
        {
          type: actionTypes.DELETE_USER_FAIL,
          error: error.message,
        } || "User not found"
      );
    }
  };
};

import * as actionTypes from "../../ActionTypes/User/User";
import * as services from "../../Services/UserServices";

export const fetchProfile = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_PROFILE,
  });
  try {
    const response = await services.getProfileService();
    dispatch({
      type: actionTypes.FETCH_PROFILE_SUCCESS,
      uuid: response.uuid,
      name: response.name,
      phoneNumber: response.phoneNumber,
      email: response.email,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_PROFILE_FAIL,
      error: error.message,
    });
  }
};

export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
    });
    try {
      await services.updateUserService(data);
      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_FAIL,
        error: error.message,
      });
    }
  };
};

export const deleteUser = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PROFILE,
    });
    try {
      await services.deleteUserService(uuid);
      localStorage.removeItem("token");
      dispatch({
        type: actionTypes.DELETE_PROFILE_SUCCESS,
      });
    } catch (error) {
      dispatch(
        {
          type: actionTypes.DELETE_PROFILE_FAIL,
          error: error.message,
        } || "User not found"
      );
    }
  };
};

import * as actionTypes from "../ActionTypes/Address";
import * as services from "../Services/AddressServices";

export const createAddress = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ADDRESS,
    });
    try {
      const addressData = {
        country: data.country,
        city: data.city,
        street: data.street,
        postalCode: data.postalCode,
      };
      await services.createAddressService(addressData);
      dispatch({
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ADDRESS_FAIL,
        error: error?.response?.data?.validation?.body?.message,
      });
      return { success: false };
    }
  };
};

export const fetchAddresses = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ADDRESSES,
    });
    try {
      const response = await services.listAddressesService();
      dispatch({
        type: actionTypes.FETCH_ADDRESSES_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ADDRESSES_FAIL,
        error: error,
      });
    }
  };
};

export const fetchAddress = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ADDRESS,
    });
    try {
      const response = await services.AddressService(uuid);
      dispatch({
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ADDRESS_FAIL,
        error: error.message,
      });
    }
  };
};

export const updateAddress = (data, addressUuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ADDRESS,
    });
    try {
      await services.updateAddressService(data, addressUuid);
      dispatch({
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ADDRESS_FAIL,
        error: error?.validation?.body?.message,
      });
      return { success: false };
    }
  };
};

export const deleteAddress = (uuid) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_ADDRESS,
    });
    try {
      await services.deleteAddressService(uuid);
      dispatch({
        type: actionTypes.DELETE_ADDRESS_SUCCESS,
      });
      return { success: true}
    } catch (error) {
      dispatch(
        {
          type: actionTypes.DELETE_ADDRESS_FAIL,
          error: error.message,
        }
      );
      return { success: false}
    }
  };
};

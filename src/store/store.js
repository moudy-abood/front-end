import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./reducer/user/auth";
import addressReducer from "./reducer/address/address";
import profileReducer from "./reducer/user/profile";
import updateUserReducer from "./reducer/user/updateUser";
import deleteUserReducer from "./reducer/user/deleteUser";
import updateAddressReducer from "./reducer/address/updateAddress";
import fetchAddressReducer from "./reducer/address/fetchAddress";
import deleteAddressReducer from "./reducer/address/deleteAddress";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    updateUserReducer,
    deleteUserReducer,
    addressReducer,
    fetchAddressReducer,
    updateAddressReducer,
    deleteAddressReducer
  },
  middleware: [thunk],
});

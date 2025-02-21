import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./Reducer/Auth";
import profileReducer from "./Reducer/User";
import addressReducer from "./Reducer/Address";
import productsReducer from "./Reducer/Product";
import cartReducer from "./Reducer/Cart";
import orderReducer from "./Reducer/Order";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    addressReducer,
    productsReducer,
    cartReducer,
    orderReducer,
  },
  middleware: [thunk],
});

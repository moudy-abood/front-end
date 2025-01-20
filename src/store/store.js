import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./Reducer/User/Auth";
import profileReducer from "./Reducer/User/Profile";
import addressReducer from "./Reducer/Address";
import productsReducer from "./Reducer/Product";
import cartReducer from "./Reducer/Cart";
import itemsReducer from "./Reducer/Item";
import orderReducer from "./Reducer/Order";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    addressReducer,
    productsReducer,
    cartReducer,
    itemsReducer,
    orderReducer,
  },
  middleware: [thunk],
});

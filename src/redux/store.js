import authReducer from "./slice/authReducer";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutReducer";
import filterReducer from "./slice/filterReducer";
import orderReducer from "./slice/orderReducer";
import productReducer from "./slice/productReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    filterReducer,
    cartReducer,
    checkoutReducer,
    orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

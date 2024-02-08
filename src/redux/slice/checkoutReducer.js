import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const checkoutReducer = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = action.payload;
    },
    SAVE_BILLING_ADDRESS: (state, action) => {
      state.billingAddress = action.payload;
    },
  },
});

export const selectShippingAddress = (state) =>
  state.checkoutReducer.shippingAddress;

export const selectBillingAddress = (state) =>
  state.checkoutReducer.billingAddress;

export const { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS } =
  checkoutReducer.actions;

export default checkoutReducer.reducer;

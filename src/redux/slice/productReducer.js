import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCT: (state, action) => {
      // console.log(action.payload);
      state.products = action.payload.products;
    },

    GET_PRICE_RANGE: (state, action) => {
      // console.log(action.payload);
      const { products } = action.payload;

      const array = [];
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });

      const max = Math.max(...array);
      const min = Math.min(...array);
      
      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PRODUCT, GET_PRICE_RANGE } = productReducer.actions;
export const selectProducts = (state) => state.productReducer.products;
export const selectMinPrice = (state) => state.productReducer.minPrice;
export const selectMaxPrice = (state) => state.productReducer.maxPrice;
export default productReducer.reducer;

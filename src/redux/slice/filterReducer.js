import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;

      const tempProduct = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProduct;

      // console.log(tempProduct);
    },

    SORT_PRODUCTS: (state, action) => {
      // console.log(action.payload);
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProducts = [];

      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      state.filteredProducts = tempProducts;
    },

    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProducts = [];

      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_PRICE: (state, action) => {
      // console.log(action.payload);
      const { products, price } = action.payload;

      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterReducer.actions;
export const selectFilterProducts = (state) =>
  state.filterReducer.filteredProducts;

export default filterReducer.reducer;

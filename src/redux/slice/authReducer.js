import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, userName, userID } = action.payload;

      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },

    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  },
});

export const actions = authReducer.actions;

export const authSelector = (state) => state.authReducer;

export const selectIsLoggedIN = (state) => state.authReducer.isLoggedIn;
export const selectEmail = (state) => state.authReducer.email;
export const selectUserName = (state) => state.authReducer.userName;
export const selectUserID = (state) => state.authReducer.userID;

export default authReducer.reducer;
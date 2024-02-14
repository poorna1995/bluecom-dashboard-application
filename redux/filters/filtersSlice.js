import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  productFilters: {
    category: "",
    type: "",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setProductFilters(state, action) {
      state.productFilters = action.payload;
    },
  },
  extraReducers: {
    [signOutUser.type]: (state, action) => {
      return initialState;
    },
    [signInUser.type]: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

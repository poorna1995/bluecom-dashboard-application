import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  shopifyData: undefined,
};

export const thirdPartyDataSlice = createSlice({
  name: "thirdPartyData",
  initialState,
  reducers: {
    addShopifyData(state, action) {
      state.shopifyData = action.payload;
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
export const { addShopifyData } = thirdPartyDataSlice.actions;

export default thirdPartyDataSlice.reducer;

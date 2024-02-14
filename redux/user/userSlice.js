import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
  connectedApps: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser(state, action) {
      state.currentUser = action.payload;
    },
    signOutUser(state, action) {
      state.currentUser = undefined;
    },
    updateUserData(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setConnectedApps(state, action) {
      state.connectedApps = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInUser, signOutUser, updateUserData, setConnectedApps } =
  userSlice.actions;

export default userSlice.reducer;

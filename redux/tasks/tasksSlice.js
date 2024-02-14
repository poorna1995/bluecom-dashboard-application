import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  syncInventoryTaskId: undefined,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSyncInventoryTaskId(state, action) {
      state.syncInventoryTaskId = action.payload;
    },
    resetSyncInventoryTaskId(state) {
      state.syncInventoryTaskId = undefined;
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

export const { setSyncInventoryTaskId, resetSyncInventoryTaskId } =
  tasksSlice.actions;

export default tasksSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const tablePagesSlice = createSlice({
  name: "tablePages",
  initialState,
  reducers: {
    setTableCurrentPage(state, action) {},
  },
});

export const { setTableCurrentPage } = tablePagesSlice.actions;

export default tablePagesSlice.reducer;

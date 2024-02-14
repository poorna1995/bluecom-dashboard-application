import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventoryPageList: [],
  inventoryProductData: {},
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventoryPageList(state, action) {
      state.inventoryPageList = action.payload;
    },
    setInventoryProductData(state, action) {
      state.inventoryProductData = action.payload;
    },
  },
});

export const { setInventoryPageList, setInventoryProductData } =
  inventorySlice.actions;

export default inventorySlice.reducer;

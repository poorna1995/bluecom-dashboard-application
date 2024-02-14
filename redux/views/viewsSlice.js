import { createSlice } from "@reduxjs/toolkit";
import INVENTORY_DRAWER_STATUS from "constants/status/inventoryDrawerStatus";
import INVENTORY_DRAWER_TYPE from "constants/status/inventoryDrawerType";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  productPageView: "list",
  isDrawerOpen: true,
  warehousePageView: "list",
  isLoading: false,
  drawerCollapse: {
    openCollapse: false,
    collapseName: "",
  },
  isDemoBannerVisible: false,
  inventoryMobileViewDrawerStatus: {
    type: INVENTORY_DRAWER_TYPE.VARIANTS, // two types are locations and variants
    status: INVENTORY_DRAWER_STATUS.CLOSED, // status are open and closed
    product_id: "",
    data: [],
  },
};

export const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    setProductPageView(state, action) {
      state.productPageView = action.payload;
    },
    setWarehousePageView(state, action) {
      state.warehousePageView = action.payload;
    },
    changeDrawerState(state, action) {
      state.isDrawerOpen = action.payload;
    },
    setViewLoading(state, action) {
      state.isLoading = action.payload;
    },
    setDrawerCollapse(state, action) {
      state.drawerCollapse = action.payload;
    },
    setIsDemoBannerVisible(state, action) {
      state.isDemoBannerVisible = action.payload;
    },
    setInventoryMobileViewDrawerStatus(state, action) {
      const { type, status, product_id, data } = action.payload;
      state.inventoryMobileViewDrawerStatus = {
        type: type ?? INVENTORY_DRAWER_TYPE.VARIANTS,
        status: status ?? INVENTORY_DRAWER_STATUS.CLOSED,
        product_id: product_id ?? "",
        data: data ?? [],
      };
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
export const {
  setProductPageView,
  changeDrawerState,
  setWarehousePageView,
  setViewLoading,
  setDrawerCollapse,
  setIsDemoBannerVisible,
  setInventoryMobileViewDrawerStatus,
} = viewsSlice.actions;

export default viewsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  order: {},
  orderListLoading: true,
  orderDetailsLoading: true,
  isLoading: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setOrderDetailsLoading(state, action) {
      state.orderDetailsLoading = action.payload;
    },
    setOrderListLoading(state, action) {
      state.orderListLoading = action.payload;
    },
    updateOrderLineItem(state, action) {},
    // saga actions for setting the order details
    fetchOrderDetailsStart(state, action) {},
    setOrderDetails(state, action) {
      state.order = action.payload;
    },
    fetchOrderListStart() {},
    setOrderList(state, action) {
      state.orders = action.payload;
    },
    setOrderPageComponentLoading(state, action) {
      state.isLoading[action.payload] = true;
    },
  },
});

export const {
  setOrders,
  setOrderDetails,
  setOrderDetailsLoading,
  setOrderListLoading,
  setOrderList,
  setOrderPageComponentLoading,
  fetchOrderDetailsStart,
  fetchOrderListStart,
  updateOrderLineItem,
} = ordersSlice.actions;

export default ordersSlice.reducer;

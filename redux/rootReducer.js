import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// reducers
import userSlice from "./user/userSlice";
import viewsSlice from "./views/viewsSlice";
import thirdPartyDataSlice from "./thirdPartyData/thirdPartyDataSlice";
import productsSlice from "./products/productsSlice";
import storeSlice from "./stores/storeSlice";
import purchaseOrdersSlice from "./purchaseOrders/purchaseOrdersSlice";
import onboardingSlice from "./onboarding/onboardingSlice";
import filtersSlice from "./filters/filtersSlice";
import tablePagesSlice from "./tablesPages/tablePagesSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import tasksSlice from "./tasks/tasksSlice";
import ordersSlice from "./orders/ordersSlice";
import inventorySlice from "./inventory/inventorySlice";

export const rootReducer = combineReducers({
  user: userSlice,
  views: viewsSlice,
  thirdPartyData: thirdPartyDataSlice,
  productsData: productsSlice,
  storesData: storeSlice,
  purchaseOrdersData: purchaseOrdersSlice,
  onboardingData: onboardingSlice,
  filtersData: filtersSlice,
  tablePagesData: tablePagesSlice,
  dashboardData: dashboardSlice,
  tasks: tasksSlice,
  orders: ordersSlice,
  inventory: inventorySlice,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "views",
    "productsData",
    "purchaseOrdersData",
    "onboardingData",
    "tablePagesData",
    "dashboardData",
    "storesData",
    "tasks",
    "orders",
  ],
};

export default persistReducer(configStorage, rootReducer);

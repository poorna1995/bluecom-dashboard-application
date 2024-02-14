import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser } from "redux/user/userSlice";
import { ACTION_POPUP_OPTIONS } from "sections/StoresPageSections/AddNewStorePageSections/AddNewStoreConnectLocationSections/CustomRadioGroup";

const initialState = {
  connectedStores: [],
  storeData: {},
  storeDict: {},
  storeOnboardingData: {
    method: ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM,
    locationName: "",
    bluecomLocationId: "",
  },
};

export const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setConnectedStores(state, action) {
      state.connectedStores = action.payload;
    },
    setStoreData(state, action) {
      state.storeData = action.payload;
    },
    setStoreDict(state, action) {
      state.storeDict = action.payload;
    },
    setStoreOnboardingLocationName(state, action) {
      state.storeOnboardingData.locationName = action.payload;
    },
    setStoreOnboardingAction(state, action) {
      state.storeOnboardingData.method = action.payload;
    },
    setBluecomLocationId(state, action) {
      state.storeOnboardingData.bluecomLocationId = action.payload;
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
  setConnectedStores,
  setStoreData,
  setStoreDict,
  setStoreOnboardingAction,
  setStoreOnboardingLocationName,
  setBluecomLocationId,
} = storeSlice.actions;

export default storeSlice.reducer;

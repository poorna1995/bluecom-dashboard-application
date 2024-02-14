import { createSlice } from "@reduxjs/toolkit";
import { update } from "lodash";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  onboardingSteps: {
    // produ
  },
  productOnboarding: {
    "general-info": "in-progress",
    media: "disabled",
    variants: "disabled",
    "select-vendor": "disabled",
    inventory: "disabled",
  },
  vendorOnboarding: {
    "general-info": "in-progress",
    products: "disabled",
  },
  bundleOnboarding: {
    "general-info": "in-progress",
    media: "disabled",
    components: "disabled",
  },
  componentOnboarding: {
    "general-info": "in-progress",
    media: "disabled",
    "select-vendor": "disabled",
    inventory: "disabled",
  },
  purchaseOrderOnboarding: {
    "po-details": "in-progress",

    preview: "disabled",
    // "send-po": "disabled",
  },
  singleProductPublishOnboarding: {
    "select-store": "in-progress",
    "review-product": "disabled",
    publish: "disabled",
  },
  bulkProductPublishOnboarding: {
    "select-store": "in-progress",
    "select-products": "disabled",
    "review-products": "disabled",
    "publish-bulk": "disabled",
  },
  store: {
    "select-channel": "in-progress",
    "add-new-store": "disabled",
    "store-analysis": "disabled",
    "connect-location": "disabled",
    sync: "disabled",
  },
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateProductOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.productOnboarding = {
        ...state.productOnboarding,
        // ...action.payload,
        [step]: "completed",
        [nextStep]: "in-progress",
      };
    },
    resetProductOnboardingSteps(state, action) {
      state.productOnboarding = {
        "general-info": "in-progress",
        media: "disabled",
        variants: "disabled",
        "select-vendor": "disabled",
        inventory: "disabled",
      };
    },
    resetVendorOnboardingSteps(state, action) {
      state.vendorOnboarding = {
        "general-info": "in-progress",
        products: "disabled",
      };
    },
    updateVendorOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.vendorOnboarding = {
        ...state.vendorOnboarding,
        // ...action.payload,
        [step]: "completed",
        [nextStep]: "in-progress",
      };
    },

    updateBundleOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.bundleOnboarding = {
        ...state.bundleOnboarding,
        // ...action.payload,
        [step]: "completed",
        [nextStep]: "in-progress",
      };
    },

    resetBundleOnboardingSteps(state, action) {
      state.bundleOnboarding = {
        "general-info": "in-progress",
        media: "disabled",
        components: "disabled",
      };
    },

    updateComponentOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.componentOnboarding = {
        ...state.componentOnboarding,
        // ...action.payload,
        [step]: "completed",
        [nextStep]: "in-progress",
      };
    },
    resetComponentOnboardingSteps(state, action) {
      state.componentOnboarding = {
        "general-info": "in-progress",
        media: "disabled",
        inventory: "disabled",
      };
    },

    updatePurchaseOrderOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.purchaseOrderOnboarding = {
        ...state.purchaseOrderOnboarding,
        // ...action.payload,
        [step]: "completed",
        // [step]: "disabled",
        [nextStep]: "in-progress",
      };
    },

    resetPurchaseOrderOnboardingSteps(state, action) {
      state.purchaseOrderOnboarding = {
        "po-details": "in-progress",
        preview: "disabled",
        // "send-po": "disabled",
      };
    },
    resetOnboardingSteps(state, action) {
      return initialState;
    },

    updateSingleProductPublishOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.singleProductPublishOnboarding = {
        ...state.singleProductPublishOnboarding,
        // ...action.payload,
        [step]: "completed",
        [nextStep]: "in-progress",
      };
    },
    resetSingleProductPublishOnboardingSteps(state, action) {
      state.singleProductPublishOnboarding = {
        "select-store": "in-progress",
        "review-product": "disabled",
        publish: "disabled",
      };
    },
    updateBulkProductPublishOnboardingSteps(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;

      state.bulkProductPublishOnboarding = {
        ...state.bulkProductPublishOnboarding,
        // ...action.payload,
        [step]: "completed",

        [nextStep]: "in-progress",
      };
    },
    resetBulkProductPublishOnboardingSteps(state, action) {
      state.bulkProductPublishOnboarding = {
        "select-store": "in-progress",
        "select-products": "disabled",
        "review-products": "disabled",
        "publish-bulk": "disabled",
      };
    },
    resetStore(state, action) {
      state.store = {
        "select-channel": "in-progress",
        "add-new-store": "disabled",
        "store-analysis": "disabled",
        "connect-location": "disabled",
        sync: "disabled",
      };
    },
    updateStore(state, action) {
      const step = action.payload.step;
      const nextStep = action.payload.nextStep;
      console.log("step", step, nextStep);
      if (nextStep === undefined) {
        state.store = {
          ...state.store,
          [step]: "completed",
        };
      }
      step &&
        nextStep &&
        (state.store = {
          ...state.store,
          [step]: "completed",
          [nextStep]: "in-progress",
        });
    },
    updateStoreOnboardingTillStoreAnalysis(state, action) {
      state.store = {
        "select-channel": "completed",
        "add-new-store": "completed",
        "store-analysis": "in-progress",
        "connect-location": "disabled",
        sync: "disabled",
      };
    },

    disableStoreOnboardingStep(state, action) {
      const step = action.payload.step;
      state.store = {
        ...state.store,
        [step]: "disabled",
      };
    },

    extraReducers: {
      [signOutUser.type]: (state, action) => {
        return initialState;
      },
      [signInUser.type]: (state, action) => {
        return initialState;
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateProductOnboardingSteps,
  resetProductOnboardingSteps,
  resetVendorOnboardingSteps,
  updateVendorOnboardingSteps,
  resetBundleOnboardingSteps,
  updateBundleOnboardingSteps,
  resetComponentOnboardingSteps,
  updateComponentOnboardingSteps,
  resetPurchaseOrderOnboardingSteps,

  updatePurchaseOrderOnboardingSteps,
  resetOnboardingSteps,
  updateSingleProductPublishOnboardingSteps,
  resetSingleProductPublishOnboardingSteps,
  updateBulkProductPublishOnboardingSteps,
  resetBulkProductPublishOnboardingSteps,
  updateStore,
  resetStore,
  disableStoreOnboardingStep,
  updateStoreOnboardingTillStoreAnalysis,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

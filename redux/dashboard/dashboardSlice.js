import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: {
    task1: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
        step5: "Pending",
      },
    },
    task2: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
      },
    },
    task3: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
        step5: "Pending",
      },
    },
    task4: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
      },
    },
    task5: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
        step5: "Pending",
      },
    },
    task6: {
      status: "Pending",
      steps: {
        step1: "Pending",
        step2: "Pending",
        step3: "Pending",
        step4: "Pending",
        step5: "Pending",
      },
    },
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDashboardSteps(state, action) {
      console.log(state);
      const changes = action.payload;
      state.dashboard = {
        ...state.dashboard,
        [changes.task]: {
          ...state.dashboard[changes.task],
          status: changes.status,
          steps: {
            ...state.dashboard[changes.task].steps,
            [changes.step]: changes.value,
          },
        },
      };
      console.log(state);
    },
  },
});

export const { updateDashboardSteps } = dashboardSlice.actions;

export default dashboardSlice.reducer;

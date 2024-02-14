import { Box, Container, IconButton, Tooltip } from "@mui/material";
import StepperComponent from "components/Common/StepperComponent";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import AddNewStorePageStepperHeaderSection from "../components/AddNewStorePageStepperHeaderSection";
import AddStoreSelectChannelComponent from "../components/AddStoreSelectChannelComponent";
import AddNewStoreAddStoreSections from "./AddNewStoreAddStoreSections";
import AddNewStorePageSyncSection from "./AddNewStorePageSyncSection";
import AddNewStorePageStoreAnalysisSection from "./AddNewStorePageStoreAnalysisSection";
import AddNewStoreConnectLocationSections from "./AddNewStoreConnectLocationSections";

const stepperData = {
  "select-channel": {
    id: 0,
    label: "Select Channel",
    step: "select-channel",
    component: (
      <Container sx={{}}>
        <AddStoreSelectChannelComponent />
      </Container>
    ),
    toId: 1,
  },
  "add-new-store": {
    id: 1,
    label: "Add Store",
    step: "add-new-store",
    component: (
      <Container sx={{}}>
        <AddNewStoreAddStoreSections />
      </Container>
    ),
    toId: 2,
  },

  "store-analysis": {
    id: 2,
    label: "Store Analysis",
    step: "store-analysis",
    component: (
      <Container sx={{}}>
        <AddNewStorePageStoreAnalysisSection />
        {/* <AddNewStorePageSyncSection /> */}
      </Container>
    ),
    toId: 3,
  },
  "connect-location": {
    id: 3,
    label: "Connecting Locations",
    step: "connect-location",
    component: (
      <Container sx={{}}>
        {/* <AddNewStorePageSyncSection /> */}

        <AddNewStoreConnectLocationSections />
      </Container>
    ),
    toId: 4,
  },

  sync: {
    id: 4,
    label: "Sync",
    step: "sync",
    component: (
      <Container sx={{}}>
        <AddNewStorePageSyncSection />
      </Container>
    ),
    // toId: 1,
  },
};
export default function AddNewStorePageSections() {
  const router = useRouter();
  const steps = Object.values(stepperData);
  const activeStep = router.query.step;
  const StepComponent = activeStep && stepperData[activeStep].component;
  return (
    <div>
      {/* <AddNewStorePageStepperHeaderSection
        title={"Add New Store"}
        stepperData={steps}
      /> */}
      <Box sx={{ maxWidth: "1200px", margin: "auto", py: "76px" }}>
        {StepComponent}
      </Box>
    </div>
  );
}

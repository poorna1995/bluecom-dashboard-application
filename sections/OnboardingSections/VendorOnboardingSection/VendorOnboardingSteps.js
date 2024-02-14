import { Box, IconButton, Tooltip } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import VendorOnboardingSection from ".";
import VendorOnboardingAddProductsSection from "./VendorOnboardingAddProductsSection";
import { VENDOR } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function VendorOnboardingSteps({ data }) {
  const router = useRouter();
  const { step, id } = router.query;

  const stepperData = {
    "general-info": {
      id: 0,
      label: "Vendor Details",
      step: "general-info",
      component: (
        <>
          <VendorOnboardingSection usedIn="onboarding" data={data} />
        </>
      ),
    },

    products: {
      id: 1,
      label: "Add Products",
      step: "products",
      component: (
        <>
          <VendorOnboardingAddProductsSection />
        </>
      ),
    },
  };

  const maxWidthPage = "635px";
  const allSteps = Object.values(stepperData);
  const StepComponent = (step && stepperData[step].component) || "no";
  const currentStep = step && stepperData[step];
  const handleNextButton = (step) => {
    router.push(
      `/onboarding/products/${pageId}?step=${step.to}&id=${step.toId}`
    );
  };

  return (
    <div>
      {/* <Box
        sx={{
          position: "sticky",
          top: "0px",
          background: (theme) => theme.palette.background.default,
          // py: "16px",
          // pt: "8px",
          pt: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Box
          sx={{
            my: "16px",
            mt: 0.5,

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // marginBottom: "24px",
            // marginTop: "16px",
            flex: 1,
          }}
        >
          <Tooltip title="Go Back">
            <IconButton
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                borderRadius: "5px",
                ml: 3,
              }}
              onClick={() => router.back()}
            >
              <MdArrowBack />
            </IconButton>
          </Tooltip>
          <SectionTitleText sx={{ ml: 2, fontSize: "16px", fontWeight: 500 }}>
            Go back
          </SectionTitleText>
          <div style={{ flex: 0.5 }} />
          <SectionTitleText
            sx={{
              fontSize: "28px",
              lineHeight: "34px",
              textAlign: "center",
              flex: 1,
            }}
          >
          </SectionTitleText>
          <div style={{ flex: 0.55 }} />
        </Box>
      </Box> */}
      <Box
        sx={{
          // maxWidth: "800px",
          // margin: "auto",
          paddingBottom: "80px",
        }}
      >
        {StepComponent}
      </Box>
    </div>
  );
}

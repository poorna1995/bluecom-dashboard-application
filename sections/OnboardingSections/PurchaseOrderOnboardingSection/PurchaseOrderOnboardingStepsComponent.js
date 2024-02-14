import { Box, IconButton, Tooltip } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import PurchaseOrderOnboardingSection from ".";
import NewProductOnboardingInventoryInfoSection from "../NewProductOnboardingSections/NewProductOnboardingInventoryInfoSection";
import NewProductOnboardingPriceInfoSection from "../NewProductOnboardingSections/NewProductOnboardingPriceInfoSection";
import NewProductOnboardingProductDetailsSection from "../NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "../NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingSelectVendorSection from "../NewProductOnboardingSections/NewProductOnboardingSelectVendorSection";
import NewProductOnboardingVariantLevelInventorySection from "../NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import NewProductOnboardingVariantsInfoSection from "../NewProductOnboardingSections/NewProductOnboardingVariantsInfoSection";
import POemailPage from "./POemailPage";
import PurchaseOnboardingPreviewSection from "./PurchaseOnboardingPreviewSection";
import POPreviewSection from "./POPreviewSection";

function PurchaseOrderOnboardingStepsComponent() {
  const router = useRouter();
  const { step, id } = router.query;
  const CREATE_PRODUCT_DATA = "createProductData";
  const stepperData = {
    "po-details": {
      id: 0,
      label: "Product Details",
      step: "po-details",
      // to: "price-info",
      // toId: 1,
      component: (
        <>
          <PurchaseOrderOnboardingSection
          // keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
        </>
      ),
    },
    preview: {
      id: 1,
      label: "Product Details",
      step: "preview",
      // to: "price-info",
      // toId: 1,
      component: (
        <>
          <POPreviewSection
          // keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
        </>
      ),
    },
    // "send-po": {
    //   id: 2,
    //   label: "Product Details",
    //   step: "send-po",
    //   // to: "price-info",
    //   // toId: 1,
    //   component: (
    //     <>
    //       <POemailPage
    //       // keyForReduxStateData={CREATE_PRODUCT_DATA}
    //       />
    //     </>
    //   ),
    // },
  };
  const maxWidthPage = "635px";
  const allSteps = Object.values(stepperData);
  const StepComponent = (step && stepperData[step].component) || "";
  const currentStep = step && stepperData[step];
  const handleNextButton = (step) => {
    router.push(
      `/onboarding/products/${pageId}?step=${step.to}&id=${step.toId}`
    );
  };

  return (
    <div>
      <Box
        sx={
          {
            // position: "sticky",
            // top: "0px",
            // background: (theme) => theme.palette.background.default,
            // // py: "16px",
            // // pt: "8px",
            // pt: 1,
            // zIndex: (theme) => theme.zIndex.drawer + 1,
            // borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }
        }
      >
        {/* <Box
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
            {/* Create New Product 
          </SectionTitleText>
          <div style={{ flex: 0.55 }} />
        </Box> */}
      </Box>{" "}
      <Box
        sx={
          {
            // maxWidth: "800px",
            // margin: "auto",
            // paddingBottom: "80px",
          }
        }
      >
        {StepComponent}
      </Box>
    </div>
  );
}

export default PurchaseOrderOnboardingStepsComponent;

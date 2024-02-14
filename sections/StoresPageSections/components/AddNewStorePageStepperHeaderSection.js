import { Box, IconButton, Tooltip } from "@mui/material";
import StepperComponent from "components/Common/StepperComponent";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import StorePageLayout from "layouts/StorePageLayout";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function AddNewStorePageStepperHeaderSection({
  title,
  stepperData,
}) {
  const router = useRouter();
  const step = router.query.step;
  return (
    <div>
      {" "}
      <Box
        sx={{
          position: "sticky",
          top: "64.5px",
          background: (theme) => theme.palette.background.default,
          py: "16px",
          pt: "8px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Box
          sx={{
            my: "16px",

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
              onClick={() =>
                step === "sync" ? router.push("/app/stores") : router.back()
              }
            >
              <MdArrowBack />
            </IconButton>
          </Tooltip>
          <div style={{ flex: 0.5 }} />
          <SectionTitleText
            sx={{
              fontSize: "28px",
              lineHeight: "34px",
              textAlign: "center",
              flex: 1,
            }}
          >
            {title}
          </SectionTitleText>
          <div style={{ flex: 0.55 }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: "140px",
          background: (theme) => theme.palette.background.default,
          py: "16px",
          pt: "8px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* {Array.isArray(stepperData) && stepperData.length > 0 && (
					<StepperComponent steps={stepperData} />
				)} */}
      </Box>
    </div>
  );
}

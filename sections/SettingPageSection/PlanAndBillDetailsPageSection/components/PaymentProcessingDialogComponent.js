import BaseDialog from "components/Common/Dialog";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";

export default function PaymentProcessingDialogComponent({
  openDialog,
  handleDialogClose,
}) {
  return (
    <BaseDialog
      open={openDialog}
      handleClose={handleDialogClose}
      hideCloseButton={true}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "637px",
          height: "321px",
          borderRadius: "16px 16px",
          boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.1)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={"69px"} sx={{ mb: "34px" }} />
        <SectionTitleText
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "16px",
            color: "#222222",
            mb: "26px",
          }}
        >
          Payment Processing
        </SectionTitleText>
        <DescriptionText
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            color: "#222222",
          }}
        >
          Please wait while we process your payment
        </DescriptionText>
      </Box>
    </BaseDialog>
  );
}

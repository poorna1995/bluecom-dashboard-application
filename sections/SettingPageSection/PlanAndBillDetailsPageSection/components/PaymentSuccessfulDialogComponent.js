import React from "react";
import BaseDialog from "components/Common/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import CheckIconWithCircle from "components/Common/Icons/PricingPageIcons/CheckIconWithCircle";
import GreenCheckGreenBackgroundIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/GreenCheckGreenBackgroundIcon";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import Divider from "@mui/material";
export default function PaymentSuccessfulDialogComponent({
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
          // height: "321px",
          borderRadius: "16px 16px",
          boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.1)",
          justifyContent: "center",
          alignItems: "center",
          pt: "84px",
        }}
      >
        <GreenCheckGreenBackgroundIcon />
        <SectionTitleText
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "28px",
            color: "#222222",
            mb: "16px",
            mt: "30px",
          }}
        >
          Payment Successful
        </SectionTitleText>
        <DescriptionText
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            color: "#313131",
            mb: "34px",
          }}
        >
          Your payment has been successfully processed. Thank you for your
          order!
        </DescriptionText>

        <Box
          sx={{
            padding: "24px 0",
            borderTop: "1px solid #0000001A",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            sx={{
              backgroundColor: "#EAEAEA",
              color: "#222222",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "16px",
              padding: "14px",
            }}
            onClick={handleDialogClose}
          >
            Close
          </PrimaryButton>
        </Box>
      </Box>
    </BaseDialog>
  );
}

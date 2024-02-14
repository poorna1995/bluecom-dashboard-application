import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import React from "react";

export default function NewStoreDisableIntegrationDialog({
  open,
  handleClose,
  handleProceedButton,
}) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      dialogActions={
        <Box sx={{ gap: 2, display: "flex", py: 1, px: 3 }}>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleProceedButton}>
            Yes, Proceed
          </PrimaryButton>
        </Box>
      }
      dialogContentStyles={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        // py: 1.5,
      }}
    >
      <Box
        sx={{
          maxWidth: "640px",
          mt: 5,
        }}
      >
        <Typography
          sx={{
            color: " #19235A",
            textAlign: " center",
            fontSize: " 24px",
            fontWeight: 700,
            maxWidth: "540px",
            margin: "auto",
          }}
        >
          Are you sure you want to disable Shopify Integration?
        </Typography>
        <Box
          sx={{
            borderRadius: " 6px",
            background: "#FEF7F0",
            p: 2,
            my: 2,
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "125%",
            "& ul li": {
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "125%",
            },
          }}
        >
          <h4>PLEASE NOTE THE FOLLOWING BEFORE DISABLING :</h4>
          <ul>
            <li>
              The integration will be put on hold temporarily without affecting
              Shopify related information.
            </li>
            <li>
              During this time, actions such as stock update and shipment update
              to Shopify will not be triggered.
            </li>
            <li>
              On resuming the integration, all products and orders created in
              the interval between the last sync time and the reactivation time
              will be synced into Bluecom.
            </li>
          </ul>
        </Box>
      </Box>
    </BaseDialog>
  );
}

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import React from "react";

export default function DisableIntegrationSyncDialog({
  open,
  handleClose,
  title,
  channel,
  handleDisableSync,
}) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={`Disable ${title}`}
      dialogActions={
        <Box sx={{ py: 2, gap: 2, display: "flex", px: 2 }}>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton
            onClick={() => {
              handleDisableSync();
              handleClose();
            }}
          >
            Confirm
          </PrimaryButton>
        </Box>
      }
      titleStyles={{
        borderBottom: "1px solid #E0E0E0",
        color: "#19235A",
        fontSize: "21px",
        fontWeight: 700,
      }}
      dialogContentStyles={{
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Box
        sx={{
          maxWidth: "576px",
          py: 2,

          "& p": {
            color: "#000",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: " 20px",
            px: 1,
            py: 1,
          },
          "& h4": {
            color: "#19235A",
            fontSize: "21px",
            fontWeight: 700,
          },
        }}
      >
        <h4>
          Are you sure you want to disable {channel} {title}?
        </h4>
        <p>On doing so:</p>
        <p>
          The {title} of the store items will not be pushed automatically.
          You&apos;ll have to sync manually.
        </p>
        <FormControlLabel
          sx={{ px: 1 }}
          control={<Checkbox />}
          label={
            <Typography
              sx={{
                color: "#3D3D3D",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: " 20px",
              }}
            >
              I agree with the above statements & like to continue
            </Typography>
          }
        />
      </Box>
    </BaseDialog>
  );
}

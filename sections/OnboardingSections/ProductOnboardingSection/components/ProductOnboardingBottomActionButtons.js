import { Box } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";

export default function ProductOnboardingBottomActionButtons({
  maxWidthPage,
  handleDiscardButton,
  handleSaveButton,
  saveButtonTitle,
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        background: "#fff",
        display: "flex",
        flex: 1,
        // justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          maxWidth: maxWidthPage,
          width: maxWidthPage,
          display: "flex",
          flex: 1,
          borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
          py: "16px",
        }}
      >
        <OutlinedButton sx={{ flex: 1 }} onClick={handleDiscardButton}>
          Discard changes
        </OutlinedButton>
        <PrimaryButton sx={{ flex: 1, ml: 1 }} onClick={handleSaveButton}>
          {saveButtonTitle}{" "}
        </PrimaryButton>
      </Box>
    </Box>
  );
}

import { Box, Divider } from "@mui/material";
import React from "react";
import GoBackButtonWithRoute from "./GoBack";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";

export default function GoBackComponent() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          // mt: "4rem",
          pb: "16px",
          alignItems: "center",
          gap: "1rem",
          ml: "126px",
        }}
      >
        <GoBackButtonWithRoute />

        <SectionTitleText
          sx={{
            fontSize: "21px",
            fontWeight: "700",
            color: "#484A9E",
          }}
        >
          Plan & Billing Details
        </SectionTitleText>
      </Box>
      <Divider />
    </Box>
  );
}

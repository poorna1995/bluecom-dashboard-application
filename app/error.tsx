"use client";
import { Box, Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Typography>
          Something went wrong! if this error persists, please contact us here{" "}
          <a href="mailto=admin@bluecom.ai">admin@bluecom.ai</a>.
        </Typography>
        <PrimaryButton LinkComponent={AppLink} href="/">
          GO to HomePage
        </PrimaryButton>
      </Box>
    </Box>
  );
}

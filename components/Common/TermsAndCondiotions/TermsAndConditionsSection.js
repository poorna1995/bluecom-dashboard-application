import { Box, Typography } from "@mui/material";
import React from "react";

export default function TermsAndConditionsSection() {
  return (
    <Box
      sx={{
        // marginTop: "32px",
        marginTop: {
          xs: "16px",
          sm: "16px",
          md: "32px",
        },
        display: "flex",
        flexDirection: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        // bottom: "0",
        backgroundColor: (theme) => theme.palette.background.default,
        position: { xs: "fixed", sm: "fixed", md: "relative" },
        bottom: { xs: 0, sm: 0 },
        left: { xs: 0, sm: 0 },
        right: { xs: 0, sm: 0 },
      }}
    >
      <Typography
        sx={{
          // display: "flex",
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          fontWeight: "500",
          m: "18px",
        }}
      >
        By proceeding, you agree to our{" "}
        <a
          style={{
            color: (theme) => theme.palette.text.heading,
            cursor: "pointer",
            fontWeight: "600",
            // textDecoration: "underline",
            textDecoration: "none",
            fontSize: "16px",
          }}
          href={`https://www.bluecom.ai/legal/terms-and-conditions`}
          target="_blank"
          rel="noreferrer"
        >
          Terms of Service
        </a>
        {"  "}
        and{" "}
        <a
          style={{
            color: (theme) => theme.palette.text.heading,
            cursor: "pointer",
            fontWeight: "600",
            // textDecoration: "underline",
            textDecoration: "none",
            fontSize: "16px",
          }}
          href={`https://www.bluecom.ai/legal/privacy-policy`}
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
      </Typography>
    </Box>
  );
}

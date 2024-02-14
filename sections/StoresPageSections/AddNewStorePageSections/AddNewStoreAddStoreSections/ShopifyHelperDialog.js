import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseDialog from "components/Common/Dialog";
import React from "react";
import shopifyHelperImage from "public/assets/stores/assets/shopify-helper.png";
export default function ShopifyHelperDialog({ open, handleClose }) {
  const boldText = `>> Settings`;
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title="Shopify Store Name"
      titleStyles={{
        color: "#1D2939",
        fontSize: " 18px",
        fontWeight: 600,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          maxWidth: "700px",
          p: 2,
          pb: 5,
        }}
      >
        <Typography
          sx={{
            color: "#1D2939",
            fontSize: " 14px",
            fontWeight: 500,
            mb: 3,
          }}
        >
          Login to Shopify Account <b>{boldText}</b>
        </Typography>
        <AppImage
          src={shopifyHelperImage}
          width={400}
          height={320}
          sx={{
            width: "100%",
            maxWidth: "660px",
            height: "180px",
            objectFit: "contain",
          }}
        />
      </Box>
    </BaseDialog>
  );
}

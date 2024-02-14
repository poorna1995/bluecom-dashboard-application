import { Box, Typography } from "@mui/material";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import React from "react";

export default function SelectedChannelComponent({ channel }) {
  return (
    <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          lineHeight: "22px",
        }}
      >
        Selected Channel :
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          px: 2,
          "& svg": {
            height: "20px",
            width: "20px",
            mr: 2,
          },
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: " 19px",
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          borderRadius: "5px",
          ml: 2,
        }}
      >
        <ShopifyIcon /> <span>{channel}</span>
      </Typography>
    </Box>
  );
}

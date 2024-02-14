import { Box, IconButton, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import React from "react";

export default function MobileViewInventoryLocationCard({ data, onClick }) {
  console.log("MobileViewInventoryLocationCard ", data);
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        px: 2,
      }}
    >
      <Box
        sx={{
          ml: 1,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#212121",
              fontFamily: "Inter",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px" /* 121.429% */,
              letterSpacing: " -0.28px",
              flex: 1,
            }}
          >
            {data.wh_name}
          </Typography>{" "}
          <Typography
            sx={{
              color: "#616161",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px" /* 166.667% */,
              letterSpacing: " -0.24px",
              mt: 1,
            }}
          >
            {data.available}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

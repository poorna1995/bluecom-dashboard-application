import React from "react";
import { Box, Typography } from "@mui/material";
import MobileViewInventoryList from "./MobileViewInventoryList";

export default function InventoryTableForMobile({ data, isLoading }) {
  return (
    <Box
      sx={{
        display: {
          md: "none",
          sm: "block",
          xs: "block",
        },
      }}
    >
      <MobileViewInventoryList data={data} isLoading={isLoading} />
    </Box>
  );
}

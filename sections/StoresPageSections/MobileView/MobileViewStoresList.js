import React from "react";
import MobileViewStoreCard from "./MobileViewStoreCard";
import { Box } from "@mui/material";

export default function MobileViewStoresList({ data }) {
  return (
    <Box sx={{ px: 2 }}>
      {Array.isArray(data) &&
        data.map((item) => <MobileViewStoreCard key={item} data={item} />)}
    </Box>
  );
}

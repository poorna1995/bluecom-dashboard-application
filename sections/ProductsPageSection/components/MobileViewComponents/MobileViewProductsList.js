import React from "react";
import MobileViewProductCard from "./MobileViewProductCard";
import { Box } from "@mui/material";
export default function MobileViewProductsList({ data = [] }) {
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {Array.isArray(data) &&
        data.map((item) => (
          <MobileViewProductCard key={item.master_product_id} data={item} />
        ))}
    </Box>
  );
}

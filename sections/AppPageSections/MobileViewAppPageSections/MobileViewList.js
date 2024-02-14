import React from "react";
import MobileViewBaseCard from "./MobileViewBaseCard";
import { Box } from "@mui/material";
export default function MobileViewList({ data = [], component: Component }) {
  if (Component)
    return (
      <Box
        sx={{
          px: 2,
        }}
      >
        {Array.isArray(data) &&
          data.map((item, index) => <Component key={index} data={item} />)}
      </Box>
    );

  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {Array.isArray(data) &&
        data.map((item) => (
          <MobileViewBaseCard key={item.master_product_id} data={item} />
        ))}
    </Box>
  );
}

import React from "react";
import MobileViewProductCardSkeleton from "./MobileViewProductCardSkeleton";
import { Box } from "@mui/material";
const data = [1, 2, 3, 4, 5, 6];
export default function MobileViewProductsListSkeleton() {
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {data.map((item) => (
        <MobileViewProductCardSkeleton key={item.master_product_id} />
      ))}
    </Box>
  );
}

import React from "react";
import { Box } from "@mui/material";
import MobileViewBaseCardSkeleton from "./MobileViewBaseCardSkeleton";
const data = [1, 2, 3, 4, 5, 6];
export default function MobileViewListSkeleton({ component: Component }) {
  if (Component) {
    return (
      <Box
        sx={{
          px: 2,
        }}
      >
        {data.map((item, index) => (
          <Component key={index} />
        ))}
      </Box>
    );
  }
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {data.map((item, index) => (
        <MobileViewBaseCardSkeleton key={index} />
      ))}
    </Box>
  );
}

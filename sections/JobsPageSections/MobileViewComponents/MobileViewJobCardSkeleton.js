import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function MobileViewJobCardSkeleton() {
  return (
    <Box
      sx={{
        px: 2,
        borderBottom: "1px solid rgba(17,17,17,0.1)",
        py: 2,
      }}
    >
      <Skeleton width={280} sx={{ mb: 1 }} />
      <Skeleton width={180} sx={{ mb: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton width={60} />{" "}
        <Skeleton variant={"circular"} width={30} height={30} />
      </Box>
    </Box>
  );
}

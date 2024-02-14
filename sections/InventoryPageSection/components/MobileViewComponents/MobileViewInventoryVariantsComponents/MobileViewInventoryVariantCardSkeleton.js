import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function MobileViewInventoryVariantCardSkeleton() {
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        px: 2,
        flex: 1,
      }}
    >
      <Box>
        <Skeleton variant="rounded" width={40} height={40} />
      </Box>
      <Box
        sx={{
          ml: 1,
          flex: 1,
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            mt: 1,
          }}
        />
      </Box>
    </Box>
  );
}

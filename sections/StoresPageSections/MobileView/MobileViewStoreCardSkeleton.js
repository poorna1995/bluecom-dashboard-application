import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function MobileViewStoreCardSkeleton() {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,0.1)",
        mt: 2,
      }}
    >
      <Skeleton
        variant="text"
        sx={{
          // flex: 1,
          width: "140px",
        }}
      />
      <Box sx={{ my: 1, display: "flex" }}>
        {/* image */}
        <Skeleton variant="circular" sx={{ width: "40px", height: "40px" }} />
        <Box sx={{ flex: 1, ml: 1 }}>
          <Skeleton
            variant="rounded"
            sx={{
              flex: 1,

              mb: 1,
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              // flex: 1,
              width: "120px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{
            width: "120px",
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: "120px",
          }}
        />
      </Box>
    </Box>
  );
}

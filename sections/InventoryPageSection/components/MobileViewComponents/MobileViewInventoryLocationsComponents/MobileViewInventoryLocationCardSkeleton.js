import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function MobileViewInventoryLocationCardSkeleton() {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          flex: 1,
          px: 2,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Skeleton variant="rounded" sx={{ mr: 4, width: "200px" }} />
        <Skeleton
          variant="circular"
          sx={{
            width: "24px",
            height: "24px",
          }}
        />
      </Box>
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
              width: "240px",
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              mt: 1,
              width: "160px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

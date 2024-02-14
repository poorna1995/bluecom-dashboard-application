import { Box, Skeleton, Stack } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";

export default function ProductGridItemCardSkeleton() {
  return (
    <BaseCard
      variant="outlined"
      sx={{
        cursor: "pointer",
        padding: "10px",
        //  height: "520px"
        minHeight: "500px",
      }}
    >
      <Skeleton
        variant="rounded"
        sx={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "320px",
          minHeight: "320px",
        }}
      />
      <Stack>
        <Skeleton variant="text" sx={{ mt: 1 }} />
        <Skeleton
          variant="text"
          sx={{
            mb: 1,
          }}
        />
        {[1, 2, 3].map((item) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // pt: "16px",
            }}
            key={item}
          >
            <Skeleton
              sx={{
                width: "100px",
              }}
            />
            <Skeleton
              sx={{
                width: "100px",
                ml: 1,
              }}
            />
          </Box>
        ))}
      </Stack>
    </BaseCard>
  );
}

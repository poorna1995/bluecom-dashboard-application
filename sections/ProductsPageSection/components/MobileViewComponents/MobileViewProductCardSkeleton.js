import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function MobileViewProductCardSkeleton() {
  return (
    <Box sx={{ py: 2, borderBottom: `1px solid rgba(17, 17, 17, 0.10)` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "",
          flex: 1,
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            width: "36px",
            height: "40px",
          }}
        />
        <Box
          sx={{
            ml: 1,
            flex: 1,
          }}
        >
          <Skeleton variant="rounded" sx={{}} />
          <Skeleton
            variant="rounded"
            sx={{
              // mb: 1,
              mt: 1,
            }}
          />
          <Skeleton
            variant="rounded"
            sx={{
              mt: 1,
              width: "200px",
            }}
          />
          <Box
            sx={{
              mt: 1,
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: "160px",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              mt: 1,
              // justifyContent: "space-between",
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: "100px",
              }}
            />
            <Box
              sx={{
                pl: 1,
                ml: 1,
                borderLeft: "1px solid rgba(17, 17, 17, 0.10)",
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{
                  width: "80px",
                }}
                // channels={params.value}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              justifyContent: "space-between",
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: "100px",
              }}
            />
            <Skeleton variant="rounded" sx={{ width: "120px" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

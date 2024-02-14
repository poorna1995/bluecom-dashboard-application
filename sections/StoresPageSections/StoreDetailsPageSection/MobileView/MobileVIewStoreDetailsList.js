import React from "react";
import { Box, Skeleton } from "@mui/material";
import MobileViewStoreDetailsCard from "./MobileViewStoreDetailsCard";
export default function MobileVIewStoreDetailsList({
  data = [],
  loading,
  handleSyncButtonClick,
}) {
  return (
    <div>
      {loading ? (
        <>
          {[1, 2, 3, 4].map((item) => (
            <MobileViewCardSkeleton key={item} />
          ))}
        </>
      ) : (
        <>
          {Array.isArray(data) &&
            data.map((item) => (
              <MobileViewStoreDetailsCard
                data={item}
                key={item}
                handleSyncButtonClick={handleSyncButtonClick}
              />
            ))}
        </>
      )}
    </div>
  );
}

const MobileViewCardSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid rgba(17,17,17,0.1)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton
          sx={{
            width: "180px",
          }}
        />
        <Skeleton
          sx={{
            width: "120px",
          }}
        />
      </Box>
      <Skeleton
        sx={{
          width: "160px",
        }}
      />
    </Box>
  );
};

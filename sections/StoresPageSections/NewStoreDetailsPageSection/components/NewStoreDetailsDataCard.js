import { Box, Skeleton, Divider } from "@mui/material";
import React from "react";

const styles = {
  borderRadius: " 10px",
  // background: "#F2F6FF",
  p: 3,
  display: "flex",
  gap: 3,

  "& .text": {
    "& h4": {
      my: 0,
      color: "#000",
      fontSize: " 18px",
      fontWeight: 500,
    },
    "& p": {
      color: "#000",
      fontSize: " 21px",
      fontWeight: 700,
      my: 0,
      pt: 1,
      // py: 2,
    },
  },
};
export default function NewStoreDetailsDataCard({
  icon,
  title,
  count,
  isLoading,
}) {
  return (
    <Box sx={{ ...styles }}>
      <div>{icon} </div>
      <div className="text">
        {isLoading ? <Skeleton width={120} /> : <h4>{title}</h4>}{" "}
        {isLoading ? <Skeleton width={120} /> : <p>{count}</p>}
      </div>
    </Box>
  );
}

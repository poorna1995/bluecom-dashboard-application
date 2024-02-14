import { Box, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

export default function BilledAndTrailComponent({
  period,
  alignment,
  bullet,
  color,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: alignment ? alignment : "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Typography
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: color ? color : "#0E0B3D",
        }}
      >
        Billed {period}
      </Typography>
      {bullet && (
        <CircleIcon
          sx={{ width: "6px", height: "6px", color: color ? color : "#0E0B3D" }}
        />
      )}
      <Typography
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: color ? color : "#0E0B3D",
        }}
      >
        14 Days Free Trial
      </Typography>
    </Box>
  );
}

import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

export default function RenderLinearProgressBar({ x, y }) {
  const progressCalculation = (value, total) => {
    if (!value) return 0;
    if ((value / total) * 100 >= 100) return 100;
    return (value / total) * 100;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        mt: "0px",
        width: "100%",
      }}
    >
      <LinearProgress
        variant="determinate"
        // color="success"
        value={progressCalculation(x, y)}
        sx={{
          width: "100%",
          height: "8px",
          backgroundColor: "#E5E7EB",
          borderRadius: "5px",
          mt: "8px",
          "& .MuiLinearProgress-bar": {
            borderRadius: "5px",
            backgroundColor: "#0F955C",
          },
        }}
      />
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "700",
          color: "#099350",
        }}
      >
        {x} /{" "}
        <span
          style={{
            color: "#555555",
          }}
        >
          {y}
        </span>
      </Typography>
    </Box>
  );
}

import {
  Box,
  CircularProgress,
  circularProgressClasses,
  Typography,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

export default function CustomCircularProgressWithLabel({
  progress,
  ...props
}) {
  const isCompleted = progress === 100;

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) => theme.palette.grey[200],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <Box
          sx={{
            position: "absolute",

            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,

              color: (theme) => theme.palette.primary.main,
            }}
          >
            {progress ? `${Math.round(progress)}` : "0"}
            {/* {/* {`${Math.round(progress)}%` }  */}
          </Typography>
        </Box>
        <CircularProgress
          variant="determinate"
          // variant={progress ? "indeterminate" : "determinate"}
          value={progress ?? 0}
          disableShrink
          sx={{
            color: (theme) => theme.palette.primary.main,
            nimationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    </>
  );
}

import React from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { Box, Fab, Typography } from "@mui/material";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
import CautionIcon from "../Icons/CautionIcon";
import FailedIcon from "../Icons/JobPageIcon/FailedIcon";

export default function CustomCircularProgress({
  progress,
  isFailed,
  ...props
}) {
  const isCompleted = progress === 100;
  const isError = progress !== 100;

  return (
    <>
      {isFailed ? (
        <Box
          sx={{
            "& svg": {
              height: "26px",
              width: "26px",
              color: "red",
            },
          }}
        >
          <FailedIcon />
        </Box>
      ) : isCompleted ? (
        <Box
          sx={{
            "& svg": {
              height: "26px",
              width: "26px",
            },
          }}
        >
          <CheckCircleIcon />
        </Box>
      ) : (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="indeterminate"
            sx={{
              color: (theme) =>
                theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
            }}
            size={40}
            thickness={6}
            {...props}
            value={100}
          />
          <Box
            sx={{
              top: 16,
              left: 10,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              {progress ? `${Math.round(progress)}` : "0"}
              {/* {`${Math.round(progress)}` }  
            </Typography> */}
          </Box>
          <CircularProgress
            variant={
              // progress ? "indeterminate" :
              "indeterminate"
            }
            value={progress ?? 0}
            disableShrink
            sx={{
              color: (theme) => theme.palette.primary.main,
              animationDuration: "550ms",
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            // size={40}
            // thickness={6}
            {...props}
          />
        </Box>
      )}
    </>
  );
}

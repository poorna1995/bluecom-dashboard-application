import { Box, Typography, Chip } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

function RenderStatus({ value = "", isChip }) {
  const capitalizeFirstLetter = (string = "") => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let color = "";
  let backgroundColor = "";
  let text = capitalizeFirstLetter(value);

  switch (value) {
    case "active":
      color = "#12B76A";
      text = "Active";
      break;

    case "draft":
      color = "#F79009";

      text = "Draft";
      break;

    case "failure":
      color = "#D92D20";
      text = "Failed";
      break;

    case "success":
      color = "#12B76A";
      text = "Completed";
      break;
    case "progress":
      color = "#F79009";
      text = "In Progress";
      break;
    default:
      color = "";
      break;
  }

  return (
    <div>
      {isChip ? (
        <>
          {text && (
            <Chip
              sx={{
                fontSize: "12px",
                fontWeight: "600",
                color: color,
                backgroundColor: backgroundColor,
                borderRadius: "30px",
                textTransform: "capitalize",

                // height: "25px",
                width: "100%",
              }}
              label={text}
            />
          )}
        </>
      ) : (
        <>
          {text && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <CircleIcon
                sx={{
                  mr: "3px",
                  color: color,
                  width: "6px",
                  height: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: color,
                }}
              >
                {/* {capitalizeFirstLetter(value)} */}
                {text}
              </Typography>
            </Box>
          )}
        </>
      )}
    </div>
  );
}

export default RenderStatus;

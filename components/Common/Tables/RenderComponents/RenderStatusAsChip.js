import { Chip } from "@mui/material";
import React from "react";

function RenderStatusAsChip({ status, bgColor }) {
  let color = "";
  let label = "";
  let backgroundColor = "";

  switch (status) {
    case "active":
      color = "#0E955C";
      label = "Active";
      backgroundColor = "rgba(102, 212, 107, 0.2)";
      break;
    case "draft":
      color = "#DC6803";
      backgroundColor = "#FFE7CA";
      label = "Draft";
      break;
    case "unlisted":
      color = "#DC6803";
      backgroundColor = "#FFE7CA";

      label = "Ready to Publish";
      break;

    case "modified":
      // color = "#DC6803";
      // backgroundColor = "#FFE7CA";

      label = "Modified";
      break;

    default:
      color = "";
      label = status;
      break;
  }

  return (
    <Chip
      sx={{
        fontSize: "12px",
        fontWeight: "600",
        color: color,
        backgroundColor: bgColor || backgroundColor,
        borderRadius: "30px",
        textTransform: "inherit",

        height: "26px",
      }}
      label={label}
    />
  );
}

export default RenderStatusAsChip;

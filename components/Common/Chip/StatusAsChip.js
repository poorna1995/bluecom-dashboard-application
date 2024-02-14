import React from "react";
import { Chip } from "@mui/material";

function StatusAsChip({
  status,
  marginTop,
  fontSize,
  fontWeight,
  borderRadius,
  paddingx,
  paddingy,
  width,
  step,
  lineHeight,
}) {
  let color = "";
  let label = "";
  let background = "";

  // const statusProcess = status.split(" ")
  // const statusCheck = statusProcess[statusProcess.length - 1]
  switch (status) {
    case "active":
      color = "#12B76A";
      label = step ? `${step} - ${status}` : status;
      background = "#FFF0C3";
      break;
    case "draft":
    case "unlisted":
      color = "#F79009";
      label = "Unlisted";
      background = "#FFF0C3";
      break;
    case "Inprogress":
      color = "#F28300";
      label = step ? `${step} - ${status}` : status;
      background = "#FFEFDC";
    case "Pending":
      color = "#B1B1BF";
      label = step ? `${step} - ${status}` : status;
      background = "#ECECF0";
      break;
    case "Connected":
      color = "#12B76A";
      label = step ? `${step} - ${status}` : status;
      background = "#E0F4E3";
      break;
    default:
      color = "";
      label = status;
      break;
  }

  return (
    <Chip
      sx={{
        fontSize: fontSize ? fontSize : "12px",
        fontWeight: fontWeight ? fontWeight : "600",
        lineHeight: lineHeight ? lineHeight : "0",
        color: color,
        backgroundColor: background,
        borderRadius: borderRadius ? borderRadius : "30px",
        marginTop: marginTop ? marginTop : "-20px",
        marginRight: "-8px",
        height: "23px",
        // width: label?.length > 7 ? `${label.length * 10}px` : "70px",
        maxWidth: "100%",
        // minWidth: "100%",
        px: paddingx ? paddingx : 1,
      }}
      label={label}
    />
  );
}

export default StatusAsChip;

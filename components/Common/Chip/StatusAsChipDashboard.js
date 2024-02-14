import React from "react";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
function StatusAsChip({
  step,
  marginTop,
  fontSize,
  fontWeight,
  borderRadius,
  paddingx,
  paddingy,
  width,
  index,
  status,
}) {
  console.log(status);
  let color = "";
  let label = "";
  let background = "";
  const newLabel = `${step}${index} - ${status}`;

  // const statusProcess = status.split(" ")
  // const statusCheck = statusProcess[statusProcess.length - 1]
  switch (status) {
    case "Completed":
      color = "#037741";
      label = newLabel;
      background = "#E6F4EE";
      break;
    case "draft":
      color = "#F79009";
      label = newLabel;
      background = "#FFF0C3";
      break;
    case "In-Progress":
      color = "#F28300";
      label = newLabel;
      background = "#FFEFDC";
      break;
    case "Pending":
      color = "#B1B1BF";
      label = newLabel;
      background = "#ECECF0";
      break;
    default:
      color = "";
      label = newLabel;
      break;
  }

  return (
    <Chip
      sx={{
        fontSize: fontSize ? fontSize : "12px",
        fontWeight: fontWeight ? fontWeight : "600",
        color: color,
        backgroundColor: background,
        borderRadius: borderRadius ? borderRadius : "30px",
        marginTop: marginTop ? marginTop : "-20px",
        marginRight: "-8px",
        height: {
          xs: "12px",
          sm: "12px",
          md: "23px",
        },
        //width: label?.length > 7 ? `${label.length * 9}px` : "70px",
        px: paddingx ? paddingx : "8px",
        py: paddingy ? paddingy : "21px",
        width: width ? width : "fit-content",
      }}
      label={label}
    />
  );
}

export default StatusAsChip;

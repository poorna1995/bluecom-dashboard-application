import { Chip } from "@mui/material";
import React from "react";

function StatusAsChipPayment({
  fontSize,
  fontWeight,
  borderRadius,
  paddingx,
  paddingy,
  width,
  status,
}) {
  let color = "";
  let label = "";
  let background = "";

  switch (status) {
    case "primary":
      color = "#4F44E0";
      label = "Primary";
      background = "#fff";
      break;

    default:
      color = "#4F44E0";
      background = "#4F44E016";
      label = "default";
      break;
  }
  return (
    <Chip
      sx={{
        fontSize: "13px",
        fontWeight: "600",
        color: color,
        backgroundColor: background,
        borderRadius: borderRadius ? borderRadius : "30px",
        border: "1px solid #4F44E0",
        marginRight: "-8px",
        height: "23px",
        px: paddingx ? paddingx : "6px",
        py: paddingy ? paddingy : "12px",
        width: width ? width : "fit-content",
      }}
      label={label}
    />
  );
}
export default StatusAsChipPayment;

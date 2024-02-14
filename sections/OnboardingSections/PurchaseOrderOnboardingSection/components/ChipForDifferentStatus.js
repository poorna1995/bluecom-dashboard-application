import { Chip, Typography } from "@mui/material";
import ClosedChipIcon from "components/Common/Icons/POicons/ClosedChipIcon";
import React from "react";
const statusMap = {
  open: {
    color: "#0E955C",
    label: "active",
    backgroundColor: "rgba(102, 212, 107, 0.2)",
    border: "1px solid #0E955C",
  },
  draft: {
    color: "#DC6803",
    backgroundColor: "#FFE7CA",
    label: "Worksheet",
    border: "1px solid #DC6803",
  },
  cancelled: {
    color: "#E53935",
    label: (
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        <ClosedChipIcon />
        <span style={{ marginLeft: "4px" }}>Cancelled</span>
      </Typography>
    ),
    backgroundColor: "rgba(164, 14, 14, 0.1)",
    border: "1px solid #E53935",
  },

  closed: {
    color: "#CD8906",
    backgroundColor: "rgba(255, 199, 0, 0.2)",
    label: "closed",
    border: "1px solid #CD8906",
  },
};
function ChipForDifferentStatus({
  status,
  color: propColor,
  backgroundColor: propBackgroundColor,
  fontSize: propFontSize = "12px",
  fontWeight: propFontWeight = "600",
}) {
  const statusObj = statusMap[status] || {
    color: propColor || "",
    backgroundColor: propBackgroundColor || "",
    label: status,
    border: "1px solid ${propColor}",
  };

  const { color, backgroundColor, label, icon, border } = statusObj;
  return (
    <Chip
      sx={{
        // fontSize: propFontSize,
        // fontWeight: propFontWeight,
        color,
        backgroundColor,
        border,
        // borderRadius: "30px",
        // textTransform: "capitalize",
        // height: "25px",
        // paddingX: "4px",
        // display: "flex",
        // alignItems: "center",
        borderRadius: "2px",
        fontSize: "15px",
        fontWeight: "600",
        lineHeight: "20px",
        padding: "6px 10px",
      }}
      icon={icon}
      label={label}
    />
  );
}

export default ChipForDifferentStatus;

import { Chip, styled } from "@mui/material";
import React from "react";

const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "600",

  borderRadius: "30px",
  borderColor: "#0000001A",

  // height: "23px",
  width: "fit-content",
}));

const StatusChip = ({ ...props }) => {
  return <StyledChip {...props} />;
};

export default StatusChip;

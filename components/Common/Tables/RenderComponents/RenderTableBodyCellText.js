import { Typography, styled } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
  fontWeight: "500 !important",
  fontSize: "15px",
  color: theme.palette.text.primary,
}));
export default function RenderTableBodyCellText({ children, ...props }) {
  return <StyledText {...props}>{children}</StyledText>;
}

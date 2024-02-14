import { Typography, styled } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.text.primary,
}));
export default function OrderPageCardSubHeadingText({ children, ...props }) {
  return <StyledTypography {...props}>{children}</StyledTypography>;
}

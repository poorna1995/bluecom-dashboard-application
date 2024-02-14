import { Typography, styled } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "15px",
  color: theme.palette.text.primary,
}));
export default function OrderPageCardDescriptionText({ children, ...props }) {
  return <StyledTypography {...props}>{children}</StyledTypography>;
}

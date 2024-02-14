import { Typography, styled } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "18px",
  color: theme.palette.text.primary,
}));
export default function OrderPageCardHeadingText({ children, ...props }) {
  return (
    <StyledTypography component="h4" {...props}>
      {children}
    </StyledTypography>
  );
}

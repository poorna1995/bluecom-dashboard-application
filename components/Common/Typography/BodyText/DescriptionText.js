import { Typography, styled } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  // lineHeight: "28px",
  color: (theme) => theme.palette.text.primary,
  fontweight: "500",
}));
const DescriptionText = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default DescriptionText;

import { styled, Typography } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "24px",
  lineHeight: "30px",
  fontWeight: "600",
}));
const SectionTitleText = ({ children, ...props }) => {
  return (
    <StyledText {...props} component="div">
      {children}
    </StyledText>
  );
};

export default SectionTitleText;

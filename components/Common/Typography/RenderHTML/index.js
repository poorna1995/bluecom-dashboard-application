import { Typography, styled } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter, sans-serif !important",
  "& *": {
    fontFamily: " Open Sans, sans-serif !important",
  },
}));

const RenderHTML = ({ content, ...props }) => {
  return (
    <StyledTypography
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    ></StyledTypography>
  );
};

export default RenderHTML;

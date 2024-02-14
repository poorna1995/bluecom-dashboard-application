import { Card, styled } from "@mui/material";
import React from "react";

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop,
})(({ theme, ...props }) => ({
  // boxShadow: " 0px 0px 30px rgba(43, 47, 84, 0.05)",
  boxShadow: "none",
  borderRadius: "5px",
  // padding: "24px",
}));

const BaseCard = ({ children, ...props }) => {
  return (
    <StyledCard
      // style={{
      // 	boxShadow: " 0px 0px 30px rgba(43, 47, 84, 0.05)",
      // 	borderRadius: "5px",
      // }}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default BaseCard;

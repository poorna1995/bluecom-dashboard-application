import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
  textTransform: "initial",
  borderColor: "white",
  borderRadius: "5px",
  marginLeft: "-8px",
  display: "inline",
  alignItems: "flex-start",
  justifyContent: "flex-start",

  fontSize: "14px",
  fontWeight: 600,
  // textDecoration: "underline",
  // width: "100%",
  // color: "white",
  // paddingRight: "24px",
  // paddingLeft: "20px",
  // height: "42px",
  // background: " #5860D7",
  // color: "#1570EF",
  // make color primary
  color: (theme) => theme.palette.primary.main,
  "&:hover": {
    // color: "#1570EF",
    color: (theme) => theme.palette.primary.main,
  },
  "&:hover": {
    background: "none",

    // textDecoration: "underline",
  },
}));

export default function LinkButton({ children, ...props }) {
  return (
    <StyledButton
      sx={{
        ...props.sx,
      }}
      disableRipple
      {...props}
    >
      {children}
    </StyledButton>
  );
}

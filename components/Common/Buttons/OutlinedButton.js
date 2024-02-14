import { Button, CircularProgress, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
  textTransform: "initial",
  paddingRight: "24px",
  paddingLeft: "24px",
  height: "42px",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19px",
  background: "white",

  borderRadius: "3px",
  color: theme.palette.primary.main,

  border: "1px solid",
  borderColor: theme.palette.primary.main,

  // "&:hover": {
  //   background: "white",
  //   borderColor: theme.palette.primary.main,
  // },
  "&:hover": {
    // background: (theme) => theme.palette.primary.hover,
    background: "#0C00AF",
    boxShadow: "0px 0px 24px 0px rgba(79, 68, 224, 0.2)",
    transition: "all 0.5s ease-in-out",
    color: "#fff",
  },
  "&:focus": {
    background: "#0C00AF",
    boxShadow: "0px 0px 24px 0px rgba(79, 68, 224, 0.2)",
  },
  "&:focus-visible": {
    background: "#7C99FF",
  },
  "&:focus-within": {
    background: "",
  },
  "&:active": {
    background: "#4F44E0",
  },
  "&:visited": {
    background: "#4F44E0",
  },
}));

const OutlinedButton = ({ children, ...props }) => {
  return (
    <StyledButton
      disableRipple
      // variant="outlined"
      sx={{
        ...props.sx,
      }}
      {...props}
    >
      {props.loading && (
        <CircularProgress
          color="inherit"
          size={20}
          thickness={6}
          sx={{ mr: 2 }}
        />
      )}
      {children}
    </StyledButton>
  );
};

export default OutlinedButton;

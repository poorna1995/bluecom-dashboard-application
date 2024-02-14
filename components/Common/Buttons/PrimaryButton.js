import { Button, CircularProgress, styled } from "@mui/material";
import React from "react";
const StyledButton = styled(Button)(({ theme, ...props }) => ({
  textTransform: "initial",
  textTransform: "inherit",
  borderColor: "white",
  borderRadius: "3px",
  color: "white",
  // paddingRight: {
  //   xs: "10px",
  //   sm: "10px",
  //   md: "24px",
  // },
  // paddingLeft: {
  //   xs: "10px",
  //   sm: "10px",
  //   md: "24px",
  // },
  fontSize: "18px",
  fontWeight: 500,

  // paddingRight: "22px",
  // paddingLeft: "22px",
  // height: "48px",
  lineHeight: "18px",
  lineSpacing: "14px",
  letterSpacing: "0px",
  textDecoration: "none",
  // height: {
  //   xs: "32px",
  //   sm: "36px",
  //   md: "48px",
  // },
  background: (theme) => theme.palette.primary.main,
  boxShadow: "none",

  "& .MuiButton-sizeSmall": {
    height: "40px !important",
  },
  "& .MuiButton-sizeMedium": {
    height: "48px !important",
  },
  "& .MuiButton-sizeLarge": {
    height: "52px !important",
  },
  "&:hover": {
    // background: (theme) => theme.palette.primary.hover,
    background: "#0C00AF",
    boxShadow: "0px 0px 24px 0px rgba(79, 68, 224, 0.2)",
    transition: "all 0.5s ease-in-out",
    // opacity: 0.9,
    // "& svg path": {
    //   fill: "#fff",
    //   transition: "all 0.5s ease-in-out",
    // },
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

const PrimaryButton = ({ children, ...props }) => {
  return (
    <StyledButton
      disableRipple
      // size="large"
      variant="contained"
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

export default PrimaryButton;

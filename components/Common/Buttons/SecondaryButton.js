import { Button, CircularProgress, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
  textTransform: "inherit",
  border: "1px solid #A7A0FF ",
  borderRadius: "3px",
  background: "#F5F4FD",
  color: "#4F44E0",

  "& .MuiButton-sizeSmall": {
    height: "36px !important",
  },
  "& .MuiButton-sizeMedium": {
    height: "48px !important",
  },
  "& .MuiButton-sizeLarge": {
    height: "52px !important",
  },

  // "&:hover": { background: (theme) => theme.palette.primary, color: "#fff" },
  "&:hover": {
    // background: (theme) => theme.palette.primary.hover,
    background: (theme) => theme.palette.primary,
    // boxShadow: "0px 0px 24px 0px rgba(79, 68, 224, 0.2)",
    transition: "all 0.5s ease-in-out",
    color: "#fff",
    // opacity: 0.9,
    "& svg path": {
      fill: "#fff",
      transition: "all 0.5s ease-in-out",
    },
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
    color: "#fff",
  },
  "&:visited": {
    background: "#4F44E0",
  },
}));

const SecondaryButton = ({ children, loading = false, ...props }) => {
  return (
    <StyledButton
      variant="contained"
      disableElevation
      disableRipple
      sx={{
        ...props.sx,
      }}
      {...props}
    >
      {loading && (
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

export default SecondaryButton;

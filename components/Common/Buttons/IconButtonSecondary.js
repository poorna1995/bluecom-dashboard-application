import { CircularProgress, IconButton, styled } from "@mui/material";
import React from "react";

const StyledIconButton = styled(IconButton)(({ theme, ...props }) => ({
  textTransform: "inherit",
  border: "1px solid #A7A0FF ",
  borderRadius: "3px",
  background: "#EBE9FF",
  color: "#4F44E0",
  minWidth: "auto",
  "&:hover": {
    // background: (theme) => theme.palette.primary.hover,
    background: theme.palette.primary.main,
    // boxShadow: "0px 0px 24px 0px rgba(79, 68, 224, 0.2)",
    transition: "all 0.5s ease-in-out",
    color: "#fff",
    // border: "none",
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
    color: "#fff",
  },
  "&:visited": {
    background: "#4F44E0",
  },
  "& svg path": {
    stroke: "#4F44E0",
  },
  "&:hover svg path": {
    stroke: "#fff",
  },
}));
export default function IconButtonSecondary({ children, ...props }) {
  return (
    <StyledIconButton variant="contained" {...props}>
      {" "}
      {props.loading ? (
        <CircularProgress
          color="inherit"
          size={20}
          thickness={3}
          // sx={{ mr: 2 }}
        />
      ) : (
        <>{children}</>
      )}
    </StyledIconButton>
  );
}

import { Button, styled } from "@mui/material";
import React from "react";

export default function BorderBottomButton({ children, ...props }) {
  return (
    <Button
      disableRipple
      // size="large"
      //   variant="contained"
      sx={{
        // ml: "-16px",
        // height: {
        //   xs: "27px",
        //   sm: "27px",
        //   md: "32px",
        // },
        textTransform: "capitalize",
        borderRadius: "0px",
        transition: "all 0.3s ease-in-out",
        fontSize: "16px !important",
        fontWeight: "700",
        cursor: "pointer",
        borderColor: (theme) => theme.palette.text.heading,
        color: "#4F44E0",
        paddingLeft: "0px !important",
        m: "0px !important",
        // "&:hover": {
        //   borderColor: (theme) => theme.palette.text.heading,
        // },

        "&:hover": {
          color: "#4F44E0",
          backgroundColor: "transparent",
          transition: "all .3s ease-in-out",
          background: "transparent",
        },
        // px: 2,
        // pb: 0.2,
        // pt: 4,
        // mr: 1,
        position: "relative",
        textDecoration: "none",

        "&::after": {
          content: '""',
          borderBottom: "4px solid #4F44E0",
          position: "absolute",
          bottom: 4,
          left: 0.3,
          // right: 100,
          width: "80%",
          height: 4,
          borderRadius: "none",
          background: "transparent",
          // bottom: 0,
          // left: 0,
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.3s ease-in-out",
        },

        "&:hover::after": {
          transformOrigin: "left",
          transform: "scaleX(1)",
          // width: "100%",
          // backgroundColor: "#4F44E0",
        },

        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

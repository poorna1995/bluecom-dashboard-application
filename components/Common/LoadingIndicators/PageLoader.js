import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";
import PageSpinner from "./PageSpinner";
import Lottie from "lottie-react";

import LoadingSpinner from "../LoadingIndicators/LoadingSpinner.json";
export default function PageLoader() {
  return (
    // <Box
    //   sx={{
    //     width: "inherit",
    //     height: "inherit",
    //     // width: "100%",
    //     // height: "400px",
    //     // display: "grid",
    //     // placeItems: "center",
    //   }}
    // >
    <Backdrop
      thickness={3}
      size={24}
      sx={{
        width: "inherit",
        height: "inherit",
        color: "#fff",
        // background:'rgba(0,0,0,0.5)',
        zIndex: (theme) => theme.zIndex.drawer + 100000,
        background: "rgba(255,255,255,0.4)",
      }}
      open={true}
      // onClick={handleClose}
    >
      <CircularProgress color="primary" />

      {/* <Lottie
        thickness={3}
        size={24}
        animationData={LoadingSpinner}
        style={{ width: "250px", height: "250px" }}
      /> */}
    </Backdrop>
    // </Box>
  );
}

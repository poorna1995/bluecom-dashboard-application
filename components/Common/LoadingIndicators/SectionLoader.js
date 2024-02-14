import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

import Lottie from "lottie-react";
import LoadingSpinner from "../LoadingIndicators/LoadingSpinner.json";
const SectionLoader = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress color="primary" />

      {/* <Lottie
        animationData={LoadingSpinner}
        thickness={3}
        size={24}
        style={{ width: "250px", height: "250px" }} */}
    </Box>
  );
};

export default SectionLoader;

import React from "react";
import Lottie from "lottie-react";
import LoadingSpinner from "../LoadingIndicators/LoadingSpinner.json";
import { Box, CircularProgress } from "@mui/material";

const PageSpinner = ({ spinnerStyles = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        ...spinnerStyles,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <CircularProgress color="primary" />
        {/* <Lottie
          animationData={LoadingSpinner}
          thickness={3}
          size={24}
          style={{ width: "250px", height: "250px" }}
        /> */}
      </Box>
    </Box>
  );
};

export default PageSpinner;

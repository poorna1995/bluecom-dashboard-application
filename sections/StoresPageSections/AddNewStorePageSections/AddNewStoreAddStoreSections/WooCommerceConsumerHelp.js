import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import WooComHelpStep1 from "public/assets/stores/WooComHelpStep1.png";

function WooCommerceConsumerHelp(props) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: 1,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: 2,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "grey.200",
              padding: "10px",
              borderRadius: "5px",
              color: "grey.800",
              fontWeight: 500,
              fontSize: "12px",
              textAlign: "center",
              width: "70px",
            }}
          >
            {props.stepNumber}
          </Typography>

          {props.description}
        </Box>
        {props.descriptionImage}
      </Box>
    </>
  );
}

export default WooCommerceConsumerHelp;

import React from "react";
import placeholder from "public/assets/placeholder/empty_state1.png";
import { Box, Typography } from "@mui/material";
import AppImage from "../AppImage";
import DescriptionText from "../Typography/BodyText/DescriptionText";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Outbound } from "@mui/icons-material";
import OutlinedButton from "../Buttons/OutlinedButton";

export default function EmptyState({
  icon,
  text,
  bodyText,
  image = "",
  children,
  containerStyles,
  imageStyles,
}) {
  return (
    <Box
      sx={{
        // height: "400px",
        display: "grid",
        placeItems: "center",
        pt: 15,
        maxHeight: "800px",
        maxWidth: "600px",
        m: "auto",
        ...containerStyles,
      }}
    >
      {icon ?? <AppImage src={placeholder} width="150" height="150" />}

      {/* <AppImage
        src={image}
        width="190"
        height="180"
        sx={{ mb: 1, ...imageStyles }}
      /> */}
      {text && (
        <DescriptionText
          sx={{
            color: "grey.800",
            fontWeight: 700,
            fontSize: "16px",
            my: 1,
          }}
        >
          {text || "No Products availiable !"}
        </DescriptionText>
      )}
      {bodyText && (
        <Typography
          sx={{
            color: "grey.600",
            fontWeight: 500,
            fontSize: "16px",
            width: "100%",
            textAlign: "center",
            // my: 1,
            mb: 3,
          }}
        >
          {bodyText ||
            "Look Like you have not added any store. You can add new purchase order by clicking below"}
        </Typography>
      )}

      {children}
    </Box>
  );
}

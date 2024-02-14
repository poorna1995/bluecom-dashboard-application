import { Box, Typography } from "@mui/material";
import React from "react";
import RenderAppImage from "./RenderAppImage";
import RenderAppLink from "./RenderAppLink";

export default function RenderImageWithText({
  display_image,
  href,
  title,
  product_id,
  sku,
  barcode,
  hide_display_image,
  openInNewTab,
  variant_title,
  unit_retail_price,
}) {
  const productTitle = title;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        // flexDirection: "column",
      }}
    >
      {!hide_display_image && (
        <RenderAppImage
          sx={{
            marginTop: "4px",
            borderRadius: "4px",
          }}
          display_image={display_image}
        />
      )}{" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RenderAppLink
          href={href}
          title={productTitle}
          target={openInNewTab && "_blank"}
        />
      </Box>
    </Box>
  );
}

import { Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import React from "react";

function RenderImageWithTextAndNavigation({
  display_image,
  title,
  href,
  ...props
}) {
  function getStr1(str) {
    return str.length > 40 ? str.slice(0, 40) + ".." : str;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <AppImage
        sx={{ objectFit: "cover", borderRadius: "5px" }}
        width="45"
        height="45"
        src={display_image}
        {...props}
      />

      <Typography
        sx={{
          marginLeft: "16px",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "20px",
          color: (theme) => theme.palette.primary.main,
          cursor: "pointer",
        }}
      >
        <AppLink href={href}>{title}</AppLink>
      </Typography>
    </div>
  );
}

export default RenderImageWithTextAndNavigation;

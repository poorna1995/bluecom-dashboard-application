import React from "react";
import { Button } from "@mui/material";
import { Launch } from "@mui/icons-material";

export default function RenderWebsiteURL({
  value = "",
  website_link,
  ...props
}) {
  const handleClickButton = (value) => {
    if (value.startsWith("https://") || value.startsWith("http://")) {
      return window.open(value, "_blank");
    }
    return window.open(`https://${value}`, "_blank");
  };

  // const handleClickButton = (value) => {
  //   if (value.startsWith("https://") || value.startsWith("http://")) {
  //     return window.open(value, "_blank");
  //   } else if ((value, "_blank")) {
  //     return (
  //       window.open(value, "_blank") ||
  //       window.open(`https://${value}`, "_blank")
  //     );
  //   }
  // };

  return (
    <Button
      onClick={() => handleClickButton(value)}
      sx={{
        textTransform: "none",
        fontSize: "14px !important",
        fontWeight: "500 !important",
        // color: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.text.title,
        "& .launch-icon": {
          display: "none",
        },
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          "& .launch-icon": {
            display: "block",
          },
        },
      }}
      {...props}
      endIcon={
        <Launch
          sx={{
            height: "16px",
            width: "16px",
          }}
          className="launch-icon"
        />
      }
      disableRipple
    >
      {value}
    </Button>
  );
}

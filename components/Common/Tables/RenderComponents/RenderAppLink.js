import { Launch } from "@mui/icons-material";
import AppLink from "components/Common/AppLink";
import React from "react";

function RenderAppLink({ href, title, ...props }) {
  return (
    <AppLink
      sx={{
        marginLeft: "16px",
        fontWeight: "500 !important",
        fontSize: "15px",
        color: (theme) => theme.palette.text.primary,
        whiteSpace: "normal",
        wordWrap: "break-word",

        "& .launch-icon": {
          // display: "none",
          visibility: "hidden",
        },
        "&:hover": {
          backgroundColor: "transparent",
          color: (theme) => theme.palette.primary.main,
          textDecoration: "underline",
          "& .launch-icon": {
            display: "inline",
            visibility: "visible",
          },
        },
      }}
      href={href}
      {...props}
    >
      {/* <span> */}
      {title}
      {/* </span> */}

      {/* <Launch
        sx={{
          height: "16px",
          width: "16px",
          marginLeft: "8px",
        }}
        className="launch-icon"
      /> */}
    </AppLink>
  );
}

export default RenderAppLink;

import AppLink from "components/Common/AppLink";
import React from "react";

export default function TableCellAppLink({ children, ...props }) {
  return (
    <AppLink
      sx={{
        fontWeight: "500",
        letterSpacing: "0.04",
        // color: (theme) => theme.palette.primary.dark,
        color: "#1570EF",
        "&:hover": {
          color: "#1570EF",
        },
      }}
      {...props}
    >
      {children}
    </AppLink>
  );
}

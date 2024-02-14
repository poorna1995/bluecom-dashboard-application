import { Launch } from "@mui/icons-material";
import { styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const StyledLink = styled(Link)(({ theme }) => ({
  cursor: "pointer",
  // marginRight: "16px",
  display: "flex",
  alignItems: "center",

  fontFamily: theme.typography.fontFamily,
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontSize: "inherit",
  fontWeight: "inherit",

  "&:hover": {
    textDecoration: "underline",
  },

  // "& .launch-icon": {
  //   display: "none",
  // },
  // "&:hover": {
  //   backgroundColor: "transparent",
  //   textDecoration: "underline",
  //   "& .launch-icon": {
  //     display: "block",
  //   },
  // },
}));
// how can i make Applink use React.forwardRef?

const AppLink = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <StyledLink ref={ref} sx={props.sx} {...props}>
      {children}
    </StyledLink>
  );
});
AppLink.displayName = "AppLink";

// const AppLink =({ children, ...props }) => {
//   return (
//     // <Link {...props}>
//     <StyledLink sx={props.sx} {...props}>
//       {children}

//       {/* <Launch
//         sx={{
//           height: "16px",
//           width: "16px",
//           marginLeft: "8px",
//         }}
//         className="launch-icon"
//       /> */}
//     </StyledLink>
//     // </Link>
//   );
// };

export default AppLink;

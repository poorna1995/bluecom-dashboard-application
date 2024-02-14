import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif !important",
    // fontWeight:"500"
  },
  palette: {
    primary: {
      main: "#4F44E0",
      hover: "#4F44E0",
      dark: "#4f44e0",
    },
    secondary: {
      main: "#EAEAEA",
    },
    background: {
      default: "#fff",
    },

    text: {
      heading: "#484A9E",
      secondary: "#626266",
      tertiary: "#494949",
      primary: "#2a2a2f",
      auth: "#484A9E",
      title: "#484A9E",
    },
    grey: {
      800: "#1D2939",
      700: "#344054",

      600: "#475467",
      500: "#667085",
      400: "#98A2B3",
      300: "#D0D5DD",
      200: "#E4E7EC",
      50: "#F9FAFB",
    },
    blue: {
      50: "#F0F9FF",
      600: `#1570EF`,
    },
    red: {
      600: `#d92d20`,
    },
    green: {
      500: "#12b76a",
    },
    black: {
      main: "#2a2a2f",
    },
    action: {
      // active,
      // disabled,
      // disabledBackground,
      // focus,
      // focusOpacity,
      // hoverOpacity,
      // selected,
      // selectedOpacity,
      // activatedOpacity,
      // disabledOpacity,
    },
  },
});

export default theme;

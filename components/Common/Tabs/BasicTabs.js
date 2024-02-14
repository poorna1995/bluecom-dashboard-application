import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
    // centered
  />
))({
  py: 1,
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    width: "100%",
    // backgroundColor: "#635ee7",
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    fontWeight: 600,
    fontSize: "16px",
    background: "#eaeaea",
    color: "#222222",
    borderRadius: "32px",
    px: "24px",
    mr: "24px",
    my: 2,
    // margin: "12px",
    // color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      // backgroundColor:"#EEEFFB",
      // borderBottom: `2px solid ${theme.palette.primary.main}`,
      // borderRadius: "5px",
      background: theme.palette.primary.main,
      borderRadius: "32px",
      color: "white",
      px: "24px",
      mr: "24px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function BasicTabs({
  data,
  tabContainerStyles,
  tabRowStyles,
  tabChildStyles,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          ...tabContainerStyles,
        }}
      >
        <Box
          sx={{
            //  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
            // backgroundColor:"white",
            py: 1,
            borderBottom: "2px solid rgba(0,0,0,0.1)",
            ...tabRowStyles,
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {data.map((item, index) => (
              <StyledTab
                key={index}
                label={item.label}
                sx={{
                  textTransform: "initial",
                  fontWeight: 600,
                  fontSize: "16px",
                  // lineHeight: "30px",
                  fontStyle: "normal",
                }}
                {...a11yProps(index)}
              />
            ))}
          </StyledTabs>
        </Box>
      </Box>

      {data.map((item, index) => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          sx={{ p: 2, ...tabChildStyles }}
        >
          {item.component}
        </TabPanel>
      ))}
    </Box>
  );
}

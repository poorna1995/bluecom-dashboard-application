import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
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
    variant="scrollable"
    orientation="vertical"
    scrollButtons="auto"
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
    sx={{
      backgroundColor: "transparent",
    }}
    {...props}
    // centered
  />
))({
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
    // margin: "12px",
    // borderBottom: "2px solid rgba(0,0,0,0.1)",
    // marginBottom: "0px",
    // color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#5860D7",
      backgroundColor: "#EEEFFB",
      borderRadius: "5px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function VerticalRouterTabs({
  data,
  tabContainerStyles,
  basePath,
  tabRowStyles,
  tabChildStyles,
  isTabAfterQuery,
  tabKey = "tab",
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(``);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log({ router });
  const currentPath = router.query.tab;

  const handleItemClick = (route) => {
    if (isTabAfterQuery) {
      return router.push(`${basePath}&${tabKey}=${route}`);
    }
    return router.push(`${basePath}?${tabKey}=${route}`);
  };
  const isActive = (route) => currentPath && currentPath === route;
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box sx={{ ...tabContainerStyles }}>
        <Box
          sx={{
            //  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
            backgroundColor: "transparent",
            mt: 4,
            // commented this on 10-5-2023
            // borderBottom: "1px solid rgba(0,0,0,0.1)",
            // pb: 2,
            // paddingBottom: "-20px",
            ...tabRowStyles,
          }}
        >
          <MenuList
            // aria-label="basic tabs example"
            // value={value}
            // onChange={handleChange}

            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            {data.map((item, index) => (
              <ListItemButton
                key={index}
                primary={item.label}
                label={item.label}
                onClick={() => handleItemClick(item.route)}
                sx={
                  isActive(item.route)
                    ? {
                        // color: (theme) =>
                        // 	theme.palette.primary.main,
                        textTransform: "initial",
                        fontWeight: 600,
                        fontSize: "16px",
                        // borderBottom: (theme) =>
                        // 	`2px solid ${theme.palette.primary.main}`,
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: "4px",
                        color: "white",
                        px: "12px",
                        mr: "12px",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          background: (theme) => theme.palette.primary.main,
                          borderRadius: "4px",
                          color: "white",
                          transition: "all 0.3s ease-in-out",
                        },
                        my: 1,
                      }
                    : {
                        textTransform: "initial",
                        fontWeight: 600,
                        fontSize: "16px",
                        // background: "#eaeaea",
                        background: "#ffffff",
                        // color: "#222222",
                        color: (theme) => theme.palette.text.primary,
                        borderRadius: "4px",
                        px: "12px",
                        mr: "12px",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          background: "#E5E4F4",
                          color: (theme) => theme.palette.primary.main,
                          transition: "all 0.3s ease-in-out",
                        },
                        my: 1,
                        "&:hover": {
                          color: "#4F44E0",
                          background: "#F5F4FD",
                          borderRadius: "7px",

                          // "& svg path": {
                          // 	fill: "#4F44E0",
                          // 	// stroke: "#4F44E0",
                          // 	transition:
                          // 		"all 0.3s ease-in-out",
                          // },
                          "& .outlined-icon path": {
                            stroke: "#4F44E0",
                          },
                          "& .icon path": {
                            fill: "#4F44E0",
                          },
                        },
                      }
                }
                {...a11yProps(index)}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={
                      isActive(item.route)
                        ? {
                            "&.MuiListItemIcon-root": {
                              marginRight: "8px",
                              minWidth: "0px",
                            },
                            "& svg  path": {
                              color: "white",
                              fill: "white",
                            },
                          }
                        : {
                            "&.MuiListItemIcon-root": {
                              marginRight: "8px",
                              minWidth: "0px",
                            },
                            // "& svg path": {
                            // 	fill: "#626266",
                            // },
                          }
                    }
                  >
                    {isActive(item.route) ? item.filledIcon : item.icon}
                  </ListItemIcon>
                )}{" "}
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: isActive(item.route)
                      ? {
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 600,
                        }
                      : {
                          // color: "#313131",
                          fontSize: "16px",
                          fontWeight: 600,
                        },
                  }}
                />
              </ListItemButton>
            ))}
          </MenuList>

          {/* Mobile View */}
          <StyledTabs
            // aria-label="basic tabs example"
            // value={value}
            // onChange={handleChange}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
              },
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {data.map((item, index) => (
              <StyledTab
                key={index}
                label={item.label}
                onClick={() => handleItemClick(item.route)}
                sx={
                  isActive(item.route)
                    ? {
                        // color: (theme) =>
                        // 	theme.palette.primary.main,
                        fontSize: "14px",
                        fontWeight: 600,
                        textTransform: "initial",
                        // borderBottom: (theme) =>
                        // 	`2px solid ${theme.palette.primary.main}`,
                        // background: (theme) => theme.palette.primary.main,
                        borderBottom: "2px solid #5860D7",
                        borderRadius: "0px",
                        color: "#5860D7",
                        px: "24px",
                        mr: "0px",
                      }
                    : {
                        fontSize: "14px",
                        fontWeight: 600,
                        textTransform: "initial",
                        background: "#fff",
                        color: (theme) => theme.palette.text.primary,
                        borderRadius: "0px",
                        px: "24px",
                        mr: "0px",
                      }
                }
                {...a11yProps(index)}
              />
            ))}
          </StyledTabs>
        </Box>
      </Box>

      {data.map((item, index) => {
        if (item.route === currentPath)
          return (
            <Box
              sx={{
                p: 2,
                height: "100%",
                // borderLeft: (theme) => `1px solid ${theme.palette.grey[300]}`,
                ...tabChildStyles,
              }}
            >
              {item.component}
            </Box>
          );
      })}
    </Box>
  );
}

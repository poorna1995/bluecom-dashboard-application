import { useRouter } from "next/router";
import CircleIcon from "@mui/icons-material/Circle";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { changeDrawerState, setDrawerCollapse } from "redux/views/viewsSlice";
import AppImage from "../AppImage";
import ecom from "public/assets/ecom.png";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  overflowX: "hidden",
  // overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",

  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const mapState = ({ views }) => ({
  isDrawerOpen: views.isDrawerOpen,
  drawerCollapse: views.drawerCollapse,
});
export default function MiniDrawer({ children, links, pageTitle }) {
  const router = useRouter();
  const { isDrawerOpen, drawerCollapse } = useSelector(mapState);
  const dispatch = useDispatch();

  const handleNavigation = (link, title = "") => {
    router.push(link);
    if (title) {
      return dispatch(
        setDrawerCollapse({
          openCollapse: true,
          collapseName: title,
        })
      );
    }
    return dispatch(
      setDrawerCollapse({
        openCollapse: false,
        collapseName: title,
      })
    );
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(isDrawerOpen);

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(changeDrawerState(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(changeDrawerState(false));
  };
  const isActive = (link) => {
    if (router.asPath === link) return true;
    // if (router.asPath.includes(link) || link === "/") return true;
    // if (link.includes(router.asPath) && router.asPath.includes(link))
    // 	return true;
    // if ( ) return true;
  };
  const [openCollapse, setOpenCollapse] = React.useState(
    drawerCollapse?.openCollapse ?? false
  );
  const [collapseTitle, setCollapseTitle] = React.useState(
    drawerCollapse?.collapseName ?? ""
  );
  const handleOpenCollapse = (title) => {
    setOpenCollapse(true);
    setCollapseTitle(title);
    dispatch(setDrawerCollapse({ openCollapse: true, collapseName: title }));
  };
  const SettingIcon = links[links.length - 1].icon;
  const linkStyle = {
    background: "#DEEBFC",
    color: "#1570EF",
    fontWeight: "700",
    borderRadius: "5px",

    "& svg path": {
      // fill: "rgba(88, 96, 215, 6)",
      stroke: theme.palette.primary.main,
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        "&.MuiDrawer-paper": {
          // overflowX: "visible",
        },
      }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          position: "relative",
          borderRight: "none",
          "& .MuiDrawer-paper": {
            background: "#F3F4F6",
            borderColor: "#E5E7EB",
          },
        }}
      >
        <DrawerHeader></DrawerHeader>
        {/* <Divider /> */}
        {/* <div
					style={{
						position: "relative",
						width: "200px",
						height: "50px",
					}}
				> */}
        <Box
          sx={{
            position: "absolute",
            left: open ? "18px" : "12px",
            top: "18px",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          {open ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <IconButton onClick={handleDrawerClose}> */}
              <MenuIcon
                onClick={handleDrawerClose}
                sx={{
                  cursor: "pointer",
                  marginLeft: "8px",
                  height: "30px",
                  width: "30px",
                  color: "#313D4E",
                }}
              />

              {/* </IconButton> */}
              <AppImage
                src={ecom}
                sx={{
                  width: "94px",
                  height: "40px",
                  marginLeft: "24px",
                }}
              />
            </Box>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              {/* <ChevronRightIcon /> */}
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        {/* </div> */}
        {/* {pageTitle && (
					<SectionTitleText
						sx={{ marginLeft: "16px", px: "16px", pt: "16px" }}
					>
						{pageTitle}
					</SectionTitleText>
				)} */}

        <List
          sx={{
            marginLeft: "6px",

            marginRight: "6px",
            // marginTop: "10px",
            color: "#555555",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
            // minHeight: "100vh",
          }}
          component="nav"

          // sx={{ marginTop: "-32px" }}
        >
          {Array.isArray(links) &&
            links.slice(0, links.length - 1).map((item, index) => {
              return (
                <>
                  {" "}
                  <ListItemButton
                    key={index}
                    selected={collapseTitle === item.title}
                    // disablePadding
                    onClick={() =>
                      item.url
                        ? handleNavigation(item.url)
                        : handleOpenCollapse(item.title)
                    }
                    sx={
                      isActive(item.url)
                        ? // ? linkStyle
                          // :
                          {
                            background: "#DEEBFC",
                            color: "#1570EF",
                            fontWeight: "700",
                            borderRadius: "5px",

                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              width: "4px",
                              height: "60%",
                              background: (theme) => theme.palette.primary.main,
                              borderTopRightRadius: "20px",
                              borderBottomRightRadius: "20px",
                              transition:
                                ".2s ease opacity, .2s ease transform",
                              opacity: 1,
                              transform: "translateX(0)",
                            },
                            "& svg path": {
                              // fill: theme.palette.primary.main,
                              stroke: theme.palette.primary.main,
                              strokeWidth: "2px",
                              // stroke: "#1264d7",
                            },
                          }
                        : {
                            // margin: "16px",
                            "&:hover": linkStyle,
                          }
                    }
                  >
                    {item.icon && (
                      <ListItemIcon
                        sx={
                          !open && {
                            marginLeft: "-1px",
                            // marginBottom: "8px",
                          }
                        }
                      >
                        <item.icon
                          sx={{
                            mx: 2,
                          }}
                        />
                      </ListItemIcon>
                    )}
                    {open && (
                      <ListItemText
                        sx={{
                          mx: "-24px",
                        }}
                        primaryTypographyProps={{
                          fontSize: "16px",
                          fontWeight: isActive(item.url) && "600",
                        }}
                        primary={item.title}
                      />
                    )}
                    {!item.url && (
                      <>
                        {openCollapse && collapseTitle === item.title ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </>
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openCollapse && collapseTitle === item.title}
                    timeout="auto"
                  >
                    <List disablePadding>
                      {Array.isArray(item.subMenu) &&
                        item.subMenu.map((subItem, index) => {
                          return (
                            <ListItemButton
                              key={index}
                              disablePadding
                              onClick={() =>
                                handleNavigation(
                                  subItem.url,

                                  item.title
                                )
                              }
                              // sx={{
                              // 	pl: 2,
                              // }}

                              sx={
                                isActive(subItem.url)
                                  ? {
                                      background: "#DEEBFC",
                                      color: "#1570EF",
                                      fontWeight: "700",
                                      borderRadius: "5px",
                                      // borderLeft:
                                      // 	"3px solid #1570EF",
                                      // "& svg path":
                                      // 	{
                                      // 		fill: "rgba(88, 96, 215, 6)",
                                      // 	},
                                      "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        width: "4px",
                                        height: "60%",
                                        background: (theme) =>
                                          theme.palette.primary.main,
                                        borderTopRightRadius: "20px",
                                        borderBottomRightRadius: "20px",
                                        transition:
                                          ".2s ease opacity, .2s ease transform",
                                        opacity: 1,
                                        transform: "translateX(0)",
                                      },
                                    }
                                  : {
                                      "&:hover": linkStyle,
                                    }
                              }
                            >
                              {open && (
                                <>
                                  <CircleIcon
                                    sx={{
                                      ml: "18px",
                                      marginRight: "-20px",
                                      width: "6px",
                                      height: "9px",
                                    }}
                                  />
                                  <ListItemText
                                    sx={{
                                      ml: 4,
                                      // mx: "-24px",
                                    }}
                                    primaryTypographyProps={{
                                      fontSize: "16px",
                                      fontWeight:
                                        isActive(subItem.url) && "600",
                                    }}
                                    primary={subItem.title}
                                  />
                                </>
                              )}
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Collapse>
                </>
              );
            })}
          <Divider sx={{ my: "12px" }} />
          <ListItemButton
            // key={index}
            disablePadding
            onClick={() => handleNavigation("/settings")}
            sx={
              isActive("/settings")
                ? // ? linkStyle
                  // :
                  {
                    background: "#DEEBFC",
                    color: "#1570EF",
                    fontWeight: "700",
                    borderRadius: "5px",
                    borderLeft: "3px solid #1570EF",
                    "& svg path": {
                      // fill: theme.palette.primary.main,
                      stroke: theme.palette.primary.main,
                      strokeWidth: "2px",
                      // stroke: "#1264d7",
                    },
                  }
                : {
                    "&:hover": {
                      // background:
                      // 	"rgba(88, 96, 215, 0.10)",
                      // color: "rgba(88, 96, 215, 6)",
                      // borderRadius: "5px",
                      // // fill :"blue",
                      // "& svg path": {
                      // 	fill: "rgba(88, 96, 215, 6)",
                      // },
                      ...linkStyle,
                    },
                  }
            }
          >
            {/* <HomeIcon/> */}
            {SettingIcon && (
              <ListItemIcon
                sx={
                  !open && {
                    marginLeft: "-1px",
                    marginBottom: "8px",
                  }
                }
              >
                {/* <item.icon sx={{ mx: 2 }} /> */}
                <SettingIcon />
              </ListItemIcon>
            )}
            {open && (
              <ListItemText
                sx={{ mx: "-24px" }}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: isActive("/settings") && "600",
                }}
                primary={"Settings"}
              />
            )}
            <ListItemText />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) => theme.palette.background.default,
          p: 1,
          minHeight: "100vh",

          // maxWidth: isDrawerOpen ? "83vw" : "98vw",
        }}
      >
        {" "}
        <Toolbar />
        {children}{" "}
      </Box>
    </Box>
  );
}

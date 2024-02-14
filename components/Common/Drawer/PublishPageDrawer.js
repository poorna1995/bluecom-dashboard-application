import { useRouter } from "next/router";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { changeDrawerState } from "redux/views/viewsSlice";
import AppImage from "../AppImage";
import ecom from "public/assets/ecom.png";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
const drawerWidth = 240;

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
  isDrawerOpen: views.isDrawerOpen,
});
export default function PublishPageDrawer({ children, links, pageTitle }) {
  const router = useRouter();
  const { isDrawerOpen } = useSelector(mapState);
  const dispatch = useDispatch();
  const handleNavigation = (link) => {
    router.push(link);
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
    // if (router.asPath === link) return true;
    if (router.asPath.includes(link)) return true;
  };
  const linkStyle = {
    background: "#DEEBFC",
    color: "#1570EF",
    fontWeight: "700",
    borderRadius: "5px",

    "& svg path": {
      // fill: "rgba(88, 96, 215, 6)",
      // stroke: theme.palette.primary.main,
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        "&.MuiDrawer-paper": {
          overflowX: "visible",
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
          {/* {open ? ( */}
          <div
          // sx={{
          //   display: "flex", flexDirection: "row" }}
          >
            {/* <MenuIcon
								onClick={handleDrawerClose}
								sx={{
									cursor: "pointer",
									marginLeft: "10px",
									color: "#313D4E",
								}}
							/> */}

            <AppImage
              src={ecom}
              sx={{
                width: "100px",
                height: "45px",
                marginLeft: "34px",
                cursor: "pointer",
              }}
              onClick={() => router.push("/home")}
            />
          </div>
          {/* ) : (
						<IconButton onClick={handleDrawerOpen}>
							<MenuIcon />
						</IconButton>
					)} */}
        </Box>
        {/* {pageTitle && (
					<Typography
						sx={{
							marginLeft: "16px",
							px: "1px",
							//
							maxWidth: "200px",
							marginTop: "24px",
							word: "break-word",
							// overflowWrap: "break-word",
						}}
					>
						{pageTitle}
					</Typography>
				)} */}

        <List
          sx={{
            marginLeft: "6px",

            marginRight: "6px",
            marginTop: "10px",
            color: "#555555",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
            height: "100vh",
          }}

          // sx={{ marginTop: "-32px" }}
        >
          {Array.isArray(links) &&
            links.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => handleNavigation(item.url)}
                >
                  <ListItemButton
                    sx={
                      isActive(item.url)
                        ? {
                            background: "#DEEBFC",
                            color: "#1570EF",
                            fontWeight: "700",
                            borderRadius: "5px",
                            // borderLeft:
                            // 	"3px solid #1570EF",
                            // fill :"blue",
                            // "& svg path":
                            // 	{
                            // 		fill: "rgba(88, 96, 215, 6)",
                            // 	},
                            "& svg path": {
                              // fill: theme.palette.primary.main,
                              stroke: theme.palette.primary.main,
                              strokeWidth: "2px",

                              // stroke: "#1264d7",
                            },
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
                          }
                        : {
                            // margin: "16px",
                            "&:hover": linkStyle,
                          }
                    }
                  >
                    {/* <HomeIcon/> */}
                    {item.icon && (
                      <ListItemIcon
                        sx={
                          !open && {
                            marginLeft: "-1px",
                            marginBottom: "8px",
                          }
                        }
                      >
                        <item.icon sx={{ mx: 2 }} />
                      </ListItemIcon>
                    )}{" "}
                    {open && (
                      <ListItemText
                        // sx={{ mx: "-24px" }}
                        primaryTypographyProps={{
                          fontSize: "16px",
                          fontWeight: isActive(item.url) && "600",
                        }}
                        primary={item.title}
                      />
                    )}
                    <Box
                      sx={{
                        "& svg path": {
                          fill: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.isCompleted && (
                        <CheckCircleIcon sx={{ color: "#1570EF" }} />
                      )}
                    </Box>
                    {/* <ListItemText  /> */}
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "white",
          p: 1,
          minHeight: "100vh",
          // maxWidth: isDrawerOpen ? "83vw" : "98vw",
        }}
      >
        {" "}
        {/* <Toolbar /> */}
        {children}{" "}
      </Box>
    </Box>
  );
}

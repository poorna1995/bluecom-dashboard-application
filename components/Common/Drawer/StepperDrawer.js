/* eslint-disable react/jsx-key */
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
import { Avatar, Divider, LinearProgress, Typography } from "@mui/material";
import SectionTitleText from "../Typography/HeadingText/SectionTitleText";
import AppHeader from "components/AppHeader";
const drawerWidth = 270;

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

const mapState = ({ views, onboardingData }) => ({
  isDrawerOpen: views.isDrawerOpen,
  onboardingData,
  isDemoBannerVisible: views.isDemoBannerVisible,
});
export default function StepperDrawer({
  children,
  links,
  pageTitle,
  keyForReduxData,
  hasHeader = true,
  drawerTitle,
  drawerDescription,
  disableAllStepsOnSuccess,
  drawerPaperWidth,
}) {
  const router = useRouter();
  const id = router.query.id;
  const step = router.query.step;
  const { isDrawerOpen, onboardingData, isDemoBannerVisible } =
    useSelector(mapState);
  const onboardingStepsData = onboardingData[keyForReduxData];
  const dispatch = useDispatch();
  const handleNavigation = (link) => {
    router.push(link);
  };
  console.log({ onboardingStepsData });

  // const currentStepStatus = (step && onboardingStepsData[step]) ?? {};
  // const isActiveStep = currentStepStatus === "in-progress";
  // const isCompletedStep = currentStepStatus === "completed";
  // const isDisabledStep = currentStepStatus === "disabled";
  // console.log({ onboardingStepsData, currentStepStatus, step });
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

  const mergeLinksBasedOnCommonStepValues =
    Array.isArray(links) &&
    links.map((item) => {
      const { step } = item;
      const commonStep =
        step && onboardingStepsData && onboardingStepsData[step];
      console.log({ commonStep, step });
      return { ...item, status: commonStep };
    });
  console.log({ mergeLinksBasedOnCommonStepValues });

  const totalSteps = mergeLinksBasedOnCommonStepValues.length;
  const completedSteps = mergeLinksBasedOnCommonStepValues.filter(
    (step) => step.status === "completed"
  ).length;
  const percentComplete = Math.round((completedSteps / totalSteps) * 100);
  // const stepPercent = 100 / totalSteps;
  return (
    <Box
      sx={{
        display: "flex",
        "&.MuiDrawer-paper": {
          overflowX: "visible",
        },
        // zIndex: 100,
      }}
    >
      {/* {hasHeader && <AppHeader />} */}
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
            zIndex: 100,
            width: drawerPaperWidth,
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
        {/* <Box
					sx={{
						position: "absolute",
						left: open ? "18px" : "12px",
						top: "18px",
						zIndex: (theme) => theme.zIndex.drawer + 2,
					}}
				>
					<div
					// sx={{
					//   display: "flex", flexDirection: "row" }}
					>
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
				</Box> */}
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
        <Box
          sx={{
            marginX: "16px",
            // mt: 1,
            maxWidth: "200px",

            pt: isDemoBannerVisible ? 10 : 5,
          }}
          whiteSpace="normal"
        >
          <SectionTitleText
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {drawerTitle}
          </SectionTitleText>
          <Typography
            sx={{
              fontSize: "14px",
              mt: 2,
              wordWrap: "break-word",
            }}
          >
            {drawerDescription || "Complete all steps to Create \n Product"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
            m: "16px",
            mt: 2,
          }}
        >
          <Typography
            sx={{
              // mr:"4px"
              fontSize: "12px",
              fontWeight: "700",
              color: "#4f44e0",
            }}
          >
            {percentComplete}
            <span
              style={{
                color: "#555555",
              }}
            >
              /100%
            </span>
          </Typography>
          <LinearProgress
            value={percentComplete}
            variant="determinate"
            // color="success"
            max={totalSteps}
            sx={{
              width: "100%",
              height: "8px",
              backgroundColor: "#E5E7EB",
              borderRadius: "5px",

              mt: "4px",
            }}
          />
        </Box>
        <Divider />

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
          {Array.isArray(mergeLinksBasedOnCommonStepValues) &&
            mergeLinksBasedOnCommonStepValues.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    disabled={
                      item.status === "disabled" ||
                      // disableAllStepsOnSuccess ||
                      percentComplete === 100 ||
                      (!isActive(item.url) && disableAllStepsOnSuccess)
                      // index > id
                    }
                    onClick={() =>
                      (item.status !== "disabled" ||
                        percentComplete !== 100 ||
                        (isActive(item.url) && !disableAllStepsOnSuccess)) &&
                      handleNavigation(item.url)
                    }
                    sx={
                      isActive(item.url)
                        ? // item.status === "in-progress"
                          {
                            // background: "#DEEBFC",
                            color: (theme) => theme.palette.primary.main,
                            fontWeight: "700",
                            borderRadius: "5px",

                            border: (theme) =>
                              "1px solid " + theme.palette.primary.main,
                            // borderLeft:
                            // 	"3px solid #1570EF",
                            // fill :"blue",
                            // "& svg path":
                            // 	{
                            // 		fill: "rgba(88, 96, 215, 6)",
                            // 	},
                            // "& svg path": {
                            // fill: theme.palette.primary.main,
                            // stroke: theme
                            // 	.palette.primary
                            // 	.main,
                            // strokeWidth: "2px",

                            // stroke: "#1264d7",
                            // },
                            // "&::before": {
                            // 	content: '""',
                            // 	position:
                            // 		"absolute",
                            // 	left: 0,
                            // 	width: "4px",
                            // 	height: "60%",
                            // 	background: (
                            // 		theme,
                            // 	) =>
                            // 		theme.palette
                            // 			.primary
                            // 			.main,
                            // 	borderTopRightRadius:
                            // 		"20px",
                            // 	borderBottomRightRadius:
                            // 		"20px",
                            // 	transition:
                            // 		".2s ease opacity, .2s ease transform",
                            // 	opacity: 1,
                            // 	transform:
                            // 		"translateX(0)",
                            // },
                          }
                        : {
                            // margin: "16px",
                            //  "&:hover": linkStyle,
                          }
                    }
                  >
                    {open && (
                      <ListItemText
                        // sx={{ mx: "-24px" }}
                        primaryTypographyProps={{
                          fontSize: "16px",
                          fontWeight: isActive(item.url) && "600",
                        }}
                        sx={{
                          "& .icon": {
                            fontSize: "16px",
                          },
                        }}
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <Avatar
                                sx={{
                                  marginRight: "16px",
                                  background: (theme) =>
                                    theme.palette.primary.main,
                                  color: "white",
                                  p: "4px",
                                  height: "24px",
                                  width: "24px",
                                }}
                                className={"icon"}
                              >
                                {index + 1}
                              </Avatar>{" "}
                              {item.title}
                            </Box>
                            <Box
                              sx={{
                                ml: 1,
                                // justifyItem:
                                // 	"flex-end",
                                justifySelf: "flex-end",
                                "& svg path": {
                                  // fill: "#099350",
                                },
                              }}
                            >
                              {item.status === "completed" && (
                                <CheckCircleIcon fill={"#4f44e0"} />
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    )}
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
          // p: 1,
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

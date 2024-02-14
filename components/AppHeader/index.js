import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Stack,
  Dialog,
} from "@mui/material";
// import TextField from "@mui/material/TextField";
import Notification from "components/Common/Icons/notification";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/system";
import AppLink from "components/Common/AppLink";
// import linksData from "constant_data/navigation/linksData";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "redux/user/userSlice";
import { MERCHANT, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSnackbar } from "notistack";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AppImage from "components/Common/AppImage";
import logo from "public/bluecom-logo.svg";
import newLogo2 from "public/assets/newLogo2.png";
import { fetchPublishableProductsStatusStart } from "redux/products/productsSlice";
import NewHeaderForDrawer from "./NewHeaderForDrawer";
import TextInput from "components/Common/Inputs/TextInput";
import NotificationIcon from "components/Common/Icons/HeaderIcons/NotificationIcon";
import SettingIcon from "components/Common/Icons/HeaderIcons/SettingIcon";
import RightArrowIcon from "components/Common/Icons/RightArrowIcon";
import LogOutIcon from "components/Common/Icons/HeaderIcons/LogOutIcon";
import EditProfileIcon from "components/Common/Icons/HeaderIcons/EditProfileIcon";
import PricingIcon from "components/Common/Icons/HeaderIcons/PricingIcon";
import BillingIcon from "components/Common/Icons/HeaderIcons/BillingIcon";
import BaseDialog from "components/Common/Dialog";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { set } from "date-fns";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { useQuery } from "@tanstack/react-query";
import AppDemoBanner from "./AppDemoBanner";
import { setIsDemoBannerVisible } from "redux/views/viewsSlice";
import { MdClose } from "react-icons/md";
import MenuIcon from "components/Common/Icons/HeaderIcons/MenuIcon";
import MobileMenuNavigation from "./MobileMenuNavigation";
import bluecomColoredLogo from "public/bluecom-color-logo.svg";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import { useCookies } from "react-cookie";
import { DEMO_USER_EMAIL } from "constants/APP_CONSTANTS";

const mapState = ({ user, productsData, views }) => ({
  currentUser: user.currentUser,
  productsData,
  isDemoBannerVisible: views.isDemoBannerVisible,
});

const profileImageStyles = {
  width: { md: 40, xs: 32 },
  height: { md: 40, xs: 32 },
};
const AppHeader = ({ appHeaderBg, showLogo, ...props }) => {
  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["profileDetails"],
  //   queryFn: () =>
  //     appFetch(MERCHANT.FETCH_DATA, {
  //       merchant_id: currentUser.merchant_id,
  //     }).then((json) => json.result[0]),
  // });
  // console.log({ popupState, isOpen: popupState.isOpen });
  const [viewLoading, setViewLoading] = React.useState(false);
  const router = useRouter();
  const { currentUser, productsData, isDemoBannerVisible } =
    useSelector(mapState);
  const taskID = productsData.publishTaskID;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const pathname = router.asPath;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const links = [
    // {
    // 	title: "Home",
    // 	url: "/",
    // },
    // {
    // 	title: "Products",
    // 	url: "/app/products",
    // },
    // {
    // 	title: "Profile",
    // 	url: "/onboarding/merchant",
    // },
    // {
    // 	title: "Vendors",
    // 	url: "/onboarding/vendor",
    // },
    // {
    // 	title: "Calendar",
    // 	url: "/calendar",
    // },
  ];

  const menuItems = [
    // {
    //   text: "Billing & Subscription",
    //   onClick: handleBilling,
    //   icon: <BillingIcon />,
    //   route: "/settings/plan-and-billing-details",
    // },
    // {
    //   text: "Pricing",
    //   onClick: handlePricing,
    //   icon: <PricingIcon />,
    //   route: "/pricing",
    // },
    {
      text: "Edit Profile",
      onClick: handleEditProfile,
      icon: <EditProfileIcon />,
      route: "/settings/profile-details",
    },
    // {
    //   text: "Settings",
    //   onClick: handleSetting,
    //   icon: <SettingIcon />,
    //   route: "/settings",
    // },
  ];

  function handleBilling() {
    router.push("/settings/plan-and-billing-details");
    handleClose();
  }
  function handlePricing() {
    window.open("https://www.bluecom.ai/pricing", "_blank");
    handleClose();
  }
  function handleEditProfile() {
    router.push("/settings/profile-details");
    handleClose();
  }
  function handleSetting() {
    router.push("/settings");
    handleClose();
  }
  function handleLogin() {
    router.push("/auth/login");
    handleClose();
  }
  function handleLogout() {
    setOpen(false);
    setViewLoading(true);
    const url = MERCHANT.LOGOUT;
    const data = {
      merchant_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        dispatch(signOutUser());
        removeCookie("access_token", {
          path: "/",
          domain:
            process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
        });

        // router.push("/auth/login?ref=app&action=logout");
        setTimeout(() => {
          setViewLoading(false);
        }, 1000);
        setTimeout(() => {
          router.reload();
        }, 1200);
        enqueueSnackbar(json.message);
      })
      .catch((err) => console.error(err));
  }
  // useEffect(() => {
  //   if (!currentUser) router.push("/auth/login");
  // }, [currentUser, router]);

  // console.log(currentUser.merchant_email);
  // console.log(currentUser.merchant_first_name);
  // console.log(currentUser.merchant_last_name);

  // console.log({ currentUser });
  const getInitials = (email) => {
    if (!email) return "";
    const initials = email?.charAt(0)?.toUpperCase() || "";
    return initials;
  };

  const initials =
    (currentUser &&
      currentUser.merchant_first_name &&
      getInitials(currentUser.merchant_first_name)) ||
    "";

  const userEmail = (currentUser && currentUser.merchant_email) || "";
  const isDemoUser = userEmail === DEMO_USER_EMAIL;
  // const handleFetchProductPublishStatus = () => {
  // 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
  // 	const data = {
  // 		task_id: taskID,
  // 	};
  // 	dispatch(fetchPublishableProductsStatusStart({ URL, data }));
  // };
  // useEffect(() => {
  // 	if (taskID) {
  // 		handleFetchProductPublishStatus();
  // 	}
  // }, [taskID]);
  const handleShowDemoBanner = () => {
    dispatch(setIsDemoBannerVisible(true));
  };
  useEffect(() => {
    if (isDemoUser) {
      handleShowDemoBanner();
    }
  }, []);
  const toolbarStyle = {
    maxHeight: "52px",
    minHeight: "52px !important",
  };

  const handleClickOfSetting = () => {
    router.push("/settings");
  };

  const handleNotificationIconClick = () => {
    console.log("notification icon clicked");
  };

  const isMenuActive = (route) => {
    return pathname === route;
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderProfileImage =
    currentUser && currentUser.merchant_image_url ? (
      <Avatar
        src={currentUser.merchant_image_url}
        sx={{
          // cursor: "pointer",
          // width: 40,
          // height: 40,
          ...profileImageStyles,
        }}
      >
        {initials}
      </Avatar>
    ) : (
      <Avatar
        sx={{
          // cursor: "pointer",
          // width: 40,
          // height: 40,
          ...profileImageStyles,
        }}
      >
        {initials}
      </Avatar>
    );

  const isDemoWebsite =
    typeof window !== undefined &&
    (window.location.host === "demo.bluecom.ai" ||
      window.location.host === "demo.localhost:3000");

  // if (!currentUser) router.push("/auth/login");
  if (currentUser)
    return (
      <>
        {viewLoading && <PageLoader />}
        <AppBar
          elevation={0}
          color="default"
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
            zIndex: { xs: 1300, md: 1300 },
          }}
        >
          <AppDemoBanner />
          <Toolbar
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              ...toolbarStyle,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                "& .mobile-menu": {
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  "& .close-icon": {
                    color: "white",
                  },
                  "& .menu-icon path": {
                    fill: "white",
                  },
                },
              }}
            >
              <div className="mobile-menu">
                {openDrawer ? (
                  <IconButton
                    className="close-icon"
                    onClick={handleDrawerClose}
                  >
                    <MdClose />
                  </IconButton>
                ) : (
                  <IconButton className="menu-icon" onClick={handleDrawerOpen}>
                    <MenuIcon />
                  </IconButton>
                )}
              </div>

              {showLogo && (
                <AppImage
                  src={logo}
                  // src={newLogo2}
                  unoptimized={false}
                  width={128}
                  height={22}
                  sx={{
                    // width: "160px",
                    // height: "28px",
                    cursor: "pointer",
                    // ml: { md: "24px", xs: 0 },
                  }}
                  loading="eager"
                  // onClick={() => router.push("/home")}
                />
              )}
              <div style={{ flex: 1 }} />
              {links.length > 0 &&
                links.map((item, index) => {
                  return (
                    <AppLink
                      key={index}
                      href={item.url}
                      sx={{
                        marginRight: "24px",
                        color:
                          pathname === item.url
                            ? "#07617D"
                            : "rgba(54, 54, 54, 0.6)",
                        fontWeight:
                          // pathname === item.url &&
                          700,
                        // padding: "8px",
                        // "&:hover": {
                        // 	background: "rgba(0,0,0,0.1)",
                        // },
                      }}
                    >
                      {item.title}
                    </AppLink>
                  );
                })}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* 
						<IconButton
							sx={{ mr: "12px" }}
							// size="large"

							onClick={handleClickOfSetting}
						>
							<SettingIcon />
						</IconButton>

						<IconButton onClick={handleNotificationIconClick}>
							<NotificationIcon />
						</IconButton> */}

              {currentUser ? (
                <div>
                  <IconButton
                    sx={{
                      marginLeft: "10px",
                      p: 0,
                      "& img": {
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      },
                    }}
                    // size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {/* <Avatar
                    sx={{
                      cursor: "pointer",
                      width: 30,
                      height: 30,
                    }}
                    alt="ABC"
                    src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  /> */}

                    {/* <Avatar
										sx={{
											cursor: "pointer",

											width: 35,
											height: 35,
										}}
									>
										{initials}
									</Avatar> */}

                    {renderProfileImage}
                  </IconButton>
                  {!isDemoUser && !isDemoWebsite && (
                    <Menu
                      sx={{
                        // mt: { md: "30px", xs: "48px" },
                        zIndex: 10000,
                        mx: { xs: "auto" },
                        background: {
                          xs: "rgba(0,0,0,0.3)",
                          md: "none",
                        },
                      }}
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        sx: {
                          mt: {
                            md: "30px",
                            xs: "48px",
                          },
                          width: "320px",
                          borderRadius: "10px",
                          // boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 10px !important",
                          boxShadow: "0px 0px 20px 5px rgba(52, 64, 84, 0.14)",
                          mx: { xs: "auto" },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: {
                            xs: "flex",
                            md: "none",
                          },
                          ml: 1,
                          "& .icon": {
                            width: "200px",
                            height: "20px",
                            objectFit: "contain",
                          },
                          alignItems: "center",
                        }}
                      >
                        <IconButton onClick={handleClose}>
                          <MdClose color="black" />
                        </IconButton>
                        <AppImage src={bluecomColoredLogo} className="icon" />
                      </Box>
                      {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                      <Box
                        sx={{
                          m: { md: 2, xs: 0 },
                          display: "flex",
                          ml: { md: 2, xs: 2 },
                          alignItems: "center",
                        }}
                      >
                        {renderProfileImage}
                        {/* {currentUser.merchant_image_url ? (
											<Avatar
												src={
													currentUser.merchant_image_url
												}
												sx={{
													// cursor: "pointer",
													width: 45,
													height: 45,
												}}
											>
												{initials}
											</Avatar>
										) : (
											<Avatar
												sx={{
													// cursor: "pointer",
													width: 45,
													height: 45,
												}}
											>
												{initials}
											</Avatar>
										)} */}
                        <Box
                          sx={{
                            ml: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "600",
                              lineHeight: "28px",
                            }}
                          >
                            {currentUser.merchant_first_name}{" "}
                            {currentUser.merchant_last_name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            You are currently in the Free plan.
                          </Typography>
                        </Box>
                      </Box>
                      {/* <PrimaryButton
                        sx={{
                          marginX: 3,
                          marginY: 1,
                          width: "85%",
                        }}
                      >
                        Subscribe to a plan{" "}
                      </PrimaryButton> */}

                      <Divider
                        sx={{
                          marginY: 1,
                        }}
                      />

                      {menuItems.map((item, index) => (
                        <MenuItem
                          disableRipple
                          key={index}
                          sx={{
                            ml: "8px",
                            mr: "8px",
                            mb: "4px",
                            p: "8px 16px 8px 16px",
                            // width: "250px",
                            // width: "100%",
                            background: isMenuActive(item.route)
                              ? "#F5F4FD"
                              : "",
                            color: isMenuActive(item.route)
                              ? "#4F44E0"
                              : "##2a2a2f",
                            borderRadius: "7px",
                            fontWeight: 500,
                            "&:hover": {
                              // color: (theme) => theme.palette.primary.main,
                              background: "#F5F4FD",
                              transition: "all 0.3s ease-in-out",
                              borderRadius: "7px",

                              color: "#4F44E0",
                              "& svg path": {
                                fill: (theme) => theme.palette.primary.main,
                                transition: "all 0.3s ease-in-out",
                                borderRadius: "7px",
                              },
                            },
                          }}
                          onClick={item.onClick}
                        >
                          <Box
                            sx={{
                              "& svg": {
                                visibility: isMenuActive(item.route)
                                  ? "visible"
                                  : "hidden",
                                mr: "4px",
                              },
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M2.75 8.75L6.25 12.25L13.25 4.75"
                                stroke="#4F44E0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                          {item.icon && (
                            <ListItemIcon
                              sx={{
                                ml: 1,
                                "& svg path": {
                                  fill: (theme) =>
                                    isMenuActive(item.route) &&
                                    theme.palette.primary.main,
                                },
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                          )}

                          <Typography
                            sx={{
                              marginY: "4px",

                              fontSize: "16px",
                              fontWeight: "600",
                              // color: "#2a2a2f",

                              // color: isMenuActive(item.route)
                              //   ? "#4F44E0"
                              //   : "#222",
                              // "&:hover": {
                              //   color: "#4F44E0",
                              // },
                            }}
                          >
                            {item.text}
                          </Typography>
                        </MenuItem>
                      ))}
                      <Divider />
                      <MenuItem
                        disableRipple
                        sx={{
                          ml: "8px",
                          mr: "8px",
                          mb: "4px",
                          "&:hover": {
                            // color: (theme) => theme.palette.primary.main,
                            background: "#F5F4FD",
                            transition: "all 0.3s ease-in-out",
                            borderRadius: "7px",

                            color: "#4F44E0",
                          },
                          // ml: "16px",
                        }}
                        onClick={() => {
                          setOpen(true);
                          handleClose();
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: 3.8,
                          }}
                        >
                          {/* <SettingIcon /> */}
                          <LogOutIcon />
                        </ListItemIcon>
                        <Typography
                          sx={{
                            marginY: "4px",

                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#D92D20",
                          }}
                        >
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  )}
                </div>
              ) : (
                <MenuItem onClick={() => handleLogin()}>Login</MenuItem>
              )}
            </Box>
          </Toolbar>
          {/* <Toolbar sx={{backgroundColor:"#E4E7EC",}}>
				
					<NewDrawerForHeader />
			
				</Toolbar> */}

          <Box
            sx={{
              // backgroundColor: "#F2F4F7",
              backgroundColor: "#fff",
              px: "20px",
              // pb: "10px",
              // pt: "12px",

              // mt: "8px",
              "& .hide-on-mobile": {
                display: {
                  xs: "none",
                  md: "block",
                },
              },
            }}
          >
            <Box sx={{ width: "100%" }} className="hide-on-mobile">
              <NewHeaderForDrawer />
            </Box>
          </Box>
        </AppBar>
        <MobileMenuNavigation
          openDrawer={openDrawer}
          handleDrawerClose={handleDrawerClose}
          isBannerVisible={isDemoBannerVisible}
        />

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          // containerProps={{
          //   sx: {
          //     zIndex: (theme) => theme.zIndex.appBar + 1000,
          //   },
          // }}
          PaperProps={{
            sx: {
              borderRadius: "10px !important",
              minWidth: "480px",
            },
          }}
          // hideCloseButton={true}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              m: 2,
              mb: 1,
              mx: 4,
              mt: 2,
              "& .logout-icon": {
                border: "1px solid #e4e7ec",
                borderRadius: "10px",
                boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

                height: "48px",
                width: "48px",
                p: 1,
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              className="logout-icon"
            >
              <path
                d="M10 7L14 11M14 11L10 15M14 11H1M1.33782 6C3.06687 3.01099 6.29859 1 10 1C15.5228 1 20 5.47715 20 11C20 16.5228 15.5228 21 10 21C6.29859 21 3.06687 18.989 1.33782 16"
                stroke="#4F44E0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <IconButton
              onClick={handleCloseDialog}
              disableRipple
              sx={{
                "&:hover": {
                  background: "#F5F4FD",
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "50%",
                },
                "& .logoutCross-icon": {
                  borderRadius: "10px",
                  height: "40px",
                  width: "40px",
                  p: 1,
                },
                borderRadius: "50%",
                marginTop: "-4px",
                marginRight: "-18px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="logoutCross-icon"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#4F44E0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </Stack>
          <Stack sx={{ mx: 4 }}>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "28px",
                my: 1,
              }}
            >
              Logout
            </Typography>
            <Typography
              sx={{
                color: " #626266",
                fontSize: "18px",
                lineHeight: "24px",
                // fontWeight: 500,

                mb: 0,
                mr: 2,
                pr: 2,
              }}
            >
              Are you sure you want to log out?
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} m={4}>
            <SecondaryButton
              sx={{ mr: 2 }}
              fullWidth
              onClick={() => handleCloseDialog()}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => handleLogout()}
              // loading={loading}
              fullWidth
            >
              Logout
            </PrimaryButton>
          </Stack>
          {/* <Box
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                width: "80%",
                marginTop: "30px",
                justifyContent: "space-between",
              }}
            >
              <PrimaryButton
                sx={{
                  width: "48%",
                  // mb: "20px",
                  // height: "42px",
                  // fontSize: "20px",
                  // borderRadius: "32px",
                }}
                onClick={() => handleLogout()}
              >
                Log Out
              </PrimaryButton>
              <OutlinedButton
                sx={{
                  width: "48%",

                  // height: "60px",
                  // fontSize: "20px",
                  // borderRadius: "32px",
                }}
                onClick={() => handleCloseDialog()}
              >
                Cancel
              </OutlinedButton>
            </Box> */}
        </Dialog>
      </>
    );
};

export default AppHeader;

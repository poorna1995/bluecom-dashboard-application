/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "public/assets/Bluecom.ai_Logo.jpg";
import { NextSeo } from "next-seo";
import useIsMobileView from "constants/mobileView/useIsMobileView";
import MobileAppHelperDrawer from "components/Common/Drawer/MobileAppHelperDrawer";
import ProductInfo from "components/Common/Animations/SignupAnimations/ProductInfo";
import InventoryManage from "components/Common/Animations/SignupAnimations/InventoryManage";
import LocationManage from "components/Common/Animations/SignupAnimations/LocationManage";
import VendorManage from "components/Common/Animations/SignupAnimations/VendorManage";
import POManage from "components/Common/Animations/SignupAnimations/POManage";
import {
  DEMO_DEVELOPMENT_URL,
  DEMO_PRODUCTION_URL,
} from "constants/APP_CONSTANTS";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function AuthLayout({
  pageTitle,
  headingTitle,
  children,
  showMobileDrawer,
  setShowMobileDrawer,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const { ref, action } = router.query;
  const isMobileView = useIsMobileView();
  const handleDrawerClose = () => {
    setShowMobileDrawer(false);
    router.push("/home");
  };

  useEffect(() => {
    if (window.location.host === DEMO_PRODUCTION_URL) {
      router.push("/");
      return;
    }
    if (window.location.host === DEMO_DEVELOPMENT_URL) {
      router.push("/");
      return;
    }
    // if (ref === "app" && action === "logout") return;
    if (currentUser) {
      // if (!isMobileView) {
      router.push("/home");
      // }
    }
  }, [currentUser]);

  const featureData = [
    {
      icon: <ProductInfo />,
      title: "Product Information Management",
    },
    {
      icon: <InventoryManage />,
      title: "Inventory Management",
    },
    {
      icon: <LocationManage />,
      title: "Location Management",
    },
    {
      icon: <VendorManage />,
      title: "Vendor Management",
    },
    {
      icon: <POManage />,
      title: "Purchase Order Management",
    },
  ];

  // if (
  // 	window.location.host === DEMO_PRODUCTION_URL ||
  // 	window.location.host === DEMO_DEVELOPMENT_URL
  // ) {
  // 	console.log("demo");
  // 	router.push("/");
  // 	return;
  // }

  if (!currentUser)
    return (
      <Box sx={{}}>
        {" "}
        <NextSeo title={pageTitle} />
        {/* <Container> */}
        <Box
          sx={{
            display: "flex",
            height: { xs: "auto", md: "100vh" },
            maxHeight: { xs: "auto", md: "100vh" },
            overflow: { xs: "scroll", md: "hidden" },
            maxHeight: { md: "100vh" },
          }}
        >
          <Box
            sx={{
              width: "40%",
              height: "100vh",
              // display: "grid",
              // placeItems: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",

              position: "relative",

              background:
                " linear-gradient(165.53deg, #3838E2 -2.86%, #4466E0 109.28%)",

              "@media screen and (max-width: 900px)": {
                display: "none",
              },
            }}
          >
            {/* <AppImage
            src={topBanner}
            alt="Background Image"
            sx={{
              width: "85%",
              height: "150px",
              top: 0,

              position: "absolute",
            }}
          /> */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "45%",
                transform: "translate(-50%, -50%)",

                textAlign: "left",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontSize: "52px",
                  fontWeight: "800",
                  lineHeight: "1.4",
                }}
              >
                Welcome to Bluecom.ai!
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  mt: "18px",
                }}
              >
                All-inclusive platform for Product Information, Inventory,
                Purchase Order, Vendor, Location Management
              </Typography>

              {featureData.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "24px",
                    }}
                    key={index}
                  >
                    {item.icon}
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        ml: "8px",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                );
              })}

              {/* <AppImage
              src={AvatarImg}
              alt="Background Image"
              sx={{
                width: "auto",
                height: "50px",
                // objectFit: "cover",
                position: "absolute",
                mt: "18px",
              }}
            /> */}
            </Box>

            {/* <AppImage
            src={bottomBanner}
            alt="Background Image"
            sx={{
              width: "auto",
              height: "380px",
              // objectFit: "cover",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          /> */}
          </Box>

          <Box
            sx={{
              // width: "60%",
              width: {
                xs: "100%",
                sm: "100%",
                md: "60%",
              },
              height: { xs: "auto", md: "100vh" },
              display: "grid",
              // alignItems: "center",
              // justifyContent: "center",
              placeItems: "center",
              minHeight: "100vh",
              p: {
                xs: "16px",
                sm: "16px",
                md: "0",
              },
              overFlow: "scroll",
            }}
          >
            <BaseCard
              sx={{
                // padding: "32px",
                // borderRadius: "32px",
                // minWidth: "500px",
                minWidth: {
                  xs: "300px",
                  sm: "300px",
                  md: "500px",
                  lg: "500px",
                  xl: "500px",
                },
                // minHeight: "400px",
                overFlow: "scroll",
              }}
            >
              {isMobileView && (
                <AppImage
                  src={logo}
                  alt="Background Image"
                  sx={{
                    borderRadius: "8px",
                    width: "auto",
                    height: "46px",
                    // objectFit: "cover",
                  }}
                />
              )}
              <SectionTitleText
                sx={{
                  marginTop: {
                    xs: "16px",
                    sm: "16px",
                    md: "24px",
                  },
                  // marginBottom: "8px",
                  fontSize: {
                    xs: "24px",
                    sm: "24px",
                    md: "32px",
                  },
                  // ml: {
                  //   xs: "0px",
                  //   sm: "0px",
                  //   md: "50px",
                  // },
                  color: (theme) => theme.palette.text.auth,
                }}
              >
                {headingTitle || "Login"}{" "}
              </SectionTitleText>
              <Box>{children}</Box>
            </BaseCard>
          </Box>
        </Box>
        {isMobileView && (
          <MobileAppHelperDrawer
            openDrawer={showMobileDrawer}
            handleClose={handleDrawerClose}
          />
        )}{" "}
        {/* </Container> */}
      </Box>
    );
}

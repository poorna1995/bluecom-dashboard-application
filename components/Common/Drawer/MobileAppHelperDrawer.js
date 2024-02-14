import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import AppImage from "../AppImage";
import helperImage from "public/assets/mobile-ui/helper-drawer.png";
import OutlinedButton from "../Buttons/OutlinedButton";

import DesktopIcon from "components/Common/Icons/MobileIcons/DesktopIcon";
import NotificationIcon from "../Icons/MobileIcons/NotificationIcon";
import PrimaryButton from "../Buttons/PrimaryButton";
import logo from "public/bluecom-logo.svg";
import { MdClose } from "react-icons/md";
export default function MobileAppHelperDrawer({
  openDrawer,
  handleClose,
  children,
}) {
  const handleBookTour = () => {
    let url = `https://calendly.com/bluecom/30min?back=1&month`;
    window.open(url, "_blank");
  };
  return (
    <div>
      {" "}
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            // borderTopLeftRadius: "16px",
            // borderTopRightRadius: "16px",
            height: "100vh",
            // zIndex: "10000",
          },
        }}
        anchor={"bottom"}
        open={openDrawer}
        onClose={handleClose}
      >
        <Box
          sx={{
            "& .helper-image": {
              width: "100%",
              height: "320px",
              objectFit: "cover",
            },
            "& .logo": {
              width: "100px",
              height: "auto",
              objectFit: "cover",
              position: "absolute",
              top: "20px",
              left: "24px",
            },
            "& .close": {
              position: "absolute",
              top: "48px",
              right: "12px",
              "& svg path": {
                color: "white",
              },
            },
          }}
        >
          <AppImage src={logo} className="logo" />
          <IconButton onClick={() => handleClose()} className="close">
            <MdClose />
          </IconButton>
          <AppImage src={helperImage} className="helper-image" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              px: 3,
            }}
          >
            <Typography
              sx={{
                color: "#000",
                fontFamily: " Inter",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "normal",
                mt: 2,
              }}
            >
              We are making our app mobile friendly
            </Typography>
            <Typography
              sx={{
                color: "#000",
                fontFamily: " Inter",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "normal",
                mt: 2,
                mb: 4,
              }}
            >
              To use it, please use a laptop or desktop.
            </Typography>

            <Box
              sx={{
                "& p": {
                  color: "#000",
                  fontFamily: " Inter",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "normal",
                  textAlign: "left",
                },
                "& .icon-container": {
                  background: (theme) => theme.palette.primary.main,
                  mr: 1,
                  minHeight: "35px",
                  minWidth: "35px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "6px",
                  // p: 1,
                },
                "& .row": {
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "300px",
                  mx: "auto",
                },
              }}
            >
              {data.map((item) => (
                <div key={item.title} className="row">
                  <div className="icon-container">{item.icon}</div>
                  <p>{item.title}</p>
                </div>
              ))}
            </Box>
            <PrimaryButton
              sx={{
                maxWidth: "200px",
                textAlign: "center",
                mt: 4,
                mx: "auto",
              }}
              onClick={handleBookTour}
              startIcon={<CalendarIcon />}
            >
              Book a Product Tour
            </PrimaryButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

const data = [
  {
    title: "	Currently our application supports Desktops.",
    icon: <DesktopIcon />,
  },
  {
    title:
      "	Create an Account with us, We'll notify you once we make it mobile friendly.",
    icon: <NotificationIcon />,
  },
];

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <path
      d="M5.625 13H3.75C3.08696 13 2.45107 12.7366 1.98223 12.2678C1.51339 11.7989 1.25 11.163 1.25 10.5V4.875C1.25 4.21196 1.51339 3.57607 1.98223 3.10723C2.45107 2.63839 3.08696 2.375 3.75 2.375H10.625C11.288 2.375 11.9239 2.63839 12.3928 3.10723C12.8616 3.57607 13.125 4.21196 13.125 4.875V6.75M5 1.75V3M9.375 1.75V3M1.25 5.5H13.125M11.5625 10.2769L10.625 11.2144"
      stroke="white"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.625 14.25C12.3509 14.25 13.75 12.8509 13.75 11.125C13.75 9.39911 12.3509 8 10.625 8C8.89911 8 7.5 9.39911 7.5 11.125C7.5 12.8509 8.89911 14.25 10.625 14.25Z"
      stroke="white"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

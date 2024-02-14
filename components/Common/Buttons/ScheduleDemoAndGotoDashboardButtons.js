import { Box, Typography } from "@mui/material";
import React from "react";
import OutlinedButton from "./OutlinedButton";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetStore } from "redux/onboarding/onboardingSlice";
import SecondaryButton from "./SecondaryButton";

const mapState = ({ storesData }) => ({
  connectedStores: storesData.connectedStores,
});
export default function ScheduleDemoAndGotoDashboardButtons({ handleClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLinkButtonClick = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  const handleClickWebsite = (website_link = "bluecom.ai/contact-us") => {
    if (
      website_link.startsWith("https://") ||
      website_link.startsWith("http://")
    ) {
      return window.open(website_link, "_blank");
    }
    return window.open(`https://${website_link}`, "_blank");
  };

  const handleClickScheduleDemo = () => {
    window.open("https://calendly.com/bluecom/30min?back=1&month", "_blank");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "12px",
          pb: "8px",
        }}
      >
        <SecondaryButton
          size="medium"
          sx={{
            // color: "#000",
            // paddingRight: "24px",
            // paddingLeft: "24px",
            // height: "52px",
            // width: "220px",
            textTransform: "initial",
            textTransform: "inherit",
            // borderColor: "#000",
            // borderRadius: "8px",
            // fontSize: "16px",
            // fontWeight: "500",
          }}
          className="button"
          onClick={() => {
            handleClose();
            //   router.push("/app/dashboard");
            handleClickScheduleDemo();
          }}
        >
          Schedule a Demo
        </SecondaryButton>
        <PrimaryButton
          sx={
            {
              // width: "320px",
              // height: "52px",
              // borderRadius: "8px",
              // fontSize: "16px",
              // fontWeight: "500",
            }
          }
          className="button"
          // onClick={() => {
          //   handleClose();
          // }}
          onClick={handleLinkButtonClick}
        >
          Connect your first store
        </PrimaryButton>
      </Box>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 400,
          color: "#555",
          mb: "16px",
        }}
      >
        We&apos;re here to support you every step of your journey with us.{" "}
        <span
          style={{
            color: "#4F44E0",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
            // router.push("/app/contact-us");
            handleClickWebsite("bluecom.ai/contact-us");
          }}
        >
          {" "}
          Contact Us
        </span>
      </Typography>
    </Box>
  );
}

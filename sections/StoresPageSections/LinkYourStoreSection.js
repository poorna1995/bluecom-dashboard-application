import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
// import { Box } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import bgImage from "public/assets/stores/store-integration.png";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "redux/onboarding/onboardingSlice";
import CrossIcon from "components/Common/Icons/POicons/DialogIcons/CrossIcon";
import ScheduleDemoAndGotoDashboardButtons from "components/Common/Buttons/ScheduleDemoAndGotoDashboardButtons";
import Welcome from "public/assets/BackgroundImages/welcome.png";

const styles = {
  container: {
    background: "#F5F9FF",
    p: 4,
    display: "grid",
    placeItems: "center",
    borderRadius: "26px",
    my: 4,
    "& .highlight": {
      color: (theme) => theme.palette.primary.main,
      // mb: 2,
      // pb: 2,
    },
    "& .title": {
      color: (theme) => theme.palette.text.primary,
      textAlign: "center",
      // fontFamily: "Inter",
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "28px",
      // mb: -3,
    },
    "& .description": {
      color: "#2E2E2E",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: " normal",
    },
    "& .image": {
      width: "100%",
      objectFit: "contain",
      height: "220px",
      mt: 2,
    },
    "& .button": {
      // p: "9px 12px",
      // height: "56px",
      // width: "310px",
      // borderRadius: "7px",
      // fontSize: "18px",
      // fontWeight: 600,
      // lineHeight: "21px",
      mt: 2,
    },
  },
};

const mapState = ({ storesData }) => ({
  connectedStores: storesData.connectedStores,
});
export default function LinkYourStoreSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { connectedStores } = useSelector(mapState);
  const handleLinkButtonClick = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  return (
    <Box sx={{ ...styles.container }}>
      <div>
        <h1 className="title">
          <span className="highlight">Welcome to Bluecom!</span>{" "}
        </h1>

        <h1 className="title"> Connect your primary store now!</h1>
      </div>
      <div>
        <AppImage
          src={bgImage}
          width={600}
          height={400}
          className={"image"}
          unoptimized={false}
          loading={"eager"}
          placeholder="empty"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PrimaryButton
          className="button"
          size="large"
          onClick={handleLinkButtonClick}
        >
          Connect Your Primary Store
          {/* Link your {connectedStores.length === 0 && "First "} store */}
          {/* Connect your {connectedStores.length === 0 && "First "}store
					with us */}
        </PrimaryButton>
      </div>
      <p className="description">
        {/* Integrate your stores to get managed using Bluecom. */}
        Having trouble? Bluecom team is here to help you.{" "}
        <a
          href="https://calendly.com/bluecom/30min?back=1&month"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us!
        </a>{" "}
      </p>
    </Box>
  );
}

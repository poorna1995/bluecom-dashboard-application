import { AppBar, Toolbar } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useEffect } from "react";
import logo from "public/bluecom-logo.svg";
import SuccessDialogForPO from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetOnboardingSteps } from "redux/onboarding/onboardingSlice";
import AppDemoBanner from "./AppDemoBanner";
import { setIsDemoBannerVisible } from "redux/views/viewsSlice";

const mapState = ({ user, productsData, views }) => ({
  currentUser: user.currentUser,
  productsData,
  isDemoBannerVisible: views.isDemoBannerVisible,
});
export default function OnboardingHeader({ RouterPushUrl }) {
  const { currentUser, isDemoBannerVisible } = useSelector(mapState);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleLeavePage = () => {
    setDialogOpen(false);
    setLoading(true);
    dispatch(resetOnboardingSteps());
    router.push(RouterPushUrl);
  };
  const userEmail = currentUser && currentUser.merchant_email;
  const isDemoUser = userEmail === "admin@demo.com";
  const handleShowDemoBanner = () => {
    dispatch(setIsDemoBannerVisible(true));
  };
  useEffect(() => {
    if (isDemoUser) {
      handleShowDemoBanner();
    }
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <AppBar
        elevation={0}
        color="default"
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
        }}
      >
        <AppDemoBanner />
        <Toolbar
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            // ...toolbarStyle,
          }}
        >
          <AppImage
            src={logo}
            // src={newLogo2}

            width={128}
            height={22}
            sx={{
              // width: "160px",
              // height: "28px",
              cursor: "pointer",
              ml: "24px",
            }}
            onClick={() => setDialogOpen(true)}
            // found
          />
        </Toolbar>
      </AppBar>
      <SuccessDialogForPO
        icon={<AlertIconPO />}
        title="Leave this page?"
        message="Are you sure you want to leave this page?"
        onCancel={() => setDialogOpen(false)}
        open={dialogOpen}
        onDelete={() => handleLeavePage()}
        primaryButtonProps={{
          sx: {
            ml: 2,
            flex: 2,
            backgroundColor: "#D92D20",
            "&:hover": {
              background: "#d91304",
            },
          },
        }}
        primaryButtonName="Leave this page"
        secondaryButtonName="Stay here"
      />
    </>
  );
}

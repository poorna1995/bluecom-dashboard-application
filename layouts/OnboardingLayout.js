import { Box } from "@mui/material";
import AppHeader from "components/AppHeader";
import OnboardingHeader from "components/AppHeader/OnboardingHeader";
import API_URL from "constants/API_URL";
import {
  DEMO_DEVELOPMENT_URL,
  DEMO_PRODUCTION_URL,
  DEMO_USER_EMAIL,
} from "constants/APP_CONSTANTS";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "redux/configureStore";
import { signOutUser } from "redux/user/userSlice";
import appFetch from "utils/appFetch";

const mapState = ({ user, views }) => ({
  currentUser: user.currentUser,
  isDemoBannerVisible: views.isDemoBannerVisible,
});
export default function OnboardingLayout({
  pageTitle,
  children,
  px,
  RouterPushUrl,
}) {
  const { currentUser, isDemoBannerVisible } = useSelector(mapState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handleValidateLoginToken = () => {
    const URL = API_URL.VALIDATE_LOGIN_TOKEN;
    const data = {
      user_id: currentUser.merchant_id,
      login_token: currentUser.login_token,
    };

    if (
      currentUser.merchant_email === DEMO_USER_EMAIL &&
      (window.location.host === DEMO_PRODUCTION_URL ||
        window.location.host === DEMO_DEVELOPMENT_URL)
    ) {
      return;
    }

    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log("token validated");
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          dispatch(signOutUser());
          removeCookie("access_token", {
            path: "/",
            domain:
              process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
          });

          enqueueSnackbar("Session expired. Please login again.", {
            variant: "error",
          });
          router.push("/auth/login");
          setTimeout(() => {
            router.reload();
          }, 1200);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (currentUser) {
      handleValidateLoginToken();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.merchant_id) {
      router.push("/auth/login");
    }
  }, [currentUser]);
  // if (currentUser)
  return (
    <Box>
      <PersistGate persistor={persistor}>
        <NextSeo title={pageTitle} />
        {/* <AppHeader showLogo /> */}
        <OnboardingHeader RouterPushUrl={RouterPushUrl} />
        <Box
          sx={{
            mt: isDemoBannerVisible ? "120px" : "80px",

            p: 2,
            px: px ? px : "36px",
          }}
        >
          {children}
        </Box>
      </PersistGate>
      {/* <MiniDrawer links={drawerNavLinks}>
                  {children}
              </MiniDrawer> */}
    </Box>
  );
}

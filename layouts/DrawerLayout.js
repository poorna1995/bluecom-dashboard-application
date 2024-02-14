import { Box } from "@mui/material";
import AppHeader from "components/AppHeader";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
// import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "redux/configureStore";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
import LogRocket from "logrocket";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import API_URL from "constants/API_URL";
import appFetch from "utils/appFetch";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { signOutUser } from "redux/user/userSlice";
import { enqueueSnackbar } from "notistack";
import {
  DEMO_DEVELOPMENT_URL,
  DEMO_PRODUCTION_URL,
  DEMO_USER_EMAIL,
} from "constants/APP_CONSTANTS";

const mapState = ({ user, views }) => ({
  currentUser: user.currentUser,
  isDemoBannerVisible: views.isDemoBannerVisible,
});
export default function DrawerLayout({
  pageTitle = "",
  children = <></>,
  px = "",
  mt = "",
}) {
  const { currentUser, isDemoBannerVisible } = useSelector(mapState);
  const router = useRouter();
  const { ref } = router.query;
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handleValidateLoginToken = () => {
    const URL = API_URL.VALIDATE_LOGIN_TOKEN;
    if (!cookies.access_token) {
      // router.reload();
      return;
    }

    const data = {
      user_id: currentUser.merchant_id,
      login_token:
        // currentUser.login_token,
        cookies.access_token,
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
    if (!currentUser) {
      router.push("/auth/login");
    }
    if (currentUser) {
      LogRocket.identify(currentUser.merchant_id, {
        name: `${currentUser.merchant_first_name} ${currentUser.merchant_last_name}`,
        email: currentUser.merchant_email,

        // Add your own custom user variables here, ie:
        // subscriptionType: 'pro'
      });
    }
  }, [currentUser]);

  // if (!currentUser) {
  // 	redirect("/auth/login");
  // }

  if (!currentUser) return <PageLoader />;
  if (currentUser)
    return (
      <Box>
        {/* <PersistGate persistor={persistor}> */}
        <NextSeo title={pageTitle} />
        <AppHeader showLogo />
        <Box
          sx={{
            mt: {
              md: mt ? mt : isDemoBannerVisible ? "140px" : "100px",
              xs: isDemoBannerVisible ? "100px" : "60px",
            },
            p: { xs: 0, sm: 0, md: 2 },
            px: { xs: "0px", sm: "0px", md: px ? px : "36px" },
          }}
        >
          {children}
        </Box>
        {/* </PersistGate> */}
        {/* <MiniDrawer links={drawerNavLinks}>
				{children}
			</MiniDrawer> */}
      </Box>
    );
}

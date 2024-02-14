import { Box, CircularProgress, Typography } from "@mui/material";
import OnboardingHeader from "components/AppHeader/OnboardingHeader";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import { CHANNEL, SHOPIFY, TASKS } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import StorePageLayout from "layouts/StorePageLayout";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStore,
  updateStoreOnboardingTillStoreAnalysis,
} from "redux/onboarding/onboardingSlice";
import {
  setConnectedStores,
  setStoreData,
  setStoreDict,
} from "redux/stores/storeSlice";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ShopifyAuthCallbackPage() {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  const { connectedStores } = useSelector((state) => state.storesData);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const merchant_id = currentUser && currentUser.merchant_id;
  const code = router.query.code;
  const shop = router.query.shop;
  const shopName = shop && shop.split(".myshopify.com")[0];
  const [cookies, setCookie, removeCookie] = useCookies([
    "shopifyShop",
    "shopifyCode",
  ]);
  console.log({ shopName });

  const referredBy = cookies.referredBy;

  const { id, channel } = router.query;
  const storePageNavLinks = [
    {
      title: "Select Channel",
      url: channel
        ? `/app/stores/add-store?step=select-channel&id=0&channel=${channel}`
        : `/app/stores/add-store?step=select-channel&id=0`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "select-channel",
    },
    {
      // title: "Add New Store",
      title: "Store Credentials",
      url: channel
        ? `/app/stores/add-store?step=add-new-store&id=1&channel=${channel}`
        : `/app/stores/add-store?step=add-new-store&id=1`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "add-new-store",
    },

    {
      title: "Store Summary",
      url: channel
        ? `/app/stores/add-store?step=store-analysis&id=2&channel=${channel}`
        : `/app/stores/add-store?step=store-analysis&id=2`,
      step: "store-analysis",
    },
    {
      title: "Connect Locations",
      url: channel
        ? `/app/stores/add-store?step=connect-location&id=3&channel=${channel}`
        : `/app/stores/add-store?step=connect-location&id=3`,
      step: "connect-location",
    },

    {
      title: "Store Sync",
      url: channel
        ? `/app/stores/add-store?step=sync&id=4&channel=${channel}`
        : `/app/stores/add-store?step=sync&id=4`,
      // isCompleted: checkisPreviousStepCompleted(
      // 	pageType,
      // 	"verify-changes",
      // ),
      step: "sync",
    },
  ];

  let alreadyConnectedStore =
    Array.isArray(connectedStores) &&
    connectedStores.length > 0 &&
    connectedStores.find((item) => item.shop === shopName);
  let isAlreadyConnected = Boolean(alreadyConnectedStore);

  const handleShopifyAuthentication = () => {
    const URL = TASKS.VALIDATE_CREDENTIALS;
    const data = {
      code: code,
      shop: shopName,
      user_id: currentUser && currentUser.merchant_id,
      channel_name: "shopify",
    };
    if (isAlreadyConnected) {
      router.push("/home");
      return;
    }

    appFetch(URL, data)
      .then((json) => {
        // if()

        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          setTimeout(() => {
            // enqueueSnackbar(json.message);
            // if (referredBy === "store-onboarding") {
            dispatch(updateStoreOnboardingTillStoreAnalysis({}));
            // step=add-new-store&id=1&channel=shopify
            // router.push(
            //   // `/app/stores/add-store?step=sync&id=2&channel=shopify&storeId=${json.store_id}&shop=${shopName}&drawerOpen=true`

            //   `/app/stores/add-store?step=add-new-store&id=1&channel=shopify&storeId=${json.store_id}&shop=${shopName}&drawerOpen=true`
            // );
            router.push(
              `/app/stores/add-store?step=store-analysis&id=2&channel=shopify&shop=${shopName}&taskId=${json.task_id}`
            );
            removeCookie("referredBy", {
              path: "/",
              domain:
                process.env.NODE_ENV === "production"
                  ? ".bluecom.ai"
                  : undefined,
            });
            // dispatch(setStoreData(json.result));
            // dispatch(setStoreDict(json.store_dict));
            // }
            // else {
            //   router.push("/home");
            //   removeCookie("referredBy", {
            //     path: "/",
            //     domain:
            //       process.env.NODE_ENV === "production"
            //         ? ".bluecom.ai"
            //         : undefined,
            //   });
            // }
          }, 500);
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          //  wait for 3 seconds to redirect to add store page

          setTimeout(() => {
            enqueueSnackbar(json.message, { variant: "error" });

            // router.push(
            //   `/app/stores/add-store?step=add-new-store&id=1&channel=shopify&connectionError=${json.message}&shop=${shopName}`
            // );
            router.push(
              `/app/stores/add-store?step=add-new-store&id=1&channel=shopify&connectionError=${json.message}&shop=${shopName}`
            );
          }, 3000);
        }
        console.log(json);
      })
      .catch((err) => console.error(err));
  };

  const handleFetchConnectedApps = () => {
    if (!currentUser) return;
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    // setLoading(true);
    appFetch(url, data)
      .then((json) => {
        // setLoading(false);

        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log(json);
          dispatch(setConnectedStores(json.result));
          if (shop && code && merchant_id) {
            handleShopifyAuthentication();
          }

          // setConnectedApps(json.result);
        }
      })
      .catch((error) => console.error(error));
  };

  // write the logic to redirect to sign up or login page if user is not logged in
  // save the code and shop name in cookies / local storage
  //  once the user logs in, send him back to stores list showing the status of the store if it is added or not
  useEffect(() => {
    if (currentUser) {
      handleFetchConnectedApps();
    } else {
      setCookie("shopifyShop", shop, {
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
      });
      setCookie("shopifyCode", code, {
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
      });
      setCookie("isNotLoggedIn", true, {
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
      });
      router.push("/auth/login");

      enqueueSnackbar("Please login to continue", { variant: "error" });
    }
  }, [shop, code]);

  return (
    <div>
      {/* <StorePageLayout
				links={storePageNavLinks}
				RouterPushUrl="/home"
				disableAllStepsOnSuccess
			> */}
      <OnboardingHeader />
      <Box
        sx={{
          pt: 14,
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "200px",
        }}
      >
        <Box sx={{ display: "grid", placeItems: "center" }}>
          <CircularProgress
            size={26}
            thickness={3}
            // color="success"
            sx={{
              mt: 14,
            }}
          />
          <Typography>
            Please wait while we are connecting with shopify
          </Typography>
        </Box>
      </Box>

      {/* <Typography
					sx={{
						fontSize: "21px",
						fontWeight: "700",
						color: "#000",
						textAlign: "center",
					}}
				>
					Please wait while we are connecting with shopify
				</Typography> */}
      {/* </StorePageLayout> */}
    </div>
  );
}
// http://localhost:3000/auth/shopify-auth-callback?code=fb8e956de546693c251304c4dfc3b629&hmac=580347ca19b41092f4b6ccb917cc294aea5046d04b33f932de2981bf49c2def1&host=aGl2ZXBhdGgtdGVzdC1zdG9yZS5teXNob3BpZnkuY29tL2FkbWlu&shop=hivepath-test-store.myshopify.com&timestamp=1674737144

// http://localhost:3000/auth/shopify-auth-callback?code=&hmac=a2309329796c4f3c851a94aa50e688c4f321efda23aa67453ecfa35adc132c5c&host=aGl2ZXBhdGgtdGVzdC1zdG9yZS5teXNob3BpZnkuY29tL2FkbWlu&shop=&timestamp=1674737927

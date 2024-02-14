import { Box, Container, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import DrawerLayout from "layouts/DrawerLayout";
import HomePageSections from "sections/HomePageSections";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "/utils/appFetch";
import { enqueueSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import { SHOPIFY, CHANNEL, TASKS } from "constants/API_URL";
import StoresPageSections from "../sections/StoresPageSections";
import LinkYourStoreSection from "sections/StoresPageSections/LinkYourStoreSection";
import StoresFAQSection from "sections/StoresPageSections/StoresFAQSection";
import { setConnectedStores } from "redux/stores/storeSlice";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import WelcomePopUp from "components/Common/Dialog/WelcomePopUp";
import WelcomeBackPopup from "components/Common/Dialog/WelcomeBackPopup";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import {
  updateStore,
  updateStoreOnboardingTillStoreAnalysis,
} from "redux/onboarding/onboardingSlice";
const mapState = ({ user, storesData }) => ({
  currentUser: user.currentUser,
  connectedStores: storesData.connectedStores,
});
export default function Home() {
  const { currentUser, connectedStores } = useSelector(mapState);
  const dispatch = useDispatch();
  const firstTimeUser = currentUser && currentUser.is_first_time_login;
  const [loading, setLoading] = React.useState(true);
  // const { isLoading, error, data, isFetching } = useQuery({
  // 	queryKey: ["repoData"],
  // 	queryFn: () =>
  // 		fetch("https://api.github.com/repos/tannerlinsley/react-query")
  // 			.then((res) => res.json())
  // 			.then((json) => json),
  // });

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;
  const router = useRouter();
  const merchant_id = currentUser && currentUser.merchant_id;
  // const code = router.query.code;
  // const shop = router.query.shop;
  // const shopName = shop && shop.split(".myshopify.com")[0];
  const [cookies, setCookie, removeCookie] = useCookies([
    "shopifyShop",
    "shopifyCode",
    "access_token",
  ]);
  const code = cookies.shopifyCode;
  const shop = cookies.shopifyShop;

  const shopName = shop && shop.split(".myshopify.com")[0];
  // console.log({ shopName, code, shop });
  let alreadyConnectedStore =
    Array.isArray(connectedStores) &&
    connectedStores.length > 0 &&
    connectedStores.find((item) => item.shop === shopName);
  let isAlreadyConnected = Boolean(alreadyConnectedStore);

  // store validation, i.e. check if the store exists in the database, will be applied here also, similar to what we have done in shopify-auth

  const handleShopifyAuthentication = (stores: Array<{ shop?: string }>) => {
    const URL = TASKS.VALIDATE_CREDENTIALS;
    const data = {
      code: code,
      shop: shopName,
      user_id: currentUser && currentUser.merchant_id,
      channel_name: "shopify",
    };
    if (Boolean(stores.find((item) => item?.shop === shopName))) {
      // router.push("/home");
      removeCookie("shopifyShop", {
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
      });
      removeCookie("shopifyCode", {
        path: "/",
        domain:
          process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
      });

      return;
    }

    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          // enqueueSnackbar("Connection ");
          dispatch(updateStoreOnboardingTillStoreAnalysis({}));

          // router.push("/app/stores");
          removeCookie("shopifyShop", {
            path: "/",
            domain:
              process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
          });
          removeCookie("shopifyCode", {
            path: "/",
            domain:
              process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
          });

          if (!Boolean(stores.find((item) => item.shop === shopName))) {
            router.push(
              `/app/stores/add-store?step=store-analysis&id=2&channel=shopify&shop=${shopName}&taskId=${json.task_id}`
            );
          }
        }
        enqueueSnackbar(json.message, { variant: "error" });
        console.log(json);
      })
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   if (shop && code) {
  //     handleShopifyAuthentication();
  //   }
  // }, [shop, code]);

  const data = [
    {
      title: "Add your details",
      description: "Add your personal details to access the dashboard",
      url: "/onboarding/merchant",
    },
    {
      title: "Create your first product",
      description: "Create your first product to ",
      url: "/onboarding/product",
    },
    {
      title: "Create your first vendor",
      description: "Add your vendor details",
      url: "/onboarding/vendor",
    },
  ];

  const URL = `https://api.bluecom.ai/api/payment/createCustomer`;
  const handleCreateCustomer = async () => {
    if (!currentUser) return;
    if (currentUser.stripe_customer_id) return;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((res) => res)
      .catch((err) => err);
  };
  useEffect(() => {
    handleCreateCustomer();
    handleFetchConnectedApps();
  }, []);

  const handleFetchConnectedApps = () => {
    if (!currentUser) return;
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    if (!cookies.access_token) {
      return;
    }
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        setLoading(false);

        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log(json);
          dispatch(setConnectedStores(json.result));
          if (shop && code) {
            // if (
            // 	!Boolean(
            // 		json.result.find(
            // 			(item) => item.shop === shopName,
            // 		),
            // 	)
            // ) {
            handleShopifyAuthentication(json.result);

            return;
            // }
          }
          // if()
          // console.log(
          // 	{
          // 		isAlreadyConnected:
          // 			Array.isArray(json.result) &&
          // 			Boolean(
          // 				json.result.find(
          // 					(item) => item.shop === shopName,
          // 				),
          // 			),
          // 	},
          // 	"Outside if statement",
          // );

          // setConnectedApps(json.result);
        }
      })
      .catch((error) => console.error(error));
  };

  if (loading)
    return (
      <DrawerLayout pageTitle="Bluecom Dashboard">
        <Container sx={{ pt: 2 }}>
          {/* <SectionLoader /> */}
          <StoresPageSections
            loading={loading}
            connectedApps={connectedStores}
          />
        </Container>
      </DrawerLayout>
    );

  return (
    <div>
      <DrawerLayout>
        <Container
          sx={
            {
              // display: "grid",
              // placeItems: "center",
              // height: "90vh",
            }
          }
        >
          {/* <PrimaryButton size="small">Small</PrimaryButton>
          <PrimaryButton size="medium">Medium</PrimaryButton>
          <PrimaryButton size="large">Large</PrimaryButton> */}
          {firstTimeUser &&
            Array.isArray(connectedStores) &&
            connectedStores.length === 0 && <WelcomePopUp />}
          {/* <HomePageSections /> */}
          {/* Render The Store Page Sections here, to link the store and view connected stores */}
          {Array.isArray(connectedStores) && connectedStores.length === 0 && (
            <>
              {!firstTimeUser && <WelcomeBackPopup />}
              <LinkYourStoreSection /> <StoresFAQSection />
            </>
          )}
          {Array.isArray(connectedStores) && connectedStores.length > 0 && (
            <Box sx={{ pt: 2 }}>
              <StoresPageSections
                loading={loading}
                connectedApps={connectedStores}
              />
              {/* <LinkYourStoreSection /> */}
            </Box>
          )}{" "}
        </Container>
      </DrawerLayout>
    </div>
  );
}

/**
 * http://localhost:3000/home?hmac=88b386a3d649c22942a447120c6140f1541a98cd3bc43fd198791774265b5e55&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvYXBwLWluc3RhbGwtc3RvcmU&session=ba9317fb51a59fe2d23fe6da3c27fd65a9fd07df7019ae3cd3687c2fd28c1da1&shop=app-install-store.myshopify.com&timestamp=1697632306
 *
 */

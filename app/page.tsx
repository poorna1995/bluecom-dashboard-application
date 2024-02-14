"use client";
import React, { useState, useEffect } from "react";
import { MERCHANT } from "constants/API_URL";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
import { useCookies } from "react-cookie";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import {
  DEMO_DEVELOPMENT_URL,
  DEMO_PRODUCTION_URL,
  DEMO_USER_EMAIL,
  DEMO_USER_PASSWORD,
} from "constants/APP_CONSTANTS";

export default function HomePage({ params, searchParams }) {
  const type = "demo";
  const referType = searchParams.type;
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([
    "merchant_currency",
    "access_token",
  ]);

  const handleSignIn = () => {
    setLoading(true);
    const url = MERCHANT.LOGIN;
    const data = {
      merchant_email: DEMO_USER_EMAIL,
      password: DEMO_USER_PASSWORD,
    };
    // setLoading(true);
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(signInUser(json.user_data));
          setCookie(
            "merchant_currency",
            json.user_data.merchant_currency ?? getCurrentCurrency(),
            {
              path: "/",
              domain:
                process.env.NODE_ENV === "production"
                  ? ".bluecom.ai"
                  : undefined,
            }
          );
          setCookie("access_token", json.user_data.login_token, {
            path: "/",
            domain:
              process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
          });

          // enqueueSnackbar(json.message, {
          //   variant: "success",
          //   autoHideDuration: 1000,
          // });
          router.push("/app/products");
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        }
        setLoading(false);
        // enqueueSnackbar(json.message, { variant: "error" });
      })
      .catch((error) => {
        // enqueueSnackbar(error.message, { variant: "error" });
        setLoading(false);
      });
  };

  // console.log({
  //   type,
  //   referType,
  // });

  useEffect(() => {
    if (
      // type === referType &&
      window.location.host === DEMO_PRODUCTION_URL ||
      window.location.host === DEMO_DEVELOPMENT_URL
    ) {
      console.log({ called: "called" });
      handleSignIn();
    } else {
      redirect("/home");
    }
  }, [referType]);

  // if (!referType) return;
  // if (type !== referType) {
  // 	redirect("/home");
  // }
  return <PageLoader />;
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/home");
  // }, []);
  // redirect("/home");
  // return (
  // 	<RootLayout>
  // 		<PageSpinner />
  // 	</RootLayout>
  // );
}

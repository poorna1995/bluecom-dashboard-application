/* eslint-disable react/no-unescaped-entities */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { MERCHANT } from "constants/API_URL";
import AuthLayout from "layouts/AuthLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import TermsAndConditionsSection from "../../components/Common/TermsAndCondiotions/TermsAndConditionsSection";
import { useCookies } from "react-cookie";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
import useIsMobileView from "constants/mobileView/useIsMobileView";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import BorderBottomButton from "components/Common/Buttons/BorderBottomButton";
export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([
    "merchant_currency",
    "access_token",
  ]);
  const isMobile = useIsMobileView();
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    setLoading(true);
    const url = MERCHANT.LOGIN;
    const data = {
      merchant_email: email,
      password,
    };
    // setLoading(true);
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          router.push("/home");

          setShowMobileDrawer(true);
          dispatch(signInUser(json.user_data));
          setCookie(
            "merchant_currency",
            json.user_data.merchant_currency ?? getCurrentCurrency().code,
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
          setTimeout(() => {
            router.reload();
          }, 1200);


          enqueueSnackbar(json.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          setLoading(false);
          enqueueSnackbar(json.message, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    router.push(`/auth/reset-password`);
  };

  return (
    <Box
      sx={
        {
          // marginTop: { xs: "84px", md: "0" },
        }
      }
    >
      {loading && <PageLoader />}
      <AuthLayout
        pageTitle={"Log in"}
        showMobileDrawer={showMobileDrawer}
        setShowMobileDrawer={setShowMobileDrawer}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            // maxWidth={600}
            spacing={{
              xs: "4px",
              sm: "4px",
              md: "16px",
            }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <TextInput
                title={"Email"}
                // label={"Enter your email"}
                required
                value={email}
                placeholder={"Enter your email"}
                // placeholder={"Eg: john@gmail.com"}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                labelStyles={{
                  // marginTop: "6px",
                  mb: "4px",
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "18px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextInput
                // sx={{
                //   "& .MuiOutlinedInput-input": {
                //     border: "none",
                //   },
                // }}
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0px",
                      marginBottom: "-6px",
                    }}
                  >
                    Password *
                    <BorderBottomButton
                      size="small2"
                      onClick={() => handleForgotPassword()}
                    >
                      Forgot Password?
                    </BorderBottomButton>
                    {/* <span
                      style={{
                        color: "#4F44E0",
                        // marginTop: "8px",
                        cursor: "pointer",
                        // fontSize: "",
                        fontWeight: "500",
                      }}
                      onClick={() => handleForgotPassword()}
                    >
                      Forgot Password?
                    </span>
                    */}
                  </div>
                }
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                // placeholder="*********"
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPassword(e.target.value)}
                labelStyles={{
                  // marginTop: "6px",
                  mb: "4px",
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "18px",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              mb: {
                xs: "16px",
                sm: "16px",
                md: "18px",
              },
            }}
          >
            <PrimaryButton
              sx={{
                marginTop: "46px",
                // width: "100%",
                // height: "42px",
              }}
              size="large"
              onClick={() => handleSignIn()}
              disabled={!email || !password}
            >
              Login To Bluecom
            </PrimaryButton>
          </Box>
        </Box>

        {/* <Divider /> */}

        <Box
          sx={{
            // marginTop: "18px",
            marginTop: {
              xs: "0px",
              sm: "0px",
              md: "0px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              // display: "flex",
              // flexDirection: {
              //   xs: "column",
              //   sm: "column",
              //   md: "row",
              // },
              // alignItems: "center",
              // textAlign: "center",
              color: (theme) => theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {/* New to bluecom? */}
            Not Registered Yet? Register in few clicks.{" "}
            {/* <AppLink
						href="/auth/sign-up"
						sx={{
							ml: "8px",
						}}
					>
						Create now
					</AppLink> */}
            <BorderBottomButton
              size="small2"
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign Up
            </BorderBottomButton>
          </Typography>
        </Box>
        <TermsAndConditionsSection />
      </AuthLayout>
    </Box>
  );
}

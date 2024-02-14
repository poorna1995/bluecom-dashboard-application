/* eslint-disable react/no-unescaped-entities */
import { Box, Card, Divider, Typography, Button } from "@mui/material";
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
import TermsAndConditionsSection from "../../components/Common/TermsAndCondiotions/TermsAndConditionsSection";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import appFetch from "utils/appFetch";

function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    const url = `https://api.bluecom.ai/api/merchant/forgotPassword`;
    const data = {
      email,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log("success");
          router.push(`/auth/reset-email-sent?email=${email}`);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));

    console.log("handleResetPassword");
  };
  return (
    <Box
      sx={
        {
          // marginTop: {xs:"84px",md:0}
        }
      }
    >
      {loading && <PageLoader />}
      <AuthLayout
        pageTitle={"Forgot Password "}
        headingTitle="Reset your Password"
      >
        <Typography
          sx={{
            mt: {
              xs: "8px",
              sm: "8px",
              md: "12px",
            },
            fontSize: {
              xs: "12px",
              sm: "12px",
              md: "16px",
            },
          }}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <TextInput
          title={"Email"}
          // label={"Enter your email"}
          required
          value={email}
          placeholder={"Enter your email"}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          labelStyles={{
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "16px",
            },
            mb: "4px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: "18px",
          }}
        >
          <PrimaryButton
            sx={{
              marginTop: {
                xs: "18px",
                sm: "18px",
                md: "32px",
              },
              width: "100%",
            }}
            onClick={() => handleResetPassword()}
            disabled={!email}
          >
            Reset Password
          </PrimaryButton>
        </Box>
        <Divider />

        <Box
          sx={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              // fontSize: "14px",
              fontSize: {
                xs: "12px",
                sm: "12px",
                md: "16px",
              },
              fontWeight: "600",
            }}
          >
            Remember your password?
            {/* <AppLink
						href="/auth/sign-up"
						sx={{
							ml: "8px",
						}}
					>
						Create now
					</AppLink> */}
            <Button
              disableRipple
              size="small2"
              sx={{
                // ml: "-16px",
                // height: {
                //   xs: "27px",
                //   sm: "27px",
                //   md: "32px",
                // },
                textTransform: "capitalize",
                borderRadius: "0px",
                transition: "all 0.3s ease-in-out",
                fontSize: "16px !important",
                fontWeight: "700",
                cursor: "pointer",
                borderColor: (theme) => theme.palette.text.heading,
                color: "#4F44E0",
                paddingLeft: "0px !important",
                m: "0px !important",
                // "&:hover": {
                //   borderColor: (theme) => theme.palette.text.heading,
                // },

                "&:hover": {
                  color: "#4F44E0",
                  backgroundColor: "transparent",
                  transition: "all .3s ease-in-out",
                  background: "transparent",
                },
                // px: 2,
                // pb: 0.2,
                // pt: 4,
                // mr: 1,
                position: "relative",
                textDecoration: "none",

                "&::after": {
                  content: '""',
                  borderBottom: "4px solid #4F44E0",
                  position: "absolute",
                  bottom: 4,
                  left: 10,
                  // right: 100,
                  width: "58%",
                  height: 4,
                  borderRadius: "none",
                  background: "transparent",
                  // bottom: 0,
                  // left: 0,
                  transformOrigin: "left",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease-in-out",
                },

                "&:hover::after": {
                  transformOrigin: "left",
                  transform: "scaleX(1)",
                  // width: "100%",
                  // backgroundColor: "#4F44E0",
                },
              }}
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </Typography>
        </Box>
        <TermsAndConditionsSection />
        {/* <Box
          sx={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: "0",
            position: "fixed",

            margin: "7%",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
            }}
          >
            By proceeding, you agree to our{" "}
            <AppLink
              style={{
                color: (theme) => theme.palette.text.heading,
                cursor: "pointer",
                fontWeight: "600",
                textDecoration: "underline",
                fontSize: "12px",
              }}
              href={`/legal/terms-and-conditions`}
            >
              Terms of Service{"  "}
            </AppLink>
            {"  "}
            and <br />
            <AppLink
              style={{
                color: (theme) => theme.palette.text.heading,
                cursor: "pointer",
                fontWeight: "600",
                textDecoration: "underline",

                display: "flex",
                justifyContent: "center",
                fontSize: "12px",
              }}
              href={`/legal/privacy-policy`}
            >
              Privacy Policy
            </AppLink>
          </Typography>
        </Box> */}
      </AuthLayout>
    </Box>
  );
}

export default ForgotPassword;

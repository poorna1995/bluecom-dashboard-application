/* eslint-disable react/no-unescaped-entities */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { MERCHANT, PAYMENTS, UTILS } from "constants/API_URL";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import validator from "validator";
import PasswordValidator from "./password-validator";
import TermsAndConditionsSection from "../../components/Common/TermsAndCondiotions/TermsAndConditionsSection";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
import getCurrentCountry from "utils/currencyConversion/getCurrentCountry";
import getCurrentLocation from "utils/locationUtils/getCurrentLocation";
import useIsMobileView from "constants/mobileView/useIsMobileView";
import BorderBottomButton from "components/Common/Buttons/BorderBottomButton";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useIsMobileView();
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [merchantLocation, setMerchantLocation] = useState({});
  const handleSignUp = () => {
    setLoading(true);
    const url = MERCHANT.REGISTRATION;
    const data = {
      merchant_first_name: firstName,
      merchant_last_name: lastName,
      merchant_email: email,
      password,
      merchant_currency: getCurrentCurrency(),
      merchant_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      merchant_country: getCurrentCountry(),
      merchant_location: merchantLocation ?? {},
    };
    appFetch(url, data)
      .then((json) => {
        setLoading(false);

        if (json.status === "success") {
          setShowMobileDrawer(isMobile);
          router.push(`/auth/login`);
          // handleCreateCustomer(json.result.merchant_id);
          // enqueueSnackbar(json.message);
          enqueueSnackbar("Account created successfully", {
            variant: "success",
          });
        }
        if (json.status === "failure") {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
    console.log({ data });
  };
  const handleButtonDisable = !email || !password || !firstName || !lastName;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleEmailBlur = (e) => {
    const value = e.target.value;
    if (value && !validator.isEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCreateCustomer = async (user_id) => {
    const URL = PAYMENTS.CREATE_CUSTOMER;

    const data = {
      user_id,
    };
    const res = await appFetch(URL, data);
    console.log(res);
    if (res.status === "success") {
      // enqueueSnackbar("Customer created successfully", {
      //   variant: "success",
      // });
    }
  };

  const handleGetUserLocation = ({ latitude, longitude }) => {
    const URL = UTILS.GET_LOCATION;
    appFetch(URL, { latitude, longitude })
      .then((res) => {
        if (res.status === "success") {
          setMerchantLocation(res.result);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    const navigator = typeof window !== "undefined" && window.navigator;
    console.log({
      // location: getCurrentLocation(navigator).then((res) => res.),
    });

    const location = getCurrentLocation(navigator).then((res) => {
      console.log({ location: res }), handleGetUserLocation(res);
    });
    // console.log({ location });
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <AuthLayout
        pageTitle={"Create an Account"}
        headingTitle="Signup for free"
        // showMobileDrawer={showMobileDrawer}
        // setShowMobileDrawer={setShowMobileDrawer}
      >
        {/* <Typography
          sx={{
            mt: 2,
            mb: {
              sm: 0,
              md: 4,
            },
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          No- Credit card Required
        </Typography> */}

        {/* <TextInput
				title={"First name"}
				// label={"First name"}
				type="text"
				value={firstName}
				placeholder={"Enter your first name"}
				required
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<TextInput
				title={"Last name"}
				// label={"Last name"}
				type="text"
				value={lastName}
				placeholder={"Enter your last name"}
				required
				onChange={(e) => setLastName(e.target.value)}
			/> */}
        <Grid
          container
          spacing={{
            xs: "4px",
            sm: "4px",
            md: 1,
          }}
          // marginBottom={1}
          sx={{
            marginBottom: "16px",
          }}
        >
          <Grid item xs={12} md={6}>
            <TextInput
              title={"First name"}
              type="text"
              value={firstName}
              placeholder={"Enter your first name"}
              required
              onChange={(e) => setFirstName(e.target.value)}
              labelStyles={{
                // marginTop: "-8px",
                mb: "-2px",
                fontSize: {
                  xs: "14px",
                  sm: "14px",
                  md: "16px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              title={"Last name"}
              type="text"
              value={lastName}
              placeholder={"Enter your last name"}
              required
              onChange={(e) => setLastName(e.target.value)}
              labelStyles={{
                // marginTop: "16px",
                mb: "-4px",
                fontSize: {
                  xs: "14px",
                  sm: "14px",
                  md: "16px",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* <Grid item xs={12}> */}
        <TextInput
          // label={"Email"}
          title={"Email"}
          type="email"
          value={email}
          placeholder={"Enter your email"}
          error={emailError}
          helperText={emailError}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
          labelStyles={{
            marginTop: "16px",
            mb: "4px",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "16px",
            },
          }}
        />
        {/* </Grid>
          <Grid item xs={12}> */}
        <TextInput
          sx={{
            "& .MuiOutlinedInput-input": {
              border: "none",
            },
          }}
          // label={"Password"}
          type={showPassword ? "text" : "password"}
          title={"Password"}
          // type="password"
          value={password}
          placeholder={"Enter your password"}
          required
          labelStyles={{
            marginTop: "6px",
            mb: "4px",
            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "16px",
            },
          }}
          InputProps={{
            endAdornment: (
              <PasswordValidator
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* </Grid> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: {
              xs: "16px",
              sm: "16px",
              md: "18px",
            },
          }}
        >
          <PrimaryButton
            size="large"
            sx={{
              marginTop: "24px",
              // width: "100%",
              // height: "42px",
            }}
            onClick={() => handleSignUp()}
            disabled={handleButtonDisable}
          >
            Create Account
          </PrimaryButton>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={{
            marginTop: {
              xs: "16px",
              sm: "16px",
              md: "0px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "64px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Have an existed account?
            {/* <AppLink
						href="/auth/login"
						sx={{
							ml: "8px",
						}}
					>
						Sign in
					</AppLink> */}
            <BorderBottomButton
              size="small2"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </BorderBottomButton>
          </Typography>
        </Box>
        {/* <Box
          sx={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              href={"/legal/terms-and-conditions"}
            >
              Terms of Service
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
              // href={"/legal/private-policy"}
              href={`/legal/privacy-policy`}
            >
              Privacy Policy
            </AppLink>
          </Typography>
        </Box> */}
        <TermsAndConditionsSection />
        {/* <Box sx={{ marginTop: "16px" }}>
				<AppLink href="/auth/login" sx={{ paddingTop: "16px" }}>
					Log in
				</AppLink>
			</Box> */}
      </AuthLayout>
    </>
  );
}

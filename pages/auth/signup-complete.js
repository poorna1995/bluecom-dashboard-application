import { Box, Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import UploadPhotoUsingButton from "components/Common/Buttons/UploadPhotoUsingButton";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import AuthLayout from "layouts/AuthLayout";
import React, { useState } from "react";
import TermsAndConditionsSection from "../../components/Common/TermsAndCondiotions/TermsAndConditionsSection";

function SignupComplete() {
  const [storeName, setStoreName] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {/* {loading && <PageLoader />} */}
      <AuthLayout
        pageTitle={"Create an Account"}
        headingTitle="Signup for free "
      >
        <Box
          sx={{
            mt: "50px",
          }}
        >
          <UploadPhotoUsingButton />
        </Box>

        <TextInput
          title={"Store Name"}
          // label={"First name"}
          type="text"
          value={storeName}
          placeholder={"Enter your store name"}
          required
          onChange={(e) => setStoreName(e.target.value)}
        />
        <TextInput
          title={"Country"}
          // label={"Last name"}
          type="text"
          value={country}
          placeholder={"Enter your country"}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextInput
          // label={"Email"}
          title={"Currency"}
          value={currency}
          placeholder={"Enter your currency"}
          required
          onChange={(e) => setCurrency(e.target.value)}
        />

        <PrimaryButton
          sx={{ marginTop: "16px", width: "100%" }}
          onClick={() => handleSignUp()}
          disabled={!storeName && !country && !currency}
        >
          Complete Sign Up
        </PrimaryButton>

        {/* <Box
          sx={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            By proceeding, you agree to our{" "}
            <span
              style={{
                color: "#1570EF",
                cursor: "pointer",
                fontWeight: "600",
                textDecoration: "underline",
              }}
            >
              Terms of Service{"  "}
            </span>
            {"  "}
            and <br />
            <span
              style={{
                color: "#1570EF",
                cursor: "pointer",
                fontWeight: "600",
                textDecoration: "underline",

                display: "flex",
                justifyContent: "center",
              }}
            >
              Privacy Policy
            </span>
          </Typography>
        </Box> */}
        <TermsAndConditionsSection />

        {/* <Box sx={{ marginTop: "16px" }}>
				<AppLink href="/auth/login" sx={{ paddingTop: "16px" }}>
					Log in
				</AppLink>
			</Box> */}
      </AuthLayout>
    </div>
  );
}

export default SignupComplete;

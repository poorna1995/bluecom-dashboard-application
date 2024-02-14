import { Box, Button } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import TermsAndConditionsSection from "components/Common/TermsAndCondiotions/TermsAndConditionsSection";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React from "react";
import appFetch from "utils/appFetch";

export default function ResetEmailSentPage() {
  const router = useRouter();
  const { email } = router.query;
  const title = `Password reset link sent!`;
  const [loading, setLoading] = React.useState(false);
  const handleResetPassword = () => {
    const url = `https://api.bluecom.ai/api/merchant/forgotPassword`;
    const data = {
      email,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        setLoading(false);

        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          enqueueSnackbar("Password reset link sent!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthLayout pageTitle={title} headingTitle={title}>
      {loading && <PageLoader />}

      <Box
        sx={{
          maxWidth: "440px",
          "& .content": {
            fontSize: "17px",
            color: "#000",
            lineHeight: "20px",
          },
          "& .content-resend": {
            fontSize: "14px",
            color: "#000",
            lineHeight: "20px",
            fontWeight: 500,
          },
          "& div": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <p className="content">
          We just sent you an email at{" "}
          <span style={{ color: "#5D51F9" }}>({email})</span> to reset your
          password. Please follow the link to set a new password.
        </p>
        <div>
          <SecondaryButton
            onClick={() => window.open(`https://mail.google.com`, "_blank")}
            sx={{
              textAlign: "center",
            }}
            startIcon={<GmailIcon />}
          >
            Open Gmail
          </SecondaryButton>
          <p className="content-resend">
            Didn&apos;t receive an email? Click
            <Button
              sx={{
                textTransform: "initial",
                p: 0,
                mt: "-3px",
                ml: "-3px",
              }}
              onClick={handleResetPassword}
              disableRipple
            >
              resend.
            </Button>
          </p>
        </div>

        <TermsAndConditionsSection />
      </Box>
    </AuthLayout>
  );
}

const GmailIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect x="0.5" width="24" height="24" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_12749_12494" transform="scale(0.0208333)" />
      </pattern>
      <image
        id="image0_12749_12494"
        width="48"
        height="48"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACv0lEQVR4nO2UT2jTYByG48F5c4ieJ47RBE0rbZItcT2VHYQWWoebx11ksEPPehC92YA35wSvnpyDVoUetNrmYGvRKiK7bG6oW77uIqOCcyVx/eSbjWY1af70r/C98N7Kr++TPC1B4ODg4ODg6FLyeE7kKepugSTLeZLcyZNkseDxTBNdzk+JnlYluqjk6B0l5y2rOfoOzFDHrceT5GqBoqBBl0rDw4OdHg4zzKAi0Uuq5IX/NEevNIXYf/LG47WuFSmK6dR4JetlVMm7Zjj+b+fNAUhyywIAtQp4Lt7u8YDn4orkrVqMh0qOBuYAFFWzAQCBwEGZ5x59CQaPtTr86+joUSBwD9BNq/G/Abw102N2xmsAdYjPm+OjvNvxgGcCQOA+avfsAKC2DaBeBQjcFUgQh5yMLwvsLOC5qv5WrwAcKaVXBjS0ZYD5iZn3bgHsKNWoDHAB8Doz9sYUYEgEcHJuUc3RZ6tuAJopZaQMcADwI+vbvZUOVSKpGGwKgBq49g7eD8b2XAIcUKqZMsAmwPrzQPXy4zBE420BoJ66uQGvXrxeM/prtTOmDrGOavfzqsH49NNxeCEV/TPeNoDWybnFmnTGt+sGwGlV3fDvWZ8ipicODHcFoCmVYkNb3QLYfOHf1ivTMoCmVCIcX0FKdRLg5TP+U6MybQHQOjuz8AEIXKUDAJWFJ6HlZsPbAoBaFvwnAc++atd4WeDebvD+ETvj2wKAPltimMMyz4qywLWklMxz91bPjxxBN7sKoAWcY6KAZ7edP3X2mzzGXtLf6gkAilOlNGWIhvQMwIlSemX6CsBKKSNl+hLASCkzZfoWAAVpIgvsbVQzZfoawE0iGEDEb6ClRLBCCQD6/kecjMmmB4ZEWex3gHAqmjA9cPrG8sA+hMWb6AVAOBkDkWRMnHo4NdCp78fBwcHBIf67/ALECpwyy5gUBAAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

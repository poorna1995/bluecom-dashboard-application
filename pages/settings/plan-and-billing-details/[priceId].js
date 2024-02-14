import { Container, Divider } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import CheckoutForm from "components/StripeComponents/CheckoutForm";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import { Box, Typography } from "@mui/material";
import StarIcon from "components/Common/Icons/PricingPageIcons/StarIcon";
import BilledAndTrailComponent from "sections/SettingPageSection/PlanAndBillDetailsPageSection/components/BilledAndTrailComponent";
import CircleIcon from "@mui/icons-material/Circle";
import PaymentProcessingDialogComponent from "sections/SettingPageSection/PlanAndBillDetailsPageSection/components/PaymentProcessingDialogComponent";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PaymentSuccessfulDialogComponent from "sections/SettingPageSection/PlanAndBillDetailsPageSection/components/PaymentSuccessfulDialogComponent";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PlanPaymentPage() {
  const router = useRouter();
  const { priceId, plan_name } = router.query;
  const [openProcessing, setOpenProcessing] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleOpenProcessingDialog = () => {
    setOpenProcessing(true);
  };
  const handleCloseProcessingDialog = () => {
    setOpenProcessing(false);
  };
  const handleOpenSuccessDialog = () => {
    setOpenSuccess(true);
  };
  const handleCloseSuccessDialog = () => {
    setOpenSuccess(false);
    router.push("/settings/plan-and-billing-details");
  };

  const appearance = {
    theme: "flat",
  };
  const options = {
    // clientSecret,
    appearance,
    mode: "subscription",
    amount: 2000,
    currency: "inr",
  };

  const dataPlan = [
    {
      title: "Basic",
      color: "#078514",
      icon: <StarIcon />,
      price: "$149",
      pricePer: "/mo",
      freeTrail: "Annually",
      trailStartDate: "Today",
      startBillingDate: "17 Jun 2023",

      features: [
        "Only " + priceId + "/month after 14 days trial", // priceId is for reference only to change price value later
        "You won't be charged until 17-Jun-2023",
        "We'll remind you 1 day before you get charged",
        "Cancel anytime",
      ],
    },
  ];

  const planDetail = dataPlan.map((item, index) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "100%",
          gap: "16px",
          border: "1px solid #0000001A",
          ml: "150px",
          borderRadius: "10px",
          maxWidth: "376px",
        }}
        key={index}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 16px 0 16px",
          }}
        >
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <StarIcon />
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: item.color,
                mt: "5px",
              }}
            >
              {item.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                // marginLeft: "12px",
                fontSize: "44px",
                fontWeight: "700",
                color: "#222222",
                lineHeight: "66px",
              }}
            >
              {item.price}
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#313131",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {item.pricePer}
                {/* {item.helpIcon} */}
              </span>
            </Typography>
          </Box>

          <BilledAndTrailComponent
            period={item.freeTrail}
            alignment={"row"}
            bullet={true}
            color={"#555555"}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            padding: "0 24px 24px ",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* trail start date */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: "88px",
              mb: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#222222",
              }}
            >
              Trial Start Date
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#222222",
              }}
            >
              {item.trailStartDate}
            </Typography>
          </Box>
          {/* billing date */}
          <Box sx={{ display: "flex", justifyContent: "left", gap: "77px" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#222222",
              }}
            >
              {" "}
              Start Billing Date
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#222222",
              }}
            >
              {item.startBillingDate}
            </Typography>
          </Box>
          {/* features */}
          <Box
            sx={{
              mt: "44px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {item.features.map((feature, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CircleIcon
                    sx={{ width: "6px", height: "6px", color: "#0E0B3D" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#555555",
                      lineHeight: "22px",
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  });

  if (!stripePromise) return <PageSpinner />;
  console.log(priceId);
  console.log(plan_name);
  return (
    <DrawerLayout>
      <Container
        sx={{
          mt: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "34px",
          px: "236px",
        }}
        maxWidth="1440px"
      >
        <SectionTitleText
          sx={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "700",
            lineHeight: "44px",
          }}
        >
          Upgrade to {plan_name} Plan
        </SectionTitleText>
        <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          {planDetail}
          <Box
            sx={{
              width: "100%",
              border: "1px solid #0000001A",
              p: "24px 29px",
              borderRadius: "0.625rem",
              mr: "150px",
              maxWidth: "580px",
            }}
          >
            <SectionTitleText
              sx={{
                mb: 4,
              }}
            >
              Continue Purchase:
              {plan_name}
            </SectionTitleText>
            {priceId && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm price_id={priceId} />
              </Elements>
            )}
          </Box>
        </Box>
        <PaymentProcessingDialogComponent
          openDialog={openProcessing}
          handleDialogClose={handleCloseProcessingDialog}
        />
        <PaymentSuccessfulDialogComponent
          openDialog={openSuccess}
          handleDialogClose={handleCloseSuccessDialog}
        />

        <PrimaryButton
          sx={{ width: "15%" }}
          onClick={handleOpenProcessingDialog}
        >
          open processing
        </PrimaryButton>
        <PrimaryButton sx={{ width: "15%" }} onClick={handleOpenSuccessDialog}>
          open Success
        </PrimaryButton>
      </Container>
    </DrawerLayout>
  );
}

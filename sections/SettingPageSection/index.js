import { Box, Divider, Grid } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import IntergrationsIcon from "components/Common/Icons/SettingsSectionIcons/IntergrationsIcon";
import LoginIcon from "components/Common/Icons/SettingsSectionIcons/LoginIcon";
import PaymentIcon from "components/Common/Icons/SettingsSectionIcons/PaymentIcon";
import PlanIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcon";
import ProfileIcon from "components/Common/Icons/SettingsSectionIcons/ProfileIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useRouter } from "next/router";

function SettingsPageSection() {
  const router = useRouter();

  const handleRouteChange = (route) => {
    router.push(route);
  };
  // const handleIntergrationDisplay = () => {
  //   router.push("");
  // };
  // const handleProfileDisplay = () => {
  //   router.push("/settings/profile-details");
  // };
  // const handlePlanAndBillDisplay = () => {
  //   router.push("/settings/plan-and-billing-details");
  // };
  // const handlePaymentDisplay = () => {
  //   router.push("/settings/payment-method");
  // };
  // const handleLoginDisplay = () => {
  //   router.push("/settings/plan-and-billing-details");
  // };

  const card = [
    {
      logo: <IntergrationsIcon />,
      title: "Integrations",
      description:
        "Connect Your Shopify and WooCommerce Stores and efficiently manage multiple platforms",
      button: "View",
      route: `/app/stores`,
    },
    {
      logo: <ProfileIcon />,
      title: "Profile Settings",
      description: "Configure Profile Settings and Update Your password",
      button: "View",
      route: `/settings/profile-details`,

      function: () => {
        handleProfileDisplay();
      },
    },
    {
      logo: <PlanIcon />,
      title: "Plan & Billing Details",
      description: "Upgrade Your Plans and Access Detailed Billing Information",
      button: "View",
      // function: () => {
      //   handlePlanAndBillDisplay();
      // },
      route: `/settings/plan-and-billing-details`,
    },
    {
      logo: <PaymentIcon />,
      title: "Payment Method",
      description:
        "Add and Update Your Billing and Payment Methods for Seamless Transactions",
      button: "View",
      route: `/settings/payment-method`,

      // function: () => {
      //   handlePaymentDisplay();
      // },
    },
    // {
    //   logo: <LoginIcon />,
    //   title: "Login & Account Security",
    //   description:
    //     "Use this personalized guide to get your store up and running.",
    //   button: "Display",
    //   route: `/settings/plan-and-billing-details`,

    //   function: () => {
    //     handleLoginDisplay();
    //   },
    // },
  ];
  const cards = card.map((item, index) => {
    return (
      <Grid
        key={index}
        item
        sx={{
          width: "100%",

          padding: "23px",
          borderRadius: "10px",
          border: "1px solid #00000026",
        }}
        xs={12}
        md={3.5}
        lg={3.85}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Box
              sx={{
                padding: "13px",
                backgroundColor: "#4F44E0",
                width: "3.3125rem",
                height: "3.3125rem",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.logo}
            </Box>
            <SectionTitleText>{item.title}</SectionTitleText>
          </Box>
          <DescriptionText
            sx={{
              pt: "12px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#313131",
            }}
          >
            {item.description}
          </DescriptionText>
          <OutlinedButton
            sx={{ mt: "26px", minWidth: "150px", alignSelf: "flex-end" }}
            onClick={() => handleRouteChange(item.route)}
          >
            {item.button}
          </OutlinedButton>
        </Box>
      </Grid>
    );
  });

  return (
    <div>
      <SectionTitleText
        sx={{
          padding: "31px 0 11px 0",
          fontSize: "32px",
          fontWeight: "700",
          color: "#19235A",
        }}
      >
        Settings
      </SectionTitleText>
      <Divider sx={{ marginBottom: "29px" }} />
      <Grid container rowGap={3} columnGap={3}>
        {cards}
      </Grid>
    </div>
  );
}

export default SettingsPageSection;

import { Box, Divider } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CheckMarkGreenIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkGreenIcon";
import CheckMarkOrangeIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkOrangeIcon";
import CheckMarkPurpleIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkPurpleIcon";
import GreenStarIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/GreenStarIcon";
import OrangeStartIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/OrangeStartIcon";
import PurpleStartIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/PurpleStartIcon";
import QuestionIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/QuestionIcon";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";

const planData = [
  {
    logo: <GreenStarIcon />,
    logoBg: "#ECFDF3",
    planName: "Basic",
    planNameColor: "#078514",
    price: "$12.99",
    planDuration: "/mo",
    yearlyMessage: "When paid yearly",
    entries: "100",
    usrLicense: "1 user",
    button: "Purchase Now",
    features: [
      {
        checkIcon: <CheckMarkGreenIcon />,
        entries: "100",
      },
      {
        checkIcon: <CheckMarkGreenIcon />,
        usrLicense: "1 user",
      },
      {
        checkIcon: <CheckMarkGreenIcon />,
        helpCenter: "Help Center",
        email: "email",
      },
    ],
  },
  {
    logo: <PurpleStartIcon />,
    logoBg: "#F9F5FF",
    planName: "Premium",
    planNameColor: "#7C00FF",
    checkIcon: <CheckMarkPurpleIcon />,
    price: "$49.99",
    planDuration: "/mo",
    yearlyMessage: "When paid yearly",
    entries: "100",
    usrLicense: "1 user",
    button: "Purchase Now",
    features: [
      {
        checkIcon: <CheckMarkPurpleIcon />,
        entries: "100",
      },
      {
        checkIcon: <CheckMarkPurpleIcon />,
        usrLicense: "1 user",
      },
      {
        checkIcon: <CheckMarkPurpleIcon />,
        helpCenter: "Help Center",
        email: "email",
      },
    ],
  },
  {
    logo: <OrangeStartIcon />,
    logoBg: "#FFFAEB",
    planName: "Enterprise",
    planNameColor: "#FF7C00",
    checkIcon: <CheckMarkOrangeIcon />,
    price: "Custom",
    yearlyMessage: "For Organisation",
    planDuration: "",
    entries: "100",
    usrLicense: "1 user",
    button: "Talk to Us",
    features: [
      {
        checkIcon: <CheckMarkOrangeIcon />,
        entries: "100",
      },
      {
        checkIcon: <CheckMarkOrangeIcon />,
        usrLicense: "1 user",
      },
      {
        checkIcon: <CheckMarkOrangeIcon />,
        helpCenter: "Help Center",
        email: "email",
      },
    ],
  },
];

export default function PlanCard({
  planName,
  price,
  plan = {},
  currency,
  priceId,
}) {
  const router = useRouter();
  const handleClickPurchaseNowButton = (price_id) => {
    router.push(
      `/settings/plan-and-billing-details/${price_id}?plan_name=${planName}`
    );
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "1px solid #0000001A",
        p: "15px",
        mb: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* StarIcon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <Box
              sx={{
                p: "12px",
                // backgroundColor: `${plan.logoBg}`,
                width: "fit-content",
              }}
            >
              {/* {plan.logo} */}
            </Box>
            <SectionTitleText
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                // color: `${plan.planNameColor}`,
              }}
            >
              {planName}
            </SectionTitleText>
          </Box>
          <Box sx={{ display: "flex", gap: "0.5rem", mt: "20px" }}>
            <DescriptionText
              sx={{
                color: "#170F49",
                fontSize: "34px",
                fontWeight: "700",
                "& span": {
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#000",
                },
              }}
            >
              {getCurrencyValue(price / 100, currency)}
              {/* <RenderCurrency value={price / 100} /> */}
              <span> / month</span>
            </DescriptionText>
            <QuestionIcon />
          </Box>
          <DescriptionText
            sx={{
              color: "#595959",
              fontSize: "14px",
              fontWeight: "500",
              mt: "5px",
            }}
          >
            {/* {plan.yearlyMessage} */}
            When paid yearly
          </DescriptionText>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {Array.isArray(plan.features) &&
            plan.features.length > 0 &&
            plan.features.map((feature, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  pb: "1rem",
                }}
                key={index}
              >
                {feature.checkIcon}
                <DescriptionText
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    "& span": {
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    },
                    width: "fit-content",
                    display: "flex",
                  }}
                >
                  <span>{feature.entries}</span> entries
                </DescriptionText>
              </Box>
            ))}
        </Box>

        <PrimaryButton
          sx={{ width: "9.375rem", mr: "10px" }}
          onClick={() => handleClickPurchaseNowButton(priceId)}
        >
          Purchase Now
        </PrimaryButton>
      </Box>
      <Divider />
      <DescriptionText
        sx={{
          color: "#4F44E0",
          textAlign: "center",
          pt: "1rem",
          fontSize: "14px",
        }}
      >
        See All Features
      </DescriptionText>
    </Box>
  );
}

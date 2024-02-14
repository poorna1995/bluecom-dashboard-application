import React from "react";
import { Box, Divider, Grid, Typography, Chip, Button } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import GoBack from "./components/GoBack";
import StatusAsChipPlan from "components/Common/Chip/StatusAsChipPlan";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import GreenStarIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/GreenStarIcon";
import QuestionIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/QuestionIcon";
import { useRouter } from "next/router";
import CheckMarkGreenIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkGreenIcon";
import OrangeStartIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/OrangeStartIcon";
import PurpleStartIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/PurpleStartIcon";
import CheckMarkPurpleIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkPurpleIcon";
import CheckMarkOrangeIcon from "components/Common/Icons/SettingsSectionIcons/PlanIcons/CheckMarkOrangeIcon";
import { PAYMENTS } from "constants/API_URL";
import PlanCard from "./components/PlanCard";
import { useQuery } from "@tanstack/react-query";
import CurrentPlanCard from "./components/CurrentPlanCard";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import ToggleMonthAndAnnualButton from "./components/ToggleMonthlyAndAnnuallyButton";
import StarIconBlue from "components/Common/Icons/PricingPageIcons/StarIconBlue";
import CheckIcon from "components/Common/Icons/VendorIcon/CheckIcon";
import StarIcon from "components/Common/Icons/PricingPageIcons/StarIcon";
import MostPopularCardLabel from "components/Common/Icons/PricingPageIcons/MostPopularCardLabel";
import BilledAndTrailComponent from "./components/BilledAndTrailComponent";
import StarIconPurple from "components/Common/Icons/PricingPageIcons/StarIconPurple";
import MessageIcon from "components/Common/Icons/PricingPageIcons/MessageIcon";
import StarIconOrnage from "components/Common/Icons/PricingPageIcons/StarIconOrange";
import StarIconOrange from "components/Common/Icons/PricingPageIcons/StarIconOrange";
import GoBackButtonWithRoute from "./components/GoBack";
import GoBackComponent from "./components/GoBackComponent";
import { GetStartedOutlinedButton } from "./components/GetStartedOutlinedButton";
import { GetStartedPrimaryButton } from "./components/GetStartedPrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import CheckIconPurple from "components/Common/Icons/SettingsSectionIcons/PaymentIcons/CheckIconPurple";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import PricingSubscriptionPage from "./components/PricingSubscriptionPage";
import PaymentProcessingDialogComponent from "./components/PaymentProcessingDialogComponent";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function PlanAndBillDetailsPageSection() {
  const router = useRouter();

  const { currentUser } = useSelector(mapState);

  const dataMonth = [
    {
      title: "Basic",
      color: "#078514",
      icon: <StarIcon />,
      cardLabel: <MostPopularCardLabel />,
      desc: "Perfect for individuals or new businesses.",
      price: "$169",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,
      primaryButton: "Upgrade Now",
      features: [
        {
          description: "Includes:",
          tick: <CheckIconPurple />,
          keyfeature: [
            "Up to 5,000 SKUs",
            "Up to 3 Stores ",
            "Unlimited POs",
            "Help center and email support/Zoom Support ",
          ],
        },
      ],
      function: () => {
        handleGetStartedforBasic();
      },
      freeTrail: <BilledAndTrailComponent period={"Monthly"} />,
    },
    {
      title: "Premium",
      color: "#7B46EB",
      icon: <StarIconPurple />,
      desc: "Perfect for individuals or new businesses.",
      price: "$399",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,

      outlinedButton: "Upgrade Now",
      features: [
        {
          description: "Includes:",
          tick: <CheckIconPurple />,
          keyfeature: [
            "Up to 20,000 SKU’s",
            "Up to 15 Stores",
            "Unlimited POs",
            "Help center and email support/Zoom Support ",
          ],
        },
      ],
      function: () => {
        handleGetStartedforPremium();
      },
      freeTrail: <BilledAndTrailComponent period={"Monthly"} />,
    },
    {
      title: "Enterprise",
      color: "#F2761D",
      icon: <StarIconOrange />,
      desc: "Perfect for individuals or new businesses.",
      price: <MessageIcon />,
      name: "Let’s Talk",
      outlinedButton: "Contact Us",
      features: [
        {
          description: "Includes:",
          // tick: <CheckIcon />,
          keyfeature: [""],
        },
      ],
      function: () => {
        handleGetStartedforEnterprise();
      },
    },
  ];
  const dataAnnual = [
    {
      title: "Basic",
      color: "#078514",
      icon: <StarIcon />,
      cardLabel: <MostPopularCardLabel />,
      desc: "Perfect for individuals or new businesses.",
      strikedPrice: "$169",
      price: "$149",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,
      primaryButton: "Upgrade Now",

      features: [
        {
          description: "Includes:",
          tick: <CheckIconPurple />,
          keyfeature: [
            "Up to 5,000 SKUs",
            "Up to 3 Stores ",
            "Unlimited POs",
            "Help center and email support/Zoom Support ",
          ],
        },
      ],
      function: () => {
        handleGetStartedforBasic();
      },
      freeTrail: <BilledAndTrailComponent period={"Annually"} />,
    },
    {
      title: "Premium",
      color: "#7B46EB",
      icon: <StarIconPurple />,
      desc: "Perfect for individuals or new businesses.",
      strikedPrice: "$399",
      price: "$349",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,

      outlinedButton: "Upgrade Now",
      features: [
        {
          description: "Includes:",
          tick: <CheckIconPurple />,
          keyfeature: [
            "Up to 20,000 SKU’s",
            "Up to 15 Stores",
            "Unlimited POs",
            "Help center and email support/Zoom Support ",
          ],
        },
      ],
      function: () => {
        handleGetStartedforPremium();
      },
      // route: `/contact-us/enterprise`,
      freeTrail: <BilledAndTrailComponent period={"Annually"} />,
    },
    {
      title: "Enterprise",
      color: "#F2761D",
      icon: <StarIconOrnage />,
      desc: "Perfect for individuals or new businesses.",
      price: <MessageIcon />,
      name: "Let’s Talk",
      outlinedButton: "Contact Us",
      features: [
        {
          description: "Includes:",
          // tick: <CheckIcon />,
          keyfeature: [""],
        },
      ],
      function: () => {
        handleGetStartedforEnterprise();
      },
      route: `/contact-us/enterprise`,
    },
  ];
  const [dataPlan, setDataPlan] = React.useState(dataAnnual);
  const [billPeriod, setBillPeriod] = React.useState("Annual");
  const [compareFeatures, setCompareFeatures] = React.useState(false);

  const FETCH_STRIPE_PRODUCTS_URL = PAYMENTS.FETCH_STRIPE_PRODUCTS;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stripeProducts"],
    queryFn: () => fetch(FETCH_STRIPE_PRODUCTS_URL).then((res) => res.json()),
  });
  // console.log("data", data);
  const {
    data: subscriptionsData = {},
    isLoading: isLoadingPlans,
    isError: isErrorInPlans,
  } = useQuery({
    queryKey: ["customerData"],
    queryFn: () =>
      appFetch(PAYMENTS.FETCH_SUBSCRIPTION, {
        user_id: currentUser.merchant_id,
        customer_id: currentUser.stripe_customer_id,
      }).then((json) => json),
  });

  const subscription =
    (subscriptionsData && subscriptionsData?.subscription) ?? [];

  // I want to filter the subscriptions array and the products array based on the product id
  // and then map the filtered array to the plan cards
  const products = data?.products || [];

  const filteredPlans =
    Array.isArray(subscription) && subscription.length > 0
      ? subscription
          .map((sub) => {
            return products.filter((product) => {
              return product.id !== sub.plan.product;
            });
          })
          .flat()
      : products;

  // console.log({ subscription, filteredPlans });

  const planCards =
    Array.isArray(filteredPlans) &&
    !isLoading &&
    filteredPlans.map((plan, index) => {
      return (
        <PlanCard
          key={index}
          planName={plan?.name}
          price={plan?.prices?.unit_amount}
          currency={plan?.prices?.currency}
          priceId={plan?.prices?.id}
        />
      );
    });

  // if (isLoadingPlans || isLoading) return <PageSpinner />;

  const handleGetStartedforBasic = () => {
    // router.push("/signup");
    window.open(
      `/settings/plan-and-billing-details/Basic?plan_name=Basic`,
      "_blank"
    );
  };

  const handleGetStartedforPremium = () => {
    window.open(
      `/settings/plan-and-billing-details/Premium?plan_name=Premium`,
      "_blank"
    );

    // router.push("/signup");
  };

  const handleGetStartedforEnterprise = () => {
    router.push(`https://www.bluecom.ai/contact-us/enterprise`, "_blank");
  };

  const handleToggle = (event, Period) => {
    if (Period !== null) {
      setBillPeriod(Period);
    }
    if (Period === "Annual") {
      setDataPlan(dataAnnual);
    } else if (Period === "Month") {
      setDataPlan(dataMonth);
    }
  };

  const tabsDataPlan = [
    {
      label: `Plan`,
      component: (
        <div>
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            sx={{ px: "280px" }}
            rowGap={3}
          >
            {Array.isArray(subscription) &&
              subscription.length > 0 &&
              subscription.map((item, index) => (
                <Grid item xs={12} md={12} lg={12} key={index}>
                  {/* <CurrentPlan */}
                  <CurrentPlanCard subscription={item} />
                </Grid>
              ))}
          </Grid>
        </div>
      ),
      route: "plan",
    },
    {
      label: `Billing History`,
      component: <div>work in progress</div>,
      route: "billing-history",
    },
  ];

  const tabsDataOtherPlan = [
    {
      label: `Other Plan`,
      component: (
        <div>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: "24px" }}>
            {planCards}
          </Grid>
        </div>
      ),
      route: "other-plan",
    },
    {
      label: `Add-ons`,
      component: <div>work in progress</div>,
      route: "add-ons",
    },
  ];

  const handleCompareFeatures = () => {
    setCompareFeatures(!compareFeatures);
  };

  return (
    <Box>
      <GoBackComponent />

      <Box sx={{ maxWidth: "1440px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <SectionTitleText
            sx={{
              marginTop: "36px",
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "44px",
              color: "#222222",
              px: "150px",
              // fontFamily: "Manrope, sans-serif",
              pb: "20px",
            }}
          >
            Plan That suits your Business
          </SectionTitleText>
          <DescriptionText
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "22px",
              color: "#222222",
              fontFamily: "Manrope, sans-serif",
              pb: "20px",
            }}
          >
            Choose a plan that’s right for you. No long term contracts. Upgrade
            as you <br /> grow. Need help? Check out our{" "}
            <a
              href="blank"
              style={{
                color: "#4F44E0",
                textDecoration: "none",
              }}
            >
              {" "}
              Support Page{" "}
            </a>
          </DescriptionText>

          <ToggleMonthAndAnnualButton
            billPeriod={billPeriod}
            handleToggle={handleToggle}
            sx={{ mt: "37px" }}
          />
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            marginTop: "36px",
            marginBottom: "36px",
            justifyContent: "center",
            alignItems: "flex-start",
            // textAlign: "center",
          }}
        >
          {dataPlan.map((item) => {
            return (
              <>
                <Grid item xs={2.8}>
                  <BaseCard
                    sx={{
                      backgroundColor: "#F8F8F8",
                      border: "1px solid #E5E5E5",
                      borderRadius: "30px",
                      height: "610px",
                      backgroundColor: "#FFFFFF",
                      // pt: "37px  ",

                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "block",
                        position: "absolute",
                        right: "0",
                      }}
                    >
                      {item.cardLabel}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        flexDirection: "column",
                        // marginLeft: "24px",
                        pb: "52px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "133px",
                          display: "flex",
                          justifyContent: "Center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            mt: "37px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {item.icon}
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
                      </Box>

                      <Box
                        sx={{
                          height: "100px",
                          mt: "24px",
                          mb: "39px ",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "6px",
                              // marginLeft: "12px",
                              fontSize: "54px",
                              fontWeight: "700",
                              color: "#222222",
                              // lineHeight: "66px",
                            }}
                          >
                            <span
                              style={{
                                textDecoration: "line-through",
                                fontSize: "30px",
                                fontWeight: "600",
                                lineHeight: "66px",
                                color: "#A6A7A6",
                              }}
                            >
                              {item.strikedPrice}
                            </span>
                            {item.price}
                            <span
                              style={{
                                fontSize: "42px",
                                fontWeight: "800",
                                color: "#170F49",
                              }}
                            >
                              {item.name}
                            </span>
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
                        <Box>{item.freeTrail}</Box>
                      </Box>

                      {item.outlinedButton && (
                        <GetStartedOutlinedButton
                          widthInput={"80%"}
                          heightInput={"52px"}
                          fontSize={"16px"}
                          fontWeight={"700"}
                          padding={"10px 24px"}
                          mt={"39px"}
                          mr={"0"}
                          functionName={item.function}
                          buttonName={item.outlinedButton}
                          sx={{
                            alignSelf: "center",
                            borderRadius: "10px",
                          }}
                        />
                      )}

                      {item.primaryButton && (
                        <GetStartedPrimaryButton
                          widthInput={"80%"}
                          heightInput={"52px"}
                          fontSize={"16px"}
                          fontWeight={"700"}
                          padding={"10px 24px"}
                          mt={"39px"}
                          mr={"0"}
                          functionName={item.function}
                          buttonName={item.primaryButton}
                          sx={{
                            alignSelf: "center",
                            borderRadius: "10px",
                            lineHeight: "20.5px",
                          }}
                        />
                      )}

                      <Box>
                        {item.features.map((feature) => {
                          return (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  fontSize: "18px",
                                  fontWeight: "700",
                                  color: "#222222",
                                  gap: "8px",
                                  mt: "43px",
                                  pl: "24px",
                                }}
                              >
                                {/* {feature.description} */}
                                {feature.keyfeature.map((key) => {
                                  return (
                                    <>
                                      <Typography
                                        sx={{
                                          display: "flex",
                                          fontSize: "16px",
                                          fontWeight: "500",
                                          color: "#170F49",
                                          lineHeight: "120%",
                                          paddingBottom: "12px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "10px",
                                          }}
                                        >
                                          {feature.tick}
                                        </span>
                                        {key}
                                      </Typography>
                                    </>
                                  );
                                })}
                              </Box>
                            </>
                          );
                        })}
                      </Box>
                    </Box>

                    {/* <OutlinedButton
                    sx={{
                      borderRadius: "10px",
                      alignSelf: "center",
                      // color: item.color,
                      // borderColor: item.color,
                      marginBottom: "24px",
                      width: "80%",
                    }}
                    onClick={() => {
                      // handleRoute(item.route);
                      item.function();
                    }}
                  >
                    {item.button}
                  </OutlinedButton> */}
                  </BaseCard>
                </Grid>
              </>
            );
          })}
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#4F44E0",
              }}
            >
              <Button
                sx={{
                  p: "0",
                }}
                onClick={() => {
                  handleCompareFeatures();
                }}
              >
                <Typography
                  sx={{
                    color: "#4F44E0",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Compare all features
                </Typography>
              </Button>
              <KeyboardArrowDownRoundedIcon />
            </Box>
          </Grid>
          {compareFeatures && (
            <Grid item xs={12} md={12} lg={12}>
              <PricingSubscriptionPage />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#4F44E0",
                }}
              >
                <Button
                  sx={{
                    p: "0",
                  }}
                  onClick={() => {
                    handleCompareFeatures();
                  }}
                >
                  <Typography
                    sx={{
                      color: "#4F44E0",
                      textTransform: "none",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    Hide all features
                  </Typography>
                </Button>
                <KeyboardArrowUpRoundedIcon />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* RouterTabs */}
      {/* <RouterTabs
        data={tabsDataPlan}
        basePath="/settings/plan-and-billing-details"
        tabContainerStyles={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      /> */}

      {/* Main section */}
      {/* <Grid container xs={12} md={12} lg={12} sx={{ px: "280px" }} rowGap={3}> */}
      {/* Buisness Plan */}
      {/* {Array.isArray(subscription) &&
          subscription.length > 0 &&
          subscription.map((item, index) => (
            <Grid item xs={12} md={12} lg={12} key={index}>
              <CurrentPlanCard subscription={item} />
            </Grid>
          ))} */}

      {/* <Grid item xs={12} md={12} lg={12}>
          <Grid
            container
            sx={{
              backgroundColor: "#F7F9FB",
              p: "30px",
              borderRadius: "20px",
            }}
          > */}
      {/* other plans and addons */}

      {/* <RouterTabs
        data={tabsDataOtherPlan}
        basePath="/settings/plan-and-billing-details"
        tabContainerStyles={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      /> */}

      {/* <Grid item xs={12} md={12} lg={12} sx={{ mt: "24px" }}>
              {planCards}
            </Grid> */}
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Grid> */}
    </Box>
  );
}

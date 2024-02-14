import React from "react";
import {
  Box,
  Typography,
  Grid,
  GridItem,
  Checkbox,
  Container,
} from "@mui/material";
import IosSwitch from "components/Common/Switches/IosSwitch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PricingSubscriptionPage from "./components/PricingSubscriptionPage";
import AnalyticsAndReportingPage from "./components/AnalyticsAndReportingPage";
import StarIcon from "components/Common/Icons/PricingPageIcons/StarIcon";
import StarIconPurple from "components/Common/Icons/PricingPageIcons/StarIconPurple";
import StarIconOrange from "components/Common/Icons/PricingPageIcons/StarIconOrange";
import MessageIcon from "components/Common/Icons/PricingPageIcons/MessageIcon";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import CheckIcon from "components/Common/Icons/PricingPageIcons/CheckIcon";
import BaseCard from "components/Common/Cards/BaseCard";
import ContactUs from "../ContactUsPageSections/ContactUsPageSection";
import { useRouter } from "next/router";
import ToggleMonthAndAnnualButton from "./components/ToggleMonthAndAnnualButton";
import StarIconBlue from "components/Common/Icons/PricingPageIcons/StarIconBlue";
import MostPopularCardLabel from "components/Common/Icons/PricingPageIcons/MostPopularCardLabel";
import BilledAndTrailComponent from "./components/BilledAndTrailComponent";
import QuestionIcon from "components/Common/Icons/PricingPageIcons/QuestionIcon";
import { GetStarted } from "components/Common/Buttons/GetStarted";
import { GetStartedOutlinedButton } from "./components/GetStartedOutlinedButton";
import EcomJourneyCard from "sections/BlogsPageSections/component/EcomJourneyCard";
import { GetStartedPrimaryButton } from "./components/GetStartedPrimaryButton";
import PrimaryOrOutlinedButton from "./components/PrimaryOrOutlinedButton";

export default function PricingPageSections() {
  const router = useRouter();
  const dataMonth = [
    {
      title: "Starter",
      color: "#01B8C3",
      icon: <StarIconBlue />,
      cardLabel: "",
      desc: "Perfect for individuals or new businesses.",
      price: "Free",
      outlinedButton: "Get Started",
      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
          keyfeature: ["1 Store Integration", "100 SKUs", "5 PO creation"],
        },
      ],
      function: () => {
        handleGetStartedforFree();
      },
    },
    {
      title: "Basic",
      color: "#078514",
      icon: <StarIcon />,
      cardLabel: <MostPopularCardLabel />,
      desc: "Perfect for individuals or new businesses.",
      price: "$169",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,
      primaryButton: "Get Started",
      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
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

      outlinedButton: "Get Started",
      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
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
      title: "Starter",
      color: "#01B8C3",
      icon: <StarIconBlue />,
      cardLabel: "",
      desc: "Perfect for individuals or new businesses.",
      price: "Free",
      outlinedButton: "Get Started",
      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
          keyfeature: ["1 Store Integration", "100 SKUs", "5 PO creation"],
        },
      ],
      function: () => {
        handleGetStartedforBasic();
      },
    },
    {
      title: "Basic",
      color: "#078514",
      icon: <StarIcon />,
      cardLabel: <MostPopularCardLabel />,
      desc: "Perfect for individuals or new businesses.",
      price: "$149",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,
      primaryButton: "Get Started",

      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
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
      price: "$349",
      pricePer: "/mo",
      helpIcon: <QuestionIcon />,

      outlinedButton: "Get Started",
      features: [
        {
          description: "Includes:",
          tick: <CheckIcon />,
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
      route: `/contact-us/enterprise`,
    },
  ];
  const [data, setData] = React.useState(dataAnnual);

  const handleRoute = (route) => {
    router.push(route);
  };

  const handleGetStartedforFree = () => {
    // router.push("/signup");
    window.open(`https://dev.bluecom.ai/auth/sign-up`, "_blank");
  };

  const handleGetStartedforBasic = () => {
    // router.push("/signup");
    window.open(`https://dev.bluecom.ai/auth/sign-up`, "_blank");
  };

  const handleGetStartedforPremium = () => {
    window.open(`https://dev.bluecom.ai/auth/sign-up`, "_blank");

    // router.push("/signup");
  };

  const handleGetStartedforEnterprise = () => {
    router.push("/contact-us/enterprise");
  };

  const [billPeriod, setBillPeriod] = React.useState("Annual");
  const handleToggle = (event, Period) => {
    if (Period !== null) {
      setBillPeriod(Period);
    }
    if (Period === "Annual") {
      setData(dataAnnual);
    } else if (Period === "Month") {
      setData(dataMonth);
    }
  };

  return (
    <Box>
      <Box sx={{ maxWidth: "1440px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "18px",
          }}
        >
          <Typography
            sx={{
              marginTop: "36px",
              fontSize: "52px",
              fontWeight: "800",
              color: "#151515",
              px: "150px",
              // fontFamily: "Manrope, sans-serif",
            }}
          >
            Powerful Features with Flexible Pricing Plan for Every Business
          </Typography>
          <ToggleMonthAndAnnualButton
            billPeriod={billPeriod}
            handleToggle={handleToggle}
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
          {data.map((item) => {
            return (
              <>
                <Grid item xs={2.8}>
                  <BaseCard
                    sx={{
                      backgroundColor: "#F8F8F8",
                      border: "1px solid #E5E5E5",
                      borderRadius: "30px",
                      height: "560px",
                      backgroundColor: "#FFFFFF",
                      // pt: "37px  ",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        marginLeft: "24px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "133px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ mt: "37px" }}>
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
                        {item.cardLabel}
                      </Box>

                      <Box sx={{ height: "100px", mt: "24px" }}>
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
                              {item.helpIcon}
                            </span>
                          </Typography>
                        </Box>
                        <Box>{item.freeTrail}</Box>
                      </Box>

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

                    {item.outlinedButton && (
                      <GetStartedOutlinedButton
                        widthInput={"80%"}
                        heightInput={"52px"}
                        fontSize={"16px"}
                        fontWeight={"700"}
                        padding={"10px 24px"}
                        mt={"0px"}
                        mr={"0"}
                        functionName={item.function}
                        buttonName={item.outlinedButton}
                        sx={{
                          alignSelf: "center",
                          borderRadius: "10px",
                          mb: "24px",
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
                        mt={"0px"}
                        mr={"0"}
                        functionName={item.function}
                        buttonName={item.primaryButton}
                        sx={{
                          alignSelf: "center",
                          borderRadius: "10px",
                          mb: "24px",
                          lineHeight: "20.5px",
                        }}
                      />
                    )}
                  </BaseCard>
                </Grid>
              </>
            );
          })}
        </Grid>

        <PricingSubscriptionPage />
      </Box>
      <EcomJourneyCard />
    </Box>

    // <Box>
    //   <Box sx={{ display: "flex", justifyContent: "space-around" }}>
    //     <Box>
    //       <Typography
    //         sx={{
    //           fontSize: "32px",
    //           fontWeight: "700",
    //           color: "#4A3AFF",
    //         }}
    //       >
    //         PRICING
    //       </Typography>
    //     </Box>
    //     <Box>
    //       <IosSwitch />
    //     </Box>
    //   </Box>

    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <Box>
    //       <Typography
    //         sx={{
    //           fontSize: "40px",
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //         }}
    //       >
    //         Simple, transparent pricing
    //       </Typography>
    //     </Box>
    //     <Box>
    //       <Typography
    //         sx={{
    //           backgroundColor: "#4A3AFF",
    //           fontSize: "18px",
    //           fontWeight: "700",
    //           color: "#FFFFFF",
    //           lineHeight: "20px",
    //           padding: "18px 44px",
    //           borderRadius: "96px",
    //         }}
    //       >
    //         Explore Features
    //       </Typography>
    //     </Box>
    //   </Box>

    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       gap: "10px",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         backgroundColor: " #F9F9FB",
    //         marginTop: "3rem",
    //         borderRadius: "5px",
    //         justifyContent: "flex-end",
    //         gap: "90px",
    //         width: "55%",
    //         alignItems: "center",
    //         paddingTop: "10px",
    //         paddingRight: "10px",
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //           fontWeight: 700,
    //           fontSize: "30px",
    //           lineHeight: "120%",
    //           color: "#000000",
    //         }}
    //       >
    //         Starter
    //       </Typography>
    //       <Typography
    //         sx={{
    //           fontSize: "30px",
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //           lineHeight: "120%",
    //           color: "#000000",
    //         }}
    //       >
    //         Business
    //       </Typography>
    //       <Typography
    //         sx={{
    //           fontSize: "30px",
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //           lineHeight: "120%",
    //           color: "#000000",
    //         }}
    //       >
    //         Enterprise
    //       </Typography>
    //     </Box>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         borderRadius: "5px",
    //         justifyContent: "flex-end",
    //         gap: "10px",
    //         width: "55%",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           marginRight: "3rem",
    //           fontSize: "40px",
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //         }}
    //       >
    //         $xxx{" "}
    //         <span
    //           style={{
    //             fontSize: "15px",
    //             opacity: "0.7",
    //             fontWeight: "500",
    //           }}
    //         >
    //           /monthly
    //         </span>
    //       </Typography>

    //       <Typography
    //         sx={{
    //           marginRight: "4rem",
    //           fontSize: "40px",
    //           fontWeight: "700",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //         }}
    //       >
    //         $xxx{" "}
    //         <span
    //           style={{
    //             fontSize: "15px",
    //             opacity: "0.7",
    //             fontWeight: "500",
    //           }}
    //         >
    //           /monthly
    //         </span>
    //       </Typography>

    //       <Typography
    //         sx={{
    //           marginRight: "3rem",
    //           fontSize: "15px",
    //           opacity: "0.7",
    //           fontWeight: "500",
    //           color: "#170F49",
    //           marginBottom: "1.2rem",
    //         }}
    //       >
    //         Contact US
    //       </Typography>
    //     </Box>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         backgroundColor: " #F9F9FB",
    //         borderRadius: "5px",
    //         justifyContent: "flex-end",
    //         alignItems: "center",
    //         width: "55%",
    //         gap: "110px",
    //         paddingTop: "20px",
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           opacity: "0.4",
    //           verticalAlign: "middle",
    //           fontWeight: "300",
    //         }}
    //       >
    //         <span>
    //           <HelpOutlineIcon fontSize="small" />
    //         </span>
    //       </Typography>

    //       <Typography
    //         sx={{
    //           marginRight: "0px",
    //           backgroundColor: "#4A3AFF",
    //           fontWeight: "600",
    //           lineHeight: "20px",
    //           fontSize: "15px",
    //           color: "#FFFFFF",
    //           marginBottom: "1.2rem",
    //           padding: "8px 20px",
    //           borderRadius: "96px",
    //         }}
    //       >
    //         {" "}
    //         Get started
    //       </Typography>

    //       <Typography
    //         sx={{
    //           backgroundColor: "#4A3AFF",
    //           color: "#FFFFFF",
    //           marginBottom: "1.2rem",
    //           fontWeight: "600",
    //           lineHeight: "20px",
    //           fontSize: "15px",
    //           padding: "8px 20px",
    //           borderRadius: "96px",
    //         }}
    //       >
    //         Get started
    //       </Typography>

    //       <Typography
    //         sx={{
    //           backgroundColor: "#4A3AFF",
    //           color: "#FFFFFF",
    //           marginBottom: "1.2rem",
    //           fontWeight: "600",
    //           lineHeight: "20px",
    //           fontSize: "15px",
    //           padding: "8px 20px",
    //           borderRadius: "96px",
    //         }}
    //       >
    //         Get started
    //       </Typography>
    //     </Box>
    //   </Box>

    //   <PricingSubscriptionPage />

    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       margin: "50px 0",
    //       color: "#4A3AFF",
    //     }}
    //   >
    //     <Typography
    //       sx={{
    //         fontSize: "32px",
    //         fontWeight: "700",
    //         lineHeight: "20px",
    //       }}
    //     >
    //       ADD ONS
    //     </Typography>
    //   </Box>

    //   <AnalyticsAndReportingPage />
    // </Box>
  );
}

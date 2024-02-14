import React from "react";
import {
  Box,
  Divider,
  styled,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusAsChipDashboard from "components/Common/Chip/StatusAsChipDashboard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import VerticalLinearStepper from "components/Common/StepperComponent/VerticalLinearStepperComponent";
import { useSelector } from "react-redux";

export default function TaskComponent({ card, index }) {
  const cardCheckIconStatus = useSelector(
    (state) => state.dashboardData.dashboard[`task${index + 1}`].status
  );
  const stepLength = card.steps.length;
  const completedSteps = useSelector(
    (state) =>
      Object.values(
        state.dashboardData.dashboard[`task${index + 1}`].steps
      ).filter((step) => step === "Completed").length
  );
  const progressValue = (completedSteps / stepLength) * 100;

  const stepsLeft = stepLength - completedSteps;

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#C4C4C4",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#099350",
    },
  }));
  return (
    <Box
      key={index}
      sx={{
        width: "100%",
        "& .MuiPaper-root ": {
          borderRadius: {
            xs: "10px",
            sm: "10px",
            md: "16px",
          },
          mb: {
            xs: "11px",
            sm: "11px",
            md: 2,
          },
        },
        "& .MuiPaper-root-MuiAccordion-root:first-of-type": {
          borderTopLeftRadius: "16px !important",
          borderTopRightRadius: "16px !important",
        },
        "& .MuiPaper-root-MuiAccordion-root:before": {
          display: "none",
        },
        // marginBottom: "2rem",
      }}
    >
      <Accordion
        sx={{
          boxShadow: "none",
          border: "1px solid rgba(0, 0, 0, 0.1)",

          // borderRadius: "16px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Onboarding to Bluecom.ai"
          sx={{
            pr: "16px",
            "& .MuiAccordionSummary-expandIconWrapper": {
              alignSelf: "flex-start",
              mt: {
                xs: "2rem",
                sm: "2rem",
                md: "3rem",
              },
              ml: "-0.7rem",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              p: {
                // xs: "11px",
                // sm: "11px",
                md: "24px",
              },
              borderRadius: "16px",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                flex: "0.7",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "17px",
                width: "100%",
              }}
            >
              <StatusAsChipDashboard
                status={cardCheckIconStatus}
                index={index + 1}
                marginTop={"0px"}
                step={card.step}
                fontSize={{
                  xs: "10px",
                  sm: "10px",
                  md: "16px",
                }}
                fontWeight={600}
                // paddingx={1}
                // paddingy={2}
                width={"fit-content"}
              />
              <DescriptionText
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                  },
                  fontSize: {
                    xs: "12px",
                    sm: "12px",
                    md: "14px",
                  },
                  fontWeight: "600",
                  color: "#313131",
                }}
              >
                {stepsLeft > 0 && `${stepsLeft} steps left`}
              </DescriptionText>
              {/* icon title description */}
              {/* <Box
                  sx={{
                    display: "flex",
                    //   alignItems: "flex-start",
                    //   justifyContent: "center",
                    gap: "14px",
                    width: "100%",
                    Height: "100%",
                  }}
                >
                  <Box sx={{ Height: "100%", pt: "4px" }}>
                    <WhiteCheckIcon />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <CardTitle sx={{ fontSize: "21px", fontWeight: "700" }}>
                      {card.title}
                    </CardTitle>
                    <DescriptionText
                      sx={{
                        color: "#313131",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      {card.description}
                    </DescriptionText>
                  </Box>
                </Box> */}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flex: "0.2",
                gap: "33px",
              }}
            >
              {/* <DescriptionText
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#313131",
                  }}
                >
                  {card.stepsLeft}
                </DescriptionText> */}
              <Box
                sx={{
                  display: "flex",
                  //   alignItems: "flex-start",
                  //   justifyContent: "center",
                  gap: {
                    xs: "6px",
                    sm: "6px",
                    md: "14px",
                  },
                  width: "100%",
                  Height: "100%",
                }}
              >
                <Box
                  sx={{
                    Height: "100%",
                    pt: {
                      xs: "0px",
                      sm: "0px",
                      md: "4px",
                    },
                  }}
                >
                  {/* <WhiteCheckIcon /> */}
                  <CheckCircleRoundedIcon
                    color={
                      cardCheckIconStatus === "Completed"
                        ? "success"
                        : cardCheckIconStatus === "In-Progress"
                        ? "warning"
                        : "disabled"
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <CardTitle
                    sx={{
                      fontSize: {
                        xs: "15px",
                        sm: "15px",
                        md: "21px",
                      },
                      fontWeight: "700",
                      lineHeight: "24px",
                    }}
                  >
                    {card.title}
                  </CardTitle>
                  <DescriptionText
                    sx={{
                      color: "#313131",
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "16px",
                      },
                      fontWeight: "400",
                    }}
                  >
                    {card.description}
                  </DescriptionText>

                  <DescriptionText
                    sx={{
                      display: { xs: "flex", sm: "flex", md: "none" },
                      flexDirection: "row",
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                      },
                      fontWeight: 500,
                      color: "#313131",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    {stepsLeft > 0 && `${stepsLeft} steps left`}
                    <BorderLinearProgress
                      variant="determinate"
                      value={progressValue}
                      sx={{
                        height: "5px",
                        borderRadius: "5px",
                        width: "100%",
                        // mt: "6px",
                        ml: "4px",
                      }}
                    />
                  </DescriptionText>
                </Box>
              </Box>
              <Box
                sx={{
                  width: {
                    md: "50%",
                  },
                }}
              >
                <BorderLinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{
                    height: "10px",
                    borderRadius: "5px",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <Divider sx={{ borderColor: "#0000004D" }} />
        <AccordionDetails>
          <VerticalLinearStepper
            steps={card.steps}
            task={`task${index + 1}`}
            stepLength={card.steps.length}
            status={cardCheckIconStatus}
            completedSteps={completedSteps}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

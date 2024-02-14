import React from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Container, styled } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import OutlinedButton from "../Buttons/OutlinedButton";
import { Check } from "@mui/icons-material";
import StepIcon from "../Icons/StepIcon";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  "& .QontoStepIcon-completedIcon": {
    // color: "#784af4",
    zIndex: 1,
    fontSize: 18,
    fill: theme.palette.primary.main,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckCircleIcon className="QontoStepIcon-completedIcon" />
      ) : (
        <StepIcon className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function StepperComponent({ steps }) {
  const router = useRouter();
  const routerStep = router.query.step;
  const activeStep = router.query.id && parseInt(router.query.id);

  return (
    <Box sx={{}}>
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,

          pb: 3,
        }}
      >
        <Container>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((step, index) => (
              <Step
                key={step.label}
                sx={{
                  "& svg .center-circle": {
                    fill: (theme) =>
                      step.step === routerStep && theme.palette.primary.main,
                  },
                  "& svg .end-circle": {
                    fill: (theme) => step.step === routerStep && "#d1e9ff",
                  },
                  "svg path": {
                    fill: (theme) => theme.palette.primary.main,
                  },
                  "& .Mui-completed ": {
                    color: (theme) =>
                      `${theme.palette.primary.main} !important`,
                    fontWeight: "600 !important",
                  },
                }}
              >
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: (theme) =>
                        step.step === routerStep
                          ? theme.palette.primary.main
                          : theme.palette.grey[500],
                      fontSize: "16px",
                      lineHeight: "19px",
                      fontWeight: step.step === routerStep ? "600" : 400,
                    },
                  }}
                >
                  {step.label}
                </StepLabel>{" "}
              </Step>
            ))}
          </Stepper>
        </Container>
      </Box>
    </Box>
  );
}

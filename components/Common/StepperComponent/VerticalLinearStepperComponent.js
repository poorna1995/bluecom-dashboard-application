import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WhiteCheckIcon from "../Icons/WhiteCheckIcon";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { updateDashboardSteps } from "redux/dashboard/dashboardSlice";

//function getStepIconProps({ active, completed }) {
// return {
//  style: { color: completed ? "#099350" : "#bdbdbd" },
// active,
//completed,
//};
//}

export default function VerticalLinearStepper({
  steps = [],
  task,
  stepLength,
  status,
  completedSteps,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(completedSteps);

  const handleNext = () => {
    const step = `step${activeStep + 1}`;
    const value = "Completed";
    const status = stepLength === activeStep + 1 ? "Completed" : "In-Progress";
    dispatch(updateDashboardSteps({ task, step, value, status }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        p: {
          xs: "10px 10px 10px 10px",
          sm: "10px 10px 10px 10px",
          md: "10px 60px 10px 60px",
        },
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={(props) => (
                <WhiteCheckIcon
                  {...props}
                  completed={
                    activeStep > index ||
                    status === "Completed" ||
                    index < completedSteps - 1
                  }
                />
              )}
              sx={
                {
                  // fontSize: "16px",
                  // fontWeight: "600"
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  ml: "12px",
                }}
              >
                <Box
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "18px",
                    },
                    fontWeight: "700",
                    display: "flex",
                    // flex: "1",
                    color: "#212121",
                    alignItems: "center",
                    // gap: "8px",
                  }}
                >
                  {step.label}
                  {/* <Typography
                    sx={{
                      color: "#4D45E6",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    ({step.remainingTime})
                  </Typography> */}
                </Box>
              </Box>
            </StepLabel>
            <StepContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    ml: "12px",
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "16px",
                    },
                    fontWeight: "400",
                    color: "#313131",
                  }}
                >
                  {step.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flex: "0.2",
                    justifyContent: "center",
                    alignItems: "center",
                    // gap: "16px",
                    // padding: "24px",
                    ml: {
                      xs: "8px",
                      sm: "8px",
                      md: "16px",
                    },
                  }}
                >
                  {/* <PrimaryButton onClick={handleNext}>
                    {step.button}
                  </PrimaryButton> */}
                  <PrimaryButton onClick={handleNext}>
                    {step.button}
                  </PrimaryButton>
                </Box>
              </Box>
              {/* <Box sx={{ mb: 2, ml: "12px" }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={activeStep === steps.length - 1}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}

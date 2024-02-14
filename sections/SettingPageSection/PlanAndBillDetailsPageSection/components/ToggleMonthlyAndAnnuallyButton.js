import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Typography } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: "10px",
      //   padding: "20px 25px",
      width: "122px",
      height: "50px",
      color: "#000000",
      backgroundColor: "#ffffff", // Specify the background color for inactive buttons
      "&.Mui-selected": {
        backgroundColor: "#4F44E0", // Specify the background color for the active button
        color: "#ffffff",
      },
    },
    "&:first-of-type": {
      borderRadius: "10px",
      //   padding: "20px 25px",
      width: "122px",
      height: "50px",
      fontSize: "18px",
      fontWeight: "700",
      // fontFamily: "Manrope, sans-serif",
      color: "#000000",
      backgroundColor: "#ffffff", // Specify the background color for inactive buttons
      "&.Mui-selected": {
        backgroundColor: "#4F44E0", // Specify the background color for the active button
        color: "#ffffff",
      },
    },
  },
}));

export default function ToggleMonthAndAnnualButton({
  billPeriod,
  handleToggle,
  ...props
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: "1px solid rgba(14, 11, 61, 0.1)",
        flexWrap: "wrap",
        borderRadius: "15px",
        padding: "4px",
        width: "fit-content",
        mx: "auto",
        mt: "37px",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={billPeriod}
        exclusive
        onChange={handleToggle}
        aria-label="text alignment"
      >
        <ToggleButton value="Month" aria-label="left aligned">
          <Box>
            <Typography
              sx={{
                textTransform: "none",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "30px",
                // fontFamily: "Manrope, sans-serif",
              }}
            >
              Monthly
            </Typography>
          </Box>
        </ToggleButton>
        <ToggleButton value="Annual" aria-label="centered">
          <Box>
            <Typography
              sx={{
                textTransform: "none",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "30px",
                // fontFamily: "Manrope, sans-serif",
              }}
            >
              Annually
            </Typography>
          </Box>
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}

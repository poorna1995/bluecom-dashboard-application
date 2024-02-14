import React from "react";
import {
  Box,
  Typography,
  Grid,
  GridItem,
  Checkbox,
  Container,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import QuestionIcon from "components/Common/Icons/PricingPageIcons/QuestionIcon";
import StarIcon from "components/Common/Icons/PricingPageIcons/StarIcon";
import StarIconOrnage from "components/Common/Icons/PricingPageIcons/StarIconOrange";
import StarIconPurple from "components/Common/Icons/PricingPageIcons/StarIconPurple";
import RedCrossIcon from "components/Common/Icons/PricingPageIcons/RedCrossIcon";
import CheckIconPurple from "./CheckIconPurple";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const PricingSubscriptionPage = () => {
  const HeadingData = [
    {
      cell1: "Plans",
      cell2: "Basic",
      subcell2: <StarIcon />,
      cell3: "Business",
      subcell3: <StarIconPurple />,
      cell4: "Enterprise",
      subcell4: <StarIconOrnage />,
      fontSize: "20px",
      fontWeight: "700",
      color1: "#078514",
      color2: "#4F44E0",
      color3: "#FF8C00",
    },
  ];
  const FeaturesData = [
    // PIM Features
    { cell1: "PIM Features", fontSize: "20px", fontWeightHeading: "700" },

    {
      cell1: "Product attributes",
      // subcell1: <QuestionIcon />,
      cell2: "Up to 1000 SKUs",
      cell3: "Up to 5000 SKUs",
      cell4: "Up to 10000 SKUs",
      bg: "#F9F9FB",
      fontSize: "18px",
      fontWeightHeading: "600",
      fontWeightOption: "400",
      marginLeft: "1rem",
    },
    {
      cell1: "Asset management ",
      // subcell1: <QuestionIcon />,
      cell2: <RedCrossIcon />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Retail Price  & Cost management",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
    {
      cell1: "Taxonomy & Variants",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Bundle Integration",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
    {
      cell1: "Supplier & Vendor managment",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Multi Channel View ",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
    // Multi Store Management

    {
      cell1: "Multi Store Management ",
      fontSize: "20px",
      fontWeightHeading: "700",
    },
    {
      cell1: "Link Multi-Channel Stores",
      // subcell1: <QuestionIcon />,
      cell2: "Up to 2 Stores",
      cell3: "Up to 5 Stores",
      cell4: "Static & animated",
      bg: "#F9F9FB",
      fontSize: "18px",
      fontWeightHeading: "600",
      fontWeightOption: "400",
      marginLeft: "1rem",
    },
    {
      cell1: "Publish Flow ",
      // subcell1: <QuestionIcon />,
      cell2: "Up to 1000 SKUs",
      cell3: "Up to 5000 SKUs",
      cell4: "Unlimited",
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Product Versioning ",
      // subcell1: <QuestionIcon />,
      cell2: <RedCrossIcon />,
      cell3: <CheckIconPurple />,
      cell4: "Static & animated",
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },

    // Inventory Management
    {
      cell1: "Inventory Management ",
      fontSize: "20px",
      fontWeightHeading: "700",
    },

    {
      cell1: "Multi Store Inventory Sync",
      // subcell1: <QuestionIcon />,
      cell2: "Up to 2 Stores",
      cell3: "Up to 5 Stores",
      cell4: "Static & animated",
      bg: "#F9F9FB",
      fontSize: "18px",
      fontWeightHeading: "600",
      fontWeightOption: "400",
      marginLeft: "1rem",
    },
    {
      cell1: "Publish inventory to multi-channel",
      // subcell1: <QuestionIcon />,
      cell2: "Up to 1000 SKUs",
      cell3: "Up to 5000 SKUs",
      cell4: "Unlimited",
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    // PO Management
    {
      cell1: "PO Management",
      fontSize: "20px",
      fontWeightHeading: "700",
    },
    {
      cell1: "PO Creation ",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: "PNG, JPEG, PDF, GIF, MP4",
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
    {
      cell1: "Exporting (PDF, CSV)",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: "Unlimited",
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Replenishment Features",
      // subcell1: <QuestionIcon />,
      cell2: <RedCrossIcon />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },

    // Vendor Management
    {
      cell1: "Vendor Managment",
      fontSize: "20px",
      fontWeightHeading: "700",
    },
    {
      cell1: "Create and Store Vendor Information",
      // subcell1: <QuestionIcon />,
      cell2: <CheckIconPurple />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
    {
      cell1: "Add Products ",
      // subcell1: <QuestionIcon />,
      cell2: <RedCrossIcon />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
    },
    {
      cell1: "Import & Export ( CSV, PDF)",
      // subcell1: <QuestionIcon />,
      cell2: <RedCrossIcon />,
      cell3: <CheckIconPurple />,
      cell4: <CheckIconPurple />,
      fontSize: "18px",
      fontWeightHeading: "600",
      marginLeft: "1rem",
      bg: "#F9F9FB",
    },
  ];
  const plans = HeadingData.map((cell, index) => {
    return (
      <>
        <Grid
          key={index}
          item
          lg={4}
          padding={2}
          style={{ background: cell.bg, color: "#151515" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,
              }}
            >
              {cell.cell1}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={2.5} padding={2} style={{ background: cell.bg }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell2}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,
                color: cell.color1,
              }}
            >
              {cell.cell2}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={2.5} padding={2} style={{ background: cell.bg }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell3}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,

                color: cell.color2,
              }}
            >
              {cell.cell3}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={2.5} padding={2} style={{ background: cell.bg }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell4}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,

                color: cell.color3,
              }}
            >
              {cell.cell4}
            </Typography>
          </Box>
        </Grid>
      </>
    );
  });
  const Features = FeaturesData.map((cell, index) => {
    return (
      <>
        <Grid
          key={index}
          item
          lg={4}
          padding={2}
          style={{
            background: cell.bg,
            color: "#151515",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeightHeading,
                marginLeft: cell.marginLeft,
              }}
            >
              {cell.cell1}
            </Typography>
            {cell.subcell1}
          </Box>
        </Grid>
        <Grid
          item
          lg={2.5}
          padding={2}
          style={{ background: cell.bg, color: "#151515" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell2}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,
                color: cell.color1,
              }}
            >
              {cell.cell2}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={2.5}
          padding={2}
          style={{ background: cell.bg, color: "#151515" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell3}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,

                color: cell.color2,
              }}
            >
              {cell.cell3}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={2.5}
          padding={2}
          style={{ background: cell.bg, color: "#151515" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {cell.subcell4}
            <Typography
              sx={{
                fontSize: cell.fontSize,
                fontWeight: cell.fontWeight,

                color: cell.color3,
              }}
            >
              {cell.cell4}
            </Typography>
          </Box>
        </Grid>
      </>
    );
  });

  return (
    <div>
      <SectionTitleText
        sx={{
          textAlign: "center",
          mt: "10px",
          fontFamily: "Manrope, sans-serif",
          color: "#4F44E0",
          fontSize: "36px",
          fontWeight: "800",
        }}
      >
        Compare Plans
      </SectionTitleText>
      <Grid container padding={5}>
        {plans}
        {Features}
        {/* <Grid item lg={12} padding={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#4F44E0",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              Hide Features
            </Typography>
            <ExpandLessIcon sx={{ fontSize: "2rem" }} />
          </Box>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default PricingSubscriptionPage;

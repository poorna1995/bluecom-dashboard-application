import { Box, Divider, Typography } from "@mui/material";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import AccordionBaseComponent from "./Components/AccordionBaseComponent";

export default function HomePageSections() {
  return (
    // container

    <Box
      sx={{
        p: {
          xs: 0,
          sm: 0,
          md: "3.0625rem",
        },
      }}
    >
      {/* heading section */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          pb: {
            xs: "1rem",
            sm: "1rem",
            md: "1.4375rem",
          },
          // pt: "3rem",
        }}
      >
        <SectionTitleText
          sx={{
            color: "#484A9E",
            fontSize: {
              xs: "24px",
              sm: "24px",
              md: "28px",
            },
            fontWeight: "700",
            lineHeight: "36px",
          }}
        >
          Welcome to Bluecom!
        </SectionTitleText>
        <DescriptionText
          sx={{
            color: "#313131",
            fontSize: {
              xs: "12px",
              sm: "12px",
              md: "16px",
            },
            fontWeight: "500",
            lineHeight: {
              xs: "18px",
              sm: "18px",
              md: "26px",
            },
          }}
        >
          Use this personalized guide to get your store up and running.
        </DescriptionText>
      </Box>

      <Divider
        sx={{
          display: {
            xs: "hidden",
            sm: "hidden",
            md: "block",
          },
          mb: {
            xs: "19px",
            sm: "19px",
            md: "38px",
          },
        }}
      />

      {/* Accordion section */}
      <AccordionBaseComponent />

      {/* <Box sx={{ p: "2.375rem" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="Onboarding to Bluecom.ai"
          >
            <Typography>Onboarding to Bluecom.ai</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box> */}
    </Box>
  );
}

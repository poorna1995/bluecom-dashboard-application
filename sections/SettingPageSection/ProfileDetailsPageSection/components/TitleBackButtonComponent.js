import { Box, IconButton } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import GoBack from "sections/SettingPageSection/PlanAndBillDetailsPageSection/components/GoBack";

export default function TitleBackButtonComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        // ml: "126px",
        // pb: "16px",
        pl: "16px",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* <GoBack /> */}
      <IconButton onClick={() => router.push(`/settings`)}>
        <MdArrowBack />
      </IconButton>

      <SectionTitleText
        sx={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#484A9E",
        }}
      >
        Profile Details
      </SectionTitleText>
    </Box>
  );
}

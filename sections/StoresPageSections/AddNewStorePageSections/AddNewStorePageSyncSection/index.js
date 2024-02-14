import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
import ShopifyStoreSyncCompleteSection from "./ShopifyStoreSyncCompleteSection";

export default function AddNewStorePageSyncSection() {
  const router = useRouter();
  const { channel } = router.query;
  const handleClickGoToStore = () => {
    router.push("/home");
  };
  // if (channel === "shopify") {
  return <ShopifyStoreSyncCompleteSection />;
  // }
  return (
    <Box
      sx={{
        pt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          // display: "flex",
          flexDirection: "flex-start",
        }}
      >
        <SectionTitleText
          sx={{
            fontSize: "32px",
            fontWeight: "700px",
            color: "#484A9E",
            pb: "8px",
          }}
        >
          Store Added Successfully
        </SectionTitleText>
        <DescriptionText
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#222222",
            pb: "26px",
          }}
        >
          Your {channel} store has been added to the account.
          <br /> Please wait while we sync the data
        </DescriptionText>

        {data.map((item, index) => {
          return (
            <Box key={index} sx={{ display: "flex", mt: 2 }}>
              <CheckCircle sx={{ color: "#0FA958", mr: 2 }} />
              <Typography
                sx={{
                  color: "#0FA958",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          backgroundColor: "white",
          bottom: "0",
          width: "1800px",
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          ml: "-150px",
        }}
      >
        <PrimaryButton
          onClick={handleClickGoToStore}
          sx={{
            width: "200px",
          }}
        >
          Go to Stores
        </PrimaryButton>
      </Box>
    </Box>
  );
}

const data = [
  { title: "User Details Synced" },
  { title: "Products Synced" },
  { title: "Inventory Synced" },
  { title: "Warehouses Synced" },
];

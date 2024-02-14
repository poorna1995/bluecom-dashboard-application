import { Box, Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import React from "react";

export default function MobileViewStoreCard({ data }) {
  console.log({ data }, "card");
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,0.1)",
        mt: 2,
      }}
    >
      <Typography
        sx={{
          color: "#505050",
          fontFamily: "Inter",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "18px",
        }}
      >
        Last Sync :{" "}
        <RenderDate
          date={data.last_synced}
          sx={{
            color: "#505050",
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "18px",
          }}
        />
      </Typography>
      <Box sx={{ my: 1 }}>
        {/* image */}
        <Typography
          sx={{
            fontSize: "18px",
            color: "#212121",
            fontSize: " 14px",
            fontWeight: 600,
            lineHeight: "17px",
            letterSpacing: "-0.28px",
            "& span": {
              color: "#46946D",
              fontSize: "10px",
              fontWeight: 600,
            },
            "& .error": {
              color: "#46946D",
            },
          }}
        >
          <AppLink
            href={`/app/stores/${data.store_id}`}
            sx={{
              fontSize: "18px",
              color: "#212121",
              fontSize: " 14px",
              fontWeight: 600,
              lineHeight: "17px",
              letterSpacing: "-0.28px",
            }}
          >
            {data.shop}
          </AppLink>
          {/* <br /> */}

          {data.status === "success" ? (
            <span> Connected</span>
          ) : (
            <span className="error"> Not Connected</span>
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            borderRadius: "10px",
            background: "#F5F5F5",
            p: "12px",
            color: "#000",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "17px",
            letterSpacing: "-0.24px",
          }}
        >
          Product Listings: {data.product_count}
        </Typography>
        {data.status === "success" && (
          <PrimaryButton onClick={() => window.open(data.store_url, "_blank")}>
            View store
          </PrimaryButton>
        )}{" "}
      </Box>
    </Box>
  );
}

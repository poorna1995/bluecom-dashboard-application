import { Box, Divider, Icon, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BulletIcon from "components/Common/Icons/BulletIcon";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import { useRouter } from "next/router";
import storecomplogo from "public/assets/storecomplogo.png";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import React, { useState } from "react";
import StoreViewIcon from "components/Common/Icons/StoreViewIcon";
import { format } from "date-fns";
import GotoArrow from "components/Common/Icons/StoreIcons/GotoArrow";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";

export default function AddedStoreCard({ title, data }) {
  const router = useRouter();

  const handleViewDetailsButton = () => {
    router.push(`/app/stores/${data.store_id}?tab=scope`);
  };
  const handleViewStoreButton = () => {
    window.open(data.store_url, "_blank");
  };

  const lastSyncedDate = (data.last_synced && new Date(data.last_synced)) ?? "";
  const formattedLastSyncedDate =
    lastSyncedDate && format(lastSyncedDate, " MMM dd, yyyy ");

  return (
    <BaseCard
      sx={{
        boxShadow: "none",
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        p: 2,
        // width: "390px",
        // marginRight: "20px",
        borderRadius: "12px",
        maxWidth: "100%",
      }}
    >
      <div>
        {" "}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "17px",
            color: "#313D4E",
            pb: 2,
          }}
        >
          Last Sync:
          {/* <span style={{ fontWeight: 500 }}>
            {formattedLastSyncedDate ?? ""}
          </span> */}
          <RenderDate
            date={lastSyncedDate}
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              ml: 1,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
        </Typography>
      </div>
      <Box sx={{}}>
        <Box sx={{ display: "flex" }}>
          <AppImage src={storecomplogo} />

          <Box sx={{ ml: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "19px",
                lineHeight: "23px",
                marginTop: "5px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mb: 1,
              }}
            >
              <BulletIcon />
              <Typography
                sx={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: " 15px",
                  color: "#12B76A",
                  // mb: 1,
                  marginLeft: "5px",
                  my: 2,
                }}
              >
                {/* {data.status} */}
                Connected
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <div>
          {" "}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "17px",
              color: "#313D4E",
              // my: 2,
            }}
          >
            Last Sync:
            <span style={{ fontWeight: 500 }}>
              {formattedLastSyncedDate ?? ""}
            </span>
          </Typography>
        </div> */}
      </Box>
      <Box
        sx={{
          display: "flex",

          mt: 2,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: " 20px",
            backgroundColor: (theme) => theme.palette.grey[100],
            width: "155px",
            // height: "90px",
            padding: "20px",
            marginRight: "20px",
            borderRadius: "10px",

            color: (theme) => theme.palette.grey[700],
            "& span": {
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
              marginBottom: "10px",
            },
            flex: 1,
          }}
        >
          Product Listings
          <br />
          <span>{data.product_count}</span>
        </Typography>

        {/* <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: " 20px",
            color: (theme) => theme.palette.grey[700],
            backgroundColor: (theme) => theme.palette.grey[100],
            padding: "20px",
            width: "155px",
            borderRadius: "10px",

            "& span": {
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
              marginBottom: "10px",
            },
          }}
        >
          Drafts
          <br />
          <span>{data.draft || "-"}</span>
        </Typography> */}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <OutlinedButton
          sx={{
            ml: 1,
            fontSize: "14px",
            fontWeight: "500px",
            color: "#4F37ED",
            border: "none",
            backgroundColor: "#EDECFC",
            // hover effect on button
            "&:hover": {
              backgroundColor: "#EDECFC",
              border: "1px solid #4F37ED",
            },
          }}
          startIcon={<GotoArrow />}
          onClick={() => handleViewStoreButton()}
        >
          View Store
        </OutlinedButton>
        <OutlinedButton
          sx={{
            ml: 1,
            borderColor: (theme) => theme.palette.grey[200],
            color: (theme) => theme.palette.grey[700],
            fontSize: "14px",
            fontWeight: "500px",
          }}
          // startIcon={<StoreViewIcon />}
          onClick={() => handleViewDetailsButton()}
        >
          Store Detail
        </OutlinedButton>
      </Box>
    </BaseCard>
  );
}
// https://ecommerce-dashboard-app.vercel.app/auth/shopify-auth-callback?code=a6b682a248dc1e71d380f5948534afe8&hmac=effdb561d5f77e9acd3acddf9e99c9a2799aba06e6c74262d9e73d76a263a855&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvaGl2ZXBhdGgtdGVzdC1zdG9yZQ&shop=hivepath-test-store.myshopify.com&timestamp=1677763001

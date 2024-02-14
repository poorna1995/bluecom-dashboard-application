import { Box, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";

import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";

import React from "react";
import AddedStoreCard from "./AddedStoreCard";

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AddedChannelStoresListSection({ channelName, data }) {
  console.log({ channelName, data });
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          px: 2,
          mt: 1,
        }}
      >
        {
          channelName === "shopify" ? (
            <AppImage
              src="/assets/ShopifyImage.png"
              width={26}
              height={26}
              alt="shopify"
            />
          ) : channelName === "woocommerce" ? (
            // <ShopifyIcon/>
            <AppImage
              src="/assets/WooComImage.png"
              width={45}
              height={26}
              alt="woo commerce"
            />
          ) : (
            <AppImage
              src="/assets/icons/bigcommerceIcon.png"
              width={35}
              height={35}
              alt="bigcommerce"
            />
          )
          // <WooCommerceIcon/>
        }

        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "20px",
            lineHeight: "22px",
            marginLeft: "12px",
            fontStyle: "Italic",
          }}
        >
          {capitaliseFirstLetter(channelName)}
        </Typography>
        <Divider sx={{ flex: 1, ml: 2 }} />
      </Box>
      <Grid container spacing={3} sx={{ mt: 1, px: 2 }}>
        {Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <Grid item key={index} xs={12} md={4} sm={6}>
                <AddedStoreCard title={item.shop} data={item} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

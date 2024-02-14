import { Avatar, Box, Typography } from "@mui/material";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import React from "react";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

export default function MobileViewInventoryLocationsCard({ data }) {
  const channelDetails = {
    channel_id: data.channel_id,
    shop: data.shop,
    store_id: data.store_id,
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          px: 2,
          pt: 2,
        }}
      >
        <Typography
          sx={{
            flex: 1,
            color: "#212121",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "17px",
            letterSpacing: "-0.28px",
          }}
        >
          {data.shop}
        </Typography>
        <ChannelGroups channelDetails={[channelDetails]} />
      </Box>
      <Box
        sx={{
          py: 2,
          borderBottom: "1px solid rgba(17, 17, 17, 0.10)",
          display: "flex",
          px: 2,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            mr: "10px",
            // backgroundColor: randomColor(),
          }}
        >
          {data["wh_name"].charAt(0)}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              // color: (theme) => theme.palette.text.primary,
              color: "#212121",
              lineHeight: "17px",
              letterSpacing: " -0.32px",
              mb: 1,
            }}
          >
            {data["wh_name"]}
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              color: "#616161",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              lineHeight: "16px",
            }}
          >
            {getFormattedNumber(data.available || 0)} Qty in {data.items_count}{" "}
            variants
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * {
    "available": 250,
    "channel_id": 4,
    "items_count": 1,
    "shop": "143.244.133.144/wordpress",
    "store_id": "418382994072378257",
    "wh_id": "139092214916112311",
    "wh_name": "Default Woocommerce Warehouse",
    "Warehouse": "Default Woocommerce Warehouse",
    "# Items": "1 Variants"
}
 */

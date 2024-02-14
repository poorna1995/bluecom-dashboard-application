import { Box } from "@mui/material";
import AnimatedLoaderSync from "components/Common/Animations/AnimatedLoaderSync/AnimatedLoaderSync";
import AppImage from "components/Common/AppImage";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import React from "react";
import bluecomLogo from "public/assets/icons/bluecom-square.png";
import { channelIconsList } from "sections/StoresPageSections/components/AddStoreSelectChannelComponent";

export default function ChannelToBluecom({ channel }) {
  const channelData = channelIconsList.find((item) => item.key === channel);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: 2,
        mb: 4,
        "& .icon-container": {
          borderRadius: "8px",
          border: "1px solid #E5E5E5",
          p: 1,
          width: "66px",
          height: "66px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        "& .relative": {
          position: "relative",
        },
        "& .image-connector": {
          position: "absolute",
          right: "40%",
          top: "-4px",
        },
      }}
    >
      <div className="icon-container">
        {/* <ShopifyIcon /> */}
        {channelData.icon}
      </div>
      <div className="divider relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="162"
          height="2"
          viewBox="0 0 162 2"
          fill="none"
        >
          <path
            d="M0.5 1H161.5"
            stroke="#4F44E0"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        </svg>
        {/* <AppImage
						src={arrowConnector}
						width={40}
						height={40}
						className="image-connector"
					/> */}
        <AnimatedLoaderSync className="image-connector" />
      </div>

      <div className="icon-container">
        <AppImage src={bluecomLogo} width={40} height={40} />
      </div>
    </Box>
  );
}

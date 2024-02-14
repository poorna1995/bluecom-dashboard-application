import { Tooltip } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import Shopify from "public/assets/icons/shopifyListIcon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import Woocommerce from "public/assets/icons/woocommerceListIcon.png";
function RenderChannelAsIcon({ value, channelList }) {
  let iconImage;
  switch (value) {
    case "shopify":
      iconImage = Shopify;
      break;
    case "native":
      iconImage = Unlisted;
      break;

    case "woocommerce":
      iconImage = Woocommerce;
      break;

    default:
      iconImage = Unlisted;
      break;
  }
  // const storeNames = channelList.map((item) => item.store_name);
  return (
    <div>
      <div>
        {value === "native" ? (
          <Tooltip title="unlisted">
            <span>
              <AppImage
                src={iconImage}
                sx={{
                  borderRadius: "100%",
                  border: "1px solid rgb(208, 213, 221)",
                }}
                width="40"
                height="40"
              />
            </span>
          </Tooltip>
        ) : (
          <Tooltip
            title={
              <>
                {`${value}  `}
                {/* {storeNames.map((it, id) => (
									<span
										key={id}
										style={{
											color: "yellow",
										}}
									>
										{it}
									</span>
								))} */}
              </>
            }
          >
            <span>
              <AppImage
                src={iconImage}
                sx={{
                  borderRadius: "100%",
                  border: "1px solid rgb(208, 213, 221)",
                }}
                width="40"
                height="40"
              />
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default RenderChannelAsIcon;

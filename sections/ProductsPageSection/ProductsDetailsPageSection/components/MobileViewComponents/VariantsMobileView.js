import React from "react";

import AppLink from "components/Common/AppLink";
import { Box, Button, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import { useDispatch } from "react-redux";
import { setInventoryMobileViewDrawerStatus } from "redux/views/viewsSlice";
import INVENTORY_DRAWER_STATUS from "constants/status/inventoryDrawerStatus";
import INVENTORY_DRAWER_TYPE from "constants/status/inventoryDrawerType";
import { enqueueSnackbar } from "notistack";

const styles = {
  actionStyles: {
    color: "#616161",
    // fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "17px",
    letterSpacing: "-0.24px",
    textTransform: "initial",
  },
  imageStyles: {
    width: "36px",
    height: "36px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #E0E0E0",
  },
};

export default function VariantsMobileView({ tableData = [] }) {
  console.log({ tableData });

  const dispatch = useDispatch();
  const handleClickVariantsButton = ({ type, list = [] }) => {
    if (Array.isArray(list) && list.length === 0) {
      return enqueueSnackbar("No result found!", { variant: "error" });
    }

    if (Array.isArray(list) && list.length > 0) {
      return dispatch(
        setInventoryMobileViewDrawerStatus({
          status: INVENTORY_DRAWER_STATUS.OPEN,
          type: type,
          product_id: tableData.master_item_id,
          data: list,
        })
      );
    }
  };

  return (
    <>
      {Array.isArray(tableData) &&
        tableData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              py: 2,
              // flex: 1,
              alignItems: "center",
              borderBottom: `1px solid rgba(17, 17, 17, 0.10)`,
            }}
          >
            <Box sx={{ minWidth: "36px" }}>
              <AppImage
                src={item.display_image}
                sx={{
                  ...styles.imageStyles,
                }}
                width={36}
                height={36}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                ml: 1,
                mr: 1,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: (theme) => theme.palette.text.primary,
                  // fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {Array.isArray(item.options) &&
                  item.options.map((option, index) => option.value).join(" / ")}
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#616161",
                }}
              >
                SKU: {item.product_sku}
              </Typography>
              <Typography
                sx={{
                  color: "#616161",
                  // fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {/* {item.tableData.length || 0} inventory */}
                {console.log({ item: item.inventory })}
                {item.inventory.reduce((acc, item) => {
                  return acc + item.available;
                }, 0)}{" "}
                inventory
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              $ {item.unit_retail_price}
            </Typography>
          </Box>
        ))}
    </>
  );
}

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
  >
    <path
      d="M1.18334 0.000164615L7.85001 6.66683L1.18334 13.3335L6.09543e-06 12.1502L5.48334 6.66683L5.1367e-06 1.1835L1.18334 0.000164615Z"
      fill="#595959"
    />
  </svg>
);

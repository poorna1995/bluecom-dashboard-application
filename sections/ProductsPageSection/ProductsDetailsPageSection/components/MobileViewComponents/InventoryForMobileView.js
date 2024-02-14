import AppLink from "components/Common/AppLink";
import React from "react";
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
    fontFamily: "Inter",
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

export default function InventoryForMobileView({ tableList = [] }) {
  console.log({ tableList });
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
          product_id: tableList.master_item_id,
          data: list,
        })
      );
    }
  };

  return (
    <>
      {Array.isArray(tableList) &&
        tableList.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              py: 2,
              flex: 1,
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
            <Box sx={{ ml: 1, flex: 1, mr: 1 }}>
              <Box sx={{ display: "flex", flex: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <AppLink
                    href={`/app/products/${item.master_product_id}?tab=overview`}
                    sx={{
                      color: "#212121",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px" /* 121.429% */,
                      letterSpacing: " -0.28px",
                      // mb: 1,
                    }}
                    title={item.product_title}
                  >
                    {item.product_title}
                  </AppLink>

                  <Typography
                    sx={{
                      color: "#616161",
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px" /* 166.667% */,
                      letterSpacing: " -0.24px",
                      mt: 1,
                    }}
                  >
                    {item.total} inventory . {item.inventory.length || 0}{" "}
                    Locations
                  </Typography>
                </Box>
                <Box>
                  {/* <ChannelGroups channelDetails={item.channels || []} />
                   */}

                  <Button
                    sx={{
                      ...styles.actionStyles,
                    }}
                    endIcon={<MoreIcon />}
                    onClick={() =>
                      handleClickVariantsButton({
                        type: INVENTORY_DRAWER_TYPE.LOCATIONS,
                        list: item.inventory,
                      })
                    }
                  >
                    {/* {item.warehouse_count} Locations */}
                  </Button>
                </Box>
              </Box>
            </Box>
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

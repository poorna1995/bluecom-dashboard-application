import { Box, Button, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import INVENTORY_DRAWER_STATUS from "constants/status/inventoryDrawerStatus";
import INVENTORY_DRAWER_TYPE from "constants/status/inventoryDrawerType";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { setInventoryMobileViewDrawerStatus } from "redux/views/viewsSlice";

const styles = {
  actionStyles: {
    color: "#616161",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "17px" /* 141.667% */,
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

export default function MobileViewInventoryCard({ data }) {
  // console.log({ data });
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
          product_id: data.master_product_id,
          data: list,
        })
      );
    }
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          py: 2,
          flex: 1,
          borderBottom: `1px solid rgba(17, 17, 17, 0.10)`,
        }}
      >
        <Box sx={{ minWidth: "36px" }}>
          <AppImage
            src={data.display_image}
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
                href={`/app/products/${data.master_product_id}?tab=overview`}
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
                title={data.product_title}
              >
                {data.product_title}
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
                {data.available} inventory for {data.items_count} variants
              </Typography>
            </Box>
            <Box>
              <ChannelGroups
                // channels={params.value}
                channelDetails={data.channels || []}
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& span": {
                  ...styles.actionStyles,
                },
              }}
            >
              <span># Locations</span>{" "}
              <Button
                sx={{
                  ...styles.actionStyles,
                }}
                endIcon={<MoreIcon />}
                onClick={() =>
                  handleClickVariantsButton({
                    type: INVENTORY_DRAWER_TYPE.LOCATIONS,
                    list: data.warehouse,
                  })
                }
              >
                {data.warehouse_count} Locations
              </Button>
            </Box>
            <Box
              sx={{
                ...styles.actionStyles,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span># Variants </span>
              <Button
                sx={{
                  ...styles.actionStyles,
                }}
                endIcon={<MoreIcon />}
                onClick={() =>
                  handleClickVariantsButton({
                    type: INVENTORY_DRAWER_TYPE.VARIANTS,
                    list: data.items,
                  })
                }
              >
                {data.items_count} Variants
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
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

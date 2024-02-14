import { Box, Button, Grid } from "@mui/material";
import TagPurpleIcon from "components/Common/Icons/TagPurpleIcon";
import RenderHTML from "components/Common/Typography/RenderHTML";
import React, { useState } from "react";
import EmptyState from "components/Common/EmptyState";
import TagEmptyStateIcon from "components/Common/Icons/TagEmptyStateIcon";
import InventoryIcon from "components/Common/Icons/InventoryIcon";
import InventoryEmptyStateIcon from "components/Common/Icons/InventoryEmptyStateIcon";
// import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
// import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import BundleOverviewCard from "./BundleOverviewCard";

import dynamic from "next/dynamic";
import InventoryES from "components/Common/Icons/EmptyStates/InventoryES";
import ChannelES from "components/Common/Icons/EmptyStates/ChannelES";
import DescriptionES from "components/Common/Icons/EmptyStates/DescriptionES";
const MuiBaseTable = dynamic(() =>
  import("components/Common/Tables/MuiBaseTable")
);
const MuiBaseDataGrid = dynamic(() =>
  import("components/Common/Tables/MuiBaseDataGrid")
);
export default function BundleOverviewSection({
  data,
  inventoryDat,
  itemData,
  columnForChannel,
  channelsData,
}) {
  const [showMore, setShowMore] = useState(false);
  const handleClickShowMoreButton = () => {
    setShowMore(() => !showMore);
  };
  // trim the description if it is more than 200 characters
  const trimDescription = (description = "") => {
    if (description.length > 500 && !showMore) {
      return description.substring(0, 500) + "...";
    }
    return description;
  };

  const getDescriptionLength =
    data.product_desc && data.product_desc.length > 500;
  return (
    <>
      <Box
      // sx={{
      // 	display: "flex",
      // 	flexDirection: "row",
      // 	justifyContent: "space-between",
      // }}
      >
        <Grid container spacing={2}>
          {/* product details */}
          <Grid item xs={12} md={4}>
            <BundleOverviewCard
              logo={<TagPurpleIcon />}
              title="Bundle Details"
              tab="bundle-details"
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px ",
              }}
            >
              {(data.product_desc && data.product_desc.length === 0) ||
              data.product_desc === "<p></p>" ||
              data.product_desc === "<p></p>\n" ||
              data.product_desc === "" ? (
                <EmptyState
                  icon={<DescriptionES />}
                  // icon={<InventoryES />}
                  text={"Add Product Details"}
                  bodyText={"Description of the Product is Unavailable"}
                />
              ) : (
                <RenderHTML
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: (theme) => theme.palette.text.primary,
                    px: 2,
                    pb: 2,
                  }}
                  content={
                    showMore === true
                      ? data.product_desc
                      : trimDescription(data.product_desc)
                  }
                />
              )}

              {/* {data.product_desc && data.product_desc.length === 0 && (
                <EmptyState
                  icon={<TagEmptyStateIcon />}
                  title={"Add Product Details"}
                  text={"Description of the Product is Unavailable"}
                  buttonText={"Add Product Details"}
                />
              )}
                
              <RenderHTML
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: (theme) => theme.palette.text.primary,
                  px: 2,
                  pb: 2,
                }}
                content={
                  showMore === true
                    ? data.product_desc
                    : trimDescription(data.product_desc)
                }
              /> */}
              {/* {getDescriptionLength ? (
                <Button
                  onClick={() => handleClickShowMoreButton()}
                  sx={{
                    textTransform: "none",
                    ml: 2,
                    mt: 0,
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {showMore === true ? "Show less" : "Show more"}
                </Button>
              ) : null} */}
            </BundleOverviewCard>
          </Grid>
          {/* inventory */}

          <Grid item xs={12} md={4}>
            <BundleOverviewCard
              icon={<InventoryIcon />}
              title={`Inventory`}
              tab={inventoryDat.length && "inventory"}
            >
              {inventoryDat.length === 0 && (
                <EmptyState
                  icon={<InventoryES />}
                  text={"No Inventory Found"}
                  bodyText={`Add Inventory to the Bundle`}
                />
              )}
              {Array.isArray(inventoryDat) && (
                <MuiBaseTable newData={inventoryDat} />
              )}
            </BundleOverviewCard>
          </Grid>
          {/* channel  */}
          <Grid item xs={12} md={4}>
            <BundleOverviewCard
              icon={<InventoryIcon />}
              title={`Channel`}
              tab={channelsData.length && "stores"}
            >
              {/* {Array.isArray(itemData) && (
                          <MuiBaseTable
                              newData={itemData}
                              baseCardStyles={{
                                  boxShadow: "none",
                                  // border: "1px solid rgba(0,0,0,0.2)",
                              }}
                          />
                      )} */}
              {channelsData.length === 0 && (
                <EmptyState
                  icon={<ChannelES />}
                  text={"No Channels Found"}
                  bodyText={`You have not published this product`}
                />
              )}
              {channelsData.length > 0 && (
                <MuiBaseDataGrid
                  sx={{ borderBottom: "none" }}
                  rowHeight={55}
                  data={channelsData}
                  rowIdkey={"Channel Id"}
                  columnDefData={columnForChannel}
                  containerStyles={{
                    height: "250px",
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "#F9FAFB",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: "700",

                      // fontSize:"16px"
                    },

                    "& .MuiDataGrid-cell": {
                      fontSize: "14px",
                      fontWeight: "500",
                      borderBottom: "none !important",
                    },
                  }}
                  hideFooter
                  checkboxSelection={false}
                />
              )}
            </BundleOverviewCard>
          </Grid>
          {/* variant/item */}
        </Grid>
      </Box>
    </>
  );
}

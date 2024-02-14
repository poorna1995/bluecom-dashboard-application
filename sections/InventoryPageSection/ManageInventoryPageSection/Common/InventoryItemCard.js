import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";
import InventoryItemRow from "./InventoryItemRow";
import lodash from "lodash";
import InventoryItemRow1 from "./InventoryItemRow1";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { Box } from "@mui/system";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import TextInput from "components/Common/Inputs/TextInput";
import { useSelector } from "react-redux";
// mapstate from redux store for currentUser
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const headingStyle = {
  fontSize: "16px",
  fontWeight: 600,
};

export default function InventoryItemCard({ productId, data = [] }) {
  // console.log({ data });
  const { currentUser } = useSelector(mapState);
  const getAllItemsSum = lodash.sumBy(data, "available");
  const mappedData = data.map((item, index) => {
    return {
      ...item,
      uniqID: index + 1,
      wh_name: "warehouse 1",
      itemId: "XL/Black",
      sku: "Tshirt_XL_Black",
      qtyAvailable: 5000,
    };
  });
  const [updateUnit, setUpdateUnit] = useState(0);

  //   const setUpdateUnit = () => {};

  const columnsData = [
    // {
    //   field: "id",
    //   headerName: "Id",
    //   flex: 1,
    // },
    {
      field: "itemId",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "sku",
      headerName: "Item SKU",
      flex: 1,
    },
    {
      field: "wh_name",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "qtyAvailable",
      headerName: "QTY Available",
      flex: 1,
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      flex: 1,
      renderCell: (params) => (
        <TextInput
          placeholder="Update Quantity"
          containerStyles={{
            width: "100%",
            marginTop: "0px",
          }}
          inputStyles={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          // value={params.value}
          // onChange={(e) => setUpdateUnit(e.target.value)}
        />
      ),
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
    },
  ];

  return (
    <BaseCard sx={{ padding: "0px", marginTop: "16px" }}>
      <Accordion
        sx={{
          boxShadow: "none",
          padding: 0,
        }}
      >
        <AccordionSummary
          id={productId}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AppImage
            src={data[0].display_image || data[0].display_image}
            width="50"
            height="50"
          />
          {/* <SectionTitleText sx={{ mx: "16px" }}>
            product ID: {productId}
          </SectionTitleText>
          <SectionTitleText>
            Quantity available:{getAllItemsSum}
          </SectionTitleText> */}
          <Box sx={{ display: "block" }}>
            <DescriptionText
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: 2,
              }}
            >
              Oversized printed T-shirt
            </DescriptionText>

            <DescriptionText
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Total Quantity Available : 5000
            </DescriptionText>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography sx={headingStyle}> Item Id</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={headingStyle}> Item Desc</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={headingStyle}> Warehouse</Typography>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <Typography sx={headingStyle}> Qty Available</Typography>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <Typography sx={headingStyle}> Update</Typography>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <Typography sx={headingStyle}> Reason</Typography>
            </Grid>
          </Grid> */}
          {/* {data.map((item, index) => (
            <InventoryItemRow1
              key={index}
              itemId={item.inventory_item_id}
              itemDesc={item.item_desc}
              qtyAvailable={item.available}
              warehouse={item.wh_name}
              wh_id={item.wh_id}
            />
          ))} */}
          <MuiBaseDataGrid
            data={mappedData}
            columns={columnsData}
            rowIdkey="uniqID"
            checkboxSelection={false}
          />
        </AccordionDetails>
      </Accordion>
    </BaseCard>
  );
}
/**
 * {
    "available": 1007,
    "barcode": "",
    "channel_id": 1,
    "display_image": "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6.webp?v=1674642278",
    "images":
    "inventory_item_id": "46368270287130",
    "item_desc": "",
    "item_title": "Default Title",
    "live_date": "2023-01-09T05:27:26-05:00",
    "master_item_id": "44320351355162",
    "master_product_id": "8071078904090",
    "product_desc": "",
    "product_title": "90s Baggy High Jeans",
    "status": "draft",
    "unit_retail_price": 2500,
    "user_id": "138944605333795140",
    "wh_name": "Delhi Cantonment"
}
 */

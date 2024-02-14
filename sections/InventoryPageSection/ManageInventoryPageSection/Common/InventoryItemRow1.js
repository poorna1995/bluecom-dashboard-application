import { Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { INVENTORY } from "constants/API_URL";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  user,
});
export default function InventoryItemRow1({
  itemId,
  itemDesc,
  qtyAvailable,
  warehouse,
  wh_id,
}) {
  const { user } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();

  const connectedApps = user.connectedApps;
  const currentUser = user.currentUser;

  const shopifyStores =
    Array.isArray(connectedApps) &&
    connectedApps.filter((it) => it.channel_name === "shopify");
  const shop =
    Array.isArray(shopifyStores) && shopifyStores[0] && shopifyStores[0].shop;
  // console.log({ shopifyStore });
  const [updateUnit, setUpdateUnit] = useState(0);
  const [selectReason, setSelectReason] = useState("");

  const handleUpdateQuantity = () => {
    const url = INVENTORY.QUANTITY_ADJUST;
    const data = {
      shop: shop,
      user_id: currentUser.merchant_id,
      inventory_item_id: itemId,
      wh_id: wh_id,
      quantity: updateUnit,
    };
    appFetch(url, data).then((json) => {
      console.log(json);
      enqueueSnackbar(json.message);
      setUpdateUnit(0);
    });
  };

  const tableData = [
    {
      id: 1,
      itemId: itemId,
      itemDesc: itemDesc,
      warehouse: warehouse,
      qtyAvailable: qtyAvailable,
      update: "Update",
      reason: "Reason",
    },
  ];

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
      field: "itemDesc",
      headerName: "Item SKU",
      flex: 1,
    },
    {
      field: "warehouse",
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
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
    },
  ];

  return (
    <>
      <MuiBaseDataGrid
        rowIdkey={"id"}
        data={tableData}
        columns={columnsData}
        checkboxSelection={false}
      />

      {/* <Grid
        container
        sx={{ alignItems: "center", display: "flex" }}
        spacing={3}
      >
        <Grid item xs={2}>
          {itemId}
        </Grid>
        <Grid item xs={2}>
          {itemDesc}
        </Grid>

        <Grid item xs={2}>
          {warehouse}
        </Grid>
        <Grid item xs={2}>
          {qtyAvailable}
        </Grid>
        <Grid item xs={2}>
          <TextInput
            containerStyles={{ marginTop: 24 }}
            label="Update Quantity"
            value={updateUnit}
            type
            onChange={(e) => setUpdateUnit(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <MuiSelectInput
            label={"Reason "}
            options={[
              {
                label: "Sales",
                value: "Sales",
              },
              {
                label: "New Received",
                value: "New Received",
              },
              {
                label: "Damage",
                value: "Damage",
              },
            ]}
          />
        </Grid>
        {updateUnit && (
          <Grid item xs={2}>
            <PrimaryButton onClick={() => handleUpdateQuantity()}>
              Update
            </PrimaryButton>
          </Grid>
        )}
      </Grid> */}
    </>
  );
}

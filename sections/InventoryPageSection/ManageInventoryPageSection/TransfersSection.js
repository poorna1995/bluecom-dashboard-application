import { Divider, Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";
import InventoryFilterSection from "./Common/InventoryFilterSection";
import InventoryItemsListSection from "./Common/InventoryItemsListSection";

export default function TransfersSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <InventoryFilterSection />
      <Divider sx={{ marginTop: "16px" }} />
      <SectionTitleText sx={{ fontSize: "24px", marginTop: "16px" }}>
        Create a transfer
      </SectionTitleText>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <MuiSelectInput
            label={"From Warehouse"}
            options={[
              { label: "Warehouse 1", value: "warehouse1" },
              { label: "Warehouse 2", value: "warehouse2" },
              { label: "Warehouse 3", value: "warehouse3" },
            ]}
          />
        </Grid>
        <Grid item md={4}>
          <MuiSelectInput
            label={"To Warehouse"}
            options={[
              { label: "Warehouse 1", value: "warehouse1" },
              { label: "Warehouse 2", value: "warehouse2" },
              { label: "Warehouse 3", value: "warehouse3" },
            ]}
          />
        </Grid>
      </Grid>
      <PrimaryButton
        sx={{ marginTop: "16px" }}
        onClick={() => handleOpenDialog()}
      >
        Select Product
      </PrimaryButton>
      <BaseDialog open={openDialog} handleClose={handleCloseDialog}>
        <InventoryItemsListSection />
      </BaseDialog>
    </div>
  );
}

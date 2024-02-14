import { Grid } from "@mui/material";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import React from "react";

export default function InventoryFilterSection() {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <MuiSelectInput label={"Location"} />
        </Grid>
        <Grid item md={3}>
          <MuiSelectInput label={"Dimension 1"} />
        </Grid>
        <Grid item md={3}>
          <MuiSelectInput label={"Dimension 1"} />
        </Grid>
      </Grid>
    </div>
  );
}

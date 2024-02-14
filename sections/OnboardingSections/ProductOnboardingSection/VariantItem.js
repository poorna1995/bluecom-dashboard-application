import { CheckBox } from "@mui/icons-material";
import { Grid, IconButton, Checkbox } from "@mui/material";
import AppImage from "components/Common/AppImage";
import TextInput from "components/Common/Inputs/TextInput";
import React, { useState } from "react";
import { MdDelete, MdDeleteForever, MdDeleteOutline } from "react-icons/md";

export default function VariantItem({ data = [] }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleItemClick = () => {
    setIsSelected(() => !isSelected);
  };

  console.log({ data });
  return (
    <div>
      <Grid container sx={{ my: "8px" }} alignItems="center" spacing={2}>
        <Grid item xs={0.7}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => setIsSelected(e.target.checked)}
          />
        </Grid>
        <Grid
          item
          xs={2.3}
          onClick={() => handleItemClick()}
          sx={{ cursor: "pointer" }}
        >
          {data.title}
          {/* <AppImage src={displ} /> */}
        </Grid>
        <Grid item xs={2}>
          <TextInput placeholder="200" containerStyles={containerStyles} />
        </Grid>
        <Grid item xs={2}>
          <TextInput placeholder="500" containerStyles={containerStyles} />
        </Grid>
        <Grid item xs={2}>
          <TextInput placeholder="200" containerStyles={containerStyles} />
        </Grid>
        <Grid item xs={2}>
          <TextInput placeholder="" containerStyles={containerStyles} />
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <MdDeleteOutline />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

const containerStyles = {
  marginTop: "0",
};

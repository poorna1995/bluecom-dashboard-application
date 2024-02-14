import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export default function CheckboxInput({
  label,
  value,
  setValue,
  checkboxProps,
  ...props
}) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          {...checkboxProps}
        />
      }
      label={label}
      {...props}
    />
  );
}

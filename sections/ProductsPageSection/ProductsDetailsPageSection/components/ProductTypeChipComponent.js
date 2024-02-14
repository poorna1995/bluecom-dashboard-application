import React from "react";
import { Box, Chip } from "@mui/material";

export default function ProductTypeChipComponent({ label = "" }) {
  return (
    <Chip
      label={`#${label}`}
      sx={{
        width: "fit-content",
      }}
    ></Chip>
  );
}

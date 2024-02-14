import React from "react";
import { Box, Chip } from "@mui/material";

export default function CollectionChipComponent({ data = [] }) {
  const collectionToChip = data.map((collectionItem) => {
    return (
      <Chip
        label={`#${collectionItem}`}
        key={collectionItem}
        sx={{
          width: "fit-content",
          border: "1px solid",
        }}
        variant="outlined"
      ></Chip>
    );
  });
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        width: "12.5rem",
      }}
    >
      {collectionToChip}
    </Box>
  );
}

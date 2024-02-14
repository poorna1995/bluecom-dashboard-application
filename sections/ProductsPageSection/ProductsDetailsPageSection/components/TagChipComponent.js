import React from "react";
import { Box, Chip } from "@mui/material";

export default function TagChipComponent({ data = [] }) {
  const tagToChip = data.map((tagItem) => {
    console.log(`#${tagItem}`.length);
    return (
      <Chip
        label={`#${tagItem}`}
        key={tagItem}
        sx={{
          width: "fit-content",
        }}
      ></Chip>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        width: "25rem",
      }}
    >
      {tagToChip}
    </Box>
  );
}

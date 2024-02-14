import { Box, Typography } from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React from "react";

export default function InventoryAvailableItem({ wh_name, wh_qty, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "8px",
        maxWidth: "960px",
        // minWidth: "960px",
        flex: 1,
      }}
    >
      {" "}
      <Box
        sx={{
          flex: 0.3,
          pl: 2,
        }}
      >
        <Typography
          sx={{
            wordBreak: "break-word",
            fontSize: "16px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {wh_name}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 0.4,
          pl: 2,
        }}
      >
        <Typography
          sx={{
            wordBreak: "break-word",
            fontSize: "16px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {wh_name}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 0.3,
        }}
      >
        <TextInput
          // placeholder="Enter Quantity"
          placeholder="0"
          containerStyles={{
            marginTop: "8px",
          }}
          type="number"
          value={Number(wh_qty)}
          onChange={onChange}
          min={0}
        />
      </Box>
    </Box>
  );
}

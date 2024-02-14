import { Box, Chip, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import React from "react";

export default function ProductOptionsItem({ item, handleEdit }) {
  return (
    <Box
      sx={{
        marginBottom: "8px",
        borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
        paddingTop: "8px",
      }}
    >
      {" "}
      <Box sx={{ display: "flex", flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            // mt: 1,
            flex: 1,
          }}
        >
          {item.name}
        </Typography>
        <OutlinedButton onClick={() => handleEdit(item)}>Edit</OutlinedButton>
      </Box>
      <Box style={{ display: "flex" }}>
        {Array.isArray(item.fields) &&
          item.fields.map((field, id) => {
            return (
              <Box key={id}>
                <Chip
                  label={field.value}
                  sx={{
                    // marginTop: "8px",
                    mr: 1,
                  }}
                />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

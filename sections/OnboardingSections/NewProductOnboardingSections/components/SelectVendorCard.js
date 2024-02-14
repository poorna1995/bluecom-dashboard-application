import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import Avatar from "@mui/material/Avatar";

import React from "react";

export default function SelectVendorCard({ isSelected, logo, title, onClick }) {
  return (
    <Box
      sx={{
        height: "90px",
        width: "390px",
        boxShadow: "none",
        border: (theme) =>
          isSelected
            ? `3px solid ${theme.palette.primary.main}`
            : `2px solid ${theme.palette.grey[300]}`,
        borderRadius: "10px",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {logo ? (
          <AppImage
            src={logo}
            width="42"
            height="42"
            sx={{
              borderRadius: "50%",
              marginRight: "8px",
              marginLeft: "14px",
            }}
          />
        ) : (
          <Avatar
            sx={{
              color: "#fff",
              width: "42px",
              height: "42px",

              marginLeft: "14px",
              marginRight: "8px",
            }}
          >
            {title.charAt(0)}
          </Avatar>
        )}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",

            overflow: "hidden",
            textOverflow: "ellipsis",

            maxWidth: "260px",
          }}
        >
          {title}
        </Typography>
      </Box>

      <CheckCircle
        sx={{
          color: (theme) =>
            isSelected ? theme.palette.primary.main : theme.palette.grey[300],
          position: "absolute",
          right: "10px",
          top: "30px",
        }}
      />
    </Box>
  );
}

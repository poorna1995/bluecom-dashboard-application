import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import CheckCircleIcon from "components/Common/Icons/CheckCircleIcon";
import React from "react";

function CreateSelectCard({ isSelected, icon, title, onClick, description }) {
  return (
    <Box sx={{ p: 2 }}>
      <BaseCard
        sx={{
          height: "290px",
          // width: "200px",
          boxShadow: "none",
          border: (theme) =>
            isSelected
              ? `3px solid ${theme.palette.primary.main}`
              : `2px solid ${theme.palette.grey[300]}`,
          borderRadius: "20px",
          position: "relative",
          cursor: "pointer",
          "& .check-circle ": {
            color: (theme) =>
              isSelected ? theme.palette.primary.main : theme.palette.grey[300],
            fill: (theme) =>
              isSelected ? theme.palette.primary.main : theme.palette.grey[300],

            position: "absolute",
            right: "20px",
            top: "25px",
            height: "30px",
            width: "30px",
            "& path": {
              fill: (theme) =>
                isSelected
                  ? theme.palette.primary.main
                  : theme.palette.grey[300],
            },
          },
        }}
        onClick={onClick}
      >
        <CheckCircleIcon
          className="check-circle"
          // fill={isSelected ? "primary.main" : "grey.300"}
        />
        <Box
          sx={
            {
              // display: "grid",
              // placeItems: "center",
              // height: "inherit",
            }
          }
        >
          <div style={{ textAlign: "center" }}>
            {icon && (
              <Box
                sx={{
                  background:
                    "linear-gradient(118.29deg, #FFFCE5 -2.08%, #EAE5FF 121.33%)",
                  width: "100%",
                  height: "220px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {" "}
                {icon}
              </Box>
            )}{" "}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: " 22px",
                py: 2,
                color: (theme) => isSelected && theme.palette.primary.main,
              }}
            >
              {title}
            </Typography>
          </div>
        </Box>
      </BaseCard>
      {description && (
        <Typography
          sx={{
            mt: 3,
            fontSize: "18px",
            lineHeight: " 25px",
            fontWeight: 500,
            textAlign: "center",
            color: "#344054",
          }}
        >
          {description}
        </Typography>
      )}{" "}
    </Box>
  );
}

export default CreateSelectCard;

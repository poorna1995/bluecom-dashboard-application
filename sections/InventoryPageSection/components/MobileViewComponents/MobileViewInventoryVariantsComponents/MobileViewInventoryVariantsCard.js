import { Box, IconButton, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import React from "react";

export default function MobileViewInventoryVariantsCard({ data, onClick }) {
  // const inventoryCount = data.inventory.reduce((acc, item) => {
  //   return acc + item.available;
  // }, 0);
  // const locationsCount = data.inventory.length;
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        px: 2,
      }}
    >
      {/* <Box>
        <RenderAppImage display_image={data.item_display_image} />
      </Box> */}
      <Box
        sx={{
          ml: 1,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#212121",
              fontFamily: "Inter",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px" /* 121.429% */,
              letterSpacing: " -0.28px",
              flex: 1,
            }}
          >
            {data.item_title}
            {/*  || (Array.isArray(data.options) &&
                data.options.map((i) => i.value).join("/")) */}
          </Typography>{" "}
          <IconButton
            onClick={onClick}
            sx={{
              p: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
            >
              <path
                d="M1.18334 0.000164615L7.85001 6.66683L1.18334 13.3335L6.09543e-06 12.1502L5.48334 6.66683L5.1367e-06 1.1835L1.18334 0.000164615Z"
                fill="#595959"
              />
            </svg>
          </IconButton>
        </Box>
        <Typography
          sx={{
            color: "#616161",
            fontFamily: "Inter",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "20px" /* 166.667% */,
            letterSpacing: " -0.24px",
            mt: 1,
          }}
        >
          {/* {inventoryCount} inventory . {locationsCount} Locations */}
        </Typography>
      </Box>
    </Box>
  );
}

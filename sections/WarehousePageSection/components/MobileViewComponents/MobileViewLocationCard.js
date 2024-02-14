import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";

export default function MobileViewLocationCard({ data = {} }) {
  // console.log({ data });

  const addressList =
    listOfKeys.map((item) => data[item]).filter((item) => item) ?? [];
  // console.log({ addressList });

  return (
    <Box
      sx={{
        py: 2,
        borderBottom: "1px solid rgba(17, 17, 17, 0.10)",
        display: "flex",
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          mr: "10px",
          // backgroundColor: randomColor(),
        }}
      >
        {data["Warehouse Name"].charAt(0)}
      </Avatar>
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            // color: (theme) => theme.palette.text.primary,
            color: "#212121",
            lineHeight: "17px",
            letterSpacing: " -0.32px",
            mb: 1,
          }}
        >
          {data["Warehouse Name"]}
        </Typography>
        {Array.isArray(addressList) && addressList.length > 0 && (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#616161",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "16px",
              letterSpacing: " -0.24px",
              mb: 1,
            }}
          >
            {/* {data["Address"]} */}
            {addressList.map((item, index) => {
              // if (!data[item]) return null;
              return (
                <span key={item}>
                  {item}
                  {index !== addressList.length - 1 && ","}{" "}
                </span>
              );
            })}{" "}
          </Typography>
        )}
        <Typography
          sx={{
            fontWeight: "600",
            color: "#616161",
            fontFamily: "Inter",
            fontSize: "12px",
            fontStyle: "normal",
            lineHeight: "16px",
          }}
        >
          {getFormattedNumber(data["Stocks"]) || 0} inventory
        </Typography>
      </Box>

      {/* image */}
      {/* name */}
      {/* address */}
      {/* inventory count */}
    </Box>
  );
}

const listOfKeys = [
  "address_1",
  "address_2",
  "city",
  "state",
  "country",
  "zipcode",
];

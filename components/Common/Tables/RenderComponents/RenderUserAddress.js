import { Typography } from "@mui/material";
import React from "react";
const ADDRESS_KEYS = [
  "address1",
  "address2",
  "city",
  "state",
  "country",
  "zipcode",
];
const getAddressList = (data) => {
  return ADDRESS_KEYS.map((item) => data[item]).filter((item) => item) ?? [];
};
export default function RenderUserAddress({ data }) {
  const addressList = getAddressList(data);
  return (
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: "500",
        // color: (theme) => theme.palette.grey[600],
        color: (theme) => theme.palette.text.primary,
      }}
    >
      {addressList.map((item, index) => {
        if (index === 0) {
          return (
            <React.Fragment key={item}>
              <span
                key={item}
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {item}
                {index !== addressList.length - 1 && ","}{" "}
              </span>
              <br />
            </React.Fragment>
          );
        }
        // if (!data[item]) return null;
        return (
          <span key={item}>
            {item}
            {index !== addressList.length - 1 && ","}{" "}
          </span>
        );
      })}
    </Typography>
  );
}

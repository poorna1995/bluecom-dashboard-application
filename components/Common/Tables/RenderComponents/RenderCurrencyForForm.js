import { Typography } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import React from "react";
import Cookies from "universal-cookie";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";

export default function RenderCurrencyForForm({ sx, ...props }) {
  const cookies = new Cookies();
  const merchant_currency = cookies.get("merchant_currency");
  // console.log({
  // 	getCurrentCurrency: getCurrentCurrency(),
  // 	merchant_currency,
  // });
  return (
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 500,
        color: (theme) => theme.palette.text.primary,
        ...sx,
      }}
      {...props}
    >
      {getSymbolFromCurrency(merchant_currency || "USD")}
    </Typography>
  );
}

import { Typography } from "@mui/material";
import React from "react";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";
import Cookies from "universal-cookie";
export default function RenderCurrency({
  value,
  currency,
  locale,
  minimumFractionDigits,
  maximumFractionDigits,
  sx,
  ...props
}) {
  const cookies = new Cookies();
  const merchant_currency = cookies.get("merchant_currency");
  const currencyValue = Number(value);
  return (
    <Typography sx={sx} {...props}>
      {/* {value} */}
      {getCurrencyValue(currencyValue, currency || merchant_currency || "USD")}
      {/* {currencyValue?.toLocaleString?.(locale ?? "en-US", {
        style: "currency",
        currency: currency ?? "USD",
        minimumFractionDigits: minimumFractionDigits ?? 0,
        maximumFractionDigits: maximumFractionDigits ?? 0,
      })} */}
    </Typography>
  );
}

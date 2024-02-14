import React from "react";
import { Box } from "@mui/material";
import PaypalIcon from "components/Common/Icons/VendorIcon/PaymentMethods/PaypalIcon";
import WireTransferIcon from "components/Common/Icons/VendorIcon/PaymentMethods/WireTransferIcon";
import CreditCardIcon from "components/Common/Icons/VendorIcon/PaymentMethods/CreditCardIcon";
import DebitCardIcon from "components/Common/Icons/VendorIcon/PaymentMethods/DebitCardIcon";

const paymentMethods = {
  paypal: {
    icon: <PaypalIcon />,
    title: "Paypal",
  },
  "wire-transfer": {
    icon: <WireTransferIcon />,
    title: "Wire Transfer",
  },
  "credit-card": {
    icon: <CreditCardIcon />,
    title: "Credit Card",
  },
  "debit-card": {
    icon: <DebitCardIcon />,
    title: "Debit Card",
  },
};

export default function RenderPaymentMethod({ value = "" }) {
  const changedValue = value && value.replace(" ", "-").toLowerCase();
  const getMethod = (changedValue && paymentMethods[changedValue]) || {};
  return (
    <Box
      sx={{
        fontSize: { md: "14px", xs: "12px" },
        display: "flex",
        alignItems: "center",
        // color: (theme) => theme.palette.text.secondary,
        color: (theme) => theme.palette.text.primary,
        "& svg path": {
          fill: "#2a2a2f",
        },
        ml: 1,
      }}
    >
      {getMethod?.icon}
      <span
        style={{
          fontWeight: "500",
          marginLeft: "5px",
        }}
      >
        {getMethod?.title}
      </span>
    </Box>
  );
}

import { styled } from "@mui/material";
import React from "react";
import { ORDER_STATUS } from "sections/OrdersPageSection/utils/orders.constants";

const StyledDiv = styled("span")(({ theme }) => ({
  borderRadius: "2px",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "20px",
  padding: "6px 10px",
}));

export const renderStatusString = (status) => {
  switch (status) {
    case ORDER_STATUS.NOT_STARTED:
    case ORDER_STATUS.PENDING:
      return "Not Started";
    case ORDER_STATUS.IN_PROGRESS:
      return "In Progress";

    case ORDER_STATUS.CANCELLED:
      return "Cancelled";
    case ORDER_STATUS.REFUND:
      return "Refund";
    case ORDER_STATUS.FULFILLED:
    case ORDER_STATUS.COMPLETED:
      return "Fulfilled";
    case ORDER_STATUS.PARTIALLY_FULFILLED:
      return "Partially Fulfilled";
    default:
      return "Not Started";
  }
};
export const renderStatusStyles = (status) => {
  switch (status) {
    case ORDER_STATUS.NOT_STARTED:
    case ORDER_STATUS.PENDING:
      return NOT_STARTED_STYLES;
    case ORDER_STATUS.IN_PROGRESS:
      return IN_PROGRESS_STYLES;

    case ORDER_STATUS.CANCELLED:
      return CANCELLED_STYLES;
    case ORDER_STATUS.FULFILLED:
    case ORDER_STATUS.COMPLETED:
      return COMPLETED_STYLES;
    case ORDER_STATUS.PARTIALLY_FULFILLED:
      return PARTIALLY_FULFILLED_STYLES;
    default:
      return NOT_STARTED_STYLES;
  }
};
export default function RenderOrderStatus({ status }) {
  return (
    <StyledDiv sx={renderStatusStyles(status)}>
      {renderStatusString(status)}
    </StyledDiv>
  );
}

const NOT_STARTED_STYLES = {
  border: "1px solid #B8EB8F",
  background: "#F6FFED",
  color: "#389f0c",
};
const IN_PROGRESS_STYLES = {};
const COMPLETED_STYLES = {
  border: "1px solid #D9D9D9",
  background: "#FAFAFA",
  color: "#2b2b2b",
};
const CANCELLED_STYLES = {
  border: " 1px solid #FE9B9B",
  background: "#FFEDED",
  color: "#d93c3c",
};
const FULFILLED_STYLES = {};
const PARTIALLY_FULFILLED_STYLES = {
  border: "1px solid #FED697",
  background: "#FFF7E6",
  color: "D46C0C",
};

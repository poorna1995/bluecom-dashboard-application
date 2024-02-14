import React from "react";
import { useSelector } from "react-redux";
import OrderDetailsPageHeaderSection from "./OrderDetailsPageHeaderSection";
import { Box } from "@mui/material";
import OrderDetailsPageOrderDetailsSection from "./OrderDetailsPageOrderDetailsSection";
import OrderDetailsPageOrderSummarySection from "./OrderDetailsPageOrderSummarySection";
import OrderDetailsPageOrderLineItemsList from "./OrderDetailsPageOrderLineItemsList";
import OrderDetailsPageFooterSection from "./OrderDetailsPageFooterSection";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  order: orders.order,
  isLoading: orders.orderDetailsLoading,
});
export default function OrderDetailsPageSection() {
  const { currentUser, order, isLoading } = useSelector(mapState);

  if (isLoading) return <PageSpinner />;
  return (
    <div>
      <OrderDetailsPageHeaderSection />
      <Box sx={{ display: "flex", flex: 1 }}>
        <OrderDetailsPageOrderDetailsSection sx={{ flex: 0.7, mr: 2 }} />
        <OrderDetailsPageOrderSummarySection sx={{ flex: 0.3 }} />
      </Box>
      <OrderDetailsPageOrderLineItemsList />
      <Box sx={{ justifyContent: "flex-end", display: "flex", flex: 1 }}>
        <OrderDetailsPageFooterSection />
      </Box>
    </div>
  );
}

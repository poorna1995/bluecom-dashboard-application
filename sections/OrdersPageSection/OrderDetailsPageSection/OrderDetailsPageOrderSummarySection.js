import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import OrderPageCardHeadingText from "../components/OrderPageCardHeadingText";
import OrderPageCardSubHeadingText from "../components/OrderPageCardSubHeadingText";
import OrderPageCardDescriptionText from "../components/OrderPageCardDescriptionText";
import { useSelector } from "react-redux";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  order: orders.order,

  isLoading: orders.orderDetailsLoading,
});
export default function OrderDetailsPageOrderSummarySection({ ...props }) {
  const { currentUser, order, isLoading } = useSelector(mapState);

  if (isLoading)
    return (
      <Box
        sx={{
          ...props.sx,
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "7px",
          p: 2,
        }}
      >
        {" "}
        <OrderPageCardHeadingText>Order Summary</OrderPageCardHeadingText>
        <PageSpinner
          spinnerStyles={{
            height: "20vh",
          }}
        />
      </Box>
    );
  return (
    <Box
      sx={{
        ...props.sx,
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "7px",
        p: 2,
      }}
    >
      <OrderPageCardHeadingText>Order Summary</OrderPageCardHeadingText>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ flex: 0.5, py: 1 }}>
          {/* order qty, items, on hand */}
          <OrderPageCardSubHeadingText sx={{ mt: 1 }}>
            Order Qty
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {/* get the total of qty_ordered in order.products */}
            {order.total_qty_ordered}
          </OrderPageCardDescriptionText>

          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Unique Items
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {order.items_count}
          </OrderPageCardDescriptionText>
          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Total On Hand Qty
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {order?.total_on_hand || 0}
          </OrderPageCardDescriptionText>
        </Stack>
        <Stack sx={{ flex: 0.5, py: 1 }}>
          {/* shipping, tax , total */}{" "}
          <OrderPageCardSubHeadingText sx={{ mt: 1 }}>
            Shipping
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            <RenderCurrency
              value={order.shipping_total}
              currency={order?.currency || ""}
            />
          </OrderPageCardDescriptionText>
          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Tax
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            <RenderCurrency
              value={order.total_tax}
              currency={order?.currency || ""}
            />
          </OrderPageCardDescriptionText>
          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Total
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            <RenderCurrency
              value={order.total_cost}
              currency={order?.currency || ""}
            />
          </OrderPageCardDescriptionText>
        </Stack>
      </Box>
    </Box>
  );
}

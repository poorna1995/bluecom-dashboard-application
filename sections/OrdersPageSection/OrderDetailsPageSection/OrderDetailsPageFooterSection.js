import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  order: orders.order,

  isLoading: orders.orderDetailsLoading,
});
export default function OrderDetailsPageFooterSection() {
  const { currentUser, order, isLoading } = useSelector(mapState);
  if (isLoading)
    return (
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          // p: 2,p
          py: 1,
          maxWidth: "520px",
          borderRadius: "8px",
          mt: 2,
          fontSize: "16px !important",
          flex: 1,
        }}
      >
        {" "}
        <PageSpinner spinnerStyles={{ height: "10vh" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.1)",
        // p: 2,p
        py: 1,
        maxWidth: "520px",
        borderRadius: "8px",
        mt: 2,
        fontSize: "16px !important",
        flex: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, px: 4 }}
      >
        <span>Subtotal</span>
        <span> {order.items_count} items</span>{" "}
        <RenderCurrency
          value={order.sub_total_cost}
          currency={order.currency}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, px: 4 }}
      >
        <span>Shipping</span>
        {/* <span> {order.items_count} items</span>{" "} */}
        <RenderCurrency
          value={order.shipping_total}
          currency={order.currency}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, px: 4 }}
      >
        <span>Tax</span>
        <span>{order.tax_title}</span>{" "}
        <RenderCurrency value={order.total_tax} currency={order.currency} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 1,
          fontWeight: "700 !important",
          fontSize: "16px !important",
          color: (theme) => `${theme.palette.text.primary} !important`,
          borderTop: "1px solid rgba(0,0,0,0.1)",
          px: 4,
        }}
      >
        <span>Total</span>{" "}
        <RenderCurrency
          value={order.total_cost}
          sx={{
            fontWeight: "700 !important",
            fontSize: "16px !important",
            color: (theme) => `${theme.palette.text.primary} !important`,
          }}
          currency={order.currency}
        />
      </Stack>
    </Box>
  );
}

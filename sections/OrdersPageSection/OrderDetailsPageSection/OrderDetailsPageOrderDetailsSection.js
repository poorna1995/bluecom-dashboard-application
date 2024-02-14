import { Box, Stack, Typography } from "@mui/material";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import React from "react";
import { useSelector } from "react-redux";
import OrderPageCardHeadingText from "../components/OrderPageCardHeadingText";
import OrderPageCardSubHeadingText from "../components/OrderPageCardSubHeadingText";
import OrderPageCardDescriptionText from "../components/OrderPageCardDescriptionText";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import RenderUserAddress from "components/Common/Tables/RenderComponents/RenderUserAddress";
import RenderCustomerInfo from "../components/OrdersPageTableComponents/RenderCustomerInfo";
import channelsOptions from "constants/channelOptions";
import AppImage from "components/Common/AppImage";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  order: orders.order,
  isLoading: orders.orderDetailsLoading,
});
export default function OrderDetailsPageOrderDetailsSection({ ...props }) {
  const { currentUser, order, isLoading } = useSelector(mapState);
  const billingAddress = order.billing_address;
  const shippingAddress = order.shipping_address;

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
        <OrderPageCardHeadingText>Order Details</OrderPageCardHeadingText>{" "}
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
      <OrderPageCardHeadingText>Order Details</OrderPageCardHeadingText>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {/* order id and other info */}
        <Stack
          sx={{
            flex: 0.3,
            py: 1,
          }}
        >
          <OrderPageCardSubHeadingText sx={{ mt: 1 }}>
            Order ID (Listing Store)
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {order.co_id}
          </OrderPageCardDescriptionText>

          {/* <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Order ID{" "}
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {order.co_line_id}
          </OrderPageCardDescriptionText> */}
          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Time Stamp
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            <RenderDate date={order.created_at} />
          </OrderPageCardDescriptionText>
        </Stack>
        {/* store and customer info */}
        <Stack
          sx={{
            flex: 0.3,
            py: 1,
          }}
        >
          <OrderPageCardSubHeadingText sx={{ mt: 1 }}>
            Store
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AppImage
              src={channelsOptions[order.channel_id].image}
              width={30}
              height={30}
              sx={{ mr: 1 }}
            />{" "}
            {order.shop}
          </OrderPageCardDescriptionText>

          <OrderPageCardSubHeadingText
            sx={{
              mt: 4,
              mb: 1,
            }}
          >
            Customer Details
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            <RenderCustomerInfo customerInfo={billingAddress} />
            {/* {billingAddress.first_name} {billingAddress.last_name} */}
            <RenderUserAddress data={billingAddress} />
            {/* {billingAddress.email && (
							<>
								{" "}
								<br />
								{billingAddress.email}
							</>
						)}{" "}
						{billingAddress.phone && (
							<>
								<br />
								{billingAddress.phone}
							</>
						)} */}
          </OrderPageCardDescriptionText>
        </Stack>
        {/* shipping details and payment method */}
        <Stack
          sx={{
            flex: 0.3,
            py: 1,
          }}
        >
          <OrderPageCardSubHeadingText sx={{ mt: 1 }}>
            Shipping Details
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {shippingAddress.first_name} {shippingAddress.last_name}
            <RenderUserAddress data={shippingAddress} />
            {/* {shippingAddress.address1 && (
							<>
								<br />
								{shippingAddress.address1}
							</>
						)}
						{shippingAddress.address2 && (
							<>
								<br />
								{shippingAddress.address2}
							</>
						)}
						{shippingAddress.city && (
							<>
								<br />
								{shippingAddress.city}
							</>
						)}
						{shippingAddress.state && (
							<>, {shippingAddress.state}</>
						)}
						{shippingAddress.country && (
							<>, {shippingAddress.country}</>
						)}
						{shippingAddress.zipcode && (
							<>, {shippingAddress.zipcode}</>
						)} */}
          </OrderPageCardDescriptionText>

          <OrderPageCardSubHeadingText sx={{ mt: 4 }}>
            Payment Method
          </OrderPageCardSubHeadingText>
          <OrderPageCardDescriptionText>
            {order.payment_method} - {order.payment_method_title}
          </OrderPageCardDescriptionText>
        </Stack>
      </Box>
    </Box>
  );
}

import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import ButtonIconSecondary from "components/Common/Buttons/ButtonIconSecondary";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import channelsOptions from "constants/channelOptions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderOrderStatus from "../components/OrdersPageTableComponents/RenderOrderStatus";
import AppLink from "components/Common/AppLink";
import { useRouter } from "next/router";
import IconButtonSecondary from "components/Common/Buttons/IconButtonSecondary";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { ORDERS } from "constants/API_URL";
import appFetch from "utils/appFetch";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { enqueueSnackbar } from "notistack";
import { ORDER_STATUS } from "../utils/orders.constants";
import { fetchOrderDetails } from "../utils/orders.utils";
import { setOrderDetails } from "redux/orders/ordersSlice";

const mapState = ({ orders, user }) => ({
  order: orders.order,
  isLoading: orders.orderDetailsLoading,
  currentUser: user.currentUser,
});
export default function OrderDetailsPageHeaderSection() {
  const { order, isLoading, currentUser } = useSelector(mapState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  // disable the fulfil button if the status of all order line items is not fulfilled

  const disableFulfillButton =
    Array.isArray(order.line_items) &&
    order.line_items.some((item) => item.status !== ORDER_STATUS.FULFILLED);
  console.log({ disableFulfillButton });

  const handleMarkOrderAsFulfilled = () => {
    const URL = ORDERS.MARK_FULFILLED;
    const data = {
      user_id: currentUser.merchant_id,
      co_id: order.co_id,
      co_line_id: order.co_line_id,
    };
    setIsButtonLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          fetchOrderDetails({
            data: {
              co_id: order.co_id,
              user_id: currentUser.merchant_id,
            },
          })
            .then((resp) => {
              dispatch(setOrderDetails(resp));
              enqueueSnackbar(json.message);

              setIsButtonLoading(false);
            })
            .catch((err) => {
              console.error({ err });
              setIsButtonLoading(false);
            });
        }

        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          setIsButtonLoading(false);
        }
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  const orderId = order.co_id;
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          my: 2,
          alignItems: "center",
        }}
      >
        <Skeleton sx={{ width: "600px", height: "48px" }} />
      </Box>
    );
  return (
    <Box
      sx={{
        display: "flex",
        my: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButtonSecondary
          size="small"
          onClick={() => router.push(`/app/orders?tab=all`)}
        >
          <ArrowBack />
        </IconButtonSecondary>
        <Typography
          sx={{
            mx: 3,
            color: (theme) => theme.palette.primary.main,
            fontSize: "21px",
            fontWeight: 600,
          }}
        >
          # {orderId}
        </Typography>
        <AppImage
          src={channelsOptions[order.channel_id].image}
          height={30}
          width={30}
        />
        <Typography
          sx={{
            mr: 2,
            color: (theme) => theme.palette.text.primary,
            fontSize: "15px",
          }}
        >
          {order.shop}
        </Typography>
        <RenderOrderStatus status={order.status} />
      </Box>
      {order.status !== ORDER_STATUS.FULFILLED && (
        <PrimaryButton
          onClick={() => handleMarkOrderAsFulfilled()}
          loading={isButtonLoading}
          disabled={disableFulfillButton || isButtonLoading}
        >
          Mark as fulfilled
        </PrimaryButton>
      )}
    </Box>
  );
}

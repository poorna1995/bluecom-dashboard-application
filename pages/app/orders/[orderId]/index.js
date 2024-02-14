import { ORDERS } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderDetailsStart,
  setOrderDetails,
  setOrderDetailsLoading,
  setOrders,
} from "redux/orders/ordersSlice";
import OrderDetailsPageSection from "sections/OrdersPageSection/OrderDetailsPageSection";
import { fetchOrderDetails } from "sections/OrdersPageSection/utils/orders.utils";
import appFetch from "utils/appFetch";
const mapState = ({ orders, user }) => ({
  orders: orders.orders,
  currentUser: user.currentUser,
});
export default function OrderDetailsPage() {
  const { orders, currentUser } = useSelector(mapState);
  const router = useRouter();
  const { orderId } = router.query;
  const dispatch = useDispatch();
  const handleFetchOrderDetails = () => {
    const data = {
      user_id: currentUser.merchant_id,
      co_id: orderId,
    };

    dispatch(fetchOrderDetailsStart({ data }));
    // dispatch(setOrderDetailsLoading(true));
    // fetchOrderDetails({ data })
    // 	.then((json) => {
    // 		if (json.status === API_RESPONSE_STATUS.SUCCESS) {
    // 			console.log({ json });
    // 			dispatch(setOrderDetails(json.result[0]));
    // 		}
    // 		setTimeout(() => {
    // 			dispatch(setOrderDetailsLoading(false));
    // 		}, 1200);
    // 	})
    // 	.catch((error) => {
    // 		console.log({ error });
    // 	});
  };
  React.useEffect(() => {
    if (orderId) {
      handleFetchOrderDetails();
    }
  }, [orderId]);

  return (
    <DrawerLayout>
      <OrderDetailsPageSection />
    </DrawerLayout>
  );
}

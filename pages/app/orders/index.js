import { Container } from "@mui/material";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderListLoading, setOrders } from "redux/orders/ordersSlice";
import OrdersPageSection from "sections/OrdersPageSection";
import {
  fetchOrdersCount,
  fetchOrdersList,
} from "sections/OrdersPageSection/utils/orders.utils";

// const mapState = ({ orders, user }) => ({
// 	orders: orders.orders,
// 	currentUser: user.currentUser,
// });
export default function OrdersPage() {
  return (
    <DrawerLayout pageTitle="Orders ">
      <Container maxWidth="2xl">
        <OrdersPageSection />
      </Container>
    </DrawerLayout>
  );
}

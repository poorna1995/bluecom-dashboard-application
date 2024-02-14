import { Box, Typography } from "@mui/material";
import React from "react";
import OrdersPageTable from "./components/OrdersPageTable";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersCount,
  fetchOrdersList,
  filteredOrders,
  syncBigCommerceOrders,
  syncWooCommerceOrders,
} from "./utils/orders.utils";
import { ORDERS_PAGE_TABS } from "./utils/orders.constants";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import { setOrderListLoading, setOrders } from "redux/orders/ordersSlice";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import { resetStore } from "redux/onboarding/onboardingSlice";
import { useRouter } from "next/router";
import OrdersEmptyState from "components/Common/Icons/EmptyStates/OrdersEmptyState";
import { enqueueSnackbar } from "notistack";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";

// const mapState = ({ user, orders }) => ({
//   currentUser: user.currentUser,
//   orders: orders.orders,
//   isLoading: orders.ordersListLoading,
// });
export default function OrdersPageSection() {
  const user = useSelector((state) => state.user);
  const currentUser = user.currentUser && user.currentUser;
  const dispatch = useDispatch();
  const [ordersCount, setOrdersCount] = React.useState(0);
  const router = useRouter();
  const { currentPage } = router.query;
  const handleFetchOrders = () => {
    if (!currentUser) return;
    const data = {
      user_id: currentUser.merchant_id,
      per_page: 13,
      page: Number(currentPage) || 1,
    };

    dispatch(setOrderListLoading(true));
    fetchOrdersCount({
      data: { user_id: currentUser.merchant_id },
    })
      .then((res) => {
        // console.log({ res });
        setOrdersCount(res.result);

        fetchOrdersList({ data })
          .then((json) => {
            if (json.status === API_RESPONSE_STATUS.SUCCESS) {
              // console.log({ json });
              dispatch(setOrders(json.result));
            }
            setTimeout(() => {
              dispatch(setOrderListLoading(false));
            }, 1200);
          })
          .catch((error) => {
            console.log({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  React.useEffect(() => {
    if (currentUser) {
      handleFetchOrders();
    }
  }, [currentPage]);

  const { orders, ordersListLoading: isLoading } = useSelector(
    (state) => state.orders
  );
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const handleRouterTabClick = () => {
    dispatch(setOrderListLoading(true));
    setTimeout(() => {
      dispatch(setOrderListLoading(false));
    }, 1500);
  };

  const data = [
    {
      label: ORDERS_PAGE_TABS.all.title,
      component: (
        <OrdersPageTable
          data={filteredOrders(orders, ORDERS_PAGE_TABS.all.status)}
          ordersCount={ordersCount}
        />
      ),
      route: ORDERS_PAGE_TABS.all.route,
    },
    {
      label: ORDERS_PAGE_TABS.unfulfilled.title,
      component: (
        <OrdersPageTable
          data={filteredOrders(orders, ORDERS_PAGE_TABS.unfulfilled.status)}
        />
      ),
      route: ORDERS_PAGE_TABS.unfulfilled.route,
    },
    {
      label: ORDERS_PAGE_TABS["partially-fulfilled"].title,
      component: (
        <OrdersPageTable
          data={filteredOrders(
            orders,
            ORDERS_PAGE_TABS["partially-fulfilled"].status
          )}
        />
      ),
      route: ORDERS_PAGE_TABS["partially-fulfilled"].route,
    },
    {
      label: ORDERS_PAGE_TABS.fulfilled.title,
      component: (
        <OrdersPageTable
          data={filteredOrders(orders, ORDERS_PAGE_TABS.fulfilled.status)}
        />
      ),
      route: ORDERS_PAGE_TABS.fulfilled.route,
    },
    {
      label: ORDERS_PAGE_TABS.cancelled.title,
      component: (
        <OrdersPageTable
          data={filteredOrders(orders, ORDERS_PAGE_TABS.cancelled.status)}
        />
      ),
      route: ORDERS_PAGE_TABS.cancelled.route,
    },
    {
      label: ORDERS_PAGE_TABS.refund.title,
      component: (
        <OrdersPageTable
          data={filteredOrders(orders, ORDERS_PAGE_TABS.refund.status)}
        />
      ),
      route: ORDERS_PAGE_TABS.refund.route,
    },
    // {
    //   label: `Not Started`,
    //   component: <OrdersPageTable data={orders} />,
    //   route: "all",
    // },
  ];
  const handleSyncOrders = () => {
    const data = {
      user_id: currentUser.merchant_id,
      shop: "143.244.133.144/wordpress",
    };
    setButtonLoading(true);
    syncWooCommerceOrders({ data })
      .then((json) => {
        syncBigCommerceOrders({
          data: {
            user_id: currentUser.merchant_id,
            shop: "bluecom",
          },
        })
          .then((json) => {
            setButtonLoading(false);

            enqueueSnackbar(
              "Sync Completed! Please refresh to view the changes.",
              {}
            );
            console.log(json);
          })
          .catch((err) => console.log(err));

        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  const handleConnectStoreButton = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  const handleClickWebsite = (website_link = "bluecom.ai/contact-us") => {
    if (
      website_link.startsWith("https://") ||
      website_link.startsWith("http://")
    ) {
      return window.open(website_link, "_blank");
    }
    return window.open(`https://${website_link}`, "_blank");
  };

  if (isLoading) return <PageSpinner />;
  if (orders.length === 0 && !isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // mt: "24px",
          minHeight: "500px",
        }}
      >
        <NewEmptyState
          containerStyles={{
            maxWidth: "800px",
            maxHeight: "550px",
          }}
          icon={<OrdersEmptyState />}
          title="No Orders Connected"
          titleDesc={
            "We didn't recognize orders connected with bluecom store.  Select a recommended action to connect Products data."
          }
          note1={"Connect your store with bluecom. To Publish Your Product"}
          ActionOne={"Connect Your Store"}
          handleActionOne={() => handleConnectStoreButton()}
          note2={"Contact us to get help in onboarding"}
          ActionTwo={"Contact Us"}
          handleActionTwo={() => handleClickWebsite("bluecom.ai/contact-us")}
          hidePoints={true}
          hideActionThree={true}
        ></NewEmptyState>
      </Box>
    );

  if (Array.isArray(orders) && orders.length > 0)
    return (
      <div>
        {orders.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: (theme) => theme.palette.primary.main,
                  lineHeight: "40px",
                  my: 2,
                  display: "flex",
                  "& span": {
                    fontWeight: "600",
                    color: "#595959",
                    marginLeft: "4px",
                  },
                }}
              >
                Orders <span>({ordersCount})</span>
              </Typography>
              {/* <PrimaryButton
							onClick={handleSyncOrders}
							loading={buttonLoading}
						>
							Sync Orders
						</PrimaryButton> */}
            </Box>
            {/* {isLoading ? (
				<PageSpinner />
			) : ( */}
            <RouterTabs
              data={data}
              basePath={`/app/orders`}
              handleCustomAction={handleRouterTabClick}
              // isTabAfterQuery={true}
            />
          </>
        )}
        {/* )} */}
        {/* <OrdersPageTable /> */}
      </div>
    );
}

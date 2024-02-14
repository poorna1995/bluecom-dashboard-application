import { Avatar, Box } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderUserAddress from "components/Common/Tables/RenderComponents/RenderUserAddress";
import channelsOptions from "constants/channelOptions";
import React from "react";
import RenderOrderStatus from "./OrdersPageTableComponents/RenderOrderStatus";
import RenderCustomerInfo from "./OrdersPageTableComponents/RenderCustomerInfo";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import { useDispatch, useSelector } from "react-redux";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import OrdersEmptyState from "components/Common/Icons/EmptyStates/OrdersEmptyState";
import { useRouter } from "next/router";
import { resetStore } from "redux/onboarding/onboardingSlice";
import EmptyState from "components/Common/EmptyState";

// const mapState = ({ user, orders }) => ({
// 	isLoading: orders.orderListLoading,
// });

export default function OrdersPageTable({ data = [], ordersCount }) {
  const { orderListLoading: isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage, tab } = router.query;
  const tableColumns = [
    {
      accessorKey: "co_id",
      // header: "Order ID",
      Header: (
        <span style={{ marginLeft: "16px" }}> Order ID (Listing Store)</span>
      ),

      Cell: ({ cell }) => (
        <div style={{ marginLeft: "16px" }}>
          <RenderAppLink
            href={`/app/orders/${cell.row.original.co_id}`}
            title={`# ${cell.row.original.co_id}`}
          />
        </div>
      ),
      size: 140,
      // muiTableBodyCellProps: {
      // 	align: "right",
      // },
      // muiTableHeadCellProps: {
      // 	align: "right",
      // },
    },
    {
      accessorKey: "created_at",
      header: "Time Stamp",
      Cell: ({ cell }) => (
        <>
          <RenderDate date={cell.row.original.created_at} />
        </>
      ),
      size: 200,
      muiTableBodyCellProps: {
        align: "left",
      },
      muiTableHeadCellProps: {
        align: "left",
      },
    },
    {
      accessorKey: "shop",
      header: "Store",
      Cell: ({ cell }) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppImage
            src={channelsOptions[cell.row.original.channel_id].image}
            width={30}
            height={30}
            sx={{ mr: 1 }}
          />{" "}
          {cell.row.original.shop}
        </span>
      ),
      size: 240,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => (
        <>
          <RenderOrderStatus status={cell.row.original.status} />
        </>
      ),
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "shipping_address",
      header: "Customer Address",
      Cell: ({ cell }) => (
        <>
          <RenderUserAddress data={cell.row.original.shipping_address} />{" "}
        </>
      ),
      size: 250,
      // muiTableBodyCellProps: {
      // 	align: "right",
      // },
      // muiTableHeadCellProps: {
      // 	align: "right",
      // },
    },
    {
      accessorKey: "customer_info",
      header: "Customer ",
      Cell: ({ cell }) => (
        <>
          <RenderCustomerInfo
            customerInfo={cell.row.original.billing_address}
          />
        </>
      ),
      // muiTableBodyCellProps: {
      // 	align: "center",
      // },
      // muiTableHeadCellProps: {
      // 	align: "center",
      // },
      size: 240,
    },
    {
      accessorKey: "order_items",
      header: "Unique Items",
      Cell: ({ cell }) => <>{cell.row.original.items_count}</>,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 60,
    },
    {
      accessorKey: "total_cost",
      Header: <span style={{ marginRight: "16px" }}> Order Value ($)</span>,
      Cell: ({ cell }) => (
        <>
          {" "}
          <RenderCurrency
            value={cell.row.original.total_cost}
            currency={cell.row.original.currency}
            sx={{ mr: 2 }}
          />
        </>
      ),
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 140,
    },
  ];

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
  if (Array.isArray(data) && data.length === 0)
    return (
      <EmptyState
        icon={<OrdersEmptyState />}
        text="No Orders Found"
        bodyText={"We didn’t recognize orders connected with bluecom store."}
      ></EmptyState>
      // <NewEmptyState
      //   containerStyles={
      //     {
      //       // maxWidth: "800px",
      //       // maxHeight: "550px",
      //     }
      //   }
      //   icon={<OrdersEmptyState />}
      //   title="No Orders"
      //   titleDesc={
      //     "We didn’t recognize orders connected with bluecom store.  Select a recommended action to connect Products data."
      //   }
      //   note1={"Connect your store with bluecom. To Publish Your Product"}
      //   ActionOne={"Connect Your Store"}
      //   handleActionOne={() => handleConnectStoreButton()}
      //   note2={"Contact us to get help in onboarding"}
      //   ActionTwo={"Contact Us"}
      //   handleActionTwo={() => handleClickWebsite("bluecom.ai/contact-us")}
      //   hidePoints={true}
      //   hideActionThree={true}
      // ></NewEmptyState>
    );

  return (
    <div>
      <BluecomMRTBaseTable
        basePath={`/app/orders?tab=${tab}&`}
        data={data}
        columnsData={tableColumns}
        // enableSorting
        shallUseRouter={true}
        totalRows={ordersCount}
      />
    </div>
  );
}

/**
 * {
    "billing_address": {
        "address_1": "",
        "address_2": "",
        "city": "",
        "country": "US",
        "email": "",
        "first_name": "Tomy",
        "last_name": "",
        "phone": "",
        "state": "NC",
        "zipcode": ""
    },
    "cancel_date": "",
    "channel_id": 4,
    "channel_wh_id": "",
    "co_id": "150",
    "co_line_id": "537599752780182453",
    "created_at": "2023-04-04T17:09:59",
    "products": [
        {
            "channel_item_id": "0",
            "channel_product_id": "0",
            "co_line_id": "537599752780182453",
            "currency_id": 12,
            "display_image": "",
            "images": [],
            "item_title": "",
            "item_unit_cost_price": null,
            "item_unit_retail_price": null,
            "master_item_id": "",
            "master_product_id": "",
            "po_line_id": "1",
            "po_order_line_id": "1",
            "product_desc": "",
            "product_sku": "",
            "product_title": "PISTA GP RR E2206 DOT - FUTURO CARBONIO FORGIATO",
            "qty_ordered": 3,
            "received_qty": null,
            "sku": null,
            "total_cost": 5445,
            "user_id": "138944605333795140"
        },
        {
            "channel_item_id": "0",
            "channel_product_id": "0",
            "co_line_id": "537599752780182453",
            "currency_id": 12,
            "display_image": "",
            "images": [],
            "item_title": "",
            "item_unit_cost_price": null,
            "item_unit_retail_price": null,
            "master_item_id": "",
            "master_product_id": "",
            "po_line_id": "2",
            "po_order_line_id": "2",
            "product_desc": "",
            "product_sku": "",
            "product_title": "PISTA GP RR E2206 DOT - FUTURO CARBONIO FORGIATO",
            "qty_ordered": 5,
            "received_qty": null,
            "sku": null,
            "total_cost": 9075,
            "user_id": "138944605333795140"
        }
    ],
    "shipping_address": {
        "address_1": "1/5642",
        "address_2": "",
        "city": "delhi",
        "country": "IN",
        "email": "",
        "first_name": "tim",
        "last_name": "",
        "phone": "",
        "state": "DL",
        "zipcode": ""
    },
    "shop": "143.244.133.144/wordpress",
    "status": "pending",
    "store_id": "418382994072378257",
    "total_cost": 14520,
    "updated_at": "2023-04-04T17:13:14",
    "user_id": "138944605333795140",
    "wh_id": ""
}
 */

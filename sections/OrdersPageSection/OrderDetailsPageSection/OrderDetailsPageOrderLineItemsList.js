import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails, updateOrderLineItem } from "../utils/orders.utils";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import RenderOrderStatus from "../components/OrdersPageTableComponents/RenderOrderStatus";
import { setOrderDetails } from "redux/orders/ordersSlice";
import { enqueueSnackbar } from "notistack";
import ButtonIconSecondary from "components/Common/Buttons/ButtonIconSecondary";
import IconButtonSecondary from "components/Common/Buttons/IconButtonSecondary";
import { ORDER_STATUS } from "../utils/orders.constants";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  order: orders.order,
  isLoading: orders.orderDetailsLoading,
});
export default function OrderDetailsPageOrderLineItemsList() {
  const { currentUser, order, isLoading } = useSelector(mapState);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const tableColumns = [
    {
      accessorKey: "product_title",
      Header: <span style={{ paddingLeft: "16px" }}> Item</span>,
      Cell: ({ cell }) => (
        <div style={{ paddingLeft: "16px" }}>
          <RenderProductDetails
            title={cell.row.original.product_title}
            display_image={cell.row.original.display_image}
            href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
          />
        </div>
      ),
      size: 500,
    },
    {
      accessorKey: "sku",
      header: "SKU",
      Cell: ({ cell }) => <>{cell.row.original.sku}</>,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      size: 180,
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => (
        <RenderOrderStatus status={cell.row.original.status} />
      ),
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      size: 120,
    },
    {
      accessorKey: "on_hand",
      header: "On Hand",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 80,
    },
    {
      accessorKey: "on_hand_locations",
      header: "Fulfillment Location",
      enableSorting: false,
      Cell: ({ cell }) => (
        <LocationSelectDropdown
          warehouse={cell.row.original.on_hand_locations}
          cell={cell}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          currentUser={currentUser}
          order={order}
        />
      ),
      size: 440,
      muiTableHeadCellProps: {
        align: "center",
      },
      // muiTableBodyCellProps: {
      // 	// align: "center",
      // },
    },
    {
      accessorKey: "qty_ordered",
      header: "Quantity",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 60,
    },
    // {
    //   accessorKey: "available",
    //   header: "Available",
    // },
    {
      accessorKey: "total_cost",
      // header: "Total",
      Header: <span style={{ paddingRight: "16px" }}>Total</span>,
      Cell: ({ cell }) => (
        <>
          {" "}
          <RenderCurrency
            value={cell.row.original.total_cost}
            currency={order.currency}
            sx={{ pr: 2 }}
          />
        </>
      ),
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 200,
    },
  ];
  // console.log({ products: order.products });
  if (isLoading)
    return (
      <Box>
        {" "}
        <Typography
          sx={{
            fontSize: "21px",
            my: 2,
            fontWeight: 600,
          }}
        >
          Order list
        </Typography>
        <PageSpinner spinnerStyles={{ height: "40vh" }} />
      </Box>
    );
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "21px",
          my: 2,
          fontWeight: 600,
        }}
      >
        Order list
      </Typography>
      <BluecomMRTBaseTable
        data={order.line_items}
        columnsData={tableColumns}
        muiTableBodyCellProps={{
          sx: {
            py: 2,
            px: 3,
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            // py: 2,
            px: 2,
          },
        }}
      />
    </Box>
  );
}

const LocationSelectDropdown = ({
  warehouse = [],
  cell,
  currentUser,
  order,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = React.useState(false);
  const dispatch = useDispatch();
  const selectedFulfilledLocation =
    (cell.row.original.fulfilled_location &&
      cell.row.original.fulfilled_location.wh_name &&
      cell.row.original.fulfilled_location.wh_id && {
        label:
          cell.row.original.fulfilled_location.wh_name &&
          cell.row.original.fulfilled_location.wh_name,
        value:
          cell.row.original.fulfilled_location.wh_id &&
          cell.row.original.fulfilled_location.wh_id,
      }) ||
    null;
  const [selectedLocation, setSelectedLocation] = React.useState(
    selectedFulfilledLocation || null
  );
  const warehouseOptions =
    (Array.isArray(warehouse) &&
      warehouse.length > 0 &&
      warehouse.map((warehouse) => ({
        label: `${warehouse.wh_name} - (${warehouse.available} On Hand Qty)`,
        value: warehouse.wh_id,
      }))) ||
    [];

  // console.log({
  // 	warehouseOptions,
  // 	cell: cell.row.original,
  // 	selectedFulfilledLocation,
  // });

  const handleFulfilledLocationUpdate = (location) => {
    const data = {
      user_id: currentUser.merchant_id,
      co_id: order.co_id,
      co_line_id: cell.row.original.co_line_id,
      co_order_line_id: cell.row.original.co_order_line_id,
      fulfilled_location: {
        wh_id: location.value,
        quantity: cell.row.original.qty_ordered,
      },
    };
    setIsLoading(true);
    updateOrderLineItem({ data })
      .then((json) => {
        // console.log({ json });

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

              setIsLoading(false);
              setIsEditingEnabled(false);
            })
            .catch((err) => {
              console.error({ err });
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        console.error({ err });
      });
    setSelectedLocation(location);
    // setTimeout(() => {}, 1000);
  };

  const handlePrimaryButtonClick = (e) => {
    // console.log({ selectedLocation });
    handleFulfilledLocationUpdate(selectedLocation);
  };
  const handleResetButtonClick = () => {
    // setSelectedLocation(null);
    setIsEditingEnabled(true);
  };

  // if (isLoading)
  // 	return (
  // 		<span
  // 			style={{
  // 				display: "flex",
  // 				justifyContent: "center",
  // 				alignItems: "center",
  // 			}}
  // 		>
  // 			<CircularProgress color="primary" thickness={4} size={24} />
  // 		</span>
  // 	);
  if (
    !isEditingEnabled &&
    cell.row.original.fulfilled_location &&
    cell.row.original.fulfilled_location.wh_name
  )
    return (
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "32px",
          // marginLeft: "48px",
          // marginRight: "16px",
        }}
      >
        <span
          style={{
            maxWidth: "300px",
            minWidth: "300px",
            overflow: order.status !== ORDER_STATUS.FULFILLED && "hidden",
          }}
          title={`${cell.row.original.fulfilled_location.wh_name} - (${cell.row.original.fulfilled_location.available} On Hand Qty)`}
        >
          {cell.row.original.fulfilled_location.wh_name} - (
          {cell.row.original.fulfilled_location.available} On Hand Qty){" "}
        </span>
        {/* order.status !== ORDER_STATUS.FULFILLED && */}
        {order.status !== ORDER_STATUS.FULFILLED && (
          <SecondaryButton
            loading={isLoading}
            onClick={handleResetButtonClick}
            disabled={!selectedLocation}
            size="small"
            sx={{
              ml: 1,
              // flex: 1,
              // width: "80px",
              height: "40px",
              borderRadius: "4px",
            }}
          >
            Reset
          </SecondaryButton>
        )}{" "}
      </div>
    );

  if (
    !isEditingEnabled &&
    Array.isArray(warehouseOptions) &&
    warehouseOptions.length === 0
  )
    return <span>No location available</span>;

  // if (warehouseOptions.length === 1)
  // 	return <span>{warehouseOptions[0].label}</span>;

  if (order.status !== ORDER_STATUS.FULFILLED)
    return (
      <div
        style={{
          overflow: "visible",
          display: "flex",
          paddingLeft: "32px",

          // marginLeft: "48px",
          // marginRight: "16px",
          // flex: 1,
          // justifyContent: "space-between",
        }}
      >
        <FormSelectInput
          options={warehouseOptions}
          placeholder="Choose Fulfillment Location"
          // paddingTop={0}
          noPadding
          value={selectedLocation}
          onChange={(e) => {
            // handleFulfilledLocationUpdate(e);
            setSelectedLocation(e);
            // cell.row.original.selectedLocation = e.target.value;
          }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (base) => ({
              ...base,
              paddingTop: "1px",
              paddingBottom: "1px",
            }),
          }}
          menuPortalTarget={document.body}
          isDisabled={isLoading}
          containerStyles={{
            maxWidth: "300px",
            minWidth: "300px",
            // flex: 0.7,
          }}
        />
        {/* <div style={{ flex: 0.2 }} /> */}

        <PrimaryButton
          size="small"
          sx={{
            ml: 1,
            // flex: 1,
            // width: "80px",
            height: "40px",
            borderRadius: "4px",
            // flex: 0.2,
            // maxWidth: "80px",
          }}
          // loading={isLoading}
          onClick={handlePrimaryButtonClick}
          disabled={!selectedLocation || isLoading}
        >
          {isLoading && (
            <Fade in={isLoading}>
              <CircularProgress thickness={4} size={20} sx={{ mr: 1 }} />
            </Fade>
          )}
          Save
        </PrimaryButton>
      </div>
    );
};

/**{
    "channel_item_id": "0",
    "channel_product_id": "0",
    "co_line_id": "985576667769850874",
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
} */

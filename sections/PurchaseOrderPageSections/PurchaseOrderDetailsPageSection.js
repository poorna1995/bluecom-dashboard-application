import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Skeleton,
} from "@mui/material";

import { Box } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import CalendarIcon from "components/Common/Icons/CalendarIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import WarehouseIcon from "components/Common/Icons/POicons/WarehouseIcon";
import TagIcon from "components/Common/Icons/TagIcon";
import EmptyState from "components/Common/EmptyState";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PURCHASE_ORDER, REPORT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";

import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";

import FormSelectInput from "components/Common/Inputs/SelectInput";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import { fetchPurchaseOrderDataStart } from "redux/purchaseOrders/purchaseOrdersSlice";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import DialogAsCaution from "components/Common/Dialog/DialogAsCaution";
import { useSnackbar } from "notistack";
import DrawerHeaderDropdownIcon from "components/Common/Icons/DrawerHeaderDropdownIcon";
import SuccessDialogForPO from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import TextInput from "components/Common/Inputs/TextInput";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { sumBy } from "lodash";
import DialogForClosedPO from "./components/DialogForClosedPO";

import RenderLinearProgressBar from "components/Common/Tables/RenderComponents/RenderLinearProgressBar";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import MoreOptionDialog from "./components/MoreOptionDialog";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import MoreOptionDialogForPO from "./components/MoreOptionDialogForPO";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";
import AppLink from "components/Common/AppLink";
import { MdArrowBack } from "react-icons/md";
import PODetailsPageMobileView from "./MobileViewComponents/PODetailsPageMobileView";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import MobileViewProductsListPagination from "sections/ProductsPageSection/components/MobileViewComponents/MobileViewProductsListPagination";
import RenderTableBodyCellText from "components/Common/Tables/RenderComponents/RenderTableBodyCellText";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";

const mapState = ({ user, purchaseOrdersData }) => ({
  currentUser: user.currentUser,
  purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
});

export default function PurchaseOrderDetailsPageSection() {
  const router = useRouter();
  const { currentPage } = router.query;
  const { currentUser, purchaseOrdersData } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();
  const { purchaseOrderId } = router.query;
  const [data, setData] = useState({});
  const [showMore, setShowMore] = useState(false);

  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const statusForUpdate = data.status;

  const [buttonStatus, setButtonStatus] = React.useState(statusForUpdate);
  const [enterReceivedQuantity, setEnterReceivedQuantity] = useState(false);
  const [tableItems, setTableItems] = useState([]);

  const handleClickEnterReceivedQuantity = () => {
    setEnterReceivedQuantity(true);
  };

  useEffect(() => {
    setButtonStatus(statusForUpdate);
  }, [statusForUpdate]);

  const open = Boolean(anchorEl);
  // const statusList = ["closed", "cancelled"];

  const statusList = [
    {
      label: "Close PO",
      value: "closed",
    },
    {
      label: "Cancel PO",
      value: "cancelled",
    },
  ];

  const filterStatusList = statusList.filter((item) => item);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (status) => {
    if (status !== undefined) {
      setAnchorEl(null);
      setButtonStatus(status);
      handleUpdateStatusDialogOpenStatus();
    }
    console.log(status);
    setAnchorEl(null);

    setButtonStatus(status);
  };
  const PO_DATA = data;
  console.log(PO_DATA);

  const handleStatusUpdate = () => {
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: purchaseOrderId,
      po_line_id: PO_DATA.po_line_id,

      status: buttonStatus,
    };
    console.log({ data }, "handleStatusUpdate");
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setButtonStatus(buttonStatus);
          enqueueSnackbar("Status Updated Successfully", {
            variant: "success",
          });
          handleFetchProducts();
        }

        console.log(json);
      })
      .catch((err) => console.error(err));
  };

  const handleFetchProducts = () => {
    // setIsLoading(true);
    setLoading(true);
    const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
    const data = {
      po_id: purchaseOrderId,
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        // setIsLoading(false);
        setLoading(false);
        if (json.status === "success") {
          let result = json.result[0];
          let products =
            (Array.isArray(result.products) && result.products) ?? [];
          setData(result);

          if (products.length > 0) {
            const mappedProducts = products.map((item) => {
              return {
                ...item,
                current_qty_received: 0,
              };
            });
            setTableItems(mappedProducts);
          }
        } else if (json.status === "failure") {
          enqueueSnackbar("Error While loading data", {
            variant: "error",
          });
        }

        console.log({ products: json });
      })
      .catch((err) => {
        enqueueSnackbar("Error While loading data", {
          variant: "error",
        });

        console.error(err);
      });
  };
  useEffect(() => {
    if (purchaseOrderId) {
      handleFetchProducts();
    }
  }, [purchaseOrderId]);
  console.log({ purchaseOrderId });

  console.log({ data });

  // const handleButtonForStatus = () => {
  //   const url = PURCHASE_ORDER.UPDATE_STATUS;
  //   const data = {
  //     po_id: purchaseOrderId,
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(url, data)
  //     .then((json) => {
  //       if (json.status === "success") {
  //         enqueueSnackbar("Status Updated Successfully", {
  //           variant: "success",
  //         });
  //         // handleFetchPOData();
  //         handleFetchProducts();
  //         router.push("/app/purchase-orders?tab=all");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  const [handleUpdateStatusDialogOpen, setHandleUpdateStatusDialogOpen] =
    useState(false);

  const handleUpdateStatusDialogClose = () => {
    setHandleUpdateStatusDialogOpen(false);
    // setButtonStatus(statusForUpdate);
  };

  const handleUpdateStatusDialogOpenStatus = () => {
    setHandleUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatusDialog = () => {
    handleStatusUpdate();

    handleUpdateStatusDialogClose();
  };

  const productsData =
    Array.isArray(data.products) &&
    data.products.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });
  function getStr1(str) {
    return str.length > 50 ? str.slice(0, 70) + ".." : str;
  }
  console.log({ productsData });

  const handleChangeQuantity = (e, key, value) => {
    console.log({ e, key, value, tableItems }, "onChange");

    const updatedItems =
      // Array.isArray(tableItems) &&
      tableItems.map((item) => {
        if (item.master_item_id === value) {
          return {
            ...item,
            // received_qty: Number(item.received_qty),
            // [key]: e.target.value,
            [key]: Number(e.target.value),
          };
        }
        return item;
      });
    setTableItems(updatedItems);
  };

  console.log({ tableItems });
  let progressCalculation = (value, total) => {
    if (!value) return 0;
    if ((value / total) * 100 >= 100) return 100;
    return (value / total) * 100;
  };
  let numberIsGreaterThanZero = (value) => {
    if (value > 0) {
      return true;
    }
    return false;
  };
  const columnsData = [
    // {
    // 	// To add a serial number in the table
    // 	field: "po_line_id",
    // 	headerName: "PO Line Id",

    // 	width: 200,
    // },

    {
      field: "product_title",
      accessorKey: "product_title",
      headerName: "Product Details",
      header: "Product Details",

      renderCell: (params) => (
        <RenderProductDetails
          title={`${params.row.product_title} - ${
            params.row.item_title ||
            params.row.options.map((item) => item.value).join(" / ")
          }`}
          barcode={params.row.barcode}
          display_image={params.row.display_image}
          href={`/app/products/${params.row.master_product_id}?tab=overview`}
          sku={params.row.product_sku}
          product_id={params.row.master_product_id}
          variant_title={params.row.item_title}
        />
      ),
      Cell: ({ cell }) => (
        <RenderProductDetails
          title={`${cell.row.original.product_title} - ${
            cell.row.original.item_title ||
            cell.row.original.options.map((item) => item.value).join(" / ")
          }`}
          display_image={cell.row.original.display_image}
          href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
          product_id={cell.row.original.master_product_id}
          variant_title={cell.row.original.item_title}
        />
      ),
      width: 440,
      size: 440,
      flex: 1,
    },
    {
      field: "received_qty",
      accessorKey: "received_qty",
      headerName: "Received/Ordered",
      header: "Received/Ordered",

      renderCell: (params) => (
        <RenderLinearProgressBar x={params.value} y={params.row.qty_ordered} />
      ),
      Cell: ({ cell }) => (
        <RenderLinearProgressBar
          x={cell.getValue()}
          y={cell.row.original.qty_ordered}
        />
      ),
      width: 180,
      headerAlign: "center",
      align: "center",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      field: "received_items",
      accessorKey: "received_items",
      headerName: "Recieved History",
      header: "Recieved History",
      renderCell: (params) => (
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {params.row.received_qty}
        </Typography>
      ),

      Cell: ({ cell }) => (
        <RenderTableBodyCellText>
          {cell.row.original.received_qty}
        </RenderTableBodyCellText>
      ),
      width: 161,
      size: 160,
      headerAlign: "right",
      align: "right",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },

      // valueGetter: (params) => params.row.received_qty,
    },
    {
      field: "remaining",
      accessorKey: "remaining",
      headerName: "Remaining",
      header: "Remaining",
      renderCell: (params) => (
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {numberIsGreaterThanZero(
            parseInt(params.row.qty_ordered - params.row.received_qty)
          )
            ? parseInt(params.row.qty_ordered - params.row.received_qty)
            : 0}
        </Typography>
      ),
      Cell: ({ cell }) => (
        <RenderTableBodyCellText>
          {numberIsGreaterThanZero(
            parseInt(
              cell.row.original.qty_ordered - cell.row.original.received_qty
            )
          )
            ? parseInt(
                cell.row.original.qty_ordered - cell.row.original.received_qty
              )
            : 0}
        </RenderTableBodyCellText>
      ),

      width: 110,
      size: 110,
      headerAlign: "right",
      align: "right",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },

      // valueGetter: (params) =>
      // 	numberIsGreaterThanZero(
      // 		parseInt(params.row.qty_ordered - params.row.received_qty),
      // 	)
      // 		? parseInt(params.row.qty_ordered - params.row.received_qty)
      // 		: 0,
    },

    {
      field: "item_unit_cost_price",
      accessorKey: "item_unit_cost_price",

      headerName: "Unit Price",
      header: "Unit Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {/* {params.row.symbol} {params.value} */}
          {/* {params.value?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })} */}
          {getCurrencyValue(params.value)}
        </Typography>
      ),
      Cell: ({ cell }) => (
        <RenderTableBodyCellText>
          {getCurrencyValue(cell.row.original.item_unit_cost_price)}
        </RenderTableBodyCellText>
      ),

      width: 110,
      size: 110,
      headerAlign: "right",
      align: "right",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },
    {
      field: "total_cost",
      accessorKey: "total_cost",
      headerName: "Total",
      header: "Total",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {/* {params.row.symbol} {params.value}
          {params.value?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })} */}
          {getCurrencyValue(params.value)}
        </Typography>
      ),
      Cell: ({ cell }) => (
        <RenderTableBodyCellText>
          {getCurrencyValue(cell.row.original.total_cost)}
        </RenderTableBodyCellText>
      ),
      headerAlign: "right",
      align: "right",
      width: 100,
      size: 100,
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },

    // { field: "action", headerName: "Action" },
  ];
  const editReceivedColumn = {
    field: "received",
    accessorKey: "received",
    headerName: "Received Qty",
    header: "Received Qty",
    renderCell: (params) => (
      <RenderTextInput
        type="number"
        value={params.row.current_qty_received}
        placeholder="Enter Qty"
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue < 0) {
            console.error("Number cannot be negative");
          } else {
            handleChangeQuantity(
              e,
              "current_qty_received",
              params.row.master_item_id
            );
          }
        }}
        sx={{
          input: {
            textAlign: "right",
            // borderRadius: "8px",
          },
        }}
      />
    ),
    Cell: ({ cell }) => (
      <RenderTextInput
        type="number"
        value={cell.row.original.current_qty_received}
        placeholder="Enter Qty"
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue < 0) {
            console.error("Number cannot be negative");
          }
          handleChangeQuantity(
            e,
            "current_qty_received",
            cell.row.original.master_item_id
          );
        }}
        sx={{
          input: {
            textAlign: "right",
            // borderRadius: "8px",
          },
        }}
      />
    ),

    width: 150,
    size: 150,
    headerAlign: "center",
    align: "center",
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
  };

  const columnsDataWithReceivedColumn = [...columnsData, editReceivedColumn];

  const createdAtDate = data && data.created_at && new Date(data.created_at);
  const formattedCreatedAtDate =
    createdAtDate && format(createdAtDate, "MMMM dd, yyyy");

  const expectedDate = data && data.promise_date && new Date(data.promise_date);
  const formattedExpectedDate =
    expectedDate && format(expectedDate, "MMMM dd, yyyy");

  // const text =
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis reprehenderit harum sapiente odio ab suscipit molestias nobis illo, fugiat veritatis. Reprehenderit quae aut, minus dolores iste nostrum hic eum tempora!";
  const text = (data && data.customer_notes) || "No Customer Notes Available";
  const pageData = data ?? {};
  const [file, setFile] = useState(null);

  // /

  /**address_1
address_2
address_id
city
contact_name
 country
email
end_date
operator_id
org_id
phone
start_date
state
updated_at
user_id
wh_id
wh_name
zipcode */

  const billingAddress =
    pageData &&
    pageData.warehouse &&
    `${pageData.wh_name}, ${pageData.warehouse.address_1}, ${pageData.warehouse.address_2}, ${pageData.warehouse.city}, ${pageData.warehouse.state}, ${pageData.warehouse.country}, ${pageData.warehouse.zipcode}`;

  const productsForPDF =
    Array.isArray(productsData) &&
    productsData.map((item) => {
      return {
        product: item.product_title,
        sku: item.sku,
        "unit cost": item.item_unit_cost_price,
        "order qty": item.qty_ordered,
        "total($)": `$ ${item.total_cost}`,
      };
    });

  const handleEmailButtonClick = () => {
    const URL = REPORT.CREATE_PDF;
    const data = {
      input_types: {
        vendor_name: pageData.vendor.company_name ?? "",
        shipping_address: billingAddress,
        po_id: purchaseOrderId,
        billing_address: billingAddress,
        table: [
          {
            output_list: productsForPDF,
            //  [
            // 	{
            // 		product:
            // 			"Samsung Galaxy S23 Plus 5G (Cream, 8GB, 256GB Storage, 5G, 108MP Camera, 6000mAh Battery)",
            // 		sku: "TEST_SKU",
            // 		"unit cost": "500",
            // 		"order qty": "100",
            // 		"total($)": "$55000",
            // 	},
            // 	{
            // 		product:
            // 			"Samsung Galaxy S22 Plus 5G (Cream, 8GB, 128GB Storage",
            // 		sku: "TEST_SKU",
            // 		"unit cost": "500",
            // 		"order qty": "100",
            // 		"total($)": "$55000",
            // 	},
            // ],
          },
        ],
        issue_date: formattedCreatedAtDate,
        // "01/01/2023",
        expected_date: formattedExpectedDate,
        sub_total: productsData.total_amount,
        tax: "0",
        total: productsData.total_amount,
        currency: "$",
      },
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log({ res });
        return res.blob();
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        window.open(downloadUrl);
        setFile(downloadUrl);
        console.log({ blob });
      });
  };

  const showLessButton = showMore && (
    <Button
      size="small"
      onClick={() => setShowMore(false)}
      sx={{
        ml: 2,
      }}
    >
      Show less
    </Button>
  );

  const PRODUCTS_TO_UPDATE =
    (Array.isArray(tableItems) &&
      tableItems.map((item) => {
        return {
          master_item_id: item.master_item_id,
          master_product_id: item.master_product_id,
          qty_ordered: item.qty_ordered,
          unit_cost: item.unit_cost,
          total_cost: item.total_cost,
          currency_id: item.currency_id,
          received_qty: Number(item.received_qty + item.current_qty_received),
        };
      })) ??
    [];

  console.log({ PRODUCTS_TO_UPDATE });

  const filteredTableItems =
    Array.isArray(tableItems) &&
    tableItems.filter((item) => {
      return (
        item.qty_ordered <=
        Number(item.received_qty + item.current_qty_received)
      );
    });
  console.log({ filteredTableItems });

  const [handleClosedPODialogOpen, setHandleClosedPODialogOpen] =
    useState(false);

  const handleSB = () => {
    setHandleClosedPODialogOpen(false);
  };

  const handleDialogOpenForClosed = () => {
    setHandleClosedPODialogOpen(true);
  };

  const handlePB = () => {
    handleUpdatePurchaseOrdertoClosed();
  };

  // const isFullyReceived = PRODUCTS_TO_UPDATE.every(
  //   (item) => item.received_qty >= item.qty_ordered
  // );
  // const checkforStatus = isFullyReceived
  //   ? handleDialogOpenForClosed()
  //   : "partially received";

  const isFullyReceived = PRODUCTS_TO_UPDATE.every(
    (item) => item.received_qty >= item.qty_ordered
  );
  // if (!isFullyReceived) {
  //   handleUpdatePurchaseOrder()

  // } else {
  //   // All items are fully received
  //   handleDialogOpenForClosed();
  // }

  const handleUpdatePurchaseOrder = () => {
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: purchaseOrderId,
      po_line_id: PO_DATA.po_line_id,
      products: PRODUCTS_TO_UPDATE,
      status: "partially received",
    };
    setLoading(true);
    console.log({ data }, "update data");
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          // setTableItems(json.result[0].products);
          enqueueSnackbar("Recieved Qty Updated Successfully");
          handleFetchProducts();
          setEnterReceivedQuantity(false);
        } else if (json.status === "failure") {
          enqueueSnackbar("Please Fill out all the fields", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });

        console.log(error);
      });
  };

  const handleUpdatePurchaseOrdertoClosed = () => {
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: purchaseOrderId,
      po_line_id: PO_DATA.po_line_id,
      products: PRODUCTS_TO_UPDATE,
      status: "closed",
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          // setTableItems(json.result[0].products);
          enqueueSnackbar("Purchase order received successfully");
          enqueueSnackbar("Status of your PO has been updated to Closed");
          handleFetchProducts();
          setEnterReceivedQuantity(false);
          setHandleClosedPODialogOpen(false);
        } else if (json.status === "failure") {
          enqueueSnackbar("Please Fill out all the fields", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdateButtonClick = () => {
    if (isFullyReceived) {
      handleDialogOpenForClosed();
    } else {
      handleUpdatePurchaseOrder();
    }
  };
  let totalOrderedQty = sumBy(tableItems, "qty_ordered");

  const productListData = updatePageData({
    currentPage,
    data: tableItems,
  });

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        {/* breadcrumbs for PurchaseOrder page */}

        {/* <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          // padding: "16px",
          ml: 2,
        }}
      >
        <AppLink
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "600",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          href="/app/purchase-orders"
        >
          Purchase Order
        </AppLink>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#222222",
            fontSize: "16px",
            fontWeight: "500",
          }}
          color="text.primary"
        >
          Purchase Order-Id: {data.po_id}
        </Typography>
      </Breadcrumbs> */}

        {/* {data.length > 0 && (
		<EmptyState
          text={"No Purchase Order Created"}
          bodyText={"You can add new purchase order by clicking below"}
        //   image={placeholder}
          />   
		  )}
		  {loading && <PageLoader/> } */}

        {/* <Box>
        <Breadcrumbs
          sx={{
            fontSize: "12px",
            padding: "20px",
          }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <HomeIcon />

          <AppLink
            href="/app/purchase-orders?tab=all"
            sx={{ color: "#1570EF", fontWeight: 400 }}
          >
            Purchase Orders List
          </AppLink>
     
          <Typography
            sx={{ fontSize: "12px" }}
          
            color="grey.400"
            fontWeight="400"
    
          >
            {data.po_id}
          </Typography>
        </Breadcrumbs>
      </Box> */}

        {/* <Divider /> */}

        <Box
          sx={{
            m: 2,
            position: "sticky",
            top: 110,
            zIndex: 100,
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={1.2} alignItems={"center"}>
            <Grid item xs={6} alignItems={"center"} display={"flex"}>
              <Box>
                <SectionTitleText
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    "& span": {
                      color: (theme) => theme.palette.text.heading,
                      marginRight: "10px",
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "4px",
                      marginRight: "10px",
                    }}
                    onClick={() => router.push("/app/purchase-orders?tab=all")}
                  >
                    <MdArrowBack />
                  </IconButton>{" "}
                  <span>{data.po_id}</span>
                </SectionTitleText>
              </Box>
              <Box
                sx={{
                  width: "fit-content",
                }}
              >
                <ChipForDifferentStatus status={data.status} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    // data.status !== "closed" && data.status !== "cancelled"
                    //   ? "space-between"
                    // :
                    "flex-end",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "grey.700",
                    display: "flex",
                  }}
                >
                  <span style={{ marginRight: "8px" }}>Date Created: </span>
                  {loading ? (
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.2rem",
                        minWidth: "100px",
                      }}
                    />
                  ) : (
                    <RenderDate date={data.created_at} />
                  )}
                </Typography>

                {data.status !== "closed" && data.status !== "cancelled" && (
                  <React.Fragment>
                    <OutlinedButton
                      sx={{
                        mx: 2,
                        // minWidth: "164px",
                        // width: "164px",
                      }}
                      id="basic-button"
                      // color="success"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      endIcon={<DrawerHeaderDropdownIcon />}
                    >
                      More Options
                      {/* {data.status} */}
                    </OutlinedButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      PaperProps={{
                        sx: {
                          boxShadow: "0px 0px 20px 3px rgba(52, 64, 84, 0.14)",
                        },
                      }}
                    >
                      {filterStatusList.map((item, index) => (
                        <MenuItem
                          disableRipple
                          sx={{
                            minWidth: "164px",
                            // width: "164px",
                            fontSize: "16px",
                            fontWeight: "500",
                            textTransform: "capitalize",

                            ml: "8px",
                            mr: "8px",
                            mb: "4px",
                            p: "8px 16px 8px 16px",
                            "&:hover": {
                              // color: (theme) => theme.palette.primary.main,
                              background: "#F5F4FD",
                              transition: "all 0.3s ease-in-out",
                              borderRadius: "7px",

                              color: "#4F44E0",
                            },
                            // ml: "16px",
                          }}
                          onClick={() => handleClose(item.value)}
                          key={index}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Menu>
                    <PrimaryButton
                      sx={
                        {
                          // minWidth: "200px",
                          // flex: 0.8,
                        }
                      }
                      onClick={() => handleClickEnterReceivedQuantity()}
                    >
                      Enter Received Quantity
                    </PrimaryButton>
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>

          <Divider
            variant="middle"
            sx={{
              mt: 2,
              ml: -1,
              mr: -1,
            }}
          />
        </Box>

        {/* <Divider variant="middle" /> */}

        {/* {productsData.length === 0 && (
		<EmptyState
          text={"No Purchase Order Created"}
          bodyText={"You can add new purchase order by clicking below"}
        //   image={placeholder}
          />   
		  )}
		  {loading && <PageLoader/> } */}

        {productsData.length === 0 && !loading && <EmptyState />}

        {loading && <PageLoader />}

        <Grid container spacing={2} p={2}>
          {[
            {
              icon: <WarehouseIcon />,
              title: "Vendor",
              onClick: () => {
                router.push(`/app/vendors/${data?.vendor_id}?tab=overview`);
              },

              value: data?.vendor_name ?? data?.vendor?.company_name,
            },
            {
              icon: <WarehouseIcon />,
              title: "Destination Location",
              value: data?.warehouse?.wh_name || "",

              description: `${data?.warehouse?.address_1}, ${data?.warehouse?.city}, ${data?.warehouse?.state}, ${data?.warehouse?.country}`,
            },
            {
              icon: <CalendarIcon />,
              title: "Expected Date",

              value: <RenderDate date={data.promise_date} />,
            },

            {
              icon: <TagIcon />,
              title: "Received Quantity",

              value: (
                <RenderLinearProgressBar
                  x={data.total_received_qty}
                  y={totalOrderedQty}
                />
              ),
            },
          ].map((item, index) => (
            <Grid item xs={3} key={index}>
              <BaseCard
                sx={{
                  display: "flex",
                  padding: "16px",

                  width: "calc(100% - 12px)",
                  height: "100px",

                  cursor: item.onClick ? "pointer" : "default",
                }}
                onClick={item.onClick}
              >
                <Box
                  sx={{
                    marginRight: "8px",
                    backgroundColor: "#FFFFFF",
                    maxHeight: "60px",
                    borderRadius: "11px",
                  }}
                >
                  {item.icon}
                </Box>
                <Box
                  sx={{
                    ml: 1,
                  }}
                >
                  <DescriptionText
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "grey.600",
                    }}
                  >
                    {item.title}
                  </DescriptionText>

                  {item.description ? (
                    <Tooltip title={item.description} placement="bottom" arrow>
                      <Typography
                        sx={{
                          // padding: "4px",
                          fontWeight: "700",
                          fontSize: "18px",
                          mt: 1,
                          color: (theme) => theme.palette.text.heading,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      sx={{
                        // padding: "4px",
                        fontWeight: "700",
                        fontSize: "18px",
                        mt: 1,
                        color: (theme) => theme.palette.text.heading,
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}

                  {/* <Typography
                  sx={{
                    // padding: "4px",
                    fontWeight: "700",
                    fontSize: "18px",
                    mt: 1,
                    color: (theme) => theme.palette.text.heading,
                  }}
                >
                  {item.value}
                </Typography> */}
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    flex: 0.8,
                  }}
                />
              </BaseCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ width: "50%" }}>
          <Typography sx={{ ml: 2, fontWeight: 600 }}> Notes: </Typography>
          <Typography sx={{ ml: 2, mt: 1, mb: 2 }}>
            {/* {displayedText}
          {!showMore && (
            <Button size="small" onClick={() => setShowMore(true)}>
              Read more
            </Button>
          )}
          {showLessButton} */}
            {text}

            {/* {text && text.length > 150 && (
            <React.Fragment>
              {!showMore && (

                <Button
                  size="small"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => setShowMore(true)}
                >
                  Read more
                </Button>
              )}
              {showLessButton}
            </React.Fragment>
          )} */}
          </Typography>
        </Box>

        <Divider variant="middle" />

        {/* {productsData.length > 0 && ( */}
        <Box sx={{ p: 2, pb: 8 }}>
          <BluecomMRTBaseTable
            // rowIdkey={"item_id"}
            data={tableItems}
            columnsData={
              enterReceivedQuantity
                ? columnsDataWithReceivedColumn
                : columnsData
            }
            checkboxSelection={false}
            // containerStyles={{
            // height: "auto",

            // height: enterReceivedQuantity
            // 	? "calc(100vh - 520px)"
            // 	: "calc(100vh - 360px)",
            // }}
            // hideFooter={tableItems.length < 2}
          />
        </Box>

        {enterReceivedQuantity && (
          <Box
            sx={{
              display: "flex",
              position: "fixed",
              bottom: "0",
              alignItems: "center",
              justifyContent: "center",
              width: "95%",
              borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,

              pt: "8px",

              pb: "8px",
              backgroundColor: "white",
            }}
          >
            <SecondaryButton
              sx={{
                mr: "16px",
                // flex: 0.1,
              }}
              onClick={() => setEnterReceivedQuantity(false)}
            >
              Discard
            </SecondaryButton>
            <PrimaryButton
              sx={
                {
                  // flex: 0.1,
                }
              }
              onClick={() => handleUpdateButtonClick()}
            >
              Update
            </PrimaryButton>
          </Box>
        )}
        <MoreOptionDialogForPO
          // icon={<AlertIconPO />}
          message="Please help us improve by selecting a reason."
          title={
            <div>
              Are you certain you want to{" "}
              {buttonStatus === "cancelled" && "cancel"}
              {buttonStatus === "closed" && "close"} this PO?
              <br />
              This action cannot be undone.
            </div>
          }
          open={handleUpdateStatusDialogOpen}
          onCancel={handleUpdateStatusDialogClose}
          onDelete={handleUpdateStatusDialog}
          primaryButtonName="Update"
          secondaryButtonName="Discard"
          primaryButtonColor="#D92D20"
        />

        <DialogForClosedPO
          open={handleClosedPODialogOpen}
          primaryButton={handlePB}
          secondaryButton={handleSB}
          title="All Variants Recieved "
          message="You have received all your items so your PO has been marked as Closed"
          primaryButtonName="Confirm"
          secondaryButtonName="Go Back"
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        <PODetailsPageMobileView
          text={text}
          data={data}
          totalOrderedQty={totalOrderedQty}
          orderProductsData={productListData}
          totalRows={tableItems.length}
          loading={loading}
        />
      </Box>
    </>
  );
}

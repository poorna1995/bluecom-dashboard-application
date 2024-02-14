import { Box, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { PURCHASE_ORDER, REPORT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import AppLink from "components/Common/AppLink";
import { orderBy } from "lodash";
import { format } from "date-fns";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import RenderLinearProgressBar from "components/Common/Tables/RenderComponents/RenderLinearProgressBar";
import PurchaseOrderES from "components/Common/Icons/EmptyStates/PurchaseOrderES";
import { resetPurchaseOrderOnboardingSteps } from "redux/onboarding/onboardingSlice";
import { resetPurchaseOrderData } from "redux/purchaseOrders/purchaseOrdersSlice";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import PDFicon from "components/Common/Icons/PDFicon";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import MobileViewListSkeleton from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListSkeleton";
import POListMobileView from "sections/PurchaseOrderPageSections/MobileViewComponents/POListMobileView";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
// import PrimaryButton from "components/Common/Buttons/PrimaryButton";
// import placeholder from "public/assets/placeholder/empty_state1.png";
// import placeholder from "./empty_state1.png";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function VendorDPPurchaseOrder() {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { currentPage } = router.query;
  const vendorId = router.query.vendorId;

  const fetchPurchaseOrderwithId = () => {
    const URL = PURCHASE_ORDER.FETCH_PURCHASE_ORDERS;
    setLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: vendorId,
      // po_id: po_id,
    };
    appFetch(URL, data)
      .then((json) => {
        // if (json.status === "success") {
        //   // setPoData(json.result[0]);
        //   const PO_DATA = json.result[0];
        //   handleCreatePdf(PO_DATA);
        // }
        console.log("json", json);
        setRowData(json.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPurchaseOrderwithId();
  }, []);

  const handlePdfDownload = (po_id) => {
    fetchPurchaseOrderwithId(po_id);
  };

  const handleCreatePdf = (PO_DATA) => {
    const URL = REPORT.CREATE_PDF;

    setLoading(true);
    const productsData =
      Array.isArray(PO_DATA.products) &&
      PO_DATA.products.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });

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

    const pageData = PO_DATA ?? {};
    const billingAddress =
      pageData &&
      pageData.warehouse &&
      `${pageData.wh_name}, ${pageData.warehouse.address_1}, ${pageData.warehouse.address_2}, ${pageData.warehouse.city}, ${pageData.warehouse.state}, ${pageData.warehouse.country}, ${pageData.warehouse.zipcode}`;

    // const formattedCreatedAtDate = formattedDate(pageData.created_at);
    // const formattedExpectedDate = formattedDate(pageData.promise_date);
    const data = {
      input_types: {
        vendor_name: pageData.vendor.company_name ?? "",
        shipping_address: billingAddress,
        po_id: pageData.po_id,
        billing_address: billingAddress,
        table: [
          {
            output_list: productsForPDF,
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
        setLoading(false);
        return res.blob();
      })
      .then((blob) => {
        setLoading(false);
        const downloadUrl = window.URL.createObjectURL(blob);
        console.log({ blob });

        return window.open(downloadUrl);
        // setFile(downloadUrl);
      })
      .catch((error) => {
        setLoading(false);
        console.error({ error });
      });
  };

  // const fetchUpdatePOService = (id, status) => {
  //   const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
  //   setLoading(true);
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //     purchase_order_id: id,
  //     status: status,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log("json", json);
  //       fetchPurchaseOrderwithId();
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   fetchUpdatePOService();
  // }, []);

  console.log("rowData", rowData);

  // const sortedData = orderBy(data, "created_at", "desc");
  // const filteredData =
  //   Array.isArray(sortedData) &&
  //   sortedData.filter((item) => {
  //     if (!productStatus) return item;
  //     if (item.status === productStatus) return item;
  //     // if (item.channel_name === channelName) return item;

  //     return;
  //   });
  const formattedTableData =
    Array.isArray(rowData) &&
    rowData.length > 0 &&
    rowData.map((item) => {
      const { created_at, updated_at, promise_date } = item;

      const updatedDate = (updated_at && new Date(updated_at)) || "";
      const formattedUpdatedDate =
        (updatedDate && format(updatedDate, "MMM dd, yyyy")) || "";

      const createdDate = (created_at && new Date(created_at)) || "";
      const formattedCreatedDate =
        (createdDate && format(createdDate, "MMM dd, yyyy")) || "";

      const expectedDate = (promise_date && new Date(promise_date)) || "";
      const formattedExpectedDate =
        (expectedDate && format(expectedDate, "MMM dd, yyyy")) || "";
      // console.log({ newLiveDate, master_product_id });
      return {
        ...item,
        created_at: formattedCreatedDate || "",
        updated_at: formattedUpdatedDate || "",
        promise_date: formattedExpectedDate || "",
      };
    });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "8px",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D9D9D9",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#0F955C",
    },
  }));

  const columnData = [
    {
      Header: "Order Id",
      accessorKey: "po_id",
      size: 100,
      headerName: "Order Id",
      field: "po_id",
      width: 120,
      Cell: ({ cell }) => (
        <AppLink
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.primary.main,
            "&:hover": {
              textDecoration: "underline",
              color: "#484A9E",
            },
          }}
          href={`/app/purchase-orders/${cell.getValue()}`}
        >
          {cell.getValue()}
        </AppLink>
      ),
    },
    {
      accessorKey: "status",
      Header: "Status",
      Cell: ({ cell }) => (
        <ChipForDifferentStatus
          sx={{
            width: "80%",
          }}
          status={cell.getValue()}
        />
      ),
      width: 200,
      valueGetter: ({ value }) => value,
      size: 80,
      headerAlign: "center",
      align: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "wh_name",
      Header: "Destination Location",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            ml: 1,
          }}
        >
          {cell.row.original.wh_name ?? "-"}
        </Typography>
      ),
      size: 70,
      headerAlign: "center",
      align: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    // {
    //   accessorKey: "total_received_qty",
    //   Header: "Received/ordered",
    //   width: 220,
    //   // flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   Cell: (cell) => (
    //     <RenderLinearProgressBar
    //       x={cell.value}
    //       y={cell.row.total_qty_ordered}
    //     />
    //   ),
    // },
    {
      accessorKey: "created_at",
      Header: "Created Date",
      Cell: ({ cell }) => (
        <RenderDate
          date={cell.row.original.created_at}
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        />
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "promise_date",
      Header: "Promise Date",
      Cell: ({ cell }) => (
        <RenderDate
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
          date={cell.row.original.promise_date ?? "-"}
        />
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },

    {
      accessorKey: "total_qty_ordered",
      Header: "Order Qty",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {getFormattedNumber(cell.getValue())}
        </Typography>
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "total_received_qty",
      Header: "Received Qty",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {getFormattedNumber(cell.getValue())}
        </Typography>
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },

    {
      accessorKey: "total_cost",
      Header: "Total Cost($)",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          $ {cell.row.original.total_cost}
        </Typography>
      ),
      size: 70,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    // {
    //   accessorKey: "pdf",
    //   Header: "PDF File",
    //   Cell: ({cell}) =>
    //     cell.row.status !== "draft" ? (
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           cursor: "pointer",
    //           ml: 1,
    //         }}
    //         onClick={() => handlePdfDownload(cell.row.original.po_id)}
    //       >
    //         <PDFicon />
    //         <Typography
    // sx={{
    // fontSize: "14px",
    // fontWeight: "500",
    // color: (theme) => theme.palette.text.primary
    //  }}
    // >
    //           {cell.row.po_id}.pdf
    //         </Typography>
    //       </Box>
    //     ) : null,

    //   width: 150,
    // },
    // {
    //   accessorKey: "Edit",
    //   Header: "Edit",
    //   width: 50,
    // },
  ];

  const handleClickCreateButton = () => {
    const URL = PURCHASE_ORDER.CREATE_PURCHASE_ORDER_ID;
    const data = {
      user_id: currentUser.merchant_id,
    };

    appFetch(URL, data)
      .then((json) => {
        dispatch(resetPurchaseOrderOnboardingSteps());
        dispatch(resetPurchaseOrderData());
        if (json.status === "success") {
          router.push(
            `/app/purchase-orders/create/${json.po_id}?step=po-details&id=0`
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const maxHeight = typeof window !== "undefined" && window.innerHeight - 365;

  const vendorPOListForMobile = updatePageData({
    currentPage,
    data: formattedTableData,
  });

  return (
    <>
      <Box>
        {rowData.length === 0 && !loading && (
          <EmptyState
            icon={<PurchaseOrderES />}
            text={"Create a Purchase Order for the Vendor"}
            bodyText={"Click Below to Get Started"}
            // image={placeholder}
          >
            <PrimaryButton
              // onClick={() => {
              // router.push("/app/purchase-orders?tab=all");
              // }}
              onClick={() => handleClickCreateButton()}
            >
              Create Purchase Order
            </PrimaryButton>
          </EmptyState>
        )}

        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          {loading && <PageLoader />}

          {rowData.length > 0 && (
            <BluecomMRTBaseTable
              rowHeight={60}
              rowIdkey="po_id"
              data={formattedTableData}
              columns={columnData}
              checkboxSelection={false}
              containerStyles={{ height: maxHeight }}
            />
          )}
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
          {loading ? (
            <MobileViewListSkeleton />
          ) : (
            <POListMobileView
              // loading={loading}
              data={vendorPOListForMobile}
              basePath={"/app/vendor/${vendor_id}?tab=purchase-orders"}
              totalCount={formattedTableData.length}
              shallUseRouter={true}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

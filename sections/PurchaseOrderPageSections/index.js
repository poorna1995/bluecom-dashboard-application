import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppLink from "components/Common/AppLink";
import EmptyState from "components/Common/EmptyState";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PURCHASE_ORDER, REPORT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import BaseCard from "components/Common/Cards/BaseCard";
import AllPOIcon from "components/Common/Icons/POicons/BaseCardPOIcons/AllPOIcon";
import WorksheetPOIcon from "components/Common/Icons/POicons/BaseCardPOIcons/WorksheetPOIcon";
import ActivePOIcon from "components/Common/Icons/POicons/BaseCardPOIcons/ActivePOIcon";
import PartiallyRecievedIconPO from "components/Common/Icons/POicons/BaseCardPOIcons/PartiallyRecievedIconPO";
import AddIcon from "components/Common/Icons/add";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";

import {
  resetPurchaseOrderOnboardingSteps,
  resetStore,
  resetVendorOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import PDFicon from "components/Common/Icons/PDFicon";
import formattedDate from "utils/dateUtils/formattedDate";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { resetPurchaseOrderData } from "redux/purchaseOrders/purchaseOrdersSlice";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";
import PurchaseOrderES from "components/Common/Icons/EmptyStates/PurchaseOrderES";
import POListMobileView from "./MobileViewComponents/POListMobileView";
import MobileViewListSkeleton from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListSkeleton";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import MobileViewListPagination from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListPagination";
import { getAddressList } from "constants/models/address";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const newDate = new Date();
const getTimeinMiliseconds = newDate.getTime();

const pageStyles = {
  desktopBoxStyles: {
    display: {
      xs: "none",
      sm: "none",
      md: "block",
    },
    // justifyContent: "flex-end",
    // paddingBottom: "8px",
  },
  mobileBoxStyles: {},
};

export default function PurchaseOrderPageSections() {
  const router = useRouter();
  const { currentPage } = router.query;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const handleFetchProducts = () => {
    // setIsLoading(true);
    setLoading(true);
    const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDERS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        // setIsLoading(false);
        setLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
        // setLoading(false);
      })
      .catch(
        (err) => console.error(err)
        // setLoading(false);
      );
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const productsData =
  //   Array.isArray(data.products) &&
  //   data.products.map((item, index) => {
  //     return {
  //       ...item,
  //       index: index + 1,
  //     };
  //   });

  // const data = PoData

  const formattedData =
    Array.isArray(data) &&
    data.map((item, index) => {
      const { created_at, products } = item;
      const { promise_date } = item;

      const createdAtDate = created_at && new Date(created_at);
      const promiseDate = promise_date && new Date(promise_date);

      const formattedCreatedAtDate =
        createdAtDate && format(createdAtDate, "MMMM dd, yyyy");
      const formattedPromiseDate =
        promiseDate && format(promiseDate, "MMMM dd, yyyy");

      return {
        ...item,
        created_at: formattedCreatedAtDate,
        promise_date: formattedPromiseDate,
        // products_count: Array.isArray(products) && products.length,
      };
    });

  const handleFetchPOProducts = (po_id) => {
    setPdfLoading(true);
    const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: po_id,
    };
    appFetch(url, data)
      .then((json) => {
        setPdfLoading(false);
        if (json.status === "success") {
          // setPoData(json.result[0]);
          const PO_DATA = json.result[0];
          handleCreatePdf(PO_DATA);
        }
        console.log({ products: json });
      })
      .catch((err) => {
        setPdfLoading(false);

        console.error(err);
      });
  };

  const handlePdfDownload = (po_id) => {
    handleFetchPOProducts(po_id);
  };

  const [file, setFile] = React.useState(null);

  const handleCreatePdf = (PO_DATA) => {
    const URL = REPORT.CREATE_PDF;

    setPdfLoading(true);
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
          "total($)": `$ ${getFormattedNumber(item.total_cost)}`,
        };
      });

    const pageData = PO_DATA ?? {};
    const formattedAddress =
      pageData &&
      pageData.warehouse &&
      getAddressList(pageData.warehouse)
        .map((item) => item)
        .join(", ");

    const billingAddress =
      pageData &&
      pageData.warehouse &&
      `${pageData.wh_name}, ${formattedAddress}
    `;
    const formattedCreatedAtDate = formattedDate(pageData.created_at);
    const formattedExpectedDate = formattedDate(pageData.promise_date);
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
        sub_total: `${getFormattedNumber(pageData.total_amount)}`,
        tax: "0",
        total: `${getFormattedNumber(pageData.total_amount)}`,
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
        setPdfLoading(false);
        const downloadUrl = window.URL.createObjectURL(blob);
        console.log({ blob, downloadUrl });
        setPdfLoading(false);

        window.open(downloadUrl, "_blank");
        setFile(downloadUrl);
      })
      .catch((error) => {
        setPdfLoading(false);
        console.error({ error });
      });
  };
  const handleClickDraftPO = (cell) => {
    if (cell.row.original.status === "draft") {
      dispatch(resetPurchaseOrderOnboardingSteps());
      dispatch(resetPurchaseOrderData());
    }
  };

  const columnsData = [
    // {
    // 	field: "po_line_id",
    // 	headerName: "PO Line Id",
    // 	renderCell: (params) => {
    // 		params.value;
    // 	},
    // 	minWidth: 220,
    // },
    {
      field: "po_id",
      accessorKey: "po_id",
      headerName: "PO ID",
      header: "PO ID",
      Cell: ({ cell }) => (
        <Box>
          <AppLink
            sx={{ fontSize: "14px", fontWeight: "500", ml: 1 }}
            href={
              cell.row.original.status === "draft"
                ? `/app/purchase-orders/create/${cell.getValue()}?step=po-details&id=0`
                : `/app/purchase-orders/${cell.getValue()}`
            }
            // onClick={() => handleClickDraftPO(params)}
            onClick={() => handleClickDraftPO(cell)}
          >
            {cell.getValue()}
          </AppLink>
        </Box>
      ),
      size: 120,
    },
    {
      field: "status",
      accessorKey: "status",
      headerName: "Status",
      header: "Status",
      // renderCell: (params) => <RenderStatus value={params.value} />,
      Cell: ({ cell }) => (
        <ChipForDifferentStatus
          // sx={{
          //   width: "80%",
          // }}
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
      field: "vendor_name",
      accessorKey: "vendor_name",
      headerName: "Vendor/Supplier",
      header: "Vendor/Supplier",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            ml: 1,
          }}
        >
          {cell.getValue()}
        </Typography>
      ),
      size: 180,
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
      field: "wh_name",
      accessorKey: "wh_name",
      headerName: "Destination Location",
      header: "Destination Location",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            ml: 1,
          }}
        >
          {cell.getValue()}
        </Typography>
      ),
      size: 200,
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
    // 	field: "product_count",
    // 	headerName: "Products",
    // 	minWidth: 120,
    // 	headerAlign: "center",
    // 	align: "center",
    // },
    {
      field: "created_at",
      accessorKey: "created_at",
      headerName: "Created Date",
      header: "Created Date",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            ml: 1,
          }}
        >
          <RenderDate date={cell.getValue()} />
        </Typography>
      ),
      size: 200,
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
      field: "promise_date",
      accessorKey: "promise_date",
      headerName: "Promise Date",
      header: "Promise Date",
      // renderCell: (params) => {
      // 	{
      // 		(params.value||"-");
      // 	}
      // },
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
            ml: 1,
          }}
        >
          <RenderDate date={cell.getValue()} />
        </Typography>
      ),
      size: 160,
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
      field: "total_qty_ordered",
      accessorKey: "total_qty_ordered",
      headerName: "Order Qty",
      header: "Order Qty",
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

      size: 120,
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
      field: "total_received_qty",
      accessorKey: "total_received_qty",
      headerName: "Received Qty",
      header: "Received Qty",
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
      size: 120,
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
      field: "total_cost",
      accessorKey: "total_cost",
      headerName: "Total Cost($)",
      header: "Total Cost($)",
      // renderCell: (params) => <span>$ {params.value}</span>,
      Cell: ({ cell }) => (
        <RenderCurrency
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
          value={cell.getValue() ?? 0}
        />
      ),
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      size: 140,
    },

    // {
    // 	field: "total_coset",
    // 	headerName: "Actions",
    // 	renderCell: (params) => (
    // 		<Box sx={{}}>
    // 			<Tooltip title="Edit">
    // 				<IconButton
    // 					onClick={() =>
    // 						router.push(
    // 							`/app/purchase-orders/${params.row.po_id}/edit`,
    // 						)
    // 					}
    // 				>
    // 					<EditIcon />
    // 				</IconButton>
    // 			</Tooltip>
    // 		</Box>
    // 	),
    // 	width: 120,
    // 	headerAlign: "center",
    // 	align: "center",
    // },
    {
      field: "pdf",
      accessorKey: "pdf",
      headerName: "PDF File",
      header: "PDF File",
      Cell: ({ cell }) =>
        cell.row.original.status !== "draft" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              ml: 4,
            }}
            // onClick={() => handlePdfDownload(params.row.po_id) console.log(params.row.po_id)}
            onClick={() => handlePdfDownload(cell.row.original.po_id)}
          >
            <PDFicon />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {cell.row.original.po_id}.pdf
            </Typography>
          </Box>
        ) : null,

      size: 150,
      headerAlign: "right",
      // align: "right",
      // muiTableBodyCellProps: {
      //   align: "right",
      // },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
  ];

  const allProducts = formattedData.length;
  const statusGroups = formattedData.reduce((groups, product) => {
    const status = product.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(product);
    return groups;
  }, {});

  const activeProducts = statusGroups["open"] || [];
  const draftProducts = statusGroups["draft"] || [];
  const partiallyReceivedProducts = statusGroups["partially received"] || [];
  const receivedProducts = statusGroups["received"] || [];
  const closedPO = statusGroups["closed"] || [];
  const completedProducts = statusGroups["completed"] || [];
  const cancelledPO = statusGroups["cancelled"] || [];
  const archivedProducts = statusGroups["archived"] || [];

  const allPOListForMobile = updatePageData({
    currentPage,
    data: formattedData,
  });

  const worksheetPOForMobile = updatePageData({
    currentPage,
    data: draftProducts,
  });

  const activePOForMobile = updatePageData({
    currentPage,
    data: activeProducts,
  });

  const partiallyReceivedPOForMobile = updatePageData({
    currentPage,
    data: partiallyReceivedProducts,
  });

  const closedPOForMobile = updatePageData({
    currentPage,
    data: closedPO,
  });

  const cancelledPOForMobile = updatePageData({
    currentPage,
    data: cancelledPO,
  });

  const tabsData = [
    {
      label: `All`,
      component: (
        <Box>
          {!loading && data.length === 0 && <EmptyState text={"No PO found"} />}

          <Box
            sx={{
              ...pageStyles.desktopBoxStyles,
            }}
          >
            <BluecomMRTBaseTable
              loading={loading}
              rowHeight={60}
              rowIdkey={"po_id"}
              data={formattedData}
              columns={columnsData}
              checkboxSelection={false}
              containerStyles={{
                height: "calc(100vh - 300px)",
              }}
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
            {loading ? (
              <MobileViewListSkeleton />
            ) : (
              <POListMobileView
                // loading={loading}
                data={allPOListForMobile}
                basePath={"/app/purchase-orders?tab=all&"}
                totalCount={formattedData.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "all",
    },

    {
      label: `Worksheet`,
      component: (
        <Box>
          {draftProducts.length === 0 && (
            <EmptyState
              icon={<PurchaseOrderES />}
              text={"No Active Purchase Orders in Worksheet"}
              bodyText={"Click Below to Create a New Purchase Order"}
            >
              <PrimaryButton
                // onClick={handleClickCreateButton}
                onClick={() => handleClickCreateButton()}
              >
                Create PO
              </PrimaryButton>
            </EmptyState>
          )}
          <Box
            sx={{
              ...pageStyles.desktopBoxStyles,
            }}
          >
            {draftProducts.length > 0 && (
              <BluecomMRTBaseTable
                rowHeight={60}
                rowIdkey={"po_id"}
                data={draftProducts}
                columns={columnsData}
                checkboxSelection={false}
                containerStyles={{
                  height: "calc(100vh - 300px)",
                }}
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
                data={worksheetPOForMobile}
                basePath={"/app/purchase-orders?tab=draft&"}
                totalCount={draftProducts.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "draft",
    },
    {
      label: `Active`,
      component: (
        <Box>
          {/* {loading && <PageLoader/> } */}
          {activeProducts.length === 0 && (
            <EmptyState
              icon={<PurchaseOrderES />}
              text={"No Active Purchase Orders"}
              bodyText={"Click Below to Create a New Purchase Order"}
            >
              <PrimaryButton
                // onClick={handleClickCreateButton}
                onClick={() => handleClickCreateButton()}
              >
                Create PO
              </PrimaryButton>
            </EmptyState>
          )}

          <Box
            sx={{
              ...pageStyles.desktopBoxStyles,
            }}
          >
            {activeProducts.length > 0 && (
              <BluecomMRTBaseTable
                rowHeight={60}
                rowIdkey={"po_id"}
                data={activeProducts}
                columns={columnsData}
                checkboxSelection={false}
                containerStyles={{
                  height: "calc(100vh - 300px)",
                }}
                hideFooter={activeProducts.length < 10}
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
                data={activePOForMobile}
                basePath={"/app/purchase-orders?tab=active&"}
                totalCount={activeProducts.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "active",
    },
    {
      label: `Partially Received`,
      component: (
        <Box>
          {partiallyReceivedProducts.length === 0 && (
            <EmptyState
              icon={<PurchaseOrderES />}
              text={"No Active Purchase Orders in Partially Received state"}
              bodyText={"Click Below to Create a New Purchase Order"}
            >
              <PrimaryButton
                // onClick={handleClickCreateButton}
                onClick={() => handleClickCreateButton()}
              >
                Create PO
              </PrimaryButton>
            </EmptyState>
          )}
          <Box sx={{ ...pageStyles.desktopBoxStyles }}>
            {partiallyReceivedProducts.length > 0 && (
              <BluecomMRTBaseTable
                rowHeight={60}
                rowIdkey={"po_id"}
                data={partiallyReceivedProducts}
                columns={columnsData}
                checkboxSelection={false}
                containerStyles={{
                  height: "calc(100vh - 300px)",
                }}
                hideFooter={partiallyReceivedProducts.length < 10}
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
                data={partiallyReceivedPOForMobile}
                basePath={"/app/purchase-orders?tab=partially-received&"}
                totalCount={partiallyReceivedProducts.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "partially-received",
    },
    {
      label: `Closed`,
      component: (
        <Box>
          {closedPO.length === 0 && (
            <EmptyState
              icon={<PurchaseOrderES />}
              text={"No Purchase Orders in Closed state"}
              bodyText={"Click Below to Create a New Purchase Order"}
            >
              <PrimaryButton
                // onClick={handleClickCreateButton}
                onClick={() => handleClickCreateButton()}
              >
                Create PO
              </PrimaryButton>
            </EmptyState>
          )}
          <Box
            sx={{
              ...pageStyles.desktopBoxStyles,
            }}
          >
            {closedPO.length > 0 && (
              <BluecomMRTBaseTable
                rowHeight={60}
                rowIdkey={"po_id"}
                data={closedPO}
                columns={columnsData}
                checkboxSelection={false}
                containerStyles={{
                  height: "calc(100vh - 300px)",
                }}
                hideFooter={closedPO.length < 10}
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
                data={closedPOForMobile}
                basePath={"/app/purchase-orders?tab=closed&"}
                totalCount={closedPO.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "closed",
    },
    {
      label: `Cancelled`,
      component: (
        <Box>
          {cancelledPO.length === 0 && (
            <EmptyState
              icon={<PurchaseOrderES />}
              text={"No Active Purchase Orders in Cancelled state "}
              bodyText={"Click Below to Create a New Purchase Order"}
            >
              <PrimaryButton
                // onClick={handleClickCreateButton}
                onClick={() => handleClickCreateButton()}
              >
                Create PO
              </PrimaryButton>
            </EmptyState>
          )}
          <Box
            sx={{
              ...pageStyles.desktopBoxStyles,
            }}
          >
            {cancelledPO.length > 0 && (
              <BluecomMRTBaseTable
                rowHeight={60}
                rowIdkey={"po_id"}
                data={cancelledPO}
                columns={columnsData}
                checkboxSelection={false}
                containerStyles={{
                  height: "calc(100vh - 300px)",
                }}
                hideFooter={cancelledPO.length < 10}
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
                data={cancelledPOForMobile}
                basePath={"/app/purchase-orders?tab=all&"}
                totalCount={cancelledPO.length}
                shallUseRouter={true}
              />
            )}
          </Box>
        </Box>
      ),
      route: "cancelled",
    },
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

  const cardsData = [
    {
      title: "All",
      description: allProducts,
      icon: <AllPOIcon />,
    },
    {
      title: "Worksheet",
      description: draftProducts.length,
      icon: <WorksheetPOIcon />,
    },
    {
      title: "Active",
      description: activeProducts.length || 0,
      icon: <ActivePOIcon />,
    },
    {
      title: "Partially Received",
      description: partiallyReceivedProducts.length || 0,
      icon: <PartiallyRecievedIconPO />,
    },
  ];

  const handleCreateVendorButton = () => {
    const time = new Date().getTime();
    dispatch(resetVendorOnboardingSteps());
    router.push(`/onboarding/vendors/${time}?step=general-info&id=0`);
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

  return (
    <>
      {/* {data.length === 0 && !loading && <EmptyState />} */}
      {/* {loading && <PageLoader />} */}

      {pdfLoading && <PageLoader />}
      {/* {data.length === 0 && !loading && (
        <SectionTitleText
          sx={{
            fontWeight: 700,
            fontSize: "28px",
            lineHeight: "34px",
            mt: "8px",
            mb: "12px",
            color: "#484A9E",
          }}
        >
          Purchase Order
        </SectionTitleText>
      )} */}
      {data.length === 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // mt: "24px",
            minHeight: "700px",
          }}
        >
          <NewEmptyState
            containerStyles={{
              maxWidth: "800px",
              maxHeight: "550px",
            }}
            icon={<PurchaseOrderES />}
            title="Purchase Order"
            titleDesc={
              "We don’t see purchase orders created using bluecom. Create your purchase order with bluecom. We recommend you to connect your store before creating purchase order"
            }
            note1={"Create Purchase Order"}
            ActionOne={"Create PO"}
            handleActionOne={() => handleClickCreateButton()}
            note2={"Add Vendor to bluecom"}
            ActionTwo={"Add Vendor"}
            handleActionTwo={() => handleCreateVendorButton()}
            note3={"Contact us to get help in onboarding"}
            ActionThree={"Contact Us"}
            handleActionThree={() =>
              handleClickWebsite("bluecom.ai/contact-us")
            }
          >
            {/* <PrimaryButton onClick={() => handleClickCreateButton()}>
            Create PO
          </PrimaryButton> */}
          </NewEmptyState>
        </Box>
      )}

      {loading && <PageSpinner />}

      {Array.isArray(data) && data.length > 0 && !loading && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              paddingTop: "8px",
              paddingX: "8px",
              paddingRight: "0px",
              position: { md: "sticky" },
              top: { md: "110px" },
              zIndex: "100",
              backgroundColor: "white",
            }}
          >
            <SectionTitleText
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "18px",
                  md: "28px",
                },
                fontWeight: "700",
                color: (theme) => theme.palette.text.auth,
              }}
            >
              Purchase Order{" "}
              <span
                style={{
                  color: "#535353",
                  // marginTop: "3px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#595959",
                  lineHeight: "40px",
                  // marginLeft: "4px",
                }}
              >
                ({formattedData.length})
              </span>
            </SectionTitleText>
            <PrimaryButton
              sx={{
                mr: {
                  xs: "8px",
                  sm: "8px",
                  md: "0",
                },
              }}
              // main_route
              onClick={() => handleClickCreateButton()}
              startIcon={<AddIcon />}
            >
              Create PO
            </PrimaryButton>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                md: "block",
              },
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                pl: { xs: "8px", sm: "8px", md: "0" },
                pr: { xs: "8px", sm: "8px", md: "0" },
                // flexDirection: "row",
                // overflowX: "auto",
                // overflowX: "scroll",
                // "&::-webkit-scrollbar": {
                //   display: "none",
                // },
                // flexWrap: "nowrap",
              }}
            >
              {cardsData.map((card, index) => (
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  key={index}
                  // sx={{
                  //   width: "100%",
                  //   // objectFit: "contain",
                  //   transition: "  transform 450ms",
                  //   // mr: "10px",
                  //   display: "flex",
                  //   flexDirection: "row",
                  //   overflowY: "hidden",
                  //   overflowX: "scroll",
                  //   "&::-webkit-scrollbar": {
                  //     display: "none",
                  //   },
                  // }}
                >
                  <BaseCard
                    sx={{
                      borderRadius: "10px",
                      mb: {
                        md: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        height: "120px",
                        flexDirection: "row",
                        pt: {
                          xs: "8px",
                          sm: "8px",
                          md: 4,
                        },
                        pl: {
                          xs: "8px",
                          sm: "8px",
                          md: 4,
                        },
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          ml: "12px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "18px",
                            },
                            fontWeight: "600",
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "21px",
                              sm: "21px",
                              md: "28px",
                            },
                            fontWeight: {
                              xs: "600",
                              sm: " 600",
                              md: "700",
                            },
                            paddingTop: "2px",
                          }}
                        >
                          {card.description}
                        </Typography>
                      </Box>
                    </Box>
                  </BaseCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              display: {
                xs: "flex",
                sm: "none",
                md: "none",
              },
              flexDirection: { xs: "row", md: "row" },
              overflowX: "auto",
              "::-webkit-scrollbar": { display: "none" },
              // "@media (max-width: 1023px)": {
              //   display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              paddingX: "16px",
              // },
              // "@media (min-width: 1024px)": {
              //   display: "none",
              // },
            }}
          >
            {cardsData.map((card, index) => (
              <Box key={index}>
                <BaseCard
                  sx={{
                    borderRadius: "10px",
                    // mb: 4,
                    // width: isSmallScreen ? "163px" : "auto",
                    width: "163px",
                    height: "100px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "100px",
                      flexDirection: "row",
                      pt: "8px",
                      px: "8px",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: "12px",
                        gap: "12px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "600",
                          // lineHeight: "20px",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "21px",
                          fontWeight: "600",
                          paddingTop: "2px",
                          // lineHeight: "20px",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </Box>
                  </Box>
                </BaseCard>
              </Box>
            ))}
          </Box>

          {/* <BaseCard sx={{ height: "100%", width: "100%" }}>
					<Typography>
						dtgdg
					</Typography>
				</BaseCard> */}
          <RouterTabs data={tabsData} basePath="/app/purchase-orders" />
        </>
      )}
    </>
  );
}

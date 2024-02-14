import { Box, Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPublishTaskID,
  setSelectedPublishableProducts,
} from "redux/products/productsSlice";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import PublishPageCard from "../components/PublishPageCard";
import PublishPageNavBar from "../components/PublishPageNavBar";
import CircleIcon from "@mui/icons-material/Circle";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { updateBulkProductPublishOnboardingSteps } from "redux/onboarding/onboardingSlice";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import EmptyState from "components/Common/EmptyState";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";

const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
});

export default function BulkProductPublishSelectProductsSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  const router = useRouter();
  const { pageView, currentUser, selectedProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const rowSelectionObject = selectedProducts.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: true,
    };
  }, {});

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const { currentPage } = router.query;
  console.log({ selectedProducts });
  const [totalCount, setTotalCount] = useState(0);
  const [rowSelection, setRowSelection] = useState(rowSelectionObject || {});

  useEffect(() => {
    setRowSelection(rowSelectionObject);
  }, [selectedProducts]);
  const selectedProductsId = Object.keys(rowSelection);
  console.log({ rowSelection, selectedProductsId });
  const handleFetchProductsCount = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
    const data = {
      user_id: currentUser.merchant_id,
    };

    setIsLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);

        if (json.status === "success") {
          setTotalCount(json.result);

          console.log({ json });
          handleFetchProducts();
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleFetchProducts = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
      // status: "unlisted",
      page: Number(currentPage) || 1,
      per_page: 10,
      status: ["active", "unlisted"],
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchProductsCount();
  }, [currentPage]);
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  useEffect(() => {
    dispatch(setPublishTaskID(""));
  }, []);
  // console.log({ channels });
  const formattedTableData =
    Array.isArray(data) &&
    data
      .filter((item) => {
        // if (item.status === "draft") return item;
        return item;
      })
      .map((item) => {
        const {
          display_image,
          channel_id,
          item_title,
          live_date,
          master_item_id,
          master_product_id,
          product_title,
          status,
          unit_retail_price,
        } = item;

        const mergedChannels = channels
          .map((channel) => {
            const channelFromAPI =
              Array.isArray(channel_id) &&
              channel_id.find((it) => it === channel.channel_id);
            if (channelFromAPI) {
              return {
                ...channel,
                ...channelFromAPI,
              };
            }
            // return channel;
          })
          .filter((item) => item);
        if (mergedChannels.length > 1) {
          console.log({ mergedChannels });
        }

        console.log({ mergedChannels });

        const getChannelName =
          (Array.isArray(mergedChannels) && mergedChannels[0]?.channel_name) ||
          "unlisted";
        console.log({ getChannelName });

        // const getChannelName = channels.filter((it) => {
        // 	if (it.channel_id === channel_id) return it.channel_name;
        // 	return;
        // });
        const newLiveDate = (live_date && new Date(live_date)) || "";
        const formattedLiveDate =
          (newLiveDate && format(newLiveDate, "dd/MM/yyyy, hh:mm a")) || "";
        // console.log({ getChannelName });
        return {
          ...item,
          Product: display_image,
          "Master Item Id": master_item_id,
          "Master Product Id": master_product_id,
          "Product Title": product_title,
          "Item Title": item_title,
          Status: status,
          "Channel Name": getChannelName,
          // Array.isArray(getChannelName) &&
          // getChannelName.length > 0 &&
          // getChannelName[0].channel_name,
          "Live Date": formattedLiveDate,
          "Unit Retail Price": unit_retail_price,
        };
      });

  function getStr1(str) {
    return str.length > 40 ? str.slice(0, 120) + ".." : str;
  }
  const ProductTableColumnData = [
    {
      field: "Product",
      accessorKey: "Product",
      header: "Product",
      headerName: "Product",
      // renderCell: (params) => (
      // 	<Box sx={{ display: "flex", alignItems: "center" }}>
      // 		<AppImage width="50" height="65" src={params.value} />
      // 		<Typography
      // 			sx={{
      // 				marginLeft: "12px",
      // 				fontWeight: "500",
      // 				fontSize: "14px",
      // 				color: "#313D4E",
      // 			}}
      // 		>
      // 			{params.row["Product Title"]}
      // 		</Typography>
      // 	</Box>
      // ),

      renderCell: (params) => (
        // <Box
        //   sx={{
        //     display: "flex",
        //     alignItems: "center",
        //     cursor: "pointer",
        //   }}
        // >
        //   <AppImage
        //     // sx prop to fit app image to a definite size
        //     sx={{ objectFit: "cover", borderRadius: "5px" }}
        //     width="45"
        //     height="45"
        //     src={params.value}
        //   />
        //   <Typography
        //     sx={{
        //       // maxWidth:"250px",
        //       marginLeft: "16px",
        //       fontWeight: "500",
        //       fontSize: "14px",
        //       lineHeight: "20px",
        //       color: (theme) => theme.palette.primary.main,
        //       // wordBreak: "break-word",
        //     }}
        //   >
        //     <>
        //       <Tooltip title={params.row["Product Title"]}>
        //         <span>{getStr1(params.row["Product Title"])}</span>
        //       </Tooltip>
        //     </>
        //   </Typography>
        // </Box>
        <RenderProductDetails
          href={`/app/products/${params.row.master_product_id}?tab=overview`}
          display_image={params.row.display_image}
          title={params.row["Product Title"]}
          sku={params.row.sku}
          product_id={params.row.master_product_id}
          barcode={params.row.product_barcode}
          openInNewTab={true}
        />
      ),
      Cell: ({ cell }) => (
        <RenderProductDetails
          href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
          display_image={cell.row.original.display_image}
          title={cell.row.original["Product Title"]}
          sku={cell.row.original.sku}
          product_id={cell.row.original.master_product_id}
          barcode={cell.row.original.product_barcode}
          openInNewTab={true}
        />
      ),
      // width: 400,
      size: 700,
      flex: 1,
      valueGetter: ({ value }) => value,
    },
    {
      field: "Channel Name",
      accessorKey: "Channel Name",
      header: "Channel Name",
      headerName: "Listing Channel",
      renderCell: (params) => (
        // <RenderChannelAsIcon
        //   value={params.value}
        //   channelList={params.row.channelList}
        // />
        <ChannelGroups
          channels={params.value}
          channelDetails={params.row.channels || []}
        />
      ),
      Cell: ({ cell }) => (
        // <RenderChannelAsIcon
        //   value={cell.getValue()}
        //   channelList={cell.row.original.channelList}
        // />

        <ChannelGroups
          // channels={cell.getValue()}
          channelDetails={cell.row.original.channels || []}
        />
      ),
      width: 160,
      size: 160,
      valueGetter: ({ value }) => value,
      headerAlign: "center",
      align: "center",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },

    // {
    // 	field: "Master Item Id",
    // 	headerName: "Master Item Id",
    // 	// renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
    // 	width: 180,
    // 	valueGetter: ({ value }) => value,
    // },
    // {
    //   field: "Master Product Id",
    //   headerName: "Master Product Id",
    //   // renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
    //   width: 180,
    //   valueGetter: ({ value }) => value,
    // },
    // {
    // 	field: "Product Title",
    // 	headerName: "Product ",
    // 	// renderCell: () => "Master Product Id",
    // 	width: 220,
    // 	valueGetter: ({ value }) => value,
    // },
    // {
    // 	field: "Item Title",
    // 	headerName: "Item Title",
    // 	// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
    // 	width: 120,
    // 	valueGetter: ({ value }) => value,
    // },
    // {
    //   field: "Status",
    //   headerName: "Status",
    //   // renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
    //   width: 100,
    //   valueGetter: ({ value }) => value,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value === "active" ? (
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           }}
    //         >
    //           <CircleIcon
    //             sx={{
    //               mr: "3px",
    //               color: "#12B76A",
    //               width: "6px",
    //               height: "8px",
    //             }}
    //           />
    //           <Typography
    //             sx={{
    //               fontSize: "14px",
    //               fontWeight: "600",
    //               color: "#12B76A",
    //               textTransform: "capitalize",
    //             }}
    //           >
    //             {params.value}
    //           </Typography>
    //         </Box>
    //       ) : (
    //         <Box sx={{ display: "flex", alignItems: "center" }}>
    //           <CircleIcon
    //             sx={{
    //               mr: "3px",
    //               color: "#F79009",
    //               width: "6px",
    //               height: "8px",
    //             }}
    //           />
    //           <Typography
    //             sx={{
    //               fontSize: "14px",
    //               fontWeight: "600",
    //               color: "#F79009",
    //               textTransform: "capitalize",
    //             }}
    //           >
    //             {params.value}
    //           </Typography>
    //         </Box>
    //       )}
    //     </div>
    //   ),
    // },
    {
      field: "status",
      accessorKey: "status",
      header: "Status",
      headerName: "Status",
      renderCell: (params) => <RenderStatusAsChip status={params.value} />,
      Cell: ({ cell }) => <RenderStatusAsChip status={cell.getValue()} />,

      width: 110,
      size: 110,
      valueGetter: ({ value }) => value,
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
      field: "total_qty",
      accessorKey: "total_qty",
      header: "Inventory",
      headerName: "Inventory",
      align: "right",
      headerAlign: "right",
      width: 110,
      size: 110,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {params.value}
        </Typography>
      ),
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {cell.getValue()}
        </Typography>
      ),
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },
    {
      field: "items_count",
      accessorKey: "items_count",
      header: "# of Variants",

      headerName: "# of Variants",
      align: "right",
      headerAlign: "right",
      width: 140,
      size: 140,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {params.value}
        </Typography>
      ),
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {cell.getValue()}
        </Typography>
      ),
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },
    {
      field: "Unit Retail Price",
      accessorKey: "item_unit_retail_price",
      header: "Retail Price",
      headerName: "Retail Price",
      // renderCell: (params) => <span>$ {params.value}</span>,
      renderCell: (params) => (
        <RenderCurrency
          value={params.row.item_unit_retail_price}
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        />
      ),
      Cell: ({ cell }) => (
        <RenderCurrency
          value={cell.getValue()}
          currency={cell.row.original.currency}
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
          }}
        />
      ),

      width: 120,

      size: 120,
      valueGetter: ({ value }) => value,
      headerAlign: "right",
      align: "right",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
    },
  ];
  const handleClickContinueButtonForSave = () => {
    const URL = PRODUCT.SAVE_REVIEW_CHANGES;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: master_product_id,
      publish: false,
      changes: false,
    };
  };
  const handleClickNextButton = () => {
    handleClickContinueButton();
    dispatch(
      updateBulkProductPublishOnboardingSteps({
        step: "select-products",
        nextStep: "review-products",
      })
    );
    dispatch(setSelectedPublishableProducts(selectedProductsId));
  };

  return (
    <Box sx={{ px: "8px" }}>
      {/* <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={pageLabel}
        disableContinueButton={selectedProducts.length === 0}
      /> */}
      {/* <PublishPageCard> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "14px",
          mt: "none",
        }}
      >
        <SectionTitleText
          sx={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#484A9E",
          }}
        >
          Select Products
        </SectionTitleText>
      </Box>
      {/* {isLoading && <PageSpinner />} */}
      {/* {Array.isArray(formattedTableData) &&
        formattedTableData.length > 0 &&
        !isLoading && ( */}
      <BluecomMRTBaseTable
        // rowIdkey={"master_product_id"}
        columnsData={ProductTableColumnData}
        data={formattedTableData}
        // onSelectionModelChange={(newSelectionModel) => {
        //   dispatch(setSelectedPublishableProducts(newSelectionModel));
        //   // setSelectedProducts(newSelectionModel);
        // }}
        // selectionModel={selectedProducts}
        // disableSelectionOnClick={true}
        basePath={`/app/products/publish/bulk?step=select-products&`}
        shallUseRouter={true}
        totalRows={totalCount}
        muiTableContainerProps={{
          sx: {
            // height: "calc(100vh - 260px)",
            height: "calc(100vh - 260px)",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            height: "60px",
          },
        }}
        state={{
          showSkeletons: isLoading,
          rowSelection: rowSelection,
        }}
        enableRowSelection={(row) => row.original.status !== "draft"}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.master_product_id}
        renderEmptyRowsFallback={() => (
          <EmptyState
            icon={<ProductEmptyState />}
            text={"No Variants Found!"}
            bodyText={
              "Please add products to the table using `Add Bundle Components` Button"
            }
          ></EmptyState>
        )}
      />

      {/* //// <MuiBaseDataGrid */}
      {/* //     rowIdkey={"master_product_id"}
        //     columnDefData={ProductTableColumnData}
        //     data={formattedTableData}
        //     onSelectionModelChange={(newSelectionModel) => {
        //       dispatch(setSelectedPublishableProducts(newSelectionModel));
        //       // setSelectedProducts(newSelectionModel);
        //     }}
        //     selectionModel={selectedProducts}
        //     disableSelectionOnClick={true}
        //     basePath={`/app/products/publish/bulk?step=select-products&`}
        //     shallUseRouter={true}
        //     totalRows={totalCount}
        //   /> */}
      {/* // )} */}

      {/* <PrimaryButton onClick={handleClickContinueButton} sx={{ mt: 2 }}>
          Continue
        </PrimaryButton> */}
      {/* </PublishPageCard> */}
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: "0",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          background: "white",
          borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
          padding: "8px",
          gap: "16px",
          ml: -20,
        }}
      >
        <SecondaryButton onClick={handleClickBackButton}>Back</SecondaryButton>
        <PrimaryButton
          disabled={selectedProductsId.length === 0}
          onClick={() => handleClickNextButton()}
        >
          Save & Continue
        </PrimaryButton>
      </Box>
    </Box>
  );
}

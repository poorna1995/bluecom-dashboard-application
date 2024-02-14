/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Fade,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import EmptyState from "components/Common/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import { BUNDLE, CHANNEL, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
// import AppPageSections from "sections/AppPageSections";
// import shopifyIcon from "public/assets/icons/shopify.svg";
import EditIcon from "components/Common/Icons/EditIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { orderBy } from "lodash";
import MenuforAction from "components/Common/Menus/IconMenu";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import { useSnackbar } from "notistack";
import MoreOptionDialog from "../PurchaseOrderPageSections/components/MoreOptionDialog";
import { MoreHoriz } from "@mui/icons-material";
import productsListTableColumnsData from "./constants/TableColumnsData/productsListTableColumnsData";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import AppPageSections from "sections/AppPageSections";
import {
  resetCreateBundleData,
  resetCreateProductData,
  setProductsList,
} from "redux/products/productsSlice";
import bluecomProductsListTableColumnsData from "./constants/TableColumnsData/bluecomProductListTableColumnData";
import MobileViewProductsPageSection from "./components/MobileViewComponents/MobileViewProductsPageSection";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import ButtonIconSecondary from "components/Common/Buttons/ButtonIconSecondary";
import EditIconPencile from "components/Common/Icons/EditIconPencile";
import {
  resetBundleOnboardingSteps,
  resetProductOnboardingSteps,
  resetStore,
} from "redux/onboarding/onboardingSlice";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
// const AppPageSections = dynamic(() => import("sections/AppPageSections"));

const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  productsList: productsData.productsList,
});

export default function ProductsPageSection() {
  const router = useRouter();
  const { productStatus, channelName, selectedProductType, currentPage } =
    router.query;
  const { pageView, currentUser, productsList } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteProductID, setDeleteProductID] = useState("");

  const handleChangeView = (value) => {
    // pageView === "grid" ? "list" : "grid"
    dispatch(setProductPageView(value));
  };
  const handleDeleteDialogOpen = (itemId) => {
    setOpenDialog(true);
    setDeleteProductID(itemId);

    // setTimeout(() => {
    //   setOpenDialog(true);
    //   setDeleteProductID(itemId);
    //   setLoading(false);
    // }, 500);
  };
  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setDeleteProductID("");
  };

  // const { data, isLoading } = useQuery({
  //  queryKey: ["products"],
  //  queryFn: () => {
  //      appFetch(PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST, {
  //          user_id: currentUser.merchant_id,
  //      }).then((json) => json.result);
  //  },
  // });
  const [totalCount, setTotalCount] = useState(0);
  const handleFetchProductsCount = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
    const data = {
      user_id: currentUser.merchant_id,
    };

    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setLoading(false);
          setTotalCount(json.result);

          console.log({ json });
          handleFetchProducts();
        }
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {});
  };

  const handleFetchProducts = () => {
    setLoading(true);
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
      per_page: 13,
      page: Number(currentPage && currentPage) || 1,
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          // setData(json.result);
          dispatch(setProductsList(json.result));

          // enqueueSnackbar("Fetched Product successfully", {
          //   variant: "success",
          // });
        }
        console.log({ products: json });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (!selectedProductType || currentPage) {
      handleFetchProductsCount();
      // handleFetchProducts();
    }
  }, [selectedProductType, currentPage]);

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

  console.log({ channels });
  const memoizedProductList = useMemo(() => productsList, [productsList]);
  // const sortedData = orderBy(memoizedProductList, "created_at", "desc");
  const filteredData =
    Array.isArray(memoizedProductList) &&
    memoizedProductList.filter((item) => {
      if (!productStatus) return item;
      if (item.status === productStatus) return item;
      // if (item.channel_name === channelName) return item;

      return;
    });
  const formattedTableData =
    Array.isArray(filteredData) &&
    filteredData.length > 0 &&
    filteredData.map((item) => {
      const {
        display_image,
        images,
        channel_id,
        item_title,
        master_item_id,
        master_product_id,
        product_title,
        status,
        unit_retail_price,
        created_at,
        // channels: channelsFromAPI,
      } = item;

      // console.log({ channelsFromAPI });

      // merge arrays channels and channelsFromAPI if channel_id is same
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
      // get the channel names for the product based on the channel_id from the channels array
      // const getNames =
      // 	Array.isArray(channel_id) &&
      // 	channel_id.filter((it) => {
      // 		const channelName = mergedChannels.find(
      // 			(item) => item.channel_id === it,
      // 		);
      // 		console.log({ channelName });
      // 		if (channelName.length > 0) return channelName.channel_name;
      // 		return;
      // 	});
      // console.log({ getNames });
      const getChannelName =
        (Array.isArray(mergedChannels) && mergedChannels[0]?.channel_name) ||
        "unlisted";
      console.log({ getChannelName });
      // 	Array.isArray(channel_id) &&
      // 	channel_id.filter((it) => {
      // 		if (it.channel_id === channel_id) return it.channel_name;
      // 		return;
      // 	});
      const newLiveDate = (item.live_date && new Date(item.live_date)) || "";
      const formattedLiveDate =
        (item.live_date &&
          newLiveDate &&
          format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
        "";
      const createdDate = (created_at && new Date(created_at)) || "";
      const formattedCreatedDate =
        (createdDate && format(createdDate, "dd/MM/yyyy, hh:mm a")) || "";
      // console.log({ newLiveDate, master_product_id });
      return {
        ...item,
        Product: display_image,
        ImageSlides: images,
        // && (
        //  <AppImage
        //      src={display_image}
        //      height="10"
        //      width="10"
        //      // sx={{ objectFit: "contain" }}
        //  />),
        // "Master Item Id": master_item_id,
        "Master Product Id": master_product_id,
        // && (
        //  <TableCellAppLink
        //      href={`/app/products/${master_product_id}?tab=overview`}
        //  >
        //      {" "}
        //      {master_product_id}
        //  </TableCellAppLink>
        // ),

        "Product Title": product_title,
        "Item Title": item_title,
        Status: status,
        "Channel Name": getChannelName,
        // Array.isArray(getChannelName) &&
        // getChannelName.length > 0 &&
        // getChannelName[0].channel_name,
        "Created At": formattedCreatedDate || "",
        "Unit Retail Price": unit_retail_price,
        channelList: mergedChannels,
      };
    });
  console.log({ formattedTableData });

  const gridData =
    Array.isArray(filteredData) &&
    filteredData.map((item) => {
      const { channel_id, created_at } = item;
      const getChannelName = channels.filter((it) => {
        if (it.channel_id === channel_id) return it.channel_name;
        return;
      });
      const newLiveDate = (item.live_date && new Date(item.live_date)) || "";
      const formattedLiveDate =
        (item.live_date &&
          newLiveDate &&
          format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
        "";
      const createdDate = (created_at && new Date(created_at)) || "";
      const formattedCreatedDate =
        (createdDate && format(createdDate, "dd/MM/yyyy, hh:mm a")) || "";

      // console.log({ getChannelName });
      return {
        ...item,
        "Channel Name":
          Array.isArray(getChannelName) &&
          getChannelName.length > 0 &&
          getChannelName[0].channel_name,
        "Live Date": formattedLiveDate,
        "Created At": formattedCreatedDate || "",
      };
    });

  // function getStr(str) {
  //  return str.slice(0, 15) + "...";
  // }

  function getStr1(str) {
    return str.length > 60 ? str.slice(0, 68) + ".." : str;
  }
  // function getWordStr(str) {
  //  return str.split(/\s+/).slice(0, 5).join(" ") + "...";
  // }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleDeleteProduct = (master_product_id) => {
    const URL = PRODUCT.MERCHANT.DELETE_PRODUCT;
    const data = {
      master_product_id: master_product_id,
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log({ json });
        // refetch();
        handleDeleteDialogClose();
        handleFetchProducts();
      }
    });
  };

  const ProductTableColumnData = [
    ...productsListTableColumnsData,

    {
      field: "master_product_id",
      headerName: "Action",
      renderCell: (params) => (
        <MenuforAction
          options={[
            {
              label: "Edit product",
              icon: (
                <IconButton>
                  <EditIcon />
                </IconButton>
              ),
              onClick: () => {
                router.push(
                  `/app/products/edit/${params.value}?tab=general-info`
                );
              },
            },
            // {
            //   label: "Copy product",
            //   icon: (
            //     <IconButton>
            //       <CloneIcon />
            //     </IconButton>
            //   ),
            //   onClick: () => {
            //     // Do something
            //   },
            // },
            {
              label: (
                <>
                  <Typography
                    sx={{
                      color: "#d92d20",
                    }}
                  >
                    Delete product
                  </Typography>
                </>
              ),
              icon: (
                <IconButton
                  sx={{
                    color: "#d92d20",
                    "& svg path": {
                      color: "#d92d20",
                      // fill: "#d92d20",
                      stroke: "#d92d20",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ),
              onClick: () => {
                handleDeleteDialogOpen(params.value);
              },
            },
          ]}
          buttonIcon={<MoreHoriz />}
        />
      ),
      width: 120,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
  ];
  const tableColumnsData = [
    ...bluecomProductsListTableColumnsData,

    {
      accessorKey: "actions",
      header: "Action",
      Cell: ({ cell }) => (
        // <MenuforAction
        //   options={[
        //     {
        //       label: "Edit product",
        //       icon: (
        //         <IconButton>
        //           <EditIcon />
        //         </IconButton>
        //       ),
        //       onClick: () => {
        //         router.push(
        //           `/app/products/edit/${cell.row.original.master_product_id}?tab=general-info`
        //         );
        //       },
        //     },
        //     {
        //       label: (
        //         <>
        //           <Typography
        //             sx={{
        //               color: "#d92d20",
        //             }}
        //           >
        //             Delete product
        //           </Typography>
        //         </>
        //       ),
        //       icon: (
        //         <IconButton
        //           sx={{
        //             color: "#d92d20",
        //             "& svg path": {
        //               color: "#d92d20",
        //               // fill: "#d92d20",
        //               stroke: "#d92d20",
        //             },
        //           }}
        //         >
        //           <DeleteIcon />
        //         </IconButton>
        //       ),
        //       onClick: () => {
        //         handleDeleteDialogOpen(cell.row.original.master_product_id);
        //       },
        //     },
        //   ]}
        //   buttonIcon={<MoreHoriz />}
        // />
        <ButtonIconSecondary
          size="small"
          onClick={() =>
            router.push(
              `/app/products/edit/${cell.row.original.master_product_id}?tab=general-info`
            )
          }
        >
          <EditIconPencile />
        </ButtonIconSecondary>
      ),
      size: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,
      muiTableBodyCellProps: {
        align: "center",
        // width: "20",
      },
      muiTableHeadCellProps: {
        align: "center",
        // width: "20",
      },
    },
  ];
  const handleCreateButtonClick = () => {
    dispatch(resetBundleOnboardingSteps());
    dispatch(resetProductOnboardingSteps());
    dispatch(resetCreateProductData());

    // dispatch(resetCreateBundleData());
    const time = new Date().getTime();
    // router.push(`/app/products/create`);
    router.push(`/app/products/create/product/${time}?step=general-info&id=0`);
  };

  const handlePublishButtonClick = () => {
    router.push(`/app/products/publish`);
  };

  const [bundleData, setBundleData] = useState([]);

  const handleFetchBundlesData = () => {
    const url = BUNDLE.FETCH_BUNDLE;
    const data = {
      user_id: currentUser.merchant_id,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          setBundleData(json.result);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (selectedProductType && selectedProductType === "bundle") {
      handleFetchBundlesData();
    }
  }, [selectedProductType]);

  const handleActionTwo = () => {
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

  // if (loading) {
  // 	return <PageSpinner />;
  // }

  if (!loading && Array.isArray(filteredData) && filteredData.length === 0) {
    return (
      <NewEmptyState
        hidePoints
        icon={<ProductEmptyState />}
        title="Manage Products with Bluecom"
        titleDesc={
          "We didn’t find products. Select a below recommended actions to manage products with bluecom."
        }
        note1={"Create a product with bluecom"}
        ActionOne={"Create Product"}
        handleActionOne={() => handleCreateButtonClick()}
        note2={"Connect your store with bluecom"}
        ActionTwo={"Connect Your Store"}
        handleActionTwo={() => handleActionTwo()}
        note3={"Contact us to get help in onboarding"}
        ActionThree={"Contact Us"}
        handleActionThree={() => handleClickWebsite("bluecom.ai/contact-us")}
      ></NewEmptyState>
    );
  }

  return (
    <Box
    //   sx={{ paddingBottom: "32px" }}
    >
      {/* {(formattedTableData.length === 0 || bundleData.length === 0) &&
        !loading && (
          <NewEmptyState
            hidePoints
            icon={<ProductEmptyState />}
            title="Manage Products with Bluecom"
            titleDesc={
              "We didn’t find products. Select a below recommended actions to manage products with bluecom."
            }
            note1={"Create a product with bluecom"}
            ActionOne={"Create Product"}
            handleActionOne={() => handleCreateButtonClick()}
            note2={"Connect your store with bluecom"}
            ActionTwo={"Connect Your Store"}
            handleActionTwo={() => handleActionTwo()}
            note3={"Contact us to get help in onboarding"}
            ActionThree={"Contact Us"}
            handleActionThree={() =>
              handleClickWebsite("bluecom.ai/contact-us")
            }
          ></NewEmptyState>
        )} */}
      {/* {loading && <PageSpinner />} */}
      {/* {Array.isArray(filteredData || bundleData) &&
				(filteredData.length > 0 || bundleData.length > 0) && ( */}
      {/* // !loading && */}

      {/* <Fade in={!loading} > */}
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <AppPageSections
          hidePublishButton
          hasStepOnboarding={true}
          title={selectedProductType === "bundle" ? `Bundles` : `Products`}
          // showFilters
          tableData={
            selectedProductType === "bundle" ? bundleData : formattedTableData
          }
          gridData={selectedProductType === "bundle" ? bundleData : gridData}
          views={["list", "grid"]}
          handleChangeView={handleChangeView}
          pageView={pageView}
          loading={loading}
          rowIdkey={"master_product_id"}
          columnData={tableColumnsData}
          handleCreateButtonClick={handleCreateButtonClick}
          handlePublishButtonClick={handlePublishButtonClick}
          hasCustomClickFunction={true}
          bundlesTableData={bundleData}
          showBundleViewButton={true}
          selectedProductType={selectedProductType && selectedProductType}
          handleFetchBundlesData={handleFetchBundlesData}
          totalCount={
            selectedProductType === "bundle" ? bundleData.length : totalCount
          }
          basePath={"/app/products?"}
          // renderEmptyRowsFallback={() => (
          //   <NewEmptyState
          //     hidePoints
          //     icon={<ProductEmptyState />}
          //     title="Manage Products with Bluecom"
          //     titleDesc={
          //       "We didn’t find products. Select a below recommended actions to manage products with bluecom."
          //     }
          //     note1={"Create a product with bluecom"}
          //     ActionOne={"Create Product"}
          //     handleActionOne={() => handleCreateButtonClick()}
          //     note2={"Connect your store with bluecom"}
          //     ActionTwo={"Connect Your Store"}
          //     handleActionTwo={() => handleActionTwo()}
          //     note3={"Contact us to get help in onboarding"}
          //     ActionThree={"Contact Us"}
          //     handleActionThree={() =>
          //       handleClickWebsite("bluecom.ai/contact-us")
          //     }
          //   >
          //     {/* <PrimaryButton onClick={() => handleCreateButtonClick()}>
          //       Create Product/Bundle
          //     </PrimaryButton> */}
          //   </NewEmptyState>
          // )}
        />
      </Box>
      {/* </Fade> */}

      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
            sm: "block",
          },
        }}
      >
        <MobileViewAppPageSection
          hasStepOnboarding={true}
          title={selectedProductType === "bundle" ? `Bundles` : `Products`}
          // showFilters
          tableData={
            selectedProductType === "bundle" ? bundleData : formattedTableData
          }
          gridData={selectedProductType === "bundle" ? bundleData : gridData}
          views={["list", "grid"]}
          handleChangeView={handleChangeView}
          pageView={pageView}
          loading={loading}
          rowIdkey={"master_product_id"}
          columnData={tableColumnsData}
          handleCreateButtonClick={handleCreateButtonClick}
          handlePublishButtonClick={handlePublishButtonClick}
          hasCustomClickFunction={true}
          bundlesTableData={bundleData}
          showBundleViewButton={true}
          selectedProductType={selectedProductType && selectedProductType}
          handleFetchBundlesData={handleFetchBundlesData}
          totalCount={
            selectedProductType === "bundle" ? bundleData.length : totalCount
          }
          basePath={"/app/products?"}
          renderEmptyRowsFallback={() => (
            <EmptyState
              icon={<ProductEmptyState />}
              text="Build Your Product"
              bodyText={"Click the button below to get started."}
            >
              {/* <PrimaryButton onClick={() => handleCreateButtonClick()}>
                Create Product/Bundle
              </PrimaryButton> */}
            </EmptyState>
          )}
        />
      </Box>
      <MoreOptionDialog
        icon={<AlertIconPO />}
        title={"Delete Product ?"}
        // message={
        //   "Are you sure you want to delete this Product? This action can't be undone"
        // }
        message={
          <div>
            Are you sure you want to delete this Product? <br />
            This action can't be undone
          </div>
        }
        open={openDialog}
        onCancel={() => handleDeleteDialogClose()}
        onDelete={() => {
          setOpenDialog(false);
          setLoading(true);

          // setTimeout(() => {
          handleDeleteProduct(deleteProductID);
          enqueueSnackbar("Product deleted successfully", {
            variant: "success",
          });

          // setLoading(false);
          // }, 2000);
        }}
        // primaryButtonProps={{
        //   sx: {
        //     ml: 2,
        //     flex: 2,
        //     backgroundColor: "#D92D20",
        //     "&:hover": {
        //       background: "#D92D20",
        //     },
        //   },
        // }}
        primaryButtonName="Delete"
        secondaryButtonName="Cancel"
        primaryButtonColor="#D92D20"
      />
    </Box>
  );
}

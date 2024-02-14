import {
  Box,
  Breadcrumbs,
  Button,
  MenuItem,
  Divider,
  Grid,
  Tabs,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import {
  BIG_COMMERCE,
  CHANNEL,
  SHOPIFY,
  THIRD_PARTY,
  WOOCOMMERCE,
} from "constants/API_URL";
import { groupBy } from "lodash";
import { useSnackbar } from "notistack";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BulletIcon from "components/Common/Icons/BulletIcon";
import HomeIcon from "components/Common/Icons/HomeIcon";
import NavigateNextIcon from "components/Common/Icons/NavigateNextIcon";
import EditInButtonIcon from "components/Common/Icons/EditInButtonIcon";
import SyncIcon from "components/Common/Icons/SyncIcon";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import InventoryForStore from "components/Common/Icons/StoresIcon/InventoryForStore";
import WarehouseForStore from "components/Common/Icons/StoresIcon/WarehouseForStore";
import ProductTag from "components/Common/Icons/StoresIcon/ProductTag";
import DrawerHeaderDropdownIcon from "components/Common/Icons/DrawerHeaderDropdownIcon";
import { CheckCircle, ErrorOutlineRounded, Menu } from "@mui/icons-material";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import { MdArrowBack } from "react-icons/md";
import { it } from "date-fns/locale";
import EyeIcon from "components/Common/Icons/StoresIcon/EyeIcon";
import StoreES from "components/Common/Icons/EmptyStates/StoreES";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import CheckIcon from "components/Common/Icons/VendorIcon/CheckIcon";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import CustomCircularProgress from "components/Common/Progress/CustomCircularProgress";
import { CircularProgress } from "@mui/material";
import useInterval from "customHooks/useInterval";
import MobileViewStoreDetailsPageHeader from "./MobileView/MobileViewStoreDetailsPageHeader";
import MobileVIewStoreDetailsList from "./MobileView/MobileVIewStoreDetailsList";

const buttonStyles = {
  textTransform: "capitalize",
  background: "#F7F7FD",
  color: "#2480EB",
};
const textStyles = {
  fontWeight: "600",
};
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function StoreDetailsPageSection() {
  const router = useRouter();
  const { storeId } = router.query;

  const { currentUser } = useSelector(mapState);
  const [appsData, setAppsData] = useState([]);
  const [appLineData, setAppLineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectedApps, setConnectedApps] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isResyncing, setIsResyncing] = useState(false);
  // const [syncLoading, setSyncLoading] = useState(
  //   Array.isArray(connectedApps) ? [...connectedApps] : []
  // );

  const { enqueueSnackbar } = useSnackbar();

  const open = Boolean(anchorEl);

  const handleFetchThirdPartyApps = () => {
    const url = THIRD_PARTY.FETCH_APPS;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppsData(json.result);
      })
      .catch((error) => console.log(error));
  };
  const handleFetchThirdPartyAppLine = () => {
    const url = THIRD_PARTY.FETCH_APPLINE;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppLineData(json.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleFetchThirdPartyApps();
    handleFetchThirdPartyAppLine();
    handleFetchConnectedApps({ setLoading });
  }, []);

  const handleFetchConnectedApps = ({ setLoading }) => {
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
      store_id: storeId,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          console.log(json);
          setConnectedApps(json.result);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log("check data", { connectedApps });

  const handleConnectStore = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  const tableData = [
    {
      API: <span style={textStyles}>Products</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
    {
      API: <span style={textStyles}>Vendors</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
    {
      API: <span style={textStyles}>Location</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
  ];

  const mapGridDataToAppsData =
    Array.isArray(appsData) &&
    appsData.map((item) => {
      const { channel_name, channel_category, channel_id } = item;
      // const getItemFromGrid = gridData.filter(
      // 	(it) => it.title === channel_name,
      // )[0];
      const getConnectedApp =
        Array.isArray(connectedApps) &&
        connectedApps.length > 0 &&
        connectedApps.filter((i) => i.channel_id === channel_id);
      const connectedStatus =
        Array.isArray(getConnectedApp) && getConnectedApp.length > 0;
      return {
        ...item,
        // ...getItemFromGrid,
        connectedStatus,
        connectedApps: getConnectedApp,
      };
    });
  // console.log({ connectedApps, appLineData, mapGridDataToAppsData });

  const cardsData = [
    {
      title: "Products",
      icon: <ProductTag />,
      // description: allProducts,
      description: 0,
    },
    {
      title: "Location",
      icon: <WarehouseForStore />,
      description: 1,
      // description: draftProducts.length,
    },
    {
      title: "Total Inventory",
      icon: <InventoryForStore />,
      description: 10550,
      // description: activeProducts.length || 0,
    },
  ];

  const tabsData = [
    {
      label: "Scope",
      component: (
        // <>
        //   {!connectedApps && <EmptyState text={"Data unavailable"} />}

        //   {Array.isArray(connectedApps) &&
        //     connectedApps.length > 0 &&
        //     connectedApps.map((item, index) => {
        //       if (item.store_id === storeId)
        //         return (
        //           <>
        //             {/* <BaseCard
        // 							key={index}
        // 							sx={{
        // 								marginTop: "16px",
        // 								maxWidth: "1400px",
        // 							}}
        // 						> */}
        //             <Box>
        //               {/* <SectionTitleText
        // 								sx={{ padding: "16px" }}
        // 							>
        // 								{item.shop}
        // 							</SectionTitleText> */}

        //               <Grid
        //                 container
        //                 sx={{
        //                   py: "16px",
        //                   backgroundColor: "#F9FAFB",
        //                 }}
        //               >
        //                 <Grid item xs={3.6} sx={{ pl: "46px" }}>
        //                   <SectionTitleText
        //                     sx={{
        //                       fontSize: "16px",
        //                     }}
        //                   >
        //                     {" "}
        //                     API{" "}
        //                   </SectionTitleText>
        //                 </Grid>
        //                 <Grid item xs={3.5}>
        //                   <SectionTitleText
        //                     sx={{
        //                       fontSize: "16px",
        //                     }}
        //                   >
        //                     {" "}
        //                     Last Updated{" "}
        //                   </SectionTitleText>
        //                 </Grid>
        //                 <Grid item xs={3.5}>
        //                   <SectionTitleText
        //                     sx={{
        //                       fontSize: "16px",
        //                     }}
        //                   >
        //                     {" "}
        //                     Status{" "}
        //                   </SectionTitleText>
        //                 </Grid>

        //                 <Grid item xs={1}>
        //                   <SectionTitleText
        //                     sx={{
        //                       fontSize: "16px",
        //                       paddingLeft: "28px",
        //                     }}
        //                   >
        //                     {" "}
        //                     Sync{" "}
        //                   </SectionTitleText>
        //                 </Grid>
        //               </Grid>

        //               {appLineData.map((item_data, id) => (
        //                 <>
        //                   <Grid
        //                     container
        //                     sx={{
        //                       paddingBottom: "16px",
        //                       paddingTop: "16px",
        //                       borderTop: "1px solid rgba(0,0,0,0.1)",
        //                     }}
        //                   >
        //                     <Grid
        //                       item
        //                       xs={3.6}
        //                       key={id}
        //                       sx={{
        //                         pl: "32px",
        //                       }}
        //                     >
        //                       <Typography
        //                         sx={{
        //                           fontSize: "16px",
        //                           fontWeight: "600",
        //                           color: "#222222",
        //                         }}
        //                       >
        //                         {item_data.fact_line_desc.split("_api")[0]}
        //                       </Typography>
        //                     </Grid>
        //                     <Grid item xs={3.5} key={id}>
        //                       <Typography
        //                         sx={{
        //                           fontSize: "16px",
        //                           fontWeight: "600",
        //                           color: "#222222",
        //                         }}
        //                       >
        //                         <RenderDate date={item.last_synced} />
        //                       </Typography>
        //                     </Grid>
        //                     <Grid item xs={3.5} key={id}></Grid>
        //                     <Grid item xs={1}>
        //                       <OutlinedButton
        //                         startIcon={<SyncIcon />}
        //                         onClick={() =>
        //                           handleSyncButtonClick(
        //                             item.shop,
        //                             item_data.fact_line_desc.split("_api")[0],
        //                             item.channel_name
        //                           )
        //                         }
        //                       >
        //                         Sync
        //                       </OutlinedButton>
        //                     </Grid>
        //                   </Grid>
        //                 </>
        //               ))}
        //             </Box>
        //           </>
        //         );
        //     })}
        // </>
        <EmptyState text={"Data unavailable"} />
      ),
      route: "scope",
    },
    {
      label: "Products",
      component: (
        <>
          <EmptyState text={"Activity Log data unavailable"} />
        </>
      ),
      route: "products",
    },
    {
      // label: "Warehouse",
      label: "Location",
      // component: (
      //   <Warehouse />
      // ),
      route: "warehouse",
    },
  ];

  const handleSyncButtonClick = (shop, apiName, channel_name, channel_id) => {
    let urlsObject = {
      "product api": {
        shopify: SHOPIFY.SYNC_PRODUCT,
        woocommerce: WOOCOMMERCE.SYNC_PRODUCT,
        bigcommerce: BIG_COMMERCE.SYNC_PRODUCTS,
      },
      warehouse: {
        shopify: SHOPIFY.WAREHOUSE_SYNC,
        woocommerce: "",
        bigcommerce: "",
      },
      vendor: {
        shopify: "",
        woocommerce: "",
        bigcommerce: "",
      },
      inventory: {
        shopify: SHOPIFY.SYNC_INVENTORY,
        woocommerce: WOOCOMMERCE.SYNC_INVENTORY,
        bigcommerce: "",
      },
    };
    let url = urlsObject[apiName][channel_name];
    const data = {
      user_id: currentUser.merchant_id,
      shop: shop,
    };
    setIsResyncing(true);
    appFetch(url, data)
      .then((json) => {
        setIsResyncing(false);
        if (json.status === "success") {
          enqueueSnackbar(json.message);
          handleFetchConnectedApps({ setLoading: setIsResyncing });
          // setSyncLoading((prevData) => {
          //   const newData = [...prevData];
          //   if (newData[channel_id]) {
          //     newData[channel_id] = {
          //       ...newData[channel_id],
          //       last_synced: meta_data?.last_synced || "",
          //       status: meta_data?.status || "",
          //     };
          //   }
          //   return newData;
          // });
        } else {
          enqueueSnackbar(json.message, { variant: "error" });
        }
      })
      .catch((error) => {
        setIsResyncing(false);
        console.error(error);
      })
      .finally(() => setIsResyncing(false));
  };

  const handleViewStoreButton = () => {
    window.open(connectedApps[0].store_url, "_blank");
    // window.open(data.store_url, "_blank");
  };

  const storeData =
    Array.isArray(connectedApps) &&
    connectedApps.find((item) => {
      if (item.store_id === storeId) {
        const { shop, last_synced, status, meta_data } = item;
        return {
          ...item,
          // shop,
          // last_synced: meta_data?.last_synced || "",
          // status: meta_data?.status || "",
        };
      }
    });

  console.log({ storeData });

  const appLineDataforTable =
    Array.isArray(appLineData) &&
    appLineData.map((item_data) => {
      const fact_line_desc =
        item_data && item_data.fact_line_desc ? item_data.fact_line_desc : "";
      return {
        "fact line desc": fact_line_desc.split("_api"),
      };
    });

  console.log({ appLineData });

  const mergeAppLineDataAndStoreData = () => {
    //  we have o merge the store.meta_data with the appLineData using the fact_line_id and app_line_id
    const mergeData =
      Array.isArray(storeData.meta_data) &&
      storeData.meta_data.map((item) => {
        const { app_line_id } = item;
        const apis =
          (Array.isArray(appLineData) &&
            appLineData.find((it) => it.fact_line_id === app_line_id)) ??
          {};
        return {
          ...item,
          ...apis,
        };
      });
    return mergeData ?? [];
  };
  console.log({
    mergeAppLineDataAndStoreData: mergeAppLineDataAndStoreData(),
  });
  const tableDataFromAPIs = mergeAppLineDataAndStoreData();

  const isCompleted = tableDataFromAPIs?.status === "success";
  const isInProgress = tableDataFromAPIs?.status === "in_progress";

  // useInterval(
  //   isCompleted || isInProgress
  //     ? () => {
  //         return;
  //       }
  //     : () => {
  //       // refetchData();
  //         // handleFetchConnectedApps({ setLoading: setIsResyncing });
  //       },
  //   1000
  // );

  const columnData = [
    {
      accessorKey: "fact line desc",
      headerName: "API",
      header: "API",
      // flex: 1,
      size: 400,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#222222",
          }}
        >
          {(cell.row.original.fact_line_desc &&
            cell.row.original.fact_line_desc.split("_api")[0]) ||
            ""}
        </Typography>
      ),
    },
    {
      accessorKey: "last_synced",
      header: "Last Updated",
      // flex: 1,
      size: 120,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#222222",
          }}
        >
          {/* {cell.row.original.connectedApps.last_synced || ""} */}
          <RenderDate date={cell.row.original.last_synced} />
        </Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (
        <>
          {" "}
          {cell.row.original.status === "in_progress" ? (
            <CircularProgress />
          ) : (
            <ChipForDifferentStatus status={cell.row.original.status} />
          )}
        </>
      ),
    },
    // {
    //   field: "percentage",
    //   accessorKey: "percentage",
    //   header: "Progress",
    //   headerName: "Progress",
    //   renderCell: (params) => (
    //     <div>
    //       {isCompleted || isFailed ? (
    //         <CustomCircularProgress progress={params.value} />
    //       ) : (
    //         <SectionLoader />
    //       )}
    //     </div>
    //   ),
    //   Cell: ({ cell }) => (
    //     <div>
    //       <CustomCircularProgress
    //         progress={cell.getValue()}
    //         isFailed={cell.row.original.status === "failure"}
    //       />
    //     </div>
    //   ),
    //   size: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   muiTableHeadCellProps: {
    //     align: "center",
    //   },
    //   muiTableBodyCellProps: {
    //     align: "center",
    //   },
    // },
    {
      accessorKey: "action",
      header: "Action",
      headerAlign: "center",
      align: "center",
      size: 160,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (
        <OutlinedButton
          sx={{
            color: "#1D2939",
            borderColor: "#D0D5DD",
          }}
          startIcon={<SyncIcon />}
          onClick={() =>
            handleSyncButtonClick(
              storeData.shop,
              cell.row.original.fact_line_desc.split("_api")[0],
              // cell.row.original.appLineData.map(
              //   (item, index) => item.fact_line_desc.split("_api")[0]
              // ),
              storeData.channel_name
              // cell.row.index
            )
          }
        >
          Sync
        </OutlinedButton>
      ),
    },
  ];

  // I have fetch shop name from the connected apps
  const storeName = storeData?.shop;
  // Array.isArray(connectedApps) && storeData[0]?.shop;

  console.log(appLineData, "appLineData", storeData, "storeData");

  return (
    <div>
      {/* {isLoading && <SectionLoader />} */}
      {/* {appsData.length === 0 && !loading && <EmptyState />} */}
      {isResyncing && <PageLoader />}

      {/* {!isLoading && ( */}

      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        {appsData.length > 0 && (
          <>
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
                <Grid item xs={6.6} alignItems={"center"} display={"flex"}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <IconButton
                      sx={{
                        border: "1px solid #E0E0E0",
                        borderRadius: "5px",
                        marginRight: "10px",
                        color: "#101828",
                      }}
                      onClick={() => router.push(`/home`)}
                    >
                      {/* <MdArrowBack /> */}
                      <KeyboardBackspaceIcon />
                    </IconButton>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // flexDirection: "column",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {loading ? (
                          <LoadingSkeleton />
                        ) : (
                          <SectionTitleText
                            sx={{
                              color: "#4F44E0",
                            }}
                          >
                            {storeName}
                            {/* {connectedApps.shop} */}
                          </SectionTitleText>
                        )}
                        <StatusAsChip
                          status={"Connected"}
                          marginTop={"0"}
                          lineHeight={"16px"}
                          paddingx={"10px"}
                        />
                      </Box>
                      <DescriptionText
                        style={{
                          display: "flex",
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "22px",
                          color: "#313131",
                        }}
                      >
                        Store ID : {storeId}
                      </DescriptionText>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5.4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <PrimaryButton
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                      "& svg path": {
                        color: "#ffffff",
                        fill: "#ffffff",
                        stroke: "1px #ffffff",
                      },
                    }}
                    onClick={() => handleViewStoreButton()}
                    startIcon={<EyeIcon fillColor={"#fff "} />}
                  >
                    View Store
                  </PrimaryButton>
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
            <BluecomMRTBaseTable
              muiTableBodyCellProps={{
                sx: {
                  height: "60px",
                },
              }}
              data={tableDataFromAPIs}
              columnsData={columnData}
              enableBottomToolbar={false}
              state={{ showSkeletons: loading }}
              // state={{ showSkeletons: loading && syncLoading }}
              renderEmptyRowsFallback={() => (
                <EmptyState icon={<StoreES />} text={"No Data Available"} />
              )}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
            sm: "block",
          },
        }}
      >
        <MobileViewStoreDetailsPageHeader
          storeName={storeName}
          loading={loading}
          storeId={storeId}
          handleViewStoreButton={handleViewStoreButton}
          router={router}
          status={storeData.status}
        />
        <MobileVIewStoreDetailsList
          data={tableDataFromAPIs}
          loading={loading}
          handleSyncButtonClick={handleSyncButtonClick}
          storeData={storeData}
        />
      </Box>
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      {/* <Skeleton
        variant="circular"
        height={"40px"}
        width={"300px"}
        sx={{ mr: 2 }}
      /> */}
      <Skeleton
        variant="rounded"
        height="30px"
        width={"200px"}
        // sx={{ mb: 1 }}
      />
    </Box>
  );
};

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useEffect, useRef, useState } from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// images
import { CHANNEL, INVENTORY, PRODUCT } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
import BaseCard from "components/Common/Cards/BaseCard";
import lodash from "lodash";
import RenderHTML from "components/Common/Typography/RenderHTML";
import EmptyState from "components/Common/EmptyState";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import TagPurpleIcon from "components/Common/Icons/TagPurpleIcon";
import InventoryIcon from "components/Common/Icons/InventoryIcon";
import TagChipComponent from "./components/TagChipComponent";
import TagEmptyStateIcon from "components/Common/Icons/TagEmptyStateIcon";
import CollectionChipComponent from "./components/CollectionChipComponent";
import ProductTypeChipComponent from "./components/ProductTypeChipComponent";
import { format } from "date-fns";
import GroupedVariantsTableForPDP from "./components/GroupedVariantsTableForPDP";
import VariantsGroupForPDP from "./components/VariantsGroupForPDP";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import BundleOverviewCard from "./BundleDetailsPageSections/BundleOverviewCard";
import DetailsPageSection from "sections/AppPageSections/AppDetailsPageSection/DetailsPageSection";
import CrossIcon from "components/Common/Icons/POicons/DialogIcons/CrossIcon";
import InventoryES from "components/Common/Icons/EmptyStates/InventoryES";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import ChannelList from "components/Common/ChannelList/ChannelList";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import DescriptionES from "components/Common/Icons/EmptyStates/DescriptionES";
import SlickSliderWithThumbnails from "components/Common/ImageSlider/SlickSliderWithThumbnails";
import ChannelES from "components/Common/Icons/EmptyStates/ChannelES";
import MobileDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection/components/MobileDetailsPageSection";
import InventoryForMobileView from "./components/MobileViewComponents/InventoryForMobileView";
import MobileViewInventoryLocationsDrawer from "sections/InventoryPageSection/components/MobileViewComponents/MobileViewInventoryLocationsDrawer";
import MobileViewInventoryInventoryDrawer from "./components/MobileViewComponents/MobileViewInventoryDrawer";
import ProductThumbnailsSlider from "./components/ProductThumbnailsSlider";
import VariantsMobileView from "./components/MobileViewComponents/VariantsMobileView";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import VarientsES from "components/Common/Icons/EmptyStates/VarientsES";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ProductsDetailsPageSection({ isUsedOnReviewPage }) {
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const { productId } = router.query;

  const [data, setData] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    setIsProductsLoading(true);
    if (productId) handleFetchProductDetails();
  }, [productId]);

  //   const productIdFromRoute=productId

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleOpenDialog = (e, item_id) => {
    e.preventDefault();

    setOpenDialog(true);

    setSelectedItemId(item_id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const FETCH_PRODUCT_URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
  const dataForFetchingProducts = {
    user_id: currentUser.merchant_id,
    master_product_id: productId,
  };

  // const { data: productData, isLoading: isProductsLoading } = useQuery({
  // 	queryKey: ["productDetailsData", "productId"],
  // 	queryFn: () =>
  // 		appFetch(FETCH_PRODUCT_URL, {
  // 			user_id: currentUser.merchant_id,
  // 			master_product_id: productId,
  // 		}).then((json) => json.result[0]),
  // 	enabled: !!productId,
  // });

  // const data = productData || {};
  // const itemsData = productData?.items || [];

  const handleFetchProductDetails = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    // setIsLoading(true);
    setIsProductsLoading(true);
    appFetch(URL, data)
      .then((json) => {
        // setIsLoading(false);
        setIsProductsLoading(false);
        if (json.status === "success") {
          setData(json.result[0]);
          setItemsData(json.result[0].items);
        }
      })
      .catch((error) => {
        setIsProductsLoading(false);
        // setIsLoading(false);
        console.log(error);
      });
  };

  console.log({ data });
  /**
	 * {
    "barcode": "",
    "channel_id": 1,
    "display_image": "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6.webp?v=1674642278",
    "images": [
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6.webp?v=1674642278",
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6_501a718c-34c8-45f9-a79e-b03749c548c8.webp?v=1674642286",
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_ab2295a0-333d-45ef-8bd5-91fb9f537a22.webp?v=1674642286"
    ],
    "item_desc": "",
    "item_title": "Default Title",
    "live_date": "2023-01-09T05:27:26-05:00",
    "master_item_id": "44320351355162",
    "master_product_id": "8071078904090",
    "product_desc": "",
    "product_title": "90s Baggy High Jeans",
    "status": "active",
    "unit_retail_price": "2500.00",
    "user_id": "138940023846722390"
}
	 */
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    console.log("called 		handleFetchChannels");
    setIsLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setChannels(json.result);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  console.log("check status", { channels });

  const getChannels = channels.filter((it) => {
    // get the channels using the channel_id item

    if (
      data &&
      it.channel_id === (Array.isArray(data.channel_id) && data.channel_id[0])
    )
      return it.channel_name;
    return;
  });

  const getChannelsData = getChannels.map((item) => {
    const { channel_id, channel_name } = item;
    return {
      "Channel Id": data.channel_id,
      "Channels Icon": data.channels,
      "Channel Name": data.channel_name,
    };
  });
  console.log({ getChannelsData, getChannels });

  const channelsData = getChannelsData;
  const filterChannelsData =
    Array.isArray(channelsData) &&
    channelsData.filter((it) => it["Channel Name"] !== "native");

  // const columnForChannel = [
  // {
  //   field: "Channels Icon",
  //   headerName: "#Listings",
  //   renderCell: (params) => (
  //     <ChannelGroups channelDetails={params.row["Channels Icon"]} />
  //   ),
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 1,
  // },
  // {
  //   field: "Channel Icon",
  //   headerName: "Channel Name",
  //   renderCell: (params) => (

  //     ),
  //     flex: 1,
  //     sortable: false,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  // ];

  const getItemData = lodash.groupBy(itemsData, "master_product_id");
  const itemsList =
    Array.isArray(itemsData) &&
    itemsData.map((item) => {
      const { item_title, item_desc, unit_retail_price, options } = item;
      const items =
        (Array.isArray(options) && options.map((it) => it.value)) ?? [];
      const title = items.join(" / ");
      return {
        "Item title": title,
        // "Item Description": item_desc,
        "Unit Retail Price": unit_retail_price,
      };
    });
  console.log({ itemsData });
  const itemData = itemsList;

  console.log({
    itemData,
  });
  const columnForItem = [
    {
      field: "Item title",
      headerName: "Title",
      // width: 215,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Unit Retail Price",
      headerName: "Unit Retail Price",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const uniqValues = new Set(inventoryData);
  const uniqValueArray = new Array(uniqValues);
  // const groupBy
  const {
    data: inventories,
    isLoading: isInventoryLoading,
    refetch,
  } = useQuery({
    queryKey: ["inventory", productId],
    queryFn: () =>
      appFetch(PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT, {
        user_id: currentUser.merchant_id,
        master_product_id: productId,
      }).then((json) => json.result),
    enabled: !!productId,
  });

  const handleSyncInventory = () => {
    const URL = INVENTORY.SYNC_INVENTORY;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log({ inventories });

  const inventoryDat =
    Array.isArray(inventories) &&
    inventories
      .map((item) => {
        const {
          // item_title,
          // item_desc,
          unit_retail_price,
          display_image,
          item_title,
          // available,
          // wh_name,
          options,
          inventory,
        } = item;
        const data = inventory.map((it) => {
          const { available, wh_id, wh_name } = it;
          const title = options.join(" / ");

          return {
            wh_name,
            wh_id,
            display_image,
            title,
            available,
            item_title,

            // Incoming: options,
          };
        });

        console.log({ data });

        return data;
        // {

        // 	// "Item title": item_title,
        // 	// "Item Description": item_desc,
        // 	// "Unit Retail Price": unit_retail_price,
        // };
      })
      .flat();

  const getTableItemsWithInventory = (inventories) => {
    const getSum =
      Array.isArray(inventories) &&
      inventories.map((item) => {
        const { inventory } = item;
        const sum = inventory.reduce((acc, it) => {
          const { available } = it;
          return acc + available;
        }, 0);
        const count = inventory.length;

        return {
          ...item,
          total: sum,
          // sum && count && `${sum} available at ${count} locations`,
        };
      });
    return getSum;
  };
  const tableList = getTableItemsWithInventory(inventories);

  const totalInventoryAvailable =
    Array.isArray(tableList) &&
    tableList.reduce((acc, item) => {
      const { total } = item;
      return acc + total;
    }, 0);

  console.log({ totalInventoryAvailable });
  console.log({ tableList });

  const getdat =
    Array.isArray(inventories) &&
    inventories
      .map((item) => {
        const { inventory } = item;
        if (item.master_item_id === selectedItemId) {
          const data = inventory.map((it) => {
            const { available, wh_id, wh_name } = it;
            return {
              //  ...item,
              wh_name,
              wh_id,
              available,
            };
          });
          return data;
        }
        return;
      })
      .filter((item) => item !== undefined)
      .flat();
  console.log({ getdat });

  const columnsForInventoryTable = [
    {
      field: "display_image",
      accessorKey: "display_image",
      header: "Image",
      headerName: "Image",
      Cell: ({ cell }) => (
        <AppImage
          src={cell.getValue()}
          width="40"
          height="40"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        />
      ),
      renderCell: (params) => (
        <AppImage
          src={params.value}
          width="40"
          height="40"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}

          // onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
      size: 50,
    },
    {
      field: "item_title",
      accessorKey: "item_title",
      header: "Variant Name",
      headerName: "Variant Name",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            ml: 1,
          }}
        >
          {cell.getValue() !== ""
            ? cell.getValue()
            : cell.row.original.options.map((item) => item.value).join(" / ")}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            // ml: 1,
          }}
        >
          {console.log(params.row.options, "row")}
          {params.value !== ""
            ? params.value
            : params.row.options.map((item) => item.value).join(" / ")}
        </Typography>
      ),

      flex: 1,
      size: 140,
    },
    {
      field: "inventory",
      accessorKey: "inventory",
      header: "Inventory",
      headerName: "Inventory",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            ml: 1,
          }}
        >
          {
            cell.row.original.total
            //  getValue() ?? cell.row.original.available
          }
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            ml: 1,
          }}
        >
          {params.row.total}
        </Typography>
      ),
      flex: 1,
      align: "right",
      headerAlign: "right",
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
      size: 60,
    },
    // {
    // 	field: "available",
    // 	headerName: "Available Qty",
    // 	renderCell: (params) => (
    // 		<Typography>{params.row.available}</Typography>
    // 	),
    // 	flex: 1,
    // },
    {
      field: "action",
      accessorKey: "action",
      header: "Action",
      headerName: "Action",
      Cell: ({ cell }) => (
        <Button
          sx={{
            textTransform: "capitalize",
            fontWeight: "14px",
          }}
          onClick={(e) => handleOpenDialog(e, cell.row.original.master_item_id)}
        >
          {" "}
          View Inventory
        </Button>
      ),
      renderCell: (params) => (
        <Button
          sx={{
            textTransform: "capitalize",
          }}
          onClick={(e) => handleOpenDialog(e, params.row.master_item_id)}
        >
          View Inventory
        </Button>
      ),
      headerAlign: "center",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      align: "center",
      width: 140,
      size: 100,
    },
  ];

  console.log({ itemsData, getItemData });
  console.log("**InventoryData", { inventoryData });

  const columnsForInventoryTablePopUp = [
    {
      accessorKey: "wh_name",
      field: "wh_name",
      header: "Location",
      headerName: "Location",
      Cell: ({ cell }) => (
        <Typography
          sx={
            {
              // fontSize: "15px",
              // fontWeight: "500",
              // textTransform:"none",
              // ml: 1,
            }
          }
        >
          {/* {params.value} */}
          {cell.getValue()}
        </Typography>
      ),
      // flex: 1,
    },
    {
      accessorKey: "available",
      field: "available",
      header: "Available Qty",
      headerName: "Available Qty",
      Cell: ({ cell }) => (
        <Typography
          sx={
            {
              // fontSize: "15px",
              // fontWeight: "500",
              // ml: 1,
            }
          }
        >
          {/* {params.row.available} */}
          {cell.row.original.available}
        </Typography>
      ),
      // flex: 1,
    },
  ];

  const OverviewCard = ({ icon, title, children, tab }) => {
    const handleClickIconButton = () => {
      router.push(`/app/products/${productId}?tab=${tab}`);
    };
    return (
      <BaseCard
        sx={{
          boxShadow: "none",
          // width: "300px",
          height: "325px",
          border: "1px solid rgba(49, 61, 78, 0.1)",
          // overflow: "unset",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            pl: "16px",
          }}
        >
          <SectionTitleText
            sx={{
              display: "flex",
              flexDirection: "row",
              // height: "40px",
              fontWeight: "700",
              fontSize: "18px",
              gap: "0.5rem",
              alignItems: "center",
              // paddingLeft: "15px",
              // marginTop: "15px",
              color: "#484A9E",
            }}
          >
            {icon}
            {title}
          </SectionTitleText>{" "}
          <IconButton onClick={handleClickIconButton} sx={{ zIndex: 1 }}>
            <OpenInNewIcon
              sx={{
                color: "#5860D7",
                // width: "18px",
                // height: "18px",
                // marginLeft: "220px",
                // marginTop: "7px",
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ overflow: "hidden" }}>{children}</Box>
      </BaseCard>
    );
  };

  const filterItemsData =
    Array.isArray(itemsData) &&
    itemsData.filter((item) => {
      return item.options.length > 0;
      // || item.option_value.length > 0;
    });

  const [showMore, setShowMore] = useState(false);
  const handleClickShowMoreButton = () => {
    setShowMore(() => !showMore);
  };
  // trim the description if it is more than 200 characters
  const trimDescription = (description = "") => {
    if (description?.length > 500 && !showMore) {
      return description.substring(0, 500) + "...";
    }
    return description;
  };

  const getDescriptionLength =
    data.product_desc && data.product_desc.length > 500;

  const staticData = [
    {
      label: "Overview",

      component: (
        <>
          <Box
            sx={
              {
                // mb: "32px",
              }
            }
            // sx={{
            // 	display: "flex",
            // 	flexDirection: "row",
            // 	justifyContent: "space-between",
            // }}
          >
            <Grid container spacing={2} alignItems={"stretch"}>
              {/* product details */}
              <Grid item xs={12} md={4}>
                <BundleOverviewCard
                  icon={<TagPurpleIcon />}
                  title="Description"
                  tab="product-details"
                >
                  {(data.product_desc && data.product_desc.length === 0) ||
                  data.product_desc === "<p></p>" ||
                  data.product_desc === "<p></p>\n" ||
                  data.product_desc === "" ? (
                    <EmptyState
                      icon={<ProductEmptyState />}
                      // icon={<InventoryES />}
                      text={"Add Product Details"}
                      bodyText={"Description of the Product is Unavailable"}
                    />
                  ) : (
                    <RenderHTML
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "14px",
                          md: "16px",
                        },
                        fontWeight: {
                          xs: "600",
                          sm: "600",
                          md: "500",
                        },
                        color: (theme) => theme.palette.text.primary,
                        px: 2,
                        pb: 2,
                      }}
                      content={
                        showMore === true
                          ? data.product_desc
                          : trimDescription(data.product_desc)
                      }
                    />
                  )}
                  {/* {getDescriptionLength ? (
                      <Button
                        onClick={() => handleClickShowMoreButton()}
                        sx={{
                          textTransform: "none",
                          ml: 2,
                          mt: 0,
                          mb: 2,
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {showMore === true ? "Show less" : "Show more"}
                      </Button>
                    ) : null} */}
                </BundleOverviewCard>
              </Grid>

              {/* inventory */}
              <Grid item xs={12} md={4}>
                <BundleOverviewCard
                  icon={<InventoryIcon />}
                  title={`Inventory`}
                  tab={
                    // totalInventoryAvailable > 0 &&
                    "inventory"
                  }

                  // tab="inventory"
                >
                  {/* {!tableList || tableList.length === 0 ? (
										<EmptyState
											icon={<InventoryES />}
											text={"No Inventory Found"}
											bodyText={`Please add inventory for this product`}
										/>
									) : ( */}
                  {/* {totalInventoryAvailable === 0 && (
                    <EmptyState
                      icon={<InventoryES />}
                      text={"No Inventory Found"}
                      bodyText={`Please add inventory for this product`}
                    />
                  )} */}
                  {totalInventoryAvailable > 0 ? (
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
                        <BluecomMRTBaseTable
                          data={tableList.slice(0, 3)}
                          columnsData={columnsForInventoryTable}
                          enableBottomToolbar={false}
                          renderEmptyRowsFallback={() => (
                            <EmptyState
                              icon={<InventoryES />}
                              text={"No Inventory Found"}
                              bodyText={`Please add inventory for this product`}
                            />
                          )}
                          state={{
                            showSkeletons: isInventoryLoading,
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
                        <InventoryForMobileView tableList={tableList} />
                      </Box>
                    </>
                  ) : (
                    <EmptyState
                      icon={<InventoryES />}
                      text={"No Inventory Found"}
                      bodyText={`Please add inventory for this product`}
                    />
                  )}
                </BundleOverviewCard>
              </Grid>
              {/* channel  */}
              <Grid item xs={12} md={4}>
                <BundleOverviewCard
                  icon={<InventoryIcon />}
                  title={`Channel`}
                  type={"products"}
                  tab={data?.channels?.length && "stores"}
                >
                  {data?.channels?.length > 0 ? (
                    <ChannelList
                      channelDetails={data?.channels}
                      enableBottomToolbar={false}
                      // renderEmptyRowsFallback={() => (
                      //   <EmptyState
                      //     icon={<ChannelES />}
                      //     text={"No Channels Found"}
                      //     bodyText={`Please publish this product to view channels here.`}
                      //   />
                      // )}
                    />
                  ) : (
                    <EmptyState
                      icon={<ChannelES />}
                      text={"No Channels Found"}
                      bodyText={`Please publish this product to view channels here.`}
                    />
                  )}
                  {/* {filterChannelsData && filterChannelsData.length > 0 && (
                    <MuiBaseDataGrid
                      sx={
                        {
                          //  borderBottom: "none"
                        }
                      }
                      rowHeight={180}
                      data={filterChannelsData}
                      rowIdkey={"Channel Id"}
                      columnDefData={columnForChannel}
                      containerStyles={{
                        height: "250px",
                        "& .MuiDataGrid-columnHeader": {
                          backgroundColor: "#F9FAFB",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                          fontWeight: "700",
                        },
                        "& .MuiDataGrid-cell": {
                          fontSize: "14px",
                          fontWeight: "500",
                          borderBottom: "none !important",
                        },
                      }}
                      hideFooter
                      checkboxSelection={false}
                    />
                  )} */}
                </BundleOverviewCard>
              </Grid>

              {/* variant/item */}
              {filterItemsData.length > 0 && (
                <Grid item xs={12} md={4}>
                  <BundleOverviewCard
                    icon={<TagPurpleIcon />}
                    title={`Variants`}
                    tab={"items"}
                  >
                    {filterItemsData.length === 0 && (
                      <EmptyState
                        icon={<VarientsES />}
                        text={"No Variants Found"}
                        bodyText={`Please add variants for this product`}
                      />
                    )}
                    <VariantsGroupForPDP tableData={filterItemsData} />
                  </BundleOverviewCard>
                </Grid>
              )}
            </Grid>
          </Box>
        </>
      ),
      route: `overview`,
      isActive: true,
    },
    {
      label: "Product Details",
      isActive: true,
      component: (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              // flexDirection: "row",

              // fontWeight: "500",
              // fontSize: "14px",
              // color: "#313D4E",
              // mt: "1.25rem",
              minHeight: "400px",
              // paddingLeft: "15px",
              // paddingTop: "10px",
              // maxHeight: "400px",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              sx={{
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[300]}`,
                pr: 2,
                // maxHeight: "450px",
                overflowY: "scroll",
                // overflowX: "hidden",
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              <SectionTitleText
                sx={{
                  // fontSize: {
                  //   xs: "14px",
                  //   sm: "14px",
                  //   md: "18px",
                  // },
                  // fontWeight: {
                  //   xs: "600",
                  //   sm: "600",
                  //   md: "700",
                  // },
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#484A9E",

                  // paddingLeft: "15px",
                }}
              >
                Product Description
              </SectionTitleText>

              {data.product_desc && (
                <RenderHTML
                  sx={{
                    // "& *": {
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "15px",
                    },
                    fontWeight: {
                      xs: "400",
                      sm: "400",
                      md: "500",
                    },
                    color: (theme) => theme.palette.text.primary,

                    // fontFamily:" Open Sans, sans-serif !important",

                    // },
                  }}
                  content={data.product_desc}
                />
              )}
              {/* Read more button to be added for expanding description */}

              {!data.product_desc && (
                <EmptyState
                  icon={<ProductEmptyState />}
                  // icon={<InventoryES />}
                  text={"Add Product Details"}
                  bodyText={"Description of the Product is Unavailable"}
                />
              )}
              <Grid
                container
                sx={{
                  borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
                  paddingTop: 2,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  sx={{
                    // borderBottom: "1px solid #0000001A",
                    paddingBottom: "1rem",
                  }}
                >
                  {
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "column",
                          md: "row",
                        },
                        gap: "1rem",
                        justifyContent: "space-between",
                        overflow: {
                          xs: "hidden",
                          sm: "hidden",
                          md: "visible",
                        },
                      }}
                    >
                      {Array.isArray(data.tag) && data.tag.length > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            flex: "0.5",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          <SectionTitleText
                            sx={{
                              fontSize: "18px",
                              fontWeight: "600",
                              color: "#484A9E",
                            }}
                          >
                            Tags
                          </SectionTitleText>
                          <Box>
                            <TagChipComponent data={data.tag} />
                          </Box>
                        </Box>
                      )}{" "}
                      {Array.isArray(data.collection) &&
                        data.collection.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flex: "0.25",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          >
                            <SectionTitleText
                              sx={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#484A9E",
                              }}
                            >
                              Collection
                            </SectionTitleText>
                            <Box>
                              <CollectionChipComponent data={data.collection} />
                            </Box>
                          </Box>
                        )}
                      {data.type && (
                        <Box
                          sx={{
                            display: "flex",
                            flex: "0.25",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          <SectionTitleText
                            sx={{
                              // fontSize: {
                              //   xs: "14px",
                              //   sm: "14px",
                              //   md: "18px",
                              // },
                              // fontWeight: {
                              //   xs: "600",
                              //   sm: "600",
                              //   md: "700",
                              // },
                              fontSize: "18px",
                              fontWeight: "600",
                              color: "#484A9E",
                            }}
                          >
                            Product Type
                          </SectionTitleText>
                          <Box>
                            <ProductTypeChipComponent label={data.type} />
                          </Box>
                        </Box>
                      )}
                    </Box>
                  }
                </Grid>

                {/* {Array.isArray(itemsData) &&
									itemsData.length > 0 && (
										<Box>
											<VariantsGroupForPDP
												tableData={itemsData}
											/>
										</Box>
									)} */}
                {/* </Box> */}
                {/* </Box> */}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{
                borderLeft: (theme) => `1px solid ${theme.palette.grey[300]}`,
              }}
            >
              {/* <SwiperImageSlider />
               */}
              {/* <SlickSliderWithThumbnails /> */}
              {/* <SlickSliderWithThumbnails
                slidesData={data.images}
                title={"Images"}
              /> */}
              <ProductThumbnailsSlider data={data.images} title={"Images"} />
              {/* <ImageSlider data={data.images} title={"Images"} /> */}
            </Grid>
          </Grid>
        </>
      ),
      route: `product-details`,

      // data.product_desc ||
      // "No description added, add an empty state for this",
    },
    {
      isActive: true,
      label: "Inventory",
      component: (
        <Box
          sx={
            {
              // mb: "64px",
            }
          }
        >
          {/* {inventoryDat.length === 0 && (
            <EmptyState
              icon={<InventoryES />}
              text={"No Inventory Found"}
              bodyText={`Please add inventory for this product`}
            />
          )}
          {inventoryDat.length > 0 && (
            <>
              <MuiBaseDataGrid
                rowHeight={50}
                data={tableList}
                columnDefData={columnsForInventoryTable}
                rowIdkey={"master_item_id"}
                containerStyles={{
                  height: "calc(100vh - 240px)",
                  width: "100%",
                }}
                checkboxSelection={false}
                hideFooterPagination={itemData.length < 6}
                hideFooter={itemData.length < 6}
              />
            </>
          )} */}
          {totalInventoryAvailable === 0 && (
            <EmptyState
              icon={<InventoryES />}
              text={"No Inventory Found"}
              bodyText={`Please add inventory for this product`}
            />
          )}
          {
            totalInventoryAvailable > 0 && (
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
                  <BluecomMRTBaseTable
                    rowHeight={50}
                    data={tableList}
                    columnDefData={columnsForInventoryTable}
                    columnsData={columnsForInventoryTable}
                    rowIdkey={"master_item_id"}
                    containerStyles={{
                      height: "400px",
                      width: "100%",
                    }}
                    checkboxSelection={false}
                    hideFooterPagination={tableList.length < 6}
                    hideFooter={tableList.length < 6}
                    state={{
                      showSkeletons: isInventoryLoading,
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
                  <InventoryForMobileView tableList={tableList} />
                </Box>
              </>
            )
            // )
          }
        </Box>
      ),
      route: `inventory`,
    },
    {
      label: "Variants",
      component: (
        <>
          {filterItemsData.length === 0 && (
            <EmptyState text={"No items found"} />
          )}
          {filterItemsData.length > 0 && (
            <GroupedVariantsTableForPDP tableData={filterItemsData} />
          )}
        </>
      ),
      route: `items`,
      isActive: Array.isArray(filterItemsData) && filterItemsData.length > 0,
    },

    {
      label: "Channel",
      component: (
        // <MuiBaseTable
        // 	newData={channelsData}
        // 	baseCardStyles={{
        // 		boxShadow: "none",
        // border: "1px solid rgba(0,0,0,0.2)",
        // 	}}
        // />
        <>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              maxWidth: "500px",
            }}
          >
            {/* {filterChannelsData.length === 0 && (
							<EmptyState text={"No channels found"} />
						)} */}
            {/* {Array.isArray(data?.channels) &&
							data?.channels.length > 0 && ( */}
            {data?.channels?.length > 0 ? (
              <ChannelList
                channelDetails={data?.channels}
                enableBottomToolbar={false}
                // renderEmptyRowsFallback={() => (
                //   <EmptyState
                //     icon={<ChannelES />}
                //     text={"No Channels Found"}
                //     bodyText={`Please publish this product to view channels here.`}
                //   />
                // )}
              />
            ) : (
              <EmptyState
                icon={<ChannelES />}
                text={"No Channels Found"}
                bodyText={`Please publish this product to view channels here.`}
              />
            )}
            {/* {filterChannelsData.length > 0 && (
            <MuiBaseDataGrid
              rowHeight={55}
              data={filterChannelsData}
              rowIdkey={"Channel Id"}
              columnDefData={columnForChannel}
              containerStyles={{
                height: "calc(100vh - 390px)",
                width: "30%",
              }}
              checkboxSelection={false}
              hideFooterPagination={itemData.length < 6}
              hideFooter={itemData.length < 6}
            />
          )} */}
          </Grid>
        </>
      ),
      route: `stores`,
      isActive:
        Array.isArray(filterChannelsData) && filterChannelsData.length > 0,
    },
    // {
    // 	label: "Activity Log",
    // 	component: <Typography>working on it</Typography>,
    // 	route: `activity-log`,
    // },
  ];
  console.log({ filterItemsData });
  const filterStaticData = staticData.filter((item) => item.isActive);

  const [tabsData, setTabsData] = useState([]);
  // remove the first item of array and show other items as an array
  const slicedData = staticData.slice(1);
  const removeEndItem = slicedData.slice(0, slicedData.length - 1);
  const filteredDataForReviewPage = removeEndItem.filter(
    (item) => item.isActive
  );
  const dataOnReviewPage = isUsedOnReviewPage
    ? filteredDataForReviewPage
    : filterStaticData;

  useEffect(() => {
    if (data) {
      setTabsData(dataOnReviewPage);
    }
  }, [data]);
  // const handleFetchInventoryData = () => {
  // 	const url = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 		master_product_id: productId,
  // 	};
  // 	appFetch(url, data)
  // 		.then((json) => {
  // 			setInventoryData(json.result);
  // 			console.log({ json });
  // 		})
  // 		.catch((err) => console.log(err));
  // };
  // useEffect(() => {
  // 	handleFetchInventoryData();
  // }, []);
  const productURL =
    Array.isArray(data.channels) &&
    data.channels.length > 0 &&
    data.channels[0].channel_product_link;

  const handleViewProduct = () => {
    window.open(productURL, "_blank");
  };

  const createdAtDate = data.created_at && new Date(data.created_at);
  const formatedCreateAtDate =
    createdAtDate && format(createdAtDate, "dd MMM yyyy");
  const lastUpdated = data.updated_at && new Date(data.updated_at);
  const formatedLastUpdatedDate =
    lastUpdated && format(lastUpdated, "dd MMM yyyy");

  const checkStatus = data.status;

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#C4C4C4",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#099350",
    },
  }));
  const topNavBarRef = useRef();
  const getHeight = topNavBarRef.current?.offsetHeight;
  const stickyHeightForDesc = getHeight + 110;

  console.log({ router, isLoading, productId, isProductsLoading });
  // if (isLoading || !productId) return <PageSpinner />;
  // if (productId) {
  if (isLoading || isProductsLoading) return <PageSpinner />;
  // if (productId && !isLoading)
  return (
    <>
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <DetailsPageSection
          breadCrumbMainLink={`/app/products`}
          breadCrumbMainLinkTitle={"All Products"}
          editLink={`/app/products/edit/${productId}?tab=general-info`}
          formatedCreatedAtDate={formatedCreateAtDate}
          formatedLastUpdatedDate={formatedLastUpdatedDate}
          getChannelsData={getChannelsData}
          handleViewProduct={handleViewProduct}
          data={data}
          id={productId}
          isLoading={isLoading}
          isUsedOnReviewPage={isUsedOnReviewPage}
          productURL={productURL}
          stickyHeightForDesc={stickyHeightForDesc}
          tabsBasePath={`/app/products/${productId}`}
          tabsData={tabsData}
          topNavBarRef={topNavBarRef}
          usedIn={`Product`}
          handleSyncInventory={handleSyncInventory}
        />
        {/* {isLoading && <SectionLoader />}

      {!isLoading && data !== {} && (
        <> */}
        {/* <AppDetailsPageSection
						tabsData={tabsData}
						display_image={data.display_image}
						title={data.product_title}
						pageID={productId}
						pageType={"Product"}
						isUsedOnReviewPage={isUsedOnReviewPage}
					/> */}

        {/* <BaseCard sx={{ overflow: "unset" }}>
            {!isLoading && (
              <>
                {
                  <Box
                    sx={{
                      mt: -1,
                      marginBottom: "10px",
                      // backgroundColor: "white",
                      position: "sticky",
                      top: "110px",
                      // border: "1px solid",
                      backgroundColor: "#F5F5F5",
                      zIndex: (theme) => theme.zIndex.appBar,
                      px: "36px",
                      pb: 2,
                    }}
                    ref={topNavBarRef}
                  >
                    {!isUsedOnReviewPage && (
                      <Breadcrumbs
                        sx={{
                          fontSize: "16px",
                          padding: "20px",
                          fontWeight: "600",
                        }}
                        aria-label="breadcrumb"
                      >
                        <AppLink href="/app/products" sx={{ color: "#4F44E0" }}>
                          All Products
                        </AppLink>

                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                          // underline="hover"
                          color="#222222"
                          fontSize="5rem"
                          fontWeight="700"
                          // href="/material-ui/react-breadcrumbs/"
                          // aria-current="page"
                        >
                          Product ID: {productId}
                        </Typography>
                      </Breadcrumbs>
                    )}

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          // borderBottom: "2px solid rgba(0,0,0,0.1)",
                          // backgroundColor: "white",
                          // background: "white",
                          zIndex: (theme) => theme.zIndex.drawer + 11000,
                          flex: 1,
                        }}
                      >
                        <Box>
                          {/* <BaseCard
										sx={{
											height: "150px",
											width: "120px",
											marginLeft: "20px",
											marginBottom: "20px",
											borderRadius: "0px",
										}}
									> 
                          <AppImage
                            src={data.display_image}
                            height="150"
                            width="150"
                            sx={{
                              ml: "16px",
                              borderRadius: "5px",
                              mr: 1,
                              border: (theme) =>
                                `1px solid ${theme.palette.grey[300]}`,
                            }}
                            // sx={{ objectFit: "contain" }}
                          />
                          {/* </BaseCard> 
                        </Box>

                        <Box
                          sx={{
                            ml: 2,
                            flex: 1,
                          }}
                        >
                          <TopSectionProductDescription />

                          <Box
                            sx={{
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
                            {/* <Box
															sx={{
																mt: "1rem",
																display: "flex",
																gap: "0.5rem",
																alignItems:
																	"center",
																background:
																	"#E2E8FF",
																p: "0.5rem 0.9rem",
																Width: "1rem",
																borderRadius:
																	"2rem",
															}}
														>
															<TagIconBlack />
															<Typography
																sx={{
																	fontSize:
																		"14px",
																	fontWeight:
																		"700",
																}}
															>
																12 Variants
															</Typography>
														</Box> 
                            {data.category && (
                              <Box
                                sx={{
                                  // mt: "1rem",
                                  display: "flex",
                                  gap: "0.5rem",
                                  alignItems: "center",
                                  p: "0.5rem 0.9rem",
                                  Width: "1rem",
                                  borderRadius: "2rem",
                                  border: "1px solid #0000001A",
                                  mt: 2,
                                }}
                              >
                                <BillIcon />
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {data.category}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <PrimaryButton
                            sx={{ m: "1rem 0" }}
                            onClick={() =>
                              router.push(
                                `/app/products/edit/${productId}?tab=general-info`
                              )
                            }
                          >
                            Edit
                          </PrimaryButton>
                        </Box>
                        {!isUsedOnReviewPage && (
                          <Box item>
                            {
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  justifyContent: "right",
                                  pr: "1rem",
                                  gap: "1rem",
                                }}
                              >
                                {/* <PrimaryButton
                                onClick={() =>
                                  router.push(
                                    `/app/products/edit/${productId}?tab=general-info`
                                  )
                                }
                              >
                                Edit Product
                              </PrimaryButton> */}
        {/* {
				<StatusAsChip
					status={data.status}
					marginTop={0}
					fontSize={14}
					fontWeight={700}
				/>
			} */}
        {/* Render components according to status (Draft)*/}
        {/* {checkStatus == "draft" && (
                                  <Box
                                    sx={{
                                      width: "50%",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        fontWeight: "500",
                                        color: "#000",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "#099350",
                                          fontWeight: "700",
                                        }}
                                      >
                                        62
                                      </Typography>
                                      /100%
                                    </Typography>

                                    <BorderLinearProgress
                                      variant="determinate"
                                      value={62}
                                      sx={{
                                        height: "10px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </Box>
                                )} */}
        {/* Render compoenents according to status (active) */}
        {/* {data.status === "Active" && (
                                  <RenderChannelAsIcon />
                                )} */}
        {/* {Array.isArray(getChannelsData) &&
                                  getChannelsData.map((item, index) => (
                                    <RenderChannelAsIcon
                                      key={index}
                                      channel={item}
                                      value={item["Channel Name"]}
                                    />
                                  ))}
                                {productURL && (
                                  <OutlinedButton
                                    onClick={() => handleViewProduct()}
                                    sx={{
                                      ml: 1,
                                    }}
                                    startIcon={<ViewLiveIcon />}
                                  >
                                    View Live product
                                  </OutlinedButton>
                                )}

                                {
                                  <Box>
                                    <Box>
                                      <DescriptionText
                                        sx={{
                                          color: "#595959",

                                          fontWeight: "500",
                                          fontSize: "14px",
                                          "& span": {
                                            fontWeight: 800,
                                            ml: 2,
                                          },
                                        }}
                                      >
                                        Created on
                                        <span>: {formatedCreateAtDate}</span>
                                      </DescriptionText>
                                    </Box>
                                    <Box>
                                      <DescriptionText
                                        sx={{
                                          color: "#595959",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          "& span": {
                                            fontWeight: 800,
                                          },
                                        }}
                                      >
                                        Last Updated
                                        <span>
                                          : {formatedLastUpdatedDate}
                                        </span>{" "}
                                      </DescriptionText>
                                    </Box>
                                  </Box>
                                }
                              </Box>
                            }
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                } */}
        {/* tabs */}
        {/* <Box
                  sx={{
                    // marginTop: "20px",
                    backgroundColor: "white",
                    // px: "36px",
                  }}
                >
                  {isUsedOnReviewPage ? (
                    <> */}
        {/* {isUsedOnReviewPage && (
												<SectionTitleText
													sx={{
														mb: "16px",
													}}
												>
													{data.product_title}
												</SectionTitleText>
											)} */}
        {/* <BasicTabs sx={{ fontSize: "14px" }} data={tabsData} />
                    </>
                  ) : (
                    <RouterTabs
                      tabContainerStyles={{
                        position: "sticky",
                        top: stickyHeightForDesc,
                        py: 1,
                        pt: 2,
                        backgroundColor: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1100,
                      }}
                      tabRowStyles={{
                        px: "36px",
                      }}
                      tabChildStyles={{
                        px: "36px",
                      }}
                      sx={{ fontSize: "14px" }}
                      data={tabsData}
                      basePath={`/app/products/${productId}`}
                    />
                  )}
                </Box>
              </>
            )}
          </BaseCard> */}

        {/* <Grid container>
						<Grid item md={2} sm={3}>
							<BaseCard sx={{ height: "150px", width: "150px" }}>
								<AppImage
									src={data.display_image}
									height="150"
									width="150"
								/>
							</BaseCard>
						</Grid>
						<Grid item md={9} sm={9}>
							<SectionTitleText>
								{data.product_title}
							</SectionTitleText>
							<DescriptionText>
								Master Product ID : {productId}
								{/* / Style : Bl
							</DescriptionText>
						</Grid>
					</Grid>
					<BasicTabs data={tabsData} /> */}
        {/* </>
      )} */}
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
        <MobileDetailsPageSection
          breadCrumbMainLink={`/app/products`}
          breadCrumbMainLinkTitle={"All Products"}
          editLink={`/app/products/edit/${productId}?tab=general-info`}
          formatedCreatedAtDate={formatedCreateAtDate}
          formatedLastUpdatedDate={formatedLastUpdatedDate}
          getChannelsData={getChannelsData}
          handleViewProduct={handleViewProduct}
          data={data}
          id={productId}
          isLoading={isLoading}
          isUsedOnReviewPage={isUsedOnReviewPage}
          productURL={productURL}
          stickyHeightForDesc={stickyHeightForDesc}
          tabsBasePath={`/app/products/${productId}`}
          tabsData={tabsData}
          topNavBarRef={topNavBarRef}
          usedIn={`Product`}
          handleSyncInventory={handleSyncInventory}
        />
      </Box>
      <Dialog
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 11000,
        }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            maxWidth: "600px",
            minWidth: "600px",
          },
        }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Total Inventory</DialogTitle>{" "}
        <DialogContent dividers>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[500],
              // color:(theme)=>theme.palette.primary.main,
            }}
          >
            <CrossIcon />
          </IconButton>
          <Box>
            <BluecomMRTBaseTable
              data={getdat}
              columnsData={columnsForInventoryTablePopUp}
              rowIdkey={"wh_name"}
              muiTableContainerProps={{
                sx: { minHeight: "500px" },
              }}
              checkboxSelection={false}
              hideFooterPagination={itemData.length < 6}
              hideFooter={itemData.length < 6}
              renderEmptyRowsFallback={() => (
                <EmptyState
                  icon={<InventoryES />}
                  text={"No Inventory Found"}
                  bodyText={`Please add inventory for this product`}
                ></EmptyState>
              )}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        <MobileViewInventoryInventoryDrawer isLoading={isLoading} />
      </Box>
    </>
  );
}

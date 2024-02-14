import { Box, Breadcrumbs, Grid, IconButton, Typography } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import StatusChip from "components/Common/Chip/StatusChip";
import EmptyState from "components/Common/EmptyState";
// import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import RenderHTML from "components/Common/Typography/RenderHTML";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import TagChipComponent from "../components/TagChipComponent";
import CollectionChipComponent from "../components/CollectionChipComponent";
import ProductTypeChipComponent from "../components/ProductTypeChipComponent";
import ImageSlider from "components/Common/ImageSlider";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import AppLink from "components/Common/AppLink";
import AppImage from "components/Common/AppImage";
import TopSectionProductDescription from "../components/TopSectionProductDescription";
import BillIcon from "components/Common/Icons/BillIcon";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
// import BasicTabs from "components/Common/Tabs/BasicTabs";
// import RouterTabs from "components/Common/Tabs/RouterTabs";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { filter, groupBy } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
// import BundleOverviewSection from "./BundleOverviewSection";
import dynamic from "next/dynamic";
import DetailsPageSection from "sections/AppPageSections/AppDetailsPageSection/DetailsPageSection";
import ComponentSection from "./ComponentSection";
import InventoryES from "components/Common/Icons/EmptyStates/InventoryES";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
const BundleOverviewSection = dynamic(() => import("./BundleOverviewSection"), {
  ssr: false,
});
const RouterTabs = dynamic(() => import("components/Common/Tabs/RouterTabs"), {
  ssr: false,
});
const BasicTabs = dynamic(() => import("components/Common/Tabs/BasicTabs"), {
  ssr: false,
});
const MuiBaseDataGrid = dynamic(
  () => import("components/Common/Tables/MuiBaseDataGrid"),
  {
    ssr: false,
  }
);

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function BundleDetailsPageSection({ isUsedOnReviewPage }) {
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const productId = router.query.productId;

  const [data, setData] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    if (productId) handleFetchProductDetails();
  }, [productId]);

  const handleFetchProductDetails = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    setIsLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result[0]);
          setItemsData(json.result[0].items);
        }
      })
      .catch((error) => console.log(error));
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
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  const getChannels = channels.filter((it) => {
    if (data && it.channel_id === data.channel_id) return it.channel_name;
    return;
  });

  const getChannelsData = getChannels.map((item) => {
    const { channel_id, channel_name } = item;
    return {
      "Channel Id": channel_id,
      "Channel Name": channel_name,
    };
  });
  console.log({ getChannelsData });

  const channelsData = getChannelsData;

  const filterChannelsData =
    Array.isArray(channelsData) &&
    channelsData.filter((it) => it["Channel Name"] !== "native");

  const columnForChannel = [
    {
      field: "Channel Name",
      headerName: "Channel Name",
      renderCell: (params) => (
        // <RenderChannelAsIcon value={params.value} />

        <ChannelGroups
          channels={params.value}
          channelDetails={params.row.channels || []}
        />
      ),

      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Channel Id",
      headerName: "#Listings",
      renderCell: (params) => (
        <StatusChip
          sx={{
            color: "#4F44E0",
            fontSize: "14px",
            fontWeight: "600",
          }}
          label={params.value + " Listing"}
          variant="outlined"
        />
      ),

      // renderCell: (params) => (
      //   <Chip
      //     variant="outlined"
      //     label={params.channel_id}
      //     sx={{ width: "100px" }}
      //   >
      //     Listing
      //   </Chip>
      // ),
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  const getItemData = groupBy(itemsData, "master_product_id");
  const itemsList =
    Array.isArray(itemsData) &&
    itemsData.map((item) => {
      const { item_title, item_desc, unit_retail_price, options } = item;
      // const items =
      // 	(Array.isArray(options) && options.map((it) => it.value)) ?? [];
      // const title = items.join(" / ");
      return {
        ...item,
        // "Item title": title,
        // "Item Description": item_desc,
        "Unit Retail Price": unit_retail_price,
      };
    });
  console.log({ itemsData });
  const itemData = itemsList;

  // const filterItemsData =
  // Array.isArray(itemsData) &&
  // itemsData.filter((item) => {
  //   return item.options.length > 0;
  //   // || item.option_value.length > 0;
  // });
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
  const { data: inventories } = useQuery({
    queryKey: ["inventory", productId],
    queryFn: () =>
      appFetch(PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT, {
        user_id: currentUser.merchant_id,
        master_product_id: productId,
      }).then((json) => json.result),
  });

  console.log({ inventories });
  const inventoryDat =
    Array.isArray(inventories) &&
    inventories
      .map((item) => {
        const {
          // item_title,
          // // item_desc,
          unit_retail_price,
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

            title,
            available,
            // Incoming: options,
          };
        });
        return data;
        // {

        // 	// "Item title": item_title,
        // 	// "Item Description": item_desc,
        // 	// "Unit Retail Price": unit_retail_price,
        // };
      })
      .flat();

  const columnsForInventoryTable = [
    {
      field: "wh_name",
      headerName: "Location Name",
      flex: 1,
    },
    {
      field: "available",
      headerName: "Available Qty",
      flex: 1,
    },
    {
      field: "title",
      headerName: "#Items",
      flex: 1,
    },
  ];

  console.log({ itemsData, getItemData });
  console.log("**InventoryData", { inventoryData });

  const OverviewCard = ({ icon, title, children, tab }) => {
    const handleClickIconButton = () => {
      router.push(`/app/products/${productId}?productType=bundle&tab=${tab}`);
    };
    return (
      <BaseCard
        sx={{
          boxShadow: "none",
          // width: "300px",
          // height: "325px",
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
        <Box sx={{ overflowY: "scroll", maxHeight: "300px", pb: 2 }}>
          {children}
        </Box>
      </BaseCard>
    );
  };

  const staticData = [
    {
      label: "Overview",

      component: (
        <BundleOverviewSection
          channelsData={filterChannelsData}
          columnForChannel={columnForChannel}
          data={data}
          inventoryDat={inventoryDat}
          itemData={itemData}
        />
        // <>
        // 	<Box
        // 	// sx={{
        // 	// 	display: "flex",
        // 	// 	flexDirection: "row",
        // 	// 	justifyContent: "space-between",
        // 	// }}
        // 	>
        // 		<Grid container spacing={2}>
        // 			{/* product details */}
        // 			<Grid item xs={12} md={4}>
        // 				<OverviewCard
        // 					logo={<TagPurpleIcon />}
        // 					title="Bundle Details"
        // 					tab="bundle-details"
        // 					sx={{
        // 						display: "flex",
        // 						flexDirection: "column",
        // 						border: "1px ",
        // 					}}
        // 				>
        // 					<RenderHTML
        // 						sx={{
        // 							fontWeight: "500",
        // 							fontSize: "16px",
        // 							color: (theme) =>
        // 								theme.palette.text.primary,
        // 						}}
        // 						content={data.product_desc}
        // 					/>

        // 					{/* fix the issue in the edit description, to prevent empty description, currently getting <p></p>, if there is no description is added. */}
        // 					{data.product_desc &&
        // 						data.product_desc.length === 0 && (
        // 							<EmptyState
        // 								icon={<TagEmptyStateIcon />}
        // 								title={"Add Product Details"}
        // 								text={
        // 									"Description of the Product is Unavailable"
        // 								}
        // 								buttonText={
        // 									"Add Product Details"
        // 								}
        // 							/>
        // 						)}
        // 				</OverviewCard>
        // 			</Grid>
        // 			{/* inventory */}
        // 			<Grid item xs={12} md={4}>
        // 				<OverviewCard
        // 					icon={<InventoryIcon />}
        // 					title={`Inventory`}
        // 					tab="inventory"
        // 				>
        // 					{inventoryDat.length === 0 && (
        // 						<EmptyState
        // 							icon={<InventoryEmptyStateIcon />}
        // 							title={"No Inventory"}
        // 							text={
        // 								"Description of the Product is Unavailable"
        // 							}
        // 							buttonText={"Add Inventory"}
        // 						/>
        // 					)}
        // 					{Array.isArray(inventoryDat) && (
        // 						<MuiBaseTable newData={inventoryDat} />
        // 					)}
        // 				</OverviewCard>
        // 			</Grid>
        // 			{/* channel  */}
        // 			<Grid item xs={12} md={4}>
        // 				<OverviewCard
        // 					icon={<InventoryIcon />}
        // 					title={`Channel`}
        // 					tab={"channel"}
        // 				>
        // 					{/* {Array.isArray(itemData) && (
        //                                   <MuiBaseTable
        //                                       newData={itemData}
        //                                       baseCardStyles={{
        //                                           boxShadow: "none",
        //                                           // border: "1px solid rgba(0,0,0,0.2)",
        //                                       }}
        //                                   />
        //                               )} */}
        // 					{itemData.length === 0 && (
        // 						<EmptyState
        // 							icon={<InventoryEmptyStateIcon />}
        // 							title={"No Inventory"}
        // 							text={
        // 								"Description of the Product is Unavailable"
        // 							}
        // 							buttonText={"Add Inventory"}
        // 						/>
        // 					)}
        // 					{itemData.length > 0 && (
        // 						<MuiBaseDataGrid
        // 							sx={{ borderBottom: "none" }}
        // 							rowHeight={55}
        // 							data={channelsData}
        // 							rowIdkey={"Channel Id"}
        // 							columnDefData={columnForChannel}
        // 							containerStyles={{
        // 								height: "250px",
        // 								"& .MuiDataGrid-columnHeader": {
        // 									backgroundColor: "#F9FAFB",
        // 								},
        // 								"& .MuiDataGrid-columnHeaderTitle":
        // 									{
        // 										fontWeight: "700",

        // 										// fontSize:"16px"
        // 									},

        // 								"& .MuiDataGrid-cell": {
        // 									fontSize: "14px",
        // 									fontWeight: "500",
        // 									borderBottom:
        // 										"none !important",
        // 								},
        // 							}}
        // 							hideFooter
        // 							checkboxSelection={false}
        // 						/>
        // 					)}
        // 				</OverviewCard>
        // 			</Grid>
        // 			{/* variant/item */}
        // 		</Grid>
        // 	</Box>
        // </>
      ),
      route: `overview`,
      isActive: true,
    },
    {
      label: "Bundle Details",
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
              maxHeight: "400px",
            }}
          >
            <Grid
              item
              md={8}
              sx={{
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[300]}`,
                pr: 2,
                maxHeight: "450px",
                overflowY: "scroll",
              }}
            >
              <SectionTitleText
                sx={{
                  fontWeight: "700",
                  fontSize: "18px",
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
                    fontSize: "16px",
                    fontWeight: "500",
                    color: (theme) => theme.palette.text.primary,
                    // },
                  }}
                  content={data.product_desc}
                />
              )}
              {/* Read more button to be added for expanding description */}

              {!data.product_desc && (
                <EmptyState text={"No description found"} />
              )}
              <Grid container>
                <Grid
                  item
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
                        justifyContent: "space-between",
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
                              fontWeight: "800",
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
                                fontWeight: "800",
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
                              fontSize: "18px",
                              fontWeight: "800",
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

                {Array.isArray(itemsData) && itemsData.length > 0 && (
                  <Box>
                    {/* <VariantsGroupForPDP
												tableData={itemsData}
											/> */}
                  </Box>
                )}
                {/* </Box> */}
                {/* </Box> */}
              </Grid>
            </Grid>

            <Grid item md={4} sx={{}}>
              <ImageSlider data={data.images} title={"Product Images"} />
            </Grid>
          </Grid>
        </>
      ),
      route: `bundle-details`,
      isActive: true,

      // data.product_desc ||
      // "No description added, add an empty state for this",
    },
    {
      label: "Inventory",
      component: (
        <>
          {inventoryDat.length === 0 && (
            <EmptyState
              icon={<InventoryES />}
              text={"No Inventory Found"}
              bodyText={`Please add inventory for this product`}
            />
          )}
          {inventoryDat.length > 0 && (
            // <MuiBaseTable newData={inventoryDat} />
            <MuiBaseDataGrid
              rowHeight={50}
              data={inventoryDat}
              columnDefData={columnsForInventoryTable}
              rowIdkey={"wh_name"}
              containerStyles={{
                height: "calc(100vh - 390px)",
                width: "60%",
              }}
              checkboxSelection={false}
              hideFooterPagination={itemData.length < 6}
              hideFooter={itemData.length < 6}
            />
          )}
        </>
      ),
      route: `inventory`,
      isActive: true,
    },

    {
      label: "Channel",
      component: (
        // <MuiBaseTable
        // 	newData={channelsData}
        // 	baseCardStyles={{
        // 		boxShadow: "none",
        // 		// border: "1px solid rgba(0,0,0,0.2)",
        // 	}}
        // />
        <>
          {channelsData.length === 0 && (
            <EmptyState text={"No channels found"} />
          )}
          {channelsData.length > 0 && (
            <MuiBaseDataGrid
              rowHeight={55}
              data={channelsData}
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
          )}
        </>
      ),
      route: `stores`,
      isActive:
        Array.isArray(filterChannelsData) && filterChannelsData.length > 0,
    },
    {
      label: "Components",
      component: <ComponentSection />,
      route: `component`,
      isActive: true,
    },
  ];
  const filterStaticData = staticData.filter((item) => item.isActive);

  const [tabsData, setTabsData] = useState([]);
  // remove the first item of array and show other items as an array
  const slicedData = staticData.slice(1);
  const removeEndItem = slicedData.slice(0, slicedData.length - 1);
  const dataOnReviewPage = isUsedOnReviewPage
    ? removeEndItem
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

  const topNavBarRef = useRef();
  const getHeight = topNavBarRef.current?.offsetHeight;
  const stickyHeightForDesc = getHeight + 110;

  return (
    <Box>
      <DetailsPageSection
        breadCrumbMainLink={`/app/products?selectedProductType=bundle`}
        breadCrumbMainLinkTitle={`All Bundles`}
        editLink={`/app/products/edit/${productId}?productType=bundle&tab=general-info`}
        formatedCreatedAtDate={formatedCreateAtDate}
        formatedLastUpdatedDate={formatedLastUpdatedDate}
        getChannelsData={getChannelsData}
        handleViewProduct={handleViewProduct}
        data={data}
        id={productId}
        isLoading={isLoading}
        isTabAfterQuery={true}
        tabsData={tabsData}
        productURL={productURL}
        isUsedOnReviewPage={isUsedOnReviewPage}
        stickyHeightForDesc={stickyHeightForDesc}
        tabsBasePath={`/app/products/${productId}?productType=bundle`}
        topNavBarRef={topNavBarRef}
        usedIn={`Bundle`}
      />
      {/* {isLoading && <PageSpinner />}

      {!isLoading && data !== {} && (
        <>
          <BaseCard sx={{ overflow: "unset" }}>
            {!isLoading && (
              <>
                {
                  <Box
                    sx={{
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
                          List Product
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
                      <Grid
                        container
                        sx={{
                          // borderBottom: "2px solid rgba(0,0,0,0.1)",
                          // backgroundColor: "white",
                          // background: "white",
                          zIndex: (theme) => theme.zIndex.drawer + 11000,
                        }}
                      >
                        <Grid item md={1.1} sm={3}>
                          <AppImage
                            src={data.display_image}
                            height="150"
                            width="150"
                            sx={{
                              ml: "16px",
                              borderRadius: "5px",
                              border: (theme) =>
                                `1px solid ${theme.palette.grey[300]}`,
                            }}
                            // sx={{ objectFit: "contain" }}
                          />
                        </Grid>

                        <Grid
                          item
                          md={7}
                          sm={9}
                          sx={{
                            pl: "1rem",
                          }}
                        >
                          <TopSectionProductDescription />

                          <Box
                            sx={{
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
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
                                `/app/products/edit/${productId}?productType=bundle&tab=general-info`
                              )
                            }
                          >
                            Edit bundle details
                          </PrimaryButton>
                        </Grid>
                        {!isUsedOnReviewPage && (
                          <Grid item md={3.9}>
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
                                {
                                  <StatusAsChip
                                    status={data.status}
                                    marginTop={0}
                                    fontSize={14}
                                    fontWeight={700}
                                  />
                                }
                                {Array.isArray(getChannelsData) &&
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
                          </Grid>
                        )}
                      </Grid>
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
                    <>
                      <BasicTabs sx={{ fontSize: "14px" }} data={tabsData} />
                    </>
                  ) : (
                    <RouterTabs
                      tabContainerStyles={{
                        position: "sticky",
                        top: "365px",
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
                      basePath={`/app/products/${productId}?productType=bundle`}
                      isTabAfterQuery={true}
                    />
                  )}
                </Box>
              </>
            )}
          </BaseCard>
        </>
      )} */}
    </Box>
  );
}

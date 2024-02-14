import { Box, Stack, Typography, Tooltip } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
// import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import EmptyState from "components/Common/EmptyState";
import RenderImageWithText from "components/Common/Tables/RenderComponents/RenderImageWithText";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import dynamic from "next/dynamic";
import BundleES from "components/Common/Icons/EmptyStates/BundleES";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import {
  resetBulkProductPublishOnboardingSteps,
  resetSingleProductPublishOnboardingSteps,
  resetStore,
} from "redux/onboarding/onboardingSlice";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import {
  setSelectedPublishableProducts,
  setSelectedPublishableStore,
} from "redux/products/productsSlice";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import { formatDistance } from "date-fns";
import getFormattedDate, {
  getDateWithTimezone,
} from "utils/dateUtils/getFormattedDate";
import MobileViewSelectChannelButton from "sections/StoresPageSections/MobileView/MobileViewSelectChannelButton";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import theme from "theme";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import ProductPublishPageTable from "./ProductPublishPageSections/ProductPublishPageTable";
const MuiBaseDataGrid = dynamic(
  () => import("components/Common/Tables/MuiBaseDataGrid"),
  {
    ssr: false,
  }
);

const mapState = ({ views, user }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
});
export default function ProductPublishPageSection({ publishableID }) {
  const router = useRouter();
  const { pageView, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const { currentPage } = router.query;
  const [totalCount, setTotalCount] = useState(0);

  const statusList = ["all", "active", "unlisted", "modified"];
  const [selectedStatus, setSelectedStatus] = useState("all");
  // const currentChannelData = data[channels[0]];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [currentChannelData, setCurrentChannelData] = React.useState(
  // 	data[channels[0]],
  // );

  // React.useEffect(() => {
  // 	setCurrentChannelData(data[channels[0]]);
  // }, [data]);
  const handleClick = () => {
    console.info(`You clicked ${channels[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setSelectedStatus(statusList[index]);
    // setCurrentChannelData(data[channels[index]]);
  };
  // console.log({ channel: channels[selectedIndex], currentChannelData });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleFetchProductsCount = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
    const data = {
      user_id: currentUser.merchant_id,

      status:
        selectedStatus === "all"
          ? ["active", "unlisted", "modified"]
          : [selectedStatus],
    };

    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);

        if (json.status === "success") {
          setTotalCount(json.result);

          console.log({ json });
          handleFetchProducts();
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleFetchProducts = () => {
    setLoading(true);
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
      page: Number(currentPage) || 1,
      per_page: 10,
      status:
        selectedStatus === "all"
          ? ["active", "unlisted", "modified"]
          : [selectedStatus],
    };
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    // handleFetchProducts();
    handleFetchProductsCount();
  }, [currentPage, selectedStatus]);
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  const filteredData = Array.isArray(data) && data.filter((item) => item);

  // console.log({ channels });
  const formattedTableData =
    Array.isArray(filteredData) &&
    filteredData.map((item) => {
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
      const channelsList =
        (Array.isArray(mergedChannels) &&
          mergedChannels.map((item) => item.channel_name)) ||
        [];
      console.log({ getChannelName, channelsList });

      // const getChannelName = channels.filter((it) => {
      //   if (it.channel_id === channel_id) return it.channel_name;
      //   return;
      // });
      const newLiveDate = (live_date && new Date(live_date)) || "";
      const formattedLiveDate =
        (live_date &&
          newLiveDate &&
          format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
        "";
      // console.log({ getChannelName });
      return {
        ...item,
        Product: display_image,
        "Master Item Id": master_item_id,
        "Master Product Id": master_product_id && (
          <TableCellAppLink href={`/app/products/${master_product_id}`}>
            {" "}
            {master_product_id}
          </TableCellAppLink>
        ),
        "Product Title": product_title,
        "Item Title": item_title,
        Status: status,
        "Channel Name": channelsList,

        // getChannelName,
        // Array.isArray(getChannelName) &&
        // getChannelName.length > 0 &&
        // getChannelName[0].channel_name,
        "Live Date": formattedLiveDate,
        "Unit Retail Price": `$ ${unit_retail_price}`,
      };
    });
  function getStr1(str) {
    return str.length > 20 ? str.slice(0, 20) + "..." : str;
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const ProductTableColumnData = [
    {
      accessorKey: "master_product_id",
      header: "Product",
      Cell: ({ cell }) => (
        <RenderProductDetails
          href={
            cell.row.original.status === "draft"
              ? `/app/products/create/product/${cell.row.original.master_product_id}?step=general-info&id=0`
              : `/app/products/${cell.row.original.master_product_id}?tab=overview&from=publish-products`
          }
          display_image={cell.row.original.display_image}
          title={cell.row.original["Product Title"]}
          sku={cell.row.original.sku}
          product_id={cell.row.original.master_product_id}
          barcode={cell.row.original.product_barcode}
          openInNewTab={true}
        />
      ),
      // minWidth: 450,
      size: 500,
      // flex: 1,
      // headerAlign: "center",
      // valueGetter: ({ value }) => value,
    },

    {
      accessorKey: "sku",
      header: "SKU",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {/* <Tooltip title={cell.row.original.sku}> */}
          {getStr1(cell.row.original.sku)}
          {/* </Tooltip> */}
        </Typography>
      ),
      size: 80,
      valueGetter: ({ value }) => value,
      muiTableBodyCellProps: {
        align: "left",
      },
      muiTableHeadCellProps: {
        align: "left",
      },
    },
    {
      accessorKey: "Channel Name",
      header: "Listed Channel",
      Cell: ({ cell }) => (
        <ListedChannelsNumber
          channels={cell.getValue()}
          channelDetails={cell.row.original.channels || []}
          // value={cell.getValue()}
          // channelList={params.row.channelList}
        />
      ),
      size: 100,
      // valueGetter: ({ value }) => value,
      // headerAlign: "center",
      // align: "center",
      muiTableBodyCellProps: {
        align: "center",
        // width: "20",
      },
      muiTableHeadCellProps: {
        align: "center",
        // width: "20",
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => (
        <Stack direction="column" alignItems={"center"}>
          <RenderStatusAsChip status={cell.getValue()} />

          {(cell.getValue() === "active" || cell.getValue() === "modified") && (
            <span style={{ marginTop: "4px" }}>
              {" "}
              Edited{" "}
              {formatDistance(
                getDateWithTimezone(cell.row.original.updated_at),
                new Date(),
                { addSuffix: true }
              ).replace("about", "")}{" "}
            </span>
          )}
        </Stack>
      ),
      size: 80,
      // valueGetter: ({ value }) => value,
      // headerAlign: "center",
      // align: "center",
      muiTableBodyCellProps: {
        align: "center",
        // width: "20",
      },
      muiTableHeadCellProps: {
        align: "center",
        // width: "20",
      },
    },

    // {
    // 	accessorKey: "total_qty",
    // 	header: "Inventory",
    // 	align: "right",
    // 	headerAlign: "right",
    // 	size: 90,
    // 	Cell: ({ cell }) => (
    // 		<Typography
    // 			sx={{
    // 				fontSize: "14px",
    // 				fontWeight: "600",
    // 				color: (theme) => theme.palette.text.secondary,
    // 			}}
    // 		>
    // 			{cell.getValue()}
    // 		</Typography>
    // 	),
    // 	muiTableBodyCellProps: {
    // 		align: "right",
    // 		// width: "20",
    // 	},
    // 	muiTableHeadCellProps: {
    // 		align: "right",
    // 		// width: "20",
    // 	},
    // },

    // {
    // 	accessorKey: "items_count",
    // 	header: "# of Variants",
    // 	align: "right",
    // 	headerAlign: "right",
    // 	size: 120,
    // 	Cell: ({ cell }) => (
    // 		<Typography
    // 			sx={{
    // 				fontSize: "14px",
    // 				fontWeight: "600",
    // 				color: (theme) => theme.palette.text.secondary,
    // 			}}
    // 		>
    // 			{cell.getValue()}
    // 		</Typography>
    // 	),
    // 	muiTableBodyCellProps: {
    // 		align: "right",
    // 		// width: "20",
    // 	},
    // 	muiTableHeadCellProps: {
    // 		align: "right",
    // 		// width: "20",
    // 	},
    // },
    {
      accessorKey: "Unit Retail Price",
      header: "Retail Price",
      // renderCell: (params) => <span>$ {params.value}</span>,
      Cell: ({ cell }) => (
        <RenderCurrency
          value={cell.row.original.item_unit_retail_price}
          currency={cell.row.original.currency}
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        />
      ),
      size: 120,
      // valueGetter: ({ value }) => value,
      headerAlign: "right",
      align: "right",
      muiTableBodyCellProps: {
        align: "right",
        // width: "20",
      },
      muiTableHeadCellProps: {
        align: "right",
        // width: "20",
      },
    },
    {
      accessorKey: "Time Log",
      Header: <span style={{ marginLeft: "24px" }}>Last Modified</span>,
      headerAlign: "center",
      align: "center",

      size: 180,
      Cell: ({ cell }) => (
        <Box sx={{ ml: 3 }}>
          {/* <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Created on:
            <RenderDate
              date={cell.row.original.created_at}
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                ml: 1,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
          </p> */}
          <p
            style={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {/* Last Modified:{" "}  */}
            <RenderDate
              date={cell.row.original.updated_at}
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                // ml: 1,
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </p>
        </Box>
      ),
      // valueGetter: ({ value }) => value,
      sortable: false,
      muiTableBodyCellProps: {
        align: "Center",
        // width: "20",
      },
      muiTableHeadCellProps: {
        align: "Center",
        // width: "20",
      },
    },
    // {
    // 	accessorKey: "updated_at",
    // 	Header: <span style={{ marginLeft: "8px" }}>Last Updated</span>,
    // 	headerAlign: "left",
    // 	align: "left",

    // 	size: 160,
    // 	Cell: ({ cell }) => (
    // 		<RenderDate
    // 			date={cell.getValue()}
    // 			sx={{
    // 				fontSize: "14px",
    // 				fontWeight: "600",
    // 				ml: 1,
    // 				color: (theme) => theme.palette.text.secondary,
    // 			}}
    // 		/>
    // 	),
    // 	valueGetter: ({ value }) => value,
    // 	sortable: false,
    // 	// muiTableBodyCellProps: {
    // 	// 	align: "center",

    // 	// },
    // 	// muiTableHeadCellProps: {
    // 	// 	align: "center",

    // 	// },
    // },
    {
      header: "Publish",
      Cell: ({ cell }) => (
        <>
          {cell.row.original.status !== "draft" && (
            <SecondaryButton
              size="small"
              sx={
                {
                  // height: "30px",
                  // width: "100px",
                  // // backgroundColor: "#EEEFFB",
                  // color: "#5860D7",
                  // "&:hover": {
                  // 	background: "#EEEFFB",
                  // },
                }
              }
              onClick={() => {
                router.push(
                  `/app/products/publish/${cell.row.original.master_product_id}/select-store`
                );
                dispatch(resetSingleProductPublishOnboardingSteps());
                dispatch(setSelectedPublishableStore([]));
              }}
              // sx={{
              // 	textTransform: "capitalize",
              // }}
            >
              {cell.row.original.status === "modified"
                ? "Publish modifications"
                : "List to new store"}
            </SecondaryButton>
          )}
        </>
      ),
      // valueGetter: (params) => params.id,
      headerAlign: "center",
      size: 100,
      align: "center",
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
  const pageMaxHeight =
    typeof window !== "undefined" ? window.innerHeight - 220 : 500;

  const handleCreateButtonClick = () => {
    const time = new Date().getTime();
    // router.push(`/app/products/create`);
    router.push(`/app/products/create/product/${time}?step=general-info&id=0`);
  };

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

  // if (
  //   // Array.isArray(formattedTableData) &&
  //   // formattedTableData.length === 0 &&
  //   Array.isArray(filteredData) &&
  //   filteredData.length === 0 &&
  //   !loading
  // ) {
  //   return (
  //     <NewEmptyState
  //       hidePoints
  //       icon={<ProductEmptyState />}
  //       title="Manage Products with Bluecom"
  //       titleDesc={
  //         "We didn’t find products. Select a below recommended actions to manage products with bluecom."
  //       }
  //       note1={"Create a product with bluecom"}
  //       ActionOne={"Create Product"}
  //       handleActionOne={() => handleCreateButtonClick()}
  //       note2={"Connect your store with bluecom"}
  //       ActionTwo={"Connect Your Store"}
  //       handleActionTwo={() => handleActionTwo()}
  //       note3={"Contact us to get help in onboarding"}
  //       ActionThree={"Contact Us"}
  //       handleActionThree={() => handleClickWebsite("bluecom.ai/contact-us")}
  //     ></NewEmptyState>
  //   );
  // }

  return (
    <Box>
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          // paddingBottom: "16px",
          // paddingY: "8px",
          paddingTop: 3,
          paddingBottom: 2,
        }}
      >
        <SectionTitleText
          sx={{
            fontSize: "20px",
            lineHeight: "32px",
            color: (theme) => theme.palette.primary.main,
            fontWeight: 600,
            // paddingBottom: "16px",
            // padding:"8px"
            "& span": {
              fontSize: "16px",
              fontWeight: 700,
              color: "#535353",
            },
          }}
        >
          Publish Products <span>({totalCount})</span>
        </SectionTitleText>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              mr: 3,
              "& span": {
                fontSize: "16px",
                fontWeight: 600,
              },
            }}
          >
            <span>Filter : </span>
            <MobileViewSelectChannelButton
              options={statusList}
              anchorRef={anchorRef}
              open={open}
              selectedIndex={selectedIndex}
              handleClick={handleClick}
              handleMenuItemClick={handleMenuItemClick}
              handleToggle={handleToggle}
              handleClose={handleClose}
            />
          </Box>

          <PrimaryButton
            // size="small"
            onClick={() => {
              router.push("/app/products/publish/bulk?step=select-store");
              dispatch(resetBulkProductPublishOnboardingSteps());
              dispatch(setSelectedPublishableStore([]));
              dispatch(setSelectedPublishableProducts([]));
            }}
            disabled={formattedTableData.length === 0}
          >
            Bulk Publish
          </PrimaryButton>
        </Box>
      </Box>
      {/* 

      {filteredData.length === 0 && (
        <EmptyState
          text={"No Products Available !"}
          bodyText={
            "Looks like you have not added any store .You can add new store by clicking below or add new products"
          }
          //   image={placeholder}
        />
      )}

      {loading && <PageLoader/> } */}

      {/* {Array.isArray(filteredData) &&
				filteredData.length === 0 &&
				!loading && (
					<EmptyState
						icon={<BundleES />}
						text={"Build Your Unique Bundle"}
						bodyText={"Click the button below to get started"}
					>
						<PrimaryButton
							onClick={() =>
								router.push(
									"/app/products/publish/bulk?step=select-store",
								)
							}
						>
							Create Bundle
						</PrimaryButton>
					</EmptyState>
				)} */}

      {/* {loading && <PageSpinner />} */}

      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
            sm: "none",
          },
        }}
      >
        {/* {filteredData.length > 0 && ( */}
        <ProductPublishPageTable
          data={formattedTableData}
          columnsData={ProductTableColumnData}
          totalCount={totalCount}
          loading={loading}
          pageMaxHeight={pageMaxHeight}
        />

        {/* // <MuiBaseDataGrid
					//   rowIdkey={"master_product_id"}
					//   columnDefData={ProductTableColumnData}
					//   data={formattedTableData}
					//   checkboxSelection={false}
					//   shallUseRouter={true}
					//   basePath={`/app/products/publish?`}
					//   totalRows={totalCount}
					// />
				// )} */}
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
            sm: "block",
          },
        }}
      >
        <MobileViewAppPageSection
          buttonTitle={`Bulk Publish`}
          shallUseRouter={true}
          basePath={`/app/products/publish?`}
          totalCount={totalCount}
          title={"Publish Products"}
          loading={loading}
          tableData={formattedTableData}
        />
      </Box>
    </Box>
  );
}

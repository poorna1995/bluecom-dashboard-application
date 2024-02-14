import {
  Box,
  IconButton,
  Pagination,
  Tooltip,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import imageList1 from "public/assets/imageList1.png";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import lodash, { orderBy } from "lodash";
import LinkButton from "components/Common/Buttons/LinkButton";
import WarehouseTableDialog from "sections/AppPageSections/CommonComponents/WarehouseTableDialog";
import WarehouseTable from "./WarehouseTable";
import ItemsTable from "./ItemsTable";
import AppLink from "components/Common/AppLink";
import AppImage from "components/Common/AppImage";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderImageWithText from "components/Common/Tables/RenderComponents/RenderImageWithText";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import { useRouter } from "next/router";
import BundleES from "components/Common/Icons/EmptyStates/BundleES";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import MobileViewInventoryCard from "./components/MobileViewComponents/MobileViewInventoryCard";
import MobileViewInventoryVariantsDrawer from "./components/MobileViewComponents/MobileViewInventoryVariantsComponents/MobileViewInventoryVariantsDrawer";
import INVENTORY_DRAWER_TYPE from "constants/status/inventoryDrawerType";
import MobileViewInventoryLocationsDrawer from "./components/MobileViewComponents/MobileViewInventoryLocationsDrawer";
import EditIcon from "components/Common/Icons/EditIcon";
import EditIconPencile from "components/Common/Icons/EditIconPencile";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import ButtonIconSecondary from "components/Common/Buttons/ButtonIconSecondary";
import { formatDistance } from "date-fns";
import { getDateWithTimezone } from "utils/dateUtils/getFormattedDate";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import { resetStore } from "redux/onboarding/onboardingSlice";
import InventoryES from "components/Common/Icons/EmptyStates/InventoryES";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import PullInventoryDialog from "./components/PullInventoryDialog";
import { enqueueSnackbar } from "notistack";

const mapState = ({ user, views, tasks }) => ({
  currentUser: user.currentUser,
  inventoryMobileViewDrawerStatus: views.inventoryMobileViewDrawerStatus,
  syncInventoryTaskId: tasks.syncInventoryTaskId,
});
export default function InventoryPageSection() {
  const { currentUser, inventoryMobileViewDrawerStatus, syncInventoryTaskId } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage } = router.query;
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openWarehouseDialog, setOpenWarehouseDialog] = useState(false);
  const [openItemsDialog, setOpenItemsDialog] = useState(false);
  const [warehouseData, setWarehouseData] = useState([]);
  const [itemsDialogData, setItemsDialogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const { type, status, product_id, data } =
    (inventoryMobileViewDrawerStatus && inventoryMobileViewDrawerStatus) || {};

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

          // console.log({ json });
          handleFetchInventoryData();
        }
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {});
  };

  const handleFetchInventoryData = () => {
    const url = PRODUCT.MERCHANT.FETCH_PRODUCT_LEVEL_INVENTORY;
    // `https://api.bluecom.ai/api/merchant/productlevelagg`;
    //  PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
    setLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
      page: Number(currentPage) || 1,
      per_page: 10,
    };
    setIsLoading(true);
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        setInventoryData(json.result);
        setLoading(false);
      })
      .catch(
        (err) => console.log(err)
        // setLoading(false);
      );
  };
  useEffect(() => {
    // handleFetchInventoryData();
    handleFetchProductsCount();
  }, [currentPage]);

  const groupByMasterProductId = lodash.groupBy(
    inventoryData,
    "master_product_id"
  );
  const groupByInventoryItemId = lodash.groupBy(
    inventoryData,
    "inventory_item_id"
  );
  const getSumOfItems = Object.entries(groupByMasterProductId).map(
    ([key, value]) => {
      const getItemSum = lodash.sumBy(value, "available");
      return {
        "Master Product Id": key,
        "Total Qty available": getItemSum,
      };
    }
  );
  // console.log({
  //   groupByMasterProductId,
  //   groupByInventoryItemId,
  //   getSumOfItems,
  // });

  const handleOpenWarehouseDialog = (data, master_product_id) => {
    setOpenWarehouseDialog(true);
    setWarehouseData(data);
    setSelectedProductId(master_product_id);
  };
  const handleCloseWarehouseDialog = () => {
    setOpenWarehouseDialog(false);
    setWarehouseData([]);
    setSelectedProductId(null);
  };
  const handleOpenItemsDialog = (data, master_product_id) => {
    setOpenItemsDialog(true);
    setItemsDialogData(data);
    setSelectedProductId(master_product_id);
  };
  const handleCloseItemsDialog = () => {
    setOpenItemsDialog(false);
    setItemsDialogData([]);
    setSelectedProductId(null);
  };

  function getStr1(str) {
    return str.length > 20 ? str.slice(0, 20) + "..." : str;
  }

  const formattedInventoryData =
    Array.isArray(inventoryData) &&
    inventoryData.length > 0 &&
    orderBy(
      inventoryData.map((item) => {
        const {
          display_image,
          master_product_id,
          sku,
          product_barcode,
          channel,
          product_title,
          warehouse_count,
          items,
          total_qty,
          warehouse,
          items_count,
        } = item;

        return {
          ...item,
          Product: display_image,
          // "Master Item Id": master_item_id,
          // "Master Product Id": (
          // 	<TableCellAppLink
          // 		href={`/app/products/${master_product_id}`}
          // 	>
          // 		{master_product_id}
          // 	</TableCellAppLink>
          // ),
          "Master Product Id": master_product_id,
          // Image: <AppImage src={display_image} height="60" width="60" />,
          "Product Title":
            // <Typography sx={{ fontSize: "14px"}}>
            // 	<TableCellAppLink
            // 		href={`/app/products/${master_product_id}`}
            // 	>
            // 		{product_title}
            // 	</TableCellAppLink>
            // </Typography>
            product_title,

          // "Item Title": item_title,
          // Status: status,
          // "Unit Retail Price": unit_retail_price,

          "Total QTY available": total_qty,
          // channel_id,
          // "Inventory Item Id": inventory_item_id,
          // "Warehouse name": wh_name,
          "# Warehouses": warehouse_count,
          "# Items": (
            <LinkButton
              onClick={() => handleOpenItemsDialog(items, master_product_id)}
            >
              {items_count} Variants
            </LinkButton>
          ),
        };
      }),
      "available",
      "desc"
    );

  const inventoryTableColumnData = [
    {
      accessorKey: "Product Title",
      header: "Product",
      Cell: ({ cell }) => (
        // <RenderImageWithText
        //   title={cell.row.original["Product Title"]}
        //   display_image={cell.row.original.display_image}
        // />
        <RenderProductDetails
          href={`/app/products/${cell.row.original["Master Product Id"]}?tab=overview`}
          title={cell.row.original["Product Title"]}
          barcode={cell.row.original.product_barcode || "-"}
          // product_id={cell.row.original["Master Product Id"]}
          sku={cell.row.original.product_sku || "-"}
          display_image={cell.row.original.display_image}
        />
      ),
      minWidth: 360,
      minSize: 360,
      size: 400,
      flex: 1,
    },
    {
      accessorKey: "channels",
      header: "Listing Channel",
      Cell: ({ cell }) => (
        // <ChannelGroups channelDetails={cell.row.original.channels || "-"} />
        <ListedChannelsNumber
          channels={cell.getValue()}
          channelDetails={cell.row.original.channels || []}
        />
      ),
      // flex: 1,
      size: 200,
      muiTableBodyCellProps: {
        // align: "right",
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "product_sku",
      header: "SKU",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {cell.row.original.product_sku || "-"}
        </Typography>
      ),
      // flex: 1,
      size: 100,
      muiTableBodyCellProps: {
        align: "left",
      },
      muiTableHeadCellProps: {
        align: "left",
      },
    },
    {
      accessorKey: "last updated",
      header: "Last Updated",
      Cell: ({ cell }) => (
        <>
          <RenderDate
            date={cell.row.original.inventory_updated_at}
            renderAsDistance={true}
          />
          {/* <Stack direction="column" alignItems={"center"}>
            Edited{" "} 
            {formatDistance(getDateWithTimezone(cell.getValue()), new Date(), {
              addSuffix: true,
            }).replace("about", "")}{" "}
          </Stack> */}
        </>
      ),
      width: 120,
      size: 120,
      flex: 1,
      muiTableBodyCellProps: {
        align: "left",
      },
      muiTableHeadCellProps: {
        align: "left",
      },
      valueGetter: ({ value }) => value,
    },

    {
      accessorKey: "items_count",
      // header: "# Of Variants",
      header: "By Variants",
      Cell: ({ cell }) => (
        <Button
          size="small"
          disableRipple
          sx={{
            // textAlign: "right",
            fontWeight: "500 !important",
            color: (theme) => theme.palette.primary.main,
            "&:after": {
              borderBottom: "1px solid",
              position: "absolute",
              bottom: "12px",
              left: "18px",
              content: '""',
              width: "20%",
            },

            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              background: "transparent",
              // textDecoration: "underline",
              "& svg": {
                visibility: "visible",
              },
            },
            "& svg": {
              visibility: "hidden",
            },
          }}
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#4F44E0"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onClick={() =>
            handleOpenItemsDialog(
              cell.row.original.items,
              cell.row.original.master_product_id
            )
          }
        >
          {cell.row.original.items_count || "-"}
        </Button>
      ),

      size: 100,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "# Warehouses",
      header: "By Locations",
      Cell: ({ cell }) => (
        <Button
          size="small"
          disableRipple
          sx={{
            fontWeight: "500 !important",
            color: (theme) => theme.palette.primary.main,
            "&:after": {
              borderBottom: "1px solid",
              position: "absolute",
              bottom: "12px",
              left: "18px",
              content: '""',
              width: "20%",
            },
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              background: "transparent",
              // textDecoration: "underline",
              "& svg": {
                visibility: "visible",
              },
            },
            "& svg": {
              visibility: "hidden",
            },
          }}
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#4F44E0"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onClick={() =>
            handleOpenWarehouseDialog(
              cell.row.original.warehouse,
              cell.row.original.master_product_id
            )
          }
        >
          {cell.row.original["# Warehouses"] || "-"}
        </Button>
      ),

      width: 100,
      size: 100,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "available",
      header: "On Hand",
      Cell: ({ cell }) => (
        <>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {cell.getValue() || "-"}

            {/* {cell.getValue() || 0} available at{" "}
          {cell.row.original.warehouse_count} locations{" "} */}
          </span>
          {/* <IconButton
            sx={{
              backgroundColor: "#F5F5F5",
              ml: "8px",
              textAlgin: "right",
            }}
            onClick={() =>
              router.push(
                `/app/inventory/${cell.row.original.master_product_id}`
              )
            }
          >
            <EditIconPencile />
          </IconButton> */}
        </>
      ),
      width: 80,
      size: 80,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
        // px: 2,
      },
      valueGetter: ({ value }) => value,
      sortable: false,
    },
    {
      accessorKey: "update",
      header: "Manage Inventory",
      Cell: ({ cell }) => (
        <ButtonIconSecondary
          size="smallIcon"
          sx={{
            // backgroundColor: "#F5F5F5",
            // ml: "8px",
            // textAlgin: "right",
            width: "40px",
          }}
          onClick={() =>
            router.push(`/app/inventory/${cell.row.original.master_product_id}`)
          }
        >
          {/* Take Action */}
          <EditIconPencile />
        </ButtonIconSecondary>
      ),
      width: 100,
      size: 100,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      valueGetter: ({ value }) => value,
    },

    // {
    //   accessorKey: "actions",
    //   header: "",
    //   size: 100,
    // },
  ];

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
  const [openPullInventoryDialog, setOpenPullInventoryDialog] = useState(false);
  const handleOpenPullInventoryDialog = () => {
    setOpenPullInventoryDialog(true);
  };
  const handleClosePullInventoryDialog = () => {
    setOpenPullInventoryDialog(false);
  };
  const handlePullInventoryButton = () => {
    console.log("handlePullInventoryButton");
    handleOpenPullInventoryDialog();
  };
  React.useEffect(() => {
    if (syncInventoryTaskId) {
      enqueueSnackbar("Syncing Inventory", {
        variant: "syncInventory",
        persist: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [syncInventoryTaskId]);

  const handleCreateButtonClick = () => {
    const time = new Date().getTime();
    // router.push(`/app/products/create`);
    router.push(`/app/products/create/product/${time}?step=general-info&id=0`);
  };

  if (loading) {
    return <PageSpinner />;
  }
  if (totalCount === 0 && !loading) {
    return (
      <NewEmptyState
        hidePoints
        icon={<InventoryES />}
        title="Manage Inventory with Bluecom"
        titleDesc={
          "We didn’t find inventory data with this account.  Select below recommended actions to start managing inventory with bluecom."
        }
        note1={"Create a product and add inventory"}
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
    <div style={{ paddingBottom: "32px" }}>
      {/* {formattedInventoryData.length === 0 && (
      <EmptyState />
      )}
      {loading && <PageSpinner/> } */}

      {/* {formattedInventoryData.length === 0 && !loading && <EmptyState />} */}

      {/* {loading && <PageSpinner />} */}

      {/* {isLoading && <SectionLoader />} */}
      {/* {!isLoading && (
				<>
					{Array.isArray(formattedInventoryData) &&
						formattedInventoryData.length > 0 && (
							<> */}
      {/* {formattedInventoryData.length}
					{inventoryData.length} */}
      {/* {formattedInventoryData.length > 0 && ( */}
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        {totalCount === 0 && !loading && (
          <SectionTitleText
            sx={{
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "34px",
              mt: "8px",
              mb: "12px",
              color: "#484A9E",
            }}
          >
            Manage Inventory
          </SectionTitleText>
        )}
        <AppPageSections
          title={"Manage Inventory"}
          views={["list"]}
          buttonTitle="Sync Inventory"
          handleCreateButtonClick={() => handlePullInventoryButton()}
          hasCustomClickFunction={true}
          tableData={formattedInventoryData}
          columnData={inventoryTableColumnData}
          loading={loading}
          isUsingMuiGrid={false}
          basePath={`/app/inventory?`}
          totalCount={totalCount}
          shallUseRouter={true}
          hideFilters={true}
          hideCreateButton={false}
          hidePublishButton={true}
          createButtonIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="refresh-icon"
            >
              <path
                d="M16.3897 4.44803C16.2157 4.67649 16.1395 4.96469 16.1779 5.24929C16.2163 5.53389 16.3661 5.7916 16.5944 5.96578C17.7768 6.86658 18.6685 8.09493 19.1587 9.49822C19.6489 10.9015 19.716 12.4179 19.3516 13.859C18.9873 15.3001 18.2076 16.6024 17.1093 17.6041C16.0111 18.6058 14.6428 19.2628 13.1743 19.4934L13.9424 18.7242C14.1398 18.5199 14.249 18.2462 14.2465 17.9622C14.244 17.6781 14.1301 17.4064 13.9292 17.2056C13.7284 17.0047 13.4567 16.8908 13.1726 16.8883C12.8886 16.8858 12.6149 16.995 12.4106 17.1924L9.70225 19.9007C9.49916 20.1039 9.38507 20.3794 9.38507 20.6666C9.38507 20.9539 9.49916 21.2294 9.70225 21.4325L12.4106 24.1409C12.6149 24.3382 12.8886 24.4474 13.1726 24.4449C13.4567 24.4425 13.7284 24.3285 13.9292 24.1277C14.1301 23.9268 14.244 23.6551 14.2465 23.3711C14.249 23.087 14.1398 22.8134 13.9424 22.609L13.0292 21.6969C14.9706 21.4906 16.8054 20.7063 18.296 19.4455C19.7866 18.1847 20.8645 16.5055 21.39 14.6252C21.9155 12.7449 21.8646 10.7502 21.2437 8.89921C20.6227 7.04825 19.4605 5.42628 17.9074 4.24328C17.679 4.06927 17.3908 3.99309 17.1062 4.03149C16.8216 4.06988 16.5639 4.21971 16.3897 4.44803ZM14.2988 2.56737L11.5905 -0.140967C11.396 -0.337326 11.1338 -0.451919 10.8576 -0.461291C10.5814 -0.470662 10.312 -0.374104 10.1046 -0.191379C9.89726 -0.00865492 9.76758 0.246416 9.74212 0.521626C9.71666 0.796835 9.79735 1.07137 9.96767 1.28903L10.0576 1.39087L10.9708 2.30412C9.06188 2.50717 7.25532 3.26919 5.77762 4.49466C4.29992 5.72012 3.21682 7.3545 2.66408 9.19294C2.11135 11.0314 2.11357 12.9921 2.67048 14.8292C3.22738 16.6664 4.31419 18.2983 5.79467 19.5205C6.01693 19.6963 6.29928 19.7781 6.58114 19.7483C6.863 19.7184 7.12193 19.5792 7.30238 19.3606C7.48283 19.1421 7.57043 18.8615 7.54638 18.579C7.52234 18.2966 7.38856 18.0349 7.17375 17.85C6.04726 16.9197 5.21336 15.684 4.77225 14.2913C4.33114 12.8985 4.3016 11.408 4.68718 9.9989C5.07275 8.58978 5.85704 7.32197 6.94579 6.34785C8.03454 5.37372 9.38142 4.73471 10.8246 4.50762L10.0576 5.2757C9.86329 5.47065 9.75049 5.73225 9.74209 6.00737C9.73369 6.28248 9.83032 6.55047 10.0124 6.75692C10.1944 6.96336 10.4482 7.09278 10.7222 7.11888C10.9962 7.14498 11.2698 7.06581 11.4876 6.89745L11.5894 6.80753L14.2978 4.0992C14.4843 3.91266 14.5963 3.66447 14.6129 3.40119C14.6294 3.13791 14.5494 2.87764 14.3877 2.6692L14.2988 2.56737Z"
                fill="#fff"
              />
            </svg>
          }
          // renderEmptyRowsFallback={() => (
          //   <NewEmptyState
          //     hidePoints
          //     icon={<InventoryES />}
          //     title="Manage Inventory with Bluecom"
          //     titleDesc={
          //       "We didn’t find inventory data with this account.  Select below recommended actions to start managing inventory with bluecom."
          //     }
          //     note1={"Create a product and add inventory"}
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
          //   ></NewEmptyState>
          // )}
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
        <MobileViewAppPageSection
          title={`Inventory`}
          hideButton
          basePath={`/app/inventory?`}
          totalCount={totalCount}
          loading={loading}
          tableData={formattedInventoryData}
          component={MobileViewInventoryCard}
          shallUseRouter={true}
        />
      </Box>
      {/* )} */}
      {/* </>
						)} */}

      <PullInventoryDialog
        open={openPullInventoryDialog}
        handleClose={handleClosePullInventoryDialog}
      />

      <WarehouseTableDialog
        open={openWarehouseDialog}
        handleClose={() => handleCloseWarehouseDialog()}
      >
        <WarehouseTable
          warehouseData={warehouseData}
          masterProductId={selectedProductId}
        />
      </WarehouseTableDialog>

      <WarehouseTableDialog
        open={openItemsDialog}
        handleClose={() => handleCloseItemsDialog()}
      >
        <ItemsTable
          itemsData={itemsDialogData}
          masterProductId={selectedProductId}
        />
      </WarehouseTableDialog>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        {type === INVENTORY_DRAWER_TYPE.VARIANTS ? (
          <MobileViewInventoryVariantsDrawer />
        ) : (
          <MobileViewInventoryLocationsDrawer />
        )}
      </Box>
      {/* </>
			)} */}
    </div>
  );
}

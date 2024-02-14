import { Box, Button, DialogActions, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SuccessDialogForPO from "../PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { INVENTORY, PRODUCT, WAREHOUSE } from "constants/API_URL";
import { countBy, sumBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProductOnboardingSteps,
  resetSingleProductPublishOnboardingSteps,
  updateComponentOnboardingSteps,
  updateProductOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import {
  setSelectedPublishableStore,
  updateCreateProductData,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingInventoryInfoSection from "../ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import InventoryAvailableItem from "../ProductOnboardingSection/InventoryAvailableItem";
import NewProductOnboardingWarhouseListDialog from "./components/NewProductOnboardingWarhouseListDialog";
import SaveProductDialog from "./components/SaveProductDialog";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
import MRTCustomTableWithDynamicGrouping from "./components/CustomGroupedTable/MRTCustomTableWithDynamicGrouping";
import CustomTableWithDynamicGrouping from "./components/CustomGroupedTable/CustomTableWithDynamicGrouping";
import CustomGroupedTable from "./components/CustomGroupedTable";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { enqueueSnackbar, useSnackbar } from "notistack";
import SaveAsDraftComponent from "./components/SaveAsDraftComponent";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
const mapState = ({ user, productsData }) => ({
  productsData,
  currentUser: user.currentUser,
});
export default function NewProductOnboardingVariantLevelInventorySection({
  keyForReduxStateData,
  hideContinueNavigation,
}) {
  const { productsData, currentUser } = useSelector(mapState);
  const router = useRouter();
  const dispatch = useDispatch();
  const productsDataFromState = productsData[keyForReduxStateData];
  const items = productsDataFromState.items;
  const IS_COMPONENT = productsDataFromState.is_component === true;
  const { enqueueSnackbar } = useSnackbar();
  const pageId = router.query.productId;
  const [warehouseList, setWarehouseList] = useState([]);
  const [productWarehouseInventory, setProductWarehouseInventory] = useState(
    []
  );
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [hasInventory, setHasInventory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
    router.push("/app/products");
  };
  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  // useEffect(() => {
  // 	handleFetchWarehouse();
  // }, []);

  const handleFetchWarehouse = () => {
    const URL = WAREHOUSE.SEARCH_WAREHOUSE;

    const data = {
      user_id: currentUser.merchant_id,
      search_value: "",
    };

    appFetch(URL, data)
      .then((json) => {
        setWarehouseList(json.result);
      })
      .catch((err) => console.log(err));
  };

  const handleWarehouseInventoryChange = (field) => {
    return (e) => {
      const { value } = e.target;
      setProductWarehouseInventory((prevState) => {
        const data = prevState.filter((item) => item.wh_id !== field);
        return [
          ...data,
          {
            wh_id: field,
            available: value,
            // [field]: value,
          },
        ];
      });
    };
  };

  const columnData = [
    {
      field: "item_display_image",
      accessorKey: "item_display_image",
      Header: "Image",
      headerName: "Image",
      width: 100,
      size: 100,
      renderCell: (params) => (
        <AppImage
          src={params.value || params.row.display_image}
          width="56"
          height="56"
          sx={{
            borderRadius: "5px",
            // cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}

          // onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
      Cell: ({ cell }) => (
        <AppImage
          src={
            // cell.getValue() ||
            (cell.row.original.item_display_image &&
              cell.row.original.item_display_image) ||
            cell.row.original.display_image
          }
          width="48"
          height="48"
          sx={{
            borderRadius: "5px",
            // cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}

          // onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
      // valueGetter: (params) => {
      //   return (params.row.item_display_image = ""
      //     ? params.row.display_image
      //     : params.row.item_display_image);
      // },
    },
    {
      field: "item_title",
      accessorKey: "item_title",
      Header: "Variant Name",
      headerName: "Variant Name",

      // width: 200,
      flex: 1,
      size: 600,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#212121",
          }}
        >
          {params.row.product_title}
          <div
            style={{
              fontWeight: "500",
            }}
          >
            {params.value ||
              (Array.isArray(params.row.options) &&
                params.row.options.map((item) => item.value).join(" / "))}
          </div>
        </Typography>
      ),
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#212121",
          }}
        >
          {cell.row.original.product_title}
          <div
            style={{
              fontWeight: "500",
            }}
          >
            {cell.getValue() ||
              (Array.isArray(cell.row.original.options) &&
                cell.row.original.options
                  .map((item) => item.value)
                  .join(" / "))}
          </div>
        </Typography>
      ),
    },
    // {
    // 	field: "sku",
    // 	headerName: "Variant SKU",
    // 	// width: 200,
    // 	flex: 1,
    // renderCell: (params) => (
    // 	<TextInput
    // 		value={params.value}
    // 		containerStyles={{
    // 			width: "100%",
    // 			marginTop: "0px",
    // 		}}
    // 		inputStyles={{
    // 			paddingTop: "8px",
    // 			paddingBottom: "8px",
    // 		}}
    // 		onChange={(e) => handleChangeValue(e, "sku", params.row.id)}
    // 		onBlur={(e) => handleBlurValue(e, "sku", params.row.id)}
    // 	/>
    // ),
    // },
    // {
    // 	field: "unit_retail_price",
    // 	headerName: "Price",
    // 	width: 200,
    // 	// renderCell: (params) => (
    // 	// 	<TextInput
    // 	// 		value={params.value}
    // 	// 		containerStyles={{
    // 	// 			width: "100%",
    // 	// 			marginTop: "0px",
    // 	// 		}}
    // 	// 		inputStyles={{
    // 	// 			paddingTop: "8px",
    // 	// 			paddingBottom: "8px",
    // 	// 		}}
    // 	// 		onChange={(e) =>
    // 	// 			handleChangeValue(e, "unit_retail_price", params.row.id)
    // 	// 		}
    // 	// 		onBlur={(e) =>
    // 	// 			handleBlurValue(e, "unit_retail_price", params.row.id)
    // 	// 		}
    // 	// 	/>
    // 	// ),
    // },
    // {
    // 	field: "unit_cost_price",
    // 	headerName: "Cost Price",
    // 	width: 200,
    // 	// renderCell: (params) => (
    // 	// 	<RenderTextInput
    // 	// 		params={params}
    // 	// 		onChange={(e) =>
    // 	// 			handleChangeValue(e, "unit_cost_price", params.row.id)
    // 	// 		}
    // 	// 		onBlur={(e) =>
    // 	// 			handleBlurValue(e, "unit_cost_price", params.row.id)
    // 	// 		}
    // 	// 	/>
    // 	// ),
    // },
    {
      field: "channels",
      accessorKey: "channels",
      Header: "Listing Channel",
      headerName: "Listing Channel",
      renderCell: (params) => (
        <ChannelGroups channelDetails={params.row.channels || []} />
      ),
      Cell: ({ cell }) => (
        <ChannelGroups channelDetails={cell.row.original.channels || []} />
      ),
      size: 180,
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
      field: "inventory",
      accessorKey: "inventory",
      Header: "Inventory",

      headerName: "Inventory",
      renderCell: (params) => <>{params.row.total || "-"}</>,
      Cell: ({ cell }) => <>{cell.row.original.total || "-"}</>,
      // width: 200,
      // flex: 1,
      headerAlign: "center",
      align: "center",
      width: 250,
      size: 200,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      field: "action",
      accessorKey: "action",
      Header: "Action",
      headerName: "Action",
      renderCell: (params) => (
        <Button
          disableRipple
          sx={{
            textTransform: "capitalize",
            textDecoration: "underline",
            "&:hover": {
              background: "none",
              textDecoration: "underline",
            },
          }}
          onClick={(e) =>
            handleOpenDialog(
              e,
              params.row.id,
              params.row.hasInventory,
              params.row.inventory
            )
          }
        >
          Add Inventory
          {/* {params.row.hasInventory ? "Update Inventory" : "Add Inventory"} */}
        </Button>
      ),
      Cell: ({ cell }) => (
        <Button
          sx={{
            textTransform: "capitalize",
            textDecoration: "underline",
          }}
          onClick={(e) =>
            handleOpenDialog(
              e,
              cell.row.original.master_item_id,
              cell.row.original.hasInventory,
              cell.row.original.inventory
            )
          }
          size="small"
        >
          Add Inventory
          {/* {params.row.hasInventory ? "Update Inventory" : "Add Inventory"} */}
        </Button>
      ),

      headerAlign: "center",
      align: "center",
      width: 200,
      size: 200,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },

    // {
    // 	field: "action",
    // 	headerName: "Action",
    // 	renderCell: (params) => (
    // 		<IconButton>
    // 			<MoreOptionsIcon />
    // 		</IconButton>
    // 	),
    // },
  ];
  const productColumnData = [
    {
      field: "display_image",
      accessorKey: "display_image",
      Header: "Image",
      size: 100,
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <AppImage
          src={params.value ?? params.row.display_image}
          width="56"
          height="56"
          sx={{
            borderRadius: "5px",
            // cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}

          // onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
      Cell: ({ cell }) => (
        <AppImage
          src={cell.getValue() ?? cell.row.original.display_image}
          width="56"
          height="56"
          sx={{
            borderRadius: "5px",
            // cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}

          // onClick={(e) => handleOpenDialog(e, params.row.id)}
        />
      ),
      valueGetter: (params) => {
        return params.row.display_image ?? params.row.display_image;
      },
    },
    {
      field: "product_title",
      accessorKey: "product_title",
      Header: "Product Name",
      size: "800",
      headerName: "Product Name",
      // width: 200,
      flex: 1,
    },
    // {
    // 	field: "sku",
    // 	headerName: "Variant SKU",
    // 	// width: 200,
    // 	flex: 1,
    // renderCell: (params) => (
    // 	<TextInput
    // 		value={params.value}
    // 		containerStyles={{
    // 			width: "100%",
    // 			marginTop: "0px",
    // 		}}
    // 		inputStyles={{
    // 			paddingTop: "8px",
    // 			paddingBottom: "8px",
    // 		}}
    // 		onChange={(e) => handleChangeValue(e, "sku", params.row.id)}
    // 		onBlur={(e) => handleBlurValue(e, "sku", params.row.id)}
    // 	/>
    // ),
    // },
    // {
    // 	field: "unit_retail_price",
    // 	headerName: "Price",
    // 	width: 200,
    // 	// renderCell: (params) => (
    // 	// 	<TextInput
    // 	// 		value={params.value}
    // 	// 		containerStyles={{
    // 	// 			width: "100%",
    // 	// 			marginTop: "0px",
    // 	// 		}}
    // 	// 		inputStyles={{
    // 	// 			paddingTop: "8px",
    // 	// 			paddingBottom: "8px",
    // 	// 		}}
    // 	// 		onChange={(e) =>
    // 	// 			handleChangeValue(e, "unit_retail_price", params.row.id)
    // 	// 		}
    // 	// 		onBlur={(e) =>
    // 	// 			handleBlurValue(e, "unit_retail_price", params.row.id)
    // 	// 		}
    // 	// 	/>
    // 	// ),
    // },
    // {
    // 	field: "unit_cost_price",
    // 	headerName: "Cost Price",
    // 	width: 200,
    // 	// renderCell: (params) => (
    // 	// 	<RenderTextInput
    // 	// 		params={params}
    // 	// 		onChange={(e) =>
    // 	// 			handleChangeValue(e, "unit_cost_price", params.row.id)
    // 	// 		}
    // 	// 		onBlur={(e) =>
    // 	// 			handleBlurValue(e, "unit_cost_price", params.row.id)
    // 	// 		}
    // 	// 	/>
    // 	// ),
    // },
    {
      field: "inventory",
      accessorKey: "inventory",
      Header: "Inventory",
      headerName: "Inventory",
      renderCell: (params) => <>{params.row.total}</>,
      Cell: ({ cell }) => <>{cell.row.original.total}</>,
      // width: 200,
      // flex: 1,
      headerAlign: "center",
      align: "center",
      width: 250,
      // flex: 3,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Button
          sx={{
            textTransform: "capitalize",
          }}
          onClick={(e) =>
            handleOpenDialog(
              e,
              params.row.id,
              params.row.hasInventory,
              params.row.inventory
            )
          }
        >
          {params.row.hasInventory ? "Update Inventory" : "Add Inventory"}
        </Button>
      ),
      headerAlign: "center",
      align: "center",
      width: 200,
    },

    // {
    // 	field: "action",
    // 	headerName: "Action",
    // 	renderCell: (params) => (
    // 		<IconButton>
    // 			<MoreOptionsIcon />
    // 		</IconButton>
    // 	),
    // },
  ];
  const [tableItems, setTableItems] = useState(items ?? []);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleOpenDialog = (e, id, hasInventory, inventory) => {
    e.preventDefault();
    setOpenDialog(true);
    setSelectedItemId(id);
    setHasInventory(hasInventory);
    setSelectedInventory(inventory);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // enqueueSnackbar("Inventory updated successfully", {
    // 	variant: "success",
    // });

    setProductWarehouseInventory([]);
    setSelectedItemId(null);
  };
  useEffect(() => {
    setTableItems(items);
  }, [items]);

  const getTableItemsWithInventory = (tableItems) => {
    const getSum =
      Array.isArray(tableItems) &&
      tableItems.map((item) => {
        const sum = sumBy(item.inventory, "available") ?? 0;
        const count = item.inventory.length ?? 0;
        return {
          ...item,
          total:
            (sum && count && `${sum} available at ${count} locations`) || "N/A",
          hasInventory: sum > 0,
        };
      });
    return getSum;
  };
  const tableList = getTableItemsWithInventory(tableItems);
  console.log({
    tableList,
  });

  const mergeTwoArrays = (arr1 = [], arr2 = []) => {
    const result =
      Array.isArray(arr1) &&
      arr1.map((item) => {
        const data =
          Array.isArray(arr2) &&
          arr2.find((item2) => item2.wh_id === item.wh_id);
        return {
          ...item,
          ...data,
        };
      });
    return result ?? [];
  };

  const mergedWarehouseList = mergeTwoArrays(
    warehouseList,
    productWarehouseInventory
  );

  const handleClickDoneButton = (e) => {
    const url = INVENTORY.ADD_INVENTORY;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,
      master_item_id: selectedItemId,

      inventory: productWarehouseInventory,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          handleCloseDialog();
          setProductWarehouseInventory([]);
          handleFetchProductData();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    console.log("data", data);
  };

  const handleFetchProductData = async () => {
    setLoading(true);

    const url = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,
    };
    const json = await appFetch(url, data);
    console.log({ json });
    if (json.status === "success") {
      // ! old code
      // dispatch(updateCreateProductData(json.result[0]));
      // setTableItems(json.result[0].items);

      // ! new code
      dispatch(
        updateCreateProductData({
          ...productsDataFromState,
          items: json.result,
        })
      );
      setTableItems(json.result);
      setLoading(false);
      // dispatch(setCreateProductSelectedOptions(selectedOptions));
      // console.log({ json });
    }
  };

  useEffect(() => {
    handleFetchProductData();
  }, []);
  const [inventoryZeroDialogOpen, setInventoryZeroDialogOpen] = useState(false);
  const handleInventoryZeroDialogOpen = () => {
    setInventoryZeroDialogOpen(true);
  };
  const handleInventoryZeroDialogClose = () => {
    setInventoryZeroDialogOpen(false);
  };
  const handleClickContinueButton = () => {
    if (isInventoryZero()) {
      return handleInventoryZeroDialogOpen();
    }
    handleCreateProduct();
  };
  const handleCreateProduct = () => {
    setLoading(true);
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      ...productsDataFromState,
      status: "unlisted",
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          // handleNextPage();
          setLoading(false);
          handleInventoryZeroDialogClose();
          if (IS_COMPONENT) {
            dispatch(
              updateComponentOnboardingSteps({
                step: "inventory",
              })
            );
            return handleOpenSaveDialog();
          }

          dispatch(
            updateProductOnboardingSteps({
              step: "inventory",
              // nextStep: "inventory",
            })
          );
          handleOpenSaveDialog();

          // router.push(`/app/products`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  const maxHeight =
    typeof window !== "undefined" ? window.innerHeight - 220 : 0;

  const handleGoToHomeButtonClick = () => {
    setOpenSaveDialog(false);
    setLoading(true);
    router.push("/app/products");

    dispatch(resetProductOnboardingSteps());
  };
  const handlePublishNowButtonClick = () => {
    setOpenSaveDialog(false);
    setLoading(true);
    router.push(`/app/products/publish/${pageId}/select-store`);

    dispatch(resetProductOnboardingSteps());
    dispatch(resetSingleProductPublishOnboardingSteps());
    dispatch(setSelectedPublishableStore([]));
  };

  const [openSaveAsDraftDialog, setOpenSaveAsDraftDialog] = useState(false);

  const handleSaveAsDraftDialogOpen = () => {
    setOpenSaveAsDraftDialog(true);
  };
  const handleSaveAsDraftDialogClose = () => {
    setOpenSaveAsDraftDialog(false);
  };

  const handleSaveAsDraftButtonClick = () => {
    const data = {
      user_id: currentUser.merchant_id,
      status: "draft",
      ...productsDataFromState,
    };
    console.log({ data });
    setLoading(true);
    const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Product saved as draft", {
            variant: "success",
          });
          router.push(`/app/products`);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const BUNDLE_OR_PRODUCT = "product";

  console.log({ tableList });
  const isInventoryZero = () => {
    // return false if any of the items inside tableList has hasInventory === true
    const isZero =
      Array.isArray(tableList) &&
      !tableList?.some((item) => item.hasInventory === true);
    console.log({ isZero });
    return isZero;
  };
  console.log({ tableList, isInventoryZero: isInventoryZero() });

  return (
    <div>
      {loading && <PageLoader />}
      {!hideContinueNavigation && (
        <Box
          sx={{
            // maxWidth: "800px",
            margin: "auto",
            mt: 2,
            position: "sticky",
            top: "65px",
            py: 2,
            background: "white",
            zIndex: "300",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <SectionTitleText
              sx={{
                // pb: 2,
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[200]}`,

                // mb: 2,
                // fontSize: "18px",
                // fontWeight: "600",
                color: (theme) => theme.palette.text.title,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "39px",

                // ...sectionTitleStyles,
              }}
            >
              Inventory
            </SectionTitleText>
            <SaveAsDraftComponent
              BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
              handleSaveAsDraftDialogOpen={handleSaveAsDraftDialogOpen}
              // disableDraftButton={
              // 	productImages === "" ||
              // 	productImages.length === 0
              // 		? true
              // 		: false
              // }
              handleSaveAsDraftButtonClick={handleSaveAsDraftButtonClick}
              handleSaveAsDraftDialogClose={handleSaveAsDraftDialogClose}
              openSaveAsDraftDialog={openSaveAsDraftDialog}
            />
          </Box>
        </Box>
      )}
      <Box
        sx={{
          // maxWidth: "800px",
          margin: hideContinueNavigation ? 0 : "auto",
          // mt: hideContinueNavigation && 4,
        }}
      >
        {!IS_COMPONENT && Array.isArray(tableList) && tableList?.length > 0 && (
          <BluecomMRTBaseTable
            muiTableContainerProps={{
              sx: {
                maxHeight: maxHeight,
              },
            }}
            data={tableList}
            columnDefData={columnData}
            columnsData={columnData}
            rowIdkey={"master_item_id"}
            checkboxSelection={false}
          />
          // <CustomGroupedTable
          // columnGroups={columnGroups}
          // columnsData={columnData}
          // data={tableList}

          // />
        )}
        {IS_COMPONENT && Array.isArray(tableList) && (
          <MuiBaseDataGrid
            containerStyles={{
              height: maxHeight,
              // maxHeight: maxHeight,
            }}
            data={tableList}
            columnDefData={productColumnData}
            rowIdkey={"master_item_id"}
            checkboxSelection={false}
          />
          // <CustomGroupedTable
          // columnGroups={columnGroups}
          // columnsData={columnData}
          // data={tableList}

          // />
        )}
      </Box>
      {/* {hideContinueNavigation && (
				<Box
					sx={{
						position: "fixed",
						bottom: "0px",
						width: "1200px",
					}}
				>
					<NewProductOnboardingBottomNavButtons
						// disableSaveButton={disableButton}
						saveButtonClick={() => handleAddProduct()}
						saveButtonTitle={"Update Product"}
						hideTitle
					/>
				</Box>
			)} */}
      {!hideContinueNavigation && (
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            width: "82%",
          }}
        >
          <NewProductOnboardingBottomNavButtons
            maxWidthPage={"800px"}
            saveButtonClick={() => handleClickContinueButton()}
            saveButtonTitle={`Create Product`}
            discardButtonTitle={`Previous Step`}
            discardButtonClick={() =>
              router.push(
                `/app/products/create/product/${pageId}?step=select-vendor&id=3`
              )
            }
          />
        </Box>
      )}

      <NewProductOnboardingWarhouseListDialog
        handleCloseDialog={handleCloseDialog}
        // handleClickDoneButton={handleClickDoneButton}
        handleFetchProductData={handleFetchProductData}
        open={openDialog}
        pageId={pageId}
        selectedItemId={selectedItemId}
        selectedInventory={selectedInventory}
        hasInventory={hasInventory}
      />
      {/* <SaveProductDialog
        open={openSaveDialog}
        handleGoToHomeButtonClick={handleGoToHomeButtonClick}
        handleClose={handleCloseSaveDialog}
        handlePublishNowButtonClick={handlePublishNowButtonClick}
      /> */}
      <SuccessDialogForPO
        open={openSaveDialog}
        onDelete={() => handlePublishNowButtonClick()}
        primaryButtonName={"Publish to a Store"}
        title={"Product Created Successfully"}
        message={
          "Product is created successfully, you have option to publish to a store"
        }
        secondaryButtonName={"Go to List"}
        onCancel={() => handleGoToHomeButtonClick()}
        primaryButtonProps={{
          sx: {
            flex: 1.5,
            ml: 2,
          },
        }}
      />
      <SuccessDialogForPO
        open={inventoryZeroDialogOpen}
        onDelete={() => handleCreateProduct()}
        primaryButtonName={"Create Product"}
        title={"Inventory Not added"}
        message={
          "You have not added inventory for the product. Are you sure you want to proceed?"
        }
        secondaryButtonName={"Cancel"}
        onCancel={() => handleInventoryZeroDialogClose()}
        icon={<AlertIconPO />}
        primaryButtonProps={{
          sx: {
            flex: 1.5,
            ml: 2,
          },
        }}
      />
    </div>
  );
}

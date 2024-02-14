import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { INVENTORY, PRODUCT, WAREHOUSE } from "constants/API_URL";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateCreateProductData } from "redux/products/productsSlice";
import InventoryAvailableItem from "sections/OnboardingSections/ProductOnboardingSection/InventoryAvailableItem";
import appFetch from "utils/appFetch";
import { useDebounce } from "use-debounce";
import AppImage from "components/Common/AppImage";
import channelsOptions from "constants/channelOptions";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  // createProductData: productsData.createProductData,
  // productsData,
});
export default function NewProductOnboardingWarhouseListDialog({
  open,
  handleCloseDialog,
  handleFetchProductData,
  pageId,
  selectedItemId,
  selectedInventory,
  hasInventory,
}) {
  const { currentUser } = useSelector(mapState);
  const [warehouseList, setWarehouseList] = useState([]);
  const [productWarehouseInventory, setProductWarehouseInventory] = useState(
    selectedInventory ?? []
  );

  useEffect(() => {
    setProductWarehouseInventory(selectedInventory ?? []);
  }, [selectedInventory, open]);
  console.log({ selectedInventory });
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [searchText] = useDebounce(searchValue, 1000);

  const handleFetchWarehouse = () => {
    const URL = WAREHOUSE.SEARCH_WAREHOUSE;
    setIsLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
      search_value: searchText,
    };

    appFetch(URL, data)
      .then((json) => {
        setWarehouseList(json.result);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (open) {
      handleFetchWarehouse();
    }
    // open && handleFetchWarehouse();
  }, [open, searchText]);
  const handleWarehouseInventoryChange = (field, itemObj) => {
    return (e) => {
      const { value } = e.target;
      if (value === "")
        return setProductWarehouseInventory((prevState) => {
          const data = prevState.filter((item) => item.wh_id !== field);
          // console.log({ prevState, itemObj });
          return [
            ...data,
            {
              ...itemObj,
              wh_id: field,
              available: "",
              // [field]: value,
            },
          ];
        });

      if (value < 0)
        return enqueueSnackbar("Inventory cannot be negative!", {
          variant: "error",
        });

      // Check if the value is a valid number
      if (!isNaN(value)) {
        return setProductWarehouseInventory((prevState) => {
          const data = prevState.filter((item) => item.wh_id !== field);
          return [
            ...data,
            {
              ...itemObj,
              wh_id: field,
              available: Number(value),
              // [field]: value,
            },
          ];
        });
      }
    };
  };
  const handleClickDoneButton = (e) => {
    const url = INVENTORY.ADD_INVENTORY;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,
      master_item_id: selectedItemId,

      inventory: productWarehouseInventory,
    };
    setPageLoading(true);
    appFetch(url, data)
      .then((json) => {
        setPageLoading(false);
        if (json.status === "success") {
          handleCloseDialog();
          // setProductWarehouseInventory([]);
          handleFetchProductData();
          enqueueSnackbar("Inventory added successfully");
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        setPageLoading(false);
        console.log("error", error);
      });
    // console.log("data", data);
  };

  // const handleFetchProductData = async () => {
  // 	const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 		master_product_id: pageId,
  // 	};
  // 	const json = await appFetch(url, data);
  // 	if (json.status === "success") {
  // 		dispatch(updateCreateProductData(json.result[0]));
  // 		setTableItems(json.result[0].items);
  // 		// dispatch(setCreateProductSelectedOptions(selectedOptions));
  // 		// console.log({ json });
  // 	}
  // };
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
  // console.log({ warehouseList, productWarehouseInventory });

  // console.log({ mergedWarehouseList });
  const handleClickCloseDialog = () => {
    handleCloseDialog();
    // setProductWarehouseInventory([]);
  };

  const warehouseTableColumnsData = [
    // {
    //   accessorKey: "channel_id",
    //   header: "Channel",
    //   size: 50,
    //   muiTableHeaderCellProps: {
    //     align: "center",
    //   },
    //   muiTableBodyCellProps: {
    //     align: "center",
    //   },
    //   Cell: ({ cell, row }) => (
    //     <>
    //       <AppImage
    //         src={
    //           channelsOptions[cell.row.original.channel_id] &&
    //           channelsOptions[cell.row.original.channel_id].image
    //         }
    //         width="40"
    //         height="40"
    //         sx={{
    //           borderRadius: "50%",
    //         }}
    //       />
    //       {/* {console.log({ image: row.original })} */}
    //     </>
    //   ),
    // },
    // {
    //   accessorKey: "shop",
    //   header: "Store",
    //   size: 200,
    //   Cell: ({ cell }) => cell.row.original.shop,
    // },

    {
      accessorKey: "wh_name",
      header: "Location",
      size: 500,
    },
    {
      accessorKey: "available",
      header: "Add inventory",
      size: 250,
      Cell: ({ cell }) => (
        <RenderTextInput
          // placeholder="Enter Quantity"
          placeholder="0"
          containerStyles={{
            marginTop: "0px",
          }}
          type="number"
          value={
            // Number(
            cell.row.original.available
            // )
            // ||
            // Number(cell.row.original.wh_qty).toString()
          }
          onChange={handleWarehouseInventoryChange(
            cell.row.original.wh_id,
            cell.row.original
          )}
          min={0}
        />
      ),
    },
  ];

  return (
    <BaseDialog
      title={
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Add Inventory
        </Typography>
      }
      open={open}
      handleClose={handleClickCloseDialog}
      dialogActions={
        <>
          <PrimaryButton
            disabled={isLoading || pageLoading}
            loading={pageLoading}
            onClick={(e) => handleClickDoneButton(e)}
          >
            Add Inventory
          </PrimaryButton>
        </>
      }
    >
      {pageLoading && <PageLoader />}
      {/* <SectionTitleText>Inventory</SectionTitleText> */}
      <Box
        sx={{
          maxHeight: "640px",
          minWidth: "600px",
          maxWidth: "960px",
          minHeight: "528px",
          // overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            top: "0px",
            position: "sticky",
            background: "white",
            // pt: 2,
            zIndex: 2222,
            pb: 3,
          }}
        >
          <TextInput
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            // onKeyUp={handleFetchWarehouse}
            containerStyles={{
              maxWidth: "100%",
            }}
          />
          {/* {Array.isArray(mergedWarehouseList) &&
					mergedWarehouseList.length > 0 && (
						<> */}
          {/* <Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: "16px",
							flex: 1,
							background: "#f6f6f6",
							color: "#999999",
							py: 2,
						}}
					>
						<DescriptionText
							sx={{
								flex: 0.7,
								fontSize: "18px",
								fontWeight: "600",
								pl: 2,
							}}
						>
							Location
						</DescriptionText>
						<DescriptionText
							sx={{
								flex: 0.3,
								fontSize: "18px",
								fontWeight: "600",
							}}
						>
							Add inventory
						</DescriptionText>
					</Box> */}
        </Box>
        <Box
          sx={
            {
              // overflow: "scroll",
              // maxHeight: "400px",
            }
          }
        >
          {/* {isLoading && (
						<PageSpinner
							spinnerStyles={{
								maxHeight: "200px",
							}}
						/>
					)} */}

          <BluecomMRTBaseTable
            columnsData={warehouseTableColumnsData}
            data={mergedWarehouseList}
            muiTableContainerProps={{
              sx: {
                maxHeight: "400px",
              },
            }}
            state={{
              showSkeletons: isLoading,
              // showProgressBars: isLoading,
            }}
          />
          {/* {!isLoading &&
						Array.isArray(mergedWarehouseList) &&
						mergedWarehouseList.length > 0 &&
						mergedWarehouseList.map((warehouse, index) => {
							return (
								<InventoryAvailableItem
									key={warehouse.wh_id}
									wh_name={warehouse.wh_name}
									wh_id={warehouse.wh_id}
									wh_qty={
										Number(warehouse.available) ||
										Number(warehouse.wh_qty)
									}
									onChange={handleWarehouseInventoryChange(
										warehouse.wh_id,
									)}
									wh_shop={
										warehouse.wh_shop ??
										warehouse.wh_store_id
									}
								/>
							);
						})} */}
        </Box>
        {/* </>
					)} */}
      </Box>
    </BaseDialog>
  );
}

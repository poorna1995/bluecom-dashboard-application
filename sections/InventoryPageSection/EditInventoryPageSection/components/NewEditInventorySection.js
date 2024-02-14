import {
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import { INVENTORY, PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryData } from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import { groupBy, orderBy } from "lodash";
import EditInventoryTableSection from "./EditInventoryTableSection";
import SelectLocationDropdown from "../../components/SelectLocationDropdown";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import { enqueueSnackbar } from "notistack";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import AppImage from "components/Common/AppImage";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import { fetchInventoryForProduct } from "../../components/utils/inventory.utils";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { setInventoryProductData } from "redux/inventory/inventorySlice";
import { fetchProductDetails } from "../utils/editInventory.utils";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import editInventoryTableColumns from "../constants/editInventoryTableColumns";
const mapState = ({ user, productsData, inventory }) => ({
  currentUser: user.currentUser,
  productsData,
  inventoryProductData: inventory.inventoryProductData,
});
export default function NewEditInventorySection() {
  const { currentUser, productsData, inventoryProductData } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const router = useRouter();
  const keyForReduxStateData = "inventoryData";
  const productsDataFromState = productsData[keyForReduxStateData];

  const { productId } = router.query;
  const [loading, setLoading] = useState(true);
  const tableData = React.useMemo(
    () => inventoryProductData.items,
    [inventoryProductData]
  );
  const [isTableLoading, setIsTableLoading] = useState(false);
  // productsDataFromState || [];
  // console.log({ tableData });
  const [locationsList, setLocationsList] = useState([]);
  const [isProductDetailsLoading, setIsProductDetailsLoading] = useState(false);

  const locations = React.useMemo(
    () =>
      Array.isArray(locationsList) && [
        {
          wh_name: "All Locations",
          wh_id: undefined,
        },
        ...locationsList.map((item) => {
          return { wh_name: item.wh_name, wh_id: item.wh_id };
        }),
      ],
    [locationsList]
  );

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentChannelData, setCurrentChannelData] = React.useState(
    locations[0]
  );
  const [buttonLoading, setButtonLoading] = useState({});
  const handleClick = () => {
    console.info(`You clicked ${channels[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setCurrentChannelData(locations[index]);
    handleFetchProductDetails({
      setLoading: setIsTableLoading,
    });
  };
  console.log({ channel: locations[selectedIndex], currentChannelData });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleFetchProductDetails = ({ setLoading }) => {
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    setLoading(true);
    fetchProductDetails({ data })
      .then((json) => {
        dispatch(setInventoryProductData(json));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    if (productId) {
      handleFetchProductDetails({
        setLoading: setIsProductDetailsLoading,
      });
    }
  }, [productId]);

  const handleFetchLocationsList = () => {
    setLoading(true);

    const url = PRODUCT.MERCHANT.FETCH_WAREHOUSE_LEVEL_INVENTORY;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    appFetch(url, data)
      .then((json) => {
        console.log({ json }, "inventory");
        if (json.status === "success") {
          setLocationsList(json.result);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error({ err });
      });
  };
  const handleFetchProductData = () => {
    setLoading(true);

    // const url = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };

    fetchInventoryForProduct({
      user_id: currentUser.merchant_id,
      productId,
    })
      .then((res) => {
        setLoading(false);
        dispatch(setInventoryData(res.result));
      })
      .catch((error) => {
        console.log(error);
      });

    // appFetch(url, data)
    // 	.then((json) => {
    // 		setLoading(false);
    // 		// console.log({ json }, "inventory");
    // 		if (json.status === API_RESPONSE_STATUS.SUCCESS) {
    // 			dispatch(setInventoryData(json.result));
    // 			// setTableData(json.result);
    // 		}
    // 	})
    // 	.catch((err) => {
    // 		console.error({ err });
    // 	});
  };

  React.useEffect(() => {
    if (productId) {
      // handleFetchProductData();
      handleFetchLocationsList();
    }
  }, [productId]);
  console.log({ tableData });

  const ALL_TABLE_ITEMS = React.useMemo(
    () =>
      // Array.isArray(locationsList) &&
      // locationsList
      //   .map((item) => {
      (Array.isArray(tableData) &&
        tableData
          .map((tableItem) => {
            const { inventory } = tableItem;
            const itemsMappedWithLocations = locationsList.map(
              (locationItem) => {
                return {
                  ...locationItem,
                  ...tableItem,
                  available: 0,
                  item_inventory_item_id: `${tableItem.inventory_item_id}_${locationItem.wh_id}_${tableItem.sku}`,
                  adjusted_value: "",
                  updated_at: tableItem.inventory_updated_at,
                  method: "set",
                };
              }
            );
            const itemsWithInventory =
              Array.isArray(inventory) &&
              inventory.length > 0 &&
              inventory.map((item) => {
                const { wh_id } = item;
                const itemWithLocation = itemsMappedWithLocations.find(
                  (it) => it.wh_id === wh_id
                );
                if (itemWithLocation) {
                  return {
                    ...itemWithLocation,
                    ...item,
                    available: item.available,
                    item_inventory_item_id: `${tableItem.inventory_item_id}_${item.wh_id}_${tableItem.sku}`,
                    adjusted_value: "",
                    updated_at: tableItem.inventory_updated_at,
                    method: "set",
                  };
                }
                return {
                  // ...itemWithLocation,
                  ...item,
                  available: item.available,
                  item_inventory_item_id: `${tableItem.inventory_item_id}_${item.wh_id}_${tableItem.sku}`,
                  adjusted_value: "",
                  updated_at: tableItem.inventory_updated_at,
                  method: "set",
                };
              });
            //  i want to merge these two arrays to get the output

            const mergedArray = itemsMappedWithLocations.map((item) => {
              const itemWithInventory =
                Array.isArray(itemsWithInventory) &&
                itemsWithInventory.find((it) => it.wh_id === item.wh_id);
              if (itemWithInventory) {
                return itemWithInventory;
              }
              return item;
            });
            // console.log({ mergedArray });

            const noInventory = locationsList.map((item) => {
              return {
                ...item,
                ...tableItem,
                available: 0,
                item_inventory_item_id: `${tableItem.inventory_item_id}_${item.wh_id}_${tableItem.sku}`,
                adjusted_value: "",
                updated_at: tableItem.inventory_updated_at,
                method: "set",
              };
            });

            console.log({
              itemsWithInventory,
              noInventory,
              mergedArray,
            });

            return mergedArray;
          })
          .flat()) ||
      [],
    [tableData, locationsList]
  );
  const orderedInventoryData = React.useMemo(
    () => orderBy(ALL_TABLE_ITEMS.flat().flat(), "available", "desc"),
    [ALL_TABLE_ITEMS]
  );

  console.log({ ALL_TABLE_ITEMS, orderedInventoryData });

  const filterData = React.useMemo(
    () =>
      orderedInventoryData.filter((item) => {
        if (currentChannelData.wh_id) {
          return item.wh_id === currentChannelData.wh_id;
        }
        return item;
      }),
    [orderedInventoryData, currentChannelData]
  );

  const [warehouseInventoryData, setWarehouseInventoryData] =
    React.useState(filterData);

  const memoizedTableData = React.useMemo(
    () => warehouseInventoryData,
    [warehouseInventoryData]
  );

  React.useEffect(() => {
    setWarehouseInventoryData(filterData);
  }, [filterData]);

  const METHODS = ["add", "sub", "set"];
  const handleChangeMethod = (method, item_id, itemObj) => {
    console.log({ itemObj });

    const updatedData = warehouseInventoryData.map((item) => {
      if (item.item_inventory_item_id === item_id) {
        return {
          ...item,
          item_inventory_item_id: item_id,
          method,
        };
      }
      return item;
    });
    setWarehouseInventoryData(updatedData);
  };
  const columnsData = [
    ...editInventoryTableColumns,
    {
      accessorKey: "method",
      Header: "Adjust Type",
      enableSorting: false,
      Cell: ({ cell }) => (
        <>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              border: "1px solid rgba(0,0,0,0.3)",
              borderRadius: "4px",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              maxWidth: "190px",
              height: "40px",
              m: "auto",
              fontSize: "14px",
              fontWeight: 400,
              padding: "0px",
              color: "2a2a2f",
            }}
          >
            {METHODS.map((item, index) => {
              if (item.toLowerCase() === cell.row.original.method) {
                return (
                  <PrimaryButton
                    size="small"
                    key={item}
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "500 !important",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() =>
                      handleChangeMethod(
                        item,
                        cell.row.original.item_inventory_item_id,
                        cell.row.original
                      )
                    }
                  >
                    {item}
                  </PrimaryButton>
                );
              }
              if (index === METHODS.length - 1) {
                return (
                  <Button
                    disableRipple
                    key={item}
                    sx={{
                      color: "#000",
                      fontWeight: "500 !important",
                      // borderRight:
                      // 	"1px solid rgba(0,0,0,0.3)",
                      borderRadius: "0px",
                      flex: 0.3,
                      textTransform: "capitalize",
                    }}
                    onClick={() =>
                      handleChangeMethod(
                        item,
                        cell.row.original.item_inventory_item_id,
                        cell.row.original
                      )
                    }
                  >
                    {item}
                  </Button>
                );
              }

              return (
                <Button
                  disableRipple
                  key={item}
                  size="small"
                  sx={{
                    color: "#000",
                    borderRight: "1px solid rgba(0,0,0,0.3)",
                    borderRadius: "0px",
                    fontWeight: "500 !important",
                    flex: 0.3,
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    handleChangeMethod(
                      item,
                      cell.row.original.item_inventory_item_id,
                      cell.row.original
                    )
                  }
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </>
      ),
      size: 200,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },

    {
      accessorKey: "adjusted_value",
      Header: "Adjust Inventory",
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <RenderTextInput
            containerStyles={{
              maxWidth: "160px",
              marginTop: "0px",
              margin: "0px",

              // mt:0
            }}
            value={cell.getValue()}
            onChange={(e) =>
              handleWarehouseInventoryChange(
                e,
                cell.row.original.item_inventory_item_id,
                cell.row.original
              )
            }
            placeholder="0"
            type="number"
          />
          <PrimaryButton
            size="small"
            sx={{
              ml: 2,
              // width: "80px",
              height: "40px",
              borderRadius: "4px",
            }}
            onClick={() =>
              handleSaveRowDataButton(
                cell.row.original.item_inventory_item_id,
                cell.row.original
              )
            }
            disabled={
              (buttonLoading[cell.row.original.item_inventory_item_id] &&
                buttonLoading[cell.row.original.item_inventory_item_id]) ||
              cell.row.original.adjusted_value === "" ||
              false
            }
          >
            {buttonLoading[cell.row.original.item_inventory_item_id] &&
              buttonLoading[cell.row.original.item_inventory_item_id] && (
                <Fade
                  in={buttonLoading[cell.row.original.item_inventory_item_id]}
                >
                  <CircularProgress thickness={4} size={20} sx={{ mr: 2 }} />
                </Fade>
              )}
            Save
          </PrimaryButton>
        </Box>
      ),
      size: 280,
    },
  ];
  const handleWarehouseInventoryChange = (e, field, itemObj) => {
    console.log({ itemObj });
    const { value } = e.target;
    console.log({ value });
    if (value === "") {
      const updatedData = warehouseInventoryData.map((item) => {
        if (item.item_inventory_item_id === itemObj.item_inventory_item_id) {
          return {
            ...item,
            item_inventory_item_id: itemObj.item_inventory_item_id,

            adjusted_value: "",
          };
        }
        return item;
      });
      return setWarehouseInventoryData(updatedData);
    }
    if (value < 0) {
      return enqueueSnackbar("Inventory cannot be negative!", {
        variant: "error",
      });
    }

    const updatedData = warehouseInventoryData.map((item) => {
      if (item.item_inventory_item_id === itemObj.item_inventory_item_id) {
        return {
          ...item,
          item_inventory_item_id: itemObj.item_inventory_item_id,

          adjusted_value: Number(value),
        };
      }
      return item;
    });
    if (value >= 0) setWarehouseInventoryData(updatedData);
  };

  const handleSaveRowDataButton = (field, itemObj) => {
    console.log({ itemObj });
    const getAvailable = () => {
      if (itemObj.method === "set") {
        return Number(itemObj.adjusted_value);
      }
      if (itemObj.method === "add") {
        return Number(itemObj.available) + Number(itemObj.adjusted_value);
      }
      if (itemObj.method === "sub") {
        return Number(itemObj.available) - Number(itemObj.adjusted_value);
      }
    };
    const URL = INVENTORY.ADD_INVENTORY_FOR_LOCATION;
    const data = {
      master_item_id: itemObj.master_item_id,
      master_product_id: itemObj.master_product_id,
      inventory_item_id: itemObj.inventory_item_id,
      available: getAvailable(),
      wh_id: itemObj.wh_id,
      user_id: currentUser.merchant_id,
    };

    const updatedData = warehouseInventoryData.map((item) => {
      if (item.item_inventory_item_id === field) {
        if (item.method === "set") {
          return {
            ...item,
            item_inventory_item_id: field,
            adjusted_value: "",

            available: Number(item.adjusted_value),
          };
        }
        if (item.method === "add") {
          return {
            ...item,
            item_inventory_item_id: field,
            adjusted_value: "",
            available: Number(item.available) + Number(item.adjusted_value),
          };
        }
        if (item.method === "sub") {
          return {
            ...item,
            item_inventory_item_id: field,
            adjusted_value: "",
            available: Number(item.available) - Number(item.adjusted_value),
          };
        }
      }
      return item;
    });
    setButtonLoading({ [field]: true });
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          setWarehouseInventoryData(updatedData);
          setButtonLoading({ [field]: false });
          enqueueSnackbar("Inventory updated successfully", {
            autoHideDuration: 2000,
            // anchorOrigin: "center",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            // variant: "inventorySuccess",
          });
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          enqueueSnackbar(json.message, {
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          });
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const [saveAllLoading, setSaveAllLoading] = useState(false);
  const handleClickDoneButton = (e) => {
    const url = INVENTORY.UPDATE_INVENTORY_FOR_LOCATION;

    // setLoading(true);
    setSaveAllLoading(true);
    // setPageLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,

      inventory: warehouseInventoryData.filter((item) => item.available > 0),
    };

    appFetch(url, data)
      .then((json) => {
        // setPageLoading(false);
        if (json.status === "success") {
          // setLoading(false);
          setSaveAllLoading(false);
          // setWarehouseInventoryData([]);
          handleFetchProductData();
          enqueueSnackbar("Inventory added successfully");
        }
      })
      .catch((error) => {
        // setPageLoading(false);
        console.log("error", error);
      });
    // console.log("data", data);
  };
  // console.log({ inventoryProductData });

  if (isProductDetailsLoading || loading) return <PageSpinner />;

  return (
    <Box>
      {loading && <PageLoader />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => router.push(`/app/inventory`)}
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "5px",
              border: "1px solid rgba(0,0,0,0.1)",
              mr: 2,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
            >
              <path
                d="M6 0L7.4 1.45L3.85 5H16V7H3.85L7.4 10.55L6 12L0 6L6 0Z"
                fill="#101828"
              />
            </svg>
          </IconButton>
          <AppImage
            src={
              inventoryProductData.display_image

              // warehouseInventoryData[0].display_image &&
              // Array.isArray(warehouseInventoryData) &&
              // warehouseInventoryData.length > 0 &&
              // warehouseInventoryData[0]?.display_image
            }
            width={45}
            height={45}
            alt={"Product Image"}
            // unoptimized={false}
            loading={"eager"}
          />
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: " 21px",
              fontWeight: 700,
              color: "#212121",
              ml: 2,
            }}
          >
            {inventoryProductData.product_title}
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#595959",
              }}
            >
              SKU:{" "}
              {inventoryProductData.product_sku &&
                inventoryProductData.product_sku}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontSize: " 14px",
              fontWeight: 600,
              lineHeight: " 20px",
              letterSpacing: " 0.42px",
              mr: 1,
            }}
          >
            {" "}
            Location:
          </Typography>
          <SelectLocationDropdown
            options={locations}
            anchorRef={anchorRef}
            open={open}
            selectedIndex={selectedIndex}
            handleClick={handleClick}
            handleMenuItemClick={handleMenuItemClick}
            handleToggle={handleToggle}
            handleClose={handleClose}
          />
          {/* <PrimaryButton
						size="small"
						onClick={() => handleClickDoneButton()}
						sx={{ ml: 2 }}
						disabled={saveAllLoading}
					>
						{/* <Fade in={loading}> */}
          {/* </Fade> 
						{saveAllLoading && (
							<CircularProgress
								thickness={4}
								size={20}
								sx={{ mr: 2 }}
							/>
						)}
						Save all
					</PrimaryButton> */}
        </Box>
      </Box>
      <EditInventoryTableSection
        tableData={memoizedTableData}
        columnsData={columnsData}
        handleClickDoneButton={handleClickDoneButton}
        loading={isTableLoading}
        // handleFetchProductData={handleFetchProductData}
      />
    </Box>
  );
}

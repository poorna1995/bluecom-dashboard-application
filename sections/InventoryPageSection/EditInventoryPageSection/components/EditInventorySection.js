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
const mapState = ({ user, productsData, inventory }) => ({
  currentUser: user.currentUser,
  productsData,
  inventoryProductData: inventory.inventoryProductData,
});
export default function EditInventorySection() {
  const { currentUser, productsData, inventoryProductData } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const router = useRouter();
  const keyForReduxStateData = "inventoryData";
  const productsDataFromState = productsData[keyForReduxStateData];

  const { productId } = router.query;
  const [loading, setLoading] = useState(true);
  const tableData = productsDataFromState || [];
  const [locationsList, setLocationsList] = useState([]);

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
  React.useEffect(() => {
    setCurrentChannelData(locations[0]);
  }, [locations]);
  const handleClick = () => {
    console.info(`You clicked ${channels[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setCurrentChannelData(locations[index]);
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

  const handleFetchProductDetails = () => {
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    fetchProductDetails({ data })
      .then((json) => {
        dispatch(setInventoryProductData(json.result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    if (productId) {
      handleFetchProductDetails();
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
      handleFetchProductData();
      handleFetchLocationsList();
    }
  }, [productId]);
  console.log({ tableData });
  const groupedInventoryData = orderBy(
    tableData
      .map((item) => {
        const { inventory } = item;
        const expandedInventory =
          Array.isArray(inventory) && inventory.length > 0
            ? inventory.map((it) => {
                return {
                  ...it,
                  // ...item,
                  product_title: item.product_title,
                  item_title: item.item_title,
                  master_item_id: item.master_item_id,
                  master_product_id: item.master_product_id,
                  options: item.options,
                  sku: item.sku,
                  item_sku: item.item_sku,
                  product_sku: item.product_sku,
                  item_display_image: item.item_display_image,
                  display_image: item.display_image,
                  channels: item.channels,
                  inventory_item_id: item.inventory_item_id,
                  item_inventory_item_id: `${item.inventory_item_id}_${it.wh_id}_${item.sku}`,
                  barcode: item.barcode,
                  method: "set",
                  adjusted_value: "",
                  updated_at: item.inventory_updated_at,
                };
              })
            : locationsList.map((it) => {
                return {
                  wh_id: it.wh_id,
                  wh_name: it.wh_name,
                  shop: it.shop,
                  store_id: it.store_id,
                  product_title: item.product_title,
                  item_title: item.item_title,
                  master_item_id: item.master_item_id,
                  master_product_id: item.master_product_id,
                  options: item.options,
                  sku: item.sku,
                  item_sku: item.item_sku,
                  product_sku: item.product_sku,
                  item_display_image: item.item_display_image,
                  display_image: item.display_image,
                  channels: item.channels,
                  inventory_item_id: item.inventory_item_id,
                  item_inventory_item_id: `${item.inventory_item_id}_${it.wh_id}_${item.sku}`,
                  barcode: item.barcode,
                  method: "set",
                  adjusted_value: "",
                  updated_at: item.inventory_updated_at,
                  available: "",
                };
              });

        console.log({ expandedInventory, item });
        return expandedInventory;
      })
      .flat(),
    "available",
    "desc"
  );
  const groupByWarehouse = React.useMemo(
    () => groupBy(groupedInventoryData, "wh_id"),
    [groupedInventoryData]
  );

  const filterData = React.useMemo(
    () =>
      currentChannelData.wh_id && currentChannelData.wh_id
        ? groupByWarehouse[currentChannelData?.wh_id] || []
        : groupedInventoryData || [],
    [currentChannelData]
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
    {
      accessorKey: "item_title",
      Header: "Variants Name",
      enableSorting: false,
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {/* <RenderProductDetails
            display_image={cell.row.original.item_display_image}
            title={cell.row.original.product_title}
            variant_title={cell.row.original.item_title}
            sku={cell.row.original.sku}
            barcode={cell.row.original.barcode}
            // sku={cell.row.original.sku}
            href={`/app/products/${cell.row.original.master_product_id}`}
          /> */}
          <RenderAppImage
            sx={{
              marginTop: "4px",
              borderRadius: "4px",
              marginRight: "8px",
            }}
            display_image={cell.row.original.item_display_image}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#222",
            }}
          >
            {/* {cell.row.original.product_title}{" "} */}
            {cell.row.original.item_title}
          </Typography>
        </Box>
      ),
      size: 400,
    },
    {
      accessorKey: "sku",
      Header: "SKU",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {cell.row.original.sku}
        </Typography>
      ),
      size: 120,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    // {
    //   accessorKey: "channels",
    //   Header: "Listed Channels",
    //   Cell: ({ cell }) => (
    //     <ChannelGroups channelDetails={cell.row.original.channels} />
    //   ),
    //   size: 100,
    //   muiTableHeadCellProps: {
    //     align: "center",
    //   },
    //   muiTableBodyCellProps: {
    //     align: "center",
    //   },
    // },
    {
      accessorKey: "location",
      header: "Location",
      // enableSorting: true,
      // sorting: "fuzzy",
      // enableColumnActions: true,
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {cell.row.original.wh_name}
        </Typography>
      ),
      size: 180,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "available",
      header: "Available",
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {cell.getValue()}
          {/* {cell.row.original.available} */}
        </Typography>
      ),
      size: 80,
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated",
      Cell: ({ cell }) => <RenderDate date={cell.row.original.updated_at} />,
    },
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

          // if (item.method === "set") {
          // 	return {
          // 		...item,
          // 		inventory_item_id: field,

          // 		// available: Number(value),
          // 		adjusted_value: Number(value),
          // 	};
          // }
          // if (item.method === "add") {
          // 	return {
          // 		...item,
          // 		inventory_item_id: field,
          // 		available: Number(item.available) + Number(value),
          // 		adjusted_value: Number(value),
          // 	};
          // }
          // if (item.method === "sub") {
          // 	return {
          // 		...item,
          // 		inventory_item_id: field,
          // 		available: Number(item.available) - Number(value),
          // 		adjusted_value: Number(value),
          // 	};
          // }
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

        // if (item.method === "set") {
        // 	return {
        // 		...item,
        // 		inventory_item_id: field,

        // 		// available: Number(value),
        // 		adjusted_value: Number(value),
        // 	};
        // }
        // if (item.method === "add") {
        // 	return {
        // 		...item,
        // 		inventory_item_id: field,
        // 		available: Number(item.available) + Number(value),
        // 		adjusted_value: Number(value),
        // 	};
        // }
        // if (item.method === "sub") {
        // 	return {
        // 		...item,
        // 		inventory_item_id: field,
        // 		available: Number(item.available) - Number(value),
        // 		adjusted_value: Number(value),
        // 	};
        // }
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
    // setTimeout(() => {
    // setWarehouseInventoryData(updatedData);
    // setButtonLoading({ [field]: false });
    // enqueueSnackbar("Inventory updated successfully", {
    // 	autoHideDuration: 2000,
    // 	// anchorOrigin: "center",
    // 	anchorOrigin: {
    // 		vertical: "top",
    // 		horizontal: "center",
    // 	},
    // 	// variant: "inventorySuccess",
    // });
    // }, 3000);
  };

  console.log({
    warehouseInventoryData:
      (Array.isArray(warehouseInventoryData) &&
        warehouseInventoryData.filter((item) => item.available)) ||
      [],
  });

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

  // if(loading )return <PageSpinner/>
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
              // warehouseInventoryData[0].display_image &&
              Array.isArray(warehouseInventoryData) &&
              warehouseInventoryData.length > 0 &&
              warehouseInventoryData[0]?.display_image
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
            {warehouseInventoryData[0]?.product_title}
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#595959",
              }}
            >
              SKU:{" "}
              {warehouseInventoryData[0]?.product_sku &&
                warehouseInventoryData[0]?.product_sku}
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
          <PrimaryButton
            size="small"
            onClick={() => handleClickDoneButton()}
            sx={{ ml: 2 }}
            disabled={saveAllLoading}
          >
            {/* <Fade in={loading}> */}
            {/* </Fade> */}
            {saveAllLoading && (
              <CircularProgress thickness={4} size={20} sx={{ mr: 2 }} />
            )}
            Save all
          </PrimaryButton>
        </Box>
      </Box>
      <EditInventoryTableSection
        tableData={memoizedTableData}
        columnsData={columnsData}
        handleClickDoneButton={handleClickDoneButton}
        loading={loading}
        // handleFetchProductData={handleFetchProductData}
      />
    </Box>
  );
}

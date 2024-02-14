import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import AppImage from "components/Common/AppImage";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import CautionIcon from "components/Common/Icons/CautionIcon";
import CloneIcon from "components/Common/Icons/CloneIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, MERCHANT, PRODUCT, VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import tagIcon from "public/assets/icons/tag-icon.png";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import VendorOnboardingAddProductDialog from "./VendorOnboardingAddProductDialog";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import EmptyState from "components/Common/EmptyState";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import DeleteIconVendor from "components/Common/Icons/DeleteIconVendor";
import SuccessIcon from "components/Common/Icons/VendorIcon/SuccessIcon";
import EmptyStateForVendor from "./EmptyStateForVendor";
import PlusSignWhiteColor from "components/Common/Icons/VendorIcon/PlusSignWhiteColor";
import WarningIcon from "components/Common/Icons/VendorIcon/WarningIcon";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import TextInput from "components/Common/Inputs/TextInput";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import CheckIcon from "components/Common/Icons/VendorIcon/CheckIcon";
import { useSnackbar } from "notistack";
import DialogAsCaution from "components/Common/Dialog/DialogAsCaution";
import RenderWebsiteURL from "components/Common/Tables/RenderComponents/RenderWebsiteURL";
import { HomeRepairService, Launch } from "@mui/icons-material";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderTableBodyCellText from "components/Common/Tables/RenderComponents/RenderTableBodyCellText";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import ListedChannelsNumber from "sections/AppPageSections/CommonComponents/ListedChannelsNumber";
import SuccessDialogForPO from "../PurchaseOrderOnboardingSection/components/SuccessDialogForPO";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function VendorOnboardingAddProductsSection({
  pageTitle,
  nextButton,
  backButton,
  theme,
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId ?? router.query.vendorId;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // const [productListOption, setProductListOption] = useState([]);
  // const [tagListOption, setTagListOption] = useState([]);
  // const [collectionListOption, setCollectionListOption] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [productCateogry, setProductCategory] = useState();
  const [collectionType, setCollectionType] = useState();
  const [productType, setProductType] = useState();
  const [tag, setTag] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [deleteProductID, setDeleteProductID] = useState("");
  const [searchProductList, setSearchProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorProductsLoading, setVendorProductsLoading] = useState(false);
  const [moq, setMoq] = useState("");
  const [tableItems, setTableItems] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const URL = VENDOR.ADD_VENDOR;

  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleOpenSuccessDialog = () => {
    setOpenSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    // router.push("/app/vendors");
  };

  const handleDeleteDialogOpen = (itemId) => {
    setOpenDialog(true);
    setDeleteProductID(itemId);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setDeleteProductID("");
  };

  const handleDeleteProduct = () => {
    const URL = VENDOR.DELETE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
      master_product_id: deleteProductID,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          handleFetchVendorProducts();
          handleDeleteDialogClose();
          enqueueSnackbar("Product deleted successfully", {
            variant: "success",
          });
        }
        // json.status === "success" && handleFetchVendorProducts();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // const handleAddProductsToVendor = () => {
  // route this page to VenderOnboardingSteps
  // router.push(`/vendorOnboardingAddProductDialog/${pageId}`);
  // setIsDialogOpen(false);

  //   const URL = VENDOR.ADD_PRODUCT;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //     master_product_id: selectedProducts,
  //     vendor_id: pageId,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       handleFetchVendorProducts();
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  const handleFetchProducts = () => {
    setLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          setData(json.result);
          // enqueueSnackbar("Products Added successfully", {
          //   variant: "success",
          // });
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);
  useEffect(() => {
    if (pageId) {
      handleFetchVendorProducts();
    }
  }, [pageId]);

  const handleFetchVendorProducts = () => {
    setVendorProductsLoading(true);
    const URL = VENDOR.FETCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
    };
    appFetch(URL, data)
      .then((json) => {
        // setLoading(false);
        setVendorProductsLoading(false);
        console.log({ json });
        setProductsList(json.result);
        // enqueueSnackbar("Products fetched successfully", {
        // 	variant: "success",
        // });
      })
      .catch((err) => console.error(err));
  };
  console.log("data", { productsList });

  const handleNextButtonClick = () => {
    router.push(`/app/vendors/${pageId}?tab=overview`);
  };

  const selectedProductsTableData =
    Array.isArray(selectedProducts) &&
    selectedProducts.map((item) => {
      return {
        master_product_id: item,
        id: item.master_item_id,
        SKU: item.sku,
        price: item.price,
      };
    });

  // filter selected products from the tableData
  const filterSelectedProducts = (tableData, selectedItems) => {
    const getFilteredItems = tableData.filter((item) => {
      const isItemSelected = selectedItems.find(
        (selectedItem) => selectedItem === item.master_product_id
      );
      return isItemSelected;
    });
    return getFilteredItems;
  };

  const selectedItemsForVendor = filterSelectedProducts(data, selectedProducts);
  console.log("tableListData", data, selectedItemsForVendor);

  console.log("selectedProductsTableData", selectedProductsTableData);

  const handleAddProductsDialogOpen = () => {
    setIsDialogOpen(true);
    // console.log("**", setIsDialogOpen);
  };

  const handleChangeMOQ = (e, key, value) => {
    // setMoq(e.target.value);
    const updatedItems =
      // Array.isArray(tableItems) &&
      productsList.map((item) => {
        if (item.master_product_id === value) {
          return {
            ...item,
            [key]: e.target.value,
          };
        }
        return item;
      });
    setProductsList(updatedItems);
  };

  console.log({ productsList });
  const handleClickDone = async () => {
    await productsList.map((item) => {
      return handleBlurMOQ(item.moq, "moq", item.master_product_id);
    });
    await handleOpenSuccessDialog();
  };

  const handleClickDoneUpdate = async () => {
    await productsList.map((item) => {
      return handleBlurMOQ(item.moq, "moq", item.master_product_id);
    });
    enqueueSnackbar("Product Updared Successfully!", {
      variant: "success",
      autoHideDuration: 2000,
    });
    router.push(`/app/vendors/${pageId}?tab=overview`);
  };

  const handleBlurMOQ = (e, key, value) => {
    const URL = VENDOR.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
      master_product_id: value,
      [key]: e,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        handleFetchVendorProducts();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleClickWebsite = (website_link = "") => {
    // if (
    // website_link.startsWith("https://") ||
    // website_link.startsWith("http://")
    // ) {
    return window.open(website_link, "_blank");
    // }
    // return window.open(`https://${website_link}`, "_blank");
  };

  function getStr1(str = "") {
    return str.length > 20 ? str.slice(0, 20) + "..." : str;
  }

  const columnsDataForDisplaySelectedProducts = [
    // {
    //   field: "master_item_id",
    //   headerName: "ID",
    //   width: 100,
    // },
    {
      accessorKey: "action",
      header: "Action",
      field: "action",
      headerName: "Action",
      size: 100,
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ml: "20px",
          }}
        >
          <Tooltip title="Delete product">
            <div>
              <IconButton
                onClick={() => handleDeleteDialogOpen(cell.row.original.id)}
                sx={{
                  backgroundColor: "#F5F5F5",
                }}
              >
                <DeleteIconVendor />
              </IconButton>
            </div>
          </Tooltip>
        </Box>

        // <IconButtonWithTooltip icon={<DeleteIcon />} title={"Delete"} />
      ),
      align: "center",
      headerAlign: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      field: "product_title",
      accessorKey: "product_title",
      header: "Product Name",
      headerName: "Product Name",
      size: 500,
      // valueGetter: ({ value }) => value,
      Cell: ({ cell }) => (
        <>
          <RenderProductDetails
            display_image={cell.row.original.display_image}
            product_id={cell.row.original.master_product_id}
            barcode={cell.row.original.product_barcode}
            href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
            openInNewTab={true}
            sku={cell.row.original.sku}
            title={cell.row.original.product_title}
          />
          {/* <ClickPopover
            src={params.row.display_image}
            // slides={params.row.ImageSlides}
          /> */}
          {/* <AppImage src={params.row.display_image} width="40" height="40" />
          <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            // }}
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: "16px",
              fontWeight: "700",
            }}
          > */}
          {/* <span>
              <RenderWebsiteURL value={params.value} />
            </span> */}
          {/* 
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& .launch-icon": {
                  display: "none",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                  color: (theme) => theme.palette.primary.main,
                  "& .launch-icon": {
                    display: "block",
                  },
                },
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "16px",
                  cursor: "pointer",
                  // color: "#222222",
                }}
                // href={`/app/products/${params.row.master_product_id}?tab=overview`}
                onClick={() =>
                  handleClickWebsite(
                    `/app/products/${params.row.master_product_id}?tab=overview`
                  )
                }
                target="_blank"
                rel="noreferrer"
                // title={params.row.product_title}
              >
                {params.row.product_title}
                <Launch
                  sx={{
                    height: "16px",
                    width: "16px",
                    marginLeft: "8px",
                  }}
                  className="launch-icon"
                />
              </span>
            </Box>
            <Box
              sx={{
                display: "flex",
                ml: "16px",
                mt: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#222222",
                }}
              >
                Product Id:{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#222222",
                  }}
                >
                  {params.row.master_product_id}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  ml: "16px",
                  color: "#222222",
                }}
              >
                SKU:{" "}
                <span
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {params.row.sku || "N/A"}
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  ml: "16px",
                  fontWeight: "400",
                  color: "#222222",
                }}
              >
                Barcode:{" "}
                <span
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {params.row.barcode || "N/A"}
                </span>
              </Typography>
            </Box>
          </Box> */}
        </>

        // <>
        //   <AppImage src={params.row.display_image} width="40" height="40" />
        //   <Typography sx={{ ml: "12px" }}>
        //     {params.row.product_title}
        //   </Typography>
        // </>
      ),
    },
    {
      accessorKey: "sku",
      header: "Product SKU",
      field: "sku",
      headerName: "Product SKU",
      size: 100,
      valueGetter: ({ value }) => value,
      align: "center",
      headerAlign: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (
        <RenderTableBodyCellText>
          {getStr1(cell.row.original.product_sku) || "-"}
        </RenderTableBodyCellText>
      ),
    },
    {
      field: "listing",
      accessorKey: "listing",
      header: "Listing Channel",
      headerName: "Listing Channel",
      size: 140,
      Cell: ({ cell }) => (
        <>
          {/* <Typography
           sx={{
             fontSize: "14px",
             fontWeight: "600",
             color: "#050444",
           }}
         >
           <RenderChannelAsIcon
            value={params.value}
            channelList={params.row.channelList}
          />
           <ChannelGroups
            channels={cell.getValue()}
            channelDetails={cell.row.original.channels || []}
          />
           </Typography>  */}
          <ListedChannelsNumber
            channels={cell.getValue()}
            channelDetails={cell.row.original.channels || []}
          />
        </>
      ),
      size: 100,
      valueGetter: ({ value }) => value,
      headerAlign: "center",
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
    {
      field: "inventory",
      accessorKey: "inventory",
      header: "Inventory",
      headerName: "Inventory",
      size: 40,
      align: "right",
      headerAlign: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      Cell: ({ cell }) => (
        // <Typography
        //   sx={{
        //     fontSize: "14px",
        //     fontWeight: "600",
        //     color: "#050444",
        //   }}
        // >
        //   {cell.row.original.qty_available || "-"}
        // </Typography>
        <RenderTableBodyCellText>
          {cell.row.original.qty_available || "-"}
        </RenderTableBodyCellText>
      ),
    },
    {
      field: "varients",
      accessorKey: "varients",
      header: "Variants",
      headerName: "Variants",
      size: 60,
      align: "right",
      headerAlign: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      Cell: ({ cell }) => (
        // <Typography
        //   sx={{
        //     // display: "flex",
        //     // alignItems: "center",
        //     // justifyContent: "center",
        //     width: "25%",
        //     fontSize: "12px",
        //     fontWeight: "700",
        //     color: "#494949",
        //     backgroundColor: "#F5F5F5",
        //     padding: "4px",
        //     borderRadius: "50%",
        //   }}
        // >
        //   {cell.row.original.item_count || "-"}
        // </Typography>
        <RenderTableBodyCellText>
          {cell.row.original.item_count || "-"}
        </RenderTableBodyCellText>
      ),
    },
    // {
    //   field: "sku",
    //   headerName: "SKU",
    //   flex: 0.5,
    // },
    {
      field: "unit_cost_price",
      accessorKey: "unit_cost_price",
      header: "Cost Price",
      headerName: "Cost Price",
      size: 100,
      align: "right",
      headerAlign: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#050444",
          }}
        >
          {/* $ {cell.row.original.unit_cost_price} */}
          <RenderCurrency
            value={cell.row.original.unit_cost_price}
            currency={data.currency}
            // sx={{
            //   ml: 1,
            //   fontSize: "16px",
            //   fontWeight: "600",
            //   transition: `all 0.3s ease-in-out`,
            // }}
          />
        </Typography>
      ),
    },
    {
      field: "unit_retail_price",
      accessorKey: "unit_retail_price",
      header: "Retail Price",
      headerName: "Retail Price",
      size: 100,
      align: "right",
      headerAlign: "right",
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      Cell: ({ cell }) => (
        <Typography
        // sx={{
        //   fontSize: "14px",
        //   fontWeight: "600",
        //   color: "#050444",
        // }}
        >
          {/* $ {cell.row.original.unit_retail_price} */}
          <RenderCurrency
            value={cell.row.original.unit_retail_price}
            currency={data.currency}
          />
        </Typography>
      ),
    },
    {
      field: "moq",
      accessorKey: "moq",
      header: "MOQ",
      headerName: "MOQ",
      size: 140,
      align: "center",
      headerAlign: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      justifyContent: "center",
      Cell: ({ cell }) => (
        <RenderTextInput
          sx={{
            type: "number",
            // width: "70%",
            alignItems: "center",
          }}
          value={cell.row.original.moq}
          placeholder="Enter MOQ"
          // onChange={(e) => setMoq(e.target.value)}
          onChange={(e) =>
            handleChangeMOQ(e, "moq", cell.row.original.master_product_id)
          }
          // onBlur={(e) =>
          // 	handleBlurMOQ(e, "moq", params.row.master_product_id)
          // }
        />

        // <Typography
        //   sx={{
        //     fontSize: "14px",
        //     fontWeight: "600",
        //     color: "#050444",
        //   }}
        // >
        //   <RenderChannelAsIcon
        //     value={params.value}
        //     channelList={params.row.moq}
        //   />

        // </Typography>
      ),
    },
  ];
  // const columnsDataForSelect = [
  //   // {
  //   //   field: "master_item_id",
  //   //   headerName: "ID",
  //   //   width: 100,
  //   // },
  //   {
  //     field: "product_title",
  //     headerName: "Product Name",
  //     flex: 1,
  //     valueGetter: ({ value }) => value,
  //     renderCell: (params) => (
  //       <>
  //         <AppImage src={params.row.display_image} width="40" height="40" />
  //         <Typography sx={{ ml: "12px" }}>
  //           {params.row.product_title}
  //         </Typography>
  //       </>
  //     ),
  //   },
  //   {
  //     field: "sku",
  //     headerName: "SKU",
  //     flex: 0.5,
  //     // valueGetter: ({ value }) => value,
  //   },
  //   {
  //     field: "unit_retail_price",
  //     headerName: "Cost",
  //     flex: 0.5,
  //     // valueGetter: ({ value }) => value,
  //   },
  //   // {
  //   //   field: "action",
  //   //   headerName: "Action",
  //   //   flex: 0.5,
  //   //   renderCell: (params) => (
  //   //     <IconButtonWithTooltip icon={<DeleteIcon />} title={"Delete"} />
  //   //   ),
  //   //   // valueGetter: ({ value }) => value,
  //   // },
  // ];
  // console.log("selectedProducts", selectedProducts);

  // search product from api searchProduct
  // const handleSearchProduct = (searchText, category, type, collection) => {
  //   const URL = PRODUCT.SEARCH_PRODUCT;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //     vendor_id: pageId,
  //     search_value: searchText,
  //     category: category,
  //     type: type,
  //     collection: collection,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       setData(json.result);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // //serach product using category
  // const handleSelectCategoryOption = () => {
  //   const URL = PRODUCT.FETCH_CATEGORY;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       setCategoryList(json.result);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // useEffect(() => {
  //   handleSelectCategoryOption();
  // }, []);

  // const handleSelectCategoryOptionWithLabel =
  //   Array.isArray(categoryList) &&
  //   categoryList.map((item) => {
  //     return {
  //       value: item,
  //       label: item,
  //     };
  //   });

  // const handleChangeCategory = (e) => {
  //   setProductCategory(e);
  //   handleSearchProduct("", e.value);
  // };
  //-----------------------------------------------------------------------------------------------------------------------------
  //serach product using product type
  // const handleSelectProductTypeOption = () => {
  //   const URL = PRODUCT.FETCH_PRODUCT_TYPE;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       setProductTypeList(json.result);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // useEffect(() => {
  //   handleSelectProductTypeOption();
  // }, []);

  // const handleSelectProductTypeWithLabel =
  //   Array.isArray(productTypeList) &&
  //   productTypeList.map((item) => {
  //     return {
  //       value: item,
  //       label: item,
  //     };
  //   });

  // const handleChangeProductType = (e) => {
  //   setProductType(e);
  //   handleSearchProduct("", "", e.value);
  // };

  //-----------------------------------------------------------------------------------------------------------------------------
  //serach product using tag
  // const handleTagOption = () => {
  //   const URL = PRODUCT.FETCH_TAG_LIST;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       setTagList(json.result);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // useEffect(() => {
  //   handleTagOption();
  // }, []);

  // const handleSelectTagWithLabel =
  //   Array.isArray(tagList) &&
  //   tagList.map((item) => {
  //     return {
  //       value: item,
  //       label: item,
  //     };
  //   });

  // const handleChangeTag = (e) => {
  //   setTag(e);
  //   handleSearchProduct("", e.value);
  // };
  //-----------------------------------------------------------------------------------------------------------------------------
  //serach product using collection
  // const handleCollectionOption = () => {
  //   const URL = PRODUCT.FETCH_COLLECTION_LIST;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log({ json });
  //       setCollectionList(json.result);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // useEffect(() => {
  //   handleCollectionOption();
  // }, []);

  // const handleSelectCollectionWithLabel =
  //   Array.isArray(collectionList) &&
  //   collectionList.map((item) => {
  //     return {
  //       value: item,
  //       label: item,
  //     };
  //   });

  // const handleChangeCollection = (e) => {
  //   setCollectionType(e);
  //   handleSearchProduct("", "", "", e.value);
  // };

  // const customStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     paddingTop: "0px",
  //     paddingBottom: "0px",
  //     borderRadius: "5px",
  //     cursor: "pointer",
  //     "& :hover": {
  //       borderColor: "black",
  //     },
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     zIndex: 99999,
  //     // fontFamily: "Mulish, sans-serif",
  //   }),
  //   indicatorSeparator: (styles) => ({
  //     ...styles,
  //     display: "none",
  //   }),
  // };
  const selectedProductsId =
    (Array.isArray(productsList) &&
      productsList.map((item) => item.master_product_id)) ||
    [];

  return (
    <>
      <Box
        sx={{
          // paddingBottom: "32px",
          // px: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SectionTitleText
          sx={{
            paddingBottom: "16px",
            marginTop: "16px",
            color: "#484A9E",
          }}
        >
          {pageTitle ?? "Add Products"}
        </SectionTitleText>

        <Box
          sx={{
            // mr: "150px",
            paddingBottom: "16px",
            marginTop: "16px",
          }}
        >
          {productsList.length > 0 && (
            <PrimaryButton onClick={() => handleAddProductsDialogOpen()}>
              Add Products
            </PrimaryButton>
          )}
        </Box>
      </Box>
      {/* <Divider /> */}

      {/* <Container maxWidth="md">
        <Grid item md={4} xs={12}>
          <BaseCard sx={{ padding: "16px" }}>
            <SectionTitleText sx={{ marginBottom: "16px" }}>
              Add Products
            </SectionTitleText>
            <Divider />
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <Avatar
                sx={{
                  background: "#EEEFFB",
                  padding: "16px",
                  minHeight: "56px",
                  minWidth: "56px",
                }}
              >
                <AppImage src={tagIcon} width="30" height="30" />
              </Avatar>
              <Button
                sx={{
                  bgcolor: "#F7F7FD",
                  borderRadius: "5px",
                  marginTop: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleAddProductsDialogOpen()}
              >
                Add products
              </Button>
            </Box>
          </BaseCard>
        </Grid>
      </Container> */}

      {/* {!productsList || (productsList.length === 0 && !loading) ? (
        <EmptyState
          icon={<ProductEmptyState />}
          text={"No Products"}
          bodyText={"Add Products to the Vendor by Clicking Below"}
        >
          <PrimaryButton onClick={() => handleAddProductsDialogOpen()}>
            Add Products
          </PrimaryButton>
        </EmptyState>
      ) : loading ? (
        <PageSpinner />
      ) : (
        Array.isArray(productsList) &&
        productsList.length > 0 && (
          <MuiBaseDataGrid
            containerStyles={{
              height: "600px",
              width: "100%",
            }}
            data={productsList}
            rowIdkey={"master_product_id"}
            columnDefData={columnsDataForDisplaySelectedProducts}
            checkboxSelection={false}
            loading={loading}
          />
        )
      )} */}

      {
        // !Array.isArray(productsList) &&
        productsList.length === 0 && !vendorProductsLoading && (
          <EmptyState
            icon={<ProductEmptyState />}
            text={"No Products"}
            bodyText={"Add Products to the Vendor by Clicking Below"}
          >
            <PrimaryButton onClick={() => handleAddProductsDialogOpen()}>
              Add Products
            </PrimaryButton>
          </EmptyState>
        )
      }

      {vendorProductsLoading && <PageSpinner />}
      {Array.isArray(productsList) &&
        productsList.length > 0 &&
        !vendorProductsLoading && (
          <BluecomMRTBaseTable
            // containerStyles={{
            //   height: "600px",
            //   width: "100%",
            // alignItems: "center",
            // justifyContent: "center",
            // }}
            data={productsList}
            rowIdkey={"master_product_id"}
            columns={columnsDataForDisplaySelectedProducts}
            columnDefData={columnsDataForDisplaySelectedProducts}
            checkboxSelection={false}
            // hideFooter={true}
            loading={loading}
          />
        )}

      <SuccessDialogForPO
        open={openSuccessDialog}
        handleClose={handleCloseSuccessDialog}
        title={"Vendor Added Successfully"}
        message={`Vendor has been added to the Vendors List.`}
        onDelete={() => router.push(`/app/vendors/${pageId}?tab=overview`)}
        primaryButtonName="View Vendor"
        secondaryButtonName={"Cancel"}
        onCancel={() => handleCloseSuccessDialog()}
      />
      {/* <BaseDialog
        // hideCloseButton
        open={openSuccessDialog}
        handleClose={handleCloseSuccessDialog}
      >
        <Box
          sx={{
            marginY: "8px",
            marginX: "8px",
            width: "550px",
            height: "302px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mt: "26px",
              mb: "22px",
            },
          }}
        >
          <CheckIcon />

          <Typography
            sx={{
              // pt: "16px",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "28px",
            }}
          >
            Vendor Added Successfully
          </Typography>
          <Typography
            sx={{
              mt: "20px",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            Vendor has been added to the Vendors List.
          </Typography>

          <Box
            sx={{
              display: "flex",
              mt: "25px",
              bottom: "0",
              width: "110%",
              gap: "16px",
              justifyContent: "center",
              borderTop: "1px solid #E0E0E0",
              pt: "24px",
            }}
          >
            <PrimaryButton
              onClick={() =>
                // router.push("/app/vendors")
                router.push(`/app/vendors/${pageId}?tab=overview`)
              }
              // onClick={handleGotToVendors()}
            >
              View Vendor
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}

      <SuccessDialog
        icon={<AlertIconPO />}
        title={"Discard Changes?"}
        // title={`Do you want to save ${BUNDLE_OR_PRODUCT} as draft?`}
        open={openCancelDialog}
        handleClose={handleCloseCancelDialog}
        handlePrimaryButton={() => router.push("/app/vendors")}
        primaryButtonTitle="Save & Exit"
        primaryButtonProps={{
          color: "error",
        }}
        handleSecondaryButton={() => handleCloseCancelDialog()}
        secondaryButtonTitle={"Cancel"}
        // handleSecondaryButton={() => handleCloseCancelDialog()}
        // description={`You can edit and publish ${BUNDLE_OR_PRODUCT} later`}
        description={`Do you want to save changes before leaving?`}
      />

      {/* <BaseDialog
        hideCloseButton
        open={openCancelDialog}
        handleClose={handleCloseCancelDialog}
      >
        <Box
          sx={{
            marginY: "8px",
            marginX: "8px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mb: "16px",
            },
          }}
        >
          <WarningIcon />

          <Typography
            sx={{
              pT: "16px",
              fontSize: "21px",
              fontWeight: "700",
              lineHeight: "28px",
            }}
          >
            Unsaved Changes
          </Typography>
          <Typography
            sx={{
              mt: "6px",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            Do you want to save changes before leaving?
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: "12px",

              bottom: "0",
              width: "372px",
              pt: "16px",
            }}
          >
            <SecondaryButton
              onClick={() => handleCloseCancelDialog()}
              fullWidth
              sx={{
                height: "44px",
              }}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                // handleOpenSuccessDialog();
                // handleCloseCancelDialog();
                router.push("/app/vendors");
              }}
              fullWidth
              sx={{
                // ml: 1,
                // height: "44px",
                // fontSize: "14px",
                // fontWeight: "600",

                ml: 1,
                height: "44px",
                // width: "auto",
                backgroundColor: "#D92D20",
                "&:hover": {
                  background: "#d91304",
                },
              }}
            >
              Save & Exit
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}

      <Box
        sx={{
          gap: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          backgroundColor: "white",
          bottom: "0",
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          width: "100%",
          ml: nextButton ? "0px" : "-240px",
        }}
      >
        {/* <SecondaryButton
          //  onClick={() => router.back()}
          onClick={() => handleOpenCancelDialog()}
        >
          {backButton ?? `Back`}
        </SecondaryButton> */}
        <PrimaryButton
          // onClick={() => handleNextButtonClick()}
          // onClick={
          // () => handleClickDone()
          // handleOpenSuccessDialog()
          // }
          onClick={() => {
            if (nextButton) {
              handleClickDoneUpdate();
            } else {
              handleClickDone();
            }
          }}
          disabled={
            !productsList.every((item) => item.moq) || productsList.length === 0
          }
        >
          {nextButton ?? `Done`}
        </PrimaryButton>
      </Box>

      <VendorOnboardingAddProductDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        handleFetchVendorProducts={handleFetchVendorProducts}
        selectedProductsId={selectedProductsId}
      />
      {/* <BaseDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "16px",
            // minWidth: "600px",
            // minHeight: "167px",
          }}
        >
          <SectionTitleText
            sx={{
              marginBottom: "16px",
            }}
          >
            Add Products
          </SectionTitleText>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // marginBottom: "46px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "5px",
                // marginBottom: "36px",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{
                  // marginTop: "16px",
                  width: "100%",
                  // height: "5px",
                }}
                id="outlined-size-small"
                size="small"
                placeholder="Search Products"
                onChange={(e) => handleSearchProduct(e.target.value)}
              />
              <FormSelectInput
                placeholder="Select Category"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  width: "90%",
                  // height: "5px",
                }}
                styles={customStyles}
                value={productCateogry}
                onChange={handleChangeCategory}
                id="master_product_id"
                options={handleSelectCategoryOptionWithLabel}
              />
              <FormSelectInput
                placeholder="Product Type"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  width: "90%",
                  // height: "5px",
                }}
                styles={customStyles}
                value={productType}
                id="master_product_id"
                onChange={handleChangeProductType}
                options={handleSelectProductTypeWithLabel}
              />
              <FormSelectInput
                placeholder="Collection"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  width: "70%",
                  // height: "5px",
                }}
                styles={customStyles}
                value={collectionType}
                onChange={handleChangeCollection}
                options={handleSelectCollectionWithLabel}
              />
            </Box>
          </Box>
          <Divider
            sx={{
              marginTop: "5px",
            }}
          />
          <Box
            sx={{
              minWidth: "900px",
              // maxWidth: "800px",
            }}
          >
            <MuiBaseDataGrid
              containerStyles={{ height: "600px" }}
              data={data}
              rowIdkey={"master_product_id"}
              columnDefData={columnsDataForSelect}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              selectionModel={selectedProducts}
              disableSelectionOnClick={false}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: "16px",
              marginBottom: "-20px",
            }}
          >
            <PrimaryButton
              sx={{
                // display: "flex",
                // float: "right",
                // marginTop: "16px",
                marginBottom: "16px",
              }}
              onClick={() => handleAddProductsToVendor()}
            >
              Add Selected Products
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}

      <DialogAsCaution
        title="Are you sure you want to delete this Product?"
        message="This action can't be undone"
        primaryButtonName={"Delete Product"}
        open={openDialog}
        onCancel={handleDeleteDialogClose}
        onDelete={() => handleDeleteProduct(selectedProducts)}
      />

      {/* <BaseDialog
        hideCloseButton
        open={openDialog}
        handleClose={handleDeleteDialogClose}
      >
        <Box
          sx={{
            marginY: "8px",
            marginX: "8px",
            width: "400px",
            // height: "200px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mb: "16px",
            },
          }}
        >
          <CautionIcon />

          <Typography
            sx={{
              pT: "16px",
              fontSize: "22px",
              fontWeight: "600",
              lineHeight: "28px",
            }}
          >
            Delete Product
          </Typography>
          <Typography
            sx={{
              mt: "6px",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this Product?
            <br /> This action can{"'"}t be undone
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: "12px",
              bottom: "0",
              width: "372px",
              pt: "16px",
            }}
          >
            <SecondaryButton
              onClick={handleDeleteDialogClose}
              fullWidth
              sx={{ height: "44px" }}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => handleDeleteProduct(selectedProducts)}
              fullWidth
              sx={{
                ml: 1,
                height: "44px",
                backgroundColor: "#D92D20",
                "&:hover": {
                  background: "#d91304",
                },
              }}
            >
              Delete Product
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}
    </>
  );
}

const textContainerStyle = {
  maxWidth: "100%",
  marginTop: "16px",
};
const containerStyle = {
  maxWidth: "100%",
  marginTop: "8px	",
};

// const categoryOfProductsList = [
//   "All",
//   "Category 1",
//   "Category 2",
//   "Category 3",
//   "Category 4",
//   "Category 5",
//   "Category 6",
// ];

// const categoryOfProducts = categoryOfProductsList.map((item, index) => {
//   return { label: item, value: item };
// });

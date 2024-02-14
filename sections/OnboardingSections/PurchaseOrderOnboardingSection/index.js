/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import AddIcon from "components/Common/Icons/add";
import Filter from "components/Common/Icons/filter";
import DateInput from "components/Common/Inputs/DateInput";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PURCHASE_ORDER, VENDOR, WAREHOUSE } from "constants/API_URL";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import imageList1 from "public/assets/imageList1.png";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import AddIconPO from "components/Common/Icons/POicons/AddIconPO";
import { useRouter } from "next/router";
import POAddProductsDialog from "./POAddProductsDialog";
import {
  deleteSelectedProductForPO,
  fetchPurchaseOrderDataStart,
  setPurchaseOrderData,
  setSelectedProductsForPO,
  updatePurchaseOrderData,
  updateSelectedProductsForPO,
} from "redux/purchaseOrders/purchaseOrdersSlice";
import CustomSelectComponent from "./components/CustomSelectComponent";
import { groupBy, sumBy } from "lodash";
import EmptyState from "components/Common/EmptyState";
import DeleteIconPO from "components/Common/Icons/POicons/DeleteIconPO";
import { updatePurchaseOrderOnboardingSteps } from "redux/onboarding/onboardingSlice";
import TagIcon from "components/Common/Icons/TagIcon";
import TagPO from "components/Common/Icons/POicons/TagPO";
import ClickPopover from "components/Common/PopOver/ClickPopover";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";

import MRBaseTable from "components/Common/Tables/MRBaseTable";
import EmptyStateForAddProductsInPO from "./components/EmptyStateForAddProductsInPO";
import DialogAsCaution from "components/Common/Dialog/DialogAsCaution";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import Select from "react-select";
import CautionIcon from "components/Common/Icons/CautionIcon";
import BulletsIcon from "components/Common/Icons/POicons/BulletsIcon";
import SuccessDialogForPO from "./components/SuccessDialogForPO";
import DraftDialogPOIcon from "components/Common/Icons/POicons/DialogIcons/DraftDialogPOIcon";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import { handleApiCalls } from "redux/purchaseOrders/purchaseOrders.helpers";
import getCurrencyValue from "utils/currencyConversion/getCurrencyValue";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import NewPOAddProductsDialog from "./NewPOAddProductsDialog";
import getFormattedNumber from "utils/numberFormat/getFormattedNumber";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import RenderTextInputForPOTable from "./components/POTableComponents/RenderTextInputForPOTable";
import {
  MdEdit,
  MdOutlineEdit,
  MdOutlinePersonPinCircle,
} from "react-icons/md";
import EditPOProductDialog from "./components/POTableComponents/EditPOProductDialog";
const newDate = new Date();
const getTimeinMiliseconds = newDate.getTime();

const mapState = ({ user, purchaseOrdersData }) => ({
  currentUser: user.currentUser,
  purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
});
export default function PurchaseOrderOnboardingSection({ pageTitle }) {
  const router = useRouter();
  const pageId = router.query.pageId ?? router.query.purchaseOrderId;
  const { currentUser, purchaseOrdersData } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState(purchaseOrdersData?.customer_notes || "");

  const [deleteDialogOpenforProduct, setDeleteDialogOpenforProduct] =
    useState(false);
  const [deleteProductofPO, setDeleteProductofPO] = useState({});
  useEffect(() => {
    setNotes(
      purchaseOrdersData?.customer_notes ||
        "The PO includes all the required product line items. Kindly review the Purchase Order and confirm the availability, pricing, and delivery timeline. Thank you for your prompt attention to this matter." ||
        ""
    );
  }, [purchaseOrdersData?.customer_notes]);

  const handleDeleteDialogCloseforProduct = () => {
    setDeleteDialogOpenforProduct(false);
    setDeleteProductofPO({});
    // handleClickSaveAsDraftButton("noRedirection");
  };

  const handleDeleteDialogOpenforProduct = ({
    master_product_id,
    master_item_id,
  }) => {
    setDeleteProductofPO({
      master_product_id,
      master_item_id,
    });
    setDeleteDialogOpenforProduct(true);
  };

  const [saveAsDraftDialogOpen, setSaveAsDraftDialogOpen] = useState(false);

  const handleSaveAsDraftDialogOpen = () => {
    setSaveAsDraftDialogOpen(true);
  };
  const handleSaveAsDraftDialogClose = () => {
    setSaveAsDraftDialogOpen(false);
  };

  const [purchaseOrderCreatedDialogOpen, setPurchaseOrderCreatedDialogOpen] =
    useState(false);

  const handlePurchaseOrderCreatedDialogClose = () => {
    router.push(`/app/purchase-orders/${pageId}`);
  };

  const selectedProducts =
    // (Array.isArray(purchaseOrdersData?.products) &&
    // 	purchaseOrdersData?.products) ||
    Array.isArray(purchaseOrdersData?.selectedProducts) &&
    purchaseOrdersData.selectedProducts;

  const purchaseOrdersDataFromState = purchaseOrdersData;

  const mapSelectedProductsForPO =
    Array.isArray(selectedProducts) &&
    selectedProducts?.map((item) => {
      return {
        master_item_id: item.master_item_id,
        master_product_id: item.master_product_id,
        qty_ordered: item.qty_ordered,
        unit_cost: item.unit_cost,
        total_cost: item.total_cost,
        currency_id: item?.currency_id,
      };
    });

  const currentDate = new Date();

  const [addProductinTable, setAddProductinTable] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [promiseDate, setPromiseDate] = useState(
    (purchaseOrdersData?.promise_date &&
      new Date(purchaseOrdersData?.promise_date)) ||
      null
  );
  useEffect(() => {
    setPromiseDate(
      (purchaseOrdersData?.promise_date &&
        new Date(purchaseOrdersData?.promise_date)) ||
        null
    );
  }, [purchaseOrdersData?.promise_date]);

  const [tableItems, setTableItems] = useState(selectedProducts ?? []);
  // const [totalAmount, setTotalAmount] = useState(0);

  const groupedTableItems = useMemo(() => {
    const groupedItems = groupBy(tableItems, "master_product_id");
    return groupedItems;
  }, [tableItems]);
  const groupedTableItemsArray = Object.entries(groupedTableItems).map(
    ([key, value]) => {
      return {
        master_product_id: key,
        items: value,
        product_title: value[0].product_title,
        // unit_cost_price: Number(value[0].unit_cost_price),
        product_sku: value[0].product_sku,
        product_barcode: value[0].product_barcode,
        // moq: value[0].moq,
        display_image: value[0].display_image,
        // item_display_image: value[0].item_display_image,
        // qty_available: value[0].qty_available,
      };
    }
  );

  console.log({ groupedTableItems, groupedTableItemsArray });

  const handlePromiseDate = (e) => {
    // setValue(e);
    const date = format(e, "yyyy-MM-dd");
    setPromiseDate(e);
    // router.replace(`/${userId}?date=${date}`);
  };
  const [taxPercent, setTaxPercent] = useState("");
  // const pageIdFromState = purchaseOrdersData?.pageId;
  useEffect(() => {
    setTableItems(selectedProducts);
  }, [selectedProducts]);

  // useEffect(() => {
  // 	if (pageIdFromState !== pageId) {
  // 		dispatch(setPurchaseOrderData({ pageId }));
  // 	}
  // }, [pageId]);

  const handleFetchVendors = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ vendors: json });
        setVendorsList(json.result);
      })
      .catch((err) => console.log(err));
  };
  const handleFetchWarehouseList = () => {
    const URL = WAREHOUSE.FETCH_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ warehouseList: json });
        setWarehouseList(json.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleFetchVendors();
    handleFetchWarehouseList();
  }, []);

  const vendorOptions =
    Array.isArray(vendorsList) &&
    vendorsList.map((vendor) => ({
      label: vendor.company_name,

      value: vendor.vendor_id,
      ...vendor,
    }));

  const optionForVendor =
    Array.isArray(vendorsList) &&
    vendorsList.map((vendor) => ({
      label: vendor.company_name,
      label: (
        <div style={{ whiteSpace: "pre-wrap" }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {vendor.company_name}
          </span>
          {"\n"}
          <span>{vendor.address_1}</span>
          {"\n"}
          <span>{vendor.state}</span>:<span>{vendor.zipcode}</span>
        </div>
      ),
      value: vendor.vendor_id,
      ...vendor,
    }));

  const warehouseOptions =
    Array.isArray(warehouseList) &&
    warehouseList.map((warehouse) => {
      return {
        label: warehouse.wh_name,

        value: warehouse.wh_id,
        warehouseInfo: (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {warehouse.address1}
            {"\n"}
            {warehouse.state} :{warehouse.zipcode}
          </div>
        ),

        ...warehouse,
      };
    });

  const options =
    Array.isArray(warehouseList) &&
    warehouseList.map((warehouse) => {
      return {
        label: (
          <div style={{ whiteSpace: "pre-wrap" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {warehouse.wh_name}
            </span>
            {"\n"}
            <span>{warehouse.address_1}</span>
            {"\n"}
            <span>{warehouse.state}</span>:<span>{warehouse.zipcode}</span>
          </div>
        ),
        value: warehouse.wh_id,
        ...warehouse,
      };
    });

  // get vendor name from vendor id
  const vendorName =
    vendorOptions.find(
      (vendor) => vendor.value === purchaseOrdersDataFromState.vendor_id
    ) ?? {};
  const warehouseName =
    warehouseOptions.find(
      (warehouse) => warehouse.value === purchaseOrdersDataFromState.wh_id
    ) ?? {};

  let getOptionLabel = (option) =>
    option.label &&
    `${option.label}  ${option.address1 || ""} ${option.address2 || ""} ${
      option.city || ""
    } ${option.state || ""} ${option.country || ""} ${option.zipcode || ""}`;

  function getLabel(option = {}, type = "vendor") {
    if (type === "warehouse") {
      return (
        option.wh_name &&
        `${option.wh_name}  ${option.address1 || ""} ${option.address2 || ""} ${
          option.city || ""
        } ${option.state || ""} ${option.country || ""} ${option.zipcode || ""}`
      );
    }
    return (
      option.company_name &&
      `${option.company_name}  ${option.address1 || ""} ${
        option.address2 || ""
      } ${option.city || ""} ${option.state || ""} ${option.country || ""} ${
        option.zipcode || ""
      }`
    );
  }

  const [selectedVendor, setSelectedVendor] = useState(
    {
      // label: `${purchaseOrdersDataFromState.vendor.company_name} , ${purchaseOrdersDataFromState.vendor.phone}`,
      label: getLabel(purchaseOrdersDataFromState.vendor),
      value: purchaseOrdersDataFromState.vendor_id,
    } || ""
  );
  useEffect(() => {
    if (purchaseOrdersDataFromState.vendor_id) {
      setSelectedVendor(
        {
          label: getLabel(purchaseOrdersDataFromState.vendor),
          // label: `${purchaseOrdersDataFromState.vendor.company_name} , ${purchaseOrdersDataFromState.vendor.phone}`,
          value: purchaseOrdersDataFromState.vendor_id,
        } || ""
      );
    }
  }, [purchaseOrdersDataFromState.vendor_id]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    {
      label: getLabel(purchaseOrdersDataFromState.warehouse, "warehouse"),
      // label: `${purchaseOrdersDataFromState.warehouse.wh_name} , ${purchaseOrdersDataFromState.warehouse.phone}`,
      value: purchaseOrdersDataFromState.wh_id,
    } || ""
  );
  useEffect(() => {
    if (purchaseOrdersDataFromState.wh_id) {
      setSelectedWarehouse(
        {
          label: getLabel(purchaseOrdersDataFromState.warehouse, "warehouse"),
          // label: `${purchaseOrdersDataFromState.warehouse.wh_name} , ${purchaseOrdersDataFromState.warehouse.phone}`,
          value: purchaseOrdersDataFromState.wh_id,
        } || ""
      );
    }
  }, [purchaseOrdersDataFromState.wh_id]);

  // const [selectedVendor, setSelectedVendor] = useState(
  // 	{
  // 		// label: (vendorName && getOptionLabel(vendorName)) ?? "",
  // 		label: purchaseOrdersDataFromState.vendor_name ?? "",

  // 		// vendorName &&
  // 		// `${vendorName?.label} - ${vendorName?.address1} ${vendorName?.address2} ${vendorName?.city} ${vendorName?.state} ${vendorName?.country} ${vendorName?.zipcode}`,
  // 		value: purchaseOrdersDataFromState.vendor_id ?? "",
  // 	} ?? "",
  // );
  // const [selectedWarehouse, setSelectedWarehouse] = useState(
  // 	{
  // 		// label: (warehouseName && getOptionLabel(warehouseName)) ?? "",
  // 		label:
  // 			(purchaseOrdersDataFromState.warehouse &&
  // 				purchaseOrdersDataFromState.warehouse.wh_name) ??
  // 			"",
  // 		value: purchaseOrdersDataFromState.wh_id ?? "",
  // 	} || "",
  // );

  // console.log({ vendorName });

  // useEffect(() => {
  // 	if (
  // 		purchaseOrdersDataFromState.vendor_id ||
  // 		purchaseOrdersDataFromState.warehouse_id
  // 	) {
  // 		setSelectedVendor(
  // 			{
  // 				label: (vendorName && getOptionLabel(vendorName)) ?? "",
  // 				// label: purchaseOrdersDataFromState.vendor_name,
  // 				value: purchaseOrdersDataFromState.vendor_id ?? "",
  // 			} || "",
  // 		);
  // 		setSelectedWarehouse({
  // 			label: (warehouseName && getOptionLabel(warehouseName)) ?? "",
  // 			// label:
  // 			// (purchaseOrdersDataFromState.warehouse &&
  // 			// 	purchaseOrdersDataFromState.warehouse.wh_name) ??
  // 			// "",
  // 			value: purchaseOrdersDataFromState.wh_id ?? "",
  // 		});
  // 	}
  // }, [
  // 	// purchaseOrdersDataFromState.vendor_id,
  // 	// purchaseOrdersDataFromState.warehouse_id,
  // 	purchaseOrdersDataFromState,
  // 	// warehouseOptions,
  // 	// vendorOptions,
  // ]);

  console.log({ warehouseName });
  // .map((warehouse) => {
  // 	warehouse.label = (
  // 		<div
  // 			style={{
  // 				fontWeight: "700",
  // 				lineHeight: "28px",
  // 			}}
  // 		>
  // 			{warehouse.label}
  // 		</div>
  // 	);
  // 	return warehouse;
  // });
  // 	{
  // 	label: (
  // 		<Box
  // 			sx={{
  // 				display: "flex",
  // 				flexDirection: "column",
  // 				cursor: "pointer",
  // 			}}
  // 		>
  // 			<Typography
  // 				sx={{
  // 					fontWeight: "700",
  // 					lineHeight: "28px",
  // 				}}
  // 			>
  // 				{warehouse.wh_name}
  // 			</Typography>
  // 			<Typography>{warehouse.address_1}</Typography>
  // 			<Typography>
  // 				{warehouse.city} {warehouse.zipcode}
  // 				{warehouse.country}
  // 			</Typography>
  // 		</Box>
  // 	),
  // 	value: warehouse.wh_id,
  // }

  const handleDeleteDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setAddProductinTable([]);
  };

  const dispatch = useDispatch();
  const handleDeleteProductfromRow = async ({
    master_product_id,
    master_item_id,
  }) => {
    await dispatch(
      deleteSelectedProductForPO({ master_product_id, master_item_id })
    );

    // remove the item from tableItems if the id matches the item's master_item_id

    const updatedItems = tableItems.filter((item) => {
      if (master_product_id) {
        return item.master_product_id !== master_product_id;
      }
      return item.master_item_id !== master_item_id;
    });
    setTableItems(updatedItems);
    // handleDeleteDialogCloseforProduct();

    // if (updatedItems.length > 0) {
    handleClickSaveAsDraftButton("noRedirection", updatedItems);
    // }
    // handleDeleteItems();

    // enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
    setDeleteDialogOpenforProduct(false);

    // const updatedItems = tableItems.filter((item) => {
    // 	return item.master_product_id !== id;
    // });
    // setTableItems(updatedItems);

    // let temp = 0;
    // let tempAmount = 0;
    // updatedItems.map((item) => {
    // 	temp += parseInt(item.order_qty);
    // 	tempAmount += parseInt(item.price);
    // });

    // setTotalQTY(temp);
    // setTotalAmount(tempAmount);
  };
  const handleDeleteItems = async () => {
    handleClickSaveAsDraftButton("noRedirection");

    setDeleteDialogOpenforProduct(false);
  };

  const handleChangeValues = (e, id, key) => {
    const updatedItems = selectedProducts.map((item) => {
      if (item.master_item_id === id || item.item_id === id) {
        if (key === "qty_ordered")
          return {
            ...item,
            [key]: e.target.value ?? 0,
            total_cost: e.target.value * item.item_unit_cost_price,
          };
        return {
          ...item,
          [key]: e.target.value ?? 0,
        };
      }

      return item;
    });

    dispatch(updateSelectedProductsForPO(updatedItems));
    setTableItems(updatedItems);

    // let temp = 0;
    // let tempAmount = 0;
    // console.log("updatedtableItem--", updatedItems);
    // updatedItems.map((item) => {
    // 	if (item.order_qty) {
    // 		temp += parseInt(item.order_qty);
    // 	} else {
    // 		temp += 0;
    // 	}
    // 	// temp += parseInt(item.order_qty);
    // 	// console.log("temp--", temp);

    // 	// tempAmount += parseInt(item.price);
    // 	if (item.order_qty && item.unit_retail_price) {
    // 		tempAmount +=
    // 			parseInt(item.order_qty) * parseInt(item.unit_retail_price);
    // 	} else {
    // 		tempAmount += 0;
    // 	}
    // 	// console.log("tempAmount--", tempAmount);
    // });
    // setTotalQTY(temp);
    // setTotalAmount(tempAmount);
  };
  console.log({ tableItems });
  // const handleSaveAndContinue = () => {
  // 	dispatch(setSelectedProductsForPO(tableItems));
  // 	// setTableItems(tableItems);
  // 	// router.push(
  // 	// 	`/onboarding/purchase-orders/${pageId}?step=preview&id=1`,
  // 	// )
  // };

  // {
  // 	"master_item_id": "138983368743585800",
  // 	"master_product_id": "1679043935594",
  // 	"qty_ordered": 50,
  // 	"unit_cost": 200,
  // 	"total_cost": 10000,
  // 	"currency_id": 12
  // },

  const productsDataForAPI =
    Array.isArray(selectedProducts) &&
    selectedProducts.map((item) => {
      return {
        master_item_id: item.master_item_id ?? item.item_id,
        master_product_id: item.master_product_id ?? item.product_id,
        qty_ordered: item.qty_ordered ?? 0,
        item_unit_cost_price: item.unit_cost_price ?? item.unit_cost,
        total_cost: item.item_unit_cost_price * item.qty_ordered ?? 0,
        currency_id: item?.currency_id ?? 0,
        moq: item?.moq ?? 0,
      };
    });

  const handleCreatePurchaseOrder = () => {
    const URL = PURCHASE_ORDER.CREATE_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: pageId,
      vendor_id: selectedVendor?.value,
      wh_id: selectedWarehouse.value,
      cancel_date: "",
      promise_date: promiseDate,
      status: "open",
      products: productsDataForAPI,
    };

    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(
            updatePurchaseOrderOnboardingSteps({
              step: "po-details",
              nextStep: "preview",
            })
          );
          handleFetchPOData();
          enqueueSnackbar(json.message);

          // router.push(
          //   `/onboarding/purchase-orders/${pageId}?step=preview&id=1`
          // );
        }
        console.log({ json });
      })
      .catch((error) => {
        console.log({ error });
        enqueueSnackbar(json.message, { variant: "error" });
      });
  };
  // const handlePurchaseOrderCreatedDialogOpen = () => {
  //   if (
  //     selectedVendor &&
  //     selectedWarehouse &&
  //     promiseDate &&
  //     tableItems.length > 0 &&
  //     tableItems.every(
  //       (item) =>
  //         item.qty_ordered &&
  //         // item_unit_cost_price &&
  //         item.moq
  //       // item.total_cost_price,
  //     )
  //   ) {
  //     setPurchaseOrderCreatedDialogOpen(true);
  //     handleCreatePurchaseOrder();
  //   } else {
  //     enqueueSnackbar("Please fill all the fields", { variant: "error" });
  //   }
  // };

  const addProductcolumnData = [
    {
      field: "product",
      headerName: "Product",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <AppImage
            sx={{ objectFit: "cover", borderRadius: "5px" }}
            width="45"
            height="45"
            src={params.row.display_image}
          />
          <Typography
            sx={{
              // maxWidth:"250px",
              marginLeft: "16px",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
              // color: (theme) => theme.palette.primary.main,
            }}
          >
            {params.row.product_title}
          </Typography>
        </Box>
      ),

      // width: 300,
      flex: 1,
    },
    {
      field: "sku",
      headerName: "SKU",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "14px",
            ml: 1,
          }}
        >
          {" "}
          {params.row.product_sku}
        </Typography>
      ),

      width: 150,
    },

    {
      field: "moq",
      headerName: "MOQ",
      // renderCell: (params) => <Typography>100</Typography>,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
          {params.value}
        </Typography>
      ),
      width: 90,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "item_unit_cost_price",
      headerName: "Cost",
      renderCell: (params) => (
        <RenderCurrency
          value={params.value}
          sx={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        />
      ),
      // renderCell: (params) => <Typography>$ 50</Typography>,
      width: 100,
      headerAlign: "right",
      align: "right",
    },
  ];
  // const customStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     paddingTop: "8px",
  //     paddingBottom: "8px",
  //     // borderRadius: "8px",
  //     // fontFamily: "Mulish, sans-serif",
  //     // "& :hover": {
  //     // 	borderColor: "black",
  //     // },
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
  //   option: (styles) => ({
  //     ...styles,
  //     fontWeight: 500,
  //     fontSize: "16px",
  //   }),
  //   input: (styles) => ({
  //     ...styles,
  //     fontWeight: 600,
  //   }),
  // };

  const PO_DATA = {
    user_id: currentUser.merchant_id,
    po_id: pageId,
    vendor_id: selectedVendor?.value,
    wh_id: selectedWarehouse?.value,
    products: productsDataForAPI,
    status: "draft",
    cancel_date: "",
    promise_date: promiseDate,
    customer_notes: notes,
  };

  const handleClickSaveAsDraftButton = (redirection, updatedItems = []) => {
    // setLoading(true);
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    let po_line_id = purchaseOrdersDataFromState.po_line_id;
    const data = {
      // user_id: currentUser.merchant_id,
      ...PO_DATA,
      po_line_id: po_line_id,
      products: updatedItems.length > 0 && updatedItems,
    };

    if (!po_line_id) {
      enqueueSnackbar("Your Purchase Order has been saved as draft");
      setSaveAsDraftDialogOpen(false);
      if (redirection !== "noRedirection") {
        router.push("/app/purchase-orders?tab=draft");
      }
      // setLoading(false);
      return handleCreatePO("draft");
    }

    console.log({ data }, "handleClickSaveAsDraftButton");
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        // setLoading(false);
        if (redirection === "noRedirection") {
          return enqueueSnackbar("Product removed from the list!");
        }
        router.push("/app/purchase-orders?tab=draft");

        enqueueSnackbar(json.message);
        setSaveAsDraftDialogOpen(false);

        handleFetchPOData();
      }
      console.log(json);
    });
  };

  const handlePurchaseOrderCreatedDialogOpen = () => {
    setLoading(true);
    const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
    let po_line_id = purchaseOrdersDataFromState.po_line_id;
    const data = {
      // user_id: currentUser.merchant_id,
      ...PO_DATA,
      po_line_id: po_line_id,
    };

    if (!po_line_id) {
      // handleCreatePO();
      dispatch(
        updatePurchaseOrderOnboardingSteps({
          step: "po-details",
          nextStep: "preview",
        })
      );
      // return router.push(
      //   `/app/purchase-orders/create/${pageId}?step=preview&id=1`
      // );
      // router.push(
      // 	`/app/purchase-orders/create/${pageId}?step=preview&id=1`,
      // );
      return handleCreatePO();
    }

    console.log({ data });
    appFetch(URL, data).then((json) => {
      setLoading(false);
      if (
        // selectedVendor &&
        // selectedWarehouse &&
        // promiseDate &&
        // tableItems.length > 0 &&
        // tableItems.every(
        //   (item) =>
        //     item.qty_ordered &&
        //     // item_unit_cost_price &&
        //     item.moq
        //   // item.total_cost_price,
        // ) &&
        json.status === "success"
      ) {
        dispatch(
          updatePurchaseOrderOnboardingSteps({
            step: "po-details",
            nextStep: "preview",
          })
        );

        // router.push(
        // 	`/app/purchase-orders/create/${pageId}?step=preview&id=1`,
        // );
        handleFetchPOData("route");
      } else {
        enqueueSnackbar("Please fill all the fields", {
          variant: "error",
        });
      }
    });
  };
  const handleFetchPOData = async (route) => {
    const URL = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
    const data = {
      user_id: currentUser.merchant_id,
      po_id: pageId,
    };
    setLoading(true);
    const response = await handleApiCalls(URL, data);
    const result = (response && response.result[0]) ?? {};

    console.log({ response }, "inside saga action fetchPurchaseOrderData");
    await dispatch(setPurchaseOrderData(result));
    setLoading(false);
    if (route) {
      router.push(`/app/purchase-orders/create/${pageId}?step=preview&id=1`);
    }

    // dispatch(
    // 	fetchPurchaseOrderDataStart({
    // 		url: URL,
    // 		data,
    // 		route: `/app/purchase-orders/create/${pageId}?step=preview&id=1`,
    // 	}),
    // );
  };
  useEffect(() => {
    handleFetchPOData();
  }, []);
  const handleCreatePO = (type) => {
    setLoading(true);
    const URL = PURCHASE_ORDER.CREATE_PURCHASE_ORDER;
    const data = {
      ...PO_DATA,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        setLoading(false);
        console.log({ json }, "handleCreatePO");
        if (type === "draft") {
          return handleFetchPOData();
        }
        handleFetchPOData("route");
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });
      }
    });
  };

  const handleVendorSelect = (e) => {
    setSelectedVendor(e);
    dispatch(updatePurchaseOrderData({ vendor_id: e.value, vendor: e }));
    // handleCreatePO(e);
    console.log(e);
  };
  const handleWarehouseSelect = (e) => {
    setSelectedWarehouse(e);
    dispatch(updatePurchaseOrderData({ wh_id: e.value, warehouse: e }));
    // handleCreatePO(e);
  };
  const getTotalOfAllTheTableItemsSum = sumBy(tableItems, "total_cost");

  // get total of all the table items qty ordered
  const getTotalOfAllTheTableItemsQtyOrdered = () => {
    let total = 0;
    tableItems.map((item) => {
      if (parseInt(item.qty_ordered) > 0) {
        total += parseInt(item.qty_ordered);
      }
    });
    return total;
  };

  // get total of all the table items unit cost price
  const getTotalOfAllTheTableItemsUnitCostPrice = () => {
    let total = 0;
    tableItems.map((item) => {
      if (parseInt(item.item_unit_cost_price) > 0) {
        total += parseInt(item.item_unit_cost_price);
      }
    });
    return total;
  };

  const getTotalOfAllTheTableItemsTotalCost = () => {
    let total = 0;
    selectedProducts.map((item) => {
      const itemTotalCost = item.qty_ordered * item.item_unit_cost_price;
      if (parseInt(itemTotalCost) > 0) {
        total += parseInt(itemTotalCost);
      }
    });
    return total;
  };

  // get total of moq of all the table items
  const getTotalOfAllTheTableItemsMoq = () => {
    let total = 0;
    tableItems.map((item) => {
      if (parseInt(item.moq) > 0) {
        total += parseInt(item.moq);
      }
    });
    return total;
  };

  // sumBy(
  // 	tableItems,
  // 	"qty_ordered",
  // );
  // get total amount with tax percentage
  const getTotalAmountWithTax =
    getTotalOfAllTheTableItemsSum +
    (getTotalOfAllTheTableItemsSum * taxPercent) / 100;
  // const getTotalAmountWithTax = getTotalOfAllTheTableItemsSum * 1.13;

  const handleAddProductsClick = () => {
    handleDeleteDialogOpen();
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProductData, setEditProductData] = useState({});
  const handleEditDialogOpen = (product) => {
    setEditProductData(product);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditProductData({});
  };
  const getTotalOfAggregatedCell = (list = [], key, secondKey) => {
    const total =
      Array.isArray(list) && list.length > 0
        ? list.reduce((acc, curr) => acc + curr[key][secondKey], 0)
        : 0;
    return total;
  };
  const columnData = [
    {
      accessorKey: "action",
      header: "Action",
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            // ml: -2,
            ml: "-32px",
          }}
        >
          {cell.row.getCanExpand() && (
            <IconButtonWithTooltip
              icon={<MdOutlineEdit />}
              // title={"Delete"}
              // onClick={() => {
              // 	handleDeleteProductfromRow(
              // 		cell.row.original.master_item_id,
              // 	);
              // 	// console.log(cell.row.original.id, "cell.row.original");
              // }}
              sx={{
                // p: 0,
                // borderRadius: "50%",
                width: "50px",
                height: "50px",
                // ml:'-16px'
              }}
              title={`Edit Item`}
              onClick={() => {
                handleEditDialogOpen(cell.row.original);
              }}
            />
          )}
          {cell.row.getCanExpand() ? (
            <IconButtonWithTooltip
              icon={<DeleteIconPO />}
              // title={"Delete"}
              // onClick={() => {
              // 	handleDeleteProductfromRow(
              // 		cell.row.original.master_item_id,
              // 	);
              // 	// console.log(cell.row.original.id, "cell.row.original");
              // }}
              title={`Remove product`}
              onClick={() => {
                handleDeleteDialogOpenforProduct({
                  master_product_id: cell.row.original.master_product_id,
                });
              }}
            />
          ) : (
            <IconButtonWithTooltip
              icon={<DeleteIconPO />}
              // title={"Delete"}
              // onClick={() => {
              // 	handleDeleteProductfromRow(
              // 		cell.row.original.master_item_id,
              // 	);
              // 	// console.log(cell.row.original.id, "cell.row.original");
              // }}
              title={`Remove Item`}
              onClick={() => {
                handleDeleteDialogOpenforProduct({
                  master_item_id: cell.row.original.master_item_id,
                });
              }}
            />
          )}
        </Box>
      ),
      size: 40,
    },
    {
      accessorKey: "product",
      header: "Product Details",
      Cell: ({ cell }) => (
        <>
          {console.log({ cell })}
          {!cell.row.getCanExpand() ? (
            <RenderProductDetails
              display_image={cell.row.original.display_image}
              title={`${cell.row.original.product_title} - ${
                Array.isArray(cell.row.original.options) &&
                cell.row.original.options.map((item) => item.value).join(" / ")
              } `}
              href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
              // product_id={cell.row.original.master_product_id}
              sku={
                cell.row.original.sku
                // cell.row.original.product_sku
              }
              // barcode={cell.row.original.product_barcode}
              variant_title={cell.row.original.item_title}
              openInNewTab={true}
            />
          ) : (
            <RenderProductDetails
              display_image={cell.row.original.display_image}
              title={`${cell.row.original.product_title}`}
              href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
              // product_id={cell.row.original.master_product_id}
              sku={
                // cell.row.original.sku ??
                cell.row.original.product_sku
              }
              // barcode={cell.row.original.product_barcode}
              variant_title={cell.row.original.item_title}
              openInNewTab={true}
            />
          )}
        </>
      ),
      Footer: ({ table }) =>
        tableItems.length > 0 && (
          <Stack
            sx={{
              py: 1,
              ml: "16px",
            }}
          >
            {/* {console.log({
              table,
              pageCount: table.getPageCount(),
              expandedRow: table.getExpandedRowModel(),
              coreRow: table.getCoreRowModel(),
            })} */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {tableItems.length} variant
            </Typography>
          </Stack>
        ),
      size: 500,
    },

    {
      accessorKey: "qty_available",
      header: "On Hand Qty",
      Cell: ({ cell, row }) => (
        <>
          {!cell.row.getCanExpand() ? (
            <Typography>
              {getFormattedNumber(
                cell.row.original.qty_available ||
                  cell.row.original.available_qty ||
                  0
              )}
            </Typography>
          ) : (
            <>
              {/* {
                // get the total of all the table items qty available for the sum row

                console.log({ cell }, "aggregatedCell")
              } */}
              {getFormattedNumber(
                selectedProducts
                  .filter(
                    (item) =>
                      item.master_product_id ===
                      cell.row.original.master_product_id
                  )
                  .reduce(
                    (sum, row) =>
                      sum + (row.qty_available || row.available_qty || 0),
                    0
                  ) || 0
              )}
              {/* {getTotalOfAggregatedCell(
                cell.row.subRows,
                "original",
                "available_qty"||"qty_available"
              ) ||0} */}
            </>
          )}
        </>
      ),
      Footer: () =>
        tableItems.length > 0 && (
          <Stack
            sx={{
              py: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {getFormattedNumber(
                selectedProducts.reduce(
                  (sum, row) =>
                    sum + (row.qty_available || row.available_qty || 0),
                  0
                ) || 0
              )}
            </Typography>
          </Stack>
        ),

      // aggregationFn: "sum",
      // AggregatedCell: ({ cell, table }) => (
      // 	<>
      // 		{console.log({ table, cell })} {cell.getValue()}
      // 	</>
      // ),
      size: 10,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableFooterCellProps: {
        align: "right",
      },
    },
    {
      accessorKey: "moq",
      header: "MOQ *",
      Cell: ({ cell }) => (
        <>
          {!cell.row.getCanExpand() ? (
            <TextInput
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "10px 12px",
                  border: "none",
                  // borderRadius: "8px",
                },

                // "& .MuiOutlinedInput-notchedOutline": {
                //   border: "1px solid #E5E5E5",
                // },
                // input:{
                //   textAlign:"right"
                // }
              }}
              type="number"
              containerStyles={{
                marginTop: "0px",
                // width: "50%",
                minWidth: "70px",
              }}
              // placeholder="Enter MOQ"
              placeholder="0"
              value={Number(cell.row.original.moq).toString() || 0}
              onChange={(e) =>
                handleChangeValues(e, cell.row.original.master_item_id, "moq")
              }
              InputProps={{
                endAdornment: parseInt(cell.row.original.moq) < 1 && (
                  <InputAdornment position="end">
                    {parseInt(cell.row.original.moq) < 1 && (
                      <Tooltip title="moq cannot be less than 1">
                        <ReportIcon size="small" color="error" />
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <>{/* {getFormattedNumber(cell.row.original.moq || 0)} */}</>
            // <RenderTextInputForPOTable
            // 	cell={cell}
            // 	handleChangeValues={(e) =>
            // 		handleChangeValues(
            // 			e,
            // 			cell.row.original.master_item_id,
            // 			"moq",
            // 		)
            // 	}
            // 	message={`MOQ cannot be less than 1`}
            // 	value={cell.row.original.moq}
            // 	placeholder={`Enter MOQ`}
            // 	condition={parseInt(cell.row.original.moq) < 1}
            // />
          )}
        </>
      ),
      Footer: () =>
        tableItems.length > 0 && (
          <Stack
            sx={{
              py: 1,
              ml: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {getTotalOfAllTheTableItemsMoq()}
            </Typography>
          </Stack>
        ),
      size: 20,
    },

    {
      accessorKey: "qty_ordered",
      header: "Order Qty *",
      Cell: ({ cell }) => (
        <>
          {!cell.row.getCanExpand() ? (
            <TextInput
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "10px 12px",
                  border: "none",
                },

                // "& .MuiOutlinedInput-notchedOutline": {
                // border: "1px solid #E5E5E5",
                //   border: "none",
                // },
              }}
              type="number"
              placeholder="Enter Order Qty"
              containerStyles={{
                marginTop: "0px",
                // width: "50%",
                minWidth: "70px",
              }}
              value={
                cell.row.original.qty_ordered &&
                Number(cell.row.original.qty_ordered).toString()
              }
              onChange={(e) =>
                handleChangeValues(
                  e,
                  cell.row.original.master_item_id,
                  "qty_ordered"
                )
              }
              InputProps={{
                endAdornment: parseInt(cell.row.original.qty_ordered) <
                  parseInt(cell.row.original.moq) && (
                  <InputAdornment position="end">
                    {parseInt(cell.row.original.qty_ordered) <
                      parseInt(cell.row.original.moq) && (
                      <Tooltip title="Order qty cannot be less than MOQ">
                        <ReportIcon size="small" color="error" />
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <>
              {/* {getFormattedNumber(
								cell.row.original.qty_ordered || 0,
							)} */}
            </>
            // <RenderTextInputForPOTable
            // 	cell={cell}
            // 	handleChangeValues={(e) =>
            // 		handleChangeValues(
            // 			e,
            // 			cell.row.original.master_item_id,
            // 			"qty_ordered",
            // 		)
            // 	}
            // 	message={`Order qty cannot be less than MOQ`}
            // 	value={cell.row.original.qty_ordered}
            // 	placeholder={`Enter Order Qty`}
            // 	condition={
            // 		parseInt(cell.row.original.qty_ordered) <
            // 		parseInt(cell.row.original.moq)
            // 	}
            // />
          )}
        </>
      ),

      Footer: () =>
        tableItems.length > 0 && (
          <Stack sx={{ py: 1, ml: "8px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {getTotalOfAllTheTableItemsQtyOrdered()}
            </Typography>
          </Stack>
        ),
      size: 10,
    },

    {
      accessorKey: "item_unit_cost_price",
      header: "Unit Price *",
      Cell: ({ cell }) => (
        <>
          {!cell.row.getCanExpand() ? (
            <TextInput
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "10px 12px",
                },

                // "& .MuiOutlinedInput-notchedOutline": {
                //   border: "1px solid #E5E5E5",
                // },
              }}
              containerStyles={{
                marginTop: "0px",
                // width: "50%",
              }}
              type="number"
              // placeholder="Enter unit price"
              placeholder="0.0"
              value={
                Number(cell.row.original.item_unit_cost_price) < 0
                  ? 0
                  : Number(cell.row.original.item_unit_cost_price)
              }
              onChange={(e) =>
                handleChangeValues(
                  e,
                  cell.row.original.master_item_id,
                  "item_unit_cost_price"
                )
              }
              // InputProps={{
              // 	endAdornment: parseInt(
              // 		cell.row.original.qty_ordered,
              // 	) < parseInt(cell.row.original.moq) && (
              // 		<InputAdornment position="end">
              // 			{parseInt(
              // 				cell.row.original.qty_ordered,
              // 			) < parseInt(cell.row.original.moq) && (
              // 				<Tooltip title="Order qty cannot be less than MOQ">
              // 					<ReportIcon
              // 						size="small"
              // 						color="error"
              // 					/>
              // 				</Tooltip>
              // 			)}
              // 		</InputAdornment>
              // 	),
              // }}
            />
          ) : (
            <>
              {/* {getCurrencyValue(
								cell.row.original.item_unit_cost_price || 0,
							)} */}
            </>
            // <RenderTextInputForPOTable
            // 	cell={cell}
            // 	condition={
            // 		cell.row.original.item_unit_cost_price < 0
            // 	}
            // 	message={`Unit price cannot be less than 0`}
            // 	handleChangeValues={(e) =>
            // 		handleChangeValues(
            // 			e,
            // 			cell.row.original.master_item_id,
            // 			"item_unit_cost_price",
            // 		)
            // 	}
            // 	value={cell.row.original.item_unit_cost_price}
            // 	placeholder={`Enter unit price`}
            // />
          )}
        </>
      ),
      Footer: () =>
        tableItems.length > 0 && (
          <Stack
            sx={{
              py: 1,
              ml: "8px",
            }}
          >
            <RenderCurrency
              value={getTotalOfAllTheTableItemsUnitCostPrice()}
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </Stack>
        ),
      size: 10,
    },

    {
      accessorKey: "total_cost",
      header: "Total Price *",
      Cell: ({ cell }) => (
        <>
          {/* {console.log({ cell })} */}
          {!cell.row.getCanExpand() ? (
            <>
              <RenderCurrency
                value={
                  cell.row.original.item_unit_cost_price *
                    cell.row.original.qty_ordered || 0
                }
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              />
            </>
          ) : (
            <>
              <RenderCurrency
                value={
                  cell.row.subRows.reduce(
                    (sum, row) =>
                      sum +
                      (row.original.item_unit_cost_price *
                        row.original.qty_ordered || 0),
                    0
                  ) || 0
                }
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              />

              {/* {getFormattedNumber(
								selectedProducts.reduce(
									(sum, row) =>
										sum +
										(cell.row.original
											.item_unit_cost_price *
											cell.row.original.qty_ordered || 0),
									0,
								) || 0,
							)} */}
            </>
          )}
        </>
      ),
      Footer: ({ table, cell, row }) =>
        tableItems.length > 0 && (
          <Stack sx={{ py: 1 }}>
            {console.log(
              {
                table: table,
                cell,
                row,
                rows: table.getRowModel().rows,
                aggregatedTotal: table
                  .getRowModel()
                  .rows.map((row) => {
                    if (row.getCanExpand()) {
                      return row.subRows.reduce(
                        (sum, row) =>
                          sum +
                          (row.original.item_unit_cost_price *
                            row.original.qty_ordered || 0),
                        0
                      );
                    }
                    return;
                    // (
                    // 	row.original.item_unit_cost_price *
                    // 	row.original.qty_ordered
                    // );
                  })
                  .filter((item) => item)
                  .reduce((sum, row) => sum + row, 0),
                // .reduce((sum, row) => sum + row, 0),,
                total: table
                  .getRowModel()
                  .rows.reduce(
                    (sum, row) =>
                      sum +
                      (row.original.item_unit_cost_price *
                        row.original.qty_ordered || 0),
                    0
                  ),
              },
              "footerData"
            )}
            <RenderCurrency
              value={
                table
                  .getRowModel()
                  .rows.map((row) => {
                    if (row.getCanExpand()) {
                      return row.subRows.reduce(
                        (sum, row) =>
                          sum +
                          (row.original.item_unit_cost_price *
                            row.original.qty_ordered || 0),
                        0
                      );
                    }
                    return;
                    // (
                    // 	row.original.item_unit_cost_price *
                    // 	row.original.qty_ordered
                    // );
                  })
                  .filter((item) => item)
                  .reduce((sum, row) => sum + row, 0) || 0
                // table
                // 	.getRowModel()
                // 	.rows.reduce(
                // 		(sum, row) =>
                // 			sum +
                // 			(row.original.item_unit_cost_price *
                // 				row.original.qty_ordered || 0),
                // 		0,
                // 	) || 0
              }
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </Stack>
        ),
      size: 10,
      muiTableBodyCellProps: {
        align: "right",
      },
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableFooterCellProps: {
        align: "right",
      },
    },
  ];

  return (
    <>
      {loading && <PageLoader />}
      <Box sx={{ paddingX: "16px" }}>
        <Box
          sx={{
            position: "sticky",
            top: "62.5px",
            zIndex: "100",
            backgroundColor: "white",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <SectionTitleText sx={{ mr: "16px" }}>
								{pageTitle ?? `New Purchase Order`}
							</SectionTitleText> */}
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.title,

                  fontWeight: "700",
                  fontSize: "32px",
                }}
              >
                {pageId}
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.black.main,
                  fontWeight: 600,
                }}
              >
                {/* Please select a store where you want to publish the Product */}
                Create your Purchase Order by adding the Vendor, Location,
                Promise Date, and PO Line Items.
              </Typography>
            </Box>
            <Box>
              <OutlinedButton
                // imp_route
                // onClick={() => handleSaveAndContinue()}
                // onClick={() => handleCreatePurchaseOrder()}
                sx={{
                  mr: 2,

                  borderColor: (theme) =>
                    !selectedVendor?.value
                      ? theme.palette.grey[300]
                      : theme.palette.primary.main,
                }}
                onClick={() => handleSaveAsDraftDialogOpen()}
                disabled={!selectedVendor?.value}
              >
                Save as Draft
              </OutlinedButton>

              <PrimaryButton
                disabled={
                  !selectedVendor?.value ||
                  !selectedWarehouse?.value ||
                  !promiseDate ||
                  tableItems.length < 1 ||
                  !tableItems.every(
                    (item) => item.qty_ordered && item.item_unit_cost_price
                    // item.moq
                    // item.total_cost_price,
                  )
                }
                onClick={() => handlePurchaseOrderCreatedDialogOpen()}
              >
                Save and Continue
              </PrimaryButton>
            </Box>
          </Box>
          <Grid
            columnSpacing={4}
            container
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: "16px",
            }}
          >
            <Grid item xs={4}>
              <FormSelectInput
                title={"Vendor"}
                label="Vendor"
                name="vendor"
                placeholder="Select Vendor"
                options={vendorOptions}
                value={
                  purchaseOrdersDataFromState?.vendor_id ? selectedVendor : ""
                }
                onChange={handleVendorSelect}
                // styles={customStyles}
                getOptionLabel={getOptionLabel}
                required
                // formatOptionLabel={(option) => (
                // 	<div>{option.label}</div>
                // )}
                // formatOptionLabel={(option) => (
                //   <div>
                //     {vendorOptions.length === 0 && (
                //       <Button
                //         variant="text"
                //         onClick={() => {
                //           router.push("/app/vendors/create");
                //         }}
                //       >
                //         Create Vendor
                //       </Button>
                //     )}
                //   </div>
                // )}
              />
            </Grid>
            <Grid item xs={4}>
              <FormSelectInput
                placeholder="Select Location"
                title={"Destination Location"}
                options={warehouseOptions}
                value={
                  purchaseOrdersDataFromState.wh_id ? selectedWarehouse : ""
                }
                onChange={handleWarehouseSelect}
                // styles={customStyles}
                getOptionLabel={getOptionLabel}
                required
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                pt: "1rem",
              }}
            >
              <DateInput
                title="Promise Date"
                name="deliveryDate"
                value={promiseDate}
                onChange={handlePromiseDate}
                minDate={currentDate}
                required
                labelStyles={{
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Product List
          </Typography>

          {tableItems.length > 0 && (
            <OutlinedButton
              startIcon={<AddIconPO fill="#4F44E0" />}
              onClick={handleAddProductsClick}
            >
              Add Products
            </OutlinedButton>
          )}
        </Box>

        <BluecomMRTBaseTable
          columnsData={columnData}
          data={
            groupedTableItemsArray
            // tableItems
          }
          muiTableContainerProps={{
            sx: {
              // minHeight: "500px",
            },
          }}
          initialState={{
            expanded: true,
          }}
          // enableBottomToolbar={tableItems.length > 5 ? true : false}
          // muiTableFooterRowProps={{
          //   sx: {
          //     "& .MuiTableCell-root": {
          //       borderBottom: "none",
          //     },
          //   },
          // }}
          // enableBottomToolbar={false}
          enableExpanding
          getRowId={(row) => row.master_item_id ?? row.master_product_id}
          getSubRows={(row) => row.items}
          paginateExpandedRows={false}
          muiTableFooterRowProps={
            tableItems.length > 0
              ? {
                  sx: {
                    backgroundColor: "#F1F1F1",
                    borderBottom: "none",
                    "& .MuiTableCell-root": {
                      borderBottom: "none",
                    },
                  },
                }
              : {
                  sx: {
                    "& .MuiTableCell-root": {
                      borderBottom: "none",
                    },
                  },
                }
          }
          renderEmptyRowsFallback={() => (
            <EmptyStateForAddProductsInPO
              onClick={() => {
                handleDeleteDialogOpen();
              }}
              disabled={!selectedVendor?.value}
              fill={selectedVendor?.value ? "#4F44E0" : "#D0D5DD"}
            />
          )}
        />

        <Grid
          // columnSpacing={2}
          container
          sx={
            {
              // mt: "32px",
            }
          }
        >
          <Grid item xs={6} md={4}>
            <TextInput
              title="Notes"
              placeholder="Will be displayed on purchase order"
              multiline
              minRows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              inputProps={{
                style: {
                  paddingTop: 0,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* <POAddProductsDialog
				openDialog={openDialog}
				handleDialogClose={handleDialogClose}
				addProductcolumnData={addProductcolumnData}
				selectedVendorID={selectedVendor?.value}
			/> */}

      <NewPOAddProductsDialog
        open={openDialog}
        handleClose={handleDialogClose}
        addProductcolumnData={addProductcolumnData}
        selectedVendorID={selectedVendor?.value}
      />
      <DialogAsCaution
        title={<div style={{ marginTop: 2 }}>Delete Product</div>}
        primaryButtonName="Delete Product"
        message={
          <div style={{ marginTop: 2 }}>
            Are you sure you want to delete this Product?
            <br /> This action can't be undone
          </div>
        }
        open={deleteDialogOpenforProduct}
        onCancel={handleDeleteDialogCloseforProduct}
        onDelete={() => handleDeleteProductfromRow(deleteProductofPO)}
      />
      <SuccessDialogForPO
        title="Do you want PO to Save as draft?"
        message="You can come back anytime to finish creating the PO"
        open={saveAsDraftDialogOpen}
        onCancel={handleSaveAsDraftDialogClose}
        onDelete={() => handleClickSaveAsDraftButton()}
        primaryButtonName="Save as Draft"
        secondaryButtonName="Discard"
        primaryButtonProps={{
          sx: {
            ml: "16px",
            flex: 2,
          },
        }}
        icon={<DraftDialogPOIcon />}
      />
      <SuccessDialogForPO
        title="PO Created"
        message="Purchase Order has been created successfully"
        open={purchaseOrderCreatedDialogOpen}
        onCancel={handlePurchaseOrderCreatedDialogClose}
        onDelete={() =>
          router.push(`/onboarding/purchase-orders/${pageId}?step=preview&id=1`)
        }
        primaryButtonName="Email"
        secondaryButtonName="Go to PO"
        primaryButtonProps={{
          sx: {
            ml: "16px",
            flex: 2,
          },
        }}
      />
      <EditPOProductDialog
        open={openEditDialog}
        handleClose={handleEditDialogClose}
        product={editProductData}
      />
    </>
  );
}

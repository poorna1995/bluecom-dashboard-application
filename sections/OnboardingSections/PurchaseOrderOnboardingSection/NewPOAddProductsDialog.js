import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import { BUNDLE, PRODUCT, VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDataStart } from "redux/products/productsSlice";
import MRTBundleViewAddVariantsTable from "sections/ProductsPageSection/components/MRTBundleViewAddVariantsTable";
import appFetch from "utils/appFetch";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import BaseDialog from "components/Common/Dialog";
import { groupBy } from "lodash";
import { setSelectedProductsForPO } from "redux/purchaseOrders/purchaseOrdersSlice";
import EmptyState from "components/Common/EmptyState";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import RenderTableBodyCellText from "components/Common/Tables/RenderComponents/RenderTableBodyCellText";

const mapState = ({ user, purchaseOrdersData }) => ({
  currentUser: user.currentUser,
  selectedProductsFromState:
    purchaseOrdersData.purchaseOrderData.selectedProducts,
});
export default function NewPOAddProductsDialog({
  open,
  handleClose,
  keyForReduxStateData,
  selectedVendorID,
}) {
  const { currentUser, selectedProductsFromState } = useSelector(mapState);
  const dispatch = useDispatch();
  const router = useRouter();

  const { productId } = router.query;
  const selectedProductsID =
    Array.isArray(selectedProductsFromState) &&
    selectedProductsFromState.map((product) => product.master_item_id);
  console.log({ selectedProductsID });

  const [selectedItemsData, setSelectedItemsData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const rowSelectionObjectForVariantTable = selectedProductsID.reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr]: true,
      };
    },
    {}
  );
  const [rowSelection, setRowSelection] = React.useState(
    rowSelectionObjectForVariantTable || {}
  );

  console.log({ rowSelectionObjectForVariantTable });
  // console.log({ selectedProductsID });
  useEffect(() => {
    setRowSelection(rowSelectionObjectForVariantTable || {});
  }, [selectedProductsFromState]);

  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = React.useState([]);
  const handleFetchProducts = () => {
    setLoading(true);
    const URL = VENDOR.FETCH_VENDOR_ITEM;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: selectedVendorID,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setTableData(json.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (open) {
      handleFetchProducts();
    }
  }, [open]);

  const groupedTableData = groupBy(tableData, "master_product_id");
  console.log(groupedTableData);
  /**
	 * {
    "barcode": "",
    "category": "Fashion",
    "channel_id": 3,
    "collection": [],
    "created_at": "2023-05-25T07:55:40.588548",
    "display_image": "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/990535a5-a619-49fb-86d9-09aa83def792.webp",
    "has_default_sku": true,
    "has_default_unit_cost_price": true,
    "has_default_unit_retail_price": true,
    "images": [
        "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/990535a5-a619-49fb-86d9-09aa83def792.webp",
        "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/6afbfe8a-01d0-46c4-a95a-db601dc6c76a.webp"
    ],
    "inventory_item_id": "139042968301948580",
    "is_bundle": false,
    "is_component": false,
    "is_sellable": true,
    "item_desc": "",
    "item_display_image": "https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/990535a5-a619-49fb-86d9-09aa83def792.webp",
    "item_title": "XS / Android13.0 / 4GBRam+64GBStorage / AstroBlack&Gold",
    "item_unit_cost_price": "25",
    "item_unit_retail_price": "49.99",
    "lead_time_in_days": "",
    "live_date": "",
    "master_item_id": "139042941405883471",
    "master_product_id": "1684831323381",
    "max_inventory": "",
    "min_inventory": "",
    "moq": 50,
    "options": [
        {
            "id": 0,
            "name": "Size",
            "sequence": 0,
            "value": "XS"
        },
        {
            "id": 1,
            "name": "OS",
            "sequence": 1,
            "value": "Android13.0"
        },
        {
            "id": 2,
            "name": "Mobile Size",
            "sequence": 2,
            "value": "4GBRam+64GBStorage"
        },
        {
            "id": 3,
            "name": "Color",
            "sequence": 3,
            "value": "AstroBlack&Gold"
        }
    ],
    "product_barcode": "512445751588",
    "product_desc": "<p>Color:\tBlack</p>\n<p>Pattern Type:\tPlain</p>\n<p>Type:\tWide Leg</p>\n<p>Jeans Style:\tCargo Pants</p>\n<p>Closure Type:\tZipper Fly</p>\n<p>Details:\tButton, Pocket, Zipper</p>\n<p>Waist Line:\tNatural</p>\n<p>Length:\tLong</p>\n<p>Fit Type:\tLoose</p>\n<p>Fabric:\tNon-Stretch</p>\n<p>Material:\tDenim</p>\n<p>Composition:\t100% Cotton</p>\n<p>Care Instructions:\tMachine wash, do not dry clean</p>\n<p>Body:\tUnlined</p>\n<p>Sheer:\tNo</p>\n",
    "product_sku": "SW2208184445751588",
    "product_title": "Flap Pocket Cargo Jeans",
    "qty_available": 25,

	 */
  const groupedArrayItems = Object.entries(groupedTableData).map(
    ([key, value]) => {
      return {
        master_product_id: key,
        items: value,
        product_title: value[0].product_title,
        unit_cost_price: Number(value[0].unit_cost_price),
        product_sku: value[0].product_sku,
        product_barcode: value[0].product_barcode,
        moq: value[0].moq,
        display_image: value[0].display_image,
        item_display_image: value[0].item_display_image,
        qty_available: value[0].qty_available,
      };
    }
  );

  console.log({ groupedArrayItems });
  // const tableDataItems = tableData.map((item) => {
  // 	const { items } = item;

  // 	const result = items.map((it) => {
  // 		const { options } = it;
  // 		const item_title =
  // 			(Array.isArray(options) && options.map((op) => op.value)) ?? [];
  // 		if (it.item_title)
  // 			return {
  // 				...it,
  // 				item_title: it.item_title,
  // 				master_product_id: item.master_product_id,
  // 			};
  // 		return {
  // 			...it,
  // 			item_title:
  // 				(Array.isArray(item_title) && item_title?.join(" / ")) ??
  // 				"",
  // 		};
  // 	});
  // const tableList =

  // 	return { ...item, items: result };
  // });

  // console.log({ tableDataItems });

  const variantDataList =
    Array.isArray(groupedArrayItems) &&
    groupedArrayItems.filter((item) => {
      const { items } = item;
      const ItemsHasVariants =
        Array.isArray(items) && items.map((it) => it?.options?.length > 0);
      // console.log({ ItemsHasVariants });
      // if (
      // 	(is_bundle === false && is_component === false) ||
      // 	ItemsHasVariants.includes(true)
      // )
      return item;
    });

  const mapVariantDataList =
    Array.isArray(variantDataList) &&
    variantDataList.map((item) => {
      const { items } = item;
      const itemsForVariants =
        Array.isArray(items) &&
        items.map((it) => {
          const { item_title } = it;
          return {
            ...it,
            product_title: item_title,
          };
        });
      return {
        ...item,
        items: itemsForVariants,
      };
    });

  const getFilteredProducts = () => {
    const getProducts = tableData.filter((item) => {
      const { master_item_id } = item;
      const getRowsIds = Object.keys(rowSelection);
      if (getRowsIds.includes(master_item_id)) return item;
    });
    return getProducts;
  };

  const handleAddProductsToPurchaseOrder = () => {
    const products = getFilteredProducts();
    dispatch(setSelectedProductsForPO(products));
    handleClose();
    // setRow([]);
    enqueueSnackbar("Selected Product Added Successfully", {
      variant: "success",
    });
  };
  console.log({ getFilteredProducts: getFilteredProducts() });
  // const getRowsIds = Object.keys(rowSelection);

  // const getRowItems =
  // 	Array.isArray(mapVariantDataList) &&
  // 	mapVariantDataList
  // 		.map((item) => {
  // 			const { items, master_product_id } = item;
  // 			// combine the values from items and getRowsIds based on the master_item_id of items

  // 			const getCommonItems = items
  // 				.map((it) => {
  // 					if (getRowsIds.includes(it.master_item_id))
  // 						return {
  // 							master_item_id: it.master_item_id,
  // 							master_product_id,
  // 						};
  // 				})
  // 				.filter((it) => it !== undefined);

  // 			// return getCommonItems;
  // 			// console.log({ getCommonItems });
  // 			if (getCommonItems.length > 0) return getCommonItems;
  // 		})
  // 		.filter((it) => it !== undefined)
  // 		.flat()
  // 		.map((item) => {
  // 			return {
  // 				...item,
  // 				// is_item: true,
  // 				// qty: 5,
  // 				// is_bundle: false,
  // 				// is_component: false,
  // 			};
  // 		});
  // console.log({ getRowItems });

  // code for adding filters to the table
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    searchText: "",
    category: "",
    type: "",
    collection: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    categoryList: [],
    typeList: [],
    collectionList: [],
  });

  const handleFilterValuesChange = (value, key) => {
    // const { value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleSearchProduct(
      {
        filterValues: { ...filterValues, [key]: value },
        // [key]: value,
      }
      // filterValues.searchText,
      // filterValues.category,
      // filterValues.type,
      // filterValues.collection,
    );
  };
  const handleFilterOptionsValuesChange = (key, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));

    console.log({ key, value, filterOptions }, "insidehandleChange");
  };
  const handleClearFilters = () => {
    setFilterValues({
      searchText: "",
      category: "",
      type: "",
      collection: "",
    });
    handleFetchProducts();
  };

  const FETCH_CATEGORY_OPTIONS_URL = PRODUCT.FETCH_CATEGORY;
  const FETCH_TYPE_OPTIONS_URL = PRODUCT.FETCH_PRODUCT_TYPE;
  const FETCH_COLLECTION_OPTIONS_URL = PRODUCT.FETCH_COLLECTION_LIST;
  const fetchFiltersData = {
    user_id: currentUser.merchant_id,
  };

  const API_URLS = [
    {
      key: "categoryList",
      url: FETCH_CATEGORY_OPTIONS_URL,
    },
    {
      key: "typeList",
      url: FETCH_TYPE_OPTIONS_URL,
    },
    {
      key: "collectionList",
      url: FETCH_COLLECTION_OPTIONS_URL,
    },
  ];

  const handleFetchFiltersOptions = () => {
    API_URLS.map((item) => {
      return appFetch(item.url, fetchFiltersData)
        .then((json) => {
          console.log({ json });
          if (json.status === "success") {
            handleFilterOptionsValuesChange(item.key, json.result);
            console.log({ key: item.key, value: json.result });
          }
        })
        .catch((err) => console.error(err));
    });
  };
  useEffect(() => {
    if (open) {
      handleFetchFiltersOptions();
    }
  }, [open]);
  const getOptionsWithLabel = (options = []) => {
    return options.map((option) => ({
      label: option,
      value: option,
    }));
  };
  const categoryOptions = getOptionsWithLabel(filterOptions.categoryList);
  const typeOptions = getOptionsWithLabel(filterOptions.typeList);
  const collectionOptions = getOptionsWithLabel(filterOptions.collectionList);

  // search products
  const handleSearchProduct = ({ filterValues }) => {
    const { searchText, category, type, collection } = filterValues;
    const URL = PRODUCT.SEARCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      // vendor_id: selectedVendorID,
      search_value: searchText,
      category: category,
      type: type,
      collection: collection,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        if (json.status === "success") {
          setTableData(json.result);
        }
      })
      .catch((err) => console.error(err));
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      paddingTop: "0px",
      paddingBottom: "0px",
      borderRadius: "5px",
      cursor: "pointer",
      "& :hover": {
        borderColor: "black",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 99999,
      // fontFamily: "Mulish, sans-serif",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
  };

  console.log({
    rowSelection,
    selectedItemsData,
    // getRowsIds,
    // getRowItems,
    selectedProductsID,
  });

  const columnsData = [
    {
      accessorKey: "product_title" ?? "item_title",
      header: "Product Title",

      Cell: ({ cell, row, getValue }) => (
        <div
          style={{
            paddingLeft: `${row.depth * 3}rem`,
            display: "flex",
          }}
        >
          {cell.row.getCanExpand() ? (
            <RenderProductDetails
              title={row.original.product_title ?? row.original.item_title}
              display_image={row.original.display_image}
              href={`/app/products/${row.original.master_product_id}`}
              sku={row.original.product_sku}
              openInNewTab={true}
            />
          ) : (
            <RenderProductDetails
              title={
                row.original.product_title ||
                row.original.item_title ||
                row.original.options.map((item) => item.value).join(" / ")
              }
              display_image={row.original.display_image}
              href={`/app/products/${row.original.master_product_id}`}
              sku={row.original.sku}
              openInNewTab={true}
            />
          )}
        </div>
      ),
      footer: (props) => props.column.id,
      muiTableHeadCellProps: {
        align: "left",
        maxWidth: "200px",
      },
      muiTableBodyCellProps: {
        align: "left",
        // maxWidth: "200px",
      },
      size: 460,
    },
    {
      accessorKey: "moq",
      header: "MOQ",
      footer: (props) => props.column.id,
      Cell: ({ row, cell }) => (
        <RenderTableBodyCellText>{cell.getValue()}</RenderTableBodyCellText>
      ),
      AggregatedCell: ({ cell }) => (
        <RenderTableBodyCellText>
          {/* get the total/ sum of all children moq  */}

          {cell.row.original.items.reduce((acc, curr) => acc + curr.moq, 0)}

          {/* {cell.row.original.moq.reduce((acc, curr) => acc + curr, 0)} */}
        </RenderTableBodyCellText>
      ),
      muiTableHeadCellProps: {
        align: "right",
        maxWidth: "200px",
        pr: 1,
        marginRight: "10px",
      },
      muiTableBodyCellProps: {
        align: "right",
        pr: 1,
        mr: 2,
        // maxWidth: "200px",
      },
      size: 80,
    },

    {
      accessorKey: "qty_available",
      header: "In Stock",
      footer: (props) => props.column.id,
      Cell: ({ row, cell }) => (
        <RenderTableBodyCellText>{cell.getValue()}</RenderTableBodyCellText>
      ),
      AggregatedCell: ({ cell }) => (
        <RenderTableBodyCellText>
          {/* get the total/ sum of all children qty_available  */}

          {cell.row.original.items.reduce(
            (acc, curr) => acc + curr.qty_available,
            0
          )}
        </RenderTableBodyCellText>
      ),

      muiTableHeadCellProps: {
        align: "right",
        maxWidth: "200px",
        pr: 1,
        marginRight: "10px",
      },
      muiTableBodyCellProps: {
        align: "right",
        pr: 1,
        mr: 2,
        // maxWidth: "200px",
      },
      size: 80,
    },
    {
      accessorKey: "item_unit_cost_price",
      header: "Cost",
      footer: (props) => props.column.id,
      Cell: ({ row, cell }) => (
        <span>
          {cell.row.getCanExpand() ? (
            <RenderCurrency
              sx={{
                fontSize: "16px",
                fontWeight: 600,
              }}
              value={cell.row.original.unit_cost_price}
            />
          ) : (
            <RenderCurrency
              sx={{
                fontSize: "16px",
                fontWeight: 600,
              }}
              value={cell.row.original.item_unit_cost_price}
            />
          )}
        </span>
      ),
      muiTableHeadCellProps: {
        align: "right",
        maxWidth: "200px",
        pr: 1,
        marginRight: "10px",
      },
      muiTableBodyCellProps: {
        align: "right",
        pr: 1,
        mr: 2,
        // maxWidth: "200px",
      },
      size: 80,
    },
  ];
  return (
    <>
      {loading && <PageLoader />}
      <BaseDialog
        open={open}
        handleClose={handleClose}
        // handleClose={handleClose}
        title={<b style={{ fontSize: "24px" }}>Add Products</b>}
        // scroll="paper"
        // PaperProps={{
        // 	sx: {
        // 		borderRadius: "10px",
        // 		maxWidth: "1440px",
        // 		overflowY: "unset",
        // 	},
        // }}
        dialogActions={
          <Box sx={{ mr: 2, mb: 2 }}>
            <SecondaryButton onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={() => handleAddProductsToPurchaseOrder()}
              // disabled={
              // 	// Array.isArray(selectedItemsData) &&
              // 	// selectedItemsData.length > 0
              // 	// 	? false
              // 	// 	: true
              // }
            >
              Add{" "}
              {/* {(Array.isArray(selectedItemsData) &&
                              selectedItemsData.length > 0 &&
                              selectedItemsData.length) ??
                              ""}{" "} */}
              Products
            </PrimaryButton>
          </Box>
        }
      >
        {/* <DialogTitle>
					<SectionTitleText>Add bundle components</SectionTitleText>
				</DialogTitle> */}
        {/* <DialogContent
					sx={{
						minHeight: "500px",
					}}
				> */}
        {/* <Box
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
                                  width: "90%",
                                  // height: "5px",
                              }}
                              id="outlined-size-small"
                              size="small"
                              placeholder="Search Products"
                              value={filterValues.searchText}
                              onChange={(e) =>
                                  handleFilterValuesChange(
                                      e.target.value,
                                      "searchText",
                                  )
                              }
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
                              options={categoryOptions}
                              value={{
                                  label: filterValues.category,
                                  value: filterValues.category,
                              }}
                              onChange={(e) =>
                                  handleFilterValuesChange(e.value, "category")
                              }
                              // value={productCateogry}
                              // onChange={handleChangeCategory}
                              // id="master_product_id"
                              // options={handleSelectCategoryOptionWithLabel}
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
                              options={typeOptions}
                              value={{
                                  label: filterValues.type,
                                  value: filterValues.type,
                              }}
                              onChange={(e) =>
                                  handleFilterValuesChange(e.value, "type")
                              }
                              // onChange={handleChangeType}
                              // value={productType}
                              // id="master_product_id"
                              // onChange={handleChangeProductType}
                              // options={handleSelectProductTypeWithLabel}
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
                              options={collectionOptions}
                              value={{
                                  label: filterValues.collection,
                                  value: filterValues.collection,
                              }}
                              onChange={(e) =>
                                  handleFilterValuesChange(e.value, "collection")
                              }
                              // value={collectionType}
                              // onChange={handleChangeCollection}
                              // options={handleSelectCollectionWithLabel}
                          />
                          <Button onClick={() => handleClearFilters()}>
                              Clear Filters
                          </Button>
                      </Box> */}

        <MRTBundleViewAddVariantsTable
          tableData={mapVariantDataList}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          selectedItemsData={selectedItemsData}
          setSelectedItemsData={setSelectedItemsData}
          columnsData={columnsData}
          usedIn={"purchase-order"}
          enableRowSelection
          renderEmptyRowsFallback={() => (
            <EmptyState
              icon={<ProductEmptyState />}
              text={"No Products Found!"}
              // bodyText={
              //   "Please add products to the table using `Add Bundle Components` Button"
              // }
            ></EmptyState>
          )}

          // data={tableData}
          // columnDefData={columnData}
          // rowIdkey={"master_product_id"}
          // onSelectionModelChange={(newSelectionModel) => {
          // 	setSelectedProducts(newSelectionModel);
          // 	// setSelectedProducts(newSelectionModel);
          // }}
          // selectionModel={selectedProducts}
          // disableSelectionOnClick={false}
        />
        {/* </DialogContent> */}
        {/* <DialogActions>
					<SecondaryButton onClick={handleClose}>
						Cancel
					</SecondaryButton>
					<PrimaryButton
						onClick={() => handleAddProductsToBundle()}
						// disabled={
						// 	// Array.isArray(selectedItemsData) &&
						// 	// selectedItemsData.length > 0
						// 	// 	? false
						// 	// 	: true
						// }
					>
						Add{" "}
						{/* {(Array.isArray(selectedItemsData) &&
                              selectedItemsData.length > 0 &&
                              selectedItemsData.length) ??
                              ""}{" "} 
						Products
					</PrimaryButton>
				</DialogActions> */}
      </BaseDialog>
    </>
  );
}

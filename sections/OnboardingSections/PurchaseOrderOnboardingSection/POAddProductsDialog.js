import { Box, Button, Divider, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { PRODUCT, VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProductsForPO,
  updatePurchaseOrderData,
} from "redux/purchaseOrders/purchaseOrdersSlice";
import MRTBundleViewAddVariantsTable from "sections/ProductsPageSection/components/MRTBundleViewAddVariantsTable";
import appFetch from "utils/appFetch";

const mapState = ({ user, purchaseOrdersData }) => ({
  currentUser: user.currentUser,
  selectedProductsFromState:
    purchaseOrdersData.purchaseOrderData.selectedProducts,
});
export default function POAddProductsDialog({
  openDialog,
  handleDialogClose,
  addProductcolumnData,
  selectedVendorID,
}) {
  const { currentUser, selectedProductsFromState } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();
  const selectedProductsID =
    Array.isArray(selectedProductsFromState) &&
    selectedProductsFromState.map((product) => product.master_item_id);
  console.log({ selectedProductsID });
  const [selectedProducts, setSelectedProducts] = React.useState(
    selectedProductsID ?? []
  );

  const [productsList, setProductsList] = React.useState([]);
  const [masterProducts, setMasterProducts] = React.useState([]);

  useEffect(() => {
    setSelectedProducts(selectedProductsID);
  }, [selectedProductsFromState, openDialog, productsList]);

  const dispatch = useDispatch();
  console.log({ selectedProductsFromState, selectedProducts });

  // const { data: productsList, isLoading } = useQuery({
  // 	queryKeys: ["productsList"],
  // 	queryFn: () =>
  // 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER, {
  // 			user_id: currentUser.merchant_id,
  // 		}).then((json) => json.result),
  // });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchProducts = () => {
    setIsLoading(true);

    const url = VENDOR.FETCH_VENDOR_ITEM;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: selectedVendorID,
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setProductsList(json.result);
        }
        const idMap = new Map();
        let temp = json.result;
        // iterate through each object and check if the id is a duplicate
        let uniqueProduct = [];
        // console.log("filtering unique products id")
        temp.map((obj) => {
          // console.log("xyz", obj.master_product_id);
          if (!idMap.has(obj?.master_product_id)) {
            // console.log("xyz1", obj.master_product_id);
            idMap.set(obj.master_product_id, true);
            uniqueProduct.push(obj);
          }
        });
        // console.log("filtered")
        setMasterProducts(uniqueProduct);
        // setProductsList(uniqueProduct);
        // console.log("unique products",uniqueProduct)
        // console.log("master",masterProducts)
        // console.log("masterProductId",masterProducts.length);
        // console.log("length of product list",productsList.length)
        // console.log({ products: json });
        // testFunction(uniqueProduct);
      })
      .catch((err) => console.error(err));
  };

  // const testFunction = (uniqueProduct) => {
  // console.log("unique products", uniqueProduct);
  // setMasterProducts(uniqueProduct);
  // console.log("master", masterProducts);
  // console.log("masterProductId", masterProducts.length);
  // console.log("length of product list", productsList.length);
  // };
  useEffect(() => {
    if (openDialog === true) {
      handleFetchProducts();
    }
  }, [openDialog]);

  // const productsListWithID =
  // 	Array.isArray(productsList) &&
  // 	productsList.map((product, index) => ({
  // 		...product,
  // 		// id: index,
  // 		id: product.master_item_id,
  // 	}));

  const productsListWithID =
    Array.isArray(masterProducts) &&
    masterProducts.map((product, index) => ({
      ...product,
      // id: index,
      id: product.master_item_id,
    }));

  const filterProductsList =
    Array.isArray(productsList) &&
    productsList.filter(
      (product) =>
        product.master_product_id === "" ||
        product.master_product_id === null ||
        product.master_product_id === undefined
    );
  console.log({
    productsList,
    filterProductsList,
    productsListWithID,
    selectedProducts,
  });

  //  get the filtered products from products list based on the selected proudcts id

  const getFilteredProducts = () => {
    // return filtered products which are already in the selectedFrom state and not in the selectedProducts

    const filteredProducts = productsListWithID.filter((product) => {
      return selectedProducts.includes(product.master_item_id);
    });

    console.log({ filteredProducts });

    // filter the profucts with the selectedProductsID
    const filteredProductsFromState = filteredProducts.filter((product) => {
      return !selectedProductsID.includes(product.master_item_id);
    });

    console.log({ filteredProductsFromState });
    return filteredProductsFromState;

    // const filteredProducts = productsListWithID.filter((product) => {
    // 	return selectedProducts.includes(product.master_item_id);
    // });

    // console.log({ filteredProducts });
    // return filteredProducts;
  };

  const selectedProductsWithDetails = getFilteredProducts();
  console.log({ selectedProductsWithDetails });
  const handleAddSelectedProducts = () => {
    dispatch(
      setSelectedProductsForPO(selectedProductsWithDetails)

      // updatePurchaseOrderData({
      // 	selectedProducts: selectedProductsWithDetails,
      // }),
    );
    setSelectedProducts([]);
    enqueueSnackbar("Selected Product Added Successfully", {
      variant: "success",
    });

    setFilterValues({
      searchText: "",
      category: "",
      type: "",
      collection: "",
    });
    handleDialogClose();
  };

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
    if (openDialog) {
      handleFetchFiltersOptions();
    }
  }, [openDialog]);
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
    const URL = VENDOR.SEARCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: selectedVendorID,
      search_value: searchText,
      category: category,
      type: type,
      collection: collection,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        if (json.status === "success") {
          setProductsList((prev) => [...json.result]);
        }
      })
      .catch((err) => console.error(err));
  };

  //serach product using category

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

  return (
    // <BaseDialog
    //   open={openDialog}
    //   handleClose={handleDialogClose}
    //   title="Add Products"
    // >
    //   <Box
    //     sx={{
    //       marginY: "8px",
    //       marginX: "8px",
    //       width: "800px",
    //       height: "600px",
    //       display: "flex",
    //       flexDirection: "column",

    //       borderRadius: "12px",
    //       // "& svg": {
    //       // 	mb: "16px",
    //       // },
    //     }}
    //   >
    //     <Divider />
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         // marginBottom: "46px",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "row",
    //           marginTop: "5px",
    //           // marginBottom: "36px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <TextField
    //           sx={{
    //             // marginTop: "16px",
    //             width: "90%",
    //             // height: "5px",
    //           }}
    //           id="outlined-size-small"
    //           size="small"
    //           placeholder="Search Products"
    //           value={filterValues.searchText}
    //           onChange={(e) =>
    //             handleFilterValuesChange(e.target.value, "searchText")
    //           }
    //         />
    //         <FormSelectInput
    //           placeholder="Select Category"
    //           containerStyles={{
    //             margin: "5px",
    //             padding: "0px",
    //             width: "90%",
    //             // height: "5px",
    //           }}
    //           styles={customStyles}
    //           options={categoryOptions}
    //           value={filterValues.category}
    //           onChange={(e) => handleFilterValuesChange(e.value, "category")}
    //           // value={productCateogry}
    //           // onChange={handleChangeCategory}
    //           // id="master_product_id"
    //           // options={handleSelectCategoryOptionWithLabel}
    //         />
    //         <FormSelectInput
    //           placeholder="Product Type"
    //           containerStyles={{
    //             margin: "5px",
    //             padding: "0px",
    //             width: "90%",
    //             // height: "5px",
    //           }}
    //           styles={customStyles}
    //           options={typeOptions}
    //           value={filterValues.type}
    //           onChange={(e) => handleFilterValuesChange(e.value, "type")}
    //           // onChange={handleChangeType}
    //           // value={productType}
    //           // id="master_product_id"
    //           // onChange={handleChangeProductType}
    //           // options={handleSelectProductTypeWithLabel}
    //         />
    //         <FormSelectInput
    //           placeholder="Collection"
    //           containerStyles={{
    //             margin: "5px",
    //             padding: "0px",
    //             width: "70%",
    //             // height: "5px",
    //           }}
    //           styles={customStyles}
    //           options={collectionOptions}
    //           value={filterValues.collection}
    //           onChange={(e) => handleFilterValuesChange(e.value, "collection")}
    //           // value={collectionType}
    //           // onChange={handleChangeCollection}
    //           // options={handleSelectCollectionWithLabel}
    //         />
    //         <Button onClick={() => handleClearFilters()}>Clear Filters</Button>
    //       </Box>
    //     </Box>
    //     <Divider
    //       sx={{
    //         marginTop: "5px",
    //       }}
    //     />

    //     {/* <MuiBaseDataGrid
    //       columnDefData={addProductcolumnData}
    //       data={productsListWithID}
    //       // hideFooter={true}
    //       rowIdkey={"id"}
    //       // getRowId={(row) => row.id}
    //       containerStyles={{
    //         height: "580px",
    //         // marginTop: "20px",
    //       }}
    //       loading={isLoading}
    //       selectionModel={selectedProducts}
    //       onSelectionModelChange={(newSelectionModel) => {
    //         setSelectedProducts(newSelectionModel);
    //       }}
    //       disableSelectionOnClick={false}
    //     /> */}
    //     <MRTBundleViewAddVariantsTable
    //       tableData={productsListWithID}
    //       rowSelection={rowSelection}
    //       setRowSelection={setRowSelection}
    //       selectedItemsData={selectedItemsData}
    //       setSelectedItemsData={setSelectedItemsData}
    //       />

    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "right",
    //         justifyContent: "right",
    //       }}
    //     >
    //       <PrimaryButton
    //         onClick={() => handleAddSelectedProducts()}
    //         sx={{
    //           mt: "12px",
    //           height: "44px",

    //           // backgroundColor: "#D92D20",
    //           // "&:hover": {
    //           // 	background: "#d91304",
    //           // },
    //         }}
    //       >
    //         Add Selected Product
    //       </PrimaryButton>
    //     </Box>
    //   </Box>
    //   {/* </Box> */}
    // </BaseDialog>
    <>
      <BaseDialog
        open={openDialog}
        handleClose={handleDialogClose}
        title="Add Products"
      >
        <Box
          sx={{
            maxWidth: "1000px",
            minWidth: "960px",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: "0px",
              zIndex: 1000,
              background: "white",
            }}
          >
            <PrimaryButton
              onClick={() => handleAddSelectedProducts()}
              sx={{
                mt: "12px",
                mb: "12px",
                height: "44px",

                // backgroundColor: "#D92D20",
                // "&:hover": {
                // 	background: "#d91304",
                // },
              }}
            >
              Add Selected Product
            </PrimaryButton>

            {/* <MRTBundleViewAddVariantsTable
							tableData={productsListWithID}
							rowSelection={rowSelection}
							setRowSelection={setRowSelection}
							selectedItemsData={selectedItemsData}
							setSelectedItemsData={setSelectedItemsData}
							// data={tableData}
							// columnDefData={columnData}
							// rowIdkey={"master_product_id"}
							// onSelectionModelChange={(newSelectionModel) => {
							// 	setSelectedProducts(newSelectionModel);
							// 	// setSelectedProducts(newSelectionModel);
							// }}
							// selectionModel={selectedProducts}
							// disableSelectionOnClick={false}
						/> */}
            {/* <MuiBaseDataGrid
              columnDefData={addProductcolumnData}
              data={productsListWithID}
              // hideFooter={true}
              rowIdkey={"id"}
              // getRowId={(row) => row.id}
              containerStyles={{
                height: "580px",
                // marginTop: "20px",
              }}
              loading={isLoading}
              selectionModel={selectedProducts}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              disableSelectionOnClick={false}
              hideFooter={productsListWithID.length < 6}
            /> */}
            <MRTBundleViewAddVariantsTable
              tableData={mapVariantDataList}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              selectedItemsData={selectedItemsData}
              setSelectedItemsData={setSelectedItemsData}

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
          </Box>
        </Box>
      </BaseDialog>
    </>
  );
}

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import BaseDialog from "components/Common/Dialog";
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
import dynamic from "next/dynamic";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import EmptyState from "components/Common/EmptyState";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  createBundleData: productsData.createBundleData,
});
export default function AddProductsToBundleDialog({
  open,
  handleClose,
  keyForReduxStateData,
  isEditPage = false,
}) {
  const { currentUser, createBundleData } = useSelector(mapState);
  const selectedProductsFromState =
    createBundleData.products || createBundleData.children;
  const dispatch = useDispatch();
  const router = useRouter();
  const { productId, popupTab, currentPage } = router.query;
  const basePath = router.asPath;
  const ONBOARDING_ROUTE = `/app/products/create/bundle/${productId}?step=components&id=2`;
  const EDIT_PAGE_ROUTE = `/app/products/edit/${productId}?productType=bundle&tab=components`;
  const BASE_PATH = isEditPage ? EDIT_PAGE_ROUTE : ONBOARDING_ROUTE;
  const [selectedItemsData, setSelectedItemsData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedProductsFromBundle, setSelectedProductsFromBundle] = useState(
    []
  );

  const selectedProductsID =
    Array.isArray(selectedProductsFromState) &&
    selectedProductsFromState.map((product) => product.master_item_id);
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
  const selectedProductsProductID =
    Array.isArray(selectedProductsFromState) &&
    selectedProductsFromState.map((product) => product.master_product_id);
  const [selectedProducts, setSelectedProducts] = React.useState(
    selectedProductsProductID || []
  );
  useEffect(() => {
    setSelectedProducts(selectedProductsProductID || []);
    setRowSelection(rowSelectionObjectForVariantTable || {});
  }, [selectedProductsFromState]);

  const [bundleData, setBundleData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  console.log({ selectedProducts });
  const [tableData, setTableData] = React.useState([]);

  const [productsTableData, setProductsTableData] = useState([]);
  const [variantsTableData, setVariantsTableData] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const [totalVariantsCount, setTotalVariantsCount] = useState(0);
  const handleFetchProductsCount = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
    const data = {
      user_id: currentUser.merchant_id,
      is_component: true,
    };

    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setLoading(false);
          setTotalProductsCount(json.result);

          console.log({ json });
          // handleFetchProducts();
        }
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {});
  };

  const handleFetchProducts = () => {
    setLoading(true);
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      is_component: true,
      page: Number(currentPage),
      per_age: 10,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setProductsTableData(json.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleFetchVariantsCount = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
    const data = {
      user_id: currentUser.merchant_id,
      is_component: false,
    };

    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setLoading(false);
          setTotalVariantsCount(json.result);

          console.log({ json });
          // handleFetchProducts();
          // handleFetchVariants(data);
        }
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {});
  };

  const handleFetchVariants = () => {
    setLoading(true);
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      is_component: false,
      page: Number(currentPage),
      per_age: 10,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setVariantsTableData(json.result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (open) {
      // handleFetchProducts();
      if (popupTab === "products") {
        handleFetchProductsCount();
        router.replace(`${BASE_PATH}&popupTab=products&currentPage=1`);
      }
      if (popupTab === "variants") {
        handleFetchVariantsCount();
        router.replace(`${BASE_PATH}&popupTab=variants&currentPage=1`);
      }
    }
    if (!open) {
      router.replace(`${BASE_PATH}`);
    }
  }, [open, popupTab]);
  useEffect(() => {
    if (open) {
      if (currentPage) {
        if (popupTab === "products") {
          handleFetchProducts();
        }
        if (popupTab === "variants") {
          handleFetchVariants();
        }
      }
    }
  }, [currentPage, popupTab]);

  const tableDataItems = tableData.map((item) => {
    const { items } = item;

    const result = items.map((it) => {
      const { options } = it;
      const item_title =
        (Array.isArray(options) && options.map((op) => op.value)) ?? [];
      if (it.item_title)
        return {
          ...it,
          item_title: it.item_title,
          master_product_id: item.master_product_id,
        };
      return {
        ...it,
        item_title:
          (Array.isArray(item_title) && item_title?.join(" / ")) ?? "",
      };
    });
    // const tableList =

    return { ...item, items: result };
  });

  // console.log({ tableDataItems });

  const columnData = [
    {
      field: "product",
      accessorKey: "product",
      header: "Product",
      headerName: "Product",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <RenderProductDetails
            display_image={params.row.display_image}
            title={params.row.product_title}
            sku={params.row.product_sku}
            href={`/app/products/${params.row.master_product_id}`}
            openInNewTab={true}
          />
          {/* <AppImage
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
					</Typography> */}
        </Box>
      ),

      // width: 300,
      flex: 1,
    },
    // {
    // 	field: "sku",
    // 	headerName: "SKU",
    // 	renderCell: (params) => <Typography>{params.value}</Typography>,

    // 	width: 150,
    // },
    {
      field: "in stock",
      accessorKey: "in stock",
      header: "In Stock",
      headerName: "In Stock",
      // renderCell: (params) => <Typography>422</Typography>,
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    // {
    // 	field: "moq",
    // 	headerName: "MOQ",
    // 	// renderCell: (params) => <Typography>100</Typography>,
    // 	width: 90,
    // 	headerAlign: "center",
    // 	align: "center",
    // },
    {
      field: "item_unit_cost_price",
      accessorKey: "item_unit_cost_price",
      header: "Cost",
      headerName: "Cost",
      renderCell: (params) => (
        <RenderCurrency
          value={params.value}
          sx={{
            fontWeight: "500",
          }}
        />
      ),
      width: 120,
      headerAlign: "right",
      align: "right",
    },
  ];

  const handleAddSelectedProducts = () => {
    setSelectedProducts([]);
    handleDialogClose();
  };

  const productsList =
    Array.isArray(selectedProducts) &&
    selectedProducts.map((product) => {
      return {
        master_item_id: product.master_item_id,
        master_product_id: product,
        is_component: false,
        qty: 0,
        is_bundle: false,
      };
    });

  //   filter bundleData from the selected bundle items array  based on the selectedItem

  const filterBundleData = bundleData.filter((bundle) => {
    const selectedItem = selectedProductsFromBundle.find(
      (item) => item === bundle.master_product_id
    );
    return selectedItem;
  });
  // console.log({ filterBundleData });
  const bundlesList =
    Array.isArray(filterBundleData) &&
    filterBundleData.map((product) => {
      return {
        master_item_id: product.master_item_id,
        master_product_id: product.master_product_id,
        is_component: false,
        qty: 0,
        is_bundle: true,
      };
    });
  // console.log({ productsList, bundlesList });
  const URL_FOR_FETCH_BUNDLE = BUNDLE.FETCH_BUNDLE;

  const handleAddProductsToBundle = () => {
    setLoading(true);
    const URL = BUNDLE.ADD_PRODUCTS;
    const data = {
      user_id: currentUser.merchant_id,
      parent_product_id: productId,
      products: [...productsList, ...bundlesList, ...getRowItems],
      // [
      // 	{
      // 		master_item_id: "123446",
      // 		master_product_id: "123446",
      // 		is_item: false,
      // 		qty: 5,
      // 		is_bundle: true,
      // 	},
      // 	{
      // 		master_product_id: "139006976366282557",
      // 		master_item_id: "139006976366282557",
      // 		is_item: true,
      // 		qty: 5,
      // 		is_bundle: false,
      // 	},
      // ],
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        if (json.status === "success") {
          setLoading(false);
          setSelectedItemsData([]);
          setRowSelection({});

          setSelectedProducts([]);
          enqueueSnackbar("Selected Product Added Successfully");
          dispatch(
            fetchProductDataStart({
              url: URL_FOR_FETCH_BUNDLE,
              data: {
                user_id: currentUser.merchant_id,
                master_product_id: productId,
              },
              keyForReduxStateData,
            })
          );
          handleClose();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };

  // const handleFetchBundlesData = () => {
  //   const url = BUNDLE.FETCH_BUNDLE;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //   };
  //   appFetch(url, data)
  //     .then((json) => {
  //       if (json.status === "success") {
  //         setBundleData(json.result);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };
  // useEffect(() => {
  //   handleFetchBundlesData();
  // }, []);

  // console.log({ rowSelection, selectedItemsData });

  // console.log({ bundleData });
  const filteredData = bundleData.filter(
    (item) => item.master_product_id === productId
  );
  // console.log({ filteredData });
  // ;

  const bundleDataList =
    Array.isArray(tableData) &&
    tableData.filter((item) => {
      const { is_bundle } = item;
      if (is_bundle === true) return item;
    });
  const filterBundlesToAdd =
    Array.isArray(bundleDataList) &&
    bundleDataList.filter((item) => {
      if (item.master_product_id !== productId) return item;
    });

  const productsListToShow =
    Array.isArray(tableData) &&
    tableData.filter((item) => {
      const { is_component, items } = item;
      const ItemsHasNoVariants =
        Array.isArray(items) && items.map((it) => it?.options?.length === 0);
      // console.log({ ItemsHasNoVariants });
      if (is_component === true || ItemsHasNoVariants.includes(true))
        return item;
    });
  console.log({ productsListToShow });

  const variantDataList =
    Array.isArray(tableData) &&
    tableData.filter((item) => {
      const { is_component, items, is_bundle } = item;
      const ItemsHasVariants =
        Array.isArray(items) && items.map((it) => it?.options?.length > 0);
      // console.log({ ItemsHasVariants });
      if (
        (is_bundle === false && is_component === false) ||
        ItemsHasVariants.includes(true)
      )
        return item;
    });

  const mapVariantDataList =
    Array.isArray(variantsTableData) &&
    variantsTableData.map((item) => {
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

  console.log({ bundleDataList, productsListToShow, variantDataList });

  const getRowsIds = Object.keys(rowSelection);
  console.log({ bundleDataList, productsListToShow, variantDataList });

  const getRowItems =
    Array.isArray(mapVariantDataList) &&
    mapVariantDataList
      .map((item) => {
        const { items, master_product_id } = item;
        // combine the values from items and getRowsIds based on the master_item_id of items

        const getCommonItems = items
          .map((it) => {
            if (getRowsIds.includes(it.master_item_id))
              return {
                master_item_id: it.master_item_id,
                master_product_id,
              };
          })
          .filter((it) => it !== undefined);

        // return getCommonItems;
        // console.log({ getCommonItems });
        if (getCommonItems.length > 0) return getCommonItems;
      })
      .filter((it) => it !== undefined)
      .flat()
      .map((item) => {
        return {
          ...item,
          is_item: true,
          qty: 5,
          is_bundle: false,
          is_component: false,
        };
      });

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

  const tabsData = [
    // {
    //   label: "Bundles",
    //   component: (
    //     <MuiBaseDataGrid
    //       data={filterBundlesToAdd}
    //       columnDefData={columnData}
    //       rowIdkey={"master_product_id"}
    //       onSelectionModelChange={(newSelectionModel) => {
    //         setSelectedProductsFromBundle(newSelectionModel);
    //         // setSelectedProducts(newSelectionModel);
    //       }}
    //       selectionModel={selectedProductsFromBundle}
    //       disableSelectionOnClick={false}
    //     />
    //   ),
    //   value: 0,
    // },
    {
      label: "Products W/O Variants",
      component: (
        <>
          {/* loading && ( */}

          {productsTableData.length === 0 && (
            <BluecomMRTBaseTable
              columnsData={columnData}
              data={productsTableData}
              state={{
                showSkeletons: loading,
              }}
              renderEmptyRowsFallback={() => (
                <EmptyState
                  icon={<ProductEmptyState />}
                  text={"No Variants Found!"}
                  bodyText={
                    "Please add products to the table using `Add Bundle Components` Button"
                  }
                ></EmptyState>
              )}
              muiTableBodyCellProps={{
                sx: {
                  height: "60px",
                },
              }}
              muiTableContainerProps={{
                sx: {
                  height: "600px",
                },
              }}
              showSkeletons={loading}
            />
          )}

          {!loading && (
            <MuiBaseDataGrid
              data={productsTableData}
              columnDefData={columnData}
              rowIdkey={"master_product_id"}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
                // setSelectedProducts(newSelectionModel);
              }}
              selectionModel={selectedProducts}
              disableSelectionOnClick={false}
              containerStyles={{
                height: "600px",
                minHeight: "600px",
                maxHeight: "600px",
              }}
              totalRows={totalProductsCount}
              basePath={`${BASE_PATH}&popupTab=products&`}
              shallUseRouter={true}
              renderEmptyRowsFallback={() => (
                <EmptyState
                  icon={<ProductEmptyState />}
                  text={"No Variants Found!"}
                  bodyText={
                    "Please add products to the table using `Add Bundle Components` Button"
                  }
                ></EmptyState>
              )}
            />
          )}
        </>
      ),
      value: 0,
      route: "products",
    },
    {
      label: "Products with Variants",
      component: (
        <MRTBundleViewAddVariantsTable
          tableData={mapVariantDataList}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          selectedItemsData={selectedItemsData}
          setSelectedItemsData={setSelectedItemsData}
          basePath={`${BASE_PATH}&popupTab=variants&`}
          shallUseRouter={true}
          totalRows={totalVariantsCount}
          showSkeletons={loading}
          muiTableBodyCellProps={{
            sx: {
              height: "60px",
            },
          }}

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
      ),
      value: 1,
      route: "variants",
    },
  ];

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
    getRowsIds,
    getRowItems,
    selectedProductsID,
  });

  return (
    <>
      {/* {loading && <PageLoader />} */}
      <Dialog
        open={open}
        onClose={handleClose}
        // handleClose={handleClose}
        title={`Add bundle components`}
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: "10px",
            maxWidth: "1440px",
            overflowY: "unset",
          },
        }}
        sx={{
          minHeight: "600px",
          // maxHeight: "800px",
          minWidth: "1000px",
        }}
      >
        <DialogTitle>
          <SectionTitleText>Add bundle components</SectionTitleText>
        </DialogTitle>
        <DialogContent
          sx={
            {
              // minHeight: "600px",
              // maxHeight: "600px",
            }
          }
        >
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

          <RouterTabs
            basePath={`${BASE_PATH}`}
            isTabAfterQuery={true}
            tabContainerStyles={{
              // maxWidth: "1000px",
              minWidth: "1000px",
              position: "sticky",
              top: "0px",
              zIndex: 1000,
              background: "white",
            }}
            data={tabsData}
            tabKey={isEditPage && "popupTab"}
          />
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
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
							""}{" "} */}
            Products
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

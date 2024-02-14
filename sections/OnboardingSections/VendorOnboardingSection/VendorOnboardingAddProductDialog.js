import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT, VENDOR } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import tagIcon from "public/assets/icons/tag-icon.png";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function VendorOnboardingAddProductDialog({
  open,
  handleClose,
  handleFetchVendorProducts,
  selectedProductsId,
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId ?? router.query.vendorId;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productCateogry, setProductCategory] = useState();
  const [productTypeList, setProductTypeList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    selectedProductsId || []
  );
  const [productsList, setProductsList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [productType, setProductType] = useState();
  const [collectionType, setCollectionType] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setSelectedProducts(selectedProductsId || []);
  }, [open]);

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
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (open === true) {
      handleFetchProducts();
    }
  }, [open]);

  const handleFilterOptionsValuesChange = (key, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));

    console.log({ key, value, filterOptions }, "insidehandleChange");
  };

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

  const handleClearFilters = () => {
    setFilterValues({
      searchText: "",
      category: "",
      type: "",
      collection: "",
    });
    handleFetchProducts();
  };

  // search product from api searchProduct
  const handleSearchProduct = ({ filterValues }) => {
    const { searchText, category, type, collection } = filterValues;
    const URL = PRODUCT.SEARCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
      search_value: searchText,
      category: category,
      type: type,
      collection: collection,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setData(json.result);
      })
      .catch((err) => console.error(err));
  };

  const handleAddProductsDialogOpen = () => {
    setIsDialogOpen(true);
    // console.log("**", setIsDialogOpen);
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

  //search product using category
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
  //search product using product type
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

  const handleAddProductsToVendor = () => {
    // route this page to VenderOnboardingSteps
    // router.push(`/vendorOnboardingAddProductDialog/${pageId}`);
    // setIsDialogOpen(false);

    const URL = VENDOR.ADD_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: selectedProducts,
      vendor_id: pageId,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          handleClose();
          handleFetchVendorProducts();
          enqueueSnackbar("Product Added Successfully", {
            variant: "success",
          });
          setSelectedProducts([]);
        }
        console.log("addppdata", { json });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const columnsDataForSelect = [
    // {
    //   field: "master_item_id",
    //   headerName: "ID",
    //   width: 100,
    // },
    {
      field: "product_title",
      headerName: "Product Name",
      flex: 1,
      valueGetter: ({ value }) => value,
      renderCell: (params) => (
        <>
          <RenderProductDetails
            // href={`app/product/${params.row.master_item_id}`}
            href={`/app/products/${params.row.master_product_id}?tab=overview`}
            openInNewTab={true}
            display_image={params.row.display_image}
            title={params.row.product_title}
            sku={params.row.sku}
          />

          {/* <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <AppImage
              src={params.row.display_image}
              width="40"
              height="42"
              sx={{
                marginTop: "4px",
                borderRadius: "4px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize: "14px",
                fontWeight: "700",
                "& a": {
                  ml: "0px",
                  // color: "#4F44E0",
                },
              }}
            >
              <Typography
                sx={{
                  marginLeft: "10px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                {params.value}
              </Typography>
               <RenderAppLink
						// href={`/app/warehouse/${params.value}`}
						title={params.value}
					/> 

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                }}
              >
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    fontWeight: "500",
                    // color: (theme) => theme.palette.grey[600],
                    color: (theme) => theme.palette.grey[600],
                  }}
                >
                  SKU:{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      // color: "#000000",
                    }}
                  >
                    {params.row.sku}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box> */}
        </>
      ),
    },
    // {
    //   field: "sku",
    //   headerName: "SKU",
    //   flex: 0.5,
    //   // valueGetter: ({ value }) => value,
    // },
    {
      field: "unit_retail_price",
      headerName: "Cost",
      // flex: 0.5,
      width: 140,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => <RenderCurrency value={params.value} />,

      // valueGetter: ({ value }) => value,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 0.5,
    //   renderCell: (params) => (
    //     <IconButtonWithTooltip icon={<DeleteIcon />} title={"Delete"} />
    //   ),
    //   // valueGetter: ({ value }) => value,
    // },
  ];
  console.log("selectedProducts", selectedProducts);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      paddingTop: "0px",
      paddingBottom: "0px",
      borderRadius: "5px",
      // minWidth: "200px",
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
    <>
      {loading && <PageLoader />}
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
          
          {Array.isArray(productsList) && productsList.length > 0 && (
            <MuiBaseDataGrid
              containerStyles={{
                height: "400px",
              }}
              data={productsList}
              rowIdkey={"master_product_id"}
              columnDefData={columnsDataForDisplaySelectedProducts}
              checkboxSelection={false}
              // hideFooter={true}
            />
          )}
        </Grid>
      </Container> */}
      <BaseDialog open={open} handleClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // padding: "16px",
            // minWidth: "600px",
            // minHeight: "167px",
          }}
        >
          <SectionTitleText
            sx={{
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-between",
              // alignItems: "center",
              // border: "1px solid #E5E5E5",
              marginTop: "10px",
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
                  minWidth: "23%",
                  // width: "100%",
                  // height: "5px",
                  marginRight: "5px",
                }}
                id="outlined-size-small"
                size="small"
                placeholder="Search Products"
                // value={filterValues.searchText}
                // onChange={(e) => handleSearchProduct(e.target.value)}
                value={filterValues.searchText}
                onChange={(e) =>
                  handleFilterValuesChange(e.target.value, "searchText")
                }
              />
              <FormSelectInput
                placeholder="Select Category"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  minWidth: "25%",
                  // height: "5px",
                }}
                styles={customStyles}
                id="master_product_id"
                // value={filterValues.productCateogry}
                // onChange={handleChangeCategory}
                // options={handleSelectCategoryOptionWithLabel}
                value={
                  filterValues.category && {
                    label: filterValues.category,
                    value: filterValues.category,
                  }
                }
                onChange={(e) => handleFilterValuesChange(e.value, "category")}
                options={categoryOptions}
              />
              <FormSelectInput
                placeholder="Product Type"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  minWidth: "20%",
                  // height: "5px",
                }}
                styles={customStyles}
                id="master_product_id"
                // value={filterValues.productType}
                // onChange={handleChangeProductType}
                // options={handleSelectProductTypeWithLabel}
                value={
                  filterValues.type && {
                    label: filterValues.type,
                    value: filterValues.type,
                  }
                }
                onChange={(e) => handleFilterValuesChange(e.value, "type")}
                options={typeOptions}
              />
              {/* <FormSelectInput
                placeholder="Tag"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  width: "50%",
                  // height: "5px",
                }}
                styles={customStyles}
                value={tag}
                onChange={handleChangeTag}
                options={handleSelectTagWithLabel}
              /> */}
              <FormSelectInput
                placeholder="Collection"
                containerStyles={{
                  margin: "5px",
                  padding: "0px",
                  // width: "70%",
                  // minWidth: "20%",
                  // height: "5px",
                }}
                styles={customStyles}
                // value={filterValues.collectionType}
                // onChange={handleChangeCollection}
                // options={handleSelectCollectionWithLabel}
                options={collectionOptions}
                value={
                  filterValues.collection && {
                    label: filterValues.collection,
                    value: filterValues.collection,
                  }
                }
                onChange={(e) =>
                  handleFilterValuesChange(e.value, "collection")
                }
              />
              <Box
                sx={{
                  alignItems: "flex-start",
                }}
              >
                <Button
                  sx={{
                    fontSize: "12px",
                  }}
                  onClick={() => handleClearFilters()}
                >
                  Clear Filters
                </Button>
              </Box>
              {/* <Button onClick={() => handleClearFilters()}>
                Clear Filters
              </Button> */}
            </Box>
          </Box>
          <Divider
            sx={{
              marginTop: "5px",
            }}
          />
          <Box>
            <MuiBaseDataGrid
              containerStyles={{ height: "450px" }}
              data={data}
              rowIdkey={"master_product_id"}
              columnDefData={columnsDataForSelect}
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              rowSelectionModel={selectedProducts}
              disableSelectionOnClick={false}
              // totalRows={data.length}
              // autoPageSize={false}
              // pageSize={5}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <Box
              sx={{
                alignItems: "flex-start",
              }}
            >
              <Button onClick={() => handleClearFilters()}>
                Clear Filters
              </Button>
            </Box> */}
            <Box
              sx={{
                // display: "flex",
                // flexDirection: "column",
                alignItems: "flex-end",
                bottom: "0px",
                marginTop: "16px",
              }}
            >
              <PrimaryButton onClick={() => handleAddProductsToVendor()}>
                Add Selected Products
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
      </BaseDialog>
    </>
  );
}

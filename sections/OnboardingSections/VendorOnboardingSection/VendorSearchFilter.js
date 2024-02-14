import { Box, TextField } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function VendorSearchFilter({ props }) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId;

  const [categoryList, setCategoryList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [productCateogry, setProductCategory] = useState();
  const [collectionType, setCollectionType] = useState();
  const [productType, setProductType] = useState();
  const [tag, setTag] = useState();
  const [data, setData] = useState([]);

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

  // search product from api searchProduct
  const handleSearchProduct = (searchText, category, type, collection) => {
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

  //serach product using category
  const handleSelectCategoryOption = () => {
    const URL = PRODUCT.FETCH_CATEGORY;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setCategoryList(json.result);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleSelectCategoryOption();
  }, []);

  const handleSelectCategoryOptionWithLabel =
    Array.isArray(categoryList) &&
    categoryList.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

  const handleChangeCategory = (e) => {
    setProductCategory(e);
    handleSearchProduct("", e.value);
  };
  //-----------------------------------------------------------------------------------------------------------------------------
  //serach product using product type
  const handleSelectProductTypeOption = () => {
    const URL = PRODUCT.FETCH_PRODUCT_TYPE;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setProductTypeList(json.result);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleSelectProductTypeOption();
  }, []);

  const handleSelectProductTypeWithLabel =
    Array.isArray(productTypeList) &&
    productTypeList.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

  const handleChangeProductType = (e) => {
    setProductType(e);
    handleSearchProduct("", e.value);
  };

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
  const handleCollectionOption = () => {
    const URL = PRODUCT.FETCH_COLLECTION_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setCollectionList(json.result);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleCollectionOption();
  }, []);

  const handleSelectCollectionWithLabel =
    Array.isArray(collectionList) &&
    collectionList.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

  const handleChangeCollection = (e) => {
    setCollectionType(e);
    handleSearchProduct("", e.value);
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
  return (
    <>
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
    </>
  );
}

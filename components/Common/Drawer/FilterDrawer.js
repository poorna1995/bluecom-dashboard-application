import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextField, Typography } from "@mui/material";
import OutlinedButton from "../Buttons/OutlinedButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import SectionTitleText from "../Typography/HeadingText/SectionTitleText";
import FormSelectInput from "../Inputs/SelectInput";
import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSelector } from "react-redux";
import TextInput from "../Inputs/TextInput";
import { useRouter } from "next/router";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function FilterDrawer({ handleCloseDrawer }) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const { currentPage } = router.query;
  const [data, setData] = React.useState([]);
  const [filterValues, setFilterValues] = React.useState({
    searchText: "",
    category: "",
    type: "",
    collection: "",
  });
  const [filterOptions, setFilterOptions] = React.useState({
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
    // handleSearchProduct({
    // 	filterValues: { ...filterValues, [key]: value },
    // });
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
    router.push(`/app/products?currentPage=1`);
    handleCloseDrawer();
    // handleFetchProducts();
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
  React.useEffect(() => {
    // if () {
    handleFetchFiltersOptions();
    // }
  }, []);
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
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
      // vendor_id: selectedVendorID,
      search_value: searchText,
      category: category,
      type: type,
      collection: collection,
      page: currentPage || 0,
      per_page: 10,
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
  const handleApplyFiltersClick = () => {
    const route = Object.entries(filterValues)
      .filter((item) => item[1] !== "")
      .map((item) => item.join("="))
      .join("&");
    console.log({ route });
    router.push(`/app/products?currentPage=${currentPage || 1}&${route}`);
    handleSearchProduct({ filterValues });
    handleCloseDrawer();
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
    <Box sx={{ px: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: "16px",
          px: "16px",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          pb: "8px",
        }}
      >
        <SectionTitleText>Set Filters</SectionTitleText>
        <OutlinedButton
          sx={{
            border: "none",
            color: (theme) => theme.palette.primary.main,
            "&:hover": {
              // background: (theme) => theme.palette.grey[300],
              background: (theme) => theme.palette.blue[50],
            },
          }}
          onClick={() => handleClearFilters()}
        >
          Clear Filters
        </OutlinedButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
          // marginBottom: "36px",
          alignItems: "center",
        }}
      >
        <TextInput
          // sx={{
          //   // marginTop: "16px",
          //   width: "90%",
          //   // height: "5px",
          // }}
          title={`Product Title`}
          id="outlined-size-small"
          size="small"
          placeholder="Search Products"
          value={filterValues.searchText}
          onChange={(e) =>
            handleFilterValuesChange(e.target.value, "searchText")
          }
          containerStyles={{
            maxWidth: "90%",
          }}
          inputStyles={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        />
        <FormSelectInput
          placeholder="Select Category"
          containerStyles={{
            margin: "12px",
            padding: "0px",
            width: "90%",
            // height: "5px",
          }}
          title={`Category`}
          styles={customStyles}
          options={categoryOptions}
          value={
            filterValues.category
              ? {
                  label: filterValues.category,
                  value: filterValues.category,
                }
              : ""
          }
          onChange={(e) => handleFilterValuesChange(e.value, "category")}
        />
        <FormSelectInput
          placeholder="Product Type"
          containerStyles={{
            margin: "12px",
            padding: "0px",
            width: "90%",
            // height: "5px",
          }}
          title={`Product Type`}
          styles={customStyles}
          options={typeOptions}
          value={
            filterValues.type
              ? {
                  label: filterValues.type,
                  value: filterValues.type,
                }
              : ""
          }
          onChange={(e) => handleFilterValuesChange(e.value, "type")}
        />
        <FormSelectInput
          placeholder="Collection"
          containerStyles={{
            margin: "12px",
            padding: "0px",
            width: "90%",
            // height: "5px",
          }}
          styles={customStyles}
          options={collectionOptions}
          value={
            filterValues.collection
              ? {
                  label: filterValues.collection,
                  value: filterValues.collection,
                }
              : ""
          }
          title={`Collection`}
          onChange={(e) => handleFilterValuesChange(e.value, "collection")}
        />
      </Box>

      <Box
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
          display: "flex",
          mt: "16px",
          position: "fixed",
          bottom: "0",
          width: "372px",
          pt: "16px",
          pb: "24px",
        }}
      >
        <OutlinedButton
          fullWidth
          sx={{ height: "44px" }}
          onClick={() => handleCloseDrawer()}
        >
          Cancel
        </OutlinedButton>
        <PrimaryButton
          fullWidth
          sx={{ ml: 1, height: "44px" }}
          onClick={() => handleApplyFiltersClick()}
        >
          Apply Filters
        </PrimaryButton>
      </Box>
    </Box>
  );
}

import { useQuery } from "@tanstack/react-query";
import AppImage from "components/Common/AppImage";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import imageCompression from "browser-image-compression";
import placeholderImage from "public/assets/placeholder/upload-image.png";
import lodash, { uniqBy, zipObject } from "lodash";
import ProductOnboardingProductImagesSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingProductImagesSection";
import ProductOnboardingProductOrganizationSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingProductOrganizationSection";
import ProductOnboardingShippingInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingShippingInfoSection";
import ProductOnboardingInventoryInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import ProductOnboardingPriceInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingPriceInfoSection";
import ProductOnboardingGeneralInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingGeneralInfoSection";
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  deleteEditProductImage,
  fetchEditProductDataStart,
  setEditProductData,
  setEditProductImages,
  setNewProductOptions,
} from "redux/products/productsSlice";
import { addProduct } from "sections/OnboardingSections/ProductOnboardingSection/helpers/products.helper";
import { useSnackbar } from "notistack";
import AppLink from "components/Common/AppLink";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import ProductOnboardingOptionsInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingOptionsInfoSection";
import ProductOnboardingVariantsInfoSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingVariantsInfoSection";
import convertStringArrayToObjectArray from "utils/arrayOperations/convertStringArrayToObjectArray";
import { compressImageAndUpload } from "../helpers/products.helpers";
import convertObjectArrayToStringArrays from "utils/arrayOperations/convertObjectArrayToStringArrays";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  newProductData: productsData.newProductData,
  newProductImages: productsData.newProductImages,
  editProductsData: productsData.editProductData,
  selectedOptions: productsData.newProductData.productOptions,
});

export default function EditProductsDetailsPageSection() {
  const { currentUser, editProductsData, selectedOptions } =
    useSelector(mapState);
  const router = useRouter();
  const productId = router.query.productId;
  // const { data: product } = useQuery({
  // 	queryKey: ["editProduct", productId],
  // 	queryFn: () =>
  // 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER, {
  // 			user_id: currentUser.merchant_id,
  // 			master_product_id: productId,
  // 		}).then((json) => json.result[0]),
  // });
  // console.log({ product });
  const productDataFromStore =
    // product;
    editProductsData;
  const productImages = productDataFromStore?.images;
  const productCategoryFromState = productDataFromStore?.category;
  const productCategoryWithLabel = {
    label: productCategoryFromState,
    value: productCategoryFromState,
  };

  const productTypeFromState = productDataFromStore?.type;
  const productTypeWithLabel = {
    label: productTypeFromState,
    value: productTypeFromState,
  };
  const getItemData =
    Array.isArray(productDataFromStore?.items) &&
    productDataFromStore?.items[0];
  const productOptionsFromState =
    Array.isArray(productDataFromStore.items) && productDataFromStore.items;

  const mergedOptions = convertStringArrayToObjectArray(
    productOptionsFromState
  );
  console.log({
    mergedOptions,
  });

  const setOptionsValues = () => {
    return (
      Array.isArray(mergedOptions) &&
      mergedOptions.map((item) => {
        dispatch(setNewProductOptions({ ...item }));
      })
    );
  };
  useEffect(() => {
    setOptionsValues();
    // dispatch(setNewProductOptions([...mergedOptions]));
  }, [productOptionsFromState]);

  const getWarehouseData = getItemData?.inv;
  const getWeight = getItemData?.weight;
  const getWeightUnit = getItemData?.weight_unit;
  const getUnitCostPrice = getItemData?.unit_cost_price || "";

  const edit = router.query.edit;
  const pageId = router.query.productId;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;
  const [channelOptions, setChannelOptions] = useState([]);

  const [title, setTitle] = useState(productDataFromStore?.product_title);
  const [productDescription, setProductDescription] = useState(
    productDataFromStore.product_desc || "<p></p>"
  );
  useEffect(() => {
    if (productDataFromStore.product_desc)
      setProductDescription(productDataFromStore.product_desc);
  }, [productDataFromStore.product_desc]);

  const [unitRetailPrice, setUnitRetailPrice] = useState(
    productDataFromStore?.unit_retail_price
  );
  const [unitCostPrice, setUnitCostPrice] = useState(
    productDataFromStore?.unit_cost_price || 0
  );

  const [hasOptions, setHasOptions] = useState(
    selectedOptions?.length > 0 || false
  );
  useEffect(() => {
    setHasOptions(selectedOptions?.length > 0 || false);
  }, [selectedOptions.length]);
  const [optionName, setOptionName] = useState("");
  const [items, setItems] = useState([]);
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [tags, setTags] = useState([]);
  const [collection, setCollection] = useState("");
  const [sku, setSKU] = useState("");
  const [productBarCode, setProductBarCode] = useState("");
  const [warehouseList, setWarehouseList] = useState(getWarehouseData || []);
  const [productWarehouseInventory, setProductWarehouseInventory] = useState(
    []
  );
  const [trackQuantity, setTrackQuantity] = useState(false);
  const [continueSelling, setContinueSelling] = useState(false);
  const [optionValues, setOptionValues] = useState("");
  const [fields, setFields] = useState([{ id: 0, value: null }]);

  console.log({ productDataFromStore });

  useEffect(() => {
    setTitle(productDataFromStore?.product_title);
    setUnitRetailPrice(productDataFromStore?.unit_retail_price);
    setUnitCostPrice(productDataFromStore?.unit_cost_price || 0);
    setWeight(productDataFromStore?.weight);
    setSKU(productDataFromStore?.sku);
    setTags(productDataFromStore?.tag);
    setCollection(productDataFromStore?.collection);
    setProductCategory(productCategoryWithLabel || "");
    setProductType(productTypeWithLabel || "");
    setWarehouseList(getWarehouseData || []);
    setUnitCostPrice(getUnitCostPrice);

    setWeight(getWeight);
    setWeightUnit(getWeightUnit);
  }, [
    productDataFromStore?.product_title,
    productDataFromStore?.unit_retail_price,
    productDataFromStore?.unit_cost_price,
    productDataFromStore?.weight,
    productDataFromStore?.sku,
    productDataFromStore?.tag,
    productDataFromStore?.collection,
  ]);
  const [productOptions, setProductoptions] = useState([
    // {
    // 	name: "",
    // 	fields: [{ id: 0, value: null }],
    // },
  ]);
  console.log({ productOptions });
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd(i) {
    const values = [...fields];
    values.push({ id: i, value: null });
    setFields(values);
  }
  const handleChangeProductOptionsName = (event, index, value) => {
    const values = [...productOptions];

    console.log("Called handleChangeProductOptionsName", {
      productOptions,
    });
    let clonedObject = { ...values[index] };
    clonedObject.name = event.value;

    // values[index].name = event.value;
    const data = values.filter((item) => item.name !== clonedObject.name);

    setProductoptions([...data, clonedObject]);
  };
  // handleChangeProductOptionsFields(event, id, index, values);

  const handleChangeProductOptionsFields = (event, id, index, fields) => {
    const values = [...productOptions];

    // values[index].fields = fields;
    let clonedObject = { ...values[index] };
    clonedObject.fields = fields;
    console.log("Called handleChangeProductOptionsFields", {
      productOptions,
      values: values[index],
      fields,
      clonedObject,
    });
    const data = values.filter((item) => item.name !== clonedObject.name);

    setProductoptions([...data, clonedObject]);
  };

  const handleAddProductOptions = () => {
    const options = [...productOptions];
    options.push({ name: "", fields: [{ id: 0, value: null }] });
    setProductoptions(options);
  };

  console.log("fields", fields);
  const handleRemoveOption = (i) => {
    const values = [...productOptions];
    values.splice(i, 1);
    setProductoptions(values);
  };

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const handleWarehouseInventoryChange = (field) => {
    return (e) => {
      const { value } = e.target;
      setProductWarehouseInventory((prevState) => {
        const data = prevState.filter((item) => item.wh_id !== field);
        return [
          ...data,
          {
            wh_id: field,
            available: value,
          },
        ];
      });
    };
  };
  console.log("productWarehouseInventory", productWarehouseInventory);

  const [loading, setLoading] = useState(false);
  // console.log("selectedChannel", selectedChannel);

  const blocksFromHTML = convertFromHTML(productDescription);
  const sessionContent = ContentState.createFromBlockArray(blocksFromHTML);
  var myEditorState =
    EditorState.createWithContent(sessionContent) || EditorState.createEmpty();

  const [editorState, setEditorState] = useState(myEditorState);

  useEffect(() => {
    setEditorState(myEditorState);
  }, [productDescription]);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const sessionDescription = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const inputRef = React.useRef();
  const [selectedFile, setSelectedFile] = React.useState("");

  const [editImageURL, setEditImageURL] = useState("");
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setLoading(true);
    if (file) {
      // handleProductImageUpload(file);
      await compressImageAndUpload(e, file, USER_ID, setEditImageURL);
      await dispatch(setEditProductImages(editImageURL));
      await setLoading(false);
    }
  };
  console.log({ selectedFile });
  const resetForm = () => {
    setTitle("");
    // setDescription("");
    setUnitRetailPrice("");
    setEditorState(EditorState.createEmpty());
    dispatch(removeAllProductImages());
    router.push("/app/products");
    // setProductImages([]);
  };

  const handleBlurDescription = () => {
    // dispatch(setDraftSessionDescription(sessionDescription));
    setProductDescription(sessionDescription);
  };

  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannelOptions(json.result);
      });
  };
  const handleFetchProductData = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,
    };
    dispatch(fetchEditProductDataStart({ url: URL, data }));
  };
  useEffect(() => {
    handleFetchChannels();
    // handleFetchWarehouse();
    if (pageId) handleFetchProductData();
  }, [pageId]);

  const channelOptionsTransform =
    Array.isArray(channelOptions) &&
    channelOptions.map((item) => {
      const { channel_name, channel_id } = item;
      return {
        label: channel_name,
        value: channel_id,
      };
    });

  const handleDeleteThumbnail = (e, file_url) => {
    const url = "https://api.bluecom.ai/api/mediaUpload";
    const data = { file_url: file_url, user_id: USER_ID };
    // let arr = thumbnails.filter((item) => item !== file_url);
    // dispatch(deleteNewproductImage(file_url));

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          dispatch(deleteEditProductImage(file_url));
        }
      });
  };
  // const handleFetchWarehouse = () => {
  // 	const URL = WAREHOUSE.FETCH_LKP;

  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 	};

  // 	appFetch(URL, data).then((json) => {
  // 		setWarehouseList(json.result);
  // 	});
  // };
  const handleClickDone = () => {
    setItems(productOptions);
    console.log("items", { items, productOptions });
  };
  const mergeFieldsForTable = (list) => {
    const mergedFields = list.reduce((acc, field) => {
      const { name, fields } = field;
      return {
        ...acc,
        [name]: fields,
      };
    }, {});
    return mergedFields;
  };

  const itemsListed = mergeFieldsForTable(selectedOptions);

  const getValues = Object.values(itemsListed);
  const myItems = getValues.map((item, index) => {
    const mapItem = item
      .map((i, id) => {
        return i.value;
      })
      .flat();
    return mapItem;
  });

  function handleEditOptionClick(item) {
    const options = [...productOptions];
    options.push(item);
    console.log({ options });
    setProductoptions(options);
  }

  /**
	 * [
    [
        "Green",
        "Yellow",
        "Orange"
    ],
    [
        "Large",
        "XL"
    ]
]
How to get this as ["Green / Large", "Green / XL", "Yellow / Large", "Yellow / XL", "Orange / Large", "Orange / XL"]
	 */
  const getCombinations = (arrays = []) => {
    const result = [];
    const f = (prefix, arrays) => {
      for (let i = 0; i < arrays[0]?.length; i++) {
        const current = prefix.concat(arrays[0][i]);
        if (arrays.length > 1) {
          f(current, arrays.slice(1));
        } else {
          result.push(current);
        }
      }
    };
    f([], arrays);
    return result;
  };
  const getCombo =
    Array.isArray(myItems) && myItems.length > 0 && getCombinations(myItems);

  const getItemString =
    Array.isArray(getCombo) &&
    getCombo.map((item) => {
      const joinedItem = item.join(" / ");
      return joinedItem;
    });
  const getInventoryItems =
    Array.isArray(getItemString) &&
    getItemString.map((item) => {
      return {
        title: item,
      };
    });

  console.log({
    getInventoryItems,
    getItemString,
    getCombo,
    getValues,
    myItems,
    inventories: productDataFromStore.items,
  });
  const getItemsFromFunction =
    convertObjectArrayToStringArrays(selectedOptions);
  console.log("itemsListed", {
    getItemsFromFunction,
  });

  // const inventoryItemsForData = getcombo, getKeys, getItemString together and map them to the item

  const itemKeys = mergeFieldsForTable(selectedOptions);
  const getKeys = Object.keys(itemKeys);

  const inventoriesToAdd =
    Array.isArray(getItemsFromFunction) &&
    getItemsFromFunction.map((item, index) => {
      const joinedItem = item.join(" / ");
      if (index === 0)
        return {
          title: joinedItem,
          option_name: getKeys,
          option_value: item,
          inventory: productWarehouseInventory,
        };
      return {
        title: joinedItem,
        option_name: getKeys,
        option_value: item,
        inventory: [],
      };
    });

  const handleUpdateProduct = () => {
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      category: productCategory.value,
      channel_id: 1,
      collection: collection,
      display_image: productDataFromStore.images[0],
      images: productDataFromStore.images,
      items: inventoriesToAdd,
      live_date: productDataFromStore.live_date,
      master_product_id: productDataFromStore.master_product_id,
      product_desc: sessionDescription,
      product_title: title,
      sku: sku,
      tag: tags,
      type: productType.value,
      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,
      weight: weight,
      weight_unit: weightUnit,
    };
    appFetch(URL, data).then((json) => {
      console.log("json", json);
      enqueueSnackbar(json.message);
      if (json.status === "success") {
        handleFetchProductData();
      }
    });
  };

  const handleAddItem = () => {
    const URL = PRODUCT.MERCHANT.ADD_PRODUCT_ITEM;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productDataFromStore.master_product_id,
      item_desc: "",
      item_title: "Test",
      option_name: ["colour", "size"],
      option_value: ["black", "s"],
    };
  };

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };
  const staticData = [
    {
      label: "Product Details",

      component: (
        <>
          {/* General Info */}
          <ProductOnboardingGeneralInfoSection
            containerStyles={containerStyles}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            setTitle={setTitle}
            title={title || productDataFromStore?.product_title}
          />
          <ProductOnboardingProductOrganizationSection
            containerStyles={{
              ...containerStyles,
              paddingTop: "24px",
              paddingBottom: "32px",
            }}
            collection={collection}
            productCategory={productCategory}
            productType={productType}
            setCollection={setCollection}
            setProductCategory={setProductCategory}
            setProductType={setProductType}
            setTags={setTags}
            tags={tags}
          />
        </>
      ),
      route: `general-info`,
    },
    {
      label: "Price",
      component: (
        <>
          <ProductOnboardingPriceInfoSection
            containerStyles={containerStyles}
            setUnitCostPrice={setUnitCostPrice}
            unitCostPrice={unitCostPrice}
            setUnitRetailPrice={setUnitRetailPrice}
            unitRetailPrice={unitRetailPrice}
          />
        </>
      ),
      route: `price-info`,

      // data.product_desc ||
      // "No description added, add an empty state for this",
    },
    {
      label: "Inventory",
      component: (
        <>
          {/* Inventory info */}
          <ProductOnboardingInventoryInfoSection
            containerStyles={{
              padding: "0px",
              paddingBottom: "32px",
              border: "none",
              marginTop: "0px",
            }}
            barcode={productBarCode}
            setBarcode={setProductBarCode}
            continueSelling={continueSelling}
            setContinueSelling={setContinueSelling}
            // quantity={quantity}
            // setQuantity={setQuantity}
            handleWarehouseInventoryChange={handleWarehouseInventoryChange}
            // warehouseInventory={warehouseInventory}
            setSKU={setSKU}
            setTrackQuantity={setTrackQuantity}
            trackQuantity={trackQuantity}
            sku={sku}
            warehouseList={warehouseList}
          />
          {/* Shipping Info */}
          <ProductOnboardingShippingInfoSection
            containerStyles={containerStyles}
            setWeight={setWeight}
            setWeightUnit={setWeightUnit}
            weight={weight}
            weightUnit={weightUnit}
          />
        </>
      ),
      route: `inventory`,
    },
    {
      label: "Variants",
      component: (
        <>
          {/* options Info */}
          <ProductOnboardingOptionsInfoSection
            containerStyles={containerStyles}
            fields={fields}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleChange={handleChange}
            hasOptions={hasOptions}
            setHasOptions={setHasOptions}
            optionName={optionName}
            setOptionName={setOptionName}
            handleAddAnotherOption={handleAddProductOptions}
            handleClickDone={handleClickDone}
            productOptions={productOptions}
            handleRemoveOption={handleRemoveOption}
            handleChangeProductOptionsFields={handleChangeProductOptionsFields}
            handleChangeProductOptionsName={handleChangeProductOptionsName}
            handleEditButtonClick={handleEditOptionClick}
          />
          {/* Variants Info */}
          {hasOptions && getInventoryItems.length > 0 && (
            // && optionValues
            <ProductOnboardingVariantsInfoSection
              containerStyles={containerStyles}
              items={getInventoryItems}
            />
          )}{" "}
        </>
      ),
      route: `options-variants`,
    },
    {
      label: "Product Media",
      component: (
        <>
          {/* Product Images */}
          <ProductOnboardingProductImagesSection
            containerStyles={containerStyles}
            handleDeleteThumbnail={handleDeleteThumbnail}
            handleFileSelect={handleFileSelect}
            inputRef={inputRef}
            placeholderImage={placeholderImage}
            productImages={productImages}
          />
        </>
      ),
      route: `product-media`,
    },
  ];
  const maxWidthPage = "635px";

  return (
    <Box>
      {loading && <PageLoader />}

      {/* <PublishPageDrawerHeader
				edit={edit}
				handleCloseDrawer={handleCloseDrawer}
				handleEditButtonClick={handleEditButtonClick}
				productTitle={productTitle}
				handleSaveChanges={() => handleSaveChanges()}
			/> */}
      <Box
        sx={{
          maxWidth: maxWidthPage,
          margin: "auto",
        }}
      >
        <Breadcrumbs
          sx={{
            fontSize: "14px",
            padding: "20px",
          }}
          aria-label="breadcrumb"
        >
          <AppLink
            href="/app/products"
            //  sx={{ color: "#5860D7" }}
          >
            Products
          </AppLink>

          <AppLink
            href={`/app/products/${productId}?tab=overview`}
            // sx={{ color: "#5860D7" }}
          >
            {productId}
          </AppLink>
          {/* 
				<Typography
					sx={{ fontSize: "12px" }}
					// underline="hover"
					color="#5860D7"
					fontWeight="600"
					// href="/material-ui/react-breadcrumbs/"
					// aria-current="page"
				>
					{productId}
				</Typography> */}
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          px: "16px",
          // pl: ,
          // mx: "-8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // position: "sticky",
          // top: "64px",
          background: "#fff",
          py: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1000,
          width: maxWidthPage,
          margin: "auto",
        }}
      >
        <Box sx={{}}>
          <SectionTitleText
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "28px",
            }}
          >
            Edit Product details
          </SectionTitleText>
        </Box>
      </Box>

      <Box
        sx={{
          pb: 6,
          // px: "16px",
          // pt: "16px",
        }}
      >
        <Box sx={{ maxWidth: maxWidthPage, margin: "auto" }}>
          <RouterTabs
            data={staticData}
            tabContainerStyles={{
              pl: "16px",
              position: "sticky",
              top: "64.5px",
              background: "#fff",
              py: 1,
              zIndex: (theme) => theme.zIndex.drawer + 1000,
            }}
            basePath={`/app/products/edit/${productId}`}
          />
          <Box
            sx={{
              position: "fixed",
              bottom: "0",
              background: "#fff",
              display: "flex",
              flex: 1,
              // justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                margin: "auto",
                maxWidth: maxWidthPage,
                width: maxWidthPage,
                display: "flex",
                flex: 1,
                borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
                py: "16px",
              }}
            >
              <OutlinedButton sx={{ flex: 1 }}>Discard changes</OutlinedButton>
              <PrimaryButton
                sx={{ flex: 1, ml: 1 }}
                onClick={() => handleUpdateProduct()}
              >
                Save Changes
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
        {/* <Grid
					container
					columnSpacing={2}
					// sx={{ paddingBottom: "64px" }}
				>
					<Grid
						item
						xs={12}
						md={8}
						// sx={{ overflow: "scroll", maxHeight: "80vh" }}
					>
						{/* General Info */}
        {/* <ProductOnboardingGeneralInfoSection
							editorState={editorState}
							onEditorStateChange={onEditorStateChange}
							setTitle={setTitle}
							title={title || productDataFromStore?.product_title}
						/> */}
        {/* Price Info */}
        {/* <ProductOnboardingPriceInfoSection
							setUnitCostPrice={setUnitCostPrice}
							unitCostPrice={unitCostPrice}
							setUnitRetailPrice={setUnitRetailPrice}
							unitRetailPrice={unitRetailPrice}
						/> */}
        {/* Inventory info */}
        {/* <ProductOnboardingInventoryInfoSection
							barcode={productBarCode}
							setBarcode={setProductBarCode}
							continueSelling={continueSelling}
							setContinueSelling={setContinueSelling}
							// quantity={quantity}
							// setQuantity={setQuantity}
							handleWarehouseInventoryChange={
								handleWarehouseInventoryChange
							}
							// warehouseInventory={warehouseInventory}
							setSKU={setSKU}
							setTrackQuantity={setTrackQuantity}
							trackQuantity={trackQuantity}
							sku={sku}
							warehouseList={warehouseList}
						/> */}
        {/* Shipping Info */}
        {/* <ProductOnboardingShippingInfoSection
							setWeight={setWeight}
							setWeightUnit={setWeightUnit}
							weight={weight}
							weightUnit={weightUnit}
						/> */}
        {/* options Info */}
        {/* <ProductOnboardingOptionsInfoSection
							fields={fields}
							handleAdd={handleAdd}
							handleRemove={handleRemove}
							handleChange={handleChange}
							hasOptions={hasOptions}
							setHasOptions={setHasOptions}
							optionName={optionName}
							setOptionName={setOptionName}
							handleAddAnotherOption={handleAddProductOptions}
							handleClickDone={handleClickDone}
							productOptions={productOptions}
							handleRemoveOption={handleRemoveOption}
							handleChangeProductOptionsFields={
								handleChangeProductOptionsFields
							}
							handleChangeProductOptionsName={
								handleChangeProductOptionsName
							}
							handleEditButtonClick={handleEditOptionClick}
						/> */}
        {/* Variants Info */}
        {/* {hasOptions && getInventoryItems.length > 0 && (
							// && optionValues
							<ProductOnboardingVariantsInfoSection
								items={getInventoryItems}
							/>
						)} */}
        {/* </Grid>
					<Grid
						item
						md={4}
						xs={12}
						// sx={{ overflow: "scroll", maxHeight: "80vh" }}
					> */}
        {/* Product organization */}
        {/* <ProductOnboardingProductOrganizationSection
							collection={collection}
							productCategory={productCategory}
							productType={productType}
							setCollection={setCollection}
							setProductCategory={setProductCategory}
							setProductType={setProductType}
							setTags={setTags}
							tags={tags}
						/> */}
        {/* Product Images */}
        {/* <ProductOnboardingProductImagesSection
							handleDeleteThumbnail={handleDeleteThumbnail}
							handleFileSelect={handleFileSelect}
							inputRef={inputRef}
							placeholderImage={placeholderImage}
							productImages={productImages}
						/>
					</Grid>
				</Grid> */}
      </Box>
    </Box>
  );
}

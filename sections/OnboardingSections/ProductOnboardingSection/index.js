/* eslint-disable @next/next/no-img-element */
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, WAREHOUSE } from "constants/API_URL";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductImages,
  deleteNewproductImage,
  removeAllNewProductOptions,
  removeAllProductImages,
  setNewProductOptions,
} from "redux/products/productsSlice";
import { MdHomeFilled } from "react-icons/md";
import AppLink from "components/Common/AppLink";
import { useRouter } from "next/router";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import ProductOnboardingProductImagesSection from "./components/ProductOnboardingProductImagesSection";
import ProductOnboardingProductOrganizationSection from "./components/ProductOnboardingProductOrganizationSection";
import ProductOnboardingPriceInfoSection from "./components/ProductOnboardingPriceInfoSection";
import ProductOnboardingGeneralInfoSection from "./components/ProductOnboardingGeneralInfoSection";
import ProductOnboardingInventoryInfoSection from "./components/ProductOnboardingInventoryInfoSection";
import ProductOnboardingShippingInfoSection from "./components/ProductOnboardingShippingInfoSection";
import ProductOnboardingVariantsInfoSection from "./components/ProductOnboardingVariantsInfoSection";
import ProductOnboardingOptionsInfoSection from "./components/ProductOnboardingOptionsInfoSection";
import { addProduct } from "./helpers/products.helper";
import lodash from "lodash";
import convertObjectArrayToStringArrays, {
  mergeFieldsForTable,
} from "utils/arrayOperations/convertObjectArrayToStringArrays";
/**
 * 
 * {
    "user_id": "138940023846722390",
    "product_id":"238940023846722399",
    "product_desc": "test product desc",
    "product_title": "Baggy Pant",
    "status": "draft",
    "channel_id": 3,
    "unit_retail_price": 145,
    "unit_cost_price": 145,
    "items": [
        {
            "item_title": "L/Black",
            "item_desc": "test desc",
            "barcode": "000",
            "inventory": [
                {
                    "wh_id": "75970904346",
                    "available": 100
                }
            ]
        },
        {
            "item_title": "M/Black",
            "item_desc": "test desc",
            "barcode": "000",
            "inventory": [
                {
                    "wh_id": "75970904346",
                    "available": 50
                },
                {
                    "wh_id": "77204914458",
                    "available": 50
                }
            ]
        }
    ],
    "weight": 100,
    "weight_unit":"gm",
    "display_image": "testimage",
    "images": [
        "testimage1",
        "testimage2"
    ]
}


 */

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  newProductData: productsData.newProductData,
  newProductImages: productsData.newProductImages,
  selectedOptions: productsData.newProductData.productOptions,
});

export default function ProductOnboardingSection() {
  // props=> description,images,options, product_type,published_scope,status,tags,title,variants,vendor

  const { currentUser, newProductData, newProductImages, selectedOptions } =
    useSelector(mapState);
  const productImages = newProductImages;
  const productOptionsfromRedux = newProductData.productOptions;
  const router = useRouter();
  const pageId = router.query.pageId;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;
  const [channelOptions, setChannelOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitRetailPrice, setUnitRetailPrice] = useState(0);
  const [unitCostPrice, setUnitCostPrice] = useState(0);

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
  const [itemBarCode, setItemBarCode] = useState("");
  const [productBarCode, setProductBarCode] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [productWarehouseInventory, setProductWarehouseInventory] = useState(
    []
  );
  const [trackQuantity, setTrackQuantity] = useState(false);
  const [continueSelling, setContinueSelling] = useState(false);
  const [optionValues, setOptionValues] = useState("");

  const [fields, setFields] = useState([{ id: 0, value: null }]);

  const [productOptions, setProductoptions] = useState([
    {
      name: "",
      fields: [{ id: 0, value: null }],
    },
  ]);
  // console.log({ productOptions });
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

    // console.log("Called handleChangeProductOptionsName", {
    // 	productOptions,
    // });
    values[index].name = event.value;
    setProductoptions(values);
  };
  // handleChangeProductOptionsFields(event, id, index, values);

  const handleChangeProductOptionsFields = (event, id, index, fields) => {
    const values = [...productOptions];
    // console.log("Called handleChangeProductOptionsFields", {
    // 	productOptions,
    // });
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
    // dispatch(setNewProductOptions(values));
  };

  const handleAddProductOptions = () => {
    const options = [...productOptions];
    options.push({ name: "", fields: [{ id: 0, value: null }] });

    setProductoptions(options);
    // dispatch(setNewProductOptions(options));
  };
  function handleEditOptionClick(item) {
    const options = [...productOptions];
    options.push(item);
    console.log({ options });
    setProductoptions(options);
  }

  // console.log("fields", fields);
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
  const handleCreateOption = () => {
    setItems((prevState) => {
      return [
        ...prevState,
        {
          item_title: optionName,
          item_desc: productDescription,
          barcode: itemBarCode,
          inventory: productWarehouseInventory,
        },
      ];
    });
  };

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
            // [field]: value,
          },
        ];
      });
    };
  };
  // console.log("productWarehouseInventory", productWarehouseInventory);
  // "items": [
  //     {
  //         "item_title": "L/Black",
  //         "item_desc": "test desc",
  //         "barcode": "000",
  //         "inventory": [
  //             {
  //                 "wh_id": "75970904346",
  //                 "available": 100
  //             }
  //         ]
  //     },
  // ],
  // "images": [
  //     "testimage1",
  //     "testimage2"
  // ]

  const [loading, setLoading] = useState(false);
  // console.log("selectedChannel", selectedChannel);

  const blocksFromHTML = convertFromHTML(productDescription);
  const sessionContent = ContentState.createFromBlockArray(blocksFromHTML);
  var myEditorState =
    EditorState.createWithContent(sessionContent) || EditorState.createEmpty();

  const [editorState, setEditorState] = useState(myEditorState);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const sessionDescription = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );
  const inputRef = React.useRef();
  const [selectedFile, setSelectedFile] = React.useState("");
  const [showSelectedFile, setShowSelectedFile] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setShowSelectedFile(true);

    if (file) {
      setLoading(true);
      compressImageAndUpload(e, file);
    }
  };
  // console.log({ selectedFile });
  const resetForm = () => {
    setTitle("");
    // setDescription("");
    setUnitRetailPrice("");
    setEditorState(EditorState.createEmpty());
    dispatch(removeAllProductImages());
    router.push("/app/products");
    // setProductImages([]);
  };

  useEffect(() => {
    dispatch(removeAllNewProductOptions());
    dispatch(removeAllProductImages());
  }, []);

  const compressImageAndUpload = async (e, file) => {
    e.preventDefault();
    const imageFile = file;
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    // dispatch(setSectionLoading(true));
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/jpg",
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      // 	"compressedFile instanceof Blob",
      // 	compressedFile instanceof Blob,
      // ); // true
      // console.log(
      // 	`compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
      // ); // smaller than maxSizeMB

      // dispatch(setSectionLoading(false));
      await handleProductImageUpload(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlurDescription = () => {
    // dispatch(setDraftSessionDescription(sessionDescription));
    setProductDescription(sessionDescription);
  };

  const handleAddProduct = async (status) => {
    // const url = PRODUCT.MERCHANT.ADD_PRODUCT;

    const data = {
      user_id: currentUser.merchant_id,
      product_id: pageId,
      product_desc: sessionDescription,
      product_title: title,

      status: status,

      channel_id: 3,

      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,

      items: inventoriesToAdd,

      weight: weight,
      weight_unit: weightUnit.value,

      display_image: productImages[0],
      images: productImages,

      sku: sku,
      barcode: productBarCode,

      category: productCategory.value,
      type: productType.value,
      tag: tags,
      collection: collection,
    };
    const onSuccess = () => {
      return "success";
    };
    await addProduct(data, enqueueSnackbar);
    router.push("/app/products");
  };
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannelOptions(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
    handleFetchWarehouse();
  }, []);

  const channelOptionsTransform =
    Array.isArray(channelOptions) &&
    channelOptions.map((item) => {
      const { channel_name, channel_id } = item;
      return {
        label: channel_name,
        value: channel_id,
      };
    });

  const handleProductImageUpload = (file) => {
    // setLoading(true);
    const formData = new FormData();

    formData.append("file", file);

    const url = `https://api.bluecom.ai/api/mediaUpload?user_id=${USER_ID}&type=product_image&category=product_image`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log("File Upload", json);

        if (json.status === "success") {
          dispatch(addNewProductImages(`https://${json.file_url}`));
          //   dispatch(setEditSessionThumbnail(json.file_path));
          //   dispatch(setSelectedThumbnail(""));
          enqueueSnackbar(json.message);
          setSelectedFile(null);

          setLoading(false);
        } else {
          // setLoading(false);
        }
        //
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        // // enqueueSnackbar("Cannot complete action", {
        //   variant: "error",
        // });
      });
  };
  const handleDeleteThumbnail = (e, file_url) => {
    const url = "https://api.bluecom.ai/api/mediaUpload";
    const data = { file_url: file_url, user_id: USER_ID };
    // let arr = thumbnails.filter((item) => item !== file_url);
    dispatch(deleteNewproductImage(file_url));

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          dispatch(deleteNewproductImage(file_url));
        }
      });
  };
  const handleFetchWarehouse = () => {
    const URL = WAREHOUSE.FETCH_LKP;

    const data = {
      user_id: currentUser.merchant_id,
    };

    appFetch(URL, data).then((json) => {
      setWarehouseList(json.result);
    });
  };
  const handleClickDone = (e, index) => {
    setItems(productOptions);

    // console.log("items", { items, productOptions, e, index });
  };

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
  console.log({ inventoriesToAdd });

  const disableButton =
    loading ||
    title?.length === 0 ||
    // productDescription.length === 0 ||
    unitRetailPrice === 0;
  return (
    <Container>
      {/* {loading && <SectionLoader />} */}
      {loading && <PageLoader />}
      <>
        <Box
          sx={{
            my: "8px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <AppLink
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                color: (theme) => theme.palette.primary.main,
              }}
              // color="inherit"
              href="/"
            >
              <MdHomeFilled sx={{ mr: 0.5 }} fontSize="inherit" />
            </AppLink>
            <AppLink
              sx={{
                display: "flex",
                alignItems: "center",
                color: (theme) => theme.palette.primary.main,
              }}
              href="/app/products"
            >
              {/* <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
              Products
            </AppLink>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "rgba(139, 141, 151, 1)",
              }}
              // color="text.primary"
            >
              {/* <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
              New Product
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "rgba(139, 141, 151, 1)",
              }}
              // color="text.primary"
            >
              {/* <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}#{" "}
              {pageId}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            position: "sticky",
            top: "64px",
            background: (theme) => theme.palette.background.default,
            py: "16px",
            pt: "8px",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Box
            sx={{
              my: "16px",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // marginBottom: "24px",
              // marginTop: "16px",
            }}
          >
            <SectionTitleText sx={{ fontSize: "32px" }}>
              Add Product details
            </SectionTitleText>
            <Box>
              <OutlinedButton
                sx={{ marginRight: "16px" }}
                onClick={() => handleAddProduct("draft")}
                disabled={disableButton}
              >
                Save as draft
              </OutlinedButton>
              {/* <PrimaryButton
								onClick={() => handleAddProduct("active")}
								disabled={loading}
							>
								Save & Publish
							</PrimaryButton> */}
            </Box>
          </Box>
        </Box>
        <Grid
          container
          columnSpacing={2}

          // sx={{ paddingBottom: "64px" }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={
              {
                // maxHeight: "80vh",
                // overflow: "scroll",
              }
            }
          >
            {/* General Info */}
            <ProductOnboardingGeneralInfoSection
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              setTitle={setTitle}
              title={title}
            />
            {/* Price Info */}
            <ProductOnboardingPriceInfoSection
              setUnitCostPrice={setUnitCostPrice}
              unitCostPrice={unitCostPrice}
              setUnitRetailPrice={setUnitRetailPrice}
              unitRetailPrice={unitRetailPrice}
            />
            {/* Inventory info */}
            <ProductOnboardingInventoryInfoSection
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
              setWeight={setWeight}
              setWeightUnit={setWeightUnit}
              weight={weight}
              weightUnit={weightUnit}
            />
            {/* options Info */}
            <ProductOnboardingOptionsInfoSection
              fields={fields}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              hasOptions={hasOptions}
              setHasOptions={setHasOptions}
              optionName={optionName}
              setOptionName={setOptionName}
              handleAddAnotherOption={handleAddProductOptions}
              handleEditButtonClick={handleEditOptionClick}
              handleClickDone={handleClickDone}
              productOptions={productOptions}
              handleRemoveOption={handleRemoveOption}
              handleChangeProductOptionsFields={
                handleChangeProductOptionsFields
              }
              handleChangeProductOptionsName={handleChangeProductOptionsName}
            />
            {/* Variants Info */}
            {hasOptions &&
              Array.isArray(inventoriesToAdd) &&
              inventoriesToAdd?.length > 0 && (
                // && optionValues
                <ProductOnboardingVariantsInfoSection
                  warehouseCount={warehouseList.length}
                  items={inventoriesToAdd}
                />
              )}
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={
              {
                // maxHeight: "80vh",
                // overflow: "scroll",
              }
            }
          >
            {/* Product organization */}
            <ProductOnboardingProductOrganizationSection
              collection={collection}
              productCategory={productCategory}
              productType={productType}
              setCollection={setCollection}
              setProductCategory={setProductCategory}
              setProductType={setProductType}
              setTags={setTags}
              tags={tags}
            />
            {/* Product Images */}
            <ProductOnboardingProductImagesSection
              handleDeleteThumbnail={handleDeleteThumbnail}
              handleFileSelect={handleFileSelect}
              inputRef={inputRef}
              placeholderImage={placeholderImage}
              productImages={productImages}
            />
          </Grid>
        </Grid>
      </>
    </Container>
  );
}

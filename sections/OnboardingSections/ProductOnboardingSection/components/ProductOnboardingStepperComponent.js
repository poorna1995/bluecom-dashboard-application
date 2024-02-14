import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";

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
import { MdArrowBack, MdArrowLeft, MdHomeFilled } from "react-icons/md";
import { useRouter } from "next/router";

import ProductOnboardingGeneralInfoSection from "./ProductOnboardingGeneralInfoSection";
import ProductOnboardingInventoryInfoSection from "./ProductOnboardingInventoryInfoSection";
import ProductOnboardingOptionsInfoSection from "./ProductOnboardingOptionsInfoSection";
import ProductOnboardingPriceInfoSection from "./ProductOnboardingPriceInfoSection";
import ProductOnboardingProductImagesSection from "./ProductOnboardingProductImagesSection";
import ProductOnboardingProductOrganizationSection from "./ProductOnboardingProductOrganizationSection";
import ProductOnboardingShippingInfoSection from "./ProductOnboardingShippingInfoSection";
import ProductOnboardingVariantsInfoSection from "./ProductOnboardingVariantsInfoSection";
import lodash from "lodash";
import convertObjectArrayToStringArrays, {
  mergeFieldsForTable,
} from "utils/arrayOperations/convertObjectArrayToStringArrays";
import { CHANNEL, WAREHOUSE } from "constants/API_URL";
import StepperComponent from "components/Common/StepperComponent";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import inventory from "components/Common/Icons/inventory";
import { addProduct } from "../helpers/products.helper";
import ProductOnboardingBottomActionButtons from "./ProductOnboardingBottomActionButtons";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  newProductData: productsData.newProductData,
  newProductImages: productsData.newProductImages,
  selectedOptions: productsData.newProductData.productOptions,
});

export default function ProductOnboardingStepperComponent() {
  // props=> description,images,options, product_type,published_scope,status,tags,title,variants,vendor

  const { currentUser, newProductData, newProductImages, selectedOptions } =
    useSelector(mapState);
  const productImages = newProductImages;
  const productOptionsfromRedux = newProductData.productOptions;
  const router = useRouter();
  const pageId = router.query.pageId;
  const step = router.query.step;
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

  const [fields, setFields] = useState([{ id: 0, value: null }]);

  const [productOptions, setProductoptions] = useState([
    {
      name: "",
      fields: [{ id: 0, value: null }],
    },
  ]);

  // console.log({ productOptions });

  const [loading, setLoading] = useState(false);

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setShowSelectedFile(true);
    setLoading(true);
    if (file) {
      // handleProductImageUpload(file);
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

    setSelectedFile("");
    setShowSelectedFile(false);
    setLoading(false);
  };
  useEffect(() => {
    setHasOptions(selectedOptions?.length > 0 || false);
  }, [selectedOptions.length]);

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
          enqueueSnackbar(json.message);
          setSelectedFile(null);

          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        enqueueSnackbar("Cannot complete action", {
          variant: "error",
        });
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

  const disableButton = loading || title?.length === 0;
  // productDescription.length === 0 ||
  // unitRetailPrice === 0;

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };

  const stepperData = {
    "general-info": {
      id: 0,
      label: "Product Details",
      step: "general-info",
      to: "price-info",
      toId: 1,
      component: (
        <>
          <ProductOnboardingGeneralInfoSection
            containerStyles={containerStyles}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            setTitle={setTitle}
            title={title}
          />
          <ProductOnboardingProductOrganizationSection
            collection={collection}
            productCategory={productCategory}
            productType={productType}
            setCollection={setCollection}
            setProductCategory={setProductCategory}
            setProductType={setProductType}
            setTags={setTags}
            tags={tags}
            containerStyles={containerStyles}
          />
        </>
      ),
    },

    "price-info": {
      id: 1,
      label: "Price",
      step: "price-info",
      to: "inventory-info",
      toId: 2,
      component: (
        <>
          <ProductOnboardingPriceInfoSection
            setUnitCostPrice={setUnitCostPrice}
            unitCostPrice={unitCostPrice}
            setUnitRetailPrice={setUnitRetailPrice}
            unitRetailPrice={unitRetailPrice}
            containerStyles={containerStyles}
          />
        </>
      ),
    },
    "inventory-info": {
      id: 2,
      label: "Inventory",
      step: "inventory-info",
      to: "variants",
      toId: 3,
      component: (
        <>
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
            containerStyles={containerStyles}
          />

          <ProductOnboardingShippingInfoSection
            setWeight={setWeight}
            setWeightUnit={setWeightUnit}
            weight={weight}
            weightUnit={weightUnit}
            containerStyles={containerStyles}
          />
        </>
      ),
    },
    variants: {
      id: 3,
      label: "Variants",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
      step: "variants",
      to: "media",
      toId: 4,
      component: (
        <>
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
            handleChangeProductOptionsFields={handleChangeProductOptionsFields}
            handleChangeProductOptionsName={handleChangeProductOptionsName}
            containerStyles={containerStyles}
          />
          {/* Variants Info */}
          {hasOptions &&
            Array.isArray(inventoriesToAdd) &&
            inventoriesToAdd?.length > 0 && (
              // && optionValues
              <ProductOnboardingVariantsInfoSection
                warehouseCount={warehouseList.length}
                items={inventoriesToAdd}
                containerStyles={containerStyles}
              />
            )}
        </>
      ),
    },
    media: {
      id: 4,
      label: "Product Media",
      step: "media",
      component: (
        <Box sx={{}}>
          <ProductOnboardingProductImagesSection
            handleDeleteThumbnail={handleDeleteThumbnail}
            handleFileSelect={handleFileSelect}
            inputRef={inputRef}
            placeholderImage={placeholderImage}
            productImages={productImages}
            containerStyles={containerStyles}
          />
          {/* <ProductOnboardingBottomActionButtons
						saveButtonTitle={"Save as Draft"}
						maxWidthPage="635px"
					/> */}
        </Box>
      ),
    },
  };
  const maxWidthPage = "635px";
  const allSteps = Object.values(stepperData);
  const StepComponent = step && stepperData[step].component;
  const currentStep = step && stepperData[step];
  const handleNextButton = (step) => {
    router.push(
      `/onboarding/products/${pageId}?step=${step.to}&id=${step.toId}`
    );
  };
  console.log({ ALLSTEPS: allSteps });
  return (
    <Box>
      {loading && <PageLoader />}

      <Box
        sx={{
          position: "sticky",
          top: "0px",
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
            flex: 1,
          }}
        >
          <Tooltip title="Go Back">
            <IconButton
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                borderRadius: "5px",
                ml: 3,
              }}
              onClick={() => router.back()}
            >
              <MdArrowBack />
            </IconButton>
          </Tooltip>
          <div style={{ flex: 0.5 }} />
          <SectionTitleText
            sx={{
              fontSize: "28px",
              lineHeight: "34px",
              textAlign: "center",
              flex: 1,
            }}
          >
            Create New Product
          </SectionTitleText>
          <div style={{ flex: 0.55 }} />
        </Box>
      </Box>
      <Box
        sx={{
          // position: "sticky",
          // top: "140px",
          background: (theme) => theme.palette.background.default,
          py: "16px",
          pt: "8px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* {Array.isArray(allSteps) && allSteps.length > 0 && (
					<StepperComponent
						steps={allSteps}
						basePath={`/onboarding/products/${pageId}`}
					/>
				)} */}
      </Box>

      <Box
        sx={{
          maxWidth: maxWidthPage,
          margin: "auto",
          paddingBottom: "80px",
        }}
      >
        {StepComponent}
        {/* {Array.isArray(allSteps) && allSteps.length > 0 && (
					<>
						{allSteps.map((item, index) => {
							if (item.step === step)
								return <> {item.component}</>;
						})}
					</>
				)} */}

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
            <OutlinedButton sx={{ flex: 1 }} onClick={() => resetForm()}>
              Discard changes
            </OutlinedButton>
            <PrimaryButton
              sx={{ flex: 1, ml: 1 }}
              onClick={() =>
                step === "media"
                  ? handleAddProduct("draft")
                  : handleNextButton(currentStep)
              }
              disabled={disableButton}
            >
              {step === "media" ? "Save as draft" : "Save & Continue"}
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

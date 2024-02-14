import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { BUNDLE, PRODUCT } from "constants/API_URL";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditProductDataStart,
  fetchProductDataStart,
  updateCreateProductData,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingGeneralInfoSection from "../ProductOnboardingSection/components/ProductOnboardingGeneralInfoSection";
import ProductOnboardingInventoryInfoSection from "../ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import ProductOnboardingPriceInfoSection from "../ProductOnboardingSection/components/ProductOnboardingPriceInfoSection";
import ProductOnboardingProductOrganizationSection from "../ProductOnboardingSection/components/ProductOnboardingProductOrganizationSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

import {
  updateBundleOnboardingSteps,
  updateComponentOnboardingSteps,
  updateProductOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import SaveAsDraftComponent from "./components/SaveAsDraftComponent";

const mapState = ({ user, productsData, onboardingData }) => ({
  currentUser: user.currentUser,
  productsData,
  onboardingData,
});
export default function NewProductOnboardingProductDetailsSection({
  keyForReduxStateData,
  hideContinueNavigation,
  usedIn = "productOnboarding",
  hideVariantQuestion,
  configObject = {},
  stepTitle = "",
}) {
  const { currentUser, productsData, onboardingData } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.productId;
  const step = router.query.step;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;

  const currentStepStatus = step && onboardingData[usedIn][step];
  console.log({ currentStepStatus });
  const createProductData = productsData[keyForReduxStateData];

  // state from redux store
  const productIdFromState = createProductData?.master_product_id;

  // useEffect(() => {
  //   if (pageId && productIdFromState !== pageId) {
  //     dispatch(setCreateProductData({}));
  //     dispatch(resetProductOnboardingSteps());
  //   }
  // }, [pageId, productIdFromState, dispatch]);

  const productHasVariantsFromState =
    createProductData?.is_component === true ? "no" : "yes";
  const titleFromState = createProductData?.product_title;
  const descriptionFromState = createProductData?.product_desc;

  const categoryFromState = createProductData?.category;
  const categoryWithLabel =
    Array.isArray(categoryFromState) &&
    categoryFromState.map((item) => ({
      label: item,
      value: item,
    }));

  const productTypeFromState = createProductData?.type;
  const productTypeWithLabel =
    Array.isArray(productTypeFromState) &&
    productTypeFromState.map((item) => ({
      label: item,
      value: item,
    }));

  const collectionFromState = createProductData?.collection;
  const collectionsWithLabel =
    Array.isArray(collectionFromState) &&
    collectionFromState.map((item) => ({
      label: item,
      value: item,
    }));

  const tagsFromState = createProductData?.tag ?? createProductData?.tags;
  const tagsWithLabel =
    Array.isArray(tagsFromState) &&
    tagsFromState.map((item) => {
      if (item.name) {
        return {
          label: item.name,
          value: item.value,
        };
      }
      return {
        label: item,
        value: item,
      };
    });

  const skuFromState = createProductData?.product_sku;
  const barcodeFromState = createProductData?.product_barcode;
  const unitRetailPriceFromState = createProductData?.unit_retail_price;
  const unitCostPriceFromState = createProductData?.unit_cost_price;

  // state objects in component
  const [productHasVariants, setProductHasVariants] = useState(
    productHasVariantsFromState ?? "no"
  );
  const [title, setTitle] = useState(titleFromState ?? "");
  const [productDescription, setProductDescription] = useState(
    descriptionFromState ?? ""
  );

  const [productCategory, setProductCategory] = useState(
    categoryWithLabel ?? []
  );
  const [productType, setProductType] = useState(productTypeWithLabel ?? []);
  const [tags, setTags] = useState(tagsWithLabel ?? []);
  const [collection, setCollection] = useState(collectionsWithLabel ?? []);

  const [loading, setLoading] = useState(false);

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

  const [sku, setSKU] = useState(skuFromState ?? "");
  const [productBarCode, setProductBarCode] = useState(barcodeFromState ?? "");
  const [unitRetailPrice, setUnitRetailPrice] = useState(
    unitRetailPriceFromState ?? ""
  );
  const [unitCostPrice, setUnitCostPrice] = useState(
    unitCostPriceFromState ?? ""
  );
  const setDataFromState = () => {
    setTitle(titleFromState ?? "");
    setProductDescription(descriptionFromState ?? "");
    setProductCategory(categoryWithLabel ?? []);
    setProductType(productTypeWithLabel ?? []);
    setTags(tagsWithLabel ?? []);
    setCollection(collectionsWithLabel ?? []);
    setSKU(skuFromState ?? "");
    setProductBarCode(barcodeFromState ?? "");
    setUnitRetailPrice(unitRetailPriceFromState ?? "");
    setUnitCostPrice(unitCostPriceFromState ?? "");
    setProductHasVariants(productHasVariantsFromState ?? "no");
  };
  useEffect(() => {
    setDataFromState();
    // if (pageId !== productIdFromState) {
    // }
  }, [pageId, productIdFromState]);

  const resetForm = () => {
    setTitle("");
    // setDescription("");
    setUnitRetailPrice("");
    setEditorState(EditorState.createEmpty());
    setLoading(false);
  };

  const getItemValues = (list) => {
    const data = (Array.isArray(list) && list.map((item) => item.value)) || [];
    return data;
  };
  const collectionsValues = getItemValues(collection);
  const tagsValues = getItemValues(tags);
  const productTypeValues = getItemValues(productType);
  const productCategoryValues = getItemValues(productCategory);

  // useEffect(() => {
  // 	dispatch(removeAllNewProductOptions());
  // 	dispatch(removeAllProductImages());
  // }, []);

  const handleBlurDescription = () => {
    // dispatch(setDraftSessionDescription(sessionDescription));
    setProductDescription(sessionDescription);
  };

  const handleChangeProductHasVariants = (e) => {
    setProductHasVariants(e.target.value);
    dispatch(
      updateCreateProductData({
        is_component: e.target.value === "no" ? true : false,
        hasVariants: e.target.value === "yes" ? true : false,
      })
    );

    // dispatch(setSelectedPublishableStore(e.target.value));
  };
  const URl_FOR_FETCH_PRODUCT = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
  const URL_FOR_FETCH_BUNDLE = BUNDLE.FETCH_BUNDLE;
  const dataForProduct = {
    master_product_id: pageId,
    user_id: currentUser.merchant_id,
  };

  const handleAddProduct = () => {
    const data = {
      user_id: currentUser.merchant_id,
      product_id: pageId,
      master_product_id: productIdFromState,
      product_desc: sessionDescription,
      product_title: title,
      status: "unlisted",
      category: productCategoryValues,
      type: productTypeValues,
      tags: tagsValues,
      tag: tagsValues,
      collection: collectionsValues,
      hasVariants: productHasVariants === "yes" ? true : false,
      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,
      product_sku: sku.toUpperCase(),
      product_barcode: productBarCode,
      is_component: productHasVariants === "no" ? true : false,
      isSellable: true,
      // images: createProductData?.images,
    };
    setLoading(true);
    if (usedIn === "productOnboarding") {
      const url = titleFromState
        ? PRODUCT.MERCHANT.UPDATE_PRODUCT
        : PRODUCT.MERCHANT.ADD_PRODUCT;

      // const data = {
      // 	user_id: currentUser.merchant_id,
      // 	product_id: pageId,
      // 	master_product_id: productIdFromState,
      // 	product_desc: sessionDescription,
      // 	product_title: title,
      // 	status: "draft",
      // 	category: productCategory.value,
      // 	type: productType.value,
      // 	tag: tagsValues,
      // 	collection: collectionsValues,
      // 	hasVariants: productHasVariants === "yes" ? true : false,
      // 	unit_retail_price: unitRetailPrice,
      // 	unit_cost_price: unitCostPrice,
      // 	product_sku: sku,
      // 	product_barcode: productBarCode,
      // };
      // await addProduct(data, enqueueSnackbar);

      appFetch(url, data)
        .then((json) => {
          setLoading(false);
          if (json.status === "success") {
            enqueueSnackbar("Product Added Successfully", {
              variant: "success",
            });
            if (data.is_component === true) {
              dispatch(
                updateComponentOnboardingSteps({
                  step: "general-info",
                  nextStep: "media",
                })
              );

              if (currentStepStatus === "in-progress") {
                dispatch(
                  updateComponentOnboardingSteps({
                    step: "general-info",
                    nextStep: "media",
                  })
                );
              }
            }

            if (currentStepStatus === "in-progress") {
              dispatch(
                updateProductOnboardingSteps({
                  step: "general-info",
                  nextStep: "media",
                })
              );
            }
            // if (titleFromState) {
            // 	return dispatch(updateCreateProductData(data));
            // }

            dispatch(
              fetchProductDataStart({
                url: URl_FOR_FETCH_PRODUCT,
                data: dataForProduct,
                keyForReduxStateData,
              })
            );
            handleNextButton();

            // dispatch(setCreateProductData(data));
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else if (usedIn === "bundleOnboarding") {
      const url = titleFromState ? BUNDLE.UPDATE_BUNDLE : BUNDLE.CREATE_BUNDLE;
      setLoading(true);
      appFetch(url, data)
        .then((json) => {
          setLoading(false);
          if (json.status === "success") {
            enqueueSnackbar("Bundle Created Successfully!", {
              variant: "success",
            });

            dispatch(
              updateBundleOnboardingSteps({
                step: "general-info",
                nextStep: "media",
              })
            );

            dispatch(
              fetchProductDataStart({
                url: URL_FOR_FETCH_BUNDLE,
                data: {
                  ...dataForProduct,
                  master_product_id: json.product_id || pageId,
                },
                keyForReduxStateData,
                resultKey: "bundle_list",
              })
            );
            router.push(
              `/app/products/create/bundle/${
                json.product_id || pageId
              }?step=media&id=1`
            );
            // handleNextButton();

            // dispatch(setCreateProductData(data));
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    if (pageId) {
      dispatch(
        fetchProductDataStart({
          url: URl_FOR_FETCH_PRODUCT,
          data: dataForProduct,
          keyForReduxStateData,
        })
      );
    }
  }, [pageId]);

  // disable the button if title is empty or contains only spaces, or if unitRetailPrice is 0, or if unitCostPrice is 0,
  // productCategory.value is empty or contains only spaces, or if productType.value is empty or contains only spaces
  // or if tagsValues is empty or contains only spaces, or if collectionsValues is empty or contains only spaces
  function hasSpaceCharacter(string) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] === " ") {
        return true;
      }
    }
    return false;
  }
  const disableButton =
    loading ||
    title?.length === 0 ||
    // unitRetailPrice === 0 ||
    // unitRetailPrice === undefined ||
    unitRetailPrice.length === 0 ||
    // unitCostPrice === 0 ||
    // unitCostPrice === undefined ||
    unitCostPrice.length === 0 ||
    parseInt(unitRetailPrice) < parseInt(unitCostPrice) ||
    !productCategory ||
    !productType ||
    !tags ||
    // productCategory.value?.length === 0 ||
    // productCategory?.valueOf === undefined ||
    // productType?.value?.length === 0 ||
    // tagsValues?.length === 0 ||
    // collectionsValues?.length === 0 ||
    productBarCode?.length === 0 ||
    hasSpaceCharacter(sku) ||
    productBarCode?.length > 13 ||
    sku?.length === 0;

  const disableButtonInBundleOnboarding =
    loading ||
    title?.length === 0 ||
    !productCategory ||
    // productCategory?.value?.length === 0 ||
    // productCategory?.value === undefined ||
    productBarCode?.length === 0 ||
    !productType ||
    !tags ||
    sku?.length === 0;

  const containerStyles = {
    padding: "2px",
    marginTop: "42px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };

  const handleNextButton = () => {
    router.push(`/app/products/create/product/${pageId}?step=media&id=1`);
  };
  // console.log({
  // 	tags,
  // 	collection,
  // 	productCategory,
  // 	productType,
  // 	tagsValues,
  // 	collectionsValues,
  // 	productHasVariants,
  // });
  const handleProductDetailsUpdate = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;

    const updateURL = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    const updateData = {
      user_id: currentUser.merchant_id,
      product_id: pageId,
      master_product_id: createProductData.master_product_id,
      product_desc: sessionDescription,
      product_title: title,
      status: createProductData.status, // "unlisted"
      category: productCategoryValues,
      type: productTypeValues,
      tag: tagsValues,
      tags: tagsValues,
      collection: collectionsValues,
      hasVariants: productHasVariants === "yes" ? true : false,
      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,
      product_sku: sku.toUpperCase(),
      product_barcode: productBarCode.toUpperCase(),
      images: (createProductData.images && createProductData.images) || [],
    };
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: createProductData.master_product_id,
    };

    setLoading(true);
    appFetch(updateURL, updateData)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Product Updated Successfully", {
            variant: "success",
          });
          dispatch(fetchEditProductDataStart({ url: URL, data }));

          // dispatch(updateCreateProductData(updateData));
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong!", {
          variant: "error",
        });
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const configGeneralInfo = {
    ...configObject,
  };

  const [openSaveAsDraftDialog, setOpenSaveAsDraftDialog] = useState(false);
  const [openLeavePageDialog, setOpenLeavePageDialog] = useState(false);
  const handleLeavePageDialogOpen = () => {
    setOpenLeavePageDialog(true);
  };
  const handleLeavePageDialogClose = () => {
    setOpenLeavePageDialog(false);
  };
  const handleLeavePageButtonClick = () => {
    // router.push("/app/products");

    if (usedIn === "bundleOnboarding") {
      setOpenLeavePageDialog(false);
      setLoading(true);

      router.push("/app/products?selectedProductType=bundle");
    } else {
      router.push("/app/products");
    }

    handleLeavePageDialogClose();
  };
  const handleSaveAsDraftDialogOpen = () => {
    setOpenSaveAsDraftDialog(true);
  };
  const handleSaveAsDraftDialogClose = () => {
    setOpenSaveAsDraftDialog(false);
  };

  const handleSaveAsDraftButtonClick = () => {
    const data = {
      user_id: currentUser.merchant_id,
      product_id: pageId,
      master_product_id: productIdFromState,
      product_desc: sessionDescription,
      product_title: title,
      status: "draft",
      category: productCategoryValues,
      type: productTypeValues,
      tags: tagsValues,
      tag: tagsValues,
      collection: collectionsValues,
      hasVariants: productHasVariants === "yes" ? true : false,
      unit_retail_price: unitRetailPrice,
      unit_cost_price: unitCostPrice,
      product_sku: sku,
      product_barcode: productBarCode,
      is_component: productHasVariants === "no" ? true : false,
      isSellable: true,
      images: (createProductData.images && createProductData.images) || [],
    };
    setLoading(true);
    if (usedIn === "productOnboarding") {
      const url = titleFromState
        ? PRODUCT.MERCHANT.UPDATE_PRODUCT
        : PRODUCT.MERCHANT.ADD_PRODUCT;

      appFetch(url, data)
        .then((json) => {
          setLoading(false);
          if (json.status === "success") {
            enqueueSnackbar("Product saved as draft", {
              variant: "success",
            });
            router.push(`/app/products`);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else if (usedIn === "bundleOnboarding") {
      const url = titleFromState ? BUNDLE.UPDATE_BUNDLE : BUNDLE.CREATE_BUNDLE;
      setLoading(true);
      appFetch(url, data)
        .then((json) => {
          setLoading(false);
          if (json.status === "success") {
            router.push(`/app/products?selectedProductType=bundle`);
            enqueueSnackbar("Bundle Saved as draft!", {
              variant: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const handleDiscardButtonClick = () => {
    const isUsedInEditBundle = usedIn === "editBundle";
    setDataFromState();

    setEditorState(myEditorState);
  };
  const BUNDLE_OR_PRODUCT =
    usedIn === "bundleOnboarding" ? "bundle" : "product";
  return (
    <Box>
      {loading && <PageLoader />}
      {/* <SuccessDialog
        icon={<AlertIconPO />}
        title={`Do you want to save ${BUNDLE_OR_PRODUCT} as draft?`}
        open={openSaveAsDraftDialog}
        handleClose={handleSaveAsDraftDialogClose}
        handlePrimaryButton={() => handleSaveAsDraftButtonClick()}
        primaryButtonTitle="Save as Draft"
        secondaryButtonTitle={"Cancel"}
        handleSecondaryButton={() => handleSaveAsDraftDialogClose()}
        description={`You can edit and publish ${BUNDLE_OR_PRODUCT} later`}
      /> */}
      <SuccessDialog
        icon={<AlertIconPO />}
        title={"Unsaved Changes?"}
        // title={`Do you want to save ${BUNDLE_OR_PRODUCT} as draft?`}
        open={openLeavePageDialog}
        handleClose={handleLeavePageDialogClose}
        handlePrimaryButton={() => handleLeavePageButtonClick()}
        primaryButtonTitle="Leave Page"
        primaryButtonProps={{
          color: "error",
        }}
        secondaryButtonTitle={"Save as Draft"}
        handleSecondaryButton={() => handleSaveAsDraftButtonClick()}
        // description={`You can edit and publish ${BUNDLE_OR_PRODUCT} later`}
        description={`Do you want to save this as a draft or discard the changes and leave this page?`}
      />

      <Box
        sx={{
          maxWidth: "800px",
          margin: hideContinueNavigation ? "0px" : "auto",
          pb: 8,
        }}
      >
        {stepTitle && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: "65px",
                py: 2,
                background: "white",
                zIndex: "300",
              }}
            >
              <SectionTitleText
                sx={{
                  color: (theme) => theme.palette.text.title,
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "39px",
                }}
              >
                {stepTitle}
              </SectionTitleText>
              {/* <SecondaryButton
                disabled={title === "" ? true : false}
                onClick={() => handleSaveAsDraftDialogOpen()}
              >
                Save as Draft
              </SecondaryButton> */}
              <SaveAsDraftComponent
                BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
                handleSaveAsDraftDialogOpen={handleSaveAsDraftDialogOpen}
                handleDiscardButtonClick={handleDiscardButtonClick}
                disableDraftButton={title === "" ? true : false}
                handleSaveAsDraftButtonClick={handleSaveAsDraftButtonClick}
                handleSaveAsDraftDialogClose={handleSaveAsDraftDialogClose}
                openSaveAsDraftDialog={openSaveAsDraftDialog}
              />
            </Box>
            <SectionTitleText
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "22px",

                color: "#222222",

                mt: 3,
              }}
            >
              {configObject.stepSubTitle}
            </SectionTitleText>
          </>
        )}
        {!hideVariantQuestion && (
          <Box
            sx={{
              py: 2,
              my: 2,
              borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: " 24px",
              }}
            >
              Does this product has variants ?
            </Typography>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={productHasVariants}
              onChange={handleChangeProductHasVariants}
              row
            >
              <FormControlLabel
                value={"yes"}
                control={<Radio />}
                label={"Yes"}
              />
              <FormControlLabel value={"no"} control={<Radio />} label={"No"} />
            </RadioGroup>
          </Box>
        )}{" "}
        <ProductOnboardingGeneralInfoSection
          containerStyles={{ ...containerStyles, mt: 2 }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          setTitle={setTitle}
          title={title}
          {...configGeneralInfo}
        />
        {/* <Divider
          sx={{
            mt: 6,
            mb: 4,
          }}
        /> */}
        {!configObject.hidePriceInfo && (
          <ProductOnboardingPriceInfoSection
            containerStyles={{ ...containerStyles }}
            setUnitCostPrice={setUnitCostPrice}
            unitCostPrice={unitCostPrice}
            setUnitRetailPrice={setUnitRetailPrice}
            unitRetailPrice={unitRetailPrice}
          />
        )}
        <ProductOnboardingInventoryInfoSection
          containerStyles={{ ...containerStyles }}
          barcode={productBarCode.toUpperCase()}
          setBarcode={setProductBarCode}
          setSKU={setSKU}
          sku={sku.toUpperCase()}
          hideSectionTitle={configObject.hideSectionTitle}
        />
        {/* <Divider
          sx={{
            mt: 6,
            mb: 4,
          }}
        /> */}
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
          hideSectionTitle={configObject.hideSectionTitle}
          categoryLabel={configObject.categoryLabel}
          typeLabel={configObject.typeLabel}
        />{" "}
      </Box>
      {!hideContinueNavigation && (
        <Box
          sx={{
            // position: "sticky",
            // top: "65px",
            position: "fixed",
            bottom: "0px",
            width: "82%",
            zIndex: (theme) => theme.zIndex.appBar,
            borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <NewProductOnboardingBottomNavButtons
            disableSaveButton={
              usedIn === "bundleOnboarding"
                ? disableButtonInBundleOnboarding
                : disableButton
            }
            discardButtonTitle={`Back to ${BUNDLE_OR_PRODUCT} `}
            discardButtonClick={
              () => handleLeavePageDialogOpen()
              //  router.push(`/app/products`)
            }
            saveButtonClick={() => handleAddProduct()}
            maxWidthPage={"800px"}
          />
        </Box>
      )}
      {hideContinueNavigation && (
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            width: "100%",
            ml: "-56px",
          }}
        >
          <NewProductOnboardingBottomNavButtons
            // disableSaveButton={
            //   usedIn === "editBundle"
            //     ? disableButtonInBundleOnboarding
            //     : disableButton
            // }
            saveButtonClick={() => handleProductDetailsUpdate()}
            saveButtonTitle={
              usedIn === "editBundle" ? "Update Bundle" : "Update Product"
            }
            discardButtonClick={() => handleDiscardButtonClick()}
            hideTitle
          />
        </Box>
      )}
    </Box>
  );
}

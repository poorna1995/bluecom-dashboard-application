import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductOnboardingProductImagesSection from "../ProductOnboardingSection/components/ProductOnboardingProductImagesSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
import imageCompression from "browser-image-compression";
import {
  addNewProductImages,
  deleteNewproductImage,
  fetchEditProductDataStart,
  updateCreateProductData,
} from "redux/products/productsSlice";
import { BUNDLE, PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { Box } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import {
  updateBundleOnboardingSteps,
  updateComponentOnboardingSteps,
  updateProductOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import SaveAsDraftComponent from "./components/SaveAsDraftComponent";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  // newProductImages: productsData.newProductImages,
  // createProductData: productsData.createProductData,
  productsData,
});
export default function NewProductOnboardingProductMediaSection({
  keyForReduxStateData,
  hideContinueNavigation,
  configObject = {},
  usedIn = "",
}) {
  const { currentUser, productsData } = useSelector(mapState);
  const productImages =
    Array.isArray(productsData[keyForReduxStateData]?.images) &&
    productsData[keyForReduxStateData]?.images;
  // ??
  // productsData.newProductImages;
  // createProductData?.images ?? newProductImages;
  const IS_COMPONENT =
    productsData[keyForReduxStateData]?.is_component === true;
  console.log("IS_COMPONENT", IS_COMPONENT);
  const router = useRouter();
  const pageId = router.query.productId;
  const step = router.query.step;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const USER_ID = currentUser.merchant_id;
  const createProductData = productsData[keyForReduxStateData];
  const primaryImageFromState = createProductData?.display_image;

  const [loading, setLoading] = useState(false);

  const inputRef = React.useRef();
  const [selectedFile, setSelectedFile] = React.useState("");
  const [showSelectedFile, setShowSelectedFile] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(
    primaryImageFromState ??
      (Array.isArray(productImages) && productImages[0]) ??
      ""
  );
  useEffect(() => {
    if (primaryImageFromState) {
      setPrimaryImage(primaryImageFromState);
    } else {
      setPrimaryImage((Array.isArray(productImages) && productImages[0]) ?? "");
    }
    // setPrimaryImage(primaryImageFromState ?? productImages[0] ?? "");
  }, [primaryImageFromState, productImages]);

  const handleFileSelect = async (e) => {
    // const file = e.target.files[0];
    const files = e.target.files;
    // setSelectedFile(file);
    setShowSelectedFile(true);
    // setLoading(true);
    console.log({ files });
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setLoading(true);
        compressImageAndUpload(e, file, USER_ID).then((res) => {
          console.log({ res });
          setLoading(false);

          if (res) {
            dispatch(
              addNewProductImages({
                image: res,
                keyForReduxStateData,
              })
            );
            return enqueueSnackbar("Image Uploaded Successfully!", {
              variant: "success",
            });
          }
          return enqueueSnackbar("Image Upload Failed", {
            variant: "error",
          });
        });
      }
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

  // useEffect(() => {
  // 	dispatch(removeAllNewProductOptions());
  // 	dispatch(removeAllProductImages());
  // }, []);

  // const compressImageAndUpload = async (e, file) => {
  // 	e.preventDefault();
  // 	const imageFile = file;
  // 	// console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  // 	// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  // 	// dispatch(setSectionLoading(true));
  // 	const options = {
  // 		maxSizeMB: 0.5,
  // 		maxWidthOrHeight: 1920,
  // 		useWebWorker: true,
  // 	};
  // 	try {
  // 		const compressedFile = await imageCompression(imageFile, options);
  // 		await handleProductImageUpload(compressedFile); // write your own logic
  // 	} catch (error) {
  // 		console.log(error);
  // 	}
  // };

  // const handleProductImageUpload = (file) => {
  // 	// setLoading(true);
  // 	const formData = new FormData();

  // 	formData.append("file", file);

  // 	const url = `https://api.bluecom.ai/api/mediaUpload?user_id=${USER_ID}&type=product_image&category=product_image`;
  // 	fetch(url, {
  // 		method: "POST",
  // 		body: formData,
  // 	})
  // 		.then((res) => res.json())
  // 		.then((json) => {
  // 			// console.log("File Upload", json);

  // 			if (json.status === "success") {
  // 				dispatch(
  // 					addNewProductImages({
  // 						image: `https://${json.file_url}`,
  // 						keyForReduxStateData,
  // 					}),
  // 				);
  // 				enqueueSnackbar(json.message);
  // 				setSelectedFile(null);

  // 				setLoading(false);
  // 			}
  // 		})
  // 		.catch((err) => {
  // 			console.error(err);
  // 			setLoading(false);
  // 			enqueueSnackbar("Cannot complete action", {
  // 				variant: "error",
  // 			});
  // 		});
  // };
  const handleDeleteThumbnail = (e, file_url) => {
    const url = "https://api.bluecom.ai/api/mediaUpload";
    const data = { file_url: file_url, user_id: USER_ID };
    // let arr = thumbnails.filter((item) => item !== file_url);
    // dispatch(deleteNewproductImage(file_url));

    setLoading(true);
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          setLoading(false);
          enqueueSnackbar(json.message, {
            variant: "success",
          });

          dispatch(
            deleteNewproductImage({
              image: file_url,
              keyForReduxStateData,
            })
          );
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
  const isUsedInBundle = usedIn === "bundleOnboarding";

  const handleAddProduct = async (status) => {
    const url = isUsedInBundle
      ? BUNDLE.UPDATE_BUNDLE
      : PRODUCT.MERCHANT.UPDATE_PRODUCT;

    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: pageId,

      display_image: primaryImage,
      images: productImages,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          setLoading(false);
          enqueueSnackbar(json.message);
          if (isUsedInBundle) {
            dispatch(
              updateBundleOnboardingSteps({
                step: "media",
                nextStep: "components",
              })
            );
            // dispatch(updateCreateBundleData(data));

            router.push(
              `/app/products/create/bundle/${pageId}?step=components&id=2`
            );
          } else {
            dispatch(updateCreateProductData(data));
            if (IS_COMPONENT) {
              dispatch(
                updateComponentOnboardingSteps({
                  step: "media",
                  nextStep: "select-vendor",
                })
              );
              return router.push(
                `/app/products/create/product/${pageId}?step=select-vendor&id=2`
              );
            } else {
              dispatch(
                updateProductOnboardingSteps({
                  step: "media",
                  nextStep: "variants",
                })
              );

              router.push(
                `/app/products/create/product/${pageId}?step=variants&id=2`
              );
            }
          }
        }
      })
      .catch((err) => console.error(err));
    // await addProduct(data, enqueueSnackbar);
    // router.push("/app/products");
  };
  const handleDispatch = () => {};

  const handleClickSelectPrimaryButton = (e, item) => {
    setPrimaryImage(item);
    enqueueSnackbar("Primary image updated", {
      variant: "success",
    });
  };

  // filter the productImages array to remove the primary image
  const filteredProductImages =
    Array.isArray(productImages) &&
    productImages.filter((item) => item !== primaryImage);

  const disableButton = loading;
  // || title?.length === 0;
  // productDescription.length === 0 ||
  // unitRetailPrice === 0;

  const containerStyles = {
    padding: "2px",
    marginTop: "0px",
    boxShadow: "none",
    border: "none",
    borderRadius: "0",
  };
  const handleProductDetailsUpdate = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;

    const updateURL = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    const updateData = {
      user_id: currentUser.merchant_id,
      master_product_id: createProductData.master_product_id,

      display_image: primaryImage ?? productImages[0],
      images: productImages,
    };
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: createProductData.master_product_id,
    };

    appFetch(updateURL, updateData).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar("Product Images Added Successfully!", {
          variant: "success",
        });
        dispatch(fetchEditProductDataStart({ url: URL, data }));

        // dispatch(updateCreateProductData(updateData));
      }
    });
  };

  console.log({ primaryImage });
  const sectionTitle = configObject.sectionTitle;
  const sectionTitleStyles = configObject.sectionTitleStyles;

  const handleBackButton = () => {
    if (isUsedInBundle) {
      return router.push(
        `/app/products/create/bundle/${pageId}?step=general-info&id=0`
      );
    }
    // return router.back();
    return router.push(
      `/app/products/create/product/${pageId}?step=general-info&id=0`
    );
  };

  const handleDiscardButtonClick = () => {};
  const [openSaveAsDraftDialog, setOpenSaveAsDraftDialog] = useState(false);

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
      master_product_id: createProductData.master_product_id,
      status: "draft",
      display_image: primaryImage || productImages[0] || "",
      images: productImages || [],
    };
    console.log({ data });
    setLoading(true);
    if (!isUsedInBundle) {
      const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

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
    } else if (isUsedInBundle) {
      const url = BUNDLE.UPDATE_BUNDLE;
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

  const BUNDLE_OR_PRODUCT =
    usedIn === "bundleOnboarding" ? "bundle" : "product";

  return (
    <Box>
      {loading && <PageLoader />}{" "}
      {/* {!hideContinueNavigation && (
				<NewProductOnboardingBottomNavButtons
					maxWidthPage={"800px"}
					saveButtonClick={() => handleAddProduct()}
					// saveButtonTitle={"Save "}
					disableSaveButton={productImages.length === 0}
				/>
			)} */}
      <Box
        sx={{
          maxWidth: "800px",
          margin: hideContinueNavigation ? "0px" : "auto",
          mt: 2,
        }}
      >
        {!hideContinueNavigation && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              position: "sticky",
              top: "65px",
              py: 2,
              background: "white",
              zIndex: "300",
            }}
          >
            <SectionTitleText
              sx={{
                // pb: 2,
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[200]}`,

                // mb: 2,
                // fontSize: "18px",
                // fontWeight: "600",
                color: (theme) => theme.palette.text.title,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "39px",

                ...sectionTitleStyles,
              }}
            >
              {sectionTitle ?? `Add media`} *
            </SectionTitleText>
            <SaveAsDraftComponent
              BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
              handleSaveAsDraftDialogOpen={handleSaveAsDraftDialogOpen}
              handleDiscardButtonClick={handleDiscardButtonClick}
              // disableDraftButton={
              // 	productImages === "" ||
              // 	productImages.length === 0
              // 		? true
              // 		: false
              // }
              handleSaveAsDraftButtonClick={handleSaveAsDraftButtonClick}
              handleSaveAsDraftDialogClose={handleSaveAsDraftDialogClose}
              openSaveAsDraftDialog={openSaveAsDraftDialog}
            />
          </Box>
        )}
        {hideContinueNavigation && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // mb: 2,
              // position: "sticky",
              // top: "65px",
              // py: 2,
              background: "white",
              zIndex: "300",
            }}
          >
            <SectionTitleText
              sx={{
                // pb: 2,
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[200]}`,

                // mb: 2,
                // fontSize: "18px",
                // fontWeight: "600",
                color: (theme) => theme.palette.primary.main,
                fontSize: "21px",
                fontWeight: "600",
                lineHeight: "39px",

                ...sectionTitleStyles,
              }}
            >
              {sectionTitle ?? `Add media`} *
            </SectionTitleText>
          </Box>
        )}
        {primaryImage && (
          <Box
            sx={{
              mb: 2,
              pb: 2,
              borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
            }}
          >
            <DescriptionText sx={{ mb: 2, fontSize: "16px", fontWeight: 500 }}>
              Primary Image
            </DescriptionText>
            <AppImage
              src={primaryImage}
              width={180}
              height={180}
              sx={{
                borderRadius: "10px",
                border: (theme) => `1px dashed ${theme.palette.grey[200]}`,
                aspectRatio: "1/1",
              }}
            />
          </Box>
        )}
        <ProductOnboardingProductImagesSection
          handleDeleteThumbnail={handleDeleteThumbnail}
          handleFileSelect={handleFileSelect}
          inputRef={inputRef}
          // placeholderImage={placeholderImage}
          productImages={filteredProductImages}
          containerStyles={containerStyles}
          handleSelectPrimaryButtonClick={handleClickSelectPrimaryButton}
          mediaTitleText={configObject.mediaTitleText}
          // title={`Additional Images`}
          // title="Add Media"
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
            maxWidthPage={"800px"}
            saveButtonClick={() => handleAddProduct()}
            saveButtonTitle={"Continue "}
            disableSaveButton={
              usedIn === "bundleOnboarding"
                ? !Array.isArray(productImages) || productImages.length === 0
                : Array.isArray(productImages) && productImages.length === 0
            }
            discardButtonTitle={`Previous Step`}
            discardButtonClick={() => handleBackButton()}
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
            disableSaveButton={disableButton}
            saveButtonClick={() => handleProductDetailsUpdate()}
            saveButtonTitle={"Update Product"}
            discardButtonClick={() => handleDiscardButtonClick()}
            hideTitle
          />
        </Box>
      )}
    </Box>
  );
}

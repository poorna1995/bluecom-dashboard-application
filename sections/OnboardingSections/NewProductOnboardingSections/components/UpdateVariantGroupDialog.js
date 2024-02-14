import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductOnboardingProductImagesSection from "sections/OnboardingSections/ProductOnboardingSection/components/ProductOnboardingProductImagesSection";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function UpdateVariantGroupDialog({
  open,
  handleClose,
  row = {},
  handleFetchProductData = () => {},
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId || router.query.productId;
  const title = open && row && row.original?.product_title;
  const item_title = open && row && row.original?.item_title;
  const [values, setValues] = useState({
    item_unit_cost_price: row.original?.item_unit_cost_price,
    item_unit_retail_price: row.original?.item_unit_retail_price,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(row.original.images ?? []);
  const [primaryImage, setPrimaryImage] = useState(
    row.original.item_display_image ?? row.original.display_image ?? ""
  );

  const handleSelectPrimaryButtonClick = (e, image) => {
    setPrimaryImage(image);
  };
  // const item_unit_cost_price = open && row.original.item_unit_cost_price;
  // const item_unit_retail_price =
  // 	open && row.original.item_unit_retail_price;
  console.log({ row });
  const handleFileSelect = async (e) => {
    // const file = e.target.files[0];
    const files = e.target.files;
    // setSelectedFile(file);
    // setShowSelectedFile(true);
    setIsLoading(true);
    console.log({ files });
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // setLoading(true);
        compressImageAndUpload(e, file, currentUser.merchant_id).then((res) => {
          console.log({ res });
          setIsLoading(false);

          if (res) {
            // set the images as res, manage the prev state

            setImages((prev) => [...prev, res]);
            // dispatch(
            // 	addNewProductImages({
            // 		image: res,
            // 		keyForReduxStateData,
            // 	}),
            // );
            return enqueueSnackbar("Image Added Successfully", {
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

  const handleRemoveImage = (e, image) => {
    //  remove the image from images array

    setImages((prev) => prev.filter((item) => item !== image));
  };
  const handleChangeValues = (e, key) => {
    setValues({ ...values, [key]: e.target.value });
  };
  const getMasterItemIdsRecursively = (row) => {
    if (Array.isArray(row.subRows) && row.subRows.length > 0) {
      return row.subRows
        .map((item) => {
          return getMasterItemIdsRecursively(item);
        })
        .flat();
    } else {
      return [row.original?.master_item_id];
    }
  };
  const masterItemIdList = getMasterItemIdsRecursively(row);
  console.log({ masterItemIdList });
  const productsList = masterItemIdList.map((item) => {
    return {
      master_product_id: pageId,
      item_unit_cost_price: values.item_unit_cost_price,
      item_unit_retail_price: values.item_unit_retail_price,
      master_item_id: item,
      images,
      item_display_image: primaryImage,
    };
  });

  const handleClickSaveButton = (e) => {
    const URL = PRODUCT.MERCHANT.UPDATE_VARIANT_GROUPS;
    const data = {
      user_id: currentUser.merchant_id,
      products: productsList,
    };
    setIsLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);

        if (json.status === "success") {
          handleFetchProductData();
          console.log({ json });
          handleClose();
        }
      })
      .catch((error) => {
        console.log({ error });
        setIsLoading(false);
      });
  };
  console.log({ row });

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      // hideCloseButton={true}
      title={`Update all the grouped variants `}
    >
      <Box
        sx={{
          maxWidth: "920px",
          minWidth: "920px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {isLoading && <PageLoader />}
        <SectionTitleText sx={{ mt: 2, fontSize: "20px" }}>
          {title}
        </SectionTitleText>
        <Box sx={{ maxWidth: "920px", mt: 2 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Applying on: {item_title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              pb: 2,
              mt: 2,
              gap: 3,
              mb: 2,
            }}
          >
            <TextInput
              value={values.item_unit_cost_price}
              title={`Enter Cost Price`}
              onChange={(e) => handleChangeValues(e, "item_unit_cost_price")}
              helperText={`Cost Price should be less than Retail Price`}
            />
            <TextInput
              value={values.item_unit_retail_price}
              title={`Enter Retail Price`}
              onChange={(e) => handleChangeValues(e, "item_unit_retail_price")}
            />
          </Box>
          {primaryImage && (
            <Box
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <DescriptionText
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
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
            productImages={images}
            // title={"Variant Images"}
            handleFileSelect={handleFileSelect}
            handleSelectPrimaryButtonClick={handleSelectPrimaryButtonClick}
            handleDeleteThumbnail={handleRemoveImage}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PrimaryButton
              onClick={(e) => handleClickSaveButton(e)}
              sx={{
                my: 4,
                width: "200px",
              }}
              disabled={
                Number(values.item_unit_retail_price) <
                Number(values.item_unit_cost_price)
              }
            >
              Update
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
      {/* {title} */}
    </BaseDialog>
  );
}

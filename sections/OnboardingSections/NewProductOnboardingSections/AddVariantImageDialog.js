import { Box } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductImages } from "redux/products/productsSlice";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import ProductOnboardingProductImagesSection from "../ProductOnboardingSection/components/ProductOnboardingProductImagesSection";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import AppImage from "components/Common/AppImage";

const mapState = ({ productsData, user }) => ({
  productsData,
  currentUser: user.currentUser,
});

export default function AddVariantImageDialog({
  open,
  handleClose,
  handleSaveButton,
  handleSelectImageClick,
  keyForReduxStateData,
  selectedVariantImage,
}) {
  const { productsData, currentUser } = useSelector(mapState);
  const productImages = productsData[keyForReduxStateData]?.images ?? [];
  const inputRef = React.useRef();
  const [selectedFile, setSelectedFile] = React.useState("");
  const USER_ID = currentUser.merchant_id;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState(
    selectedVariantImage || null
  );
  console.log({ selectedVariantImage });
  useEffect(() => {
    // if (open) {
    setSelectedImage(selectedVariantImage);
    // }
  }, [selectedVariantImage]);
  const handleFileSelect = async (e) => {
    // const file = e.target.files[0];
    const files = e.target.files;
    // setSelectedFile(file);
    // setLoading(true);
    console.log({ files });
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // setLoading(true);
        compressImageAndUpload(e, file, USER_ID).then((res) => {
          console.log({ res });
          dispatch(
            addNewProductImages({
              image: res,
              keyForReduxStateData,
            })
          );
          // setLoading(false);
        });
      }
    }
  };
  const handleSelectImage = (e, image) => {
    setSelectedImage(image);
    console.log({ image });
  };
  const handleClickSaveButton = (e) => {
    handleSelectImageClick(e, selectedImage);
    console.log({ selectedImage });
  };

  // const showProductImages = productImages.map((item) => {
  // 	return {
  // 		...item,
  // 		isSelected: item.id === selectedImage?.id,
  // 	};
  // });
  const primaryImage = selectedImage;
  const filterProductImages =
    Array.isArray(productImages) &&
    productImages.filter((item) => item !== primaryImage);
  return (
    <BaseDialog open={open} handleClose={handleClose}>
      <Box
        sx={{
          minWidth: "800px",
          maxWidth: "800px",
          margin: "auto",
          width: "100%",
        }}
      >
        <SectionTitleText>Update Variant Image</SectionTitleText>
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

        <Box>
          <ProductOnboardingProductImagesSection
            productImages={filterProductImages}
            hideDeleteButton
            primaryButtonTitle={"Select Image"}
            handleSelectPrimaryButtonClick={handleSelectImage}
            inputRef={inputRef}
            handleFileSelect={handleFileSelect}
            selectedImage={selectedImage}
          />
        </Box>
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <OutlinedButton onClick={() => handleClose()}>Cancel</OutlinedButton>
          <PrimaryButton
            sx={{
              ml: 2,
            }}
            onClick={(e) => handleClickSaveButton(e)}
          >
            Save
          </PrimaryButton>
        </Box>
      </Box>
    </BaseDialog>
  );
}

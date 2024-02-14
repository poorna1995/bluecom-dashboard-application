/* eslint-disable @next/next/no-img-element */
import { Box, Button, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";
import placeholderImage from "public/assets/placeholder/upload-image.png";
import BaseDialog from "components/Common/Dialog";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SuccessDialogForPO from "../../PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
export default function ProductOnboardingProductImagesSection({
  productImages,
  inputRef,
  handleFileSelect,
  // placeholderImage,
  handleDeleteThumbnail,
  containerStyles,
  title,
  handleSelectPrimaryButtonClick,
  hideDeleteButton,
  primaryButtonTitle,
  mediaTitleText,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = (e, item) => {
    setOpenDialog(true);
    setSelectedItem(item);
  };
  const handleDeleteButton = (e, item) => {
    handleDeleteThumbnail(e, item);

    setOpenDialog(false);
  };
  return (
    <ProductOnboardingSectionContainer
      containerStyles={containerStyles}
      title={title}
      // sx={{
      // 	padding: "16px",
      // 	marginTop: "16px",
      // 	border: "1px solid rgba(0,0,0,0.1)",
      // 	boxShadow: "none",
      // }}
    >
      <DescriptionText
        sx={{
          paddingBottom: "16px",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "19px",
        }}
      >
        {mediaTitleText ?? `Images`}
      </DescriptionText>
      {/* <Divider sx={{ marginBottom: "16px" }} /> */}

      <Grid container spacing={2}>
        {Array.isArray(productImages) &&
          productImages.length > 0 &&
          productImages.map((item, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={3} sx={{}}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    height: 180,
                    width: 180,
                    overflow: "hidden",

                    position: "relative",
                    "&:hover": {
                      "& .image_delete_icon": {
                        display: "block",
                        borderRadius: "10px",
                      },
                      "& .image_select_primary_button": {
                        display: "block",
                        borderRadius: "10px",
                      },
                    },
                  }}
                >
                  <AppImage
                    width="180"
                    height="180"
                    src={item}
                    // sx={{objectFit:"cover"}}
                    alt="product image"
                    // style={{
                    // 	width: "100%",
                    // 	maxWidth: "100%",
                    // 	maxHeight: "200px",
                    // 	objectFit: "cover",
                    // }}
                    sx={{
                      borderRadius: "10px",
                      // objectFit: "contain",
                      aspectRatio: "1/1",
                    }}
                    // objectFit="contain"
                  />
                  {!hideDeleteButton && (
                    <Box
                      className="image_delete_icon"
                      sx={{
                        display: "none",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 100,
                      }}
                    >
                      <Tooltip title={`Delete`}>
                        <IconButton
                          sx={{
                            background: "rgba(255,255,255,0.4)",
                            color: "white",
                          }}
                          onClick={(e) => handleOpenDialog(e, item)}
                        >
                          <MdDeleteOutline />
                          {/* <DeleteIcon /> */}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  <Box
                    className="image_select_primary_button"
                    sx={{
                      display: "none",
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      background: "rgba(0,0,0,0.4)",
                      top: "0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "end center",
                        height: "100%",
                        color: "white",
                      }}
                    >
                      <Button
                        sx={{
                          background: "rgba(255,255,255,0.4)",
                          color: "white",
                          borderRadius: "30px",
                          fontWeight: 600,
                          fontSize: "12px",
                          height: "28px",
                          textTransform: "capitalize",
                          marginBottom: 2,
                        }}
                        size="small"
                        onClick={(e) => handleSelectPrimaryButtonClick(e, item)}
                      >
                        {primaryButtonTitle || `Select as Primary`}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        <Grid item md={3} sm={6} xs={12}>
          <Box
            sx={{
              // borderRadius: "10px",
              // border: "1px solid rgba(0,0,0,0.1)",
              height: 180,
              width: 180,
              overflow: "hidden",

              position: "relative",
              // border: "1px dashed #D0D5DD",
              borderRadius: "5px",

              "&:hover": {
                "& .image_select_primary_button": {
                  display: "block",
                  borderRadius: "5px",
                },
              },
            }}
          >
            <label
              className="custom-file-upload image_select_primary_button"
              style={{
                display: "inline-block",
                // padding: "6px 12px",
                cursor: "pointer",
                // marginBottom: "16px",
                position: "absolute",
                height: "100%",
                width: "100%",
                // background: "rgba(0,0,0,0.1)",
                top: "0",
                border: "none",
              }}
            >
              <AppImage
                src={placeholderImage}
                sx={{
                  // width: "100%",
                  // maxWidth: "100%",
                  // maxHeight: "200px",
                  // objectFit: "contain",
                  // height: "140px",
                  // minHeight: "160px",
                  border: "none",
                }}
                alt=""
                height="180"
                width="180"
                objectFit="cover"
              />
              <input
                type="file"
                accept="image/png, image/webp, image/jpeg"
                // style={{
                // 	display: "none",
                // }}
                multiple
                hidden
                // disabled={img.length >= 5}
                ref={inputRef}
                // value={selectedFile}
                onChange={(e) => handleFileSelect(e)}
                className="image_select_input"
                style={{
                  display: "none",
                }}
              />

              {/* Browse File */}
            </label>
            <Box
              className="image_select_primary_button"
              sx={{
                display: "none",
                position: "absolute",
                height: "100%",
                width: "100%",
                background: "rgba(0,0,0,0.1)",
                top: "0",
                cursor: "pointer",
                border: "none",
              }}
              component="label"
              // onChange={(e) => handleFileSelect(e)}
            >
              <input
                type="file"
                accept="image/png, image/webp, image/jpeg"
                // style={{
                // 	display: "none",
                // }}
                multiple
                hidden
                // disabled={img.length >= 5}
                ref={inputRef}
                // value={selectedFile}
                onChange={(e) => handleFileSelect(e)}
                className="image_select_input"
                style={
                  {
                    // display: "none",
                  }
                }
              />
              {/* <Box
								sx={{
									display: "grid",
									placeItems: "end center",
									height: "100%",
									color: "white",
								}}
							></Box> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <BaseDialog
        open={openDialog}
        handleClose={() => handleCloseDialog()}
        hideCloseButton={true}
      >
        <SectionTitleText sx={{ mt: 4 }}>
          Do you want to delete this image?
        </SectionTitleText>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
            marginBottom: "32px",
          }}
        >
          <OutlinedButton onClick={() => handleCloseDialog()}>
            Cancel
          </OutlinedButton>
          <PrimaryButton
            onClick={(e) => handleDeleteButton(e, selectedItem)}
            sx={{
              ml: 2,
              backgroundColor: "#D92D20",
              "&:hover": {
                background: "#d91304",
              },
            }}
          >
            Delete
          </PrimaryButton>
        </div>
      </BaseDialog> */}
      <SuccessDialogForPO
        open={openDialog}
        icon={<AlertIconPO />}
        onCancel={() => handleCloseDialog()}
        handleClose={() => handleCloseDialog()}
        hideCloseButton={true}
        title="Do you want to delete this image?"
        message="This action cannot be undone."
        primaryButtonName={"Delete"}
        secondaryButtonName={"Cancel"}
        onDelete={(e) => handleDeleteButton(e, selectedItem)}
        handleSecondaryButton={() => handleCloseDialog()}
        primaryButtonProps={{
          sx: {
            flex: 1,
            ml: 2,
            backgroundColor: "#D92D20",
            "&:hover": {
              backgroundColor: "#D92D20",
            },
          },
        }}
      />
    </ProductOnboardingSectionContainer>
  );
}

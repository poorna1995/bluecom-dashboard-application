import { Box, IconButton } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import { MdClose } from "react-icons/md";

export default function PublishPageDrawerHeader({
  productTitle,
  edit,
  handleEditButtonClick,
  handleCloseDrawer,
  handleSaveChanges,
}) {
  return (
    <Box
      sx={{
        padding: "12px",
        display: "flex",
        flex: 1,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: (theme) => theme.zIndex.drawer + 10000,
      }}
    >
      <SectionTitleText sx={{ mt: "8px" }}>Review Product</SectionTitleText>
      {/* <SectionTitleText>{productTitle}</SectionTitleText> */}
      <div style={{ flex: 1 }} />
      {edit ? (
        <>
          {/* <PrimaryButton onClick={handleSaveChanges}>
						Save Changes
					</PrimaryButton> */}
        </>
      ) : (
        <OutlinedButton onClick={handleEditButtonClick}>
          Edit Product Details
        </OutlinedButton>
      )}
      <IconButton onClick={handleCloseDrawer} sx={{ marginLeft: "16px" }}>
        <MdClose />
      </IconButton>
    </Box>
  );
}

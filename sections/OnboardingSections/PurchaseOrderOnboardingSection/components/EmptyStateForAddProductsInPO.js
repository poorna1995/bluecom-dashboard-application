import { Box, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import AddIconPO from "components/Common/Icons/POicons/AddIconPO";
import TagPO from "components/Common/Icons/POicons/TagPO";
import React from "react";

function EmptyStateForAddProductsInPO({ onClick, fill, disabled }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 6,
          flexDirection: "column",
        }}
      >
        {/* <TagPO /> */}
        <ProductEmptyState />
        <Typography
          sx={{
            mt: 2,
            fontWeight: "700",
          }}
        >
          Add Purchase Order Line Items
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: "#595959",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Click Below to Add a Product/Variant
        </Typography>

        <OutlinedButton
          sx={{
            // borderRadius: "28px",
            mt: 2,
            mb: 6,
            ...(disabled && {
              borderColor: "#D0D5DD",
            }),
          }}
          // startIcon={<AddIconPO fill={fill} />}
          onClick={onClick}
          disabled={disabled}
        >
          Add Product/Variant
        </OutlinedButton>
      </Box>
    </>
  );
}

export default EmptyStateForAddProductsInPO;

import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import MobileViewProductsList from "./MobileViewProductsList";
import MobileViewProductsListPagination from "./MobileViewProductsListPagination";
import MobileViewProductsListSkeleton from "./MobileViewProductsListSkeleton";
export default function MobileViewProductsPageSection({
  hasStepOnboarding,
  title,
  // showFilters
  tableData = [],
  gridData,
  // views={["list", "grid"]}
  handleChangeView,
  pageView,
  loading,
  rowIdkey,
  columnData,
  handleCreateButtonClick,
  handlePublishButtonClick,
  hasCustomClickFunction,
  bundlesTableData,
  showBundleViewButton,
  selectedProductType,
  handleFetchBundlesData,
  totalCount,
  basePath,
  renderEmptyRowsFallback,
  shallUseRouter,
}) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          mx: 2,
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          pb: 2,
          borderBottom: `1px solid rgba(17, 17, 17, 0.10)`,
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontFamily: " Inter",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          {" "}
          All Products
        </Typography>
        <PrimaryButton>Add Product</PrimaryButton>
      </Box>
      <Box>
        {loading ? (
          <MobileViewProductsListSkeleton />
        ) : (
          <MobileViewProductsList data={tableData} />
        )}
        {/* <MobileViewProductsList data={tableData} /> */}
      </Box>
      <Box>
        <MobileViewProductsListPagination
          basePath={basePath}
          totalRows={totalCount}
          shallUseRouter={true}
        />
      </Box>
    </div>
  );
}

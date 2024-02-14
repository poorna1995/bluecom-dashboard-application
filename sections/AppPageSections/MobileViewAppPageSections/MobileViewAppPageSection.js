import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import MobileViewListSkeleton from "./MobileViewListSkeleton";
import MobileViewListPagination from "./MobileViewListPagination";
import MobileViewList from "./MobileViewList";
import MobileAppHelperDrawer from "components/Common/Drawer/MobileAppHelperDrawer";
export default function MobileViewAppPageSection({
  title,
  tableData = [],
  loading,
  handleCreateButtonClick,
  totalCount,
  basePath,
  component,
  buttonTitle,
  hideButton,
  shallUseRouter,
  skeletonComponent,
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleClickButton = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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
          {title || "All Products"} ({totalCount || 0})
        </Typography>
        {!hideButton && (
          <PrimaryButton onClick={handleClickButton}>
            {buttonTitle || "Add Product"}
          </PrimaryButton>
        )}{" "}
      </Box>
      <Box>
        {loading ? (
          <MobileViewListSkeleton component={skeletonComponent} />
        ) : (
          <MobileViewList data={tableData} component={component} />
        )}
        {/* <MobileViewProductsList data={tableData} /> */}
      </Box>
      <Box>
        <MobileViewListPagination
          basePath={basePath}
          totalRows={totalCount}
          shallUseRouter={true}
        />
      </Box>
      <MobileAppHelperDrawer
        openDrawer={openDrawer}
        handleClose={handleDrawerClose}
      />
    </div>
  );
}

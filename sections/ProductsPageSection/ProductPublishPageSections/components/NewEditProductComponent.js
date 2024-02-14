import BasicTabs from "components/Common/Tabs/BasicTabs";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProductDataStart } from "redux/products/productsSlice";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingVariantLevelInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import NewProductOnboardingVariantsInfoSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantsInfoSection";
import PublishPageDrawerHeader from "./PublishPageDrawerHeader";
import { Box } from "@mui/material";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";

const mapState = ({ user, productsData, views }) => ({
  currentUser: user.currentUser,
  productsData,
  isLoading: views.isLoading,
});
export default function NewEditProductComponent({
  productTitle,
  handleEditButtonClick,
  handleCloseDrawer,
}) {
  const router = useRouter();
  const { productId } = router.query;

  const edit = router.query.edit;
  const { currentUser, productsData, isLoading } = useSelector(mapState);
  const { editProductData } = productsData;

  const dispatch = useDispatch();
  const handleFetchProductData = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    dispatch(fetchEditProductDataStart({ url: URL, data }));
  };
  const IS_COMPONENT = editProductData?.is_component === true;

  useEffect(() => {
    if (productId) {
      handleFetchProductData();
    }
    // console.log("productId", productId);
  }, [productId]);
  const staticData = [
    {
      label: "Product Details",

      component: (
        <Box
          sx={{
            mt: -6,
          }}
        >
          <NewProductOnboardingProductDetailsSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
            hideVariantQuestion
          />
        </Box>
      ),
      route: `general-info`,
      show: true,
    },
    {
      label: "Product Media",
      component: (
        <Box
          sx={{
            mt: -6,
          }}
        >
          <NewProductOnboardingProductMediaSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
          />
        </Box>
      ),
      route: `product-media`,
      show: true,
    },
    {
      label: "Variants",
      component: (
        <Box
          sx={{
            mt: -4,
          }}
        >
          <NewProductOnboardingVariantsInfoSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
          />
        </Box>
      ),
      route: `options-variants`,
      show: !IS_COMPONENT,
    },
    {
      label: "Inventory",
      component: (
        <Box
          sx={{
            mt: -4,
          }}
        >
          <NewProductOnboardingVariantLevelInventorySection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
          />
        </Box>
      ),
      route: `inventory`,
      show: true,
    },
  ];
  const filterStaticData = staticData.filter((item) => item.show);

  return (
    <div
      style={{
        paddingBottom: "64px",
      }}
    >
      {isLoading && <PageLoader />}

      <PublishPageDrawerHeader
        edit={edit}
        handleCloseDrawer={handleCloseDrawer}
        handleEditButtonClick={handleEditButtonClick}
        productTitle={`Edit Product Details`}
        handleSaveChanges={() => handleUpdateProduct()}
      />

      <BasicTabs
        data={filterStaticData}
        tabContainerStyles={{
          pl: "16px",
          position: "sticky",
          top: "64.5px",
          background: "#fff",
          py: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        basePath={`/app/products/edit/${productId}`}
      />
    </div>
  );
}

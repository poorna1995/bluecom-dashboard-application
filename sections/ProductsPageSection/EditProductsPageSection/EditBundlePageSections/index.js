import { Box, IconButton } from "@mui/material";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProductDataStart } from "redux/products/productsSlice";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingVariantLevelInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import AddComponentsToBundleSection from "sections/ProductsPageSection/CreateProductPageSection/CreateBundlePageSection/AddComponentsToBundleSection";
import appFetch from "utils/appFetch";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  productsData,
});

export default function EditBundlePageSection() {
  const router = useRouter();
  const { productId } = router.query;
  const { currentUser, productsData } = useSelector(mapState);
  const { editProductData } = productsData;
  const CREATE_PRODUCT_DATA = "editProductData";

  const dispatch = useDispatch();
  const handleFetchProductData = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    dispatch(fetchEditProductDataStart({ url: URL, data }));
  };
  useEffect(() => {
    if (productId) {
      handleFetchProductData();
    }
    // console.log("productId", productId);
  }, [productId]);
  const staticData = [
    {
      label: "Bundle Details",

      component: (
        <>
          <NewProductOnboardingProductDetailsSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
            hideVariantQuestion
            usedIn="editBundle"
            configObject={{
              hideSectionTitle: true,
              descriptionLabel: `Description`,
              titleLabel: `Title`,
              hidePriceInfo: true,
              // hideInventoryTitle: true,
              categoryLabel: "Category",
              tagsLabel: "Tags",
              typeLabel: "Type",
              stepSubTitle: "General",
            }}
          />
        </>
      ),
      route: `general-info`,
    },
    {
      label: "Bundle Media",
      component: (
        <Box sx={{ paddingBottom: "128px" }}>
          <NewProductOnboardingProductMediaSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
          />
        </Box>
      ),
      route: `bundle-media`,
    },
    {
      label: "Bundle Components",

      component: (
        <Box
          sx={{
            paddingBottom: "128px",
          }}
        >
          <AddComponentsToBundleSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
            usedIn={"editBundle"}
            hideUpdateButtonRow
            isEditPage={true}
          />
          {/* <ProductOnboardingBottomActionButtons
                              saveButtonTitle={"Save as Draft"}
                              maxWidthPage="635px"
                          /> */}
        </Box>
      ),

      route: `components`,
    },
  ];
  const handleClickSaveButton = () => {
    // console.log("save button clicked");
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      ...editProductData,
    };
    appFetch(URL, data)
      .then((res) => {
        if (res.status === "success") {
          handleFetchProductData();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box
      sx={
        {
          // maxWidth: "1200px",
          // margin: "auto",
        }
      }
    >
      <Box
        sx={{
          mt: 2,
          ml: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            background: "#fff",
            top: "112px",
            width: "100%",
            // width: "100%",
            // height: "50px",

            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            alignItems: "center",
            py: 2,
          }}
        >
          {/* add arrow emoji */}
          <IconButton
            onClick={() =>
              router.push(
                `/app/products/${productId}?productType=bundle&tab=overview`
              )
            }
            sx={{
              mr: 2,
            }}
          >
            <MdArrowBack />
          </IconButton>
          <SectionTitleText
            sx={{
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "34px",
              // mt: 2,
              color: "#484A9E",
            }}
          >
            Edit Product details
          </SectionTitleText>
        </Box>

        {/* <PrimaryButton onClick={() => handleClickSaveButton()}>
                      Save
                  </PrimaryButton> */}
      </Box>
      <RouterTabs
        data={staticData}
        tabContainerStyles={{
          pl: "16px",
          position: "sticky",
          top: "180px",
          background: "#fff",
          py: 1,

          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        basePath={`/app/products/edit/${productId}?productType=bundle`}
        isTabAfterQuery={true}
      />
    </Box>
  );
}

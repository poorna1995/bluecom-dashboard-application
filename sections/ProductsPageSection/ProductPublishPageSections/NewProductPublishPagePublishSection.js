import { Box, IconButton, Stack } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import ProductsDetailsPageSection from "../ProductsDetailsPageSection";
import EditProductComponent from "./components/EditProductComponent";
import NewEditProductComponent from "./components/NewEditProductComponent";
import PreviewProductComponent from "./components/PreviewProductComponent";
import PublishPageCard from "./components/PublishPageCard";
import PublishPageDrawerHeader from "./components/PublishPageDrawerHeader";
import PublishPageNavBar from "./components/PublishPageNavBar";
import ProductGridItemCard from "../ProductGridItemCard";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import { updateSingleProductPublishOnboardingSteps } from "redux/onboarding/onboardingSlice";
import { handleFetchProductsList } from "../ProductsListPageSections/apiHelpers/handleFetchProductsList";
import PublishProductFieldsDialog from "./components/PublishProductFieldsDialog";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import InfoIcon from "components/Common/Icons/StoreIcons/InfoIcon";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";

// mapstate user data
const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
  selectedStore: productsData?.selectedStore,
});
export default function NewProductPublishPagePublishSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  // get the product id from the router
  const router = useRouter();
  const publishProductID = router.query.publishProductID;
  // use the useSelector hook to get the user data from the redux store
  const { currentUser, selectedStore } = useSelector(mapState);
  const productId = router.query.productId;
  const drawerOpen = router.query.drawerOpen;
  const edit = router.query.edit;
  // create a state to store the product list
  const [productList, setProductList] = React.useState([]);
  // create a state to store the product details
  const [productDetails, setProductDetails] = React.useState({});
  const [openDrawer, setOpenDrawer] = React.useState(drawerOpen);
  const requestUrl = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;
  const [isLoading, setIsLoading] = React.useState(false);

  //  use react query to fetch reviewed products details
  const {
    data: reviewedProduct,
    isLoading: isReviewedProductLoading,
    error: error1,
    refetch: refetchReviewedProduct,
  } = useQuery({
    queryKey: ["reviewProduct", publishProductID],
    queryFn: () =>
      appFetch(requestUrl, {
        user_id: currentUser.merchant_id,
        master_product_id: [publishProductID],
      }).then((json) => json.result[0]),
  });

  const { data: connectedApps } = useQuery({
    queryKey: ["connectedApps"],
    queryFn: () =>
      appFetch(CHANNEL.FETCH_CONNECTED_APPS, {
        user_id: currentUser.merchant_id,
      }).then((json) => json.result),
  });
  const getConnectedStoreInfo =
    Array.isArray(connectedApps) &&
    connectedApps.filter((app) => {
      return app.shop === selectedStore;
    });
  // console.log({ getConnectedStoreInfo });
  const connectedStoreInfo =
    getConnectedStoreInfo.length > 0 && getConnectedStoreInfo[0];

  // console.log({ reviewedProducts, reviewedProduct });

  const formattedReviewProduct = {
    ...reviewedProduct,
    price: reviewedProduct?.unit_retail_price,
    store_id: reviewedProduct && connectedStoreInfo?.store_id,
  };

  const singlePublishProduct = () => {
    setIsLoading(true);
    // setCheckFieldsLoading(true);
    const url = PRODUCT.BULK_PRODUCT_PUBLISH;
    const data = {
      master_product_id: [publishProductID],
      user_id: currentUser.merchant_id,
      shop: selectedStore,
      // product: [formattedReviewProduct],
    };

    // setPublishLoading(true);
    // setPublishFailedMessage("");
    appFetch(url, data)
      .then((res) => {
        enqueueSnackbar(res.message);
        if (res.status === "success") {
          // setIsLoading(false);
          // setPublishLoading(false);
          // handlePublishSingleProductSuccess();
          router.push(`/app/jobs/${res.task_id}`);
          dispatch(setPublishTaskID(res.task_id));
          dispatch(setPublishStatus({}));
          dispatch(
            updateSingleProductPublishOnboardingSteps({
              step: "publish",
            })
          );
        }
        // setPublishLoading(false);

        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setPublishFailedMessage(
        // 	"Something went wrong. Please try again later.",
        // );
        // setPublishLoading(false);
        // enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
    // .finally(() => setPublishLoading(false));
    // setCheckFieldsLoading(false);
    // setIsLoading(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductID}/publish?productId=${publishProductID}&drawerOpen=true`
    );
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    router.push(`/app/products/publish/${publishProductID}/publish`);
  };
  const handleEditButtonClick = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductID}/publish?productId=${publishProductID}&drawerOpen=true&edit=true`
    );
  };
  // create a function to fetch the product details using the product id
  const handleFetchProductDetails = () => {
    setIsLoading(true);
    // fetch the product details using appFetch
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      master_product_id: publishProductID,
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          // set the product details to the state
          setProductList(json.result);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  // call the function to fetch the product details
  React.useEffect(() => {
    handleFetchProductDetails();
    // handleFetchProductFields();
  }, []);
  console.log({ productList });

  // filter the product list to get the product details using the master_item_id
  const filteredData =
    Array.isArray(productList) &&
    productList.filter((item) => {
      return item.master_product_id === publishProductID;
    });
  const getProductDetails =
    Array.isArray(filteredData) && filteredData.length > 0 && filteredData[0];

  const dispatch = useDispatch();
  const handleClickNextButton = () => {
    handleClickContinueButton();
    dispatch(
      updateSingleProductPublishOnboardingSteps({
        step: "review-product",
        nextStep: "publish",
      })
    );
  };
  const [openFieldsDialog, setOpenFieldsDialog] = React.useState(false);
  const handleFieldsDialogOpen = () => {
    setOpenFieldsDialog(true);
  };
  const handleFieldsDialogClose = () => {
    setOpenFieldsDialog(false);
  };
  console.log({ productTitle: getProductDetails.product_title });
  return (
    <div>
      {/* <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={pageLabel}
      /> */}
      {/* {isLoading && <PageLoader />} */}

      {/* <PublishProductFieldsDialog
        open={openFieldsDialog}
        handleClose={handleFieldsDialogClose}
      /> */}
      <PublishPageCard>
        <Box
          sx={{
            pb: "8px",
            px: 4,
          }}
        >
          <SectionTitleText
            sx={{
              fontSize: "26px",
              fontWeight: "700px",
              color: "#484A9E",
              mb: "8px",
            }}
          >
            Publish
            {/* Review Product */}
          </SectionTitleText>
          <DescriptionText
            sx={{
              maxWidth: "750px",
              marginBottom: "16px",
              fontSize: "14px",
              fontWeight: 400,
              color: "#19235A",
              "& path": {
                stroke: "rgba(0,0,0,0.7)",
              },
            }}
          >
            Product details have been updated successfully. You can now publish
            your product using the Publish Products button.
            {/* Before publishing your product to the Shopify store, we
						need you to review the Product Details. We just want to
						know if anything is{" "}
						<span
							style={{
								fontWeight: 700,
							}}
						>
							missing or incorrect
						</span>{" "}
						in order to fix it before we share it with our
						customers.
						<IconButtonWithTooltip
							title={"Click to know more"}
							icon={<InfoIcon />}
							onClick={() => handleFieldsDialogOpen()}
						/> */}
          </DescriptionText>

          <PreviewProductComponent
            display_image={getProductDetails.display_image}
            product_title={getProductDetails.product_title}
            item_unit_cost_price={getProductDetails.item_unit_cost_price}
            unit_retail_price={getProductDetails.unit_retail_price}
            sku={getProductDetails.sku}
            product_barcode={getProductDetails.product_barcode}
            productId={publishProductID}
            isLoading={isLoading}
          />
        </Box>

        {/* <Stack
					direction="row"
					sx={{ maxWidth: "400px", justifyContent: "space-between" }}
				>
					<OutlinedButton onClick={handleOpenDrawer}>
						View Product
					</OutlinedButton>
					<OutlinedButton onClick={handleEditButtonClick}>
						Edit Product
					</OutlinedButton>
				</Stack> */}
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            bottom: "0",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "white",
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
            padding: "8px",
            gap: "16px",
            ml: -20,
          }}
        >
          <SecondaryButton onClick={() => handleClickBackButton()}>
            Back
          </SecondaryButton>
          <PrimaryButton onClick={() => singlePublishProduct()}>
            Publish Product
          </PrimaryButton>
        </Box>
        <BottomDrawer openDrawer={openDrawer} handleClose={handleCloseDrawer}>
          {/* <Box
						sx={{
							padding: "16px",
							display: "flex",
							flex: 1,
							borderBottom: "1px solid rgba(0,0,0,0.1)",
							position: "sticky",
							top: 0,
							background: "white",
							zIndex: (theme) => theme.zIndex.drawer + 10000,
						}}
					>
						<SectionTitleText>
							{getProductDetails.product_title}
						</SectionTitleText>
						<div style={{ flex: 1 }} />
						{edit ? (
							<PrimaryButton onClick={handleCloseDrawer}>
								Save Changes
							</PrimaryButton>
						) : (
							<OutlinedButton onClick={handleEditButtonClick}>
								Edit Product Details
							</OutlinedButton>
						)}
						<IconButton
							onClick={handleCloseDrawer}
							sx={{ marginLeft: "16px" }}
						>
							<MdClose />
						</IconButton>
					</Box> */}
          <Box>
            {edit ? (
              <NewEditProductComponent
                handleCloseDrawer={handleCloseDrawer}
                handleEditButtonClick={handleEditButtonClick}
                edit={edit}
                productTitle={getProductDetails?.product_title}
              />
            ) : (
              <>
                <PublishPageDrawerHeader
                  edit={edit}
                  handleCloseDrawer={handleCloseDrawer}
                  handleEditButtonClick={handleEditButtonClick}
                  productTitle={getProductDetails.product_title}
                />

                <ProductsDetailsPageSection isUsedOnReviewPage />
              </>
            )}
          </Box>
        </BottomDrawer>
      </PublishPageCard>
    </div>
  );
}

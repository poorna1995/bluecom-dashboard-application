import { Box, IconButton, Stack } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
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

// mapstate user data
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ProductPublishReviewProductSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  // get the product id from the router
  const router = useRouter();
  const publishProductId = router.query.publishProductID;
  // use the useSelector hook to get the user data from the redux store
  const { currentUser } = useSelector(mapState);
  const productId = router.query.productId;
  const drawerOpen = router.query.drawerOpen;
  const edit = router.query.edit;
  // create a state to store the product list
  const [productList, setProductList] = React.useState([]);
  // create a state to store the product details
  const [productDetails, setProductDetails] = React.useState({});
  const [openDrawer, setOpenDrawer] = React.useState(drawerOpen);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductId}/review-product?productId=${publishProductId}&drawerOpen=true`
    );
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    router.push(`/app/products/publish/${publishProductId}/review-product`);
  };
  const handleEditButtonClick = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/${publishProductId}/review-product?productId=${publishProductId}&drawerOpen=true&edit=true`
    );
  };
  // create a function to fetch the product details using the product id
  const handleFetchProductDetails = () => {
    // fetch the product details using appFetch
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      master_product_id: publishProductId,
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          // set the product details to the state
          setProductList(json.result);
        }
      })
      .catch((error) => {
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
      return item.master_product_id === publishProductId;
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

      <PublishProductFieldsDialog
        open={openFieldsDialog}
        handleClose={handleFieldsDialogClose}
      />
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
            Review Product
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
            Before publishing your product to the Shopify store, we need you to
            review the Product Details. We just want to know if anything is{" "}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              missing or incorrect
            </span>{" "}
            in order to fix it before we share it with our customers.
            <IconButtonWithTooltip
              title={"Click to know more"}
              icon={<InfoIcon />}
              onClick={() => handleFieldsDialogOpen()}
            />
          </DescriptionText>

          <PreviewProductComponent
            display_image={getProductDetails.display_image}
            product_title={getProductDetails.product_title}
            item_unit_cost_price={getProductDetails.item_unit_cost_price}
            unit_retail_price={getProductDetails.unit_retail_price}
            sku={getProductDetails.sku}
            product_barcode={getProductDetails.product_barcode}
            productId={publishProductId}
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
          <PrimaryButton onClick={() => handleClickNextButton()}>
            Continue
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

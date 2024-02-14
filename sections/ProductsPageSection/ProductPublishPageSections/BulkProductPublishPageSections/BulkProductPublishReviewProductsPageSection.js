import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import placeholderImage from "public/assets/t-shirt.png";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import AppLink from "components/Common/AppLink";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPublishableProducts } from "redux/products/productsSlice";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { MdClose } from "react-icons/md";
import EditProductComponent from "../components/EditProductComponent";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
import PublishPageNavBar from "../components/PublishPageNavBar";
import PublishPageDrawerHeader from "../components/PublishPageDrawerHeader";
import PublishPageCard from "../components/PublishPageCard";
import NewEditProductComponent from "../components/NewEditProductComponent";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EyeIcon from "components/Common/Icons/PublishProduct/EyeIcon";
import { updateBulkProductPublishOnboardingSteps } from "redux/onboarding/onboardingSlice";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import InfoIcon from "components/Common/Icons/StoreIcons/InfoIcon";
import PublishProductFieldsDialog from "../components/PublishProductFieldsDialog";

const mapState = ({ views, user, productsData }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
  selectedProducts: productsData?.selectedProducts,
});

export default function BulkProductPublishReviewProductsPageSection({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
}) {
  const router = useRouter();
  const { pageView, currentUser, selectedProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const productId = router.query.productId;
  const drawerOpen = router.query.drawerOpen;
  const edit = router.query.edit;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  console.log({ selectedProducts });
  const handleFetchProducts = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  // console.log({ channels });

  // filter data by selected products using master_item_id
  const filteredData =
    Array.isArray(data) &&
    data.filter((item) => {
      const { master_product_id } = item;
      if (selectedProducts.includes(master_product_id)) return item;
      return;
    });
  console.log({ filteredData });

  /**
         * {
    "barcode": "",
    "category": "",
    "channel_id": 3,
    "collection": "",
    "collection_name": "",
    "display_image": "",
    "images": [],
    "inventory_item_id": null,
    "item_desc": "<p></p>\n",
    "item_title": "New Product Title",
    "live_date": "2023-02-07T07:43:59.162741",
    "master_item_id": "138950486391628670",
    "master_product_id": "1675754602332",
    "product_desc": "<p></p>\n",
    "product_title": "New Product Title",
    "sku": "",
    "status": "draft",
    "tag": [],
    "type": "",
    "unit_cost_price": 0,
    "unit_retail_price": 0,
    "user_id": "138944605333795140",
    "weight": 0,
    "weight_unit": "kg"
}
         */
  const [openDrawer, setOpenDrawer] = React.useState(drawerOpen);
  const handleOpenDrawer = (master_product_id) => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/bulk?step=review-products&productId=${master_product_id}&drawerOpen=true`
    );
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    router.push(`/app/products/publish/bulk?step=review-products`);
  };
  const handleEditButtonClick = () => {
    setOpenDrawer(true);
    router.push(
      `/app/products/publish/bulk?step=review-products&productId=${productId}&drawerOpen=true&edit=true`
    );
  };
  const getProductDetails =
    (Array.isArray(filteredData) &&
      filteredData.length > 0 &&
      filteredData.filter((item) => {
        const { master_product_id } = item;
        if (productId === master_product_id) return item;
        return;
      })[0]) ||
    {};

  const handleClickNextButton = () => {
    handleClickContinueButton();
    dispatch(
      updateBulkProductPublishOnboardingSteps({
        step: "review-products",
        nextStep: "publish-bulk",
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

  return (
    <Box sx={{ px: "8px" }}>
      {/* <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={pageLabel}
      /> */}
      {/* <PublishPageCard
				
			> */}

      <PublishProductFieldsDialog
        open={openFieldsDialog}
        handleClose={handleFieldsDialogClose}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SectionTitleText
          sx={{
            mb: 1,
            fontSize: "32px",
            fontWeight: "700px",
            color: "#484A9E",
          }}
        >
          Review products
        </SectionTitleText>
      </Box>

      <DescriptionText
        sx={{
          // marginLeft: "10px",
          fontSize: "14px",
          fontWeight: "600px",
          color: "#222222",
          // color: (theme) => theme.palette.grey[700],
          // paddingBottom: "32px",
          pb: 2,
          "& path": {
            stroke: "rgba(0,0,0,0.5)",
          },
        }}
      >
        Please review the products which you want to publish to your Shopify
        Store{" "}
        <IconButtonWithTooltip
          title={"Click to know more"}
          icon={<InfoIcon />}
          onClick={() => handleFieldsDialogOpen()}
        />
      </DescriptionText>

      {isLoading && <PageLoader />}
      <Grid container spacing={3}>
        {filteredData.map((item, index) => {
          const {
            master_item_id,
            master_product_id,
            product_title,
            item_title,
            status,
            unit_retail_price,
            display_image,
            sku,
            product_barcode,
          } = item;
          function getStr1(str, length) {
            return str.length > 50 ? str.slice(0, 50) + "..." : str;
          }
          return (
            <Grid item xs={8} md={2.4} key={index}>
              <BaseCard
                sx={{
                  // marginLeft: "10px",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  minHeight: "440px",
                  // width: "250px",
                  // height: "420px",
                  border: "1px solid #E5E5E5",
                }}
              >
                <AppImage
                  sx={{
                    borderRadius: "4px",
                    // padding: "8px",
                    objectPosition: "top",
                  }}
                  src={display_image}
                  alt="product image"
                  objectFit="cover"
                  width="280"
                  height="280"
                />
                <Stack sx={{ textAlign: "left" }}>
                  <DescriptionText
                    sx={{
                      fontWeight: "700",
                      paddingTop: "8px",
                      fontSize: "16px",
                      color: "#222222",
                    }}
                  >
                    <>
                      <Tooltip title={product_title || item_title}>
                        <span>{getStr1(product_title)}</span>
                      </Tooltip>
                    </>
                    {/* {product_title || item_title} */}
                  </DescriptionText>
                  <DescriptionText
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      color: "#222222",
                      fontWeight: "500",
                      paddingTop: "7px",
                      // marginLeft: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Retail Price:
                    <DescriptionText
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        fontSize: "14px",
                        marginLeft: "8px",
                      }}
                    >
                      $ {unit_retail_price}
                    </DescriptionText>
                  </DescriptionText>
                  <DescriptionText
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      color: "#222222",
                      fontWeight: "500",
                      paddingTop: "7px",
                      // marginLeft: "10px",
                      fontSize: "14px",
                    }}
                  >
                    SKU:
                    <DescriptionText
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        fontSize: "14px",
                        marginLeft: "8px",
                      }}
                    >
                      {sku}
                    </DescriptionText>
                  </DescriptionText>
                  <DescriptionText
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      color: "#222222",
                      fontWeight: "500",
                      paddingTop: "7px",
                      // marginLeft: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Barcode:
                    <DescriptionText
                      sx={{
                        color: "#222222",
                        fontWeight: "700",
                        fontSize: "14px",
                        marginLeft: "8px",
                      }}
                    >
                      {product_barcode}
                    </DescriptionText>
                  </DescriptionText>
                </Stack>
                <OutlinedButton
                  sx={{
                    marginTop: "8px",
                  }}
                  onClick={() => handleOpenDrawer(master_product_id)}
                >
                  {" "}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "5px",
                      // display: "inline",
                    }}
                  >
                    <EyeIcon />
                  </span>
                  Review product
                </OutlinedButton>
              </BaseCard>
            </Grid>
          );
        })}
      </Grid>

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

      {/* <PrimaryButton
					onClick={() => handleClickContinueButton()}
					sx={{ mt: 2 }}
				>
					Continue
				</PrimaryButton> */}
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
              productTitle={getProductDetails?.product_title}
              handleCloseDrawer={handleCloseDrawer}
              handleEditButtonClick={handleEditButtonClick}
            />
          ) : (
            <>
              <PublishPageDrawerHeader
                edit={edit}
                handleCloseDrawer={handleCloseDrawer}
                handleEditButtonClick={handleEditButtonClick}
                productTitle={getProductDetails?.product_title}
              />

              <ProductsDetailsPageSection isUsedOnReviewPage />
            </>
          )}
        </Box>
      </BottomDrawer>
      {/* </PublishPageCard> */}
    </Box>
  );
}

import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import shopifyIcon from "public/assets/icons/shopify-text-icon.png";
import AppImage from "components/Common/AppImage";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import ProductPublishPagePublishSection from "./ProductPublishPagePublishSection";
import ProductPublishReviewProductSection from "./ProductPublishReviewProductSection";
import BulkProductPublishSelectProductsSection from "./BulkProductPublishPageSections/BulkProductPublishSelectProductsSection";
import BulkProductPublishReviewChangesPageSection from "./BulkProductPublishPageSections/BulkProductPublishReviewChangesPageSection";
import BulkProductPublishReviewProductsPageSection from "./BulkProductPublishPageSections/BulkProductPublishReviewProductsPageSection";
import { CHANNEL } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useDispatch, useSelector } from "react-redux";
import PublishPageNavBar from "./components/PublishPageNavBar";
import PublishPageCard from "./components/PublishPageCard";
import {
  setSelectedPublishableProducts,
  setSelectedPublishableStore,
} from "redux/products/productsSlice";
import BulkPublishPagePublishSection from "./BulkProductPublishPageSections/BulkPublishPagePublishSection";
import { groupBy } from "lodash";
import SelectVendorCard from "sections/OnboardingSections/NewProductOnboardingSections/components/SelectVendorCard";
import SelectStoreCard from "./components/SelectStoreCard";
import {
  updateBulkProductPublishOnboardingSteps,
  updateSingleProductPublishOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import NewBulkPublishPageReviewProductsPageSection from "./BulkProductPublishPageSections/NewBulkPublishPageReviewProductsPageSection";
import NewBulkPublishPagePublishSection from "./BulkProductPublishPageSections/NewBulkPublishPagePublishSection";
import NewProductPublishPagePublishSection from "./NewProductPublishPagePublishSection";
import NewProductPublishPageReviewProductSection from "./NewProductPublishReviewProductSection";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import theme from "theme";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  productsData,
});
export default function ProductPublishPageSelectStoreSection({
  handleClickBackButton,
  handleClickContinueButton,
  flowType,
}) {
  const router = useRouter();
  const pageType = router.query.step;
  const status = router.query.status;
  console.log({ pageType });

  const MyComponent = pageType && steps[pageType].component;
  const pageLabel = pageType && steps[pageType].label;
  // const handleClickBackButton = () => {
  // 	router.back();
  // };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        {pageType && (
          <MyComponent
            handleClickContinueButton={handleClickContinueButton}
            handleClickBackButton={handleClickBackButton}
            pageLabel={pageLabel}
            flowType={flowType}
          />
        )}
      </Box>
    </div>
  );
}

const SelectStoreComponent = ({
  handleClickContinueButton,
  handleClickBackButton,
  pageLabel,
  flowType,
}) => {
  const { currentUser, productsData } = useSelector(mapState);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedStore, setSelectedStore] = useState(
    productsData.selectedStore || []
  );

  useEffect(() => {
    setSelectedStore(productsData.selectedStore || "");
  }, [productsData.selectedStore]);
  const [connectedApps, setConnectedApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchConnectedApps = () => {
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          console.log(json);
          setConnectedApps(json.result);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchConnectedApps();
  }, []);

  const handleContinueToNextStep = () => {
    handleClickContinueButton();
    dispatch(setSelectedPublishableStore(selectedStore));

    if (flowType === "bulk") {
      return dispatch(
        updateBulkProductPublishOnboardingSteps({
          step: "select-store",
          nextStep: "select-products",
        })
      );
      // router.push("/products/publish/bulk/step-2");
    }
    if (flowType === "single") {
      return dispatch(
        updateSingleProductPublishOnboardingSteps({
          step: "select-store",
          nextStep: "review-product",
        })
      );

      // router.push("/products/publish/step-2");
    }
  };

  const handleSelectStore = (shop) => {
    // set the selectedStore array with the shop whenever it is triggered, also check if shop exists in the array, if it does then remove it, if it doesn't then add it
    const list = [...selectedStore];
    if (list.includes(shop)) {
      const index = list.indexOf(shop);
      list.splice(index, 1);
      setSelectedStore(list);
    } else {
      setSelectedStore([...selectedStore, shop]);
    }

    // setSelectedStore((prev) => {
    // 	if (prev === shop) {
    // 		return "";
    // 	}
    // 	return shop;
    // });

    // setSelectedStore(e.target.value);

    // dispatch(setSelectedPublishableStore(e.target.value));
  };
  // const handleClickBackButton = () => {
  // 	router.back();
  // };
  // useEffect(() => {
  // 	dispatch(setSelectedPublishableProducts([]));
  // }, [selectedStore]);
  const groupByChannelName = groupBy(connectedApps, "channel_name");
  console.log({ groupByChannelName });

  return (
    <div>
      {/* <PublishPageNavBar
        handleClickContinueButton={handleClickContinueButton}
        handleClickBackButton={handleClickBackButton}
        pageLabel={pageLabel}
        disableContinueButton={!selectedStore}
      /> */}
      {loading && <PageLoader />}
      <PublishPageCard>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "flex-start",
            // justifyContent: "center",
            py: 4,
            px: 12,
          }}
        >
          <SectionTitleText
            sx={{
              fontSize: "28px",
              fontWeight: "600px !important",
              color: "#484A9E",
              pb: "8px",
              px: 28,
            }}
          >
            Select store
          </SectionTitleText>
          <DescriptionText
            sx={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: "600px",
              color: (theme) => theme.palette.text.primary,
              px: 28,
            }}
          >
            Please select a store where you want to publish the Product
          </DescriptionText>

          {/* Create a list of radio group items for showing the title and stores */}
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "center",
              // display: "flex",
              justifyContent: "center",
            }}
          >
            {Object.keys(groupByChannelName).map((key, keyIndex) => {
              return (
                <Grid
                  item
                  xs={8}
                  key={keyIndex}
                  // sx={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  // }}
                >
                  <BaseCard
                    sx={{
                      width: "100%",
                      boxShadow: "none",
                      // border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "16px",
                        paddingLeft: "0px",
                        // borderBottom: "1px solid rgba(0,0,0,0.1)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {groupByChannelName[key][0].channel_name === "shopify" ? (
                        <AppImage
                          src="/assets/ShopifyImage.png"
                          width={26}
                          height={26}
                          alt="shopify"
                        />
                      ) : groupByChannelName[key][0].channel_name ===
                        "woocommerce" ? (
                        // <ShopifyIcon/>
                        <AppImage
                          src="/assets/WooComImage.png"
                          width={45}
                          height={26}
                          alt="woo commerce"
                        />
                      ) : (
                        <AppImage
                          src="/assets/icons/bigcommerceIcon.png"
                          width={26}
                          height={26}
                          alt="big commerce"
                        />
                      )}
                      {/* <AppImage
											src={shopifyIcon}
											width="90"
											height="36"
										/> */}
                      <Typography
                        sx={{
                          ml: "8px",
                          fontWeight: "600",
                          fontSize: "20px",
                          color: (theme) => theme.palette.text.primary,
                          // fontStyle: "italic",
                        }}
                      >
                        {key}
                      </Typography>
                    </Box>
                    {/* <Divider /> */}

                    <Box
                      sx={{
                        padding: "12px",
                        pl: 0,
                      }}
                    >
                      {/* <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedStore}
                        onChange={handleSelectStore}
                      > */}
                      <Grid container spacing={2}>
                        {Array.isArray(groupByChannelName[key]) &&
                          groupByChannelName[key].map((item, index) => {
                            const { shop } = item;
                            return (
                              <Grid item xs={6} key={index}>
                                {/* onClick item will add the item to the selectedStore array */}
                                <SelectStoreCard
                                  key={index}
                                  title={item.shop}
                                  logo={item.logo_url || ""}
                                  onClick={() => handleSelectStore(item.shop)}
                                  // show selected if the selectedStore item is equal to the item.shop
                                  isSelected={
                                    selectedStore.some((i) => i === item.shop)

                                    // selectedStore ===
                                    // item.shop
                                  }
                                />
                              </Grid>
                            );

                            {
                              /* return (
                            <div key={index}>
                              <FormControlLabel
                                value={shop}
                                control={<Radio />}
                                label={shop}
                              />
                            </div>
                          ); */
                            }
                          })}
                        {/* </RadioGroup> */}
                      </Grid>
                    </Box>
                  </BaseCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>

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
          <PrimaryButton
            disabled={!selectedStore}
            onClick={() => handleContinueToNextStep()}
            // sx={{ marginTop: "16px" }}
          >
            Continue
          </PrimaryButton>
        </Box>
      </PublishPageCard>
    </div>
  );
};

const steps = {
  "select-store": {
    label: "Select Store",
    type: "select-store",
    component: SelectStoreComponent,
  },
  "review-product": {
    label: "Review product",
    type: "review-product",
    component: NewProductPublishPageReviewProductSection,
  },
  publish: {
    label: "Publish",
    type: "publish",
    component: NewProductPublishPagePublishSection,
  },
  "select-products": {
    label: "Select Products",
    type: "select-products",
    component: BulkProductPublishSelectProductsSection,
  },
  "verify-changes": {
    label: "Verify Changes",
    type: "verify-changes",
    component: BulkProductPublishReviewChangesPageSection,
  },
  "review-products": {
    label: "Review Products",
    type: "review-products",
    // component: BulkProductPublishReviewProductsPageSection,
    component: NewBulkPublishPageReviewProductsPageSection,
  },
  "publish-bulk": {
    label: "Publish",
    type: "publish-bulk",
    // component: BulkPublishPagePublishSection,
    component: NewBulkPublishPagePublishSection,
  },
};

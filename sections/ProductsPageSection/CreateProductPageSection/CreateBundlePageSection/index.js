import { Box } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { resetBundleOnboardingSteps } from "redux/onboarding/onboardingSlice";
// import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import AddComponentsToBundleSection from "./AddComponentsToBundleSection";

import dynamic from "next/dynamic";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";

// const NewProductOnboardingProductDetailsSection = dynamic(
//   () =>
//     import(
//       "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection"
//     ),

//   { ssr: false, loading: () => <PageLoader /> }
// );

const mapState = ({ productsData }) => ({
  createBundleData: productsData.createBundleData ?? {},
});
export default function CreateBundlePageSection() {
  const router = useRouter();

  const { createBundleData } = useSelector(mapState);
  const productIdFromState = createBundleData.master_product_id;
  const { step, id, productId } = router.query;
  const CREATE_PRODUCT_DATA = "createBundleData";
  const stepperData = {
    "general-info": {
      id: 0,
      label: "Bundle Details",
      step: "general-info",
      to: "price-info",
      toId: 1,
      component: (
        <>
          {/* <Box
						sx={{
							maxWidth: "800px",
							margin: "auto",
							mt: -1,
							// mt: 3,
						}}
					>
						<SectionTitleText
							sx={{
								color: (theme) => theme.palette.text.title,
								fontSize: "32px",
								fontWeight: "700",
								lineHeight: "39px",
							}}
						>
							Bundle Details
						</SectionTitleText>
						<SectionTitleText
							sx={{
								fontWeight: 700,
								fontSize: "18px",
								lineHeight: "22px",

								color: "#222222",

								mt: 3,
							}}
						>
							General
						</SectionTitleText>
					</Box> */}
          <NewProductOnboardingProductDetailsSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
            usedIn="bundleOnboarding"
            hideVariantQuestion={true}
            stepTitle={`Bundle Details`}
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
    },

    media: {
      id: 1,
      label: "Bundle Media",
      step: "media",
      component: (
        <Box sx={{}}>
          <NewProductOnboardingProductMediaSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
            usedIn="bundleOnboarding"
            configObject={{
              sectionTitle: "Bundle Media",
              mediaTitleText: "Bundle Media",
              sectionTitleStyles: {
                color: (theme) => theme.palette.text.title,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "39px",
              },
            }}
          />
          {/* <ProductOnboardingBottomActionButtons
						saveButtonTitle={"Save as Draft"}
						maxWidthPage="635px"
					/> */}
        </Box>
      ),
    },
    components: {
      id: 1,
      label: "Bundle Components",
      step: "components",
      component: (
        <Box sx={{}}>
          <AddComponentsToBundleSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
          {/* <ProductOnboardingBottomActionButtons
						saveButtonTitle={"Save as Draft"}
						maxWidthPage="635px"
					/> */}
        </Box>
      ),
    },
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (productId && productId !== productIdFromState) {
  //     dispatch(resetBundleOnboardingSteps());
  //   }
  // }, [productId]);
  // const maxWidthPage = "635px";
  // const allSteps = Object.values(stepperData);
  const StepComponent = (step && stepperData[step].component) || "no";

  return (
    <div>
      <Box
        sx={{
          // maxWidth: "800px",
          // margin: "auto",
          paddingBottom: "80px",
        }}
      >
        {StepComponent}
      </Box>
    </div>
  );
}

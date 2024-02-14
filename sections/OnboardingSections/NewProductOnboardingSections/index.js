import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
// import NewProductOnboardingInventoryInfoSection from "./NewProductOnboardingInventoryInfoSection";
// import NewProductOnboardingPriceInfoSection from "./NewProductOnboardingPriceInfoSection";
// import NewProductOnboardingProductDetailsSection from "./NewProductOnboardingProductDetailsSection";
// import NewProductOnboardingProductMediaSection from "./NewProductOnboardingProductMediaSection";
// import NewProductOnboardingSelectVendorSection from "./NewProductOnboardingSelectVendorSection";
// import NewProductOnboardingVariantLevelInventorySection from "./NewProductOnboardingVariantLevelInventorySection";
// import NewProductOnboardingVariantsInfoSection from "./NewProductOnboardingVariantsInfoSection";
import dynamic from "next/dynamic";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
const NewProductOnboardingInventoryInfoSection = dynamic(() =>
  import("./NewProductOnboardingInventoryInfoSection")
);

const NewProductOnboardingPriceInfoSection = dynamic(() =>
  import("./NewProductOnboardingPriceInfoSection")
);
const NewProductOnboardingProductDetailsSection = dynamic(
  () => import("./NewProductOnboardingProductDetailsSection"),
  { ssr: false, loading: () => <PageLoader /> }
);
const NewProductOnboardingProductMediaSection = dynamic(() =>
  import("./NewProductOnboardingProductMediaSection")
);
const NewProductOnboardingSelectVendorSection = dynamic(() =>
  import("./NewProductOnboardingSelectVendorSection")
);
const NewProductOnboardingVariantLevelInventorySection = dynamic(() =>
  import("./NewProductOnboardingVariantLevelInventorySection")
);
const NewProductOnboardingVariantsInfoSection = dynamic(() =>
  import("./NewProductOnboardingVariantsInfoSection/index")
);
// const

export default function NewProductOnboardingSections() {
  const router = useRouter();
  const { step, id } = router.query;
  const CREATE_PRODUCT_DATA = "createProductData";
  const stepperData = {
    "general-info": {
      id: 0,
      label: "Product Details",
      step: "general-info",
      to: "price-info",
      toId: 1,
      component: (
        <>
          <NewProductOnboardingProductDetailsSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
            stepTitle="Product Details"
          />
        </>
      ),
    },

    "price-info": {
      id: 1,
      label: "Price",
      step: "price-info",
      to: "inventory-info",
      toId: 2,
      component: (
        <>
          <NewProductOnboardingPriceInfoSection />
        </>
      ),
    },
    "inventory-info": {
      id: 2,
      label: "Inventory",
      step: "inventory-info",
      to: "variants",
      toId: 3,
      component: (
        <>
          <NewProductOnboardingInventoryInfoSection />
        </>
      ),
    },
    variants: {
      id: 3,
      label: "Variants",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
      step: "variants",
      to: "media",
      toId: 4,
      component: (
        <>
          <NewProductOnboardingVariantsInfoSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
        </>
      ),
    },
    media: {
      id: 4,
      label: "Product Media",
      step: "media",
      component: (
        <Box sx={{}}>
          <NewProductOnboardingProductMediaSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
          {/* <ProductOnboardingBottomActionButtons
						saveButtonTitle={"Save as Draft"}
						maxWidthPage="635px"
					/> */}
        </Box>
      ),
    },
    "select-vendor": {
      id: 5,
      label: "Select Vendor",
      step: "select-vendor",
      component: (
        <Box sx={{}}>
          <NewProductOnboardingSelectVendorSection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
        </Box>
      ),
    },
    inventory: {
      id: 6,
      label: "Inventory",
      step: "inventory",
      component: (
        <Box sx={{}}>
          <NewProductOnboardingVariantLevelInventorySection
            keyForReduxStateData={CREATE_PRODUCT_DATA}
          />
        </Box>
      ),
    },
  };
  const maxWidthPage = "635px";
  const allSteps = Object.values(stepperData);
  const StepComponent = (step && stepperData[step].component) || "no";
  const currentStep = step && stepperData[step];
  const handleNextButton = (step) => {
    router.push(
      `/onboarding/products/${pageId}?step=${step.to}&id=${step.toId}`
    );
  };

  return (
    <div>
      {/* <Box
				sx={{
					// position: "sticky",
					top: "0px",
					background: (theme) => theme.palette.background.default,
					// py: "16px",
					// pt: "8px",
					pt: 1,
					// zIndex: (theme) => theme.zIndex.drawer + 1,
					borderBottom: (theme) =>
						`1px solid ${theme.palette.grey[200]}`,
				}}
			>
				<Box
					sx={{
						my: "16px",
						mt: 0.5,

						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						// marginBottom: "24px",
						// marginTop: "16px",
						flex: 1,
					}}
				>
					<Tooltip title="Go Back">
						<IconButton
							sx={{
								border: (theme) =>
									`1px solid ${theme.palette.grey[200]}`,
								borderRadius: "5px",
								ml: 3,
							}}
							onClick={() => router.back()}
						>
							<MdArrowBack />
						</IconButton>
					</Tooltip>
					<SectionTitleText
						sx={{ ml: 2, fontSize: "16px", fontWeight: 500 }}
					>
						Go back
					</SectionTitleText>
					<div style={{ flex: 0.5 }} />
					<SectionTitleText
						sx={{
							fontSize: "28px",
							lineHeight: "34px",
							textAlign: "center",
							flex: 1,
						}}
					>
						{/* Create New Product 
					</SectionTitleText>
					<div style={{ flex: 0.55 }} />
				</Box>
			</Box>{" "} */}
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

import PublishPageLayout from "layouts/PublishPageLayout";
import React from "react";
import ProductPublishPageSelectStoreSection from "sections/ProductsPageSection/ProductPublishPageSections/ProductPublishPageSelectStoreSection";
import { useRouter } from "next/router";
import StepperDrawer from "components/Common/Drawer/StepperDrawer";
import OnboardingLayout from "layouts/OnboardingLayout";

export default function BulkProductPublishPage() {
  const router = useRouter();
  const pageType = router.query.step;
  const pageData = {
    "select-store": {
      component: ProductPublishPageSelectStoreSection,
      from: "/app/products/publish",
      to: `/app/products/publish/bulk?step=select-products&currentPage=1`,
    },
    "select-products": {
      component: ProductPublishPageSelectStoreSection,
      from: `/app/products/publish/bulk?step=select-store`,
      to: `/app/products/publish/bulk?step=review-products`,
    },
    "review-products": {
      component: ProductPublishPageSelectStoreSection,
      from: `/app/products/publish/bulk?step=select-products&currentPage=1`,
      to: `/app/products/publish/bulk?step=publish-bulk`,
    },

    // "verify-changes": {
    //   component: ProductPublishPageSelectStoreSection,
    //   from: `/app/products/publish/bulk?step=review-products`,
    //   to: `/app/products/publish/bulk?step=publish-bulk`,
    // },

    "publish-bulk": {
      component: ProductPublishPageSelectStoreSection,
      from: `/app/products/publish/bulk?step=review-products`,
      to: `/app/products/publish/bulk?step=publish&&status=success`,
    },
  };
  const handleClickBackButton = (type) => {
    router.push(`${type}`);
  };
  const handleClickContinueButton = (type) => {
    router.push(`${type}`);
  };

  const MyComponent = pageType && pageData[pageType].component;
  const fromLink = pageType && pageData[pageType].from;
  const toLink = pageType && pageData[pageType].to;

  // const checkisPreviousStepCompleted = (currentStep, previousStep) => {
  // 	console.log(
  // 		"currentstep =",
  // 		currentStep,
  // 		"previousStep=",
  // 		previousStep,
  // 	);
  // 	if (
  // 		previousStep === "select-store" &&
  // 		currentStep === "select-products"
  // 	) {
  // 		return true;
  // 	} else if (
  // 		previousStep === "select-products" &&
  // 		currentStep === "review-products"
  // 	) {
  // 		return true;
  // 	} else if (
  // 		previousStep === "review-products" &&
  // 		currentStep === "verify-changes"
  // 	) {
  // 		return true;
  // 	} else if (
  // 		previousStep === "verify-changes" &&
  // 		currentStep === "publish"
  // 	) {
  // 		return true;
  // 	} else {
  // 		return false;
  // 	}
  // };

  const publishPageNavLinks = [
    {
      title: "Select Store",
      url: `/app/products/publish/bulk?step=select-store`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "select-store",
    },
    {
      title: "Select Products",
      url: `/app/products/publish/bulk?step=select-products&currentPage=1`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "select-products",
    },
    {
      title: "Review Products",
      url: `/app/products/publish/bulk?step=review-products`,
      // isCompleted: checkisPreviousStepCompleted(
      // 	pageType,
      // 	"verify-changes",
      // ),
      step: "review-products",
    },
    // {
    // 	title: "Verify Changes",
    // 	url: `/app/products/publish/bulk?step=verify-changes`,
    // 	// isCompleted: checkisPreviousStepCompleted(pageType, "publish-bulk"),
    // },

    {
      title: "Publish Products",
      url: `/app/products/publish/bulk?step=publish-bulk`,
      step: "publish-bulk",
      // isCompleted: checkisPreviousStepCompleted(pageType, "publish-bulk"),
    },
  ];

  return (
    <OnboardingLayout RouterPushUrl={`/app/products/publish/`}>
      <StepperDrawer
        drawerTitle={`Publish Bulk products`}
        links={publishPageNavLinks}
        keyForReduxData={`bulkProductPublishOnboarding`}
      >
        {pageType && (
          <MyComponent
            flowType="bulk"
            handleClickBackButton={() => handleClickBackButton(fromLink)}
            handleClickContinueButton={() => handleClickContinueButton(toLink)}
          />
        )}
      </StepperDrawer>
    </OnboardingLayout>
  );
}

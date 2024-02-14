import StepperDrawer from "components/Common/Drawer/StepperDrawer";
import DrawerLayout from "layouts/DrawerLayout";
import OnboardingLayout from "layouts/OnboardingLayout";
import PublishPageLayout from "layouts/PublishPageLayout";
import { useRouter } from "next/router";
import React from "react";
import ProductPublishPageSelectStoreSection from "sections/ProductsPageSection/ProductPublishPageSections/ProductPublishPageSelectStoreSection";

export default function PublishableProductPage() {
  const router = useRouter();
  const pageType = router.query.step;
  const publishableID = router.query.publishProductID;
  const pageData = {
    "select-store": {
      component: ProductPublishPageSelectStoreSection,
      from: "/app/products/publish",
      to: `/app/products/publish/${publishableID}/review-product`,
      keyForReduxData: "selectStore",
    },
    "review-product": {
      component: ProductPublishPageSelectStoreSection,
      from: `/app/products/publish/${publishableID}/select-store`,
      to: `/app/products/publish/${publishableID}/publish`,
      keyForReduxData: "reviewProduct",
    },
    publish: {
      component: ProductPublishPageSelectStoreSection,
      from: `/app/products/publish/${publishableID}/review-product`,
      to: `/app/products/publish/${publishableID}/publish?status=success`,
      keyForReduxData: "publishProduct",
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
  const keyForReduxData = pageType && pageData[pageType].keyForReduxData;

  const publishProductID = router.query.publishProductID;
  // if select store is the previous step and review product is the current step then select store step is completed

  const checkisPreviousStepCompleted = (currentStep, previousStep) => {
    if (previousStep === "select-store" && currentStep === "review-product") {
      return true;
    } else if (currentStep === "publish") {
      return true;
    } else {
      return false;
    }
  };

  const publishPageNavLinks = [
    {
      title: "Select Store",
      url: `/app/products/publish/${publishProductID}/select-store`,
      isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "select-store",
    },
    {
      title: "Review Product",
      url: `/app/products/publish/${publishProductID}/review-product`,
      isCompleted: checkisPreviousStepCompleted(pageType, "publish"),
      step: "review-product",
    },
    {
      title: "Publish Product",
      url: `/app/products/publish/${publishProductID}/publish`,
      isCompleted: false,
      step: "publish",
    },
  ];

  return (
    <OnboardingLayout RouterPushUrl={`/app/products/publish`}>
      <StepperDrawer
        pageTitle={"Publish product"}
        links={publishPageNavLinks}
        keyForReduxData={"singleProductPublishOnboarding"}
        drawerTitle={`Publish product`}
        drawerDescription="Publish your product to your store"
      >
        {pageType && (
          <MyComponent
            flowType="single"
            handleClickBackButton={() => handleClickBackButton(fromLink)}
            handleClickContinueButton={() => handleClickContinueButton(toLink)}
          />
        )}
      </StepperDrawer>
    </OnboardingLayout>
  );
}

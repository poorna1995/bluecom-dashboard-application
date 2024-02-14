import StepperDrawer from "components/Common/Drawer/StepperDrawer";
import DrawerLayout from "layouts/DrawerLayout";
import OnboardingLayout from "layouts/OnboardingLayout";
import { useRouter } from "next/router";
import React from "react";
import PurchaseOrderOnboardingStepsComponent from "sections/OnboardingSections/PurchaseOrderOnboardingSection/PurchaseOrderOnboardingStepsComponent";

export default function PurchaseOrderCreatePage() {
  const router = useRouter();
  const { purchaseOrderId } = router.query;
  const pageId = purchaseOrderId ?? 0;

  const PO_DATA = {
    component: PurchaseOrderOnboardingStepsComponent,
    isStepOnboarding: true,
    title: "Create Purchase Order",
    description: "Complete all steps to publish your products",
    keyForReduxData: "purchaseOrderOnboarding",

    links: [
      {
        title: "PO Details",
        url: `/app/purchase-orders/create/${pageId}?step=po-details&id=0`,
        step: "po-details",
      },
      {
        title: "Preview ",
        url: `/app/purchase-orders/create/${pageId}?step=preview&id=1`,
        step: "preview",
      },
      // 		{
      // 			title: "Send PO",
      // 			url: `/onboarding/purchase-orders/${pageId}?step=send-po&id=2`,
      //   step: "send-po",
      // 		},
    ],
  };

  return (
    <OnboardingLayout RouterPushUrl="/app/purchase-orders?tab=all">
      <StepperDrawer
        pageTitle={"Create "}
        links={PO_DATA.links}
        keyForReduxData={PO_DATA.keyForReduxData}
        drawerTitle={PO_DATA.title}
        drawerDescription={PO_DATA.description}
      >
        {<PO_DATA.component />}
      </StepperDrawer>
    </OnboardingLayout>
  );
}

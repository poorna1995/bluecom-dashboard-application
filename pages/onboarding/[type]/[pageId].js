// import StepperDrawer from "components/Common/Drawer/StepperDrawer";
// import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import MerchantOnboardingSection from "sections/OnboardingSections/MerchantOnboardingSection";
// import PurchaseOrderOnboardingStepsComponent from "sections/OnboardingSections/PurchaseOrderOnboardingSection/PurchaseOrderOnboardingStepsComponent";
// import VendorOnboardingSteps from "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingSteps";
// import WarehouseOnboardingSection from "sections/OnboardingSections/WarehouseOnboardingSection";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { VENDOR } from "constants/API_URL";
import OnboardingLayout from "layouts/OnboardingLayout";
const StepperDrawer = dynamic(
  () => import("components/Common/Drawer/StepperDrawer"),
  { ssr: false }
);
const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"));
const MerchantOnboardingSection = dynamic(() =>
  import("sections/OnboardingSections/MerchantOnboardingSection")
);
const PurchaseOrderOnboardingStepsComponent = dynamic(() =>
  import(
    "sections/OnboardingSections/PurchaseOrderOnboardingSection/PurchaseOrderOnboardingStepsComponent"
  )
);
const VendorOnboardingSteps = dynamic(() =>
  import(
    "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingSteps"
  )
);
const WarehouseOnboardingSection = dynamic(() =>
  import("sections/OnboardingSections/WarehouseOnboardingSection")
);

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function OnboardingPage() {
  const router = useRouter();
  const type = router.query.type;
  const pageId = router.query.pageId;

  const { currentUser } = useSelector(mapState);
  // const vendorId = router.query.vendorId;
  const [data, setData] = useState({});

  const handleFetchAllData = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      if (json.result.length > 0) {
        setData(json.result[0]);
      } else {
        setData({});
      }
    });
  };
  useEffect(() => {
    if (type === "vendors" && pageId) {
      handleFetchAllData();
    }
  }, [pageId]);

  const pagesData = {
    // products: {
    // 	component: NewProductOnboardingSections,
    // 	isStepOnboarding: true,
    // 	keyForReduxData: "productOnboarding",
    // 	links: [
    // 		{
    // 			title: "Product Details",
    // 			url: `/onboarding/products/${pageId}?step=general-info&id=0`,
    // 			step: "general-info",
    // 		},
    // 		{
    // 			title: "Product Media",
    // 			url: `/onboarding/products/${pageId}?step=media&id=1`,
    // 			step: "media",
    // 		},
    // 		{
    // 			title: "Variants",
    // 			url: `/onboarding/products/${pageId}?step=variants&id=2`,
    // 			step: "variants",
    // 		},
    // 		{
    // 			title: "Select Vendor",
    // 			url: `/onboarding/products/${pageId}?step=select-vendor&id=3`,
    // 			step: "select-vendor",
    // 		},
    // 		{
    // 			title: "Inventory",
    // 			url: `/onboarding/products/${pageId}?step=inventory&id=4`,
    // 			step: "inventory",
    // 		},
    // 	],
    // },
    vendors: {
      component: VendorOnboardingSteps,
      isStepOnboarding: true,
      keyForReduxData: "vendorOnboarding",
      title: "Add New Vendor",
      description: "Add your vendor details \n and products to get started",
      links: [
        {
          title: "Vendors Details",
          url: `/onboarding/vendors/${pageId}?step=general-info&id=0`,
          step: "general-info",
        },
        {
          title: "Add Products",
          url: `/onboarding/vendors/${pageId}?step=products&id=1`,
          step: "products",
        },
      ],
    },
    merchants: { component: MerchantOnboardingSection },
    // "purchase-orders": {
    //   component: PurchaseOrderOnboardingStepsComponent,
    //   isStepOnboarding: true,
    //   title: "Create Purchase Order",
    //   description: "Complete all steps to publish your products",
    //   keyForReduxData: "purchaseOrderOnboarding",

    //   links: [
    //     {
    //       title: "PO Details",
    //       url: `/onboarding/purchase-orders/${pageId}?step=po-details&id=0`,
    //       step: "po-details",
    //     },
    //     {
    //       title: "Preview ",
    //       url: `/onboarding/purchase-orders/${pageId}?step=preview&id=1`,
    //       step: "preview",
    //     },
    //     // 		{
    //     // 			title: "Send PO",
    //     // 			url: `/onboarding/purchase-orders/${pageId}?step=send-po&id=2`,
    //     //   step: "send-po",
    //     // 		},
    //   ],
    // },
    warehouse: {
      component: WarehouseOnboardingSection,
      isStepOnboarding: false,
    },
  };

  const NotFound = () => <h1>No results found</h1>;
  const MyComponent =
    type && pagesData[type] ? pagesData[type].component : NotFound;
  const routeLinks = type && pagesData[type] ? pagesData[type].links : [];
  const keyForReduxData =
    type && pagesData[type] ? pagesData[type].keyForReduxData : null;
  const stepOnboarding =
    type && pagesData[type] ? pagesData[type].isStepOnboarding : false;
  const drawerTitle = type && pagesData[type] ? pagesData[type].title : null;
  const drawerDescription =
    type && pagesData[type] ? pagesData[type].description : null;

  if (stepOnboarding)
    return (
      <OnboardingLayout RouterPushUrl="/app/vendors">
        <StepperDrawer
          pageTitle={"Create "}
          links={routeLinks}
          keyForReduxData={keyForReduxData}
          drawerTitle={drawerTitle}
          drawerDescription={drawerDescription}
        >
          {type && <MyComponent data={data} />}
        </StepperDrawer>
      </OnboardingLayout>
    );
  return (
    <OnboardingLayout RouterPushUrl="/app/warehouse">
      {type && <MyComponent />}
    </OnboardingLayout>
  );
}

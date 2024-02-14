import BaseLayout from "layouts";
import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import MerchantOnboardingSection from "sections/OnboardingSections/MerchantOnboardingSection";
import ProductOnboardingSection from "sections/OnboardingSections/ProductOnboardingSection";
import VendorOnboardingSection from "sections/OnboardingSections/VendorOnboardingSection";

const OnboardingPage = () => {
  const router = useRouter();
  const type = router.query.type;
  const data = [
    {
      type: "products",
      component: ProductOnboardingSection,
    },
    {
      type: "vendors",
      component: VendorOnboardingSection,
    },
    {
      type: "merchants",
      component: MerchantOnboardingSection,
    },
  ];
  return (
    <DrawerLayout pageTitle={"Add new vendor details"}>
      <>
        {data.map((item, index) => {
          if (item.type === type) return <item.component key={index} />;
        })}
      </>
    </DrawerLayout>
  );
};

export default OnboardingPage;

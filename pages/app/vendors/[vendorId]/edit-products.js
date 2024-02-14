import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import VendorOnboardingAddProductsSection from "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingAddProductsSection";

export default function EditVendorProductsPage() {
  return (
    <DrawerLayout>
      <VendorOnboardingAddProductsSection
        pageTitle={"Edit/Update Products"}
        nextButton={"Update Products"}
        backButton={"Discard"}
      />
    </DrawerLayout>
  );
}

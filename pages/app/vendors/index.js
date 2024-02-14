import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ProductsPageSection from "sections/ProductsPageSection";
import VendorPageSection from "sections/VendorPageSection";

export default function VendorPage() {
  return (
    <DrawerLayout>
      <VendorPageSection />
    </DrawerLayout>
  );
}

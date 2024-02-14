import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
import VendorDetailsPageSection from "sections/VendorPageSection/VendorDetailsPageSection";

export default function VendorDetailsPage() {
  return (
    <DrawerLayout px="0">
      <VendorDetailsPageSection />
    </DrawerLayout>
  );
}

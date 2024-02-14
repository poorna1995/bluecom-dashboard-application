import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
// import ProductsPageSection from "sections/ProductsPageSection";

import dynamic from "next/dynamic";

const ProductsPageSection = dynamic(
  () => import("sections/ProductsPageSection"),
  {
    ssr: false,
  }
);

export default function ProductsPage() {
  return (
    <DrawerLayout>
      <ProductsPageSection />

      {/* <ProductsListPageSections /> */}
    </DrawerLayout>
  );
}

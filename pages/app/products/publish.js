import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
// import ProductPublishPageSection from "sections/ProductsPageSection/ProductPublishPageSection";

import dynamic from "next/dynamic";

const ProductPublishPageSection = dynamic(
  () => import("sections/ProductsPageSection/ProductPublishPageSection"),
  {
    ssr: false,
  }
);

export default function ProductsPublishPage() {
  return (
    <DrawerLayout>
      <ProductPublishPageSection />
    </DrawerLayout>
  );
}

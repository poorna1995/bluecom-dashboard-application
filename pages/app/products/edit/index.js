import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import EditProductsPageSection from "sections/ProductsPageSection/EditProductsPageSection";

export default function EditProductsPage() {
  return (
    <DrawerLayout>
      <EditProductsPageSection />
    </DrawerLayout>
  );
}

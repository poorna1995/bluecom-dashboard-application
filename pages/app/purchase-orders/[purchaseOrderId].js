import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import PurchaseOrderDetailsPageSection from "sections/PurchaseOrderPageSections/PurchaseOrderDetailsPageSection";

export default function PurchaseOrderDetailsPage() {
  return (
    <DrawerLayout>
      <PurchaseOrderDetailsPageSection />
    </DrawerLayout>
  );
}

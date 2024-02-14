import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import PurchaseOrderPageSections from "sections/PurchaseOrderPageSections";

export default function PurchaseOrdersPage() {
  return (
    <DrawerLayout>
      <PurchaseOrderPageSections />
    </DrawerLayout>
  );
}

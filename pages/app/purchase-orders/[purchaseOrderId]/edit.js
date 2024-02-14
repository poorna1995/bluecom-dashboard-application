import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import EditPurchaseOrderPageSections from "sections/PurchaseOrderPageSections/EditPurchaseOrderPageSections";

export default function EditPurchaseOrderPage() {
  return (
    <DrawerLayout>
      <EditPurchaseOrderPageSections />
    </DrawerLayout>
  );
}

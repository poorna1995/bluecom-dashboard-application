import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ManageInventoryPageSection from "sections/InventoryPageSection/ManageInventoryPageSection";

export default function ManageInventoryPage() {
  return (
    <DrawerLayout>
      <ManageInventoryPageSection />
    </DrawerLayout>
  );
}

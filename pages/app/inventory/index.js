import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import InventoryPageSection from "sections/InventoryPageSection";

export default function InventoryPage() {
  return (
    <DrawerLayout>
      <InventoryPageSection />
    </DrawerLayout>
  );
}

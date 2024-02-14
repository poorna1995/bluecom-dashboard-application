import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ReplenishmentPageSection from "sections/ReplenishmentPageSection";

export default function ReplenishmentPage() {
  return (
    <DrawerLayout>
      <ReplenishmentPageSection />
    </DrawerLayout>
    // <div>Hello</div>
  );
}

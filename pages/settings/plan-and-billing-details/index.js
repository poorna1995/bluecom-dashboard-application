import React from "react";
import DrawerLayout from "layouts/DrawerLayout";
import PlanAndBillDetailsPageSection from "/sections/SettingPageSection/PlanAndBillDetailsPageSection";

export default function PlanAndBillingDetailsPage() {
  return (
    <DrawerLayout mt={"112px"}>
      <PlanAndBillDetailsPageSection />
    </DrawerLayout>
  );
}

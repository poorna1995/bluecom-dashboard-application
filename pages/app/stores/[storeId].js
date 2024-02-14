import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import NewStoreDetailsPageSection from "sections/StoresPageSections/NewStoreDetailsPageSection";
import StoreDetailsPageSection from "sections/StoresPageSections/StoreDetailsPageSection";

export default function StoreDetailsPage() {
  return (
    <DrawerLayout px="0px">
      <NewStoreDetailsPageSection />
    </DrawerLayout>
  );
}

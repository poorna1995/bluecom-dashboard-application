import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ThirdPartyAppsPageSections from "sections/ThirdPartyAppsPageSections";

export default function ThirdPartyAppsPage() {
  return (
    <DrawerLayout>
      <ThirdPartyAppsPageSections />
    </DrawerLayout>
  );
}

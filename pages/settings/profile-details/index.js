import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
import ProfileDetailsPageSection from "sections/SettingPageSection/ProfileDetailsPageSection/ProfileDetailsPageSection";

export default function index() {
  return (
    <DrawerLayout mt={"112px"}>
      <ProfileDetailsPageSection />
    </DrawerLayout>
  );
}

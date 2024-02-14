import React from "react";
import DrawerLayout from "layouts/DrawerLayout";
import PaymentMethodSection from "../../../sections/SettingPageSection/PaymentMethodPageSection/PaymentMethodSection";

export default function index() {
  return (
    <DrawerLayout mt={"112px"}>
      <PaymentMethodSection />
    </DrawerLayout>
  );
}

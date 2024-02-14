import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import AppPageSections from "sections/AppPageSections";
import InventoryPageSection from "sections/InventoryPageSection";
import ProductsPageSection from "sections/ProductsPageSection";
import VendorPageSection from "sections/VendorPageSection";
import WarehousePageSection from "sections/WarehousePageSection";

export default function AppPageTypePage() {
  const router = useRouter();
  const appPageType = router.query.appPageType;

  const data = [
    // { type: "products", component: ProductsPageSection },
    // { type: "vendor", component: VendorPageSection },
    // { type: "warehouse", component: WarehousePageSection },
    // { type: "inventory", component: InventoryPageSection },
  ];

  const pageIsOfType = (data) =>
    data
      // .map((item) => item.type === appPageType)
      .filter((item) => item.type === appPageType);
  const pageData = pageIsOfType(data);
  console.log({ isPage: pageData });
  return (
    <DrawerLayout>
      {/* AppPageTypePage : {appPageType} */}
      {/* {Array.isArray(data) &&
				data.map((item) => {
					if (item.type === appPageType) return <item.component />;
				})} */}
    </DrawerLayout>
  );
}

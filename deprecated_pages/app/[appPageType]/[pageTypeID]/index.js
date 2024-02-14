import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import AppDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection";
import InventoryPageSection from "sections/InventoryPageSection";
import ProductsPageSection from "sections/ProductsPageSection";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
import VendorPageSection from "sections/VendorPageSection";
import VendorDetailsPageSection from "sections/VendorPageSection/VendorDetailsPageSection";
import WarehouseDetailsPageSection from "sections/WarehousePageSection/WarehouseDetailsPageSection";

export default function DetailsPage() {
  const router = useRouter();
  const appPageType = router.query.appPageType;
  const pageTypeID = router.query.pageTypeID;
  const data = [
    // { type: "products", component: ProductsDetailsPageSection },
    // { type: "vendor", component: VendorDetailsPageSection },
    // { type: "warehouse", component: WarehouseDetailsPageSection },
    // { type: "inventory", component: InventoryPageSection },
  ];

  return (
    <DrawerLayout>
      {/* appPageType:{appPageType};<br />
			pageTypeID:{pageTypeID} */}
      {/* {Array.isArray(data) &&
				data.map((item) => {
					if (item.type === appPageType) return <item.component />;
				})} */}
    </DrawerLayout>
  );
}

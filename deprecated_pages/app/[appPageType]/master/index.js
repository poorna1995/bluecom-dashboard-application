import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
import MasterProductsPageSection from "sections/ProductsPageSection/MasterProductsPageSection";

export default function MasterTablePage() {
  const router = useRouter();
  const pageType = router.query.appPageType;
  const data = [{ type: "products", component: MasterProductsPageSection }];

  return (
    <DrawerLayout>
      {/* {data.map((item) => {
				if (item.type === pageType) return <item.component />;
			})} */}
    </DrawerLayout>
  );
}

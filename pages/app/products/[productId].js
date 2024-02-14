import { Box } from "@mui/material";
// import DrawerLayout from "layouts/DrawerLayout";
import React from "react";
// import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BundleDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection/BundleDetailsPageSections";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
// import BundleDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection/BundleDetailsPageSections";

// const ProductsDetailsPageSection = dynamic(
//   () => import("sections/ProductsPageSection/ProductsDetailsPageSection"),
//   {
//     ssr: false,
//   }
// );
// const BundleDetailsPageSection = dynamic(
//   () =>
//     import(
//       "sections/ProductsPageSection/ProductsDetailsPageSection/BundleDetailsPageSections"
//     ),
//   {
//     ssr: false,
//   }
// );
const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"));
export default function ProductDetailsPage() {
  const router = useRouter();
  const productType = router.query.productType;
  if (productType && productType === "bundle") {
    return (
      <DrawerLayout px={"0px"}>
        <Box sx={{}}>
          <BundleDetailsPageSection />
        </Box>
      </DrawerLayout>
    );
  }
  return (
    <DrawerLayout px={"0px"}>
      <Box sx={{}}>
        <ProductsDetailsPageSection />
      </Box>
    </DrawerLayout>
  );
}

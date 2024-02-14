// import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React from "react";
// import EditBundlePageSection from "sections/ProductsPageSection/EditProductsPageSection/EditBundlePageSections";
// import NewEditProductDetailsSection from "sections/ProductsPageSection/EditProductsPageSection/NewEditProductDetailsSection";
import dynamic from "next/dynamic";
const EditBundlePageSection = dynamic(
  () =>
    import(
      "sections/ProductsPageSection/EditProductsPageSection/EditBundlePageSections"
    ),
  {
    ssr: false,
  }
);
const NewEditProductDetailsSection = dynamic(
  () =>
    import(
      "sections/ProductsPageSection/EditProductsPageSection/NewEditProductDetailsSection"
    ),
  {
    ssr: false,
  }
);
const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"));
export default function EditProductDetailsPage() {
  const router = useRouter();
  const productType = router.query.productType;
  if (productType && productType === "bundle") {
    return (
      <DrawerLayout>
        <EditBundlePageSection />
      </DrawerLayout>
    );
  }
  return (
    <DrawerLayout>
      {/* <EditProductsDetailsPageSection /> */}
      <NewEditProductDetailsSection />
    </DrawerLayout>
  );
}

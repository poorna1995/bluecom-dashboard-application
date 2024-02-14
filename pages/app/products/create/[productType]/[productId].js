import { useRouter } from "next/router";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import DrawerLayout from "layouts/DrawerLayout";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import OnboardingLayout from "layouts/OnboardingLayout";

// const DrawerLayout = dynamic(() => import("layouts/DrawerLayout"), {
//   ssr: false,
// });

const StepperDrawer = dynamic(() =>
  import("components/Common/Drawer/StepperDrawer", {
    // suspense: true,
    ssr: false,
  })
);
const NewProductOnboardingSections = dynamic(() =>
  import("sections/OnboardingSections/NewProductOnboardingSections", {
    // suspense: true,

    // loading: () => <PageSpinner />,
    ssr: false,
  })
);
const CreateBundlePageSection = dynamic(() =>
  import(
    "sections/ProductsPageSection/CreateProductPageSection/CreateBundlePageSection",
    {
      // suspense: true,
      // loading: () => <PageSpinner />,
      ssr: false,
    }
  )
);

const mapState = ({ productsData }) => ({
  productsData,
});

export default function CreateProductPage() {
  const { productsData } = useSelector(mapState);
  const router = useRouter();
  const { productType, productId } = router.query;

  const createProductData = productsData.createProductData || {};

  const IS_COMPONENT = createProductData?.is_component === true;

  const CREATE_PRODUCT_BASE_ROUTE = `/app/products/create/product`;
  const CREATE_BUNDLE_BASE_ROUTE = `/app/products/create/bundle`;

  const productLinks = [
    {
      title: "Product Details",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=general-info&id=0`,
      step: "general-info",
    },
    {
      title: "Product Media",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=media&id=1`,
      step: "media",
    },
    {
      title: "Variants",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=variants&id=2`,
      step: "variants",
    },
    {
      title: "Select Vendor",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=select-vendor&id=3`,
      step: "select-vendor",
    },
    {
      title: "Inventory",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=inventory&id=4`,
      step: "inventory",
    },
  ];
  const componentLinks = [
    {
      title: "Product Details",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=general-info&id=0`,
      step: "general-info",
    },
    {
      title: "Product Media",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=media&id=1`,
      step: "media",
    },
    {
      title: "Select Vendor",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=select-vendor&id=2`,
      step: "select-vendor",
    },
    {
      title: "Inventory",
      url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=inventory&id=3`,
      step: "inventory",
    },
  ];
  console.log({ IS_COMPONENT });

  const pagesData = {
    product: {
      component: NewProductOnboardingSections,
      isStepOnboarding: true,
      keyForReduxData: IS_COMPONENT
        ? "componentOnboarding"
        : "productOnboarding",
      title: "Add New Product",
      description: "Complete all steps to add a new product",
      links: IS_COMPONENT ? componentLinks : productLinks,
      //  [
      // 	{
      // 		title: "Product Details",
      // 		url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=general-info&id=0`,
      // 		step: "general-info",
      // 	},
      // 	{
      // 		title: "Product Media",
      // 		url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=media&id=1`,
      // 		step: "media",
      // 	},
      // 	{
      // 		title: "Variants",
      // 		url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=variants&id=2`,
      // 		step: "variants",
      // 	},
      // 	{
      // 		title: "Select Vendor",
      // 		url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=select-vendor&id=3`,
      // 		step: "select-vendor",
      // 	},
      // 	{
      // 		title: "Inventory",
      // 		url: `${CREATE_PRODUCT_BASE_ROUTE}/${productId}?step=inventory&id=4`,
      // 		step: "inventory",
      // 	},
      // ],
    },
    bundle: {
      component: CreateBundlePageSection,
      isStepOnboarding: true,
      keyForReduxData: "bundleOnboarding",
      title: "Create Bundle",
      description: "Follow Steps to Create a Bundle",
      links: [
        {
          title: "Bundle Details",
          url: `${CREATE_BUNDLE_BASE_ROUTE}/${productId}?step=general-info&id=0`,
          step: "general-info",
        },
        {
          title: "Bundle Media",
          url: `${CREATE_BUNDLE_BASE_ROUTE}/${productId}?step=media&id=1`,
          step: "media",
        },
        {
          title: "Bundle Components",
          url: `${CREATE_BUNDLE_BASE_ROUTE}/${productId}?step=components&id=2`,
          step: "components",
        },
      ],
    },
  };

  const NotFound = () => <h1>No results found</h1>;
  const MyComponent =
    productType && pagesData[productType]
      ? pagesData[productType].component
      : NotFound;
  const routeLinks =
    productType && pagesData[productType] ? pagesData[productType].links : [];
  const keyForReduxData =
    productType && pagesData[productType]
      ? pagesData[productType].keyForReduxData
      : null;
  const drawerTitle =
    productType && pagesData[productType] ? pagesData[productType].title : null;
  const drawerDescription =
    productType && pagesData[productType]
      ? pagesData[productType].description
      : null;

  //  if (productType && productId)
  return (
    // <Suspense fallback={<PageSpinner />}>
    <OnboardingLayout
      RouterPushUrl={
        productType === "product"
          ? `/app/products`
          : `/app/products?selectedProductType=bundle`
      }
    >
      <StepperDrawer
        pageTitle={"Product"}
        links={routeLinks}
        keyForReduxData={keyForReduxData}
        drawerTitle={drawerTitle}
        drawerDescription={drawerDescription}
      >
        {productType && <MyComponent />}
      </StepperDrawer>
    </OnboardingLayout>
    // </Suspense>
  );
}

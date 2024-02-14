import EmptyState from "components/Common/EmptyState";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import OrdersEmptyState from "components/Common/Icons/EmptyStates/OrdersEmptyState";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { resetStore } from "redux/onboarding/onboardingSlice";

export default function ProductPublishPageTable({
  data,
  columnsData,
  totalCount,
  pageMaxHeight,
  loading,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateButtonClick = () => {
    const time = new Date().getTime();
    // router.push(`/app/products/create`);
    router.push(`/app/products/create/product/${time}?step=general-info&id=0`);
  };

  const handleActionTwo = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  const handleClickWebsite = (website_link = "bluecom.ai/contact-us") => {
    if (
      website_link.startsWith("https://") ||
      website_link.startsWith("http://")
    ) {
      return window.open(website_link, "_blank");
    }
    return window.open(`https://${website_link}`, "_blank");
  };

  if (loading) return <PageSpinner />;
  if (Array.isArray(data) && data.length === 0)
    return (
      <>
        <EmptyState
          icon={<ProductEmptyState />}
          text="No Products found to publish"
          bodyText={"We didn’t find products with bluecom to publish"}
        ></EmptyState>
        {/* <NewEmptyState
        hidePoints
        icon={<ProductEmptyState />}
        title="Manage Products with Bluecom"
        titleDesc={
          "We didn’t find products. Select a below recommended actions to manage products with bluecom."
        }
        note1={"Create a product with bluecom"}
        ActionOne={"Create Product"}
        handleActionOne={() => handleCreateButtonClick()}
        note2={"Connect your store with bluecom"}
        ActionTwo={"Connect Your Store"}
        handleActionTwo={() => handleActionTwo()}
        note3={"Contact us to get help in onboarding"}
        ActionThree={"Contact Us"}
        handleActionThree={() => handleClickWebsite("bluecom.ai/contact-us")}
      ></NewEmptyState> */}
      </>
    );
  return (
    <BluecomMRTBaseTable
      data={data}
      columnsData={columnsData}
      basePath={`/app/products/publish?`}
      totalRows={totalCount}
      shallUseRouter={true}
      muiTableContainerProps={{
        sx: {
          height: pageMaxHeight,
        },
      }}
      state={{
        showSkeletons: loading,
      }}
      rowHeight={60}
      muiTableBodyCellProps={{
        sx: {
          height: loading && "60px",
        },
      }}
    />
  );
}

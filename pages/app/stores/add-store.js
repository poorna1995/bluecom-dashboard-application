import BaseLayout from "layouts";
import StorePageLayout from "layouts/StorePageLayout";
import { useRouter } from "next/router";
import React from "react";
import AddNewStorePageSections from "sections/StoresPageSections/AddNewStorePageSections";

export default function AddStorePage() {
  const router = useRouter();
  const { id, channel } = router.query;
  const storePageNavLinks = [
    {
      title: "Select Channel",
      url: channel
        ? `/app/stores/add-store?step=select-channel&id=0&channel=${channel}`
        : `/app/stores/add-store?step=select-channel&id=0`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "select-channel",
    },
    {
      // title: "Add New Store",
      title: "Store Credentials",
      url: channel
        ? `/app/stores/add-store?step=add-new-store&id=1&channel=${channel}`
        : `/app/stores/add-store?step=add-new-store&id=1`,
      // isCompleted: checkisPreviousStepCompleted(pageType, "select-store"),
      step: "add-new-store",
    },

    {
      title: "Store Summary",
      url: channel
        ? `/app/stores/add-store?step=store-analysis&id=2&channel=${channel}`
        : `/app/stores/add-store?step=store-analysis&id=2`,
      step: "store-analysis",
    },
    {
      title: "Connect Locations",
      url: channel
        ? `/app/stores/add-store?step=connect-location&id=3&channel=${channel}`
        : `/app/stores/add-store?step=connect-location&id=3`,
      step: "connect-location",
    },

    {
      title: "Store Sync",
      url: channel
        ? `/app/stores/add-store?step=sync&id=4&channel=${channel}`
        : `/app/stores/add-store?step=sync&id=4`,
      // isCompleted: checkisPreviousStepCompleted(
      // 	pageType,
      // 	"verify-changes",
      // ),
      step: "sync",
    },
  ];
  return (
    <StorePageLayout
      links={storePageNavLinks}
      RouterPushUrl="/home"
      disableAllStepsOnSuccess
    >
      <AddNewStorePageSections />
    </StorePageLayout>
  );
}

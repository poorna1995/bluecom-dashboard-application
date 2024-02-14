import { Box, Container, Divider, Grid, Typography } from "@mui/material";

import React from "react";

import BasicTabs from "components/Common/Tabs/BasicTabs";
import POpdfPage from "./POpdfPage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";

function PurchaseOnboardingPreviewSection() {
  const router = useRouter();
  const { pageId } = router.query;
  const tabsData = [
    {
      id: 1,
      label: "PDF",
      component: <POpdfPage />,
      route: `pdf`,
    },
    {
      id: 2,
      label: "CSV",
      component: <Typography>258674967943</Typography>,
      route: "csv",
    },
  ];

  return (
    <>
      <Container sx={{ display: "flex", mt: "16px" }}>
        <BasicTabs
          data={tabsData}
          basepath="/onboarding/purchase-orders/1678906601514?step=preview&id=1"
        />
        <PrimaryButton
          onClick={() =>
            router.push(
              `/onboarding/purchase-orders/${pageId}?step=send-po&id=2`
            )
          }
        >
          Continue
        </PrimaryButton>
      </Container>
    </>
  );
}

export default PurchaseOnboardingPreviewSection;

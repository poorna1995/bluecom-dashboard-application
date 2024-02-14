import { Card, Grid } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseLayout from "layouts";
import { useRouter } from "next/router";
import React from "react";

const PurchaseOrderDetailsPage = () => {
  const router = useRouter();
  const pOrderId = router.query.pOrderId;

  return (
    <BaseLayout>
      <Grid container spacing={4} sx={{ padding: "32px", fontWeight: "600" }}>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ padding: "32px" }}>
            Purchase Order
            <br />
            {pOrderId}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ padding: "32px" }}>
            Date Created
            <br />
            July 3, 2022
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ padding: "32px" }}>
            Expected Date
            <br />
            July 25,2022
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ padding: "32px" }}>
            Order Number
            <br />
            1254
          </Card>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default PurchaseOrderDetailsPage;

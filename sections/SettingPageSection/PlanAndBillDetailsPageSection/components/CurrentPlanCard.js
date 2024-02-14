import { Box, Grid } from "@mui/material";
import React from "react";
import StatusAsChipPlan from "components/Common/Chip/StatusAsChipPlan";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import getCurrencyValue from "../../../../utils/currencyConversion/getCurrencyValue";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { PAYMENTS } from "constants/API_URL";
import { useQuery } from "@tanstack/react-query";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";

export default function CurrentPlanCard({ subscription = {} }) {
  const productId = subscription?.items?.data[0]?.plan?.product;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["planData", productId],

    queryFn: () =>
      appFetch(PAYMENTS.FETCH_PRODUCT_DETAILS, {
        product_id: productId,
      }).then((json) => json),
  });
  const product = data?.result ?? {};
  console.log({ product });

  if (isLoading)
    return (
      <PageSpinner
        spinnerStyles={{
          height: "300px",
        }}
      />
    );
  return (
    <Grid
      container
      sx={{
        border: "1px solid #0000001A",
        borderRadius: "10px",
      }}
    >
      {/* plan details  */}
      <Grid item xs={12} md={9} lg={9}>
        <Box sx={{ px: "31px", py: "30px" }}>
          {/* plan title and status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <SectionTitleText
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#313D4E",
              }}
            >
              {product?.name}
            </SectionTitleText>
            <StatusAsChipPlan
              status={subscription.status}
              paddingx={"24px"}
              paddingy={"17px"}
              fontSize={"16px"}
              fontWeight={"600"}
            />
          </Box>

          {/* plan price and month */}

          <Box
            sx={{
              display: "flex",
              pt: "30px",
              alignItems: "baseline",
            }}
          >
            <DescriptionText
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#313D4E",
                // "& span": {
                fontSize: "42px",
                // },
              }}
            >
              {subscription.plan &&
                getCurrencyValue(
                  subscription.plan.amount / 100,
                  subscription.currency
                )}
              {/* $<span>59.99</span> */}
            </DescriptionText>
          </Box>
          <DescriptionText
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#313D4E",
              py: "10px",
            }}
          >
            Per month
          </DescriptionText>

          {/* subscribed bill, bill cycle, next bill */}
          <Box sx={{ pt: "41px" }}>
            <Box
              sx={{
                display: "flex",
                pb: "23px",
                alignItems: "baseline",
              }}
            >
              <DescriptionText
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#313D4E",
                  "& span": {
                    fontWeight: "700",
                  },
                }}
              >
                Subscribed Since:
                <span>
                  {/* <RenderDate date={subscription.created * 1000} /> */}
                  {/* {subscription.created} */}
                  {/* 02 April 2023 */}
                </span>
              </DescriptionText>
            </Box>
            <Box
              sx={{
                display: "flex",
                pb: "23px",
                alignItems: "baseline",
              }}
            >
              <DescriptionText
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#313D4E",
                  "& span": {
                    fontWeight: "700",
                  },
                }}
              >
                Bill Cycle:
                <span>
                  {/* <RenderDate date={subscription.current_period_start * 1000} /> */}
                  {/* Monthly (Renews on 2 of every month) */}
                </span>
              </DescriptionText>
            </Box>
            <Box
              sx={{
                display: "flex",
                pb: "23px",
                alignItems: "baseline",
              }}
            >
              <DescriptionText
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#313D4E",
                  "& span": {
                    fontWeight: "700",
                  },
                }}
              >
                Next Bill Date:
                <span>
                  {" "}
                  {/* <RenderDate date={subscription.current_period_end * 1000} /> */}
                  {/* Monthly (Renews on 2 of every month) */}
                </span>
              </DescriptionText>
            </Box>
          </Box>
          <OutlinedButton sx={{ p: "10px" }}>Plan Details</OutlinedButton>
        </Box>
      </Grid>
      {/* Upgrade button */}
      <Grid item xs={12} md={3} lg={3}>
        <Box
          sx={{
            p: "30px 45px 30px 0px",
            // px: "45px",
            // py: "30px",
            display: "flex",
            justifyContent: "right",
          }}
        >
          <PrimaryButton>Upgrade Plan</PrimaryButton>
        </Box>
      </Grid>
    </Grid>
  );
}

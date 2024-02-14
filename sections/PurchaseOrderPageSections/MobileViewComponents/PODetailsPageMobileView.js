import { Divider, IconButton, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import { MdArrowBack } from "react-icons/md";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderLinearProgressBar from "components/Common/Tables/RenderComponents/RenderLinearProgressBar";
import PODetailViewCard from "./PODetailViewCard";
import MobileViewProductsListPagination from "sections/ProductsPageSection/components/MobileViewComponents/MobileViewProductsListPagination";
import MobileViewListSkeleton from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListSkeleton";
import { useRouter } from "next/router";

export default function PODetailsPageMobileView({
  text,
  data,
  totalOrderedQty,
  orderProductsData,
  totalRows,
  loading,
}) {
  const router = useRouter();
  return (
    <>
      {/* {loading ? (
      <MobileViewListSkeleton />
    ) : ( */}

      <Box
        sx={{
          pl: 2,
          pr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 1,
          }}
        >
          <IconButton
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              p: "4px",
            }}
            onClick={() => router.push("/app/purchase-orders?tab=all")}
          >
            <MdArrowBack />
          </IconButton>
        </Box>
        <Box
          sx={{
            pt: "24px",
          }}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <SectionTitleText
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "21px",
                fontWeight: "700",
                color: "#212121",
              }}
            >
              #{data.po_id}
              <span>
                <ChipForDifferentStatus status={data.status} />
              </span>
            </SectionTitleText>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(0, 0, 0, 0.10)",
            borderRadius: "4px",
            mt: "16px",
          }}
        >
          <div
            style={{
              margin: "18px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#414141",
              }}
            >
              Vendor Details
              {loading ? (
                <Skeleton variant="rounded" height="30px" width={"200px"} />
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#00000",
                  }}
                >
                  {data?.vendor_name ?? data?.vendor?.company_name}
                </span>
              )}
              {loading ? (
                <Skeleton variant="rounded" height="20px" width={"200px"} />
              ) : (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#414141",
                  }}
                >
                  {data?.vendor?.city}, {data?.vendor?.state},{" "}
                  {data?.vendor?.country}
                </span>
              )}
              <Divider
                variant="middle"
                sx={{
                  mt: 2,
                  ml: -1,
                  mr: -1,
                }}
              />
            </Typography>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#414141",
                mt: 2,
              }}
            >
              Destination
              {loading ? (
                <Skeleton variant="rounded" height="30px" width={"200px"} />
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#00000",
                  }}
                >
                  {data?.warehouse?.wh_name}
                </span>
              )}
              {loading ? (
                <Skeleton variant="rounded" height="20px" width={"200px"} />
              ) : (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#414141",
                  }}
                >
                  {data?.warehouse?.city}, {data?.warehouse?.state},{" "}
                  {data?.warehouse?.country}
                </span>
              )}
              <Divider
                variant="middle"
                sx={{
                  mt: 2,
                  ml: -1,
                  mr: -1,
                }}
              />
            </Typography>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#414141",
                mt: 2,
              }}
            >
              Expected Arrival
              {loading ? (
                <Skeleton variant="rounded" height="20px" width={"200px"} />
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#00000",
                  }}
                >
                  <RenderDate date={data.promise_date} />
                </span>
              )}
              <Divider
                variant="middle"
                sx={{
                  mt: 2,
                  ml: -1,
                  mr: -1,
                }}
              />
            </Typography>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#414141",
                mt: 2,
              }}
            >
              Received Quantity
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#00000",
                }}
              >
                <RenderLinearProgressBar
                  x={data.total_received_qty}
                  y={totalOrderedQty}
                />
              </span>
              <Divider
                variant="middle"
                sx={{
                  mt: 2,
                  ml: -1,
                  mr: -1,
                }}
              />
            </Typography>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#414141",
                mt: 2,
              }}
            >
              Notes:
              {loading ? (
                <Skeleton variant="rounded" height="80px" width={"250px"} />
              ) : (
                <Typography
                  sx={{
                    ml: 2,
                    mt: 1,
                    mb: 2,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  {text}{" "}
                </Typography>
              )}
            </Typography>
          </div>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#414141",
              mt: 2,
              mb: 2,
            }}
          >
            Ordered Products
          </Typography>

          {loading ? (
            <MobileViewListSkeleton />
          ) : (
            <PODetailViewCard orderProductsData={orderProductsData} />
          )}
        </Box>
        <MobileViewProductsListPagination
          basePath={`/app/purchase-orders/${data.po_id}?`}
          totalRows={totalRows}
          shallUseRouter={true}
        />
      </Box>
      {/* )} */}
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      {/* <Skeleton
        variant="circular"
        height={"40px"}
        width={"300px"}
        sx={{ mr: 2 }}
      /> */}
      <Skeleton
        variant="rounded"
        height="30px"
        width={"200px"}
        // sx={{ mb: 1 }}
      />
    </Box>
  );
};

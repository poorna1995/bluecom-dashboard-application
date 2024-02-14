import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppLink from "components/Common/AppLink";
import CircleIcon from "@mui/icons-material/Circle";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import ChipForDifferentStatus from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/ChipForDifferentStatus";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MobileViewListPagination from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListPagination";
import MobileViewListSkeleton from "sections/AppPageSections/MobileViewAppPageSections/MobileViewListSkeleton";

const commonStyles = {
  SectionTitleText: {
    fontWeight: "700",
    // color: (theme) => theme.palette.text.auth,
    color: "#000",
    fontSize: ["18px", "20px", "28px", "28px"],
    display: "flex",
    alignItems: "baseline",
  },
  PurchaseOrderCount: {
    color: "#535353",
    // marginTop: "3px",
    fontSize: ["12px", "14px", "16px", "16px"],
    fontWeight: "700",
    color: "#595959",
    lineHeight: "40px",
    marginLeft: "4px",
  },
  CreateOrderButton: {
    paddingRight: ["10px", "10px", "24px", "24px"],
    paddingLeft: ["10px", "10px", "24px", "24px"],
  },

  AppLink: {
    textDecoration: "none",
  },

  POTitle: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "17px",
    color: "#000",
    ml: "0px",
    textDecoration: "none",
  },

  PoDetails: {
    fontSize: "12px",
    color: "#616161",
  },
  Circle: {
    fontSize: "2px",
  },
  POReceived: {
    color: "#4EA15F",
    fontSize: "12px",
    fontWeight: "600",
  },
  POOrdered: {
    color: "#616161",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default function POListMobileView({
  data = [],
  basePath,
  totalCount,
  loading,
  shallUseRouter,
}) {
  return (
    <>
      {/* {loading ? (
        <MobileViewListSkeleton />
      ) : ( */}
      <Box sx={{ width: "100%" }}>
        {/* {console.log("data", data)} */}
        {Array.isArray(data) &&
          data.map((item) => (
            <Box
              key={item.po_id}
              borderBottom={"1px solid rgba(17, 17, 17, 0.10)"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "16px 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                <AppLink
                  href={
                    item.status === true
                      ? `/app/purchase-orders/create/${item.po_id}?step=po-details&id=0`
                      : `/app/purchase-orders/${item.po_id}`
                  }
                  // onClick={() => handleClickDraftPO(item)}
                  style={commonStyles.AppLink}
                >
                  <Typography sx={commonStyles.POTitle}>
                    #{item.po_id}
                  </Typography>
                </AppLink>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.2rem",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={commonStyles.PoDetails}>
                    {item.vendor_name}
                  </Typography>
                  {item.wh_name && <CircleIcon sx={commonStyles.Circle} />}
                  <Typography sx={commonStyles.PoDetails}>
                    {item.wh_name}
                  </Typography>
                  <CircleIcon sx={commonStyles.Circle} />

                  <RenderDate
                    sx={commonStyles.PoDetails}
                    date={item.created_at}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.875rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "2 px",
                    color: "#595959",
                  }}
                >
                  <ChipForDifferentStatus
                    fontSize="10px"
                    status={item.status}
                  />
                  <AppLink
                    sx={{
                      fontWeight: "600",
                      ml: 1,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    href={
                      item.status === "draft"
                        ? `/app/purchase-orders/create/${item.po_id}?step=po-details&id=0`
                        : `/app/purchase-orders/${item.po_id}`
                    }
                    // onClick={() => handleClickDraftPO(item)}
                    style={commonStyles.AppLink}
                  >
                    <ArrowForwardIosIcon sx={{ color: "#595959" }} />
                  </AppLink>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={commonStyles.POReceived}>
                    {item.total_received_qty}
                  </Typography>
                  <Typography sx={commonStyles.POOrdered}>
                    /{item.total_qty_ordered}
                  </Typography>
                </Box>
              </Box>
              {/* add more details here */}
            </Box>
          ))}
      </Box>
      <MobileViewListPagination
        basePath={"/app/purchase-orders?tab=all&"}
        totalRows={totalCount}
        shallUseRouter={true}
      />

      {/* )} */}
    </>
  );
}

import { Box, Breadcrumbs, Typography, IconButton } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import StatusAsChip from "components/Common/Chip/StatusAsChip";
import BillIcon from "components/Common/Icons/BillIcon";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TopSectionProductDescription from "sections/ProductsPageSection/ProductsDetailsPageSection/components/TopSectionProductDescription";
import Divider from "@mui/material/Divider";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import SmallOverviewSection from "../SmallOverviewSection";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { MdArrowBack } from "react-icons/md";
import ThreeDotsMenuIcon from "components/Common/Icons/MobileIcons/ThreeDotsMenuIcon";
import EditIconPencile from "components/Common/Icons/EditIconPencile";
import { format } from "date-fns";

export default function MobileDetailsPageSection({
  isLoading,
  data = {},
  topNavBarRef,
  isUsedOnReviewPage,
  breadCrumbMainLink,
  breadCrumbMainLinkTitle,
  usedIn,
  id,
  editLink,
  getChannelsData,
  productURL,
  handleViewProduct,
  formatedCreatedAtDate,
  stickyHeightForDesc,
  tabsData,
  tabsBasePath,
  isTabAfterQuery,
  handleSyncInventory,
}) {
  const router = useRouter();
  const { from } = router.query;
  const [scroll, setScroll] = useState(0);
  const [isShrunk, setShrunk] = useState(false);
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 12 ||
            document.documentElement.scrollTop > 12)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 2 &&
          document.documentElement.scrollTop < 2
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    // Previous logic.
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [comingFrom, setComingFrom] = useState(from || "");

  useEffect(() => {
    if (router.asPath.includes("from")) {
      setComingFrom(from);
      // router.replace(router.asPath);
    } else {
      if (comingFrom) {
        router.replace(`${router.asPath}&from=${comingFrom}`);
      }
    }
  }, [from]);
  console.log({ router, from, comingFrom });

  const getMinHeight = typeof window !== "undefined" && window.innerHeight + 40;

  const UpdatedDate = data.updated_at && new Date(data.updated_at);
  const formatedLastUpdatedDate = UpdatedDate && format(UpdatedDate, "hh:mm a");

  return (
    <Box
      sx={
        {
          // minWidth: "100%",
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          pl: 2,
          pr: 2,
          mt: -1,
        }}
      >
        <IconButton
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            p: "4px",
          }}
          onClick={() => router.push("/app/products")}
        >
          <MdArrowBack />
        </IconButton>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // pr: 1,
            fontSize: "12px",
            fontWeight: "600",
            color: "#616161",
            width: "100%",
          }}
        >
          Last Updated:
          {/* {formatedLastUpdatedDate || "-"} */}
          <span>
            <RenderDate date={data.updated_at} />
          </span>
        </Typography>
        {/* <IconButton
          sx={{
            width: "40px",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
          }}
        >
          <ThreeDotsMenuIcon />
        </IconButton> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
        }}
      >
        {data.display_image && (
          <AppImage
            src={data.display_image}
            height="150"
            width="150"
            sx={{
              ml: "16px",
              borderRadius: "5px",
              mr: 1,
              mt: "12px",
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              width: "90px",
              height: "100px",
              transition: `width 0.2s ease-in-out, height 0.2s ease-in-out`,
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "11px",
            mt: "12px",
            pr: "16px",
            pb: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "21px",
              fontWeight: "700",
              //   pb: "11px",
            }}
          >
            {data.product_title}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "20px",
              color: "#616161",
            }}
          >
            SKU: {data.product_sku} <span>Barcode: {data.product_barcode}</span>
          </Typography>
          {/* <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Retail Price:
          </Typography> */}
          <RenderCurrency
            value={data.unit_retail_price || data.item_unit_retail_price}
            currency={data.currency}
            sx={{
              fontSize: "14px",
              fontWeight: "700",
            }}
          />
          {data.category && (
            <Box
              sx={{
                display: "flex",
                p: "0.5rem 0.9rem",
                borderRadius: "2rem",
                border: "1px solid #0000001A",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {data.category}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              //   gap: "10px",
            }}
          >
            {!(data.status === "unlisted") && (
              <RenderStatusAsChip
                status={data.status}
                fontSize={14}
                fontWeight={700}
                // marginTop={"-5px"}
              />
            )}
            {!(data.status == "unlisted") && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: "2.5rem",
                  alignSelf: "center",
                  ml: "0.5rem",
                  mr: "0.5rem",
                }}
              />
            )}
            <ChannelGroups channelDetails={data.channels ?? []} />
            {productURL && (
              <>
                <OutlinedButton
                  sx={{
                    paddingRight: {
                      xs: "10px",
                      sm: "24px",
                    },
                    paddingLeft: {
                      xs: "10px",
                      sm: "24px",
                    },
                    ml: "8px",
                    // width: "auto",
                  }}
                  onClick={() => handleViewProduct()}
                >
                  View product
                </OutlinedButton>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <RouterTabs
        tabContainerStyles={{
          //   position: "sticky",
          top: "240px",
          py: 1,
          // pt: 2,
          backgroundColor: "#fff",
          zIndex: (theme) => 500,
          // 10-5-2023
          borderBottom: "1px solid #0000001A",
        }}
        tabRowStyles={{
          px: "16px",
          pb: 0,
        }}
        tabChildStyles={{
          px: "16px",
          // position: "sticky",
          // top: "360px",
          pt: 2,
        }}
        sx={{ fontSize: "14px" }}
        data={tabsData}
        basePath={tabsBasePath}
        isTabAfterQuery={isTabAfterQuery}
      />
    </Box>
  );
}

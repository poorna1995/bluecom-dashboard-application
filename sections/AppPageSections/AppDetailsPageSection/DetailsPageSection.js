import { Box, Breadcrumbs, Typography } from "@mui/material";
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
import SmallOverviewSection from "./SmallOverviewSection";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";

export default function DetailsPageSection({
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
  formatedLastUpdatedDate,
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

  /***
   *
   * const toggler = document.getElementById("toggler");
const toggleBox = document.getElementById("box");
const isHidden = () => toggleBox.classList.contains("box--hidden");

toggleBox.addEventListener("transitionend", function () {
  if (isHidden()) {
    toggleBox.style.display = "none";
  }
});

toggler.addEventListener("click", function () {
  if (isHidden()) {
    toggleBox.style.removeProperty("display");
    setTimeout(() => toggleBox.classList.remove("box--hidden"), 0);
  } else {
    toggleBox.classList.add("box--hidden");
  }
}); 
   * 


   */
  const [comingFrom, setComingFrom] = useState(from || "");

  // useEffect(() => {
  // 	if (from) {
  // 		setComingFrom(from);
  // 		router.replace(router.asPath);
  // 	}
  // 	if (!from) {
  // 		router.replace(`${router.asPath}&from=${comingFrom}`);
  // 	}
  // }, [from]);
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
  const breadCrumbMainLinkNav =
    comingFrom === "publish-products"
      ? "/app/products/publish"
      : breadCrumbMainLink;
  const breadCrumbMainLinkTitleNav =
    comingFrom === "publish-products"
      ? "Publish Products"
      : breadCrumbMainLinkTitle;
  const getMinHeight = typeof window !== "undefined" && window.innerHeight + 40;
  return (
    <Box>
      {isLoading && <PageLoader />}

      {!isLoading && data && (
        <>
          <BaseCard sx={{ overflow: "unset", minHeight: getMinHeight }}>
            {!isLoading && (
              <>
                {
                  <Box
                    sx={{
                      mt: -1,
                      // marginBottom: "10px",
                      // backgroundColor: "white",
                      position: !isUsedOnReviewPage && "sticky",

                      top: !isUsedOnReviewPage && "110px",
                      pt: isUsedOnReviewPage && "16px",
                      // border: "1px solid",
                      backgroundColor: "#f6f5ff",
                      zIndex: (theme) => theme.zIndex.appBar,
                      px: "36px",
                      pb: 2,
                      height: isShrunk ? "auto" : "auto",
                      transition: `height 2s ease-in-out`,
                    }}
                    ref={topNavBarRef}
                  >
                    {
                      <>
                        {!isUsedOnReviewPage && (
                          // !isShrunk &&
                          <Breadcrumbs
                            sx={{
                              fontSize: "16px",
                              padding: "20px",
                              fontWeight: "600",
                              display: isShrunk ? "none" : "block",
                              transition: `opacity 1s ease-in-out`,
                            }}
                            aria-label="breadcrumb"
                          >
                            <AppLink
                              href={breadCrumbMainLinkNav ?? "/app/products"}
                              sx={{
                                color: "#4F44E0",
                              }}
                            >
                              {breadCrumbMainLinkTitleNav}
                            </AppLink>

                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                              // underline="hover"
                              color="#222222"
                              fontSize="5rem"
                              fontWeight="700"
                              // href="/material-ui/react-breadcrumbs/"
                              // aria-current="page"
                            >
                              {usedIn} ID: {id}
                            </Typography>
                          </Breadcrumbs>
                        )}

                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              // borderBottom: "2px solid rgba(0,0,0,0.1)",
                              // backgroundColor: "white",
                              // background: "white",
                              zIndex: (theme) => theme.zIndex.drawer + 11000,
                              flex: 1,
                              pt: isShrunk && "12px",
                            }}
                          >
                            <Box>
                              {/* <BaseCard
                sx={{
                  height: "150px",
                  width: "120px",
                  marginLeft: "20px",
                  marginBottom: "20px",
                  borderRadius: "0px",
                }}
              > */}
                              {data.display_image && (
                                <AppImage
                                  src={data.display_image}
                                  height="150"
                                  width="150"
                                  sx={
                                    !isShrunk
                                      ? {
                                          ml: "16px",
                                          borderRadius: "5px",
                                          mr: 1,
                                          border: (theme) =>
                                            `1px solid ${theme.palette.grey[300]}`,
                                          transition: `width 0.5s ease-in-out, height 0.5s ease-in-out`,
                                        }
                                      : {
                                          ml: "16px",
                                          borderRadius: "5px",
                                          mr: 1,
                                          border: (theme) =>
                                            `1px solid ${theme.palette.grey[300]}`,
                                          width: "100px",
                                          height: "100px",
                                          transition: `width 0.2s ease-in-out, height 0.2s ease-in-out`,
                                        }
                                  }
                                  // sx={{ objectFit: "contain" }}
                                />
                              )}{" "}
                              {/* </BaseCard> */}
                            </Box>

                            <Box
                              sx={{
                                ml: 1,
                                flex: 1,
                              }}
                            >
                              <TopSectionProductDescription
                                productType={usedIn}
                                isShrunk={isShrunk}
                                data={data}
                              />

                              <Box
                                sx={{
                                  display: "flex",
                                  "& span": {
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    display: "flex",
                                    mr: 1,
                                    alignItems: "center",
                                  },
                                }}
                              >
                                <span>
                                  Selling Price:
                                  <RenderCurrency
                                    value={
                                      data.unit_retail_price ||
                                      data.item_unit_retail_price
                                    }
                                    currency={data.currency}
                                    sx={{
                                      ml: 1,
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      transition: `all 0.3s ease-in-out`,
                                    }}
                                  />
                                </span>
                                <span>|</span>
                                <span>
                                  Cost Price:
                                  <RenderCurrency
                                    value={
                                      data.unit_cost_price ||
                                      data.item_unit_cost_price
                                    }
                                    currency={data.currency}
                                    sx={{
                                      ml: 1,
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      transition: `all 0.3s ease-in-out`,
                                    }}
                                  />
                                </span>
                              </Box>

                              {!isShrunk && !isUsedOnReviewPage && (
                                <PrimaryButton
                                  size="small"
                                  onClick={() => router.push(editLink)}
                                  sx={{
                                    mt: 1,
                                  }}
                                >
                                  Edit Details
                                </PrimaryButton>
                              )}

                              {!isShrunk && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "1rem",
                                  }}
                                >
                                  {data.category && (
                                    <Box
                                      sx={{
                                        // mt: "1rem",
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center",
                                        p: "0.5rem 0.9rem",
                                        Width: "1rem",
                                        borderRadius: "2rem",
                                        border: "1px solid #0000001A",
                                        mt: 2,
                                      }}
                                    >
                                      <BillIcon />
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "700",
                                        }}
                                      >
                                        {data.category}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              )}
                              {/* {!isShrunk && !isUsedOnReviewPage && (
                                <PrimaryButton
                                  sx={{
                                    m: "1rem 0",
                                  }}
                                  onClick={() => router.push(editLink)}
                                >
                                  Edit
                                </PrimaryButton>
                              )} */}
                            </Box>
                            {!isUsedOnReviewPage && !isShrunk && (
                              <Box>
                                {
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-end",
                                      justifyContent: "right",
                                      pr: "1rem",
                                      gap: "1rem",
                                      mt: "-36px",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px",
                                      }}
                                    >
                                      {!(data.status === "unlisted") && (
                                        <RenderStatusAsChip
                                          status={data.status}
                                          fontSize={14}
                                          fontWeight={700}
                                          marginTop={"-5px"}
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
                                          }}
                                        />
                                      )}
                                      {/* {Array.isArray(getChannelsData) &&
                                        getChannelsData.map((item, index) => (
                                          <RenderChannelAsIcon
                                            key={index}
                                            channel={item}
                                            value={item["Channel Name"]}
                                          />
                                        ))} */}
                                      <ChannelGroups
                                        channelDetails={data.channels ?? []}
                                      />
                                    </Box>

                                    {/* {productURL && (
                                      <>
                                        <OutlinedButton
                                          onClick={() => handleViewProduct()}
                                          sx={{
                                            ml: 1,
                                          }}
                                          startIcon={<ViewLiveIcon />}
                                        >
                                          View Live product
                                        </OutlinedButton>
                                        {/* <OutlinedButton
                                          onClick={() => handleSyncInventory()}
                                        >
                                          Sync Inventory
                                        </OutlinedButton> 
                                      </>
                                    )} */}
                                    {
                                      <Box>
                                        <Box>
                                          <DescriptionText
                                            sx={{
                                              color: (theme) =>
                                                theme.palette.text.secondary,
                                              fontWeight: "500",
                                              fontSize: "14px",
                                              "& span": {
                                                fontWeight: 600,
                                                ml: 2,
                                                color: (theme) =>
                                                  theme.palette.text.secondary,
                                              },
                                            }}
                                          >
                                            Created on :
                                            <span>
                                              {/* : {formatedCreatedAtDate} */}
                                              <RenderDate
                                                date={data.created_at}
                                              />
                                            </span>
                                          </DescriptionText>
                                        </Box>
                                        <Box>
                                          <DescriptionText
                                            sx={{
                                              color: (theme) =>
                                                theme.palette.text.secondary,
                                              fontWeight: "500",
                                              fontSize: "14px",
                                              "& span": {
                                                fontWeight: 600,
                                                ml: 1,
                                                color: (theme) =>
                                                  theme.palette.text.secondary,
                                              },
                                            }}
                                          >
                                            Last Updated :
                                            <span>
                                              {/* : {formatedLastUpdatedDate} */}
                                              <RenderDate
                                                date={data.updated_at}
                                              />
                                            </span>{" "}
                                          </DescriptionText>
                                        </Box>
                                      </Box>
                                    }
                                  </Box>
                                }
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </>
                    }
                    {/* {isShrunk && (
                      <SmallOverviewSection
                        data={data}
                        usedIn={usedIn}
                        isUsedOnReviewPage={isUsedOnReviewPage}
                      />
                    )} */}
                  </Box>
                }
                {/* tabs */}
                <Box
                  sx={{
                    // marginTop: "20px",
                    backgroundColor: "white",
                    // px: "36px",
                    // pb: "32px",
                  }}
                >
                  {isUsedOnReviewPage ? (
                    <>
                      {/* {isUsedOnReviewPage && (
                    <SectionTitleText
                      sx={{
                        mb: "16px",
                      }}
                    >
                      {data.product_title}
                    </SectionTitleText>
                  )} */}
                      <BasicTabs
                        sx={{ fontSize: "14px" }}
                        data={tabsData}
                        tabRowStyles={{
                          px: "36px",
                        }}
                        tabChildStyles={{
                          px: "36px",
                          // position: "sticky",
                          // top: "360px",
                          pt: isShrunk ? 10 : 2,
                        }}
                      />
                    </>
                  ) : (
                    <RouterTabs
                      tabContainerStyles={{
                        position: "sticky",
                        top: "240px",
                        // py: 2,
                        pt: 2,
                        // pb: 1,
                        backgroundColor: "#fff",
                        zIndex: (theme) => 500,
                        // 10-5-2023
                        // borderBottom:
                        // 	"1px solid #0000001A",
                      }}
                      tabRowStyles={{
                        px: "36px",
                        pb: 0,
                      }}
                      tabChildStyles={{
                        px: "36px",
                        // position: "sticky",
                        // top: "360px",
                        pt: isShrunk ? 10 : 2,
                      }}
                      sx={{ fontSize: "14px" }}
                      data={tabsData}
                      basePath={tabsBasePath}
                      isTabAfterQuery={isTabAfterQuery}
                    />
                  )}
                </Box>
              </>
            )}
          </BaseCard>
        </>
      )}
    </Box>
  );
}

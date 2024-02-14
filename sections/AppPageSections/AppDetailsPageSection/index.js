import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useEffect, useState } from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { Router, useRouter } from "next/router";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import productImage from "public/assets/t-shirt.png";
import { CHANNEL, PRODUCT, VENDOR } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BaseCard from "components/Common/Cards/BaseCard";
import { FlashAuto, TypeSpecimenOutlined } from "@mui/icons-material";
import AppLink from "components/Common/AppLink";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import { MdHomeFilled } from "react-icons/md";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import TagIconBlack from "components/Common/Icons/TagIconBlack";
import EditIcon from "components/Common/Icons/EditIcon";
import TagIcon from "components/Common/Icons/TagIcon";
import OutlineClockIcon from "components/Common/Icons/OutlineClockIcon";
import WalletIcon from "components/Common/Icons/WalletIcon";
import DetailPageRightSection from "sections/VendorPageSection/DetailPageRightSection";
import VendorOnboardingAddProductDialog from "sections/OnboardingSections/VendorOnboardingSection/VendorOnboardingAddProductDialog";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function AppDetailsPageSection({
  display_image,
  title,
  last_updated,
  created_on,
  products,
  activePO,
  lead_time,
  tabsData,
  pageType,
  pageID,
  isLoading,
  isUsedOnReviewPage,
  basePath,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const vendorId = router.query.vendorId;
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser && currentUser.merchant_id;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let darkHex = Math.floor(hex / 1.5);
    let color = "#" + darkHex.toString(16);

    return color;
  }

  // format the last updated date
  const lastUpdatedDate = new Date(last_updated);
  const lastUpdatedDateFormatted = lastUpdatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // format the created on date
  const createdOnDate = new Date(created_on);
  const createdOnDateFormatted = createdOnDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleFetchProductsList = () => {
    const URL = VENDOR.FETCH_PRODUCT;
    // setLoading(true);
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log("json", json);
        setProductDataWithId(json.result);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchProductsList();
    }
  }, [vendorId]);

  return (
    <Box>
      {isLoading && <SectionLoader />}

      {!isLoading && (
        <>
          {!isUsedOnReviewPage && (
            <Box
              sx={{
                mt: -1,
                marginBottom: "10px",
                // backgroundColor: "white",
                position: "sticky",
                top: "110px",
                // border: "1px solid",
                backgroundColor: "#F5F5F5",
                zIndex: (theme) => theme.zIndex.appBar,
                px: "36px",
                pb: 2,
              }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                // sx={{ pl: "16px", pt: "16px" }}
                sx={{
                  padding: "16px",
                }}
              >
                <AppLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  href="/app/vendors"
                >
                  {/* <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />  */}
                  Vendors & Suppliers
                </AppLink>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#222222",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  color="text.primary"
                >
                  {/* <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />  */}
                  Vendor Id: {vendorId}
                </Typography>
              </Breadcrumbs>

              <Grid container spacing={2}>
                <Grid item md={1.3} sm={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: "16px",
                    }}
                  >
                    {display_image ? (
                      <AppImage
                        src={display_image}
                        height="150"
                        width="150"
                        sx={{
                          // ml: "100px",
                          // mt: "16px",
                          borderRadius: "100px",
                          border: "1px solid rgb(208, 213, 221)",
                          // border: "1px solid #000000",
                        }}
                      />
                    ) : (
                      <Avatar
                        height="150"
                        width="150"
                        sx={{
                          // ml: "100px",
                          // mt: "16px",
                          borderRadius: "100px",
                          // backgroundColor: randomColor(),
                          // border: "1px solid #000000",
                          fontSize: "64px",
                          minHeight: "150px",
                          minWidth: "150px",
                        }}
                      >
                        {/* {title && `${title.split(" ")[0][0]}` + `${title.split(" ")[1][0]}` || `${title.split("")[0][0] }`}  */}
                        {title && `${title.split(" ")[0][0]}`}
                      </Avatar>
                    )}
                    {/* <AppImage
										// sx={{ objectFit: "contain" }}
										/> */}
                  </Box>
                  {/* </BaseCard> */}
                </Grid>

                <Grid item md={6} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          // p: "30px 16px",
                          mt: "18px",
                          // marginLeft: "16px",
                        }}
                      >
                        <SectionTitleText
                          sx={{
                            fontWeight: "600",
                            fontSize: "20px",
                            color: (theme) => theme.palette.text.primary,
                            // paddingTop: "20px",
                          }}
                        >
                          {title}
                        </SectionTitleText>
                        <DescriptionText
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: (theme) => theme.palette.text.primary,
                            // marginLeft: "80px",
                            // paddingTop: "10px",
                          }}
                        >
                          {pageType} ID :{" "}
                          <span
                            style={{
                              fontWeight: "700",
                            }}
                          >
                            {pageID}
                          </span>
                        </DescriptionText>
                        {/* <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              // mt: "1rem",
                              // ml: "80px",
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                              background: "#E2E8FF",
                              p: "0.5rem 0.9rem",
                              Width: "50px",
                              borderRadius: "2rem",
                              // border: "1px solid",
                            }}
                          >
                            <TagIconBlack />
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {products} Products
                            </Typography>
                          </Box>
                        </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "12px",
                            // marginLeft: "80px",
                            paddingBottom: "16px",
                            // width: "15rem",
                            mt: "20px",
                          }}
                        >
                          <PrimaryButton
                            size="small"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              "& svg path": {
                                color: "#ffffff",
                                // fill: "#d92d20",
                                stroke: "#ffffff",
                              },
                            }}
                            onClick={() =>
                              router.push(`/app/vendors/${vendorId}/edit`)
                            }
                          >
                            <span
                              style={{
                                marginRight: "10px",
                              }}
                            >
                              <EditIcon />
                            </span>
                            Edit Vendor Details
                          </PrimaryButton>

                          {/* {router.pathname ===
                            `/app/vendors/${vendorId}/tabs=products` && (
                            <PrimaryButton onClick={() => handleDialogOpen()}>
                              Update or Add products
                            </PrimaryButton>
                          )} */}

                          <PrimaryButton
                            size="small"
                            // onClick={() => handleDialogOpen()}
                            onClick={() =>
                              router.push(
                                `/app/vendors/${vendorId}/edit-products`
                              )
                            }
                          >
                            Update or Add products
                          </PrimaryButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    ml: "auto",
                  }}
                >
                  <DetailPageRightSection />
                  <Box
                    sx={{
                      mt: "40px",
                      mb: "20px",
                      ml: "auto",
                    }}
                  >
                    <DescriptionText
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontWeight: "500",
                        fontSize: "14px",
                        "& span": {
                          fontWeight: 600,
                          ml: 2,
                          color: (theme) => theme.palette.text.secondary,
                        },
                      }}
                    >
                      Created on :
                      <span>
                        {/* : {createdOnDateFormatted} */}
                        <RenderDate date={created_on} />
                      </span>
                    </DescriptionText>
                    <DescriptionText
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontWeight: "500",
                        fontSize: "14px",
                        "& span": {
                          fontWeight: 600,
                          ml: 1,
                          color: (theme) => theme.palette.text.secondary,
                        },
                      }}
                    >
                      Last Updated :
                      <span>
                        {/* : {lastUpdatedDateFormatted} */}
                        <RenderDate date={last_updated} />
                      </span>
                    </DescriptionText>
                  </Box>
                </Box>
              </Grid>
            </Box>
            // </Box>
          )}
          <Box
            sx={{
              px: "36px",
              mt: "8px",
              // marginTop: "20px",
              backgroundColor: "white",
            }}
          >
            {isUsedOnReviewPage ? (
              <BasicTabs sx={{ fontSize: "14px" }} data={tabsData} />
            ) : (
              <RouterTabs
                tabContainerStyles={{
                  position: "sticky",
                  // top: "0px",
                  py: 1,
                  pt: 1,
                  backgroundColor: "#fff",
                  // zIndex: (theme) => theme.zIndex.drawer + 1100,
                }}
                sx={{
                  // position: "relative",
                  fontSize: "14px",
                }}
                data={tabsData}
                basePath={basePath}
              />
            )}
          </Box>
          <VendorOnboardingAddProductDialog
            open={dialogOpen}
            handleClose={() => handleDialogClose()}
            handleFetchVendorProducts={handleFetchProductsList}
          />
        </>
      )}
    </Box>
  );
}

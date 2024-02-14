import {
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import WarehouseIcon from "components/Common/Icons/POicons/WarehouseIcon";
import TagIcon from "components/Common/Icons/TagIcon";
import BuildingVendorIcon from "components/Common/Icons/VendorIcon/BuildingVendorIcon";
import CallVendorIcon from "components/Common/Icons/VendorIcon/CallVendorIcon";
import DataVendorIcon from "components/Common/Icons/VendorIcon/DataVendorIcon";
import SmsVendorIcon from "components/Common/Icons/VendorIcon/SmsVendorIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import RenderHTML from "components/Common/Typography/RenderHTML";
import { VENDOR } from "constants/API_URL";
import CreditCard from "components/Common/Icons/CreditCard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import OutlineClockIcon from "components/Common/Icons/OutlineClockIcon";
import BaseCard from "components/Common/Cards/BaseCard";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import EmptyState from "components/Common/EmptyState";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { Launch } from "@mui/icons-material";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDPOverviewSection(
  {
    // company_name,
    // address1,
    // email_id,
    // phone_number,
    // website_link,
  }
) {
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState({});
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const vendorId = router.query.vendorId;
  const USER_ID = currentUser.merchant_id;

  const handleFetchVendorsList = () => {
    const URL = VENDOR.FETCH_VENDOR;
    setLoading(true);
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setVendorData(json.result[0]);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchVendorsList();
      // setLoading(false);
    }
  }, [vendorId]);
  // console.log({ vendorData });

  const handleClickWebsite = (website_link = "") => {
    if (
      website_link.startsWith("https://") ||
      website_link.startsWith("http://")
    ) {
      return window.open(website_link, "_blank");
    }
    return window.open(`https://${website_link}`, "_blank");
  };

  return (
    <>
      {vendorData.length === 0 && <EmptyState />}
      {loading && <PageLoader />}
      {/* <Divider
        sx={{
          marginBottom: "16px",
        }}
      /> */}

      {
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={4}>
              <BaseCard
                sx={{
                  minHeight: "260px",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#313D4E",
                  paddingX: "15px",
                  paddingTop: "10px",
                  border: "1px solid #E5E5E5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "18px",
                    },
                    fontWeight: "700",
                    marginTop: "4px",
                    marginBottom: "4px",
                    display: "flex",
                    flexDirection: "row",
                    width: "180px",
                    height: "30px",
                    color: "#484A9E",
                    display: "flex",
                    justifyContent: {
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "center",
                    },
                    marginLeft: {
                      xs: "-20px",
                      sm: "-20px",
                      md: "0px",
                    },
                    "& svg path": {
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                      },
                      color: "#484A9E",
                      // fill: "#d92d20",
                      stroke: "#484A9E",
                    },
                  }}
                >
                  <span
                    style={{
                      marginRight: "10px",
                      marginLeft: "-10px",
                      color: "#484A9E",
                      // paddingLeft: "10px",
                    }}
                  >
                    <TagIcon />
                  </span>
                  Vendor Details
                </Typography>
                <Divider />

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
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "20px",
                        marginBottom: "20px",
                        "& svg path": {
                          color: "#4F44E0",
                          // fill: "#d92d20",
                          stroke: "#4F44E0",
                        },
                      }}
                    >
                      <SmsVendorIcon />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "15px",
                            sm: "15px",
                            md: "16px",
                          },
                          fontWeight: {
                            xs: "600",
                            sm: "600",
                            md: "500",
                          },
                          lineHeight: "22px",
                          mx: "8px",
                          /* identical to box height */
                          color: "#222222",
                          // color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        {vendorData && vendorData.email}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "20px",
                        "& svg path": {
                          color: "#4F44E0",
                          // fill: "#d92d20",
                          stroke: "#4F44E0",
                        },

                        "& .launch-icon": {
                          display: "none",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                          "& .launch-icon": {
                            display: "block",
                          },
                        },
                      }}
                    >
                      <DataVendorIcon />
                      <span
                        style={{
                          // fontSize: "16px",
                          fontSize: {
                            xs: "15px",
                            sm: "15px",
                            md: "16px",
                          },
                          // fontWeight: "500",
                          fontWeight: {
                            xs: "600",
                            sm: "600",
                            md: "500",
                          },
                          lineHeight: "22px",
                          marginLeft: "8px",
                          cursor: "pointer",
                          color: "#484A9E",
                          display: "flex",
                          alignItems: "center",
                        }}
                        // href={
                        // 	vendorData &&
                        // 	vendorData.website_url
                        // }
                        onClick={() =>
                          handleClickWebsite(vendorData.website_url)
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {vendorData && vendorData.website_url}
                        <Launch
                          sx={{
                            height: "16px",
                            width: "16px",
                            marginLeft: "8px",
                          }}
                          className="launch-icon"
                        />
                      </span>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "20px",
                        "& svg path": {
                          color: "#4F44E0",
                          // fill: "#d92d20",
                          stroke: "#4F44E0",
                        },
                      }}
                    >
                      <CallVendorIcon />
                      <Typography
                        sx={{
                          // fontSize: "16px",
                          // fontWeight: "500",
                          fontSize: {
                            xs: "15px",
                            sm: "15px",
                            md: "16px",
                          },
                          fontWeight: {
                            xs: "600",
                            sm: "600",
                            md: "500",
                          },
                          lineHeight: "22px",
                          mx: "8px",
                          /* identical to box height */
                          color: "#222222",
                          // color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        {(vendorData && vendorData.phone) || "N/A"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "20px",
                        marginTop: "20px",
                        "& svg path": {
                          color: "#4F44E0",
                          // fill: "#d92d20",
                          stroke: "#4F44E0",
                        },
                      }}
                    >
                      <BuildingVendorIcon />
                      <Typography
                        sx={{
                          // fontSize: "16px",
                          // fontWeight: "500",
                          fontSize: {
                            xs: "15px",
                            sm: "15px",
                            md: "16px",
                          },
                          fontWeight: {
                            xs: "600",
                            sm: "600",
                            md: "500",
                          },
                          lineHeight: "22px",
                          mx: "8px",
                          /* identical to box height */
                          color: "#222222",
                          // color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        {vendorData && vendorData.address_1}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </BaseCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BaseCard
                sx={{
                  minHeight: "260px",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#313D4E",
                  paddingX: "15px",
                  paddingTop: "10px",
                  border: "1px solid #E5E5E5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "18px",
                    },
                    fontWeight: "700",
                    marginTop: "4px",
                    marginBottom: "4px",
                    display: "flex",
                    flexDirection: "row",
                    width: "180px",
                    height: "30px",
                    display: "flex",
                    // justifyContent: "center",
                    justifyContent: {
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "center",
                    },
                    marginLeft: {
                      xs: "-30px",
                      sm: "-30px",
                      md: "0px",
                    },
                    color: "#484A9E",
                    "& svg path": {
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                      },
                      color: "#484A9E",
                      // fill: "#d92d20",
                      stroke: "#484A9E",
                    },
                  }}
                >
                  <span
                    style={{
                      marginRight: {
                        xs: "0px",
                        sm: "0px",
                        md: "10px",
                      },
                    }}
                  >
                    <WarehouseIcon />
                  </span>
                  Payment Details
                </Typography>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                        },
                        fontWeight: {
                          xs: "600",
                          sm: "600",
                          md: "700",
                        },
                        mx: "8px",
                        mb: "14px",
                        mt: "25px",
                        color: "#494949",
                      }}
                    >
                      Payment Method
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: {
                          xs: "14px",
                          sm: "14px",
                          md: "16px",
                        },
                        fontWeight: "600",
                        lineHeight: "22px",
                        mx: "8px",
                        mb: "28px",
                        // color: "#4F44E0",
                        color: "#222222",
                        "& svg path": {
                          // color: "#483ECC",
                          color: "#222222",
                          // fill: "#d92d20",
                          // stroke: "#483ECC",
                          stroke: "#222222",
                        },
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginRight: "10px",

                          color: "#222222",
                        }}
                      >
                        <CreditCard />
                      </span>
                      {vendorData && vendorData.payment_method}
                    </Typography>
                    <Typography
                      sx={{
                        // fontSize: "14px",
                        // fontWeight: "700",
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                        },
                        fontWeight: {
                          xs: "600",
                          sm: "600",
                          md: "700",
                        },
                        mx: "8px",
                        mb: "14px",
                        color: "#494949",
                      }}
                    >
                      Payment Type
                    </Typography>
                    <Typography
                      sx={{
                        // fontSize: "16px",
                        fontSize: {
                          xs: "14px",
                          sm: "14px",
                          md: "16px",
                        },
                        fontWeight: "600",
                        lineHeight: "22px",
                        mx: "8px",
                        mb: "28px",
                        // color: "#1D2939",
                        color: "#222222",
                        // color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      {vendorData && vendorData.payment_terms}
                    </Typography>
                  </Box>
                </Box>
              </BaseCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BaseCard
                sx={{
                  minHeight: "260px",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#313D4E",
                  paddingX: "15px",
                  paddingTop: "10px",
                  border: "1px solid #E5E5E5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "18px",
                    },
                    fontWeight: "700",
                    marginTop: "4px",
                    marginBottom: "4px",
                    display: "flex",
                    flexDirection: "row",
                    width: "250px",
                    height: "30px",
                    // justifyContent: "center",
                    justifyContent: {
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "center",
                    },
                    marginLeft: {
                      xs: "-30px",
                      sm: "-30px",
                      md: "0px",
                    },
                    color: "#484A9E",
                    "& svg path": {
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                      },
                      color: "#484A9E",
                      // fill: "#d92d20",
                      stroke: "#484A9E",
                    },
                  }}
                >
                  <span
                    style={{
                      marginRight: {
                        xs: "0px",
                        sm: "0px",
                        md: "10px",
                      },
                    }}
                  >
                    <WarehouseIcon />
                  </span>
                  Shipment Constraints
                </Typography>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                        },
                        fontWeight: {
                          xs: "600",
                          sm: "600",
                          md: "700",
                        },
                        mx: "8px",
                        mb: "10px",
                        mt: "25px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginRight: "10px",
                          color: "#222222",
                        }}
                      >
                        <OutlineClockIcon />
                      </span>
                      Lead Time (Days)
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        // fontSize: "36px",
                        fontSize: {
                          xs: "21px",
                          sm: "21px",
                          md: "36px",
                        },
                        lineHeight: "22px",
                        mx: "8px",
                        mb: "19px",
                        mt: "10px",
                        color: "#222222",
                        // color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      {vendorData && vendorData.vendor_lead_time}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // fontSize: "14px",
                        // fontWeight: "700",
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                        },
                        fontWeight: {
                          xs: "600",
                          sm: "600",
                          md: "700",
                        },
                        mx: "8px",
                        mt: "25px",
                        mb: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginRight: "10px",
                          color: "#222222",
                        }}
                      >
                        <OutlineClockIcon />
                      </span>
                      Restock Time (Days)
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: {
                          xs: "21px",
                          sm: "21px",
                          md: "36px",
                        },
                        lineHeight: "22px",
                        mx: "8px",
                        mb: "31px",
                        mt: "10px",
                        /* identical to box height */
                        color: "#222222",
                        // color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      {vendorData && vendorData.vendor_restock_time}
                    </Typography>
                  </Box>
                </Box>
              </BaseCard>
            </Grid>
          </Grid>
        </Box>
        // </Box>
      }
    </>
  );
}

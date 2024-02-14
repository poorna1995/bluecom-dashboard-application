import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect, useState } from "react";
import Shopify from "public/assets/icons/shopify-icon.png";
import amazon from "public/assets/icons/amazon.png";
import AppImage from "components/Common/AppImage";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import { CHANNEL, SHOPIFY, THIRD_PARTY } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useSnackbar } from "notistack";

const buttonStyles = {
  textTransform: "capitalize",
  background: "#F7F7FD",
  color: "#2480EB",
};
const textStyles = {
  fontWeight: "600",
};
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ThirdPartyAppsPageSections() {
  const { currentUser } = useSelector(mapState);
  const [appsData, setAppsData] = useState([]);
  const [appLineData, setAppLineData] = useState([]);
  const [connectedApps, setConnectedApps] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleFetchThirdPartyApps = () => {
    const url = THIRD_PARTY.FETCH_APPS;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppsData(json.result);
      });
  };
  const handleFetchThirdPartyAppLine = () => {
    const url = THIRD_PARTY.FETCH_APPLINE;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppLineData(json.result);
      });
  };

  useEffect(() => {
    handleFetchThirdPartyApps();
    handleFetchThirdPartyAppLine();
    handleFetchConnectedApps();
  }, []);

  const handleFetchConnectedApps = () => {
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setConnectedApps(json.result);
      }
    });
  };

  const handleConnectStore = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  const tableData = [
    {
      API: <span style={textStyles}>Products</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
    {
      API: <span style={textStyles}>Vendors</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
    {
      API: <span style={textStyles}>Location</span>,
      "Sync Data": <Button sx={buttonStyles}>Sync</Button>,
    },
  ];

  const mapGridDataToAppsData =
    Array.isArray(appsData) &&
    appsData.map((item) => {
      const { channel_name, channel_category, channel_id } = item;
      const getItemFromGrid = gridData.filter(
        (it) => it.title === channel_name
      )[0];
      const getConnectedApp =
        Array.isArray(connectedApps) &&
        connectedApps.length > 0 &&
        connectedApps.filter((i) => i.channel_id === channel_id);
      const connectedStatus =
        Array.isArray(getConnectedApp) && getConnectedApp.length > 0;
      return {
        ...item,
        ...getItemFromGrid,
        connectedStatus,
        connectedApps: getConnectedApp,
      };
    });
  // console.log({ connectedApps, appLineData, mapGridDataToAppsData });

  const handleSyncButtonClick = (shop, apiName) => {
    let url;
    if (apiName === "product api") {
      url = SHOPIFY.SYNC_PRODUCT;
    } else if (apiName === "warehouse") {
      url = SHOPIFY.WAREHOUSE_SYNC;
    }
    // const url = SHOPIFY.SYNC_PRODUCT || SHOPIFY.WAREHOUSE_SYNC;
    const data = {
      user_id: currentUser.merchant_id,
      shop: shop,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message);
        }
        enqueueSnackbar(json.message, { variant: "error" });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <SectionTitleText sx={{ paddingBottom: "16px" }}>
        Add Third Party Apps
      </SectionTitleText>
      <Grid container spacing={2}>
        {mapGridDataToAppsData.map((item, index) => {
          return (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <BaseCard
                sx={{
                  padding: "16px",
                  // margin: "10px",
                  // width:"250px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AppImage src={item.icon} height="28" width="28" />{" "}
                  <DescriptionText
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      marginLeft: "10px",
                    }}
                  >
                    {item.channel_name}
                  </DescriptionText>
                </Box>

                <DescriptionText
                  sx={{
                    fontSize: "14px",
                    paddingTop: "20px",
                  }}
                >
                  Connect your {item.channel_name} store, sync your products,
                  manage inventory and more
                </DescriptionText>
                {!item.connectedStatus && (
                  <Button
                    sx={{
                      marginTop: "8px",
                      marginLeft: "20px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleConnectStore(item.link)}
                    disabled={!item.link}
                  >
                    Connect your store
                  </Button>
                )}
                {item.connectedStatus && (
                  <DescriptionText
                    sx={{
                      paddingTop: "20px",
                      fontSize: "14px",
                    }}
                  >
                    Store Added:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {item.connectedApps[0].shop}
                    </span>
                  </DescriptionText>
                )}
              </BaseCard>
            </Grid>
          );
        })}
      </Grid>
      {Array.isArray(connectedApps) &&
        connectedApps.length > 0 &&
        connectedApps.map((item, index) => (
          <BaseCard key={index} sx={{ marginTop: "16px", maxWidth: "600px" }}>
            <SectionTitleText sx={{ padding: "16px" }}>
              {item.shop}
            </SectionTitleText>

            <Grid
              container
              sx={{
                py: "16px",
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Grid item xs={9} sx={{ pl: "46px" }}>
                <SectionTitleText sx={{ fontSize: "16px" }}>
                  {" "}
                  API{" "}
                </SectionTitleText>
              </Grid>
              <Grid item xs={3}>
                <SectionTitleText
                  sx={{
                    fontSize: "16px",
                    paddingLeft: "14px",
                  }}
                >
                  {" "}
                  Sync{" "}
                </SectionTitleText>
              </Grid>
            </Grid>

            {appLineData.map((it, id) => (
              <>
                <Grid
                  container
                  // rowSpacing={4}
                  sx={{
                    paddingBottom: "16px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <Grid item xs={9} key={id} sx={{ pl: "32px" }}>
                    {it.fact_line_desc.split("_api")[0]}
                  </Grid>
                  {/* <Divider/> */}
                  <Grid item xs={3}>
                    <Button
                      sx={buttonStyles}
                      onClick={() =>
                        handleSyncButtonClick(
                          item.shop,
                          it.fact_line_desc.split("_api")[0]
                        )
                      }
                    >
                      Sync
                    </Button>
                  </Grid>
                </Grid>
              </>
            ))}

            {/* <MuiBaseTable
							newData={tableData}
							baseCardStyles={{
								border: "none",
								borderRadius: "0px",
							}}
						/> */}
          </BaseCard>
        ))}
    </div>
  );
}

const gridData = [
  {
    title: "shopify",
    icon: Shopify,
    link: "https://accounts.shopify.com/",
  },
  {
    title: "amazon",
    icon: amazon,
    link: "https://accounts.shopify.com/",
  },
  {
    title: "WooCommerce",
    icon: Shopify,
  },
  {
    title: "Ebay",
    icon: Shopify,
  },
];

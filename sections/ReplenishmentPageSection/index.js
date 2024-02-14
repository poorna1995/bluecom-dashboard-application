import { Box, Button, Grid, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import BaseCard from "components/Common/Cards/BaseCard";
import BoxIcon from "components/Common/Icons/BoxIcon";
import DollarCircleIcon from "components/Common/Icons/DollarCircleIcon";
import GridIcon from "components/Common/Icons/grid";
import ItemsIcon from "components/Common/Icons/ItemsIcon";
import ListIcon from "components/Common/Icons/list";
import ReceiptTextIcon from "components/Common/Icons/ReceiptTextIcon";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DrawerLayout from "layouts/DrawerLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import ReplenishmentItemSection from "./ReplenishmentItemSection";
const mapState = ({ views, user }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
});

const ReplenishmentPageSection = () => {
  const { pageView, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tableData = [
    {
      id: 1,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 2,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 3,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 4,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 5,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 6,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 7,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 8,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 9,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
    {
      id: 10,
      product: "90s Baggy High Jeans",
      MasterProductId: "A0B1C087",
      price: "₹ " + 2345,
      status: 85 + "%",
      l365: 2345,
      l30: 2345,
      AOH: 2345,
      OO: 0,
      fcst: 0,
      need: 0,
      ro: 0,
      qty: 5623,
    },
  ];
  const columnsData = [
    {
      field: "id",
      headerName: "ID",
      // flex: 1,
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
    },
    {
      field: "MasterProductId",
      headerName: "Master Product ID",
      flex: 1,
      color: (theme) => theme.palette.blue[600],
    },
    {
      field: "price",
      headerName: "Price",
      // flex: 1,
    },
    {
      field: "status",
      headerName: "Staus",
      // flex: 1,
    },
    {
      field: "l365",
      headerName: "L365",
      // flex: 1,
    },
    {
      field: "l30",
      headerName: "L30",
      // flex: 1,
    },
    {
      field: "AOH",
      headerName: "AOH",
      // flex: 1,
    },
    {
      field: "OO",
      headerName: "OO",
      // flex: 1,
    },
    {
      field: "fcst",
      headerName: "FCST",
      // flex: 1,
    },
    {
      field: "need",
      headerName: "Need",
      // flex: 1,
    },
    {
      field: "ro",
      headerName: "RO",
      // flex: 1,
    },
    {
      field: "qty",
      headerName: "QTY",
      // flex: 1,
    },
  ];
  const showOptions = [
    {
      value: "list",
      icon: ListIcon,
      display: "flex",
    },
    {
      value: "items",
      icon: ItemsIcon,
      display: "flex",
    },
  ];
  const handleChangeView = (value) => {
    setLoading(true);
    dispatch(setProductPageView(value));
    setLoading(false);
  };
  const tabsData = [
    {
      label: `Pending (${tableData.length})`,
      component: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "8px",
            }}
          >
            {showOptions.map((it, id) => {
              return (
                <Button
                  key={id}
                  // variant={
                  // 	pageView === it.value
                  // 		? "contained"
                  // 		: "outlined"
                  // }
                  startIcon={<it.icon />}
                  onClick={() => handleChangeView(it.value)}
                  sx={
                    pageView === it.value
                      ? {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          background: "#F2F4F7",
                          textTransform: "capitalize",
                          "& svg": {
                            fill: (theme) => theme.palette.grey[800],
                          },
                        }
                      : {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          // opacity:
                          // 	"0.7",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {/* <it.icon /> */}
                  {it.value}
                </Button>
              );
            })}
          </div>
          {pageView === "list" && (
            <MuiBaseDataGrid
              rowIdkey={"id"}
              data={tableData}
              columns={columnsData}
              checkboxSelection={false}
            />
          )}
          {pageView === "items" && (
            <div>
              {[1, 2, 3, 4, 5].map((id) => {
                return <ReplenishmentItemSection key={id} />;
              })}
            </div>
          )}
        </div>
      ),
      route: "pending",
    },
    {
      label: `Not Recommended (${tableData.length})`,
      component: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "8px",
            }}
          >
            {showOptions.map((it, id) => {
              return (
                <Button
                  key={id}
                  // variant={
                  // 	pageView === it.value
                  // 		? "contained"
                  // 		: "outlined"
                  // }
                  startIcon={<it.icon />}
                  onClick={() => handleChangeView(it.value)}
                  sx={
                    pageView === it.value
                      ? {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          background: "#F2F4F7",
                          textTransform: "capitalize",
                          "& svg": {
                            fill: (theme) => theme.palette.grey[800],
                          },
                        }
                      : {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          // opacity:
                          // 	"0.7",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {/* <it.icon /> */}
                  {it.value}
                </Button>
              );
            })}
          </div>
          {pageView === "list" && (
            <MuiBaseDataGrid
              rowIdkey={"id"}
              data={tableData}
              columns={columnsData}
              checkboxSelection={false}
            />
          )}
          {pageView === "items" && (
            <div>
              {[1, 2, 3, 4, 5].map((id) => {
                return <ReplenishmentItemSection key={id} />;
              })}
            </div>
          )}
        </div>
      ),
      route: "not-recommended",
    },
    {
      label: "Reviewed",
      component: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "8px",
            }}
          >
            {showOptions.map((it, id) => {
              return (
                <Button
                  key={id}
                  // variant={
                  // 	pageView === it.value
                  // 		? "contained"
                  // 		: "outlined"
                  // }
                  startIcon={<it.icon />}
                  onClick={() => handleChangeView(it.value)}
                  sx={
                    pageView === it.value
                      ? {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          background: "#F2F4F7",
                          textTransform: "capitalize",
                          "& svg": {
                            fill: (theme) => theme.palette.grey[800],
                          },
                        }
                      : {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          // opacity:
                          // 	"0.7",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {/* <it.icon /> */}
                  {it.value}
                </Button>
              );
            })}
          </div>
          {pageView === "list" && (
            <MuiBaseDataGrid
              rowIdkey={"id"}
              data={tableData}
              columns={columnsData}
              checkboxSelection={false}
            />
          )}
          {pageView === "items" && (
            <div>
              {[1, 2, 3, 4, 5].map((id) => {
                return <ReplenishmentItemSection key={id} />;
              })}
            </div>
          )}
        </div>
      ),
      route: "reviewed",
    },
    {
      label: "Locked",
      component: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "8px",
            }}
          >
            {showOptions.map((it, id) => {
              return (
                <Button
                  key={id}
                  // variant={
                  // 	pageView === it.value
                  // 		? "contained"
                  // 		: "outlined"
                  // }
                  startIcon={<it.icon />}
                  onClick={() => handleChangeView(it.value)}
                  sx={
                    pageView === it.value
                      ? {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          background: "#F2F4F7",
                          textTransform: "capitalize",
                          "& svg": {
                            fill: (theme) => theme.palette.grey[800],
                          },
                        }
                      : {
                          height: "32px",
                          px: "12px",
                          color: (theme) => theme.palette.grey[800],
                          // opacity:
                          // 	"0.7",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {/* <it.icon /> */}
                  {it.value}
                </Button>
              );
            })}
          </div>
          {pageView === "list" && (
            <MuiBaseDataGrid
              rowIdkey={"id"}
              data={tableData}
              columns={columnsData}
              checkboxSelection={false}
            />
          )}
          {pageView === "items" && (
            <div>
              {[1, 2, 3, 4, 5].map((id) => {
                return <ReplenishmentItemSection key={id} />;
              })}
            </div>
          )}
        </div>
      ),
      route: "locked",
    },
  ];
  return (
    <>
      {tabsData.length === 0 && <EmptyState />}
      {loading && <PageLoader />}

      {tabsData.length > 0 && (
        <Box
          sx={{
            position: "sticky",
            top: "98px",
            zIndex: "1000",
            backgroundColor: "#FFFFFF",
          }}
        >
          <SectionTitleText padding={2} width="200px">
            Replenishment
          </SectionTitleText>
          <Grid
            container
            spacing={2}
            paddingBottom={4}
            paddingLeft={2}
            paddingRight={2}
          >
            <Grid item md={4} sm={6} xs={12}>
              <BaseCard
                sx={{
                  display: "flex",
                  padding: "16px",
                  backgroundColor: (theme) => theme.palette.grey[100],
                }}
              >
                <Box
                  sx={{
                    padding: "16px",
                    marginRight: "8px",
                    backgroundColor: "#FFFFFF",
                    maxHeight: "60px",
                  }}
                >
                  <BoxIcon sx={{ width: "24px", height: "24px" }} />
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    alignItems: "center",
                  }}
                >
                  <DescriptionText
                    sx={{
                      fontWeight: "400",
                      fontSize: "18px",
                    }}
                  >
                    Total Qyantity
                  </DescriptionText>

                  <Typography
                    sx={{
                      padding: "4px",
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    126
                  </Typography>
                </Box>
              </BaseCard>
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <BaseCard
                sx={{
                  display: "flex",
                  padding: "16px",
                  backgroundColor: (theme) => theme.palette.grey[100],
                }}
              >
                <Box
                  sx={{
                    padding: "16px",
                    marginRight: "8px",
                    backgroundColor: "#FFFFFF",
                    maxHeight: "60px",
                  }}
                >
                  <DollarCircleIcon sx={{ width: "24px", height: "24px" }} />
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    alignItems: "center",
                  }}
                >
                  <DescriptionText
                    sx={{
                      fontWeight: "400",
                      fontSize: "18px",
                    }}
                  >
                    Total Cost
                  </DescriptionText>

                  <Typography
                    sx={{
                      padding: "4px",
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    ₹ 2345
                  </Typography>
                </Box>
              </BaseCard>
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <BaseCard
                sx={{
                  display: "flex",
                  padding: "16px",
                  backgroundColor: (theme) => theme.palette.grey[100],
                }}
              >
                <Box
                  sx={{
                    padding: "16px",
                    marginRight: "8px",
                    backgroundColor: "#FFFFFF",
                    maxHeight: "60px",
                  }}
                >
                  <ReceiptTextIcon sx={{ width: "24px", height: "24px" }} />
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    alignItems: "center",
                  }}
                >
                  <DescriptionText
                    sx={{
                      fontWeight: "400",
                      fontSize: "18px",
                    }}
                  >
                    Total Retail
                  </DescriptionText>

                  <Typography
                    sx={{
                      padding: "4px",
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    7526
                  </Typography>
                </Box>
              </BaseCard>
            </Grid>
          </Grid>
        </Box>
      )}

      <RouterTabs
        data={tabsData}
        tabContainerStyles={{
          pl: "16px",
          position: "sticky",
          top: "240px",
          background: "#fff",
          py: 1,

          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        basePath="/app/replenishment"
      />
    </>
  );
};

export default ReplenishmentPageSection;

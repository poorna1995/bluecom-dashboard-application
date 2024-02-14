import { useRouter } from "next/router";
import React, { useState } from "react";
import ProductGridItemCard from "../ProductGridItemCard";
import { Box, Button, Grid } from "@mui/material";
import MRTBundleViewCustomTable from "../components/MRTBundleViewCustomTable";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import FilterDrawer from "components/Common/Drawer/FilterDrawer";
import RightDrawer from "components/Common/Drawer/RightDrawer";
import AddIcon from "components/Common/Icons/add";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import FilterCloseIcon from "components/Common/Icons/FilterCloseIcon";
import { Filter } from "@mui/icons-material";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import ListIcon from "components/Common/Icons/list";
import GridIcon from "components/Common/Icons/grid";
import MapIcon from "components/Common/Icons/MapIcon";
import ProductsListSection from "./ProductsListSection";

export default function ProductsListPageSections({
  tableData = [],
  gridData = [],
  views = [],
  handleChangeView,
  pageView,
  component: Component,
  loading,
  title = "",
  rowIdkey,
  columnData = [],
  hideFilters,
  hasStepOnboarding,
  handleCreateButtonClick = () => {},
  hasCustomClickFunction = false,
  selectedProductType = "product",
  bundlesTableData = [],
  showBundleViewButton = false,
  buttonTitle = "",
  handleFetchBundlesData = () => {},
  totalCount = 0,
}) {
  const router = useRouter();
  const appPageType = router.query.appPageType;
  // const selectedProductType = router.query.selectedProductType;
  const time = new Date();
  const newPageId = time.getTime();
  const url = title.replace(" ", "-").toLowerCase();

  const handleClickAddButton = () => {
    if (hasStepOnboarding) {
      return router.push(
        `/onboarding/${url}/${newPageId}?step=general-info&id=0`
      );
    }
    return router.push(`/onboarding/${url}/${newPageId}`);

    // router.push(`/onboarding/${url}/${newPageId}?step=general-info&id=0`);
  };

  const [showFilters, setShowFilters] = useState(false);

  const toggleOptions = [
    {
      value: "list",
      icon: ListIcon,
    },
    {
      value: "grid",
      icon: GridIcon,
    },
    {
      value: "map",
      icon: MapIcon,
    },
  ];
  const showOptions = views.map((item) => {
    const filteredItem = toggleOptions.filter((it) => it.value === item)[0];
    return {
      ...filteredItem,
    };
  });
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  // console.log({ showOptions });

  const handleClickProductType = () => {
    if (selectedProductType === "bundle") return router.push(`/app/products`);
    return router.push(`/app/products?selectedProductType=bundle`);
  };

  return (
    <Box
      sx={{
        height: "100px",
      }}
    >
      <Grid container sx={{ maxWidth: "100%" }}>
        {/* {showFilters && (
                        <Grid
                            item
                            md={2}
                            sx={{
                                borderRight: "1px solid rgba(0,0,0,0.1)",
                                paddingRight: "8px",
                                position: "sticky",
                                // top: "68px",
                            }}
                        >
                            <FilterDrawer />
                        </Grid>
                    )} */}
        <Grid item md={12}>
          <Box>
            <Box
              sx={{
                position: "sticky",
                top: "110px",
                zIndex: "100",
                backgroundColor: "#fff",
                // borderBottom:"1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  padding: "8px",

                  // mb: "18px",
                  // marginTop: "16px",
                  alignItems: "center",
                }}
              >
                <SectionTitleText
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "28px",

                    fontWeight: "600",
                    color: "#484A9E",
                    display: "flex",
                    // alignItems: "center",

                    // flexDirection: "row",
                    lineHeight: "40px",
                    lineHeight: "40px",
                  }}
                >
                  {title}
                  {"  "}
                  {totalCount && (
                    <span
                      style={{
                        marginTop: "3px",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#595959",
                        lineHeight: "40px",
                        marginLeft: "4px",
                      }}
                    >
                      ({totalCount})
                    </span>
                  )}{" "}
                </SectionTitleText>
                {showBundleViewButton && (
                  <>
                    {selectedProductType === "bundle" ? (
                      <>
                        {" "}
                        <SecondaryButton
                          onClick={() => handleClickProductType()}
                          sx={{
                            borderRadius: "45px",
                            mr: 3,
                            ml: 3,
                            px: 3,
                          }}
                        >
                          Products
                        </SecondaryButton>
                        <PrimaryButton
                          // onClick={() =>
                          // 	handleClickProductType()
                          // }
                          sx={{
                            borderRadius: "45px",
                            mr: 3,
                          }}
                        >
                          Bundles
                        </PrimaryButton>
                      </>
                    ) : (
                      <>
                        <PrimaryButton
                          // onClick={() =>
                          // 	handleClickProductType()
                          // }
                          sx={{
                            borderRadius: "45px",
                            mr: 3,
                            ml: 3,
                          }}
                        >
                          Products
                        </PrimaryButton>{" "}
                        <SecondaryButton
                          onClick={() => handleClickProductType()}
                          sx={{
                            borderRadius: "45px",
                            mr: 3,
                            px: 3,
                          }}
                        >
                          Bundles
                        </SecondaryButton>
                      </>
                    )}
                  </>
                )}{" "}
                <div style={{ flex: 1, width: "100%" }} />
                {Array.isArray(views) && views.length > 1 && (
                  <Box
                    sx={{
                      borderRadius: "5px",
                      border: "1px solid #E4E7EC",
                      p: 0.5,
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
                  </Box>
                )}
                {!hideFilters && (
                  <OutlinedButton
                    onClick={() => handleShowFilters()}
                    sx={{
                      marginLeft: "16px",
                      paddingX: "16px",
                      height: "42px",
                      background: (theme) =>
                        showFilters && theme.palette.grey[100],
                    }}
                    startIcon={showFilters ? <FilterCloseIcon /> : <Filter />}
                  >
                    {/* {showFilters ? "Hide" : "Show"} */} Filter
                  </OutlinedButton>
                )}
                <PrimaryButton
                  sx={{
                    marginLeft: "16px",
                    paddingX: "10px",
                    height: "42px",
                  }}
                  onClick={() =>
                    hasCustomClickFunction
                      ? handleCreateButtonClick()
                      : handleClickAddButton()
                  }
                  startIcon={<AddIcon />}
                >
                  {/* Create */}
                  {/* {title} */}
                  {buttonTitle || "Create"}
                </PrimaryButton>
              </Box>
            </Box>
            <Box>
              {showFilters && (
                <RightDrawer
                  openDrawer={showFilters}
                  handleClose={() => handleShowFilters()}
                >
                  {/* <FiltersComponent /> */}
                  <FilterDrawer handleCloseDrawer={() => handleShowFilters()} />
                </RightDrawer>
              )}
            </Box>

            <Box
              sx={{
                paddingTop: "8px",
                px: "8px",
              }}
            >
              <ProductsListSection title="Products" columnData={columnData} />

              {/* {pageView === "list" && (
								<>
									{" "}
									{selectedProductType === "bundle" ? (
										<MRTBundleViewCustomTable
											tableData={tableData}
											handleFetchBundlesData={
												handleFetchBundlesData
											}
											loading={loading}
										/>
									) : (
									)}{" "}
								</>
							)} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

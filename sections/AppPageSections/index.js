import { Box, Button, Container, CircularProgress, Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import FilterDrawer from "components/Common/Drawer/FilterDrawer";
// import ProductGridItemCard from "sections/ProductsPageSection/ProductGridItemCard";
import Filter from "components/Common/Icons/filter";
// import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import AddIcon from "components/Common/Icons/add";
import ListIcon from "components/Common/Icons/list";
import GridIcon from "components/Common/Icons/grid";
import FilterCloseIcon from "components/Common/Icons/FilterCloseIcon";
// import RightDrawer from "components/Common/Drawer/RightDrawer";
import MapIcon from "components/Common/Icons/MapIcon";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
// import MRTBundleViewCustomTable from "sections/ProductsPageSection/components/MRTBundleViewCustomTable";
import dynamic from "next/dynamic";
import RightDrawer from "components/Common/Drawer/RightDrawer";
import FilterDrawer from "components/Common/Drawer/FilterDrawer";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import MRTBundleViewCustomTable from "sections/ProductsPageSection/components/MRTBundleViewCustomTable";
import ProductGridItemCard from "sections/ProductsPageSection/ProductGridItemCard";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import MobileViewListPagination from "./MobileViewAppPageSections/MobileViewListPagination";
import ProductGridItemCardSkeleton from "sections/ProductsPageSection/ProductGridItemCard/ProductGridItemCardSkeleton";
import GridIconFill from "components/Common/Icons/GridIconFill";
import ListIconFill from "components/Common/Icons/ListIconFill";
// const MRTBundleViewCustomTable = dynamic(() =>
//   import("sections/ProductsPageSection/components/MRTBundleViewCustomTable")
// );
// const FilterDrawer = dynamic(() =>
//   import("components/Common/Drawer/FilterDrawer")
// );
// const MuiBaseDataGrid = dynamic(() =>
//   import("components/Common/Tables/MuiBaseDataGrid")
// );
// const RightDrawer = dynamic(() =>
//   import("components/Common/Drawer/RightDrawer")
// );
// const ProductGridItemCard = dynamic(() =>
//   import("sections/ProductsPageSection/ProductGridItemCard")
// );

const mapState = ({ views, user }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
});

export default function AppPageSections({
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
  hideFilters = true,
  hasStepOnboarding,

  handleCreateButtonClick = () => {},
  hideCreateButton,
  hasCustomClickFunction = false,

  handlePublishButtonClick = () => {},
  hidePublishButton,

  selectedProductType = "product",
  bundlesTableData = [],
  showBundleViewButton = false,
  buttonTitle = "",
  handleFetchBundlesData = () => {},
  totalCount = 0,
  basePath,
  renderEmptyRowsFallback,
  isUsingMuiGrid,
  createButtonIcon,
}) {
  const router = useRouter();
  const appPageType = router.query.appPageType;
  // const selectedProductType = router.query.selectedProductType;
  const time = new Date();
  const newPageId = time.getTime();
  const url = title.replace(" ", "-").toLowerCase();
  const [buttonLoading, setButtonLoading] = useState({});

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
      iconFill: ListIconFill,
    },
    {
      value: "grid",
      icon: GridIcon,
      iconFill: GridIconFill,
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
    <Container maxWidth="2xl">
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
                // position: "sticky",
                // top: "110px",
                zIndex: "100",
                backgroundColor: "#fff",
                // borderBottom:"1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  pt: 2,
                  px: 1,
                  pb: 1.5,

                  // mb: "18px",
                  // marginTop: "16px",
                  alignItems: "center",
                }}
              >
                <SectionTitleText
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: (theme) => theme.palette.primary.main,
                    display: "flex",
                    // alignItems: "center",

                    // flexDirection: "row",
                    lineHeight: "40px",
                  }}
                >
                  {title}
                  {"  "}
                  <span
                    style={{
                      //   marginTop: "3px",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#595959",
                      //   lineHeight: "40px",
                      marginLeft: "4px",
                    }}
                  >
                    ({totalCount})
                  </span>
                </SectionTitleText>
                {/* {showBundleViewButton && (
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
                )}{" "} */}
                <div style={{ flex: 1, width: "100%" }} />
                {/* {Array.isArray(views) && views.length > 1 && (
									<ToggleButtonGroup
										sx={{
											width: "94px",
											height: "36px",
											marginRight: "80px",
										}}
										value={pageView}
										exclusive
										onChange={(e, value) =>
											handleChangeView(value)
										}
										aria-label="text alignment"
									>
										{showOptions.map((i) => {
											return (
												<ToggleButton
													key={i.value}
													value={i.value}
													aria-label={i.value}
												>
													<i.icon />
													<Typography
														sx={{
															marginLeft: "4px",
														}}
													>
														{i.value}
													</Typography>
												</ToggleButton>
											);
										})}
									</ToggleButtonGroup>
								)} */}
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
                          size="small"
                          disableRipple
                          key={id}
                          // variant={
                          // 	pageView === it.value
                          // 		? "contained"
                          // 		: "outlined"
                          // }
                          // startIcon={<it.icon />}
                          startIcon={
                            pageView === it.value ? (
                              <it.iconFill />
                            ) : (
                              <it.icon />
                            )
                          }
                          onClick={() => handleChangeView(it.value)}
                          sx={
                            pageView === it.value
                              ? {
                                  height: "22px",
                                  // px: "12px",
                                  color: (theme) => theme.palette.primary.main,
                                  background: "#EBE9FF",
                                  textTransform: "capitalize",
                                  "& svg": {
                                    width: "16px",
                                    height: "16px",
                                    mr: -0.5,
                                  },
                                  // "& svg path": {
                                  //   fill:
                                  //     pageView === it.value
                                  //       ? "#4F44E0"
                                  //       : "#222",
                                  // },

                                  "&:hover": {
                                    background: "#EBE9FF",
                                  },
                                }
                              : {
                                  height: "22px",
                                  px: "12px",
                                  color: (theme) => theme.palette.text.primary,
                                  "& svg": {
                                    width: "16px",
                                    height: "16px",
                                    mr: -0.5,
                                  },

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
                {tableData.length > 0 && !hideCreateButton && (
                  <PrimaryButton
                    size="medium"
                    sx={{
                      marginLeft: "16px",
                      // paddingX: "10px",
                      // height: "42px",
                    }}
                    onClick={() =>
                      hasCustomClickFunction
                        ? handleCreateButtonClick()
                        : handleClickAddButton()
                    }
                    startIcon={createButtonIcon}
                  >
                    {/* Create */}
                    {/* {title} */}
                    {buttonTitle || "Create Product"}
                  </PrimaryButton>
                )}
                {tableData.length > 0 && !hidePublishButton && (
                  <OutlinedButton
                    sx={{
                      marginLeft: "16px",
                      // paddingX: "10px",
                      // height: "42px",
                    }}
                    onClick={() => handlePublishButtonClick()}
                  >
                    {"Publish"}
                  </OutlinedButton>
                )}
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

            {views.length === 1 && (
              <>
                {/* {Array.isArray(tableData) &&
									tableData.length > 0 && ( */}
                {/* {loading ? (
									<PageSpinner />
								) : ( */}
                <>
                  {/* <TableSection data={tableData} /> */}
                  {isUsingMuiGrid ? (
                    <MuiBaseDataGrid
                      data={tableData}
                      rowIdkey={rowIdkey}
                      columnDefData={columnData}
                      loading={loading}
                      checkboxSelection={false}
                      // rowHeight={60}
                      containerStyles={{
                        height: "calc(100vh - 190px)",
                      }}
                      totalRows={totalCount}
                      basePath={basePath}
                    />
                  ) : (
                    <>
                      {loading ? (
                        <PageSpinner />
                      ) : (
                        <BluecomMRTBaseTable
                          data={tableData}
                          // rowHeight={60}
                          columnsData={columnData}
                          muiTableBodyCellProps={{
                            sx: {
                              height: "40px",
                            },
                          }}
                          // muiTableContainerProps={{
                          //   sx: {
                          //     height: "calc(100vh - 230px)",
                          //   },
                          // }}
                          state={{
                            showSkeletons: loading,
                          }}
                          checkboxSelection={false}
                          totalRows={totalCount}
                          shallUseRouter={true}
                          basePath={basePath}
                          renderEmptyRowsFallback={renderEmptyRowsFallback}
                        />
                      )}
                    </>
                  )}
                </>
                {/* )} */}
                {/* )} */}
              </>
            )}
            {views.length > 1 && (
              <>
                {
                  // Array.isArray(tableData) && (
                  // tableData.length > 0 ?
                  <Box
                    sx={{
                      // paddingTop: "8px",
                      px: "8px",
                      py: 1,
                    }}
                  >
                    {pageView === "list" && (
                      <>
                        {/* {loading ? (
													<PageSpinner />
												) : ( */}
                        <>
                          {selectedProductType === "bundle" ? (
                            // <BundleViewCustomTable tableData={tableData} />
                            <MRTBundleViewCustomTable
                              tableData={tableData}
                              handleFetchBundlesData={handleFetchBundlesData}
                              loading={loading}
                              enableExpanding
                              getSubRows={(row) => row?.children}
                              state={{
                                showSkeletons: loading,
                              }}
                            />
                          ) : (
                            <>
                              {loading ? (
                                <PageSpinner />
                              ) : (
                                <BluecomMRTBaseTable
                                  data={tableData}
                                  // rowHeight={60}
                                  rowIdkey={rowIdkey}
                                  columnDefData={columnData}
                                  columnsData={columnData}
                                  loading={loading}
                                  muiTableBodyCellProps={{
                                    sx: {
                                      height: "40px",
                                      maxHeight: "20px",
                                    },
                                  }}
                                  muiTableContainerProps={{
                                    sx: {
                                      maxHeight: "calc(100vh - 276px)",
                                    },
                                  }}
                                  state={{
                                    showSkeletons: loading,
                                  }}
                                  checkboxSelection={false}
                                  containerStyles={{
                                    height: "calc(100vh - 190px)",
                                  }}
                                  totalRows={totalCount}
                                  shallUseRouter={true}
                                  basePath={basePath}
                                  renderEmptyRowsFallback={
                                    renderEmptyRowsFallback
                                  }
                                />
                              )}
                            </>
                          )}
                        </>
                        {/* )}{" "} */}
                        {/* <TableSection
                          data={tableData}
                          // url={`/app/${appPageType}`}
                          // itemKey={"Master Product Id"}
                        /> */}
                      </>
                    )}
                    {pageView === "map" && (
                      <>
                        <Component />
                      </>
                    )}
                    {pageView === "grid" && (
                      <>
                        <Grid container spacing={2}>
                          {loading ? (
                            <>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                                <Grid item xs={12} md={3} key={item}>
                                  <ProductGridItemCardSkeleton />
                                </Grid>
                              ))}
                            </>
                          ) : (
                            <>
                              {Array.isArray(tableData) &&
                                tableData.map((item, index) => (
                                  <Grid item md={3} sm={6} xs={12} key={index}>
                                    <ProductGridItemCard item={item} />
                                  </Grid>
                                ))}
                            </>
                          )}
                        </Grid>
                        <Box sx={{ py: 2 }}>
                          <MobileViewListPagination
                            basePath={basePath}
                            totalRows={totalCount}
                            shallUseRouter={true}
                            paginationSize={"medium"}
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                  // )
                  // :
                  // (
                  // 	<>
                  // 		{loading ? (
                  // 			<SectionLoader />
                  // 		) : (
                  // 			<h1>No results found</h1>
                  // 		)}
                  // 	</>
                  // )}
                }
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

/* eslint-disable react/no-unescaped-entities */
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Fade,
} from "@mui/material";
import EmptyState from "components/Common/EmptyState";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { ADDRESS, WAREHOUSE } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWarehousePageView } from "redux/views/viewsSlice";
import AppPageSections from "sections/AppPageSections";
import appFetch from "utils/appFetch";
import LocationIcon from "components/Common/Icons/LocationIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import DialogAsCaution from "components/Common/Dialog/DialogAsCaution";
import { useRouter } from "next/router";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import Link from "next/link";
import DeleteIconVendor from "components/Common/Icons/DeleteIconVendor";
import EditIconPencile from "components/Common/Icons/EditIconPencile";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import WarehouseIcon from "components/Common/Icons/POicons/WarehouseIcon";
import { format } from "date-fns";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { useSnackbar } from "notistack";
import warehouseListColumns from "./constants/warehouseListColumns";
import { MoreHoriz } from "@mui/icons-material";
import IconMenu from "components/Common/Menus/IconMenu";
import WarehouseES from "components/Common/Icons/EmptyStates/WarehouseES";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import MobileViewLocationCard from "./components/MobileViewComponents/MobileViewLocationCard";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import { resetStore } from "redux/onboarding/onboardingSlice";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
const mapState = ({ views, user }) => ({
  pageView: views.warehousePageView,
  currentUser: user.currentUser,
});

export default function WarehousePageSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { pageView, currentUser } = useSelector(mapState);
  // const [isLoading, setIsLoading] = useState(false);
  const [warehouseList, setWarehouseList] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentPage } = router.query;
  const handleDeleteDialogOpen = (wh_id) => {
    setDeleteDialogOpen(true);
    setDeleteWarehouseId(wh_id);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteWarehouseId("");
  };

  const [buttonLoading, setButtonLoading] = useState(false);
  const handleDeleteWarehouse = (wh_id) => {
    setButtonLoading(true);
    const url = WAREHOUSE.DELETE_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_id: wh_id,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar("Location Deleted Successfully", {
            variant: "success",
          });
          console.log(json);
          handleFetchWarehouseList();
          handleDeleteDialogClose();
          setButtonLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleChangeView = (value) => {
    dispatch(setWarehousePageView(value));
  };
  const handleFetchWarehouseList = () => {
    setLoading(true);
    const url = WAREHOUSE.FETCH_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        console.log(json);
        // setLoading(false);
        setWarehouseList(json.result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
    // setLoading(false)
  };
  useEffect(() => {
    handleFetchWarehouseList();
  }, []);
  const handleFetchAddress = async (address_id) => {
    const URL = ADDRESS.FETCH;
    const data = { address_id };
    const ans = await appFetch(URL, data).then((json) => json.result);

    return ans;
  };

  // const getAddress =
  //  Array.isArray(warehouseList) &&
  //  warehouseList.map((item) => {
  //    const { address_id } = item;
  //    const address = handleFetchAddress(address_id);
  //    return {
  //      ...item,
  //      address,
  //    };
  //  });
  // console.log({ getAddress });

  // const handleDeleteWarehouse POST
  // {
  //     "user_id": "123",
  //     "wh_id":"138980800858252561"
  // }

  // const handleDeleteWarehouse = (wh_id) => {
  //  const url = WAREHOUSE.DELETE_WAREHOUSE;
  //  const data = {
  //    user_id: currentUser.merchant_id,
  //    wh_id,
  //  };
  //  appFetch(url, data)
  //    .then((json) => {
  //      console.log(json);
  //      handleFetchWarehouseList();
  //    })
  //    .catch((error) => console.error(error));
  // };
  // console.log({ warehouseList });

  const MapComponent = () => {
    return (
      <Grid container spacing={4} sx={{ position: "sticky", top: "80px" }}>
        <Grid item md={6} sx={{}}>
          {Array.isArray(warehouseList) &&
            warehouseList.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    p: "16px",
                    // my: "16px",
                    mb: "16px",
                    border: "1px solid #E4E7EC",
                    borderRadius: "10px",
                    display: "flex",
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    sx={{
                      "& svg path": {
                        color: "#484A9E",
                        // fill: "#d92d20",
                        stroke: "#484A9E",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#F5F5F5",
                      padding: "4px 8px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                    }}
                  >
                    <WarehouseIcon />
                  </Grid>

                  <Grid item xs={10} sx={{ ml: "16px" }}>
                    <SectionTitleText
                      sx={{
                        fontSize: "18px",
                        mt: "-6px",
                      }}
                    >
                      {item.wh_name}
                    </SectionTitleText>
                    <DescriptionText>{item.address_id}</DescriptionText>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <IconButtonWithTooltip
                      sx={{
                        backgroundColor: "#F5F5F5",
                      }}
                      icon={<EditIconPencile />}
                      title={"Edit"}
                      onClick={() =>
                        // router.push(
                        // 	`/onboarding/warehouse/${item.wh_id}`,
                        // )
                        router.push(`/app/warehouse/${item.wh_id}/edit`)
                      }
                    />

                    <IconButtonWithTooltip
                      sx={{
                        backgroundColor: "#F5F5F5",
                      }}
                      icon={<DeleteIconVendor />}
                      title={"Delete"}
                      // onClick={() =>
                      // 	handleDeleteWarehouse(
                      // 		item.wh_id,
                      // 	)
                      // }
                      onClick={() => handleDeleteDialogOpen(item.wh_id)}
                    />
                  </Box>
                </Box>
              );
            })}
        </Grid>
        <Grid item md={6} sx={{ position: "sticky", top: "80px" }}>
          <iframe
            title="My Location Map"
            style={{ width: "100%", height: "600px" }}
            src="https://www.google.com/maps/embed/v1/place?
	&q=D+Car+Serve,Subhash+Road,Rohtak+Haryana"
            allowFullScreen
          ></iframe>
        </Grid>{" "}
      </Grid>
    );
  };

  const warehouseDataList =
    Array.isArray(warehouseList) &&
    warehouseList.length > 0 &&
    warehouseList.map((item) => {
      const {
        address_id,
        channel_id,
        wh_name,
        wh_id,
        operator_id,
        stocks,
        updated_at,
        address_1,
        city,
        state,
        country,
      } = item;
      // const { updated_at } = item;
      // const updatedDate = (updated_at && new Date(updated_at)) || "";
      // const formattedDate = format(updatedDate, "MMM dd, yyyy") || "";
      // const formattedTime = format(updatedDate, "hh:mm a") || "";
      // const formattedStartDate = format(newStartDate, "dd/MM/yyyy");
      // const newEndDate = end_date && new Date(end_date);
      // const formattedEndDate =
      //  newEndDate && format(newEndDate, "dd/MM/yyyy");
      return {
        ...item,
        "Address ID": address_id,
        "Channel ID": channel_id,
        "Warehouse Name": wh_name,
        "Warehouse ID": wh_id,
        "Operator Id": operator_id,
        Stocks: stocks,
        "Last Updated": updated_at,
        Address: address_1,
        City: city,
        State: state,
        Country: country,

        // "Warehouse ID": (
        //  <TableCellAppLink href={`/app/warehouse/${wh_id}`}>
        //    {wh_id}
        //  </TableCellAppLink>
        // ),
        // "Start Date": formattedStartDate,
        // "End Date": formattedEndDate,
      };
    });

  const WarehouseTableColumnData = [
    ...warehouseListColumns,

    {
      field: "edit_action",
      accessorKey: "edit_action",
      header: "Action",
      headerName: "Action",
      size: 110,
      headerAlign: "center",
      align: "center",
      valueGetter: ({ value }) => value,
      Cell: ({ cell }) => (
        <div>
          <IconMenu
            options={[
              {
                label: "Edit Location",
                icon: <EditIcon />,
                onClick: () =>
                  router.push(
                    `/app/warehouse/${cell.row.original["Warehouse ID"]}/edit`
                  ),
              },
              {
                // label: (
                //   <>
                //     <Typography
                //       sx={{
                //         color: "#d92d20",
                //       }}
                //     >
                //       Delete Location
                //     </Typography>
                //   </>
                // ),
                label: "Delete Location",
                icon: (
                  // <IconButton
                  // // sx={{
                  // //   color: "#d92d20",
                  // //   "& svg path": {
                  // //     color: "#d92d20",
                  // //     // fill: "#d92d20",
                  // //     stroke: "#d92d20",
                  // //   },
                  // // }}
                  // >
                  <DeleteIcon />
                  // </IconButton>
                ),
                onClick: () =>
                  handleDeleteDialogOpen(
                    cell.row.original["Warehouse ID"]
                    // params.row.company_name
                  ),
              },
            ]}
            buttonIcon={<MoreHoriz />}
          />
        </div>
      ),
    },
  ];

  const handleCreateWarehouseButton = () => {
    const time = new Date().getTime();
    router.push(`/onboarding/warehouse/${time}`);
  };

  const activePageData = updatePageData({
    currentPage,
    data: warehouseDataList,
  });

  const handleActionTwo = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  const handleClickWebsite = (website_link = "bluecom.ai/contact-us") => {
    if (
      website_link.startsWith("https://") ||
      website_link.startsWith("http://")
    ) {
      return window.open(website_link, "_blank");
    }
    return window.open(`https://${website_link}`, "_blank");
  };

  if (loading) return <PageSpinner />;
  if (
    !loading &&
    (!Array.isArray(warehouseDataList) || warehouseDataList.length === 0)
  ) {
    return (
      <NewEmptyState
        hidePoints
        icon={<WarehouseES />}
        title="Location Management"
        titleDesc={
          "We didn’t recognize locations connected with bluecom store.  Select a recommended action Add a location  manually"
        }
        note1={"Add a location  manually"}
        ActionOne={"Add Location"}
        handleActionOne={() => handleCreateWarehouseButton()}
        note2={"Connect your store with bluecom"}
        ActionTwo={"Connect Your Store"}
        handleActionTwo={() => handleActionTwo()}
        note3={"Contact us to get help in onboarding"}
        ActionThree={"Contact Us"}
        handleActionThree={() => handleClickWebsite("bluecom.ai/contact-us")}
      ></NewEmptyState>
    );
  }

  return (
    <div>
      {/* {WarehouseTableColumnData.length === 0 && !loading && (
        <EmptyState
          icon={<WarehouseES />}
          text={"No warehouse have been added yet"}
          bodyText={
            "Click the button below to add a warehouse and start connecting your products"
          }
        >
          <PrimaryButton onClick={() => handleCreateWarehouseButton()}>
            Create Warehouse
          </PrimaryButton>
        </EmptyState>
      )}

      {loading && <PageSpinner />}
      {WarehouseTableColumnData.length > 0 && !loading && (
        <AppPageSections
          hasStepOnboarding={false}
          title={"Warehouse"}
          buttonTitle="Create Warehouse"
          tableData={warehouseDataList}
          pageView={pageView}
          views={["list"]}
          handleChangeView={handleChangeView}
          component={MapComponent}
          // loading={loading}
          rowIdkey={"Address ID"}
          columnData={WarehouseTableColumnData}
          hideFilters
        />
      )} */}

      {loading && <PageSpinner />}

      {/* {!loading &&
        Array.isArray(warehouseDataList) &&
        warehouseDataList.length > 0 && ( */}
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        {warehouseDataList.length === 0 && !loading && (
          <SectionTitleText
            sx={{
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "34px",
              mt: "8px",
              mb: "12px",
              color: "#484A9E",
            }}
          >
            Locations
          </SectionTitleText>
        )}

        <AppPageSections
          title={"Location"}
          views={["list"]}
          pageView={pageView}
          tableData={warehouseDataList}
          columnData={WarehouseTableColumnData}
          loading={loading}
          isUsingMuiGrid={false}
          basePath={"/app/warehouse?"}
          totalCount={warehouseDataList.length}
          shallUseRouter={true}
          hasStepOnboarding={false}
          buttonTitle="Create Location"
          handleChangeView={handleChangeView}
          component={MapComponent}
          rowIdkey={"Address ID"}
          hideFilters={true}
          hidePublishButton={true}
          handleClickAddButton={() => handleCreateWarehouseButton()}
          handleCreateButtonClick={() => handleCreateWarehouseButton()}
          hasCustomClickFunction={true}
          // renderEmptyRowsFallback={() => (
          // <NewEmptyState
          //   hidePoints
          //   icon={<WarehouseES />}
          //   title="Location Management"
          //   titleDesc={
          //     "We didn’t recognize locations connected with bluecom store.  Select a recommended action Add a location  manually"
          //   }
          //   note1={"Add a location  manually"}
          //   ActionOne={"Add Location"}
          //   handleActionOne={() => handleCreateWarehouseButton()}
          //   note2={"Connect your store with bluecom"}
          //   ActionTwo={"Connect Your Store"}
          //   handleActionTwo={() => handleActionTwo()}
          //   note3={"Contact us to get help in onboarding"}
          //   ActionThree={"Contact Us"}
          //   handleActionThree={() =>
          //     handleClickWebsite("bluecom.ai/contact-us")
          //   }
          // >
          //   {/* <PrimaryButton onClick={() => handleCreateWarehouseButton()}>
          //     Create Location
          //   </PrimaryButton> */}
          // </NewEmptyState>
          // )}
        />
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
            sm: "block",
          },
        }}
      >
        <MobileViewAppPageSection
          title="Locations"
          buttonTitle={"Create location"}
          tableData={activePageData}
          basePath={"/app/warehouse?"}
          totalCount={warehouseDataList.length}
          handleCreateButtonClick={() => {}}
          loading={loading}
          component={MobileViewLocationCard}
        />
      </Box>
      {/* )} */}

      <DialogAsCaution
        loading={buttonLoading}
        title={<div>Are you sure you want to delete this Location?</div>}
        message="This action can't be undone"
        open={deleteDialogOpen}
        onCancel={handleDeleteDialogClose}
        onDelete={() => handleDeleteDialogOpen(deleteWarehouseId)}
      />
    </div>
  );
}

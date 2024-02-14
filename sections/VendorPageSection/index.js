import { Delete, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Dialog,
  Stack,
} from "@mui/material";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import EmptyState from "components/Common/EmptyState";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import CautionIcon from "components/Common/Icons/CautionIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import ProductsPageTable from "sections/ProductsPageSection/ProductsPageTable";
import appFetch from "utils/appFetch";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import EditIconPencile from "components/Common/Icons/EditIconPencile";
import DeleteIconVendor from "components/Common/Icons/DeleteIconVendor";
import PayPalIcon from "components/Common/Icons/PayPalIcon";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import {
  resetStore,
  resetVendorOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import PaymentWIFITransfer from "components/Common/Icons/VendorIcon/PaymentWIFITransfer";
import CreditCardPaymentTransfer from "components/Common/Icons/VendorIcon/CreditCardPaymentTransfer";
import { useSnackbar } from "notistack";
import AppImage from "components/Common/AppImage";
import DeleteIconPopup from "components/Common/Icons/VendorIcon/DeleteIconPopup";
import DialogAsCaution from "components/Common/Dialog/DialogAsCaution";
import vendorListTableColumns from "./constants/vendorListTableColumns";
import IconMenu from "components/Common/Menus/IconMenu";
import VendorEmptyState from "components/Common/Icons/EmptyStates/VendorEmptyState";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import MobileViewVendorCard from "./MobileViewComponents/MobileViewVendorCard";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function VendorPageSection() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const USER_ID = currentUser && currentUser.merchant_id;
  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteVendorID, setDeleteVendorID] = useState(null);
  const { currentPage } = router.query;

  const handleDeleteDialogOpen = (vendor_id) => {
    setOpenDialog(true);
    setDeleteVendorID(vendor_id);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setDeleteVendorID("");
  };

  const handleFetchVendorsList = () => {
    const URL = VENDOR.FETCH_VENDOR;
    setLoading(true);
    const data = {
      user_id: USER_ID,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setVendorList(json.result);
      setLoading(false);
    });
  };
  useEffect(() => {
    handleFetchVendorsList();
    // setLoading(false);
  }, []);

  // delete vendor and display message after delete
  const handleDeleteVendor = () => {
    const URL = VENDOR.DELETE_VENDOR;
    const data = {
      user_id: USER_ID,
      vendor_id: deleteVendorID,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar(json.message);
      }
      console.log(json);
      handleFetchVendorsList();
      handleDeleteDialogClose();
    });
  };

  const vendorTableData =
    Array.isArray(vendorList) &&
    vendorList.map((vendor) => {
      const { vendor_id } = vendor;
      return {
        ...vendor,
        id: vendor_id,
      };
    });

  function getStr1(str) {
    return str.length > 60 ? str.slice(0, 58) + ".." : str;
  }

  const headerData = [
    ...vendorListTableColumns,
    {
      field: "edit_action",
      accessorKey: "edit_action",
      header: "Action",
      headerName: "Action",
      size: 100,
      align: "center",
      headerAlign: "center",
      // renderCell: (params) => (

      // ),

      Cell: ({ cell }) => (
        <IconMenu
          options={[
            {
              label: "Edit Vendor",
              icon: <EditIcon />,
              onClick: () => {
                router.push(`/app/vendors/${cell.row.original.vendor_id}/edit`);
              },
            },
            {
              // label: (
              //   <>
              //     <Typography
              //       sx={{
              //         color: "#d92d20",
              //       }}
              //     >
              //       Delete Vendor
              //     </Typography>
              //   </>
              // ),
              label: "Delete Vendor",
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
              onClick: () => {
                handleDeleteDialogOpen(cell.row.original.vendor_id);
              },
            },
          ]}
          buttonIcon={<MoreHoriz />}
        />
      ),
    },
  ];

  const handleClickCreateButton = () => {
    const time = new Date().getTime();
    dispatch(resetVendorOnboardingSteps());
    router.push(`/onboarding/vendors/${time}?step=general-info&id=0`);
  };
  const activePageData = updatePageData({
    currentPage,
    data: vendorTableData,
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
  if (vendorTableData.length === 0 && !loading) {
    return (
      <NewEmptyState
        hidePoints
        icon={<VendorEmptyState />}
        title="Manage Supplier/Vendor"
        titleDesc={
          "We couldn't find any vendors synced with Bluecom. Please proceed by adding vendors to bluecom."
        }
        note1={"Add Supplier/Vendor"}
        ActionOne={"Add Vendor"}
        handleActionOne={() => handleClickCreateButton()}
        note2={"Update Products associated with the Supplier/Vendor"}
        ActionTwo={"Connect Your Store"}
        handleActionTwo={() => handleActionTwo()}
        note3={"Contact us to get help in Vendor onboarding"}
        ActionThree={"Contact Us"}
        handleActionThree={() => handleClickWebsite("bluecom.ai/contact-us")}
      >
        <Typography
          sx={{
            ml: "-320px",
            fontSize: "14px",
            fontWeight: 400,
            color: "#313131",
            mt: "8px",
          }}
        >
          Note: Please include the lead time for each products
        </Typography>
      </NewEmptyState>
    );
  }

  return (
    <div>
      {/* {loading && <PageSpinner />} */}
      {/* {vendorTableData.length > 0 && ( */}
      {/* {vendorTableData.length > 0 && !loading && ( */}
      {/* {vendorTableData.length === 0 && !loading && (
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
          Vendors
        </SectionTitleText>
      )} */}
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <AppPageSections
          hasStepOnboarding={true}
          hasCustomClickFunction={true}
          hidePublishButton={true}
          handleCreateButtonClick={() => handleClickCreateButton()}
          // checkboxSelection={true}
          buttonTitle={"Add a new vendor/supplier"}
          title={"Vendors"}
          tableData={vendorTableData}
          totalCount={vendorTableData.length}
          pageView
          views={["list"]}
          rowIdkey={"vendor_id"}
          columnData={headerData}
          hideFilters
          isUsingMuiGrid={false}
          loading={loading}
          basePath={"/app/vendors?"}
          shallUseRouter={true}
          // renderEmptyRowsFallback={() => (
          //   <NewEmptyState
          //     hidePoints
          //     icon={<VendorEmptyState />}
          //     title="Manage Supplier/Vendor"
          //     titleDesc={
          //       "We didn’t recognize locations connected with bluecom store.  Select a recommended action to connect location data."
          //     }
          //     note1={"Add Supplier/Vendor"}
          //     ActionOne={"Add Vendor"}
          //     handleActionOne={() => handleClickCreateButton()}
          //     note2={"Connect your store with bluecom"}
          //     ActionTwo={"Connect Your Store"}
          //     handleActionTwo={() => handleActionTwo()}
          //     note3={"Contact us to get help in onboarding"}
          //     ActionThree={"Contact Us"}
          //     handleActionThree={() =>
          //       handleClickWebsite("bluecom.ai/contact-us")
          //     }
          //   >
          //     {/* <PrimaryButton onClick={() => handleClickCreateButton()}>
          //       Add vendor
          //     </PrimaryButton> */}
          //   </NewEmptyState>
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
          tableData={activePageData}
          totalCount={vendorTableData.length}
          basePath={`/app/vendors?`}
          handleCreateButtonClick={() => handleClickCreateButton()}
          loading={loading}
          title={"Vendors"}
          buttonTitle={`Create Vendor`}
          component={MobileViewVendorCard}
        />
      </Box>
      {/* )} */}
      <Dialog
        open={openDialog}
        onClose={() => handleDeleteDialogClose(false)}
        PaperProps={{
          sx: {
            borderRadius: "10px !important",
            minWidth: "480px",
            maxWidth: "480px",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            m: 2,
            // mb: 1,
            mx: 4,
            mt: 3,
            "& .delete-icon": {
              border: "1px solid #e4e7ec",
              borderRadius: "10px",
              boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

              height: "48px",
              width: "48px",
              p: 1,
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="delete-icon"
          >
            <path
              d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
              stroke="#4F44E0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <IconButton
            onClick={handleDeleteDialogClose}
            disableRipple
            sx={{
              "&:hover": {
                background: "#F5F4FD",
                transition: "all 0.3s ease-in-out",
                borderRadius: "50%",
              },
              "& .logoutCross-icon": {
                borderRadius: "10px",
                height: "40px",
                width: "40px",
                p: 1,
              },
              borderRadius: "50%",
              marginTop: "-4px",
              marginRight: "-18px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="logoutCross-icon"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#4F44E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </Stack>
        <Stack sx={{ mx: 4 }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "28px",
              my: 1,
            }}
          >
            Are you sure you want to delete the Vendor?
          </Typography>
          <Typography
            sx={{
              color: " #626266",
              fontSize: "18px",
              lineHeight: "24px",
              // fontWeight: 500,

              mb: 2,
              mr: 2,
              pr: 2,
            }}
          >
            This action can{"'"}t be undone
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} m={4}>
          <SecondaryButton
            sx={{ mr: 2 }}
            fullWidth
            onClick={() => handleDeleteDialogClose()}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={() => {
              console.log("button clicked", deleteVendorID);
              handleDeleteVendor(deleteVendorID);
            }}
            // loading={loading}
            fullWidth
          >
            Delete Vendor
          </PrimaryButton>
        </Stack>
      </Dialog>

      {/* <BaseDialog
        // hideCloseButton
        open={openDialog}
        handleClose={handleDeleteDialogClose}

        // {...bindPopover(popupState)}
        // anchorOrigin={{
        // 	vertical: "top",
        // 	horizontal: "center",
        // }}
        // transformOrigin={{
        // 	vertical: "top",
        // 	horizontal: "center",
        // }}
      >
        <Box
          sx={{
            marginY: "8px",

            marginX: "8px",
            mt: "32px",
            mb: "2px",
            width: "500px",
            height: "300px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mb: "16px",
            },
          }}
        >
          <DeleteIconPopup />

          <Typography
            sx={{
              pt: "8px",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete the Vendor?
          </Typography>
          <Typography
            sx={{
              mt: "18px",
              fontSize: "18px",
              fontWeight: "600",
              //  lineHeight: "32px",
              textAlign: "center",
              color: "#313131",
            }}
          >
            This action can{"'"}t be undone
          </Typography>

          {/* <Box
            sx={{
              display: "flex",
              mt: "25px",
              bottom: "0",
              width: "110%",
              gap: "16px",
              justifyContent: "center",
              borderTop: "1px solid #E0E0E0",
              pt: "24px",
            }}
          >
            <SecondaryButton
              onClick={handleDeleteDialogClose}
              fullWidth
              sx={{
                height: "44px",
                width: "auto",
                // color: (theme) => theme.palette.grey[300],
              }}
              // onClick={popupState.close}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
          

              onClick={() => {
                console.log("button clicked", deleteVendorID);
                handleDeleteVendor(deleteVendorID);
              }}
              fullWidth
              sx={{
                ml: 1,
                height: "44px",
                width: "auto",
                backgroundColor: "#D92D20",
                "&:hover": {
                  background: "#d91304",
                },
              }}
            >
              Delete Vendor
            </PrimaryButton>
          </Box> 
          <Divider
            sx={{
              width: "112%",

              mt: "36px",
              mb: "16px",

              color: "#E0E0E0",
            }}
            variant="middle"
          />
          <Box
            sx={{
              // borderTop: (theme) =>
              // 	`1px solid ${theme.palette.grey[300]}`,
              display: "flex",
              // pt: "32px",

              // bottom: "0",
              width: "70%",

              // pb: "24px",
            }}
          >
            <SecondaryButton
              sx={{
                flex: 0.5,
              }}
              onClick={handleDeleteDialogClose}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton
              sx={{
                flex: 1,
                ml: "16px",
                backgroundColor: "#D92D20",
                "&:hover": {
                  background: "#d91304",
                },
              }}
              onClick={() => {
                console.log("button clicked", deleteVendorID);
                handleDeleteVendor(deleteVendorID);
              }}
            >
              Delete Vendor
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog> */}

      {/* <DialogAsCaution /> */}
      {/* )} */}
    </div>
  );
}

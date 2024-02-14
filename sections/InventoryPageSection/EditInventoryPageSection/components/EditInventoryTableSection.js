import { Box } from "@mui/material";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import EmptyState from "components/Common/EmptyState";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";
import InventoryES from "components/Common/Icons/EmptyStates/InventoryES";
import product from "components/Common/Icons/product";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import { INVENTORY } from "constants/API_URL";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function EditInventoryTableSection({
  tableData,
  columnsData,
  handleClickDoneButton,
  handleClickCancelButton,
  loading,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage } = router.query;

  const handleConnectStoreButton = () => {
    dispatch(resetStore());

    const route = `/app/stores/add-store?step=select-channel&id=0`;
    router.push(route);
  };

  if (loading) return <PageLoader />;
  if (Array.isArray(tableData) && tableData.length === 0 && !loading)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          <EmptyState
            icon={<InventoryES />}
            text="No Inventory Found"
            bodyText={"We didn’t found inventory connected with bluecom store."}
          ></EmptyState>
          {/* <NewEmptyState
            hidePoints
            icon={<InventoryES />}
            title="No Inventory Available for this Product"
            titleDesc={
              "We didn’t find inventory data with this account.  Select below recommended actions to start managing inventory with bluecom."
            }
            note1={"Connect your store with bluecom"}
            ActionOne={"Connect Your Store"}
            handleActionOne={() => handleConnectStoreButton()}
            note2={"Contact us to get help in onboarding"}
            ActionTwo={"Contact Us"}
            handleActionTwo={() => handleClickWebsite("bluecom.ai/contact-us")}
            hideActionThree
          ></NewEmptyState> */}
        </Box>
      </>
    );

  return (
    <div style={{ marginTop: "16px" }}>
      <BluecomMRTBaseTable
        data={tableData}
        columnsData={columnsData}
        muiTableContainerProps={{
          sx: {
            height: "600px",
          },
        }}
        enableBottomToolbar={tableData.length > 6}
        enableSorting={true}
      />
    </div>
  );
}

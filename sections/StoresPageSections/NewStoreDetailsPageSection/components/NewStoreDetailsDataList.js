import React from "react";
import NewStoreDetailsDataCard from "./NewStoreDetailsDataCard";
import NewStoreDetailsDataMenu from "./NewStoreDetailsDataMenu";
import { Box, Skeleton, Typography } from "@mui/material";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import NewStoreDisableIntegrationDialog from "./NewStoreDisableIntegrationDialog";

const styles = {
  // maxWidth: "80%",
  "& .row": {
    display: "flex",
    gap: 2,
    py: 2,
    px: "36px",
  },
  "& .controls": {
    display: "flex",
    gap: 2,
    alignItems: "start",
  },
};
export default function NewStoreDetailsDataList({
  isLoading,
  storeData,
  catalogData,
  isCardsLoading,
  userId,
  handleFetchStoreDetails,
}) {
  const [openDisableIntegrationDialog, setOpenDisableIntegrationDialog] =
    React.useState(false);
  const handleOpenDisableIntegrationDialog = () => {
    setOpenDisableIntegrationDialog(true);
  };
  const handleCloseDisableIntegrationDialog = () => {
    setOpenDisableIntegrationDialog(false);
  };
  const handleDisableIntegration = () => {};
  const handleSyncAll = () => {};

  // const cardsData = [
  //   {
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //       >
  //         <path
  //           d="M13.1002 2.10156L3.20115 3.51656L1.78715 13.4166L10.9792 22.6086C11.1667 22.796 11.421 22.9013 11.6862 22.9013C11.9513 22.9013 12.2056 22.796 12.3932 22.6086L22.2932 12.7086C22.4806 12.521 22.5859 12.2667 22.5859 12.0016C22.5859 11.7364 22.4806 11.4821 22.2932 11.2946L13.1002 2.10156ZM12.3932 4.22356L20.1722 12.0016L11.6862 20.4866L3.90815 12.7086L4.96815 5.28356L12.3932 4.22356ZM10.2732 10.5876C10.6483 10.2123 10.859 9.70334 10.8589 9.17271C10.8589 8.90997 10.8071 8.6498 10.7065 8.40708C10.6059 8.16435 10.4585 7.94382 10.2727 7.75806C10.0868 7.57231 9.86624 7.42497 9.62348 7.32447C9.38072 7.22396 9.12054 7.17226 8.8578 7.1723C8.32716 7.1724 7.8183 7.38328 7.44315 7.75856C7.068 8.13384 6.8573 8.64278 6.85739 9.17342C6.85748 9.70405 7.06837 10.2129 7.44365 10.5881C7.81893 10.9632 8.32787 11.1739 8.8585 11.1738C9.38914 11.1737 9.898 10.9628 10.2732 10.5876Z"
  //           fill="#4F44E0"
  //         />
  //       </svg>
  //     ),
  //     title: "Products Listings",
  //     count: catalogData.products,
  //   },
  //   {
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //       >
  //         <path
  //           d="M21 13.242V20H22V22H2V20H3V13.242C2.38437 12.8311 1.87971 12.2745 1.53082 11.6218C1.18193 10.969 0.999592 10.2402 1 9.5C1 8.673 1.224 7.876 1.633 7.197L4.345 2.5C4.43277 2.34798 4.559 2.22175 4.71101 2.13398C4.86303 2.04621 5.03547 2 5.211 2H18.79C18.9655 2 19.138 2.04621 19.29 2.13398C19.442 2.22175 19.5682 2.34798 19.656 2.5L22.358 7.182C22.9546 8.17287 23.1463 9.35553 22.8934 10.4841C22.6405 11.6127 21.9624 12.6005 21 13.242ZM19 13.972C18.3124 14.0491 17.6163 13.9665 16.9659 13.7307C16.3155 13.4948 15.7283 13.1119 15.25 12.612C14.8302 13.0511 14.3258 13.4005 13.7672 13.6393C13.2086 13.878 12.6075 14.001 12 14.001C11.3927 14.0013 10.7916 13.8786 10.233 13.6402C9.67445 13.4018 9.16996 13.0527 8.75 12.614C8.27163 13.1138 7.68437 13.4964 7.03395 13.7321C6.38353 13.9678 5.68749 14.0503 5 13.973V20H19V13.973V13.972ZM5.789 4L3.356 8.213C3.11958 8.79714 3.11248 9.44903 3.33613 10.0382C3.55978 10.6273 3.99768 11.1103 4.56218 11.3904C5.12668 11.6705 5.77614 11.7271 6.38058 11.5488C6.98502 11.3706 7.49984 10.9706 7.822 10.429C8.157 9.592 9.342 9.592 9.678 10.429C9.8633 10.8934 10.1836 11.2916 10.5975 11.5721C11.0115 11.8526 11.5 12.0025 12 12.0025C12.5 12.0025 12.9885 11.8526 13.4025 11.5721C13.8164 11.2916 14.1367 10.8934 14.322 10.429C14.657 9.592 15.842 9.592 16.178 10.429C16.3078 10.7484 16.5022 11.0376 16.7491 11.2783C16.996 11.519 17.2901 11.706 17.6127 11.8275C17.9354 11.9491 18.2797 12.0026 18.6241 11.9847C18.9684 11.9668 19.3053 11.8778 19.6136 11.7234C19.9219 11.569 20.1949 11.3525 20.4155 11.0875C20.6361 10.8225 20.7995 10.5148 20.8955 10.1836C20.9914 9.85238 21.0178 9.50493 20.973 9.16305C20.9281 8.82118 20.8131 8.49227 20.635 8.197L18.21 4H5.79H5.789Z"
  //           fill="#4F44E0"
  //         />
  //       </svg>
  //     ),
  //     title: "Location Connections",
  //     count: catalogData.locations,
  //   },
  //   {
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //       >
  //         <path
  //           d="M3 20V8.7C2.71667 8.51667 2.479 8.28334 2.287 8C2.095 7.71667 1.99934 7.38334 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.98 2.195 3.45067 1.99934 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V7C22 7.38334 21.904 7.71667 21.712 8C21.52 8.28334 21.2827 8.51667 21 8.7V20C21 20.55 20.804 21.021 20.412 21.413C20.02 21.805 19.5493 22.0007 19 22H5C4.45 22 3.979 21.804 3.587 21.412C3.195 21.02 2.99934 20.5493 3 20ZM5 9V20H19V9H5ZM20 7V4H4V7H20ZM9 14H15V12H9V14Z"
  //           fill="#4F44E0"
  //         />
  //       </svg>
  //     ),
  //     title: "Inventory On hand",
  //     count: catalogData.inventory,
  //   },
  // ];

  const menuData = [
    {
      title: "Inventory",
      id: 4,
      type: "inventory",
      auto_sync_key: "inventory_auto_sync_enabled",
      // data: storeData.meta_data.find((item) => item.app_line_id === 4),
    },
    // {
    //   title: "Products",
    //   id: 1,
    //   type: "products",
    //   auto_sync_key: "product_auto_sync_enabled",

    //   // data: storeData.meta_data.find((item) => item.app_line_id === 4),
    // },
    // {
    //   title: "Location",
    //   id: 3,
    //   type: "location",
    //   auto_sync_key: "warehouse_auto_sync_enabled",

    //   // data: storeData.meta_data.find((item) => item.app_line_id === 4),
    // },
  ];
  /**
 * {
    "user_id":"123",
    "store_id":"139070545406036591",
    "inventory_auto_sync_enabled":true,
    "vendor_auto_sync_enabled":true,
    "product_auto_sync_enabled":true,
    "location_auto_sync_enabled":true,
    "sync_frequency":30,
    "mode":"min"
}
 */

  return (
    <Box sx={{ ...styles }}>
      {/* <div className="row">
        {cardsData.map((item) => (
          <NewStoreDetailsDataCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            count={item.count}
            isLoading={isCardsLoading}
          />
        ))}
      </div> */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "36px",
          mt: "24px",
          mb: "8px",
          width: "80%",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#2A2A2F",
            letterSpacing: "0px",
          }}
        >
          Store Settings
        </Typography>
        {/* {isLoading ? (
          <Skeleton width={200} height={48} />
        ) : (
          <div className="controls">
            <SecondaryButton
              size="small"
              onClick={handleOpenDisableIntegrationDialog}
            >
              Disable Integration
            </SecondaryButton>
            <PrimaryButton
              size="small"
              sx={{
                height: "40px",
              }}
              onClick={handleSyncAll}
            >
              Sync all
            </PrimaryButton>
          </div>
        )} */}
        <NewStoreDisableIntegrationDialog
          open={openDisableIntegrationDialog}
          handleClose={handleCloseDisableIntegrationDialog}
          handleProceedButton={handleDisableIntegration}
        />
      </Box>

      {!isLoading && (
        <div className="column">
          {menuData.map((item) => (
            <NewStoreDetailsDataMenu
              key={item.id}
              title={item.title}
              isLoading={isLoading}
              data={
                Array.isArray(storeData.metadata) &&
                storeData.metadata.find((it) => it.app_line_id === item.id)
              }
              type={item.type}
              userId={userId}
              autoSyncKey={item.auto_sync_key}
              handleFetchStoreDetails={handleFetchStoreDetails}
            />
          ))}
        </div>
      )}
    </Box>
  );
}

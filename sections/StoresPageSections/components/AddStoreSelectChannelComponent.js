import { Box, Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import AmazonIcon from "components/Common/Icons/StoresIcon/AmazonIcon";
import EbayIcon from "components/Common/Icons/StoresIcon/EbayIcon";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SelectChannelItemCard from "./SelectChannelItemCard";
import BigCommerceIcon from "components/Common/Icons/StoresIcon/BigCommerceIcon";
import { updateStore } from "redux/onboarding/onboardingSlice";
import ConfirmFirstStoreLinkDialog from "./ConfirmFirstStoreLinkDialog";
import FieldsLinkedDialog from "./FieldsLinkedDialog";

const mapState = ({ storesData }) => ({
  connectedStores: storesData.connectedStores,
});
export default function AddStoreSelectChannelComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connectedStores } = useSelector(mapState);
  const { channel } = router.query;
  const [selectedChannel, setSelectedChannel] = useState(channel ?? "");
  const [openFieldsLinkedDialog, setOpenFieldsLinkedDialog] = useState(false);
  const [openConfirmStoreLinkDialog, setOpenConfirmStoreLinkDialog] =
    useState(false);
  const handleCloseFieldsLinkedDialog = () => {
    setOpenFieldsLinkedDialog(false);
  };
  const handleOpenFieldsLinkedDialog = () => {
    setOpenFieldsLinkedDialog(true);
  };

  const handleOpenConfirmStoreLinkDialog = (channel) => {
    setOpenConfirmStoreLinkDialog(true);
    handleSelectChannel(channel);
  };
  const handleCloseConfirmStoreLinkDialog = () => {
    setOpenConfirmStoreLinkDialog(false);
  };

  const handleClickProceed = (channel) => {
    dispatch(
      updateStore({ nextStep: "add-new-store", step: "select-channel" })
    );
    router.push(
      `/app/stores/add-store?step=add-new-store&id=1&channel=${channel}`
    );
  };
  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };
  const disableButton = !selectedChannel;
  console.log({ selectedChannel });
  return (
    <Box sx={{ pt: 4 }}>
      <SectionTitleText
        sx={{
          fontSize: "32px",
          fontWeight: "700px",
          color: "#484A9E",
          pb: "8px",
        }}
      >
        Select Channel
        {/* Link your {connectedStores.length === 0 && "First "} Store */}
        {/* Select the Channel to Connect. */}
      </SectionTitleText>
      {connectedStores.length > 0 && (
        <DescriptionText
          sx={{
            fontSize: "16px",
            fontWeight: "500px",
            color: (theme) => theme.palette.text.primary,
            // p: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            // background: "#FEF7F0",
            mt: 2,
            "& .icon": {
              mr: 1,
            },
            "& b": {
              mr: 1,
            },
          }}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="icon"
          >
            <path
              d="M7.33398 11.332H8.66732V7.33203H7.33398V11.332ZM8.00065 5.9987C8.18954 5.9987 8.34798 5.9347 8.47598 5.8067C8.60398 5.6787 8.66776 5.52048 8.66732 5.33203C8.66732 5.14314 8.60332 4.9847 8.47532 4.8567C8.34732 4.7287 8.1891 4.66492 8.00065 4.66536C7.81176 4.66536 7.65332 4.72936 7.52532 4.85736C7.39732 4.98536 7.33354 5.14359 7.33398 5.33203C7.33398 5.52092 7.39798 5.67936 7.52598 5.80736C7.65398 5.93536 7.81221 5.99914 8.00065 5.9987ZM8.00065 14.6654C7.07843 14.6654 6.21176 14.4903 5.40065 14.14C4.58954 13.7898 3.88398 13.3149 3.28398 12.7154C2.68398 12.1154 2.2091 11.4098 1.85932 10.5987C1.50954 9.78759 1.33443 8.92092 1.33398 7.9987C1.33398 7.07648 1.5091 6.20981 1.85932 5.3987C2.20954 4.58759 2.68443 3.88203 3.28398 3.28203C3.88398 2.68203 4.58954 2.20714 5.40065 1.85736C6.21176 1.50759 7.07843 1.33248 8.00065 1.33203C8.92287 1.33203 9.78954 1.50714 10.6007 1.85736C11.4118 2.20759 12.1173 2.68248 12.7173 3.28203C13.3173 3.88203 13.7924 4.58759 14.1427 5.3987C14.4929 6.20981 14.6678 7.07648 14.6673 7.9987C14.6673 8.92092 14.4922 9.78759 14.142 10.5987C13.7918 11.4098 13.3169 12.1154 12.7173 12.7154C12.1173 13.3154 11.4118 13.7905 10.6007 14.1407C9.78954 14.4909 8.92287 14.6658 8.00065 14.6654Z"
              fill="#E3810F"
            />
          </svg> */}
          {/* <b>Set Up Your Primary Store:</b>  */}
          {/* <b>Setup your {connectedStores.length === 0 && "first "} store:</b>
          {/* Create a connection with the primary store that holds the products 
          Establish connection between your store and bluecom */}
          Please select the channel to establish connection with bluecom.
        </DescriptionText>
      )}{" "}
      <Grid
        container
        spacing={4}
        sx={{ marginTop: "16px", justifyContent: "center" }}
      >
        {channelIconsList.map((store, index) => {
          return (
            <Grid item xs={12} md={4} key={index} sm={3}>
              <SelectChannelItemCard
                title={store.title}
                icon={store.icon}
                // isSelected={selectedChannel === store.key}
                onClick={() =>
                  connectedStores.length === 0
                    ? handleOpenConfirmStoreLinkDialog(store.key)
                    : handleClickProceed(store.key)
                }
                handleClickInfoButton={handleOpenFieldsLinkedDialog}
              />
            </Grid>
          );
        })}
      </Grid>
      <ConfirmFirstStoreLinkDialog
        open={openConfirmStoreLinkDialog}
        handleClose={handleCloseConfirmStoreLinkDialog}
        handleConfirmButtonClick={() => handleClickProceed(selectedChannel)}
        channel={selectedChannel}
      />
      <FieldsLinkedDialog
        open={openFieldsLinkedDialog}
        handleClose={handleCloseFieldsLinkedDialog}
      />
      {/* <Box
				sx={{
					// display: "flex",
					// mt: 4,
					// justifyContent: "space-around",

					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					justifyContent: "center",
					position: "fixed",
					backgroundColor: "white",
					bottom: "0",
					width: "1800px",
					py: 2,
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					ml: "-460px",
				}}
			>
				<PrimaryButton
					onClick={() => handleClickProceed()}
					sx={{ width: "200px" }}
					disabled={disableButton}
				>
					Save & Continue
				</PrimaryButton>
			</Box> */}
    </Box>
  );
}

export const channelIconsList = [
  {
    title: "Shopify",
    key: "shopify",
    icon: <ShopifyIcon />,
  },
  // {
  //   title: "Amazon",
  //   key: "amazon",
  //   icon: <AmazonIcon />,
  // },
  {
    title: "WooCommerce",
    key: "woocommerce",
    icon: <WooCommerceIcon />,
  },
  {
    title: "BigCommerce",
    key: "bigcommerce",
    icon: <BigCommerceIcon />,
  },
  // {
  //   title: "Ebay",
  //   key: "ebay",
  //   icon: <EbayIcon />,
  // },
];

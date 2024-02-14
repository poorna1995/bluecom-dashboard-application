import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { TASKS, WOOCOMMERCE } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

import ConsumerHelpBaseDialog from "./ConsumerHelpBaseDialog";
import { useDispatch } from "react-redux";
import { updateStore } from "redux/onboarding/onboardingSlice";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import ChannelSyncValidationConfirmationDialog from "../AddNewStorePageSyncSection/components/ChannelSyncValidationConfirmationDialog";
import ChannelToBluecom from "./components/ChannelToBluecom";
import ShopLinkInput from "./components/ShopLinkInput";
import FormInputWithLabelAndHelpButton from "./components/FormInputWithLabelAndHelpButton";
import { setStoreDict } from "redux/stores/storeSlice";

const mapState = ({ user, storesData }) => ({
  currentUser: user.currentUser,
  storeDict: storesData.storeDict,
});
export default function AddNewStoreWooCommerceSection() {
  const dispatch = useDispatch();
  const { currentUser, storeDict } = useSelector(mapState);
  const router = useRouter();
  const { storeId, drawerOpen, shop, channel } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(
    // drawerOpen === "true",
    false
  );
  const [dialogData, setDialogData] = useState({});

  // useEffect(() => {
  // 	setOpenConfirmDialog(drawerOpen === "true");
  // }, [drawerOpen]);

  // const { control, handleSubmit } = useForm({
  // 	defaultValues: {
  // 		storeName: "",
  // 		consumerKey: "",
  // 		consumerSecret: "",
  // 	},
  // });
  const [formData, setFormData] = useState({
    storeName: "",
    consumerKey: "",
    consumerSecret: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    storeName: "",
    consumerKey: "",
    consumerSecret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setErrorMessages({
        ...errorMessages,
        [e.target.name]: "This field is required",
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        [e.target.name]: "",
      });
    }
  };
  const handleConsumerDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleConsumerDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClickAddToStoreButton = () => {
    // POST
    // {
    //     "user_id":"138940023846722390",
    //     "shop":"test-store.local",
    //     "consumer_key":"ck_067a701cd9ae94b70018d9677cb84600761b2687",
    //     "consumer_secret":"cs_255c79b712293bd6960dc0bc99210c3d478b8952",
    //     "scope":""
    // }

    // const URL = WOOCOMMERCE.VALIDATE_CREDENTIALS;
    const URL = TASKS.VALIDATE_CREDENTIALS;

    const reqData = {
      user_id: currentUser.merchant_id,
      shop: formData.storeName.replace("https://", "").replace("http://", ""),
      consumer_key: formData.consumerKey,
      consumer_secret: formData.consumerSecret,
      scope: "",
      channel_name: "woocommerce",
    };
    if (
      !formData.storeName ||
      !formData.consumerKey ||
      !formData.consumerSecret
    ) {
      return enqueueSnackbar("Please fill all the fields", {
        variant: "error",
      });
    }
    setIsLoading(true);

    appFetch(URL, reqData)
      .then((json) => {
        setIsLoading(false);
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          dispatch(
            updateStore({
              nextStep: "store-analysis",
              step: "add-new-store",
            })
          );
          console.log("success", json);
          // setDialogData(json.result);
          // setOpenConfirmDialog(true);
          // dispatch(setStoreDict(json.store_dict));
          router.push(
            `/app/stores/add-store?step=store-analysis&id=2&channel=woocommerce&shop=${formData.storeName
              .replace("https://", "")
              .replace("http://", "")}&taskId=${json.task_id}`
          );

          // enqueueSnackbar("Store added successfully");
          // dispatch(updateStore({ step: "sync" }));
          // router.push(
          // 	`/app/stores/add-store?step=add-new-store&id=1&channel=woocommerce&storeId=${json.store_id}&shop=${formData.storeName}`,
          // );
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          enqueueSnackbar(json.message, { variant: "error" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  const handleSyncWooCommerceStore = () => {
    const URL = WOOCOMMERCE.SYNC_STORE;
    const data = {
      user_id: currentUser.merchant_id,
      store_id: storeId,
      store_dict: storeDict,
    };

    setIsLoading(true);

    appFetch(URL, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          dispatch(
            updateStore({
              nextStep: "sync",
              step: "add-new-store",
            })
          );
          console.log("success");
          enqueueSnackbar("Store added successfully");
          dispatch(updateStore({ step: "sync" }));
          router.push(
            `/app/stores/add-store?step=sync&id=2&channel=woocommerce&storeId=${storeId}&shop=${router.query.shop}&taskId=${json.task_id}`
          );
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          enqueueSnackbar(json.message, { variant: "error" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  const handleCloseDialog = () => {
    router.push(
      `/app/stores/add-store?step=add-new-store&id=1&channel=woocommerce&storeId=${storeId}&drawerOpen=false`
    );
  };
  return (
    <>
      <Box sx={{ pt: 4 }}>
        <ChannelToBluecom channel={channel} />
        <SectionTitleText
          sx={{
            fontSize: "32px",
            fontWeight: "700px",
            color: "#484A9E",
            pb: "8px",
          }}
        >
          Connect to WooCommerce
        </SectionTitleText>
        <DescriptionText
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#222222",
          }}
        >
          Add your store which you want to integrate with our app
        </DescriptionText>
        <Box sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "22px",
              color: "#1D2939",
            }}
          >
            Selected Channel :
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1,
              px: 2,
              "& svg": {
                height: "20px",
                width: "30px",
                mr: 2,
              },
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: " 21px",
              border: (theme) => `1px solid ${theme.palette.grey[200]}`,
              borderRadius: "5px",
              ml: 2,
            }}
          >
            <WooCommerceIcon /> <span>WooCommerce</span>
          </Typography>
        </Box>

        <Box>
          <Box sx={{}}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#222",
                pb: 1,
              }}
            >
              Store Name *
            </Typography>
            <ShopLinkInput
              name="storeName"
              inputPrefix={"https://"}
              inputSuffix={"/wp-admin"}
              shopName={formData.storeName}
              onChange={handleChange}
              replaceValue={"/wp-admin"}
              placeholder="store.com"
              onBlur={handleBlur}
              helperText={errorMessages.storeName}
              error={errorMessages.storeName.length > 0}
              containerStyles={{ px: 0 }}
              // {...field}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            {/* <Controller
							name="consumerKey"
							control={control}
							render={({ field }) => ( */}
            <FormInputWithLabelAndHelpButton
              title={"Consumer Key"}
              required
              name="consumerKey"
              containerStyles={{
                // maxWidth: "100%",
                marginTop: "16px",
                // maxWidth: "400px",
              }}
              value={formData.consumerKey}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errorMessages.consumerKey}
              error={errorMessages.consumerKey.length > 0}
              helperButtonText={"Consumer Key?"}
              helperButtonOnClick={handleConsumerDialogOpen}
              placeholder="Enter Consumer Key"
              // {...field}
            />
            {/* )}
						/> */}
            {/* <Button
							sx={{
								textTransform: "capitalize",
								mt: 6,
								ml: 2,
								fontSize: "14px",
								fontWeight: 500,
								color: "#4F44E0",
								"&:hover": {
									backgroundColor: "transparent",
								},
							}}
							onClick={() => handleConsumerDialogOpen()}
						>
							Find Consumer Key
						</Button>{" "} */}
            {/* <div style={{ flex: 1 }} /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            {/* <Controller
							name="consumerSecret"
							control={control}
							render={({ field }) => ( */}
            <FormInputWithLabelAndHelpButton
              name="consumerSecret"
              title="Consumer Secret"
              required
              containerStyles={{
                // maxWidth: "100%",
                marginTop: "16px",
              }}
              value={formData.consumerSecret}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errorMessages.consumerSecret}
              error={errorMessages.consumerSecret.length > 0}
              helperButtonOnClick={handleConsumerDialogOpen}
              helperButtonText={"Consumer Secret?"}
              placeholder="Enter Consumer Secret"
              // {...field}
            />
            {/* )}
						/>{" "} */}
            {/* <Button
							sx={{
								textTransform: "capitalize",
								mt: 6,
								ml: 2,
								fontSize: "14px",
								fontWeight: 500,
								color: "#4F44E0",
								"&:hover": {
									backgroundColor: "transparent",
								},
							}}
							onClick={() => handleConsumerDialogOpen()}
						>
							Find Consumer Secret
						</Button>{" "} */}
            {/* <div style={{ flex: 1 }} /> */}
          </Box>
        </Box>

        <Box
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
            ml: "-560px",
          }}
        >
          <PrimaryButton
            // onClick={() => handleClickProceed()}
            sx={{ width: "200px" }}
            disabled={isLoading}
            onClick={handleClickAddToStoreButton}
          >
            {isLoading && (
              <CircularProgress thickness={6} size={28} sx={{ mr: 2 }} />
            )}
            Add Store
          </PrimaryButton>
        </Box>
      </Box>

      <ConsumerHelpBaseDialog
        open={openDialog}
        handleClose={handleConsumerDialogClose}
      />
      <ChannelSyncValidationConfirmationDialog
        handleConfirmButton={handleSyncWooCommerceStore}
        open={
          // true
          openConfirmDialog
        }
        handleClose={handleCloseDialog}
        shopName={shop}
        product={dialogData.products_count}
        totalInventory={dialogData.total_inventory}
        totalLocations={dialogData.locations_count}
        channel={channel}
        hasCompared={true}
        data={dialogData}
      />
    </>
  );
}

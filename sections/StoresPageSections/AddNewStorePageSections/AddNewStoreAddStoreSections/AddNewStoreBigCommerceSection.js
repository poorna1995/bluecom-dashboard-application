import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { BIG_COMMERCE, TASKS } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import ConsumerHelpBaseDialog from "./ConsumerHelpBaseDialog";
import BigCommerceIcon from "components/Common/Icons/StoresIcon/BigCommerceIcon";
import { useDispatch } from "react-redux";
import { updateStore } from "redux/onboarding/onboardingSlice";
import BigCommerceHelpDialog1 from "./BigCommerceStoreComponents/BigCommerceHelpDialog1";
import BigCommerceHelpDialog2 from "./BigCommerceStoreComponents/BigCommerceHelpDialog2";
import BigCommerceHelpDialog3 from "./BigCommerceStoreComponents/BigCommerceHelpDialog3";
import ChannelSyncValidationConfirmationDialog from "../AddNewStorePageSyncSection/components/ChannelSyncValidationConfirmationDialog";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import ChannelToBluecom from "./components/ChannelToBluecom";
import { setStoreDict } from "redux/stores/storeSlice";
import FormInputWithLabelAndHelpButton from "./components/FormInputWithLabelAndHelpButton";
import ShopLinkInput from "./components/ShopLinkInput";

const mapState = ({ user, storesData }) => ({
  currentUser: user.currentUser,
  storeDict: storesData.storeDict,
});

let BIG_COMMERCE_DATA = {
  storeName: "bluecom",
  storeHash: "abvahy2bu0",
  clientId: "n03574uhgsm3d3rxnljf2wyepht1omn",
  clientSecret:
    "1d5366a890b774fc9b56873c6edaee41162e72c42a1b3a5a5efd1ac9d1bef40a",
  accessToken: "e97fbsvkcu585n7ucde6jj3znclipo4",
};
export default function AddNewStoreBigCommerceSection() {
  const dispatch = useDispatch();
  const { currentUser, storeDict } = useSelector(mapState);
  const router = useRouter();
  const { shop, storeId, channel, step, id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openStoreNameDialog, setOpenStoreNameDialog] = useState(false);
  const [openStoreHashDialog, setOpenStoreHashDialog] = useState(false);
  const [openIdSecretAccessDialog, setOpenIdSecretAccessDialog] =
    useState(false);
  const [openSyncConfirmationDialog, setOpenSyncConfirmationDialog] =
    useState(false);
  const [syncDialogData, setSyncDialogData] = useState({});
  let BLUECOM_EMAIL = "mohit.mehta@hivepath.io";
  const { control, handleSubmit } = useForm({
    defaultValues:
      BLUECOM_EMAIL === currentUser.merchant_email
        ? BIG_COMMERCE_DATA
        : {
            storeName: "",
            clientId: "",
            clientSecret: "",
            storeHash: "",
            accessToken: "",
          },
  });

  const handleStoreNameDialogOpen = () => {
    setOpenStoreNameDialog(true);
  };
  const handleStoreNameDialogClose = () => {
    setOpenStoreNameDialog(false);
  };

  const handleStoreHashDialogOpen = () => {
    setOpenStoreHashDialog(true);
  };
  const handleStoreHashDialogClose = () => {
    setOpenStoreHashDialog(false);
  };
  const handleIdSecretAccessDialogOpen = () => {
    setOpenIdSecretAccessDialog(true);
  };
  const handleIdSecretAccessDialogClose = () => {
    setOpenIdSecretAccessDialog(false);
  };

  const getStoreCash = (storeHash) => {
    if (!storeHash) return;
  };
  const handleClickAddToStoreButton = (data) => {
    setIsLoading(true);
    const URL = TASKS.VALIDATE_CREDENTIALS;
    const reqData = {
      user_id: currentUser.merchant_id,
      shop: data.storeName,
      client_id: data.clientId,
      //  "k1lxcz9ir6ysmwc544k8r6lfg3i4b7r",
      client_secret: data.clientSecret,
      // "54413aa512762e4963ceb5b3130b302de08093550149871a67cf468ddbeffcd6",
      shop_hash: data.storeHash,
      // "58jfruz8se",
      // shop:

      // "test-bluecom-store",
      access_token: data.accessToken,
      channel_name: "bigcommerce",
      //  "ryulgpelhqoodyb99p5rys39ym7nw6j",
    };
    if (
      !data.storeHash ||
      !data.clientId ||
      !data.clientSecret ||
      !data.accessToken ||
      !data.storeName
    ) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      setIsLoading(false);
      return;
    }

    appFetch(URL, reqData)
      .then((json) => {
        setIsLoading(false);
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log({ json });
          // console.log("success");
          // setOpenSyncConfirmationDialog(true);
          // setSyncDialogData(json.result);
          // dispatch(setStoreDict(json.store_dict));
          dispatch(
            updateStore({
              step: "add-new-store",
              nextStep: "store-analysis",
            })
          );
          // router.push(
          // 	`/app/stores/add-store?step=add-new-store&id=1&channel=bigcommerce&storeId=${json.store_id}&shop=${data.storeName}`,
          // );

          router.push(
            `/app/stores/add-store?step=store-analysis&id=2&channel=bigcommerce&shop=${data.storeName}&taskId=${json.task_id}`
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  const handleSyncStores = () => {
    const url = BIG_COMMERCE.SYNC_STORE;
    const reqData = {
      user_id: currentUser.merchant_id,
      store_id: storeId,
      store_dict: storeDict,
    };
    appFetch(url, reqData)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          // setSyncDialogData(json.data);

          dispatch(
            updateStore({
              nextStep: "sync",
              step: "add-new-store",
            })
          );
          dispatch(updateStore({ step: "sync" }));
          enqueueSnackbar("Store added successfully");
          dispatch(setStoreDict({}));
          router.push(
            `/app/stores/add-store?step=sync&id=2&channel=bigcommerce&storeId=${storeId}&shop=${shop}&taskId=${json.task_id}`
          );
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          enqueueSnackbar(json.message, { variant: "error" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          Connect to BigCommerce
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
            <BigCommerceIcon /> <span>BigCommerce</span>
          </Typography>
        </Box>

        <Box>
          <Box sx={{ flex: 1, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "600px",
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#222",
                }}
              >
                Store Name *
              </InputLabel>
              <Button
                sx={{
                  textTransform: "capitalize",
                  // mt: 6,
                  // ml: 2,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#4F44E0",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleStoreNameDialogOpen()}
              >
                Find Store Name
              </Button>
            </Box>
            <Controller
              name="storeName"
              control={control}
              render={({ field }) => (
                <ShopLinkInput
                  inputPrefix={"https://"}
                  inputSuffix={".mybigcommerce.com"}
                  title="Store Name"
                  shopName={field.value}
                  onChange={field.onChange}
                  required
                  containerStyles={{
                    px: 0,
                    // maxWidth: "100%",
                    // marginTop: "16px",
                    // width: "100%",
                  }}
                  replaceValue={".mybigcommerce.com"}
                  placeholder="Enter Store Name"
                  maxWidth={"600px"}
                  {...field}
                  // helperText="Enter product title"
                  // maxLength={100}
                  // error={title.length === 0}
                />
              )}
            />
            {/* <div style={{ flex: 1 }} /> */}
          </Box>
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "600px",
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#222",
                }}
              >
                Store Hash *
              </InputLabel>
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#4F44E0",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleStoreHashDialogOpen()}
              >
                Find Store Hash
              </Button>
            </Box>
            <Controller
              name="storeHash"
              control={control}
              render={({ field }) => (
                <ShopLinkInput
                  inputPrefix={"https://store-"}
                  inputSuffix={".mybigcommerce.com"}
                  title="Store Hash"
                  required
                  containerStyles={{
                    px: 0,
                    // maxWidth: "100%",
                    // 	marginTop: "16px",
                  }}
                  replaceValue={".mybigcommerce.com"}
                  shopName={field.value}
                  onChange={field.onChange}
                  placeholder="Enter Store Hash"
                  maxWidth={"600px"}
                  {...field}
                  // helperText="Enter product title"
                  // maxLength={100}
                  // error={title.length === 0}
                />
              )}
            />
            {/* 
						<div style={{ flex: 1 }} /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Controller
              name="clientId"
              control={control}
              render={({ field }) => (
                <FormInputWithLabelAndHelpButton
                  title="Client Id"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  helperButtonText={"Find Client Id"}
                  helperButtonOnClick={() => handleIdSecretAccessDialogOpen()}
                  placeholder="Enter Client Id"
                  {...field}
                />
              )}
            />
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
							onClick={() => handleIdSecretAccessDialogOpen()}
						>
							Find Client Id
						</Button>{" "}
						<div style={{ flex: 1 }} /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Controller
              name="clientSecret"
              control={control}
              render={({ field }) => (
                <FormInputWithLabelAndHelpButton
                  title="Client Secret"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  helperButtonText={"Find Client Secret"}
                  helperButtonOnClick={() => handleIdSecretAccessDialogOpen()}
                  placeholder="Enter Client Secret"
                  {...field}
                />
              )}
            />{" "}
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
							onClick={() => handleIdSecretAccessDialogOpen()}
						>
							Find Client Secret
						</Button>{" "}
						<div style={{ flex: 1 }} /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Controller
              name="accessToken"
              control={control}
              render={({ field }) => (
                <FormInputWithLabelAndHelpButton
                  title="Access Token"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  helperButtonText={"Find Access Token"}
                  helperButtonOnClick={() => handleIdSecretAccessDialogOpen()}
                  placeholder="Enter Access Token"
                  {...field}
                />
              )}
            />{" "}
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
							onClick={() => handleIdSecretAccessDialogOpen()}
						>
							Find Access Token
						</Button>{" "}
						<div style={{ flex: 1 }} /> */}
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
            onClick={handleSubmit(handleClickAddToStoreButton)}
          >
            {isLoading && (
              <CircularProgress thickness={6} size={28} sx={{ mr: 2 }} />
            )}
            Add Store
          </PrimaryButton>
        </Box>
      </Box>

      <BigCommerceHelpDialog1
        open={openStoreNameDialog}
        handleClose={handleStoreNameDialogClose}
      />
      <BigCommerceHelpDialog2
        open={openStoreHashDialog}
        handleClose={handleStoreHashDialogClose}
      />
      <BigCommerceHelpDialog3
        open={openIdSecretAccessDialog}
        handleClose={handleIdSecretAccessDialogClose}
      />
      <ChannelSyncValidationConfirmationDialog
        open={openSyncConfirmationDialog}
        // handleClose={() => setOpenSyncConfirmationDialog(false)}
        handleConfirmButton={handleSyncStores}
        shopName={shop}
        product={syncDialogData.products_count}
        channel={channel}
        data={syncDialogData}
        totalInventory={syncDialogData.total_inventory}
        totalLocations={syncDialogData.locations_count}
      />
    </>
  );
}

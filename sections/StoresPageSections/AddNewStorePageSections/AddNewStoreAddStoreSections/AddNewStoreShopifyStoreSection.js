import {
  Alert,
  Box,
  Button,
  FilledInput,
  TextField,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import InfoIcon from "components/Common/Icons/StoreIcons/InfoIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { update } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateStore } from "redux/onboarding/onboardingSlice";
import { useCookies } from "react-cookie";
import AppImage from "components/Common/AppImage";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import bluecomLogo from "public/assets/icons/bluecom-square.png";
import arrowConnector from "public/assets/stores/assets/arrow-connector.png";
import FieldsLinkButton from "sections/StoresPageSections/components/FieldsLinkButton";
import AnimatedLoaderSync from "components/Common/Animations/AnimatedLoaderSync/AnimatedLoaderSync";
import LinkButton from "components/Common/Buttons/LinkButton";
import ShopifyHelperDialog from "./ShopifyHelperDialog";
import { SHOPIFY } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import appFetch from "utils/appFetch";
import ChannelSyncValidationConfirmationDialog from "../AddNewStorePageSyncSection/components/ChannelSyncValidationConfirmationDialog";
import { setStoreDict } from "redux/stores/storeSlice";

const mapState = ({ storesData, user }) => ({
  storeData: storesData.storeData,
  storeDict: storesData.storeDict,
  currentUser: user.currentUser,
});

export default function AddNewStoreShopifyStoreSection() {
  const router = useRouter();
  const { channel, storeId, shop, drawerOpen, connectionError } = router.query;
  const dispatch = useDispatch();
  const { storeData, currentUser, storeDict } = useSelector(mapState);
  const [cookies, setCookies] = useCookies(["referredBy"]);
  const [openHelperDialog, setOpenHelperDialog] = React.useState(false);

  const [openValidateDialog, setOpenValidateDialog] = React.useState(
    drawerOpen === "true" ? true : false
  );

  console.log({ storeData });
  React.useEffect(() => {
    setOpenValidateDialog(drawerOpen === "true" ? true : false);
  }, [drawerOpen]);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleCloseHelperDialog = () => {
    setOpenHelperDialog(false);
  };
  const handleOpenHelperDialog = () => {
    setOpenHelperDialog(true);
  };
  const handleClickInstallApp = () => {
    window.location.href = `https://accounts.shopify.com/`;
    // window.open("https://accounts.shopify.com/store-login", "_blank");
    // dispatch(updateStore({ nextStep: "sync", step: "add-new-store" }));
    setCookies("referredBy", "store-onboarding", {
      path: "/",
      domain: process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
    });

    // router.push("/app/stores/add-store?step=sync&id=2&channel=shopify");
  };

  const clientID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
  const baseURL = process.env.NEXT_PUBLIC_SHOPIFY_APP_URL;
  const redirectURI = `${baseURL}auth/shopify-auth-callback`;
  const scopes = [
    "read_products",
    "read_locations",
    "read_inventory",
    "write_inventory",
    "write_products",
    "write_locations",
  ];

  const [shopName, setShopName] = React.useState(shop || "");
  const handleClickAuthenticate = () => {
    setCookies("referredBy", "store-onboarding", {
      path: "/",
      domain: process.env.NODE_ENV === "production" ? ".bluecom.ai" : undefined,
    });

    if (shopName === "") {
      setError(true);
      setErrorMessage("Store URL is required");
      return;
    }
    let URL = `https://${shopName}.myshopify.com/admin/oauth/authorize?client_id=${clientID}&&redirect_uri=${redirectURI}&&scope=${scopes}`;
    window.location = URL;
  };

  const handleSyncStore = () => {
    const url = SHOPIFY.SYNC_STORE;
    const data = {
      user_id: currentUser && currentUser.merchant_id,
      store_id: storeId,
      store_dict: storeDict,
      // pull_existed_sku: false,
      // pull_new_sku: true,
    };
    appFetch(url, data)
      .then((res) => {
        if (res.status === API_RESPONSE_STATUS.SUCCESS) {
          router.push(
            `/app/stores/add-store?step=sync&id=2&channel=shopify&storeId=${storeId}&shop=${shop}&taskId=${res.task_id}`
          );
          dispatch(
            updateStore({
              // nextStep: "sync",
              step: "sync",
            })
          );
          dispatch(setStoreDict({}));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ pt: 4 }}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 2,
          mb: 4,
          "& .icon-container": {
            borderRadius: "8px",
            border: "1px solid #E5E5E5",
            p: 1,
            width: "66px",
            height: "66px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .relative": {
            position: "relative",
          },
          "& .image-connector": {
            position: "absolute",
            right: "40%",
            top: "-4px",
          },
        }}
      >
        <div className="icon-container">
          <ShopifyIcon />
        </div>
        <div className="divider relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="162"
            height="2"
            viewBox="0 0 162 2"
            fill="none"
          >
            <path
              d="M0.5 1H161.5"
              stroke="#4F44E0"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
          </svg>
          {/* <AppImage
						src={arrowConnector}
						width={40}
						height={40}
						className="image-connector"
					/> 
          <AnimatedLoaderSync className="image-connector" />
        </div>

        <div className="icon-container">
          <AppImage src={bluecomLogo} width={40} height={40} />
        </div>
      </Box> */}
      <SectionTitleText
        sx={{
          fontSize: "32px",
          fontWeight: "700px",
          color: "#484A9E",
          pb: "8px",
        }}
      >
        Store Credentials
      </SectionTitleText>
      <DescriptionText
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#000",
          mb: 2,
          mt: 1,
        }}
      >
        Install our app from shopify app store on your store
      </DescriptionText>
      {/* <Box sx={{ mt: 3, mb: 4, display: "flex", alignItems: "center" }}>
				<Typography
					sx={{
						fontSize: "18px",
						fontWeight: 600,
						// lineHeight: "22px",
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
							width: "20px",
							mr: 2,
						},
						fontSize: "16px",
						fontWeight: 500,
						lineHeight: " 19px",
						color: "#1D2939",
						border: (theme) =>
							`1px solid ${theme.palette.grey[200]}`,
						borderRadius: "5px",
						ml: 2,
					}}
				>
					<ShopifyIcon /> <span>Shopify</span>
				</Typography>
			</Box> */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "600px",
          mt: 4,

          mb: 2,
          "& label": {
            color: (theme) => theme.palette.text.primary,
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "24px",
          },
        }}
      >
        <label>Enter your shopify store name*</label>
        <LinkButton onClick={handleOpenHelperDialog}>Store Name?</LinkButton>
      </Box> */}

      {/* <Box
        sx={{
          borderRadius: "10px",
          background: "rgba(68, 102, 224, 0.05)",
          p: 2,
          // pb: 1,
          maxWidth: "600px",
          "& .helper__text": {
            color: error ? "#A4262C" : "#000",
            fontSize: "12px",
            fontWeight: 500,
            ml: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            // border: "1px solid rgba(0,0,0,0.1)",
            width: "auto",
            flex: 1,
            px: 2,
            maxWidth: "480px",
            borderRadius: "8px",
            "& .shopify-store-url": {
              border: "none",
              // borderBottom: error
              // 	? "1px solid #A4262C"
              // 	: "1px solid rgba(0,0,0,0.1)",
              background: "transparent",
              // p: "12px",
              // borderRadius: "8px",
              flex: 1,
              //   "&:focus-within": {
              //     outline: "none",
              //     border: "none",
              //   },
              // "&:focus-within": {
              // 	border: "none",

              // 	borderBottom: (theme) =>
              // 		`1px solid ${theme.palette.primary.main}`,
              // },
              // "&:hover": {
              // 	borderBottom: "1px solid #000",
              // },
              mx: 2,

              // height: "36px",

              color: "#000",
              fontSize: " 16px",
              fontWeight: 500,
              lineHeight: " 24px",
            },
            "& span": {
              color: "#000",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              mt: 1,
            },
            "& .input-helper-text": {
              color: (theme) => theme.palette.text.primary,
              opacity: 0.8,
            },
          }}
        >
          <span className="input-helper-text">https://</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <FilledInput
              className={"shopify-store-url"}
              value={shopName
                .replace(".myshopify.com", "")
                .replace("https://", "")}
              onChange={(e) =>
                setShopName(
                  e.target.value
                    .replace(".myshopify.com", "")
                    .replace("https://", "")
                )
              }
              onBlur={(e) => {
                if (shopName === "") {
                  setError(true);
                } else {
                  setError(false);
                }
              }}
              inputProps={{
                sx: {
                  pt: 1,
                  fontSize: "16px",
                  fontWeight: 600,
                },
              }}
              error={error || connectionError}
              // sx={{ pt: 1 }}
              placeholder="your-store-name"
            />
            {(error || connectionError) && (
              <span className="helper__text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ marginRight: "8px" }}
                >
                  <path
                    d="M6 8.5C6.14167 8.5 6.2605 8.452 6.3565 8.356C6.4525 8.26 6.50033 8.14133 6.5 8C6.5 7.85833 6.452 7.7395 6.356 7.6435C6.26 7.5475 6.14133 7.49967 6 7.5C5.85833 7.5 5.7395 7.548 5.6435 7.644C5.5475 7.74 5.49967 7.85867 5.5 8C5.5 8.14167 5.548 8.2605 5.644 8.3565C5.74 8.4525 5.85867 8.50033 6 8.5ZM5.5 6.5H6.5V3.5H5.5V6.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3433 2.9125 9.98717 2.4625 9.5375C2.0125 9.0875 1.65633 8.55833 1.394 7.95C1.13167 7.34167 1.00033 6.69167 1 6C1 5.30833 1.13133 4.65833 1.394 4.05C1.65667 3.44167 2.01283 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65633 4.05 1.394C4.65833 1.13167 5.30833 1.00033 6 1C6.69167 1 7.34167 1.13133 7.95 1.394C8.55833 1.65667 9.0875 2.01283 9.5375 2.4625C9.9875 2.9125 10.3438 3.44167 10.6065 4.05C10.8692 4.65833 11.0003 5.30833 11 6C11 6.69167 10.8687 7.34167 10.606 7.95C10.3433 8.55833 9.98717 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3438 7.95 10.6065C7.34167 10.8692 6.69167 11.0003 6 11Z"
                    fill="#A4262C"
                  />
                </svg>
                {connectionError || errorMessage || "This field is required!"}
              </span>
            )}
          </div>
          <span className="input-helper-text">.myshopify.com</span>
        </Box>
        {/* <TextField
					value={shopName}
					onChange={(e) => setShopName(e.target.value)}
				/> 
      </Box>*/}
      <Box
        sx={{
          display: "flex",
          mt: 4,
          justifyContent: "center",
          maxWidth: "360px",
        }}
      >
        <PrimaryButton
          // onClick={() => handleClickProceed()}
          // sx={{ width: "200px", height: "48px" }}
          // disabled={disableButton}
          onClick={handleClickInstallApp}

          // onClick={() => handleClickAuthenticate()}
        >
          {/* Connect to Shopify */}
          Install App On Shopify
        </PrimaryButton>

        {/* <FieldsLinkButton /> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          // mt: 4,
          justifyContent: "center",
          maxWidth: "360px",

          "& .helper__text": {
            color: error ? "#A4262C" : "#000",
            fontSize: "12px",
            fontWeight: 500,
            ml: 2,
            mt: 4,
          },
        }}
      >
        {" "}
        {(error || connectionError) && (
          <span className="helper__text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ marginRight: "8px" }}
            >
              <path
                d="M6 8.5C6.14167 8.5 6.2605 8.452 6.3565 8.356C6.4525 8.26 6.50033 8.14133 6.5 8C6.5 7.85833 6.452 7.7395 6.356 7.6435C6.26 7.5475 6.14133 7.49967 6 7.5C5.85833 7.5 5.7395 7.548 5.6435 7.644C5.5475 7.74 5.49967 7.85867 5.5 8C5.5 8.14167 5.548 8.2605 5.644 8.3565C5.74 8.4525 5.85867 8.50033 6 8.5ZM5.5 6.5H6.5V3.5H5.5V6.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3433 2.9125 9.98717 2.4625 9.5375C2.0125 9.0875 1.65633 8.55833 1.394 7.95C1.13167 7.34167 1.00033 6.69167 1 6C1 5.30833 1.13133 4.65833 1.394 4.05C1.65667 3.44167 2.01283 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65633 4.05 1.394C4.65833 1.13167 5.30833 1.00033 6 1C6.69167 1 7.34167 1.13133 7.95 1.394C8.55833 1.65667 9.0875 2.01283 9.5375 2.4625C9.9875 2.9125 10.3438 3.44167 10.6065 4.05C10.8692 4.65833 11.0003 5.30833 11 6C11 6.69167 10.8687 7.34167 10.606 7.95C10.3433 8.55833 9.98717 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3438 7.95 10.6065C7.34167 10.8692 6.69167 11.0003 6 11Z"
                fill="#A4262C"
              />
            </svg>
            {connectionError || errorMessage || "This field is required!"}
          </span>
        )}
      </Box>
      <ShopifyHelperDialog
        open={openHelperDialog}
        handleClose={handleCloseHelperDialog}
      />
      <ChannelSyncValidationConfirmationDialog
        open={openValidateDialog}
        channel={channel}
        data={storeData}
        shopName={shop}
        handleConfirmButton={handleSyncStore}
        product={storeData.products_count}
        totalInventory={storeData.total_inventory}
        totalLocations={storeData.locations_count}
        label={
          "Do you want to pull? New SKU Id which aren't there in the Primary store. "
        }
      />
    </Box>
  );
}

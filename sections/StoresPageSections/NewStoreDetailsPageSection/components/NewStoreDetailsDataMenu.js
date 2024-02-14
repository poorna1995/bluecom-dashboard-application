import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import { CHANNEL } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { formatDistance } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import appFetch from "utils/appFetch";
import { getDateWithTimezone } from "utils/dateUtils/getFormattedDate";
import NewStoreTakeActionDialog from "./NewStoreTakeActionDialog";
import DisableIntegrationSyncDialog from "./DisableIntegrationSyncDialog";
import AnimatedLoaderSync from "components/Common/Animations/AnimatedLoaderSync/AnimatedLoaderSync";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import StatusAsChip from "components/Common/Chip/StatusAsChip";

const styles = {
  px: "36px",
  // borderTop: "1px solid rgba(0,0,0,0.1)",
  "& .title": {
    color: "#000",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
    // mb: 0,
  },
  "& .row": {
    display: "flex",
    justifyContent: "space-between",
    // my: 0,
    alignItems: "center",
    // mt: "-8px",
    px: 3,
    py: 0,
    gap: "280px",
    // maxWidth: "65%",
  },
  "& h4": {
    color: "#000",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
    my: 0,
  },
  "& .button-link": {
    color: "#4F44E0",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
  },
  "& .container": {
    borderRadius: "10px",
    // border: "1px solid rgba(0,0,0,0.1)",
    mb: 2,
    // pb: 3,
    // p: 2,
    "& .row": {
      // my: 0,
      alignItems: "center",
      gap: "106.5px",
      // py: 0,
      "& p": {
        // my: 0,
        color: "#000",
        fontSize: "18px",
        fontWeight: 500,
        lineHeight: "20px",
      },
      "& .title": {
        color: "#000",
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: "20px",
      },
    },
  },
  "& .time-distance": {
    color: "#555",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "20px",
    mr: 2,
  },
  "& .date": {
    color: "#636363",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    ml: 2,
  },
  "& .time-row": {
    pt: 1,
  },
  "& .hours": {
    fontWeight: 600,
  },
  "& .image-connector": {
    // mt: "8px",
  },
  "& .image-connector-rotate": {
    // mt: "8px",
    ml: "120px",
    rotate: "180deg",
  },
};

export default function NewStoreDetailsDataMenu({
  title,
  isLoading,
  data = {},
  type = "inventory",
  channelName = "shopify",
  userId,
  autoSyncKey,
  handleFetchStoreDetails,
}) {
  console.log({ data }, "NewStoreDetailsDataMenu");
  const router = useRouter();
  const { storeId } = router.query;
  const [checked, setChecked] = React.useState(data[autoSyncKey]);
  const [openTakeActionDialog, setOpenTakeActionDialog] = React.useState(false);
  const [openDisableDialog, setOpenDisableDialog] = React.useState(false);
  React.useEffect(() => {
    setChecked(data[autoSyncKey]);
  }, [data, openDisableDialog]);

  const handleOpenDisableDialog = () => {
    setOpenDisableDialog(true);
    // setChecked(checked);
  };

  const handleCloseDisableDialog = () => {
    setOpenDisableDialog(false);
  };
  const handleChangeAutoSync = (e) => {
    const isEnabled = e.target.checked;
    // data.is_auto_sync_enabled = isEnabled;
    setChecked(isEnabled);
    if (isEnabled === true) {
      // setChecked(isEnabled);
      handleUpdateSyncStatus(isEnabled);
    } else {
      handleOpenDisableDialog();
      // setChecked(isEnabled);
    }
    // console.log({
    // 	isEnabled,
    // 	is_auto_sync_enabled: data.is_auto_sync_enabled,
    // 	data,
    // });

    // handleUpdateSyncStatus(isEnabled);
  };
  React.useEffect(() => {
    setChecked(data[autoSyncKey]);
  }, [data[autoSyncKey]]);
  const handleUpdateSyncStatus = (checked) => {
    const url = CHANNEL.UPDATE_STORE;
    const data = {
      user_id: userId,
      [autoSyncKey]: checked,
      store_id: storeId,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log(json);
          handleFetchStoreDetails();
        }
      })
      .catch((error) => console.error(error));
  };

  const handleOpenTakeActionDialog = () => {
    setOpenTakeActionDialog(true);
  };
  const handleCloseTakeActionDialog = () => {
    setOpenTakeActionDialog(false);
  };
  return (
    <Box sx={styles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>
              {type === "inventory" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 20V8.7C2.71667 8.51667 2.479 8.28334 2.287 8C2.095 7.71667 1.99934 7.38334 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.98 2.195 3.45067 1.99934 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V7C22 7.38334 21.904 7.71667 21.712 8C21.52 8.28334 21.2827 8.51667 21 8.7V20C21 20.55 20.804 21.021 20.412 21.413C20.02 21.805 19.5493 22.0007 19 22H5C4.45 22 3.979 21.804 3.587 21.412C3.195 21.02 2.99934 20.5493 3 20ZM5 9V20H19V9H5ZM20 7V4H4V7H20ZM9 14H15V12H9V14Z"
                    fill="#4F44E0"
                  />
                </svg>
              )}
              {type === "products" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.1002 2.10156L3.20115 3.51656L1.78715 13.4166L10.9792 22.6086C11.1667 22.796 11.421 22.9013 11.6862 22.9013C11.9513 22.9013 12.2056 22.796 12.3932 22.6086L22.2932 12.7086C22.4806 12.521 22.5859 12.2667 22.5859 12.0016C22.5859 11.7364 22.4806 11.4821 22.2932 11.2946L13.1002 2.10156ZM12.3932 4.22356L20.1722 12.0016L11.6862 20.4866L3.90815 12.7086L4.96815 5.28356L12.3932 4.22356ZM10.2732 10.5876C10.6483 10.2123 10.859 9.70334 10.8589 9.17271C10.8589 8.90997 10.8071 8.6498 10.7065 8.40708C10.6059 8.16435 10.4585 7.94382 10.2727 7.75806C10.0868 7.57231 9.86624 7.42497 9.62348 7.32447C9.38072 7.22396 9.12054 7.17226 8.8578 7.1723C8.32716 7.1724 7.8183 7.38328 7.44315 7.75856C7.068 8.13384 6.8573 8.64278 6.85739 9.17342C6.85748 9.70405 7.06837 10.2129 7.44365 10.5881C7.81893 10.9632 8.32787 11.1739 8.8585 11.1738C9.38914 11.1737 9.898 10.9628 10.2732 10.5876Z"
                    fill="#4F44E0"
                  />
                </svg>
              )}
              {type === "location" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 13.242V20H22V22H2V20H3V13.242C2.38437 12.8311 1.87971 12.2745 1.53082 11.6218C1.18193 10.969 0.999592 10.2402 1 9.5C1 8.673 1.224 7.876 1.633 7.197L4.345 2.5C4.43277 2.34798 4.559 2.22175 4.71101 2.13398C4.86303 2.04621 5.03547 2 5.211 2H18.79C18.9655 2 19.138 2.04621 19.29 2.13398C19.442 2.22175 19.5682 2.34798 19.656 2.5L22.358 7.182C22.9546 8.17287 23.1463 9.35553 22.8934 10.4841C22.6405 11.6127 21.9624 12.6005 21 13.242ZM19 13.972C18.3124 14.0491 17.6163 13.9665 16.9659 13.7307C16.3155 13.4948 15.7283 13.1119 15.25 12.612C14.8302 13.0511 14.3258 13.4005 13.7672 13.6393C13.2086 13.878 12.6075 14.001 12 14.001C11.3927 14.0013 10.7916 13.8786 10.233 13.6402C9.67445 13.4018 9.16996 13.0527 8.75 12.614C8.27163 13.1138 7.68437 13.4964 7.03395 13.7321C6.38353 13.9678 5.68749 14.0503 5 13.973V20H19V13.973V13.972ZM5.789 4L3.356 8.213C3.11958 8.79714 3.11248 9.44903 3.33613 10.0382C3.55978 10.6273 3.99768 11.1103 4.56218 11.3904C5.12668 11.6705 5.77614 11.7271 6.38058 11.5488C6.98502 11.3706 7.49984 10.9706 7.822 10.429C8.157 9.592 9.342 9.592 9.678 10.429C9.8633 10.8934 10.1836 11.2916 10.5975 11.5721C11.0115 11.8526 11.5 12.0025 12 12.0025C12.5 12.0025 12.9885 11.8526 13.4025 11.5721C13.8164 11.2916 14.1367 10.8934 14.322 10.429C14.657 9.592 15.842 9.592 16.178 10.429C16.3078 10.7484 16.5022 11.0376 16.7491 11.2783C16.996 11.519 17.2901 11.706 17.6127 11.8275C17.9354 11.9491 18.2797 12.0026 18.6241 11.9847C18.9684 11.9668 19.3053 11.8778 19.6136 11.7234C19.9219 11.569 20.1949 11.3525 20.4155 11.0875C20.6361 10.8225 20.7995 10.5148 20.8955 10.1836C20.9914 9.85238 21.0178 9.50493 20.973 9.16305C20.9281 8.82118 20.8131 8.49227 20.635 8.197L18.21 4H5.79H5.789Z"
                    fill="#4F44E0"
                  />
                </svg>
              )}
            </span>
            <h2 className="title">{title || "Inventory"}</h2>
          </Box>
          <Box
            sx={{
              mt: "-16px",
            }}
          >
            {type === "inventory" && (
              <>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#555",
                  }}
                >
                  {/* Disable and enable your store {title || "Inventory"} */}
                </p>
              </>
            )}
            {type !== "inventory" && (
              <>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#555",
                  }}
                >
                  {/* Disable and enable your store {title}.
                  <br /> Disable and enable your store {title}
                  .
                  <br /> {title} will be automatically override from your store. */}
                </p>
              </>
            )}
          </Box>
          {/* <Box
            sx={{
              width: "120px",
            }}
          >
            <RenderStatusAsChip
              status={data.status}
              fontSize={14}
              fontWeight={700}
            />
          </Box> */}
        </Box>
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "10px",
            mb: 2,
            mt: "24px",
          }}
        >
          <Box
            className="row"
            sx={{
              // maxWidth: "65%",
              pt: "16px !important",
              // pb: "16px !important",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box>
              <h4>Automatic Manual {title || "Inventory"} Override</h4>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#555",
                }}
              >
                {title} will be automatically override from your store to
                bluecom
              </p>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  sx={{ m: 2 }}
                  // defaultChecked
                  checked={checked}
                  onChange={handleChangeAutoSync}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={
                <span
                  style={{
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    display: " flex",
                    alignItems: "center",
                  }}
                >
                  {checked ? (
                    <>
                      Enable
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ marginLeft: "4px" }}
                      >
                        <path
                          d="M8.6 11.8L6.425 9.625C6.24167 9.44167 6.01667 9.35 5.75 9.35C5.48333 9.35 5.25 9.45 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.08333 14.0833 8.31667 14.175 8.6 14.175C8.88333 14.175 9.11667 14.0833 9.3 13.9L14.975 8.225C15.1583 8.04167 15.25 7.81667 15.25 7.55C15.25 7.28333 15.15 7.05 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
                          fill="#12B76A"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Disable
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        style={{ marginLeft: "4px" }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.28613 10.9989C1.28613 8.42265 2.30954 5.95192 4.13122 4.13024C5.9529 2.30856 8.42362 1.28516 10.9999 1.28516C13.5761 1.28516 16.0468 2.30856 17.8685 4.13024C19.6902 5.95192 20.7136 8.42265 20.7136 10.9989C20.7136 13.5751 19.6902 16.0459 17.8685 17.8675C16.0468 19.6892 13.5761 20.7126 10.9999 20.7126C8.42362 20.7126 5.9529 19.6892 4.13122 17.8675C2.30954 16.0459 1.28613 13.5751 1.28613 10.9989ZM10.9999 2.67849C8.79316 2.67849 6.67683 3.5551 5.11646 5.11548C3.55608 6.67586 2.67947 8.79218 2.67947 10.9989C2.67947 13.2056 3.55608 15.3219 5.11646 16.8823C6.67683 18.4427 8.79316 19.3193 10.9999 19.3193C13.2066 19.3193 15.3229 18.4427 16.8833 16.8823C18.4437 15.3219 19.3203 13.2056 19.3203 10.9989C19.3203 8.79218 18.4437 6.67586 16.8833 5.11548C15.3229 3.5551 13.2066 2.67849 10.9999 2.67849ZM14.4524 7.54782C14.5899 7.68534 14.6671 7.87184 14.6671 8.06629C14.6671 8.26074 14.5899 8.44724 14.4524 8.58476L12.0368 10.9989L14.4524 13.413C14.5901 13.5507 14.6675 13.7375 14.6675 13.9322C14.6675 14.127 14.5901 14.3137 14.4524 14.4514C14.3147 14.5891 14.1279 14.6665 13.9332 14.6665C13.7385 14.6665 13.5517 14.5891 13.414 14.4514L10.9999 12.0358L8.58573 14.4514C8.51755 14.5196 8.43661 14.5737 8.34752 14.6106C8.25844 14.6475 8.16296 14.6665 8.06653 14.6665C7.97011 14.6665 7.87463 14.6475 7.78554 14.6106C7.69646 14.5737 7.61552 14.5196 7.54733 14.4514C7.47915 14.3832 7.42507 14.3023 7.38817 14.2132C7.35127 14.1241 7.33227 14.0286 7.33227 13.9322C7.33227 13.8358 7.35127 13.7403 7.38817 13.6512C7.42507 13.5622 7.47915 13.4812 7.54733 13.413L9.96293 10.9989L7.54733 8.58476C7.40963 8.44706 7.33227 8.26029 7.33227 8.06556C7.33227 7.87082 7.40963 7.68406 7.54733 7.54636C7.68503 7.40866 7.8718 7.3313 8.06653 7.3313C8.26127 7.3313 8.44803 7.40866 8.58573 7.54636L10.9999 9.96196L13.414 7.54636C13.4821 7.47806 13.563 7.42388 13.6521 7.38691C13.7412 7.34994 13.8367 7.33091 13.9332 7.33091C14.0297 7.33091 14.1252 7.34994 14.2143 7.38691C14.3034 7.42388 14.3843 7.47953 14.4524 7.54782Z"
                          fill="#9A1818"
                        />
                      </svg>{" "}
                    </>
                  )}{" "}
                </span>
              }
            />
          </Box>
          {type === "inventory" && (
            <div
              className="container"
              style={
                {
                  // maxWidth: "70%"
                }
              }
            >
              {/* <div className="row ">
                <p className="title">Status</p>
                <p>
                  Change the time frequency?{" "}
                  <span className="button-link">Connect our team</span>
                </p>
              </div>{" "} */}
              <div
                className="row"
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {" "}
                <div>
                  <p className="title">
                    {title || "Inventory"} Data Pulled from Shopify{" "}
                    <span className="hours">
                      every {data.frequency} {data.mode}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#555",
                    }}
                  >
                    {title} will be automatically override from your store to
                    bluecom
                  </p>
                </div>
                <AnimatedLoaderSync className="image-connector" />
                <div className="update-status">
                  <p>
                    {" "}
                    <span className="time-distance">
                      <span
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        Pulled
                      </span>{" "}
                      {/* 10 mins ago */}
                      {data.last_synced &&
                        formatDistance(
                          getDateWithTimezone(data?.last_synced || ""),
                          new Date(),
                          { addSuffix: true }
                        ).replace("about", "")}{" "}
                    </span>
                    {/* {title || "Inventory"} Data Pulled every{" "}
                    <span className="hours">
                      {data.frequency} {data.mode}
                    </span> */}
                  </p>
                  {/* {data.last_synced && (
                    <p className="time-row">
                      {" "}
                      <span className="time-distance">
                        Pulled 10 mins ago
                        {formatDistance(
                          getDateWithTimezone(data.last_synced),
                          new Date(),
                          { addSuffix: true }
                        ).replace("about", "")}{" "}
                      </span>
                      |
                      <RenderDate
                        date={data.last_synced}
                        className="date"
                        dateFormat="MMM dd, yyyy hh:mm a"
                      />
                    </p>
                  )}{" "} */}
                </div>
              </div>
              <div className="row">
                {" "}
                <p className="title">
                  {title || "Inventory"} data Pushed to Shopify <br />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#555",
                      lineHeight: "24px",
                    }}
                  >
                    Inventory will override from bluecom to your store
                    <br /> when manual changes are performed
                    <br />1 .When the inventory is adjusted
                    <br />2 .Partial goods are received (PO)
                  </span>
                </p>
                <AnimatedLoaderSync className="image-connector-rotate" />
                <div className="update-status">
                  <FormControlLabel
                    control={
                      <Switch
                        sx={{ m: 1 }}
                        // defaultChecked
                        checked={checked}
                        // onChange={handleChangeAutoSync}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          color: "#000",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "20px",
                          display: " flex",
                          alignItems: "center",
                        }}
                      >
                        {checked ? (
                          <>
                            Enable
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              style={{
                                marginLeft: "4px",
                              }}
                            >
                              <path
                                d="M8.6 11.8L6.425 9.625C6.24167 9.44167 6.01667 9.35 5.75 9.35C5.48333 9.35 5.25 9.45 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.08333 14.0833 8.31667 14.175 8.6 14.175C8.88333 14.175 9.11667 14.0833 9.3 13.9L14.975 8.225C15.1583 8.04167 15.25 7.81667 15.25 7.55C15.25 7.28333 15.15 7.05 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
                                fill="#12B76A"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            Disable
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              style={{
                                marginLeft: "4px",
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.28613 10.9989C1.28613 8.42265 2.30954 5.95192 4.13122 4.13024C5.9529 2.30856 8.42362 1.28516 10.9999 1.28516C13.5761 1.28516 16.0468 2.30856 17.8685 4.13024C19.6902 5.95192 20.7136 8.42265 20.7136 10.9989C20.7136 13.5751 19.6902 16.0459 17.8685 17.8675C16.0468 19.6892 13.5761 20.7126 10.9999 20.7126C8.42362 20.7126 5.9529 19.6892 4.13122 17.8675C2.30954 16.0459 1.28613 13.5751 1.28613 10.9989ZM10.9999 2.67849C8.79316 2.67849 6.67683 3.5551 5.11646 5.11548C3.55608 6.67586 2.67947 8.79218 2.67947 10.9989C2.67947 13.2056 3.55608 15.3219 5.11646 16.8823C6.67683 18.4427 8.79316 19.3193 10.9999 19.3193C13.2066 19.3193 15.3229 18.4427 16.8833 16.8823C18.4437 15.3219 19.3203 13.2056 19.3203 10.9989C19.3203 8.79218 18.4437 6.67586 16.8833 5.11548C15.3229 3.5551 13.2066 2.67849 10.9999 2.67849ZM14.4524 7.54782C14.5899 7.68534 14.6671 7.87184 14.6671 8.06629C14.6671 8.26074 14.5899 8.44724 14.4524 8.58476L12.0368 10.9989L14.4524 13.413C14.5901 13.5507 14.6675 13.7375 14.6675 13.9322C14.6675 14.127 14.5901 14.3137 14.4524 14.4514C14.3147 14.5891 14.1279 14.6665 13.9332 14.6665C13.7385 14.6665 13.5517 14.5891 13.414 14.4514L10.9999 12.0358L8.58573 14.4514C8.51755 14.5196 8.43661 14.5737 8.34752 14.6106C8.25844 14.6475 8.16296 14.6665 8.06653 14.6665C7.97011 14.6665 7.87463 14.6475 7.78554 14.6106C7.69646 14.5737 7.61552 14.5196 7.54733 14.4514C7.47915 14.3832 7.42507 14.3023 7.38817 14.2132C7.35127 14.1241 7.33227 14.0286 7.33227 13.9322C7.33227 13.8358 7.35127 13.7403 7.38817 13.6512C7.42507 13.5622 7.47915 13.4812 7.54733 13.413L9.96293 10.9989L7.54733 8.58476C7.40963 8.44706 7.33227 8.26029 7.33227 8.06556C7.33227 7.87082 7.40963 7.68406 7.54733 7.54636C7.68503 7.40866 7.8718 7.3313 8.06653 7.3313C8.26127 7.3313 8.44803 7.40866 8.58573 7.54636L10.9999 9.96196L13.414 7.54636C13.4821 7.47806 13.563 7.42388 13.6521 7.38691C13.7412 7.34994 13.8367 7.33091 13.9332 7.33091C14.0297 7.33091 14.1252 7.34994 14.2143 7.38691C14.3034 7.42388 14.3843 7.47953 14.4524 7.54782Z"
                                fill="#9A1818"
                              />
                            </svg>{" "}
                          </>
                        )}{" "}
                      </span>
                    }
                  />
                  {/* <p>
                    {" "}
                    {title || "Inventory"} Data Pushed every{" "}
                    <span className="hours">
                      {data.frequency} {data.mode}
                    </span>
                  </p>
                  {data.last_synced && (
                    <p className="time-row">
                      {" "}
                      <span className="time-distance">
                        <span
                          style={{
                            fontWeight: 400,
                          }}
                        >
                          Pulled
                        </span>{" "}
                        Pulled 10 mins ago
                        {formatDistance(
                          getDateWithTimezone(data.last_synced),
                          new Date(),
                          { addSuffix: true }
                        ).replace("about", "")}{" "}
                      </span>
                      |
                      <RenderDate
                        // date={new Date()}
                        date={data.last_synced}
                        className="date"
                        dateFormat="MMM dd, yyyy hh:mm a"
                      />
                    </p>
                  )}{" "} */}
                </div>
              </div>
              {/* <div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: "8px",
							marginBottom: "8px",
							marginRight: "16px",
							maxWidth: "65%",
						}}
					>
						<PrimaryButton>
							Pause Push & Pull Operations
						</PrimaryButton>
					</div> */}
            </div>
          )}{" "}
          {type !== "inventory" && (
            <Box
              className="row"
              sx={{
                // maxWidth: "65%",
                pt: "16px !important",
                // pb: "16px !important",
              }}
            >
              <Box>
                <h4>
                  New {title} : Pull {title} from {channelName} ( {channelName}{" "}
                  Store)
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#555",
                  }}
                >
                  {title} will be automatically override from your store to
                  bluecom
                </p>
              </Box>

              <SecondaryButton onClick={() => handleOpenTakeActionDialog()}>
                Take Action
              </SecondaryButton>
              {/* <FormControlLabel
						control={
							<Switch
								sx={{ m: 1 }}
								defaultChecked
								// checked={checked}
								// onChange={handleChangeAutoSync}
								// inputProps={{ "aria-label": "controlled" }}
							/>
						}
						label={
							<span
								style={{
									color: "#000",
									fontSize: "16px",
									fontWeight: 600,
									lineHeight: "20px",
									display: " flex",
									alignItems: "center",
								}}
							>
								{checked ? (
									<>
										Enable
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											style={{ marginLeft: "4px" }}
										>
											<path
												d="M8.6 11.8L6.425 9.625C6.24167 9.44167 6.01667 9.35 5.75 9.35C5.48333 9.35 5.25 9.45 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.08333 14.0833 8.31667 14.175 8.6 14.175C8.88333 14.175 9.11667 14.0833 9.3 13.9L14.975 8.225C15.1583 8.04167 15.25 7.81667 15.25 7.55C15.25 7.28333 15.15 7.05 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
												fill="#12B76A"
											/>
										</svg>
									</>
								) : (
									<>
										Disable
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											viewBox="0 0 22 22"
											fill="none"
											style={{ marginLeft: "4px" }}
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M1.28613 10.9989C1.28613 8.42265 2.30954 5.95192 4.13122 4.13024C5.9529 2.30856 8.42362 1.28516 10.9999 1.28516C13.5761 1.28516 16.0468 2.30856 17.8685 4.13024C19.6902 5.95192 20.7136 8.42265 20.7136 10.9989C20.7136 13.5751 19.6902 16.0459 17.8685 17.8675C16.0468 19.6892 13.5761 20.7126 10.9999 20.7126C8.42362 20.7126 5.9529 19.6892 4.13122 17.8675C2.30954 16.0459 1.28613 13.5751 1.28613 10.9989ZM10.9999 2.67849C8.79316 2.67849 6.67683 3.5551 5.11646 5.11548C3.55608 6.67586 2.67947 8.79218 2.67947 10.9989C2.67947 13.2056 3.55608 15.3219 5.11646 16.8823C6.67683 18.4427 8.79316 19.3193 10.9999 19.3193C13.2066 19.3193 15.3229 18.4427 16.8833 16.8823C18.4437 15.3219 19.3203 13.2056 19.3203 10.9989C19.3203 8.79218 18.4437 6.67586 16.8833 5.11548C15.3229 3.5551 13.2066 2.67849 10.9999 2.67849ZM14.4524 7.54782C14.5899 7.68534 14.6671 7.87184 14.6671 8.06629C14.6671 8.26074 14.5899 8.44724 14.4524 8.58476L12.0368 10.9989L14.4524 13.413C14.5901 13.5507 14.6675 13.7375 14.6675 13.9322C14.6675 14.127 14.5901 14.3137 14.4524 14.4514C14.3147 14.5891 14.1279 14.6665 13.9332 14.6665C13.7385 14.6665 13.5517 14.5891 13.414 14.4514L10.9999 12.0358L8.58573 14.4514C8.51755 14.5196 8.43661 14.5737 8.34752 14.6106C8.25844 14.6475 8.16296 14.6665 8.06653 14.6665C7.97011 14.6665 7.87463 14.6475 7.78554 14.6106C7.69646 14.5737 7.61552 14.5196 7.54733 14.4514C7.47915 14.3832 7.42507 14.3023 7.38817 14.2132C7.35127 14.1241 7.33227 14.0286 7.33227 13.9322C7.33227 13.8358 7.35127 13.7403 7.38817 13.6512C7.42507 13.5622 7.47915 13.4812 7.54733 13.413L9.96293 10.9989L7.54733 8.58476C7.40963 8.44706 7.33227 8.26029 7.33227 8.06556C7.33227 7.87082 7.40963 7.68406 7.54733 7.54636C7.68503 7.40866 7.8718 7.3313 8.06653 7.3313C8.26127 7.3313 8.44803 7.40866 8.58573 7.54636L10.9999 9.96196L13.414 7.54636C13.4821 7.47806 13.563 7.42388 13.6521 7.38691C13.7412 7.34994 13.8367 7.33091 13.9332 7.33091C14.0297 7.33091 14.1252 7.34994 14.2143 7.38691C14.3034 7.42388 14.3843 7.47953 14.4524 7.54782Z"
												fill="#9A1818"
											/>
										</svg>{" "}
									</>
								)}{" "}
							</span>
						}
					/> */}
              <NewStoreTakeActionDialog
                open={openTakeActionDialog}
                handleClose={handleCloseTakeActionDialog}
              />
            </Box>
          )}
        </Box>
      </Box>

      <DisableIntegrationSyncDialog
        open={openDisableDialog}
        channel={channelName}
        title={type}
        handleClose={handleCloseDisableDialog}
        handleDisableSync={() => handleUpdateSyncStatus(false)}
      />
    </Box>
  );
}

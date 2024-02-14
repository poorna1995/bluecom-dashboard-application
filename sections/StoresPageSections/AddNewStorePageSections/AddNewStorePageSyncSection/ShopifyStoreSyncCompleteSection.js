import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";

import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import bluecomLogo from "public/assets/icons/bluecom-square.png";
import arrowConnector from "public/assets/stores/assets/arrow-connector.png";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import AppLink from "components/Common/AppLink";
import AnimatedLoaderSync from "components/Common/Animations/AnimatedLoaderSync/AnimatedLoaderSync";
import appFetch from "utils/appFetch";
import { useRouter } from "next/router";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { SHOPIFY, TASKS } from "constants/API_URL";
import ShopifyValidationConfirmationDialog from "./components/ShopifyValidationConfirmationDialog";
import { channelIconsList } from "sections/StoresPageSections/components/AddStoreSelectChannelComponent";
import { updateStore } from "redux/onboarding/onboardingSlice";
import { useDispatch } from "react-redux";

const styles = {
  // maxWidth: "830px",
  // fontFamily: "Inter",
  "& .title": {
    // color: "#000",
    fontSize: "32px",
    fontWeight: 600,
    // lineHeight: "42px",
    // mb: -3,
    color: (theme) => theme.palette.primary.main,
  },
  "& .description": {
    fontSize: "18px",
    color: (theme) => theme.palette.text.secondary,
    fontWeight: 500,
    lineHeight: "28px",
    mb: 5,
    "& b": {
      color: (theme) => theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  "& .info-container": {
    borderRadius: "7px",
    background: " #F8FEF9",
    display: "flex",
    px: 2,
  },
  "& .icon-container": {
    mr: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    py: 2,
  },
  "& .text-container": {
    "& h3": {
      mb: -2,
      mt: 1,
      color: "#4f44e0",
      fontSize: " 21px",
      fontWeight: 600,
    },
    "& p": {
      color: "#000",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: " 22px",
      // pt: 1,
    },
  },
  " .controls-container": {
    display: "flex",
    justifyContent: "center",
    py: 2,
  },
};
export default function ShopifyStoreSyncCompleteSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { taskId, storeId, shop, drawerOpen, channel } = router.query;
  const handleClickGoToStore = () => {};
  const [requestedData, setRequestedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const channelData = channelIconsList.find((item) => item.key === channel);

  console.log({ channelData });
  const [response, setResponse] = useState({});

  const handleSyncStore = () => {
    const url = SHOPIFY.SYNC_STORE;
    const data = {
      user_id: currentUser && currentUser.merchant_id,
      store_id: storeId,
    };
    appFetch(url, data)
      .then((res) => {
        if (res.status === API_RESPONSE_STATUS.SUCCESS) {
          router.push(
            `/app/stores/add-store?step=sync&id=2&channel=shopify&storeId=${json.store_id}&shop=${shopName}&taskId=${res.task_id}`
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFetchStatus = () => {
    const url = TASKS.FETCH_STORE_SYNC_TASK;
    // "https://api.bluecom.ai/api/sync/fetchStoreSyncStatus";

    appFetch(url, { task_id: taskId })
      .then((res) => {
        console.log({ res });
        if (res.status === "success") {
          const apis_result = res.result.result;

          setRequestedData(apis_result);
          setResponse(res.result);
          if (res.result.task_status === "in_progress") {
            setTimeout(() => {
              handleFetchStatus();
            }, 1500);
          }
          if (res.result.task_status === "completed") {
            // router.push('/home')
            console.log("completed");
            dispatch(updateStore({ step: "sync" }));
          }
        }
        if (res.status === API_RESPONSE_STATUS.FAILURE) {
          console.log(res.message);
          setRequestedData([]);
          setResponse(res);
          setErrorMessage(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestedData([]);
        setErrorMessage(error.message);
      });
  };
  React.useEffect(() => {
    handleFetchStatus();
  }, [taskId]);

  /**
   * {
    "result": {
        "created_at": "2023-08-18T04:55:15.658334",
        "result": [
            {
                "api": "product_api",
                "message": "Products Synced",
                "status": "success"
            },
            {
                "api": "warehouse_api",
                "message": "Warehouse Synced",
                "status": "success"
            },
            {
                "api": "inventory_api",
                "message": "Pending",
                "status": "pending"
            }
        ],
        "task_id": "585dd40a-b731-4ed7-a9a2-df69dab3baae",
        "task_status": "in_progress",
        "task_type": "sync_store",
        "user_id": "138944605333795140"
    },
    "status": "success"
}
   */

  const fetchingData = [
    {
      title: "Products",
      key: "product",
    },
    {
      title: "Locations",
      loading: true,
      key: "warehouse",
    },
    {
      title: "Inventory",
      loading: true,
      key: "inventory",
    },
    {
      title: "Vendors",
      loading: true,
      key: "vendor_api",
    },
    {
      title: "Orders",
      loading: true,
      key: "order",
    },
  ];
  const mergedData = fetchingData
    .map((item) => {
      const found = requestedData.find(
        (reqItem) => reqItem.category === item.key
      );
      if (found) {
        return {
          ...item,
          loading: found.status === "in_progress" ? true : false,
          status: found.status,
          message: found.message,
          completed: found.completed,
          total: found.total,
        };
      }
      return;
    })
    .filter((item) => item);
  console.log({ mergedData, requestedData });

  return (
    <>
      <Box
        sx={{
          ...styles,
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {/* <h1 className="title">Modules to Link</h1> */}
        <h1 className="title">Store Sync</h1>
        <Typography className="description">
          Congratulations! You&apos;ve reached the final step. Syncing product,
          inventory and locations data from your <b>{shop}</b> store to bluecom.
        </Typography>
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          {Array.isArray(mergedData) &&
            mergedData.map((item, index) => (
              <PulledDataCard
                key={index}
                title={item.title}
                loading={item.loading}
                message={item.message}
                status={item.status}
                data={item}
                channel={channelData.title}
                icon={channelData.icon}
              />
            ))}
        </div>
        <div className="info-container">
          {/* <div className="icon-container">
						{response.status === API_RESPONSE_STATUS.SUCCESS && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M8.6 11.8L6.425 9.625C6.24167 9.44167 6.01667 9.35 5.75 9.35C5.48333 9.35 5.25 9.45 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.08333 14.0833 8.31667 14.175 8.6 14.175C8.88333 14.175 9.11667 14.0833 9.3 13.9L14.975 8.225C15.1583 8.04167 15.25 7.81667 15.25 7.55C15.25 7.28333 15.15 7.05 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
									fill="#12B76A"
								/>
							</svg>
						)}
					</div> */}
          <div className="text-container">
            {/* <h3>
							{response.task_status === "in_progress" &&
								"Linking"}
							{response.task_status ===
								API_RESPONSE_STATUS.SUCCESS && "Linked"}{" "}
							{response.task_status ===
								API_RESPONSE_STATUS.FAILURE && "Failed link"}
							with {channelData.title}: {shop}
						</h3> */}
            <p>
              <b>Note:</b> This step may take a few minutes. Thank you for your
              patience. 😊
              {/* The Initial Syncing is started. Once It&apos;s one
							you can view your Products , warehouse, and
							inventory from {channelData.title} in Bluecom */}
            </p>
          </div>
        </div>

        <Box
          sx={{
            py: 2,
            // borderTop: "1px solid rgba(0,0,0,0.1)",
            // borderBottom: "1px solid rgba(0,0,0,0.1)",
            mt: 8,
          }}
          className="controls-container"
        >
          <PrimaryButton
            // onClick={handleClickGoToStore}
            LinkComponent={AppLink}
            // href={`/app/stores/${storeId}`}
            // onClick={() => router.push("/home")}
            href={`/home`}
            // disabled={response?.task_status !== "success"}
          >
            {/* {console.log(
							response?.task_status === "success",
							"status",
						)} */}
            Complete Onboarding
          </PrimaryButton>
        </Box>

        <ShopifyValidationConfirmationDialog
          open={drawerOpen}
          handleConfirmButton={handleSyncStore}
        />
      </Box>
    </>
  );
}

const cardStyles = {
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  my: 2,
  p: 2,
  borderRadius: "8px",
  maxWidth: "760px",
  border: "1px solid rgba(0,0,0,0.1)",
  flex: 1,
  "& .fields-container": {
    display: "flex",
    flex: 0.6,
    // justifyContent: "space-between",
  },
  "& .field": {
    display: "flex",
    // flex: 1,
    mr: 4,
    "& .icon": {
      mr: 2,
      borderRadius: "8px",
      border: "1px solid rgba(0,0,0,0.1)",
      width: "48px",
      height: "48px",
      p: 1,
      "& svg": {
        height: "30px",
        width: "30px",
      },
    },
    "& .image": {
      // width: "40px",
      // height: "40px",
    },
    "& .text": {
      color: "#000",
      fontSize: " 16px",
      fontWeight: 600,
      lineHeight: "20px",
      "& span": {
        color: "#7B7D84",
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "20px",
      },
    },
  },
  "& .status-container": {
    ml: 4,
    flex: 0.4,
    justifySelf: "flex-end",
    "& .complete-status": {
      "& .field": {
        display: "flex",
        alignItems: "center",
      },
    },
    "& .loading-status": {
      display: "flex",
      alignItems: "center",
      "& .text": {
        ml: 2,
        color: " #1D2939",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: " 150%",
      },
    },
  },
  "& .success-icon": {
    mr: 2,
    mt: 1,
    "& svg": {
      height: "20px",
      width: "20px",
    },
  },
  "& .flex-1": {
    flex: 1,
  },
};

const PulledDataCard = ({
  title,
  loading,
  message,
  status,
  channel,
  icon,
  data,
}) => {
  return (
    <Box sx={{ ...cardStyles }}>
      <div className="fields-container">
        <div className="field ">
          <div className="icon">{icon}</div>
          <div className="text">
            {title || "Products"}
            <br />
            <span>in {channel}</span>
          </div>
        </div>
        <div className="field">
          {/* {loading ? (
						<AnimatedLoaderSync className="image-connector" />
					) : (
						<AppImage
							src={arrowConnector}
							width={40}
							height={40}
							className=" image"
						/>
					)} */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            style={{ marginTop: "8px" }}
          >
            <path
              d="M18.4167 7.58334H15.1667C14.5709 7.58334 14.0834 8.07084 14.0834 8.66668C14.0834 9.26251 14.5709 9.75001 15.1667 9.75001H18.4167C20.2042 9.75001 21.6667 11.2125 21.6667 13C21.6667 14.7875 20.2042 16.25 18.4167 16.25H15.1667C14.5709 16.25 14.0834 16.7375 14.0834 17.3333C14.0834 17.9292 14.5709 18.4167 15.1667 18.4167H18.4167C21.4067 18.4167 23.8334 15.99 23.8334 13C23.8334 10.01 21.4067 7.58334 18.4167 7.58334ZM8.66669 13C8.66669 13.5958 9.15419 14.0833 9.75002 14.0833H16.25C16.8459 14.0833 17.3334 13.5958 17.3334 13C17.3334 12.4042 16.8459 11.9167 16.25 11.9167H9.75002C9.15419 11.9167 8.66669 12.4042 8.66669 13ZM10.8334 16.25H7.58335C5.79585 16.25 4.33335 14.7875 4.33335 13C4.33335 11.2125 5.79585 9.75001 7.58335 9.75001H10.8334C11.4292 9.75001 11.9167 9.26251 11.9167 8.66668C11.9167 8.07084 11.4292 7.58334 10.8334 7.58334H7.58335C4.59335 7.58334 2.16669 10.01 2.16669 13C2.16669 15.99 4.59335 18.4167 7.58335 18.4167H10.8334C11.4292 18.4167 11.9167 17.9292 11.9167 17.3333C11.9167 16.7375 11.4292 16.25 10.8334 16.25Z"
              fill="#4F44E0"
            />
          </svg>
        </div>
        <div className="field ">
          <AppImage
            src={bluecomLogo}
            width={40}
            height={40}
            className="icon image"
          />
          <div className="text">
            {title || "Products"}
            <br />
            <span> in Bluecom</span>
          </div>
        </div>
      </div>
      <div className="status-container ">
        {loading ? (
          <div className="loading-status ">
            <CircularProgress thickness={3} size={26} />
            <span className="text">
              {" "}
              {message}
              <br />
              <span
                style={{
                  color: "#6C7388",
                  fontSize: " 14px",
                  fontWeight: 500,
                  lineHeight: " 150%",
                }}
              >
                {" "}
                {data.completed} of {data.total} {title}
              </span>{" "}
            </span>
          </div>
        ) : (
          <div className="complete-status">
            {status === "success" && (
              <div className={"field"} style={{ alignItems: "center" }}>
                <div className="success-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.6 11.8L6.425 9.625C6.24167 9.44167 6.01667 9.35 5.75 9.35C5.48333 9.35 5.25 9.45 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.08333 14.0833 8.31667 14.175 8.6 14.175C8.88333 14.175 9.11667 14.0833 9.3 13.9L14.975 8.225C15.1583 8.04167 15.25 7.81667 15.25 7.55C15.25 7.28333 15.15 7.05 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
                      fill="#4f44e0"
                    />
                  </svg>
                </div>
                <div className="text">
                  {message || "Pulled"}
                  {/* <br /> */}
                  {/* <span>8 min ago</span> */}
                </div>
              </div>
            )}{" "}
            {status === "pending" && (
              <div className={"field"} style={{ alignItems: "center" }}>
                <div className="text">
                  {message || "Pending"}
                  <br />
                  <span
                    style={{
                      color: "#6C7388",
                      fontSize: " 14px",
                      fontWeight: 500,
                      lineHeight: " 150%",
                    }}
                  >
                    {" "}
                    {data.completed} of {data.total} {title}
                  </span>{" "}
                </div>
              </div>
            )}
            {status === "failure" && (
              <div className={"field"} style={{ alignItems: "center" }}>
                <div className="text">
                  {`${status}: ${message}` || "Failure"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

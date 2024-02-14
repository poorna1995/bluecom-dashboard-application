import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { TASKS } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import useInterval from "customHooks/useInterval";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import {
  disableStoreOnboardingStep,
  updateStore,
} from "redux/onboarding/onboardingSlice";
import { setStoreData, setStoreDict } from "redux/stores/storeSlice";
import appFetch from "utils/appFetch";
import StoreSummaryComponent from "./StoreSummaryComponent";
import { enqueueSnackbar } from "notistack";

export default function AddNewStorePageStoreAnalysisSection() {
  const router = useRouter();
  const { shop, taskId, channel } = router.query;
  const dispatch = useDispatch();
  const { data, isLoading, isError, error, isSuccess, refetch, isRefetching } =
    useQuery({
      queryKey: ["storeInfo"],
      queryFn: () =>
        appFetch(TASKS.FETCH_STORE_CONNECTION_TASKS, { task_id: taskId })
          .then((json) => json)
          .catch((err) => err),
      enabled: !!taskId,
    });
  // console.log({ data, isLoading, isError, error, isSuccess });
  const handleFetchTaskStatus = () => {
    const URL = TASKS.FETCH_STORE_CONNECTION_TASKS;
    const data = {
      task_id: taskId,
    };
  };
  const isCompleted =
    data && data.result && data.result.status === API_RESPONSE_STATUS.SUCCESS;
  useInterval(isCompleted ? () => {} : () => refetch(), 1500);

  // useInterval(
  //   isCompleted || isFailed
  //     ? () => {
  //         return;
  //       }
  //     : refetchStatus,
  //   1500
  // );
  const taskLogs =
    data &&
    data.result &&
    Array.isArray(data.result.task_log) &&
    data.result.task_log;
  const storeDetails = data && data.result && data.result.task_result;
  const handleSaveAndContinue = () => {
    router.push(
      `/app/stores/add-store?step=connect-location&id=3&channel=${channel}&shop=${shop}&taskId=${taskId}`
    );
    dispatch(setStoreData(storeDetails));
    dispatch(
      updateStore({
        step: "store-analysis",
        nextStep: "connect-location",
      })
    );
    dispatch(setStoreDict(data.result.store_dict));
  };

  if (
    data &&
    data.result &&
    data.result.status === API_RESPONSE_STATUS.FAILURE
  ) {
    enqueueSnackbar(data.result.message, { variant: "error" });

    // router.push(
    //   `/app/stores/add-store?step=add-new-store&id=1&channel=shopify&connectionError=${json.message}&shop=${shopName}`
    // );
    router.push(
      `/app/stores/add-store?step=add-new-store&id=1&channel=${channel}&connectionError=${data.result.message}&shop=${shop}`
    );
    // dispatch(
    // 	updateStore({
    // 		step: "add-new-store",
    // 		// nextStep: "connect-location",
    // 	}),
    // );
    dispatch(disableStoreOnboardingStep({ step: "store-analysis" }));
  }

  return (
    <div>
      <Box sx={{ maxWidth: "800px", margin: "auto" }}>
        {!isCompleted && (
          <Typography
            sx={{
              color: "#222",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "150%",
              mt: 8,
              mb: 4,
            }}
          >
            Please wait while we analyze store information and attributes
          </Typography>
        )}
        {!isCompleted &&
          Array.isArray(taskLogs) &&
          taskLogs.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                height: "auto",
                // marginTop: "16px",
                // marginBottom: "16px",
                my: 3,
                mx: "auto",
                maxWidth: "600px",
              }}
            >
              {item.status === "success" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M17.2 23.6L12.85 19.25C12.4833 18.8833 12.0333 18.7 11.5 18.7C10.9667 18.7 10.5 18.9 10.1 19.3C9.73333 19.6667 9.55 20.1333 9.55 20.7C9.55 21.2667 9.73333 21.7333 10.1 22.1L15.8 27.8C16.1667 28.1667 16.6333 28.35 17.2 28.35C17.7667 28.35 18.2333 28.1667 18.6 27.8L29.95 16.45C30.3167 16.0833 30.5 15.6333 30.5 15.1C30.5 14.5667 30.3 14.1 29.9 13.7C29.5333 13.3333 29.0667 13.15 28.5 13.15C27.9333 13.15 27.4667 13.3333 27.1 13.7L17.2 23.6ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3747 7.65 35.95 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.525334 25.3667 0 22.7667 0 20C0 17.2333 0.525334 14.6333 1.576 12.2C2.62533 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.62467 12.2 1.574C14.6333 0.524667 17.2333 0 20 0C22.7667 0 25.3667 0.524667 27.8 1.574C30.2333 2.62467 32.35 4.05 34.15 5.85C35.95 7.65 37.3747 9.76667 38.424 12.2C39.4747 14.6333 40 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3747 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.3747 27.8 38.424C25.3667 39.4747 22.7667 40 20 40Z"
                    fill="#4f44e0"
                  />
                </svg>
              )}{" "}
              {item.status === "in_progress" && (
                <CircularProgress
                  size={26}
                  thickness={3}
                  // color="success"
                  // sx={{
                  // 	mr: 2,
                  // }}
                />
              )}
              {item.status === "pending" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Ellipse 66477"
                    d="M35 17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0C27.165 0 35 7.83502 35 17.5ZM5.21778 17.5C5.21778 24.2833 10.7167 29.7822 17.5 29.7822C24.2833 29.7822 29.7822 24.2833 29.7822 17.5C29.7822 10.7167 24.2833 5.21778 17.5 5.21778C10.7167 5.21778 5.21778 10.7167 5.21778 17.5Z"
                    fill="#D9D9D9"
                  />
                </svg>
              )}
              <Typography
                sx={{
                  color: item.status === "pending" ? "#888" : "#222",
                  fontSize: "18px",
                  fontWeight: item.status === "pending" ? 400 : 400,
                  lineHeight: "150%",
                  ml: 3,
                }}
              >
                {item.status === "pending"
                  ? `Analyzing ${item.category}`
                  : item.message}
              </Typography>
            </Box>
          ))}
      </Box>

      {isCompleted && (
        <>
          <StoreSummaryComponent
            shop={shop}
            inventory={storeDetails.total_inventory}
            products={storeDetails.products_count}
            locations={storeDetails.locations_count}
            storeDetails={storeDetails}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <PrimaryButton onClick={handleSaveAndContinue}>
              Continue
            </PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * 
 * {
    "existed_item_sku": 188,
    "existed_product_sku": 0,
    "has_compared": "hivepath-test-store",
    "has_primary_store": true,
    "locations": [
        {
            "address_1": "",
            "address_2": null,
            "address_id": "",
            "channel_id": 1,
            "channel_wh_id": "90711425344",
            "channel_wh_name": "Default Bigcommerce Warehouse",
            "city": "",
            "country": "United States",
            "created_at": "2023-08-22T00:02:03-04:00",
            "end_date": "",
            "is_connected": false,
            "is_exist": false,
            "link": false,
            "operator_id": "",
            "org_id": null,
            "start_date": "2023-08-22T00:02:03-04:00",
            "state": "",
            "store_id": "139131399278676270",
            "updated_at": "2023-08-22T00:02:03-04:00",
            "user_id": "139125211109713590",
            "wh_id": "90711425344",
            "wh_name": "Default Bigcommerce Warehouse",
            "zipcode": ""
        },
        {
            "address_1": "",
            "address_2": null,
            "address_id": "",
            "channel_id": 1,
            "channel_wh_id": "90943095104",
            "channel_wh_name": "Default Woocommerce Warehouse",
            "city": "",
            "country": "United States",
            "created_at": "2023-08-25T01:22:33-04:00",
            "end_date": "",
            "is_connected": false,
            "is_exist": false,
            "link": false,
            "operator_id": "",
            "org_id": null,
            "start_date": "2023-08-25T01:22:33-04:00",
            "state": "",
            "store_id": "139131399278676270",
            "updated_at": "2023-08-25T01:22:33-04:00",
            "user_id": "139125211109713590",
            "wh_id": "90943095104",
            "wh_name": "Default Woocommerce Warehouse",
            "zipcode": ""
        },
        {
            "address_1": null,
            "address_2": null,
            "address_id": "",
            "channel_id": 1,
            "channel_wh_id": "88847450432",
            "channel_wh_name": "Shop location",
            "city": null,
            "country": "India",
            "created_at": "2023-07-28T00:06:28-04:00",
            "end_date": "",
            "is_connected": false,
            "is_exist": false,
            "link": false,
            "operator_id": "",
            "org_id": null,
            "start_date": "2023-07-28T00:06:28-04:00",
            "state": "",
            "store_id": "139131399278676270",
            "updated_at": "2023-07-28T00:06:28-04:00",
            "user_id": "139125211109713590",
            "wh_id": "88847450432",
            "wh_name": "Shop location",
            "zipcode": ""
        },
        {
            "address_1": "1229u",
            "address_2": null,
            "address_id": "",
            "channel_id": 1,
            "channel_wh_id": "91329102144",
            "channel_wh_name": "Test",
            "city": "Newcastle",
            "country": "United States",
            "created_at": "2023-08-31T00:05:10-04:00",
            "end_date": "",
            "is_connected": false,
            "is_exist": false,
            "link": false,
            "operator_id": "",
            "org_id": null,
            "start_date": "2023-08-31T00:05:10-04:00",
            "state": "",
            "store_id": "139131399278676270",
            "updated_at": "2023-08-31T00:05:11-04:00",
            "user_id": "139125211109713590",
            "wh_id": "91329102144",
            "wh_name": "Test",
            "zipcode": ""
        }
    ],
    "locations_count": 4,
    "new_item_sku": 61,
    "new_product_sku": 0,
    "products_count": 13,
    "store_id": "139131399278676270",
    "total_inventory": 1413,
    "variants_count": 249
}
 * 
 */

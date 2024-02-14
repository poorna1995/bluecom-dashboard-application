import { Box, Typography } from "@mui/material";
import React from "react";
import StoreLocationsTable from "./StoreLocationsTable";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import appFetch from "utils/appFetch";
import {
  BIG_COMMERCE,
  SHOPIFY,
  TASKS,
  WAREHOUSE,
  WOOCOMMERCE,
} from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { updateStore } from "redux/onboarding/onboardingSlice";
import { setStoreData, setStoreDict } from "redux/stores/storeSlice";
import { enqueueSnackbar } from "notistack";
import channelsOptions, { CHANNEL_IDS } from "constants/channelOptions";

const mapState = ({ storesData, user }) => ({
  storeData: storesData.storeData,
  storeDict: storesData.storeDict,
  currentUser: user.currentUser,
});
export default function AddNewStoreConnectLocationSections() {
  const router = useRouter();
  const { shop, taskId, channel } = router.query;
  const dispatch = useDispatch();
  const { storeData, currentUser, storeDict } = useSelector(mapState);
  const [loading, setLoading] = React.useState(false);
  const [locationsOptions, setLocationsOptions] = React.useState([]);
  // const dispatch = useDispatch();
  // const {
  // 	data,
  // 	isLoading,
  // 	isError,
  // 	error,
  // 	isSuccess,
  // 	refetch,
  // 	isRefetching,
  // } = useQuery({
  // 	queryKey: ["storeInfo"],
  // 	queryFn: () =>
  // 		appFetch(TASKS.FETCH_STORE_CONNECTION_TASKS, { task_id: taskId })
  // 			.then((json) => json)
  // 			.catch((err) => err),
  // 	enabled: !!taskId,
  // });
  const storeDetails = storeData;
  console.log({ storeDetails });

  const handleClickSaveAndContinue = () => {
    const URL = WAREHOUSE.CONNECT_WAREHOUSES;
    const data = {
      user_id: currentUser.merchant_id,
      channel_id: CHANNEL_IDS[channel],
      locations: storeData.locations,
    };
    const SYNC_URL = {
      shopify: SHOPIFY.ONBOARDING_SYNC_STORE,
      woocommerce: WOOCOMMERCE.SYNC_STORE,
      bigcommerce: BIG_COMMERCE.SYNC_STORE,
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log(json);
          // enqueueSnackbar(json.message);

          appFetch(SYNC_URL[channel], {
            user_id: currentUser.merchant_id,
            store_dict: storeDict,
            locations: json.result,
            store_id: storeDict.store_id,
          })
            .then((resp) => {
              if (resp.status === API_RESPONSE_STATUS.SUCCESS) {
                console.log(resp);
                enqueueSnackbar("Successfully Connected Locations");
                router.push(
                  `/app/stores/add-store?step=sync&id=4&channel=${channel}&shop=${shop}&taskId=${resp.task_id}&storeId=${storeDict.store_id}`
                );
                // dispatch(setStoreData(storeDetails));
                dispatch(
                  updateStore({
                    step: "connect-location",
                    nextStep: "sync",
                  })
                );
                setLoading(false);
                dispatch(setStoreData({}));
                dispatch(setStoreDict({}));
              }
              if (resp.status === API_RESPONSE_STATUS.FAILURE) {
                enqueueSnackbar(resp.message, {
                  variant: "error",
                });
              }

              setLoading(false);
              // router.push(
              // 	`/app/stores/add-store?step=sync&id=4&channel=shopify&shop=${shop}`,
              // );
              // // dispatch(setStoreData(storeDetails));
              // dispatch(
              // 	updateStore({
              // 		step: "connect-location",
              // 		nextStep: "sync",
              // 	}),
              // );
            })
            .catch((error) => {
              console.error(error);

              setLoading(false);
            });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  };

  const handleFetchBluecomLocations = () => {
    const URL = WAREHOUSE.FETCH_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          console.log(json);
          setLocationsOptions(json.result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    handleFetchBluecomLocations();
  }, []);
  // disable save and continue button if any location has empty action key in locations list

  const disableSaveAndContinue = storeDetails.locations?.some(
    (location) => !location.action
  );

  if (storeDetails)
    return (
      <div
      // style={{ maxWidth: "700px", margin: "auto" }}
      >
        <Box
          sx={{
            // maxWidth: "686px",
            // margin: "auto",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#4F44E0",
              fontSize: " 32px",
              fontWeight: 600,
              // textAlign: "center",
              mt: 4,
            }}
          >
            Connect Locations
          </Typography>
          {storeDetails.locations_count > 0 ? (
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
                // textAlign: "center",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "24px",
                // maxWidth: "686px",
                my: 2,
                mb: 4,
                "& b": {
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              Found <b>{storeDetails.locations_count} locations</b> from{" "}
              <b>{shop}</b> store. Proceed to connect these{" "}
              <b>
                {storeDetails.locations_count} {channel}
              </b>{" "}
              locations with Bluecom.
              {/* We found{" "}
							<b>{storeDetails.locations_count} locations</b> from
							the <b>store</b>.
							<br /> Connect them with bluecom for inventory
							syncing at variant level */}
            </Typography>
          ) : (
            <>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  // textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  // maxWidth: "686px",
                  my: 2,
                }}
              >
                We could not find locations from the connecting store. Inventory
                at variant level is available. Before we proceed to next step,
                Where would you like to map this inventory in bluecom{" "}
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  // textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  maxWidth: "686px",
                  my: 2,
                }}
              >
                Total of {storeDetails.total_inventory} quantity found in
                inventory
              </Typography>
            </>
          )}{" "}
        </Box>
        {/* <Typography
					sx={{
						color: "#222",
						fontSize: " 18px",
						fontWeight: 500,
						lineHeight: "30px",
						mb: 2,
					}}
				>
					<b>Store Name:</b> {shop}
				</Typography> */}
        <Box sx={{ maxWidth: "960px" }}>
          <StoreLocationsTable
            data={storeDetails}
            channel={channel}
            locationOptions={locationsOptions}
          />
        </Box>
        {/* <Typography
          // slot={'div'}
          component={"div"}
          sx={{
            mt: 3,
            "& .heading": {
              color: "#222",
              fontSize: "21px",
              fontWeight: 700,
            },
            "& p": {
              color: "#222",
              fontSize: " 16px",
              fontWeight: 400,
              lineHeight: " 26px",
            },
            "& ul li": {
              color: "#222",
              fontSize: " 16px",
              fontWeight: 400,
              lineHeight: " 26px",
            },
          }}
        >
          <span className="heading">
            How will the inventory be synced for first time?
          </span>
          <br />
          <p>
            All the variant level inventory will be mapped to the locations with
            bluecom.
          </p>
          <ul>
            <li>
              <b>Inventory sync:</b> Existing variant SKU&apos;s will be
              overridden with connecting store inventory.
            </li>
            <li>
              <b>Variant Sync:</b> New variants inventory will be added
              according to location mapping
            </li>
          </ul>
        </Typography> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px",
            maxWidth: "960px",
          }}
        >
          <PrimaryButton
            sx={{
              p: "15px 18px",
            }}
            onClick={handleClickSaveAndContinue}
            loading={loading}
            disabled={disableSaveAndContinue}
          >
            Save & Continue
          </PrimaryButton>
        </div>
      </div>
    );
}

/**
 *
 * {
 * channel_wh_id:'',
 * channel_wh_name:"shopify location",
 * action:'create-and-connect', | connect | do_not_link
 * bluecom_wh_name:"shopify-location", //if rename ("bluecom-location")
 * bluecom_wh_id:"",//if it is connect action
 *
 *
 * }
 *
 *
 */

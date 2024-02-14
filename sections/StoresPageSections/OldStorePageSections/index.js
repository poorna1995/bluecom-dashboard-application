import { Box } from "@mui/material";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import AddCircleIcon from "components/Common/Icons/AddCircleIcon";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, THIRD_PARTY } from "constants/API_URL";
import { groupBy } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import AddedChannelStoresListSection from "./components/AddedChannelStoresListSection";
import { format } from "date-fns";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import StoreES from "components/Common/Icons/EmptyStates/StoreES";
import { useDispatch } from "react-redux";
import { resetStore } from "redux/onboarding/onboardingSlice";
import MobileViewStoresPageSection from "./MobileView/MobileViewStoresPageSection";
import StoreListSkeleton from "./StoreListSkeleton";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function OldStoresPageSectionsV1() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const [appsData, setAppsData] = useState([]);
  const [appLineData, setAppLineData] = useState([]);
  const [connectedApps, setConnectedApps] = useState();
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleFetchThirdPartyApps = () => {
    setLoading(true);
    const url = THIRD_PARTY.FETCH_APPS;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppsData(json.result);
      });
  };
  const handleFetchThirdPartyAppLine = () => {
    const url = THIRD_PARTY.FETCH_APPLINE;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAppLineData(json.result);
      });
  };

  useEffect(() => {
    handleFetchThirdPartyApps();
    handleFetchThirdPartyAppLine();
    handleFetchConnectedApps();
  }, []);

  const handleFetchConnectedApps = () => {
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setConnectedApps(json.result);
        setLoading(false);
      }
    });
  };

  const groupByChannelName = groupBy(connectedApps, "channel_name");
  console.log({ groupByChannelName });

  const formattedData =
    Array.isArray(connectedApps) &&
    connectedApps.map((item, index) => {
      const { last_synced } = item;
      const lastSyncedDate = last_synced && new Date(last_synced);
      const formattedLastSyncedDate =
        lastSyncedDate && format(lastSyncedDate, "MMMM dd, yyyy");

      return {
        ...item,
        last_synced: formattedLastSyncedDate,
      };
    });

  console.log({ formattedData });

  const handleClickCreateNewStore = () => {
    dispatch(resetStore());
    router.push("/app/stores/add-store?step=select-channel&id=0");
  };

  console.log({ groupByChannelName });
  // if (loading) return <PageSpinner />;

  return (
    <div>
      {/* {Object.keys(groupByChannelName).length === 0 && (
      <EmptyState
		  text={"No Store Added !"}
			  bodyText=
			  {
				"Looks like you have not added any store ,you can add new store by clicking below"
			  } 
	  />
      )} */}
      {/* {loading && <PageLoader />} */}

      {Array.isArray(formattedData) &&
        formattedData.length === 0 &&
        !loading && (
          <EmptyState
            icon={<StoreES />}
            text={"Connect Your Stores"}
            bodyText={"Integrate your stores by clicking below."}
          >
            <PrimaryButton
              onClick={() =>
                router.push("/app/stores/add-store?step=select-channel&id=0")
              }
            >
              Connect Store
            </PrimaryButton>
          </EmptyState>
        )}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {loading && <StoreListSkeleton />}

        {Object.keys(groupByChannelName).length > 0 && !loading && (
          <>
            <Box
              sx={{
                px: 2,
                height: "70px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // mt: 1,
                position: { md: "sticky" },
                top: { md: "110px" },
                backgroundColor: "white",
                zIndex: 100,

                // borderBottom: "1px solid #e0e0e0",
              }}
            >
              <SectionTitleText
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#19235A",
                }}
              >
                Stores
              </SectionTitleText>
              <PrimaryButton
                startIcon={<AddCircleIcon />}
                sx={{
                  mb: 1,
                }}
                onClick={() => handleClickCreateNewStore()}
              >
                Add New Store
              </PrimaryButton>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              {Object.keys(groupByChannelName).map((channelName) => (
                <>
                  {/* {Object.keys(groupByChannelName).length > 0 && ( */}
                  <AddedChannelStoresListSection
                    channelName={channelName}
                    data={groupByChannelName[channelName]}
                  />
                </>
              ))}
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <MobileViewStoresPageSection
          data={groupByChannelName || {}}
          loading={loading}
        />
      </Box>
    </div>
  );
}

import {
  Box,
  IconButton,
  OutlinedInput,
  Popover,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import CustomRadioGroup, { ACTION_POPUP_OPTIONS } from "./CustomRadioGroup";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setBluecomLocationId,
  setStoreData,
  setStoreOnboardingAction,
  setStoreOnboardingLocationName,
} from "redux/stores/storeSlice";
import appFetch from "utils/appFetch";
import { WAREHOUSE } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import { CHANNEL_IDS } from "constants/channelOptions";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const ACTIONS = {
  CREATE_AND_CONNECT: "create-and-connect",
  DO_NOT_LINK: "do-not-connect",
  RENAME: "rename",
  CONNECT: "connect",
  RESET: "reset",
};

const mapState = ({ storesData, user }) => ({
  storeData: storesData.storeData,
  currentUser: user.currentUser,
  storeOnboardingData: storesData.storeOnboardingData,
});

export default function StoreLocationsTable({
  data,
  channel,
  locationOptions,
}) {
  const { storeData, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const channelLocationData = storeData.locations;
  // storeData.locations;
  // (data && data.locations) || [];
  const locationsData =
    Array.isArray(channelLocationData) &&
    channelLocationData.map((location) => {
      return {
        ...location,
        action: location.action || "",
      };
    });

  const locations = locationsData;
  // React.useEffect(() => {
  // 	setLocations(locationsData);
  // }, []);
  // const [clickedOnCreate, setClickedOnCreate] = React.useState(false);
  const handleClickAction = (wh_id, action) => {
    const updatedLocations = locations.map((location) => {
      if (location.channel_wh_id === wh_id) {
        if (action === ACTIONS.RESET) {
          return {
            ...location,
            action: "",
            wh_id: location.channel_wh_id,
            wh_name: location.channel_wh_name,
            // wh_name:
            // 	action === ACTIONS.RESET
            // 		? location.channel_wh_name
            // 		: location.wh_name,
          };
        }
        return {
          ...location,
          action: action === ACTIONS.RESET ? "" : action,
          // wh_name:
          // 	action === ACTIONS.RESET
          // 		? location.channel_wh_name
          // 		: location.wh_name,
        };
      }
      return location;
    });
    // setLocations(updatedLocations);
    dispatch(
      setStoreData({
        ...storeData,
        locations: updatedLocations,
      })
    );
  };
  const handleLocationNameChange = (wh_id, wh_name) => {
    const updatedLocations = locations.map((location) => {
      if (location.wh_id === wh_id) {
        return {
          ...location,
          wh_name,
        };
      }
      return location;
    });
    setLocations(updatedLocations);
  };
  console.log({ locations });
  const handleOpenPopover = () => {};
  // console.log({ locations });
  if (Array.isArray(locations) && locations.length > 0 && channel === "shopify")
    return (
      <Box sx={{}}>
        <Stack
          sx={{
            borderRadius: " 5px 5px 0px 0px",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            background: "#f5f4fd",
            flex: 1,
            p: 2,
            pl: 3,
          }}
          direction="row"
        >
          <Typography
            sx={{
              flex: 0.4,
              color: (theme) => theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {channel} Location
            {/* on {channel}{" "} */}
          </Typography>
          <Typography
            sx={{
              flex: 0.6,
              color: (theme) => theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Bluecom Location
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            borderRadius: " 0px 0px 5px 5px",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            // p: 2,
            borderTop: "none",
          }}
        >
          {Array.isArray(locations) &&
            locations.map((location, index) => {
              return (
                <LocationTableItem
                  key={index}
                  index={index}
                  locations={locations}
                  location={location}
                  handleClickAction={handleClickAction}
                  locationOptions={locationOptions}
                  currentUser={currentUser}
                  // handleLocationNameChange={}
                />
              );
            })}
        </Stack>
      </Box>
    );
  if (channel === "woocommerce" || channel === "bigcommerce")
    return (
      <Box sx={{}}>
        <Stack
          sx={{
            borderRadius: " 5px 5px 0px 0px",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            background: "#F7F7F7",
            flex: 1,
            p: 2,
          }}
          direction="row"
        >
          <Typography
            sx={{
              flex: 0.4,
              color: (theme) => theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {channel} Location
            {/* on {channel}{" "} */}
          </Typography>
          <Typography
            sx={{
              flex: 0.6,
              color: (theme) => theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Bluecom Location
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            borderRadius: " 0px 0px 5px 5px",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            // p: 2,
            borderTop: "none",
          }}
        >
          {Array.isArray(locations) && locations.length > 0 ? (
            locations.map((location, index) => (
              <EmptyLocationTableItem
                key={index}
                index={index}
                locations={locations}
                location={location}
                handleClickAction={handleClickAction}
                locationOptions={locationOptions}
                currentUser={currentUser}
                // handleLocationNameChange={}
              />
            ))
          ) : (
            <EmptyLocationTableItem
              currentUser={currentUser}
              index={0}
              locations={locations}
              location={{
                wh_id: "",
                wh_name: "",
                action: "",
              }}
              handleClickAction={handleClickAction}
              locationOptions={locationOptions}
            />
          )}{" "}
        </Stack>
      </Box>
    );
}

const EmptyLocationTableItem = ({
  index,
  locations,
  location,
  handleClickAction,
  locationOptions,
  currentUser,
}) => {
  const router = useRouter();
  const { channel } = router.query;
  const dispatch = useDispatch();
  const { storeData, storeOnboardingData } = useSelector(mapState);
  const { locationName, method, bluecomLocationId } = storeOnboardingData;
  const popupState = usePopupState({
    variant: "popper",
    popupId: "linkButtonPopper",
  });
  const [errorMessage, setErrorMessage] = React.useState();

  const handleClose = () => {
    // setAnchorEl(null);
    popupState.close();
  };
  const [loading, setLoading] = React.useState(false);
  // const [locationName, setLocationName] = React.useState("");

  const handleSaveButton = () => {
    if (method === ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY) {
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
        handleClickAction(location.wh_id, ACTIONS.CREATE_AND_CONNECT);
        handleClose();
      }, 2000);
    }
    if (method === ACTION_POPUP_OPTIONS.CREATE_NEW) {
      setLoading(true);
      handleAddNewLocation();
    }
    if (method === ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM) {
      const selectedBluecomLocation = locationOptions.find(
        (item) => item.wh_id === bluecomLocationId
      );
      console.log({ selectedBluecomLocation }, "inside save button click");
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
        const updatedLocations = [
          {
            ...selectedBluecomLocation,
            action: ACTIONS.CONNECT,
            channel_id: CHANNEL_IDS[channel],
            channel_wh_id: "",
            channel_wh_name: "",
          },
        ];
        // storeData.locations.map((item) => {
        // 	if (location.channel_wh_id === item.channel_wh_id) {
        // 		return {
        // 			...item,
        // 			wh_id: selectedBluecomLocation.wh_id,
        // 			wh_name: selectedBluecomLocation.wh_name,
        // 			action: ACTIONS.CONNECT,
        // 		};
        // 	}
        // 	return item;
        // });
        dispatch(
          setStoreData({
            ...storeData,
            locations: updatedLocations,
          })
        );
        dispatch(setBluecomLocationId(""));

        // handleClickAction(location.channel_wh_id, ACTIONS.CONNECT);
        handleClose();
      }, 2000);
    }
  };
  const handleAddNewLocation = () => {
    const URL = WAREHOUSE.ADD_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_name: locationName,
    };
    if (
      storeData.locations.find(
        (item) => item.wh_name.toLowerCase() === locationName.toLowerCase()
      )
    ) {
      setLoading(false);
      enqueueSnackbar("Location already exists!", { variant: "error" });
      setErrorMessage("Location already exists!");
      return;
    }
    if (
      locationOptions.find(
        (item) => item.wh_name.toLowerCase() === locationName.toLowerCase()
      )
    ) {
      setLoading(false);
      enqueueSnackbar("Location already exists!", { variant: "error" });
      setErrorMessage("Location already exists!");
      return;
    }
    // appFetch(URL, data)
    //   .then((json) => {
    //     if (json.status === API_RESPONSE_STATUS.SUCCESS) {
    setLoading(false);
    const updatedLocations = [
      {
        // ...selectedBluecomLocation,

        wh_id: "",
        wh_name: locationName,
        action: ACTIONS.CREATE_AND_CONNECT,
        channel_id: CHANNEL_IDS[channel],
        channel_wh_id: "",
        channel_wh_name: "",
      },
    ];

    // storeData.locations.map((item) => {
    // 	if (location.channel_wh_id === item.channel_wh_id) {
    // 		return {
    // 			...item,
    // 			wh_id: json.wh_id,
    // 			wh_name: json.wh_name,
    // 			action: ACTIONS.CONNECT,
    // 		};
    // 	}
    // 	return item;
    // });
    dispatch(
      setStoreData({
        ...storeData,
        locations: updatedLocations,
      })
    );
    dispatch(setStoreOnboardingLocationName(""));
    dispatch(setStoreOnboardingAction(ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY));

    handleClose();
    // }
    // console.log({ message: json.message });
    setLoading(false);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  };

  return (
    <Stack
      key={index}
      direction="row"
      alignItems={"center"}
      sx={{
        flex: 1,
        // py: 1,
        py: 1,
        px: 2,
        borderBottom:
          index === locations.length - 1 ? "none" : "1px solid #E0E0E0",
      }}
    >
      <Typography
        sx={{
          flex: 0.3,
          color: (theme) => theme.palette.text.secondary,
          fontSize: " 16px",
          fontWeight: 500,
          lineHeight: " 20px",
          letterSpacing: " 0.32px",
        }}
      >
        {storeData.total_inventory} inventory is available.
      </Typography>{" "}
      <span style={{ flex: 0.1 }}>
        {/* <ArrowIcon />{" "} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M18.4167 7.58334H15.1667C14.5709 7.58334 14.0834 8.07084 14.0834 8.66668C14.0834 9.26251 14.5709 9.75001 15.1667 9.75001H18.4167C20.2042 9.75001 21.6667 11.2125 21.6667 13C21.6667 14.7875 20.2042 16.25 18.4167 16.25H15.1667C14.5709 16.25 14.0834 16.7375 14.0834 17.3333C14.0834 17.9292 14.5709 18.4167 15.1667 18.4167H18.4167C21.4067 18.4167 23.8334 15.99 23.8334 13C23.8334 10.01 21.4067 7.58334 18.4167 7.58334ZM8.66669 13C8.66669 13.5958 9.15419 14.0833 9.75002 14.0833H16.25C16.8459 14.0833 17.3334 13.5958 17.3334 13C17.3334 12.4042 16.8459 11.9167 16.25 11.9167H9.75002C9.15419 11.9167 8.66669 12.4042 8.66669 13ZM10.8334 16.25H7.58335C5.79585 16.25 4.33335 14.7875 4.33335 13C4.33335 11.2125 5.79585 9.75001 7.58335 9.75001H10.8334C11.4292 9.75001 11.9167 9.26251 11.9167 8.66668C11.9167 8.07084 11.4292 7.58334 10.8334 7.58334H7.58335C4.59335 7.58334 2.16669 10.01 2.16669 13C2.16669 15.99 4.59335 18.4167 7.58335 18.4167H10.8334C11.4292 18.4167 11.9167 17.9292 11.9167 17.3333C11.9167 16.7375 11.4292 16.25 10.8334 16.25Z"
            fill="#4F44E0"
          />
        </svg>
      </span>
      {location.action === "" && (
        <Box sx={{ flex: 0.6 }}>
          <PrimaryButton
            // onClick={() =>
            // 	handleClickAction(
            // 		location.wh_id,
            // 		ACTIONS.CREATE_AND_CONNECT,
            // 	)
            // }
            {...bindTrigger(popupState)}
            size="small"
          >
            {/* Create and Connect bluecom location */}
            {/* Create and Map same Location as shopify{" "} */}
            Connect Location
          </PrimaryButton>
          <OutlinedButton
            sx={{
              ml: 3,
              // height: "36px",
              // width: "110px",
              // border: "none",
              color: "#A4262C",
              fontSize: " 14px",
              fontWeight: 500,
              letterSpacing: " 0.14px",
              p: "10px 18px",
              // borderRadius: "7px",
              border: "1px solid rgba(164, 38, 44, 0.20)",
              background: "#FFEAEA",
              "&:hover": {
                border: "1px solid rgba(164, 38, 44, 0.20)",
                background: "#FFEAEA",
              },
            }}
            size="small"
            onClick={() =>
              handleClickAction(location.wh_id, ACTIONS.DO_NOT_LINK)
            }
          >
            Do not Connect
          </OutlinedButton>
          <Popover
            {...bindPopover(popupState)}
            // placement="bottom"
            open={popupState.isOpen}
            // anchorEl={anchorEl}
            // placement={placement}
            transition
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  // maxWidth: "300px",
                  minWidth: "500px",
                  minHeight: "50px",
                  // p: 2,
                  borderRadius: "8px",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                p: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Connect Location
              </Typography>
              <IconButton onClick={() => popupState.close()}>
                <MdClose />
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <CustomRadioGroup
                location={location}
                locationOptions={locationOptions}
                locations={locations}
                errorMessage={errorMessage}
              />
            </Box>
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SecondaryButton
                onClick={handleClose}
                sx={{
                  width: "72px",
                  height: "38px",
                  color: "#101828",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                loading={loading}
                onClick={handleSaveButton}
                sx={{
                  // width: "84px",
                  ml: 2,
                  height: "38px",
                  borderRadius: "5px",
                }}
              >
                Save
              </PrimaryButton>
            </Box>
          </Popover>
        </Box>
      )}
      {(location.action === ACTIONS.CONNECT ||
        location.action === ACTIONS.CREATE_AND_CONNECT) && (
        <Stack
          direction="row"
          alignItems={"center"}
          sx={{
            flex: 0.6,
          }}
        >
          {" "}
          <Typography
            sx={{
              flex: 1,
              color: "#222",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: " 20px",
              letterSpacing: " 0.32px",
            }}
          >
            {location.wh_name}
          </Typography>
          <Box sx={{}}>
            <SecondaryButton
              onClick={() =>
                handleClickAction(location.channel_wh_id, ACTIONS.RESET)
              }
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.767 4.73268C11.2736 4.23591 10.6867 3.84172 10.0403 3.57284C9.39379 3.30395 8.70049 3.16569 8.00033 3.16602C6.58584 3.16602 5.22928 3.72792 4.22909 4.72811C3.2289 5.72831 2.66699 7.08486 2.66699 8.49935C2.66699 9.91384 3.2289 11.2704 4.22909 12.2706C5.22928 13.2708 6.58584 13.8327 8.00033 13.8327C10.487 13.8327 12.5603 12.1327 13.1537 9.83268H11.767C11.4924 10.6124 10.9826 11.2876 10.3079 11.7652C9.63322 12.2429 8.82695 12.4994 8.00033 12.4993C6.93946 12.4993 5.92204 12.0779 5.1719 11.3278C4.42175 10.5776 4.00033 9.56022 4.00033 8.49935C4.00033 7.43848 4.42175 6.42107 5.1719 5.67092C5.92204 4.92078 6.93946 4.49935 8.00033 4.49935C9.10699 4.49935 10.0937 4.95935 10.8137 5.68602L8.66699 7.83268H13.3337V3.16602L11.767 4.73268Z"
                    fill="#4F44E0"
                  />
                </svg>
              }
              sx={{
                height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                borderRadius: "7px",
                p: "10px 18px",
                color: "#4F44E0",
              }}
            >
              Reset
            </SecondaryButton>
            {/* <OutlinedButton
	sx={{
	  ml: 3,
	  height: "36px",
	  width: "100px",
	  border: "1px solid rgba(0,0,0,0.2)",
	  color: "#222",
	  fontSize: " 14px",
	  fontWeight: 600,
	  borderRadius: "7px",
	  p: "10px 18px",
	}}
	onClick={() => handleClickAction(location.wh_id, ACTIONS.RENAME)}
  >
	Rename
  </OutlinedButton> */}
          </Box>
        </Stack>
      )}
      {location.action === ACTIONS.RENAME && (
        <Stack direction="row" sx={{ flex: 0.6 }}>
          <OutlinedInput
            sx={{ flex: 1 }}
            value={location.wh_name}
            inputProps={{
              sx: {
                p: 0,
                px: 2,
              },
            }}
            onChange={(e) =>
              handleLocationNameChange(location.wh_id, e.target.value)
            }
          />
          <Box sx={{ ml: 4 }}>
            <PrimaryButton
              sx={{
                height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                borderRadius: "7px",
                p: "10px 18px",
                mr: 3,
              }}
              onClick={() => handleClickAction(location.wh_id, ACTIONS.CONNECT)}
            >
              Save
            </PrimaryButton>
            <SecondaryButton
              sx={{
                height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                borderRadius: "7px",
                p: "10px 18px",
                color: "#4F44E0",
              }}
              onClick={() => handleClickAction(location.wh_id, ACTIONS.RESET)}
            >
              Cancel
            </SecondaryButton>
          </Box>
        </Stack>
      )}
      {location.action === ACTIONS.DO_NOT_LINK && (
        <Stack direction="row" sx={{ flex: 0.6 }} alignItems="center">
          <Box
            sx={{
              color: " #A4262C",
              fontSize: "14px",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.14px",
              borderRadius: "5px",
              border: "1px solid #A4262C",
              background: "#FFF1F1",
              display: "inline-flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              p: "8px 16px",
              mr: 3,
            }}
          >
            Not Linked to any Location
          </Box>
          <SecondaryButton
            onClick={() => handleClickAction(location.wh_id, ACTIONS.RESET)}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M11.767 4.73268C11.2736 4.23591 10.6867 3.84172 10.0403 3.57284C9.39379 3.30395 8.70049 3.16569 8.00033 3.16602C6.58584 3.16602 5.22928 3.72792 4.22909 4.72811C3.2289 5.72831 2.66699 7.08486 2.66699 8.49935C2.66699 9.91384 3.2289 11.2704 4.22909 12.2706C5.22928 13.2708 6.58584 13.8327 8.00033 13.8327C10.487 13.8327 12.5603 12.1327 13.1537 9.83268H11.767C11.4924 10.6124 10.9826 11.2876 10.3079 11.7652C9.63322 12.2429 8.82695 12.4994 8.00033 12.4993C6.93946 12.4993 5.92204 12.0779 5.1719 11.3278C4.42175 10.5776 4.00033 9.56022 4.00033 8.49935C4.00033 7.43848 4.42175 6.42107 5.1719 5.67092C5.92204 4.92078 6.93946 4.49935 8.00033 4.49935C9.10699 4.49935 10.0937 4.95935 10.8137 5.68602L8.66699 7.83268H13.3337V3.16602L11.767 4.73268Z"
                  fill="#4F44E0"
                />
              </svg>
            }
            sx={{
              height: "36px",
              width: "100px",
              fontSize: " 14px",
              fontWeight: 600,
              borderRadius: "7px",
              p: "10px 18px",
              color: "#4F44E0",
            }}
          >
            Reset
          </SecondaryButton>
        </Stack>
      )}
    </Stack>
  );
};

const LocationTableItem = ({
  index,
  locations,
  location,
  handleClickAction,
  locationOptions,
  currentUser,
}) => {
  const dispatch = useDispatch();
  const { storeData, storeOnboardingData } = useSelector(mapState);
  const { locationName, method, bluecomLocationId } = storeOnboardingData;
  const popupState = usePopupState({
    variant: "popper",
    popupId: "linkButtonPopper",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClose = () => {
    // setAnchorEl(null);
    popupState.close();
  };
  const [loading, setLoading] = React.useState(false);
  // const [locationName, setLocationName] = React.useState("");

  const handleSaveButton = () => {
    if (method === ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY) {
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
        handleClickAction(location.wh_id, ACTIONS.CREATE_AND_CONNECT);
        handleClose();
      }, 2000);
    }
    if (method === ACTION_POPUP_OPTIONS.CREATE_NEW) {
      setLoading(true);

      handleAddNewLocation();
    }
    if (method === ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM) {
      const selectedBluecomLocation = locationOptions.find(
        (item) => item.wh_id === bluecomLocationId
      );
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
        const updatedLocations = storeData.locations.map((item) => {
          if (location.channel_wh_id === item.channel_wh_id) {
            return {
              ...item,
              wh_id: selectedBluecomLocation.wh_id,
              wh_name: selectedBluecomLocation.wh_name,
              action: ACTIONS.CONNECT,
            };
          }
          return item;
        });
        dispatch(
          setStoreData({
            ...storeData,
            locations: updatedLocations,
          })
        );
        dispatch(setBluecomLocationId(""));

        // handleClickAction(location.channel_wh_id, ACTIONS.CONNECT);
        handleClose();
      }, 2000);
    }
  };
  const handleAddNewLocation = () => {
    const URL = WAREHOUSE.ADD_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_name: locationName,
    };
    if (
      storeData.locations.find(
        (item) => item.wh_name.toLowerCase() === locationName.toLowerCase()
      )
    ) {
      setLoading(false);
      enqueueSnackbar("Location already exists!", { variant: "error" });
      setErrorMessage("Location already exists!");
      return;
    }
    if (
      locationOptions.find(
        (item) => item.wh_name.toLowerCase() === locationName.toLowerCase()
      )
    ) {
      setLoading(false);
      enqueueSnackbar("Location already exists!", { variant: "error" });
      setErrorMessage("Location already exists!");
      return;
    }
    // appFetch(URL, data)
    // 	.then((json) => {
    // 		if (json.status === API_RESPONSE_STATUS.SUCCESS) {
    setLoading(false);
    const updatedLocations = storeData.locations.map((item) => {
      if (location.channel_wh_id === item.channel_wh_id) {
        return {
          ...item,
          wh_id: "",
          wh_name: locationName,
          action: ACTIONS.CREATE_AND_CONNECT,
          // channel_wh_id: item.channel_wh_id,
        };
      }
      return item;
    });
    dispatch(
      setStoreData({
        ...storeData,
        locations: updatedLocations,
      })
    );
    dispatch(setStoreOnboardingLocationName(""));
    dispatch(setStoreOnboardingAction(ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY));

    handleClose();
    // }
    // console.log({ message: json.message });
    setLoading(false);
    // })
    // .catch((error) => {
    // 	console.error(error);
    // });
  };

  return (
    <Stack
      key={index}
      direction="row"
      alignItems={"center"}
      sx={{
        flex: 1,
        // py: 1,
        py: 2,
        px: 3,
        borderBottom:
          index === locations.length - 1 ? "none" : "1px solid #E0E0E0",
      }}
    >
      <Typography
        sx={{
          flex: 0.3,
          color: (theme) => theme.palette.text.primary,
          fontSize: " 15px",
          fontWeight: 500,
          lineHeight: " 24px",
          // letterSpacing: " 0.32px",
        }}
      >
        {location.channel_wh_name}
      </Typography>{" "}
      <span style={{ flex: 0.1 }}>
        {/* {`->`} */}
        {/* <ArrowIcon />{" "} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M18.4167 7.58334H15.1667C14.5709 7.58334 14.0834 8.07084 14.0834 8.66668C14.0834 9.26251 14.5709 9.75001 15.1667 9.75001H18.4167C20.2042 9.75001 21.6667 11.2125 21.6667 13C21.6667 14.7875 20.2042 16.25 18.4167 16.25H15.1667C14.5709 16.25 14.0834 16.7375 14.0834 17.3333C14.0834 17.9292 14.5709 18.4167 15.1667 18.4167H18.4167C21.4067 18.4167 23.8334 15.99 23.8334 13C23.8334 10.01 21.4067 7.58334 18.4167 7.58334ZM8.66669 13C8.66669 13.5958 9.15419 14.0833 9.75002 14.0833H16.25C16.8459 14.0833 17.3334 13.5958 17.3334 13C17.3334 12.4042 16.8459 11.9167 16.25 11.9167H9.75002C9.15419 11.9167 8.66669 12.4042 8.66669 13ZM10.8334 16.25H7.58335C5.79585 16.25 4.33335 14.7875 4.33335 13C4.33335 11.2125 5.79585 9.75001 7.58335 9.75001H10.8334C11.4292 9.75001 11.9167 9.26251 11.9167 8.66668C11.9167 8.07084 11.4292 7.58334 10.8334 7.58334H7.58335C4.59335 7.58334 2.16669 10.01 2.16669 13C2.16669 15.99 4.59335 18.4167 7.58335 18.4167H10.8334C11.4292 18.4167 11.9167 17.9292 11.9167 17.3333C11.9167 16.7375 11.4292 16.25 10.8334 16.25Z"
            fill="#4F44E0"
          />
        </svg>
      </span>
      {location.action === "" && (
        <Box sx={{ flex: 0.6 }}>
          <PrimaryButton
            // onClick={() =>
            // 	handleClickAction(
            // 		location.wh_id,
            // 		ACTIONS.CREATE_AND_CONNECT,
            // 	)
            // }
            {...bindTrigger(popupState)}
            size="small"
          >
            {/* Create and Connect bluecom location */}
            {/* Create and Map same Location as shopify{" "} */}
            Connect Location
          </PrimaryButton>
          <OutlinedButton
            sx={{
              ml: 3,
              // height: "36px",
              // width: "110px",
              // border: "none",
              color: "#A4262C",
              fontSize: " 14px",
              fontWeight: 500,
              letterSpacing: " 0.14px",
              p: "10px 18px",
              // borderRadius: "7px",
              border: "1px solid rgba(164, 38, 44, 0.20)",
              background: "#FFEAEA",
              "&:hover": {
                border: "1px solid rgba(164, 38, 44, 0.20)",
                background: "#FFEAEA",
                color: "#A4262C",
              },
            }}
            size="small"
            onClick={() =>
              handleClickAction(location.wh_id, ACTIONS.DO_NOT_LINK)
            }
          >
            Do not Connect
          </OutlinedButton>
          <Popover
            {...bindPopover(popupState)}
            // placement="bottom"
            open={popupState.isOpen}
            // anchorEl={anchorEl}
            // placement={placement}
            transition
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  // maxWidth: "300px",
                  minWidth: "500px",
                  minHeight: "50px",
                  // p: 2,
                  borderRadius: "8px",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                p: 2,
                pl: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Connect Location
              </Typography>
              <IconButton onClick={() => popupState.close()}>
                <MdClose />
              </IconButton>
            </Box>
            <Box sx={{ p: 2, pl: 4 }}>
              <CustomRadioGroup
                location={location}
                locationOptions={locationOptions}
                locations={locations}
                errorMessage={errorMessage}
              />
            </Box>
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SecondaryButton
                onClick={handleClose}
                sx={{
                  width: "72px",
                  height: "38px",
                  color: "#101828",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                loading={loading}
                onClick={handleSaveButton}
                sx={{
                  // width: "84px",
                  ml: 2,
                  height: "38px",
                  borderRadius: "5px",
                }}
              >
                Save
              </PrimaryButton>
            </Box>
          </Popover>
        </Box>
      )}
      {(location.action === ACTIONS.CONNECT ||
        location.action === ACTIONS.CREATE_AND_CONNECT) && (
        <Stack
          direction="row"
          alignItems={"center"}
          sx={{
            flex: 0.6,
          }}
        >
          {" "}
          <Typography
            sx={{
              flex: 1,
              color: (theme) => theme.palette.text.primary,
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: " 24px",
              // letterSpacing: " 0.32px",
            }}
          >
            {location.wh_name}
          </Typography>
          <Box sx={{ ml: 3 }}>
            <SecondaryButton
              onClick={() =>
                handleClickAction(location.channel_wh_id, ACTIONS.RESET)
              }
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.767 4.73268C11.2736 4.23591 10.6867 3.84172 10.0403 3.57284C9.39379 3.30395 8.70049 3.16569 8.00033 3.16602C6.58584 3.16602 5.22928 3.72792 4.22909 4.72811C3.2289 5.72831 2.66699 7.08486 2.66699 8.49935C2.66699 9.91384 3.2289 11.2704 4.22909 12.2706C5.22928 13.2708 6.58584 13.8327 8.00033 13.8327C10.487 13.8327 12.5603 12.1327 13.1537 9.83268H11.767C11.4924 10.6124 10.9826 11.2876 10.3079 11.7652C9.63322 12.2429 8.82695 12.4994 8.00033 12.4993C6.93946 12.4993 5.92204 12.0779 5.1719 11.3278C4.42175 10.5776 4.00033 9.56022 4.00033 8.49935C4.00033 7.43848 4.42175 6.42107 5.1719 5.67092C5.92204 4.92078 6.93946 4.49935 8.00033 4.49935C9.10699 4.49935 10.0937 4.95935 10.8137 5.68602L8.66699 7.83268H13.3337V3.16602L11.767 4.73268Z"
                    fill="#4F44E0"
                  />
                </svg>
              }
              sx={{
                // height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                // borderRadius: "7px",
                p: "10px 18px",
                color: "#4F44E0",
              }}
              size="small"
            >
              Reset
            </SecondaryButton>
            {/* <OutlinedButton
              sx={{
                ml: 3,
                height: "36px",
                width: "100px",
                border: "1px solid rgba(0,0,0,0.2)",
                color: "#222",
                fontSize: " 14px",
                fontWeight: 600,
                borderRadius: "7px",
                p: "10px 18px",
              }}
              onClick={() => handleClickAction(location.wh_id, ACTIONS.RENAME)}
            >
              Rename
            </OutlinedButton> */}
          </Box>
        </Stack>
      )}
      {location.action === ACTIONS.RENAME && (
        <Stack direction="row" sx={{ flex: 0.6 }}>
          <OutlinedInput
            sx={{ flex: 1 }}
            value={location.wh_name}
            inputProps={{
              sx: {
                p: 0,
                px: 2,
              },
            }}
            onChange={(e) =>
              handleLocationNameChange(location.wh_id, e.target.value)
            }
          />
          <Box sx={{ ml: 4 }}>
            <PrimaryButton
              sx={{
                height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                borderRadius: "7px",
                p: "10px 18px",
                mr: 3,
              }}
              onClick={() => handleClickAction(location.wh_id, ACTIONS.CONNECT)}
            >
              Save
            </PrimaryButton>
            <SecondaryButton
              sx={{
                height: "36px",
                width: "100px",
                fontSize: " 14px",
                fontWeight: 600,
                // borderRadius: "7px",
                p: "10px 18px",
                color: "#4F44E0",
              }}
              onClick={() => handleClickAction(location.wh_id, ACTIONS.RESET)}
            >
              Cancel
            </SecondaryButton>
          </Box>
        </Stack>
      )}
      {location.action === ACTIONS.DO_NOT_LINK && (
        <Stack direction="row" sx={{ flex: 0.6 }} alignItems="center">
          <Box
            sx={{
              color: " #A4262C",
              fontSize: "14px",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.14px",
              borderRadius: "5px",
              border: "1px solid #A4262C",
              background: "#FFF1F1",
              display: "inline-flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              p: "8px 16px",
              mr: 3,
            }}
          >
            Not Connected to any Location
          </Box>
          <div
            style={{
              flex: 1,
            }}
          />
          <SecondaryButton
            onClick={() => handleClickAction(location.wh_id, ACTIONS.RESET)}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M11.767 4.73268C11.2736 4.23591 10.6867 3.84172 10.0403 3.57284C9.39379 3.30395 8.70049 3.16569 8.00033 3.16602C6.58584 3.16602 5.22928 3.72792 4.22909 4.72811C3.2289 5.72831 2.66699 7.08486 2.66699 8.49935C2.66699 9.91384 3.2289 11.2704 4.22909 12.2706C5.22928 13.2708 6.58584 13.8327 8.00033 13.8327C10.487 13.8327 12.5603 12.1327 13.1537 9.83268H11.767C11.4924 10.6124 10.9826 11.2876 10.3079 11.7652C9.63322 12.2429 8.82695 12.4994 8.00033 12.4993C6.93946 12.4993 5.92204 12.0779 5.1719 11.3278C4.42175 10.5776 4.00033 9.56022 4.00033 8.49935C4.00033 7.43848 4.42175 6.42107 5.1719 5.67092C5.92204 4.92078 6.93946 4.49935 8.00033 4.49935C9.10699 4.49935 10.0937 4.95935 10.8137 5.68602L8.66699 7.83268H13.3337V3.16602L11.767 4.73268Z"
                  fill="#4F44E0"
                />
              </svg>
            }
            sx={{
              // height: "36px",
              width: "100px",
              fontSize: " 14px",
              fontWeight: 600,
              // borderRadius: "7px",
              p: "10px 18px",
              color: "#4F44E0",
            }}
            size="small"
          >
            Reset
          </SecondaryButton>
        </Stack>
      )}
    </Stack>
  );
};
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="15"
    viewBox="0 0 21 15"
    fill="none"
  >
    <path
      d="M1 6.5C0.447715 6.5 0 6.94772 0 7.5C0 8.05228 0.447715 8.5 1 8.5V6.5ZM20.7071 8.20711C21.0976 7.81658 21.0976 7.18342 20.7071 6.79289L14.3431 0.428932C13.9526 0.0384078 13.3195 0.0384078 12.9289 0.428932C12.5384 0.819457 12.5384 1.45262 12.9289 1.84315L18.5858 7.5L12.9289 13.1569C12.5384 13.5474 12.5384 14.1805 12.9289 14.5711C13.3195 14.9616 13.9526 14.9616 14.3431 14.5711L20.7071 8.20711ZM1 8.5H20V6.5H1V8.5Z"
      fill="#B2B2B3"
    />
  </svg>
);

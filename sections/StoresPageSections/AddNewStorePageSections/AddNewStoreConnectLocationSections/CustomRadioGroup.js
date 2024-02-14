import * as React from "react";
import { OutlinedInput, styled } from "@mui/material/";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import { WAREHOUSE } from "constants/API_URL";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import {
  setBluecomLocationId,
  setStoreData,
  setStoreOnboardingAction,
  setStoreOnboardingLocationName,
} from "redux/stores/storeSlice";
import { useRouter } from "next/router";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#4F44E0",
  border: "none",
  outline: "none",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#4F44E0",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export const ACTION_POPUP_OPTIONS = {
  MAP_WITH_SHOPIFY: "create-and-connect",
  MAP_WITH_BLUECOM: "connect",
  CREATE_NEW: "create-new",
};

const selectedLabelStyles = {
  color: "#222",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "20px",
};
const labelStyles = {
  color: "#222",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
};
const radioContainerStyle = {
  marginTop: "0px",
  marginBottom: "16px",
};

const mapState = ({ user, storesData }) => ({
  currentUser: user.currentUser,
  storeData: storesData.storeData,
  storeOnboardingData: storesData.storeOnboardingData,
});
export default function CustomRadioGroup({
  location,
  locationOptions,
  locations,
  errorMessage,
}) {
  const router = useRouter();
  const { channel } = router.query;
  const { currentUser, storeData, storeOnboardingData } = useSelector(mapState);
  const dispatch = useDispatch();
  const { locationName, method, bluecomLocationId } = storeOnboardingData;
  // const [value, setValue] = React.useState(ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM);
  // const [locationName, setLocationName] = React.useState("");
  const handleChange = (event) => {
    // setValue(event.target.value);
    dispatch(setStoreOnboardingAction(event.target.value));
  };

  const locationsInTable = storeData.locations || [];

  const locationOptionsWithLabel =
    locationOptions.map((item) => ({
      label: item.wh_name,
      value: item.wh_id,
    })) || [];

  // filter the locationOptions to render the options which are not in the locations table,
  // filter them with the wh_id, if wh_id is same , do not show them in locationOptions
  const filteredLocationOptions = locationOptionsWithLabel.filter(
    (item) =>
      !locationsInTable.find((location) => location.wh_id === item.value)
  );
  console.log({
    locationsInTable,
    locationOptionsWithLabel,
    filteredLocationOptions,
  });

  const handleAddNewLocation = () => {
    const URL = WAREHOUSE.ADD_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_name: locationName,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === API_RESPONSE_STATUS.SUCCESS) {
        const updatedLocations = storeData.locations.map((item) => {
          if (location.channel_wh_id === item.channel_wh_id) {
            return {
              ...item,
              wh_id: json.wh_id,
              wh_name: json.wh_name,
            };
          }
          return item;
        });
        dispatch(
          setStoreData({
            ...storeData,
            locations: [updatedLocations],
          })
        );
      }
    });
  };
  const selectedBluecomLocation = locationOptionsWithLabel.find(
    (item) => item.value === bluecomLocationId
  );
  console.log({ selectedBluecomLocation });
  return (
    <FormControl>
      {/* <FormLabel id="demo-customized-radios">Gender</FormLabel> */}
      <RadioGroup
        // defaultValue="create-and-connect"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        value={method}
        onChange={handleChange}
      >
        {Array.isArray(locationOptionsWithLabel) &&
          locationOptionsWithLabel.length > 0 && (
            <div style={{ ...radioContainerStyle }}>
              <FormControlLabel
                value={ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM}
                control={<BpRadio />}
                label={
                  <>
                    <span
                      style={
                        method === ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM
                          ? selectedLabelStyles
                          : labelStyles
                      }
                    >
                      Connect with Bluecom Location
                    </span>
                  </>
                }
              />
              {method === ACTION_POPUP_OPTIONS.MAP_WITH_BLUECOM && (
                <FormSelectInput
                  placeholder="Select Location"
                  noPadding
                  value={selectedBluecomLocation}
                  onChange={(e) => dispatch(setBluecomLocationId(e.value))}
                  containerStyles={{
                    marginTop: 0,
                    marginLeft: "24px",
                  }}
                  options={filteredLocationOptions}
                />
              )}{" "}
            </div>
          )}{" "}
        {Array.isArray(locations) &&
          locations.length > 0 &&
          channel === "shopify" && (
            <div style={{ ...radioContainerStyle }}>
              <FormControlLabel
                value={ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY}
                control={<BpRadio />}
                label={
                  <>
                    <span
                      style={
                        method === ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY
                          ? selectedLabelStyles
                          : labelStyles
                      }
                    >
                      Use Shopify Location Name
                    </span>
                    <br />
                  </>
                }
              />
              {method === ACTION_POPUP_OPTIONS.MAP_WITH_SHOPIFY && (
                <span
                  style={{
                    marginLeft: "24px",
                    color: "#555",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Location:{" "}
                  <span
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      justifyContent: "center",
                      alignItems: " center",
                      gap: "10px",
                      borderRadius: "3px",
                      border: "1px solid #B1ACF4",
                      background: "#F5F8FF",
                      color: " #6532D2",
                      fontSize: " 16px",
                      fontWeight: 500,
                      lineHeight: "20px",
                      letterSpacing: "0.32px",
                      marginLeft: "16px",
                    }}
                  >
                    {location.channel_wh_name}{" "}
                  </span>
                </span>
              )}{" "}
            </div>
          )}{" "}
        <div
          style={{
            ...radioContainerStyle,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            value={ACTION_POPUP_OPTIONS.CREATE_NEW}
            control={<BpRadio />}
            label={
              <>
                {" "}
                <span
                  style={
                    method === ACTION_POPUP_OPTIONS.CREATE_NEW
                      ? selectedLabelStyles
                      : labelStyles
                  }
                >
                  Create a New Location
                </span>
              </>
            }
          />
          {method === ACTION_POPUP_OPTIONS.CREATE_NEW && (
            <>
              <OutlinedInput
                sx={{ ml: 3 }}
                inputProps={{
                  sx: {
                    p: "10px 14px",
                  },
                }}
                value={locationName}
                placeholder={`Enter Location`}
                onChange={(e) =>
                  dispatch(setStoreOnboardingLocationName(e.target.value))
                }
                error={Boolean(errorMessage)}
              />
              {errorMessage && (
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "24px",
                  }}
                >
                  {errorMessage}
                </span>
              )}
            </>
          )}{" "}
        </div>
      </RadioGroup>
    </FormControl>
  );
}

import { Box, Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { MERCHANT, PRODUCT } from "constants/API_URL";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "redux/user/userSlice";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const MerchantOnboardingSection = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState(currentUser.merchant_first_name);
  const [lastName, setLastName] = useState(currentUser.merchant_last_name);
  // const [email,setEm]
  const [address, setAddress] = useState(currentUser.merchant_address);
  const [mobileNumber, setMobileNumber] = useState(currentUser.merchant_phone);
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");

  const userAddress =
    (address || state || postalCode) && `${address} , ${state} - ${postalCode}`;
  const handleUpdateProfile = () => {
    const URL = MERCHANT.UPDATE;
    const data = {
      merchant_address: userAddress,
      merchant_email: currentUser.merchant_email,
      merchant_first_name: firstName,
      merchant_id: currentUser.merchant_id,
      merchant_last_name: lastName,
      merchant_phone: mobileNumber,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          fetchProfileData();
          enqueueSnackbar(json.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const fetchProfileData = () => {
    const URL = MERCHANT.FETCH_DATA;
    const data = {
      merchant_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(updateUserData(json.result[0]));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "90vh" }}>
      <BaseCard sx={{ padding: "32px", minWidth: "500px" }}>
        <SectionTitleText>Add your details</SectionTitleText>
        <Grid container spacing={2} sx={{ paddingBottom: "16px" }}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <TextInput
          label="Email"
          type="email"
          value={currentUser && currentUser.merchant_email}
        />
        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <TextInput
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />{" "}
        <Grid container spacing={2} sx={{ paddingBottom: "16px" }}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
        </Grid>
        <PrimaryButton
          sx={{ marginTop: "16px", width: "100%" }}
          onClick={() => handleUpdateProfile()}
        >
          Save
        </PrimaryButton>
      </BaseCard>
    </Box>
  );
};

export default MerchantOnboardingSection;

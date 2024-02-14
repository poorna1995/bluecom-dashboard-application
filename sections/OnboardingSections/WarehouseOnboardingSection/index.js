import { LabelRounded } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { minWidth } from "@mui/system";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { WAREHOUSE } from "constants/API_URL";
import { flatMap } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import validator from "validator";
import SuccessDialogForPO from "../PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import { fetchPurchaseOrderData } from "redux/purchaseOrders/purchaseOrders.sagas";
import CreatableMultiSelect from "components/Common/Inputs/SelectInput/CreatableMultiSelect";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const numberStyling = {
  minWidth: "70px",
  maxWidth: "70px",
};

const textContainerStyle = {
  maxWidth: "100%",
  marginTop: "16px",
};
const containerStyle = {
  maxWidth: "100%",
  marginTop: "8px	",
};

function WarehouseOnboardingSection({
  pageTitle,
  buttonName,
  data = {},
  usedIn = "onboarding",
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const maxWidth = typeof window !== "undefined" && window.innerWidth - 850;
  const [loading, setLoading] = useState(false);
  const [warehouseName, setWarehouseName] = React.useState(data.wh_name ?? "");
  const [contactName, setContactName] = React.useState(data.contact_name ?? "");
  const [email, setEmail] = React.useState(data.email ?? "");
  const [emailError, setEmailError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(data.phone ?? "");
  const [phoneNumberError, setPhoneNumberError] = React.useState("");
  const [address, setAddress] = React.useState(data.address_1 ?? "");
  const [zipCode, setZipCode] = React.useState(data.zipcode ?? "");

  const countryWithLabel = {
    label: data.country,
    value: data.country,
  };
  const [country, setCountry] = React.useState(countryWithLabel ?? "");
  const [state, setState] = React.useState(data.state ?? "");
  const [city, setCity] = React.useState(data.city ?? "");

  const countryCodeWithLabel = {
    label: data.country_code || "+91 India",
    value: data.country_code || "+91",
  };
  const [countryCode, setCountryCode] = React.useState(
    countryCodeWithLabel ?? ""
  );

  const [countryList, setCountryList] = useState([]);
  const [countryFlag, setCountryFlag] = useState([]);

  useEffect(() => {
    setWarehouseName(data.wh_name ?? "");
    setContactName(data.contact_name ?? "");
    setEmail(data.email ?? "");
    setPhoneNumber(data.phone ?? "");
    setAddress(data.address_1 ?? "");
    setZipCode(data.zipcode ?? "");
    setCountry(countryWithLabel ?? "");
    setState(data.state ?? "");
    setCity(data.city ?? "");
    setCountryCode(countryCodeWithLabel ?? "");
  }, [
    data.wh_name,
    data.contact_name,
    data.email,
    data.phone,
    data.address_1,
    data.zipcode,
    data.country,
    data.state,
    data.city,
    data.country_code,
  ]);

  const handleFetchCountry = () => {
    const URL = WAREHOUSE.COUNTRY;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setCountryList(data.result);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // const handleFetchCountryFlag = () => {
  //   const URL = WAREHOUSE.COUNTRY_FLAG;
  //   const data = {
  //     country: country?.value,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       console.log("json", json);
  //       setCountryFlag(json.result[0].country_code);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  useEffect(() => {
    handleFetchCountry();
  }, []);

  const countryListOptions =
    Array.isArray(countryList) &&
    countryList.map((item) => {
      return {
        label: item,
        value: item,
      };
    });

  const [openDiscardDialog, setOpenDiscardDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const handleUpdateWarehouseDialog = () => {
    setSaveButtonLoading(true);
    enqueueSnackbar("Location updated successfully", {
      variant: "success",
    });

    setOpenUpdateDialog(false);
    router.push("/app/warehouse");
  };

  const handleRegisterWarehouse = () => {
    // setLoading(true);
    setSaveButtonLoading(true);
    const URL = WAREHOUSE.ADD_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_name: warehouseName,
      contact_name: contactName,
      email: email,
      phone: phoneNumber,
      address_1: address,
      zipcode: zipCode,
      city: city,
      state: state,
      country: country?.value,
      country_code: countryCode?.value,
    };
    // setLoading(true);
    setSaveButtonLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setOpenSaveDialog(true);
          enqueueSnackbar("Location added successfully", {
            variant: "success",
          });

          // router.push("/app/warehouse");
          // setLoading(false);
          setSaveButtonLoading(false);
        }
        console.log({ json });
        // router.push("/app/warehouse");
      })
      .catch((error) => {
        console.log({ error });
        // setLoading(false);
        setSaveButtonLoading(false);
        enqueueSnackbar("Failed to create location. Please try again later", {
          variant: "error",
        });
      });
  };

  console.log({ country, state, city });

  // Validate email after compfter typing
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleEmailBlur = (e) => {
    const value = e.target.value;
    if (value && !validator.isEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  // const handlePhoneNumberBlur = (e) => {
  //   const value = e.target.value;
  //   if (value && !validator.isMobilePhone(value, "any")) {
  //     setPhoneNumberError("Please enter a valid phone number");
  //   } else {
  //     setPhoneNumberError("");
  //   }
  // };

  // const updateWarehouse = (updatedData) => {
  //   const URL = WAREHOUSE.UPDATE_WAREHOUSE;
  //   const data = {
  //     user_id: currentUser.merchant_id,
  //     wh_id,
  //     ...updatedData,
  //   };
  //   appFetch(URL, data).then((json) => {
  //     console.log(json);
  //     setData(json.result[0]);
  //   });
  // };

  const warehouseID = data.wh_id;
  const warehouseData = data;
  // save the updated states to the database
  const handleSave = () => {
    // setLoading(true);
    setSaveButtonLoading(true);
    const URL = WAREHOUSE.UPDATE_WAREHOUSE;
    const data = {
      ...warehouseData,
      user_id: currentUser.merchant_id,
      wh_id: warehouseID,
      wh_name: warehouseName,
      contact_name: contactName,
      email: email,
      phone: phoneNumber,
      address_1: address,
      zipcode: zipCode,
      city: city,
      state: state,
      country: country?.value,
      country_code: countryCode?.value,
    };
    // setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          // setUpdatedData(json);
          // setLoading(false);
          setSaveButtonLoading(false);

          setOpenUpdateDialog(true);
          // enqueueSnackbar("Location Updated Successfully", { variant: "success" });
        }

        // router.push("/app/warehouse");
      })
      .catch((error) => {
        console.log({ error });
        // setLoading(false);
        setSaveButtonLoading(false);
        enqueueSnackbar("Failed to update warehouse. Please try again later", {
          variant: "error",
        });
      });
  };

  const disabledButton =
    !warehouseName ||
    // !contactName ||
    !email ||
    !phoneNumber ||
    // !address ||
    // !zipCode ||
    // !country.value ||
    // !state ||
    // !city ||
    !countryCode.value;

  return (
    <>
      {loading && <PageLoader />}

      <Container
        // maxWidth="md"

        sx={{
          width: usedIn === "onboarding" ? "60%" : "60%",
          ml: usedIn === "edit" ? 0 : 55,
          alignItems: "center",
          justifyContent: "center",
          // minWidth: "65%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "10px",
            top: "62.5px",
            width: "100%",
            position: "sticky",
            backgroundColor: "white",
            // borderBottom: "1px solid #E5E5E5",
            zIndex: "100",
          }}
        >
          <SectionTitleText
            sx={{
              fontSize: "28px",
              fontWeight: "700px",
              color: "#484A9E",
              width: "100%",
              paddingBottom: "10px",
              // borderBottom: "1px solid #E5E5E5",
            }}
          >
            {usedIn === "edit" ? (
              <span
                style={{
                  // border: "1px solid #E0E0E0",
                  borderRadius: "4px",
                  marginRight: 2,
                  paddingBottom: "5px",
                }}
              >
                <IconButton onClick={() => router.push(`/app/warehouse`)}>
                  <MdArrowBack />
                </IconButton>
              </span>
            ) : null}
            {pageTitle ?? `Add new Location`}
            {/* <span>
              <IconButton onClick={() => router.push(`/app/warehouse`)}>
                <MdArrowBack />
              </IconButton>
            </span>
            {pageTitle ?? `Add new Location`} */}
          </SectionTitleText>

          <SectionTitleText
            sx={{
              fontSize: "24px",
              fontWeight: "700px",
              color: "#484A9E",
              width: "100%",
              marginTop: "16px",
              marginLeft: 0,
            }}
          >
            General Details
          </SectionTitleText>
        </Box>

        <Container
          sx={{
            width: "82%",
            marginLeft: 0,
            // minWidth: "65%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              <TextInput
                title="Location Name"
                value={warehouseName}
                containerStyles={textContainerStyle}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
              />
              <TextInput
                title="Username"
                type="text"
                value={contactName}
                containerStyles={textContainerStyle}
                onChange={(e) => setContactName(e.target.value)}
                // required
              />
            </Box>
            <TextInput
              title="Email"
              value={email}
              containerStyles={textContainerStyle}
              error={emailError}
              helperText={emailError}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              required
            />
            <SectionTitleText
              sx={{
                marginTop: "24px",
                fontSize: "15px",
                fontWeight: "500",
                marginBottom: "-20px",
                color: "#222222",
              }}
            >
              Phone Number *
            </SectionTitleText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "16px",
                alignItems: "center",
                width: "48%",
              }}
            >
              <FormSelectInput
                containerStyles={{
                  marginTop: "-8px",
                  width: "240px",
                  // borderRadius: "5px",
                }}
                // title="Country Code"
                placeholder="Select"
                options={[
                  { value: "+91", label: "+91 India" },
                  { value: "+1", label: "+1 USA" },
                  { value: "+44", label: "+44 UK" },
                ]}
                value={countryCode}
                required
                onChange={(e) => setCountryCode(e)}
              />
              <TextInput
                // title="Phone Number"
                numberStyling={numberStyling}
                placeholder="Enter Phone Number"
                type="number"
                value={phoneNumber}
                containerStyles={textContainerStyle}
                error={phoneNumberError}
                helperText={phoneNumberError}
                onChange={handlePhoneNumberChange}
                // onBlur={handlePhoneNumberBlur}
                required
              />
            </Box>
            {/* <Divider sx={{ mt: "21px" }} /> */}
            {/* </Box>
        <Box sx={{ mb: "30px" }}> */}
            <TextInput
              title="Address"
              placeholder="Eg: India, USA, etc"
              value={address}
              // multiline
              containerStyles={textContainerStyle}
              // required
              onChange={(e) => setAddress(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              <TextInput
                title="Zip Code"
                value={zipCode}
                type="number"
                containerStyles={textContainerStyle}
                // required
                onChange={(e) => setZipCode(e.target.value)}
              />
              <TextInput
                title="City"
                value={city}
                containerStyles={textContainerStyle}
                // required
                onChange={(e) => setCity(e.target.value)}
              />
              {/* <FormSelectInput
                title="City"
                placeholder="Select City"
                options={[
                  { value: "Bangalore", label: "Bangalore" },
                  { value: "Mysore", label: "Mysore" },
                  { value: "Chennai", label: "Chennai" },
                  { value: "Coimbatore", label: "Coimbatore" },
                ]}
                value={city}
                required
                onChange={(e) => setCity(e)}
              /> */}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                marginBottom: "100px",
              }}
            >
              <TextInput
                title="State"
                value={state}
                containerStyles={textContainerStyle}
                // required
                onChange={(e) => setState(e.target.value)}
              />
              {/* <FormSelectInput
                title="State"
                placeholder="Select State"
                options={[
                  { value: "Karnataka", label: "Karnataka" },
                  { value: "Tamil Nadu", label: "Tamil Nadu" },
                  { value: "Kerala", label: "Kerala" },
                ]}
                value={state}
                required
                onChange={(e) => setState(e)}
              /> */}
              {/* <FormSelectInput
                title="Country"
                placeholder="Select Country"
                options={
                  //   [
                  //   { value: "India", label: "India" },
                  //   { value: "USA", label: "USA" },
                  //   { value: "UK", label: "UK" },
                  // ]
                  countryListOptions
                }
                value={country}
                required
                setValue={setCountry}
                onChange={(e) => setCountry(e)}
              /> */}

              <FormSelectInput
                title="Country"
                placeholder="Select Country"
                options={countryListOptions}
                value={data.country && country}
                // required
                setValue={setCountry}
                onChange={(e) => setCountry(e)}
              />
            </Box>
          </Box>
        </Container>

        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            // justifyContent: "center",
            // alignItems: "center",
            gap: "21px",
            position: "fixed",
            backgroundColor: "white",
            bottom: "0",
            maxWidth: "1800px",
            width: "100%",
            // width: "850px",
            py: 2,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            // ml: "-750px",
            alignItems: usedIn === "onboarding" ? "center" : "flex-start",
            justifyContent: usedIn === "onboarding" ? "center" : "flex-start",
          }}
        >
          <Box
            sx={{
              ml: usedIn === "onboarding" ? -120 : 25,
              display: "flex",
              gap: "8px",
            }}
          >
            {/* <SecondaryButton onClick={() => router.push(`/app/warehouse`)}> */}
            <SecondaryButton onClick={() => setOpenDiscardDialog(true)}>
              Discard
            </SecondaryButton>

            <PrimaryButton
              onClick={() =>
                usedIn === "onboarding"
                  ? handleRegisterWarehouse()
                  : handleSave()
              }
              disabled={disabledButton || saveButtonLoading}
            >
              {saveButtonLoading && (
                <CircularProgress
                  thickness={4}
                  size={20}
                  sx={{ mr: 2, color: "#fff" }}
                />
              )}
              {buttonName ?? `Save`}
            </PrimaryButton>
          </Box>
        </Box>
      </Container>

      <SuccessDialogForPO
        // icon={<AlertIconPO />}
        open={openDiscardDialog}
        handleClose={() => setOpenDiscardDialog(false)}
        title="Unsaved Changes?"
        message={<>Do you want to save or discard changes?</>}
        onDelete={() => router.push(`/app/warehouse`)}
        primaryButtonName="Confirm"
        secondaryButtonName="Cancel"
        onCancel={() => setOpenDiscardDialog(false)}
        primaryButtonProps={{
          sx: {
            width: "220px",
            backgroundColor: "#DA0101",
            "&:hover": {
              backgroundColor: "#DA0101",
            },

            margin: "0 auto",
          },
        }}
      />

      <SuccessDialogForPO
        open={openSaveDialog}
        handleClose={() => setOpenSaveDialog(false)}
        title="Location Added Successfully"
        onCancel={() => setOpenSaveDialog(false)}
        message="Location has been added to the List."
        onDelete={() => router.push(`/app/warehouse`)}
        primaryButtonName="Go to Dashboard"
        primaryButtonProps={{
          sx: {
            width: "220px",

            margin: "0 auto",
          },
        }}
      />

      <SuccessDialogForPO
        icon={<AlertIconPO />}
        open={openUpdateDialog}
        loading={saveButtonLoading}
        handleClose={() => setOpenUpdateDialog(false)}
        title="Update Location?"
        message={<>Are you sure you want to Update data of your Location ?</>}
        onDelete={() => handleUpdateWarehouseDialog()}
        primaryButtonName="Confirm"
        onCancel={() => setOpenUpdateDialog(false)}
        primaryButtonProps={{
          sx: {
            width: "220px",

            margin: "0 auto",
          },
        }}
      />
    </>
  );
}

export default WarehouseOnboardingSection;

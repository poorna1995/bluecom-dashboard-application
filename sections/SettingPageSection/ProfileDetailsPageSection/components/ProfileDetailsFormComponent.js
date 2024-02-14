import { Box, Grid, Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CameraIcon from "components/Common/Icons/CameraIcon";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect, useState } from "react";
import profilePicture from "public/assets/ProfilePicture.png";
import validator from "validator";
import { MERCHANT, WAREHOUSE } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { enqueueSnackbar } from "notistack";
import { useSnackbar } from "notistack";

import { useSelector } from "react-redux";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { set } from "date-fns";
import PasswordInput from "components/Common/Inputs/TextInput/PasswordInput";
import CurrencyInput from "components/Common/Inputs/SelectInput/CurrencyInput";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

/**
 * merchant_address
merchant_company
merchant_country
merchant_currency
merchant_email
merchant_first_name
merchant_id
merchant_image_url
merchant_industry
merchant_job_role
merchant_last_name
merchant_phone
 */
export default function ProfileDetailsFormComponent({
  data = {},
  usedIn = "Settings",
  refetch = () => {},
}) {
  const { currentUser } = useSelector(mapState);
  const [countryList, setCountryList] = useState([]);
  const [selectedFile, setSelectedFile] = React.useState(
    data.merchant_image_url ?? ""
  );
  const [selectedImage, setSelectedImage] = React.useState("");
  const [showSelectedFile, setShowSelectedFile] = useState(true);

  const [firstName, setFirstName] = useState(data.merchant_first_name ?? "");
  const [lastName, setLastName] = useState(data.merchant_last_name ?? "");

  const [email, setEmail] = useState(data.merchant_email ?? "");
  const [emailError, setEmailError] = React.useState("");

  const jobRoleWithLabel = {
    label: data.merchant_job_role,
    value: data.merchant_job_role,
  };
  const [jobRole, setjobRole] = useState(jobRoleWithLabel ?? "");

  const countryCodeWithLabel = {
    label: data.merchant_country_code,
    value: data.merchant_country_code,
  };
  const [countryCode, setCountryCode] = useState(countryCodeWithLabel ?? "");
  const [phoneNumber, setPhoneNumber] = useState(data.merchant_phone ?? "");
  const [phoneNumberError, setPhoneNumberError] = React.useState("");

  const [companyName, setCompanyName] = useState(data.merchant_company ?? "");

  const currencyWithLabel = {
    label: data.merchant_currency,
    value: data.merchant_currency,
  };

  const [currency, setCurrency] = useState(currencyWithLabel ?? "");

  const industryWithLabel = {
    label: data.merchant_industry,
    value: data.merchant_industry,
  };
  const [industry, setIndustry] = useState(industryWithLabel ?? "");

  const countryWithLabel = {
    label: data.merchant_country,
    value: data.merchant_country,
  };

  const [country, setCountry] = useState(countryWithLabel ?? "");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setFirstName(data.merchant_first_name ?? "");
    setLastName(data.merchant_last_name ?? "");
    setEmail(data.merchant_email ?? "");
    setjobRole(jobRoleWithLabel ?? "");
    setCountryCode(countryCodeWithLabel ?? "");
    setPhoneNumber(data.merchant_phone ?? "");
    setCompanyName(data.merchant_company ?? "");
    setIndustry(industryWithLabel ?? "");
    setCountry(countryWithLabel ?? "");
    setCurrency(currencyWithLabel ?? "");
    setCurrentPassword(data.currentPassword ?? "");
    setNewPassword(data.newPassword ?? "");
  }, [data]);

  const ProfileData = data;
  const handleUpdateProfile = (e) => {
    const URL = MERCHANT.PROFILE;
    const data = {
      // merchant_image_url: selectedFile,
      merchant_first_name: firstName,
      merchant_last_name: lastName,
      merchant_email: email,
      merchant_job_role: jobRole.value || "",
      merchant_phone: phoneNumber || "",
      merchant_company: companyName,
      merchant_industry: industry.value || "",
      merchant_country: country.value || "",
      merchant_currency: currency.value || "",
      merchant_id: currentUser.merchant_id,
      merchant_country_code: countryCode.value || "",

      // selectedFile: selectedFile,
    };
    setLoading(true);
    if (selectedImage) {
      return compressImageAndUpload(
        e,
        selectedImage,
        currentUser.merchant_id
      ).then((res) => {
        console.log({ res });
        if (res) {
          appFetch(URL, { ...data, merchant_image_url: res })
            .then((json) => {
              enqueueSnackbar(json.message, {
                variant: "success",
              });
              refetch();
              // return router.push(
              //   `/onboarding/vendors/${json.vendor_id}?step=products&id={res.vendor_id}`
              // );
              setLoading(false);
            })
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
              setLoading(false);
            });
        }
      });
    }

    setLoading(true);
    appFetch(URL, { ...data })
      .then((json) => {
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        setLoading(false);
        refetch();
        console.log({ json });
        // return router.push("/app/vendors");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    setSelectedImage(file);
    setShowSelectedFile(true);
    // setLoading(true);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validator.isEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value && !validator.isMobilePhone(value, "any")) {
      setPhoneNumberError("Please enter a valid phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    const URL = MERCHANT.CHANGE_PASSWORD;
    const data = {
      merchant_id: currentUser.merchant_id,
      current_password: currentPassword,
      new_password: newPassword,
    };

    appFetch(URL, { ...data })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
        }
        setLoading(false);
        refetch();
        console.log({ json });
        // return router.push("/app/vendors");
        enqueueSnackbar(json.message, { variant: "error" });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setLoading(false);
      });
  };

  const handleFetchCountry = () => {
    const URL = WAREHOUSE.COUNTRY;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setCountryList(data.result);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

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

  const labelStyles = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "6px",
    borderRadius: "5px",
  };

  const textContainerStyle = {
    maxWidth: "100%",
    marginTop: "8px",
  };
  const containerStyle = {
    // paddingBottom: "24px",
    maxWidth: "100%",
    color: "#0000000",
    fontSize: "16px",
    fontWeight: "600",
    maxHeight: "100px",
  };
  const checkProfileImage = (selectedFile, data) => {
    if (selectedFile) {
      return (
        <AppImage
          src={selectedFile}
          sx={{
            borderRadius: "100%",
            border: "1px solid rgb(208, 213, 221)",
          }}
          width="100"
          height="100"
        />
      );
    } else if (data.merchant_image_url) {
      return (
        <AppImage
          src={data.merchant_image_url}
          sx={{
            borderRadius: "100%",
            border: "1px solid rgb(208, 213, 221)",
          }}
          width="100"
          height="100"
        />
      );
    } else {
      return (
        <Avatar
          sx={{
            width: 100,
            height: 100,
          }}
        >
          {data.merchant_first_name?.charAt(0)}
        </Avatar>
      );
    }
  };
  const profileImage = checkProfileImage(selectedFile, data);
  return (
    <Box
      sx={{
        // mx: "300px",
        // mx: "auto",
        mb: "60px",
        maxWidth: "750px",
        display: "flex",
        flexDirection: "column",
        pl: "16px",
      }}
    >
      {loading && <PageLoader />}
      <SectionTitleText
        sx={{
          color: "#484A9E",
          fontSize: "19px",
          fontWeight: 600,
          mt: "24px",
          mb: "24px",
        }}
      >
        Personal Details
      </SectionTitleText>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <label
            className="custom-file-upload"
            style={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/png, image/webp, image/jpeg"
              style={{
                display: "none",
              }}
              onChange={(e) => handleImageChange(e)}
            />
            {/* {selectedFile === "" ? (
              <AppImage
                src={selectedFile}
                sx={{
                  // border: "1px dashed #D0D5DD",
                  borderRadius: "50%",
                }}
                alt=""
                height="140"
                width="140"
              />
            ) : (
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  // backgroundColor: randomColor(),
                }}
              >
                {data.merchant_first_name.charAt(0)}
              </Avatar>
            )} */}
            <Box> {profileImage}</Box>
          </label>
        </Box>
        <OutlinedButton startIcon={<CameraIcon />} component="label">
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
          Change Image
        </OutlinedButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "21px",
        }}
      >
        <TextInput
          labelStyles={labelStyles}
          title="First Name"
          required={true}
          placeholder="Enter First Name"
          value={firstName}
          containerStyles={textContainerStyle}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput
          labelStyles={labelStyles}
          title="Last Name"
          required={true}
          placeholder="Enter Last Name"
          value={lastName}
          containerStyles={textContainerStyle}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "21px",
          width: "100%",
        }}
      >
        <TextInput
          labelStyles={labelStyles}
          title="Email"
          value={email}
          placeholder="Enter Email Id"
          containerStyles={textContainerStyle}
          error={emailError}
          helperText={emailError}
          onChange={handleEmailChange}
          required={true}
          disabled
        />
        <FormSelectInput
          title={"Job Roles"}
          containerStyles={{
            marginTop: "8px",
            paddingTop: "0",
          }}
          labelStyles={labelStyles}
          value={jobRole.value !== "" && jobRole.value !== undefined && jobRole}
          options={JOBROLES_WITH_LABEL}
          onChange={(e) => setjobRole(e)}
          required={true}
          borderRadius="5px"
          paddingTop="7px"
        />
      </Box>

      <SectionTitleText
        sx={{
          marginTop: "24px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#222222",
        }}
      >
        Phone Number
      </SectionTitleText>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "21px",
          width: "50%",
          pr: "10.5px",
          alignItems: "flex-start",
          // maxWidth: "300px",
        }}
      >
        <FormSelectInput
          noPadding={true}
          containerStyles={{
            ...containerStyle,
            width: "220px",
          }}
          labelStyles={labelStyles}
          // title="Phone Number"
          placeholder="Select"
          options={[
            { value: "+91 India", label: "+91 India" },
            { value: "+1 USA", label: "+1 USA" },
            { value: "+44 UK", label: "+44 UK" },
            {
              value: "+62 Indonesia",
              label: "+62 Indonesia",
            },
            { value: "+39 Italy", label: "+39 Italy" },
            { value: "+81 Japan", label: "+81 Japan" },
            {
              value: "+60 Malaysia",
              label: "+60 Malaysia",
            },
            {
              value: "+52 Mexico",
              label: "+52 Mexico",
            },
          ]}
          value={countryCode}
          required
          onChange={(e) => setCountryCode(e)}
        />

        <TextInput
          labelStyles={labelStyles}
          value={phoneNumber}
          placeholder="Enter phone number"
          error={phoneNumberError}
          helperText={phoneNumberError}
          onChange={handlePhoneNumberChange}
          containerStyles={{ marginTop: 0 }}
          type="number"
        />
      </Box>

      <SectionTitleText
        sx={{
          color: "#484A9E",
          fontSize: "19px",
          fontWeight: "700",
          mt: "24px",
          mb: "24px",
        }}
      >
        Company Details
      </SectionTitleText>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "21px",
          alignItems: "flex-end",
        }}
      >
        <TextInput
          labelStyles={labelStyles}
          containerStyles={{ marginTop: 0 }}
          title="Company Name"
          required={true}
          placeholder="Enter Company Name"
          value={companyName}
          // containerStyles={textContainerStyle}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <FormSelectInput
          containerStyles={{
            ...containerStyle,
            // width: "200px",
            // marginTop: "27px",
            paddingTop: "0",
          }}
          labelStyles={labelStyles}
          title="Industry"
          placeholder="Select"
          options={[{ value: "Textile", label: "Textile" }]}
          value={industry}
          required
          onChange={(e) => setIndustry(e)}
          borderRadius="5px"
          paddingTop="7px"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "21px",
          mb: "24px",
        }}
      >
        <FormSelectInput
          containerStyles={{
            ...containerStyle,
            // width: "200px",
            marginTop: "8px",
            paddingTop: "0",
          }}
          labelStyles={labelStyles}
          title="Country"
          placeholder="Select"
          options={
            // [{ value: "India", label: "India" }]
            countryListOptions
          }
          value={country}
          required
          onChange={(e) => setCountry(e)}
          borderRadius="5px"
          paddingTop="7px"
        />
        <CurrencyInput
          containerStyles={{
            ...containerStyle,
            // width: "200px",
            marginTop: "8px",
            paddingTop: "0",
          }}
          labelStyles={labelStyles}
          title="Currency"
          placeholder="Select Currency"
          label="currency"
          // options={[
          // 	{ value: "Inr", label: "Inr" },
          // 	{ value: "Usd", label: "Usd" },
          // ]}
          value={currency}
          required
          onChange={(e) => setCurrency(e)}
          borderRadius="8px"
          autoFill={false}
        />
        {/* <CurrencyInput /> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "21px",
        }}
      >
        <PrimaryButton
          sx={{
            width: "178px",
            height: "42px",
            px: "41px",
            py: "11px",
          }}
          onClick={(e) => handleUpdateProfile(e)}
        >
          Save Changes
        </PrimaryButton>
      </Box>
      <SectionTitleText
        sx={{
          color: "#484A9E",
          fontSize: "19px",
          fontWeight: "700",
          mt: "24px",
          mb: "24px",
        }}
      >
        Change Password
      </SectionTitleText>
      <form>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item md={6}>
            {" "}
            <PasswordInput
              title="Current Password"
              onChange={handleCurrentPasswordChange}
              value={currentPassword}
              containerStyles={{
                maxWidth: "100%",
                marginTop: "0",
              }}
              autoFill={false}
              ariaTitle="current password"
              // type="password"
            />
          </Grid>
          <Grid item md={6}>
            <PasswordInput
              title="New Password"
              onChange={handleNewPasswordChange}
              value={newPassword}
              containerStyles={{
                maxWidth: "100%",
                marginTop: "0",
              }}
              // type="password"
            />
          </Grid>
        </Grid>
      </form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "21px",
        }}
      >
        <PrimaryButton
          sx={{
            width: "178px",
            height: "42px",
            mt: "24px",
          }}
          disabled={currentPassword === "" || newPassword === ""}
          onClick={handleChangePassword}
        >
          Change Password
        </PrimaryButton>
      </Box>
    </Box>
  );
}

const JOBROLES = ["Role 1", "Role 2", "Role 3", "Role 4"];

const JOBROLES_WITH_LABEL = JOBROLES.map((role) => {
  return {
    label: role,
    value: role,
  };
});

const labelStyles = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
  marginBottom: "6px",
  borderRadius: "5px",
};

const textContainerStyle = {
  maxWidth: "100%",
  marginTop: "24px",
};
const containerStyle = {
  // paddingBottom: "24px",
  maxWidth: "100%",
  color: "#0000000",
  fontSize: "16px",
  fontWeight: "600",
  maxHeight: "100px",
  borderRadius: "5px",
};

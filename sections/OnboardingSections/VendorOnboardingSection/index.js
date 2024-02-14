import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";

import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { MERCHANT, PRODUCT, VENDOR, WAREHOUSE } from "constants/API_URL";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import AddIcon from "@mui/icons-material/Add";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import {
  MdArrowBack,
  MdDeleteOutline,
  MdHomeFilled,
  MdTag,
} from "react-icons/md";
import ReportIcon from "@mui/icons-material/Report";
import { useRouter } from "next/router";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import tagIcon from "public/assets/icons/tag-icon.png";
import AppImage from "components/Common/AppImage";
import BaseDialog from "components/Common/Dialog";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { Container } from "@mui/system";
import theme from "theme";
import logoImage from "public/assets/Logo.png";
import validator from "validator";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import { updateVendorOnboardingSteps } from "redux/onboarding/onboardingSlice";
import CameraIcon from "components/Common/Icons/CameraIcon";
import EmptyState from "components/Common/EmptyState";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import SuccessDialogForPO from "../PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import { tr } from "date-fns/locale";
import NewProductOnboardingBottomNavButtons from "../NewProductOnboardingSections/NewProductOnboardingBottomNavButtons";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const VendorOnboardingSection = ({
  pageTitle,
  nextButton,
  backButton,
  data = {},
  usedIn = "onboarding",
}) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const pageId = router.query.pageId;

  const [companyName, setCompanyName] = useState(data.company_name ?? "");
  const [email, setEmail] = useState(data.email ?? "");
  const countryCodeWithLabel = {
    label: data.country_code || "+91 India",
    value: data.country_code || "+91",
  };
  const [countryCode, setCountryCode] = useState(countryCodeWithLabel ?? "");
  const [contactPhoneNumber, setContactPhoneNumber] = useState(
    data.phone ?? ""
  );
  const [username, setUsername] = useState(data.username ?? "");
  const [onlineOrderPortal, setOnlineOrderPortal] = useState(
    data.online_order_portal ?? ""
  );
  const [websiteLink, setWebsiteLink] = useState(data.website_url ?? "");
  const [address1, setAddress1] = useState(data.address_1 ?? "");
  // const [address2, setAddress2] = useState(data.address_2 ?? "");
  const [zipcode, setZipcode] = useState(data.zipcode ?? "");

  const countryWithLabel = {
    label: data.country,
    value: data.country,
  };
  const [vendorCountry, setVendorCountry] = useState(countryWithLabel ?? "");

  const [city, setCity] = useState(data.city ?? "");
  const [vendorState, setVendorState] = useState(data.state ?? "");

  const paymentTermsWithLable = {
    label: data.payment_terms,
    value: data.payment_terms,
  };
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsWithLable ?? "");

  const paymentMethodWithLable = {
    label: data.payment_method,
    value: data.payment_method,
  };
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodWithLable ?? ""
  );

  const [vendorLeadtime, setVendorLeadtime] = useState(
    data.vendor_lead_time ?? ""
  );

  const [vendorRestockTime, setVendorRestockTime] = useState(
    data.vendor_restock_time ?? ""
  );

  const [phoneNumber, setPhoneNumber] = useState(data.phone ?? "");
  const [contactName, setContactName] = useState("");
  const [logo, setLogo] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [productsList, setProductsList] = useState([]);
  const [paymentTermsOptions, setPaymentTermsOptions] = useState([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log({ paymentMethod, paymentTerms });

  const [selectedFile, setSelectedFile] = React.useState(data.logo_url ?? "");
  const [selectedImage, setSelectedImage] = React.useState("");

  const [showSelectedFile, setShowSelectedFile] = useState(true);
  const [productImage, setProductImage] = useState();
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState("");
  const [websiteurlError, setWebsiteurlError] = React.useState("");
  const [zipCodeError, setZipcodeError] = React.useState("");
  const [vendorRestockTimeError, setVendorRestockTimeError] =
    React.useState("");
  const [restockError, setRestockError] = useState(false);

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    setCompanyName(data.company_name ?? "");
    setEmail(data.email ?? "");
    setContactPhoneNumber(data.phone ?? "");
    setUsername(data.username ?? "");
    setOnlineOrderPortal(data.online_order_portal ?? "");
    setWebsiteLink(data.website_url ?? "");
    setAddress1(data.address_1 ?? "");
    // setAddress2(data.address_2 ?? "");
    setZipcode(data.zipcode ?? "");
    setVendorCountry(countryWithLabel ?? "");
    setCity(data.city ?? "");
    setVendorState(data.state ?? "");
    setPaymentTerms(paymentTermsWithLable ?? "");
    setPaymentMethod(paymentMethodWithLable ?? "");
    setVendorLeadtime(data.vendor_lead_time ?? "");
    setVendorRestockTime(data.vendor_restock_time ?? "");
    setPhoneNumber(data.phone ?? "");
    setCountryCode(countryCodeWithLabel ?? "");
    setSelectedFile(data.logo_url ?? "");
    // setSelectedFile(data.logo ?? "");
  }, [
    data?.countryCodeWithLabel,
    data?.company_name,
    data?.email,
    data?.countryWithLabel,
    data?.phone,
    data?.username,
    data?.online_order_portal,
    data?.website_url,
    data?.address_1,
    // data?.address_2,
    data?.zipcode,
    data?.city,
    data?.state,
    data?.paymentTermsWithLable,
    data?.paymentMenthodWithLable,
    data?.vendor_lead_time,
    data?.vendor_restock_time,
    data?.logo_url,
    // data?.logo,
  ]);

  const [openDiscardDialog, setOpenDiscardDialog] = useState(false);

  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const vendorId = data?.id;
  const vendorData = data;
  const handleUpdatedVendor = (e) => {
    const URL = VENDOR.UPDATE_VENDOR;
    const data = {
      ...vendorData,
      logo_url: selectedFile,
      selectedFile: selectedFile,
      company_name: companyName,
      username: username || "",
      email: email,
      website_url: websiteLink,
      country_code: countryCode.value || "",
      phone: phoneNumber || "",
      address_1: address1,
      zipcode: zipcode,
      city: city,
      state: vendorState,
      country: vendorCountry.value || vendorCountry,
      online_order_portal: onlineOrderPortal || "",
      address_2: "",
      // contact_name: contactName,
      // contact_phone_number: contactPhoneNumber,
      payment_method: paymentMethod.value || paymentMethod,
      payment_terms: paymentTerms.value || paymentTerms,
      vendor_lead_time: vendorLeadtime,
      vendor_restock_time: vendorRestockTime,
    };

    if (selectedImage) {
      return compressImageAndUpload(
        e,
        selectedImage,
        currentUser.merchant_id
      ).then((res) => {
        console.log({ res });
        if (res) {
          appFetch(URL, { ...data, logo_url: res })
            .then((json) => {
              enqueueSnackbar(json.message, {
                variant: "success",
              });
              // return router.push(
              //   `/onboarding/vendors/${json.vendor_id}?step=products&id={res.vendor_id}`
              // );
              // setLoading(false);
              setSaveButtonLoading(false);
            })
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
              // setLoading(false);
              setSaveButtonLoading(false);
            });
        }
      });
    }
    // setLoading(true);
    setSaveButtonLoading(true);
    appFetch(URL, { ...data })
      .then((json) => {
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        setTimeout(() => {
          // setLoading(false);
          setSaveButtonLoading(false);
        }, 1000);
        // setLoading(true);
        // return router.push("/app/vendors");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        // setLoading(false);
        setSaveButtonLoading(false);
      });
  };

  const vendorDataFromBackend = data;
  const handleAddVendor = (e) => {
    if (
      // address2 &&
      // contactName &&
      // contactPhoneNumber &&
      // onlineOrderPortal &&
      paymentMethod &&
      paymentTerms &&
      vendorLeadtime &&
      // selectedFile &&
      vendorRestockTime &&
      companyName &&
      // username &&
      email &&
      websiteLink &&
      // countryCode &&
      // phoneNumber &&
      address1 &&
      zipcode &&
      city &&
      vendorState &&
      vendorCountry
    ) {
      const URL = vendorDataFromBackend.vendor_id
        ? VENDOR.UPDATE_VENDOR
        : VENDOR.ADD_VENDOR;
      const data = {
        company_name: companyName,
        username: username || "",
        email: email,
        website_url: websiteLink,
        country_code: countryCode.value || "",
        phone: phoneNumber || "",
        address_1: address1,
        zipcode: zipcode,
        city: city,
        state: vendorState,
        country: vendorCountry.value,
        user_id: currentUser.merchant_id,
        online_order_portal: onlineOrderPortal || "",
        payment_method: paymentMethod.value,
        payment_terms: paymentTerms.value,
        vendor_lead_time: vendorLeadtime,
        vendor_restock_time: vendorRestockTime,

        address_2: "",
        created_at: new Date(),
        updated_at: Date(),
        // contact_name: contactName || companyName,
        // contact_phone_number: contactPhoneNumber || phoneNumber,
        // selectedFile: selectedFile,
        vendor_id: vendorDataFromBackend.vendor_id,
      };

      // setLoading(true);
      setSaveButtonLoading(true);
      if (selectedImage) {
        compressImageAndUpload(e, selectedImage, currentUser.merchant_id).then(
          (res) => {
            appFetch(URL, { ...data, logo_url: res })
              .then((json) => {
                // setLoading(false);
                setSaveButtonLoading(false);
                if (json.status === "failure") {
                  return enqueueSnackbar(json.message, {
                    variant: "error",
                  });
                }

                if (json.status === "success") {
                  enqueueSnackbar(json.message);
                  dispatch(
                    updateVendorOnboardingSteps({
                      step: "general-info",
                      nextStep: "products",
                    })
                  );
                  // setLoading(false);
                  setSaveButtonLoading(false);
                  return router.push(
                    `/onboarding/vendors/${
                      json.vendor_id || vendorDataFromBackend.vendor_id
                    }?step=products&id=1`
                  );
                  // resetForm();
                }
                // enqueueSnackbar(json.message);
              })
              .catch((err) => {
                console.log(err);
                // setLoading(false);
                setSaveButtonLoading(false);
              });
          }
        );
      }
      // setLoading(true);
      setSaveButtonLoading(true);

      appFetch(URL, { ...data, logo_url: "" })
        .then((json) => {
          // setLoading(false);
          setSaveButtonLoading(false);
          if (json.status === "failure") {
            return enqueueSnackbar(json.message, {
              variant: "error",
            });
          }
          if (json.status === "success") {
            dispatch(
              updateVendorOnboardingSteps({
                step: "general-info",
                nextStep: "products",
              })
            );
            // setLoading(false);
            setSaveButtonLoading(false);
            enqueueSnackbar(json.message);

            return router.push(
              `/onboarding/vendors/${
                json.vendor_id || vendorDataFromBackend.vendor_id
              }?step=products&id=1`
            );
            // resetForm();
          }
          // enqueueSnackbar(json.message);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
          setSaveButtonLoading(false);
        });
    }
  };

  const disableNextButton =
    // !selectedFile ||
    !companyName ||
    // !username ||
    !email ||
    !websiteLink ||
    !vendorCountry.value ||
    // !phoneNumber ||
    !address1 ||
    !websiteLink ||
    !zipcode ||
    !city ||
    !vendorState ||
    // !countryCode ||
    !paymentMethod.value ||
    !paymentTerms.value ||
    // !selectedFile ||
    // !onlineOrderPortal ||
    !vendorLeadtime ||
    !vendorRestockTime ||
    parseInt(vendorLeadtime) > parseInt(vendorRestockTime);

  const resetForm = () => {
    setAddress1("");
    // setAddress2("");
    setCity("");
    setCompanyName("");
    setContactName("");
    setContactPhoneNumber("");
    setCountry("");
    setEmail("");
    setOnlineOrderPortal("");
    setPaymentMethod("");
    setPaymentTerms("");
    setPhoneNumber("");
    setVendorState("");
    setUsername("");
    setVendorLeadtime("");
    setVendorRestockTime("");
    setWebsiteLink("");
    setZipcode("");
    setSelectedProducts([]);
  };

  const handleFetchProducts = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setProductsList(json.result);
      }
    });
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);

  const columnsData = [
    {
      field: "master_item_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "product_title",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "unit_retail_price",

      headerName: "Unit Retail Price",
      width: 200,
    },
  ];

  const handleAddProductsToVendor = (product) => {
    const URL = VENDOR.ADD_PRODUCT;
    const data = {
      vendor_id: pageId,
      master_product_id: product.master_product_id,
      master_item_id: product.master_item_id,
      unit_cost: product.unit_retail_price,
      moq: product.moq,
      min_inventory: product.min_inventory,
      max_inventory: product.max_inventory,
      lead_time_in_days: product.lead_time_in_days,
      product_title: product.product_title,
      product_desc: product.product_desc,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar(json.message);
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    setSelectedImage(file);
    setShowSelectedFile(true);
    // setLoading(true);
  };

  console.log("**image", { selectedFile });

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
    // if (value && !validator.isMobilePhone(value, "any")) {
    //   setPhoneNumberError("Please enter a valid phone number");
    // } else {
    //   setPhoneNumberError("");
    // }
  };

  const handleWebsiteUrlChange = (e) => {
    const value = e.target.value;
    setWebsiteLink(value);
    // if (value && !validator.isURL(value)) {
    //   setWebsiteurlError("Please enter a valid website url");
    // } else {
    //   setWebsiteurlError("");
    // }
  };

  const handleWebsiteUrlBlur = (e) => {
    const value = e.target.value;
    if (value && !validator.isURL(value)) {
      setWebsiteurlError("Please enter a valid website url");
    } else {
      setWebsiteurlError("");
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipcode(value);
  };

  const handleZipCodeBlur = (e) => {
    const value = e.target.value;
    if (value && !validator.isPostalCode(value, "any")) {
      setZipcodeError("Please enter a valid zipcode");
    } else {
      setZipcodeError("");
    }
  };

  const handleVendorRestocktimeChange = (e) => {
    const value = e.target.value;
    setVendorRestockTime(value);
  };

  const warn = () => {
    return (
      <>
        <Tooltip title="Vendor lead time should be less than Vendor restock time">
          <ReportIcon size="small" color="error" />
        </Tooltip>
      </>
    );
  };

  const handleVendorRestocktimeBlur = (e) => {
    const value = e.target.value;
    if (parseInt(value) <= parseInt(vendorLeadtime)) {
      setRestockError(
        "Vendor Restock Time should be greater than Vendor Leadtime"
      );
      // setVendorRestockTimeError(
      //   "Vendor Restock Time should be greater than Vendor Leadtime" || warn()
      // );
    } else {
      // setVendorRestockTimeError("");
      setRestockError(false);
    }
  };

  const handleFetchPaymentTermsOptions = () => {
    const URL = VENDOR.PAYMENT_TERM;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPaymentTermsOptions(data.result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    handleFetchPaymentTermsOptions();
  }, []);

  const paymentTermsOptionsWithLabel =
    Array.isArray(paymentTermsOptions) &&
    paymentTermsOptions.map((item) => {
      return {
        label: item,
        value: item,
      };
    });

  const handleFetchPaymentMethodOptions = () => {
    const URL = VENDOR.PAYMENT_METHOD;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPaymentMethodOptions(data.result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    handleFetchPaymentMethodOptions();
  }, []);

  const paymentMethodOptionsWithLabel =
    Array.isArray(paymentMethodOptions) &&
    paymentMethodOptions.map((item) => {
      return {
        label: item,
        value: item,
      };
    });

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

  // const CountryCodeOptions = [
  //   `+91 India`,
  //   `+1 USA`,
  //   `+62 Indonesia`,
  //   `+39 Italy`,
  //   `+81 Japan`,
  //   `+60 Malaysia`,
  //   `+52 Mexico`,
  // ];
  // const countryCodeOPtionsWithLable = CountryCodeOptions.map((item, index) => {
  //   return { label: item, value: item };
  // });

  // const countryOptions = ["India", "USA", "Australia"];
  // const countryOptionsWithLabel = countryOptions.map((item, index) => {
  //   return { label: item, value: item };
  // });

  let windowWidth = typeof window !== "undefined" && window.innerWidth - 340;
  return (
    <>
      {loading && <PageLoader />}

      {/* <Divider /> */}

      <Container
        //  maxWidth="md"
        sx={{
          // width: "60%",
          // marginLeft: 15,
          width: usedIn === "onboarding" ? "50%" : "50%",
          ml: usedIn === "onboarding" ? 35 : 0,
          // minWidth: "65%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            backgroundColor: "#ffffff",
            // borderBottom: "1px solid rgba(0,0,0,0.1)",
            position: "sticky",
            width: "100%",
            // marginTop: "20px",
            top: "62.5px",
            zIndex: "1000",
          }}
        >
          <SectionTitleText
            sx={{
              // px: "100px",
              // ml: "250px",
              py: "16px",
              // color: pageTitle ? "#222222" : "#484a9e",
              color: "#484a9e",
              // paddingTop: "4px",
              fontSize: "28px",
            }}
          >
            {usedIn === "edit" && (
              <span
                style={{
                  // border: "1px solid #E0E0E0",
                  borderRadius: "4px",
                  marginRight: 2,
                  paddingBottom: "5px",
                }}
              >
                <IconButton onClick={() => router.push("/app/vendors")}>
                  <MdArrowBack />
                </IconButton>
              </span>
            )}
            {pageTitle ?? `General Details`}
          </SectionTitleText>
        </Box>
        {/* General Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            // px: "100px",
            paddingBottom: "70px",
            paddingTop: "30px",
          }}
        >
          <Box>
            {/* <Typography
              sx={{
                // marginTop: "10px",
                marginBottom: "16px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#222222",
              }}
            >
              Upload Logo
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
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
                  {selectedFile ? (
                    <AppImage
                      src={selectedFile}
                      sx={{
                        // border: "1px dashed #D0D5DD",
                        borderRadius: "100px",
                        border: "1px solid rgb(208, 213, 221)",
                        borderRadius: "50%",
                      }}
                      alt=""
                      height="140"
                      width="140"
                    />
                  ) : (
                    <AppImage
                      src={logoImage}
                      sx={
                        {
                          // border: "1px dashed #D0D5DD",
                          // borderRadius: "5px",
                        }
                      }
                      alt=""
                      height="140"
                      width="140"
                    />
                  )}
                </label>
              </Box>

              <Box
                sx={{
                  marginLeft: "25px",
                }}
              >
                <SecondaryButton
                  sx={{
                    boxShadow: "none",
                  }}
                  variant="contained"
                  component="label"
                >
                  <span
                    style={{
                      display: "flex",
                      marginRight: "10px",
                      alignItems: "center",
                    }}
                  >
                    <CameraIcon />
                  </span>
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                  Edit Logo
                </SecondaryButton>
              </Box>

              {/* <BaseDialog>
                  <SectionTitleText sx={{ mt: 4 }}>
                    Do you want to delete this image?
                  </SectionTitleText>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "32px",
                      marginBottom: "32px",
                    }}
                  >
                    <PrimaryButton
                      sx={{
                        ml: 2,
                        backgroundColor: "#D92D20",
                        "&:hover": {
                          background: "#d91304",
                        },
                      }}
                    >
                      Delete
                    </PrimaryButton>
                  </div>
                </BaseDialog> */}
              {/* Browse File */}
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
                // labelStyles={labelStyles}
                title="Company Name"
                required={true}
                placeholder="Enter Company Name"
                value={companyName}
                // containerStyles={textContainerStyle}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <TextInput
                // sx={{
                //   height: "50px",
                // }}
                // labelStyles={labelStyles}
                title="Username"
                // required={true}
                placeholder="Enter Username"
                value={username}
                // containerStyles={textContainerStyle}
                onChange={(e) => setUsername(e.target.value)}
              />
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
                // labelStyles={labelStyles}
                title="Email"
                value={email}
                placeholder="Enter email"
                // containerStyles={textContainerStyle}
                error={emailError}
                helperText={emailError}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
              />
              <TextInput
                // labelStyles={labelStyles}
                title="Website"
                value={websiteLink}
                placeholder="Enter website link"
                // containerStyles={textContainerStyle}
                error={websiteurlError}
                helperText={websiteurlError}
                onChange={handleWebsiteUrlChange}
                onBlur={handleWebsiteUrlBlur}
                required
              />
            </Box>

            {/* <SectionTitleText> */}
            <SectionTitleText
              sx={{
                marginTop: "24px",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "-24px",
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
                width: "48%",
                alignItems: "center",
              }}
            >
              {/* <MuiSelectInput
                sx={{
                  marginRight: theme.spacing(1),
                }}
                title="Country Code"
                required={true}
                containerStyles={{
                  ...containerStyle,
                  // flex: 1,
                  fontSize: "14px",
                  fontWeight: "600",
                  // height: "98px",
                  width: "200px",
                  color: "#000000",
                }}
                labelStyles={labelStyles}
                defaultValue={countryCode}
                value={countryCode}
                setValue={setCountryCode}
                options={countryCodeOPtionsWithLable}
              /> */}

              <FormSelectInput
                containerStyles={{
                  // ...containerStyle,
                  width: "240px",
                  // position: "sticky",
                }}
                // labelStyles={labelStyles}
                // title="Country Code"
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
                setValue={setCountryCode}
                onChange={(e) => setCountryCode(e)}
              />

              <TextInput
                // labelStyles={labelStyles}
                // title="Phone Number"
                value={phoneNumber}
                type="number"
                placeholder="Enter phone number"
                // containerStyles={textContainerStyle}
                error={phoneNumberError}
                helperText={phoneNumberError}
                onChange={handlePhoneNumberChange}
              />
            </Box>
            {/* </SectionTitleText> */}

            <TextInput
              // labelStyles={labelStyles}
              title="Primary Address"
              value={address1}
              // multiline
              placeholder="Enter address"
              required={true}
              containerStyles={textContainerStyle}
              onChange={(e) => setAddress1(e.target.value)}
            />

            {/* <Divider sx={{ marginTop: "20px" }} /> */}
            <TextInput
              // labelStyles={labelStyles}
              title="PO System URL"
              value={onlineOrderPortal}
              // required={true}
              containerStyles={textContainerStyle}
              onChange={(e) => setOnlineOrderPortal(e.target.value)}
            />
            {/*<TextInput
              title="Website"
              value={websiteLink}
              placeholder="Enter website link"
              containerStyles={textContainerStyle}
              error={websiteurlError}
              helperText={websiteurlError}
              onChange={handleWebsiteUrlChange}
              required
            />*/}

            {/* <Divider
              sx={{
                height: "20px",
                marginBottom: "-5px",
              }}
            /> */}
            {/* <SectionTitleText
              sx={{
                marginTop: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Ship from Address
            </SectionTitleText>
            
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Address 2"
              value={address2}
              containerStyles={textContainerStyle}
              onChange={(e) => setAddress2(e.target.value)}
            /> */}

            {/* <SectionTitleText> */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "21px",
                alignItems: "center",
              }}
            >
              <TextInput
                // labelStyles={labelStyles}
                title="Zip Code"
                value={zipcode}
                defaultValue={zipcode}
                type="number"
                // setValue={setZipcode}
                placeholder="Enter zip code"
                // containerStyles={textContainerStyle}
                error={zipCodeError}
                helperText={zipCodeError}
                onChange={handleZipCodeChange}
                onBlur={handleZipCodeBlur}
                required
              />
              <TextInput
                // labelStyles={labelStyles}
                // id="outlined-basic"
                title="City"
                required={true}
                placeholder="Enter city"
                value={city}
                // containerStyles={textContainerStyle}
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "21px",
                alignItems: "center",
              }}
            >
              <TextInput
                // labelStyles={labelStyles}
                id="outlined-basic"
                title="State"
                required={true}
                placeholder="Enter state"
                value={vendorState}
                containerStyles={textContainerStyle}
                onChange={(e) => setVendorState(e.target.value)}
              />

              <FormSelectInput
                containerStyles={{
                  ...containerStyle,
                  // width: "200px",
                }}
                // labelStyles={labelStyles}
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
                value={data.country && vendorCountry}
                required
                setValue={setVendorCountry}
                onChange={(e) => setVendorCountry(e)}
              />

              {/* <MuiSelectInput
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  // marginLeft: theme.spacing(1),
                }}
                title="Country"
                labelStyles={labelStyles}
                // defaultValue={vendorCountry}
                value={vendorCountry}
                setValue={setVendorCountry}
                containerStyles={containerStyle}
                options={countryOptionsWithLabel}
                required
              /> */}
            </Box>
            {/* </SectionTitleText> */}

            <SectionTitleText
              sx={{
                marginTop: "42px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                // color: "#484a9e",
                color: "#484a9e",
              }}
            >
              Payment Details
            </SectionTitleText>

            <FormSelectInput
              containerStyles={
                {
                  // ...containerStyle,
                  // width: "200px",
                }
              }
              // labelStyles={labelStyles}
              title="Payment terms"
              placeholder="Select payment terms"
              options={
                //   [
                //   { value: "India", label: "India" },
                //   { value: "USA", label: "USA" },
                //   { value: "UK", label: "UK" },
                // ]
                paymentTermsOptionsWithLabel
              }
              value={data.payment_terms && paymentTerms}
              required
              setValue={setPaymentTerms}
              onChange={(e) => setPaymentTerms(e)}
            />

            {/* <MuiSelectInput
              labelStyles={labelStyles}
              title="Payment terms"
              placeholder="Select payment terms"
              required={true}
              containerStyles={containerStyle}
              value={paymentTerms}
              setValue={setPaymentTerms}
              options={paymentTermsOptionsWithLabel}
            /> */}

            {/* <MuiSelectInput
              labelStyles={labelStyles}
              placeholder="Select payment method"
              title="Payment method"
              required={true}
              containerStyles={containerStyle}
              value={paymentMethod}
              setValue={setPaymentMethod}
              options={paymentMethodOptionsWithLabel}
            /> */}

            <FormSelectInput
              containerStyles={
                {
                  // ...containerStyle,
                  // width: "200px",
                }
              }
              // labelStyles={labelStyles}
              title="Payment method"
              placeholder="Select payment method"
              options={
                //   [
                //   { value: "India", label: "India" },
                //   { value: "USA", label: "USA" },
                //   { value: "UK", label: "UK" },
                // ]
                paymentMethodOptionsWithLabel
              }
              value={data.payment_method && paymentMethod}
              required
              setValue={setPaymentMethod}
              onChange={(e) => setPaymentMethod(e)}
            />

            <SectionTitleText
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "42px",
                paddingBottom: "8px",
                color: "#484a9e",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Shipment Constraints
            </SectionTitleText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "21px",
                alignItems: "center",
              }}
            >
              <TextInput
                // labelStyles={labelStyles}
                title="Vendor Leadtime (in days) "
                placeholder="Enter vendor leadtime"
                required={true}
                type="number"
                // containerStyles={textContainerStyle}
                value={vendorLeadtime}
                onChange={(e) => setVendorLeadtime(e.target.value)}
              />
              <TextInput
                sx={{
                  "& .MuiOutlinedInput-input": {
                    border: "none",
                  },
                }}
                // labelStyles={labelStyles}
                title="Vendor Restock time (in days)"
                placeholder="Enter vendor restock time"
                value={vendorRestockTime}
                required={true}
                type="number"
                error={vendorRestockTimeError}
                containerStyles={restockTimeStyles}
                // onChange={(e) => setVendorRestockTime(e.target.value)}
                onChange={handleVendorRestocktimeChange}
                onBlur={handleVendorRestocktimeBlur}
                helperText={
                  // "Vendor Restock Time Should be Greater than vendor lead time"
                  restockError
                }
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        {restockError && (
                          <Tooltip title="Vendor lead time should be less than Vendor restock time">
                            <ReportIcon size="small" color="error" />
                          </Tooltip>
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      {/* <Divider
        sx={{
          marginBottom: "16px",
        }}
      /> */}

      {/* <Box
        sx={{
          display: "flex",
          // mt: 6,
          justifyContent: "center",
          position: "fixed",
          bottom: "0",
          width: "100%",
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          ml: "-36px",
        }}
      >
        {" "}
        <PrimaryButton
          // onClick={() => handleCardClick()}
          sx={{ width: "200px" }}
          // disabled={disableButton}
        >
          Proceed
        </PrimaryButton>
      </Box> */}

      <Box
        sx={{
          // display: "flex",
          // flexDirection: "row",
          // gap: "21px",
          // alignItems: "center",
          // position: "fixed",
          // width: "100px",
          // position: "fixed",
          // bottom: "0px",
          // maxWidth: "100%",
          // width: "100%",
          // ml: "56px",
          // margin: "auto",
          // flex: 1,
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "white",
          bottom: "0",
          display: "flex",
          position: "fixed",
          maxWidth: "1800px",
          width: "100%",

          alignItems: usedIn === "onboarding" ? "center" : "flex-start",
          justifyContent: usedIn === "onboarding" ? "center" : "flex-start",
        }}
      >
        <Box
          sx={{
            ml: usedIn === "onboarding" ? -60 : 25,
            display: "flex",
            gap: "8px",
          }}
        >
          <SecondaryButton
            // onClick={() => router.push("/app/vendors")}
            onClick={() => setOpenDiscardDialog(true)}
          >
            {/* Back to Vendor List */}
            {backButton ?? `Back to Vendor List`}
          </SecondaryButton>
          <PrimaryButton
            onClick={(e) =>
              usedIn === "onboarding"
                ? handleAddVendor(e)
                : handleUpdatedVendor(e)
            }
            disabled={disableNextButton || saveButtonLoading}
          >
            {" "}
            {saveButtonLoading && (
              <CircularProgress
                thickness={4}
                size={20}
                sx={{ mr: 2, color: "#fff" }}
              />
            )}
            {nextButton ?? `Save & Continue`}
          </PrimaryButton>
        </Box>
      </Box>

      <SuccessDialogForPO
        icon={<AlertIconPO />}
        open={openDiscardDialog}
        handleClose={() => setOpenDiscardDialog(false)}
        title="Unsaved Changes?"
        message={<>Do you want to save or discard changes?</>}
        onDelete={() => router.push(`/app/vendors`)}
        primaryButtonName="Confirm"
        secondaryButtonName="Cancel"
        onCancel={() => setOpenDiscardDialog(false)}
        loading={loading}
      />

      <BaseDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      >
        <Box
          sx={{
            padding: "16px",
            minWidth: "600px",
            minHeight: "300px",
          }}
        >
          <SectionTitleText>Add Products</SectionTitleText>
          {/* {productsList.length === 0 && <EmptyState />}
        {loading && <PageLoader />} */}
          <Divider />
          <Box>
            <MuiBaseDataGrid
              data={productsList}
              rowIdkey={"master_item_id"}
              columnDefData={columnsData}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              selectionModel={selectedProducts}
              disableSelectionOnClick={false}
            />
            {console.log("selectedProducts", selectedProducts)}
          </Box>
        </Box>
      </BaseDialog>
    </>
  );
};
export default VendorOnboardingSection;

const labelStyles = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
  marginBottom: "6px",
  // borderRadius: "8px",
};

const textContainerStyle = {
  maxWidth: "100%",
  // marginTop: "24px",
};

const restockTimeStyles = {
  maxWidth: "100%",
  paddingRight: 0,
};

const containerStyle = {
  marginBottom: "-4px",
  // paddingBottom: "24px",
  // maxWidth: "100%",
  // color: "#0000000",
  // fontSize: "16px",
  // fontWeight: "600",
  // maxHeight: "100px",
};

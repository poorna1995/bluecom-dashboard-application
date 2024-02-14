/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SelectVendorCard from "./components/SelectVendorCard";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
import { PRODUCT, VENDOR } from "constants/API_URL";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { updateCreateProductData } from "redux/products/productsSlice";
import {
  updateComponentOnboardingSteps,
  updateProductOnboardingSteps,
} from "redux/onboarding/onboardingSlice";
import { enqueueSnackbar, useSnackbar } from "notistack";
import SelectChannelItemCard from "sections/StoresPageSections/components/SelectChannelItemCard";
import SaveAsDraftComponent from "./components/SaveAsDraftComponent";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  productsData,
});
export default function NewProductOnboardingSelectVendorSection({
  keyForReduxStateData,
}) {
  const router = useRouter();
  const { step, id, productId: pageId } = router.query;
  const { currentUser, productsData } = useSelector(mapState);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const IS_COMPONENT = productsData[keyForReduxStateData].is_component === true;
  const vendorFromState =
    productsData[keyForReduxStateData]?.vendors[0]?.vendor_id ?? "";

  const [selectedVendor, setSelectedVendor] = React.useState(
    vendorFromState ?? null
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [vendorsList, setVendorsList] = React.useState([]);
  const handleClick = (e, item) => {
    setSelectedVendor(item);
  };
  console.log({ selectedVendor });
  const handleClickNextButton = () => {
    if (IS_COMPONENT) {
      dispatch(
        updateComponentOnboardingSteps({
          step: "select-vendor",
          nextStep: "inventory",
        })
      );
      return router.push(
        `/app/products/create/product/${pageId}?step=inventory&id=3`
      );
    } else {
      dispatch(
        updateProductOnboardingSteps({
          step: "select-vendor",
          nextStep: "inventory",
        })
      );
      router.push(`/app/products/create/product/${pageId}?step=inventory&id=4`);
    }
    // dispatch(
    // 	updateProductOnboardingSteps({
    // 		step: "select-vendor",
    // 		nextStep: "inventory",
    // 	}),
    // );
    // router.push(
    // 	`/app/products/create/product/${pageId}?step=inventory&id=4`,
    // );
  };
  // const vendorsList = [
  // 	{
  // 		title: "Adidas",
  // 	},
  // 	{
  // 		title: "Nike",
  // 	},
  // ];
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    setIsLoading(true);
  };
  const handleSearchVendorOnBlur = (e) => {
    setIsLoading(true);
    const URL = VENDOR.SEARCH_VENDOR;
    const data = {
      user_id: currentUser.merchant_id,
      search_value: searchValue,
    };
    appFetch(URL, data).then((json) => {
      console.log({ json });
      setVendorsList(json.result);

      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    handleSearchVendorOnBlur();
  }, []);

  const handleAddVendorToProduct = () => {
    setIsLoading(true);
    const URL = PRODUCT.ADD_VENDOR;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productsData[keyForReduxStateData].master_product_id,
      vendor_id: [selectedVendor],
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        // setVendorsList(json.result);
        if (json.status === "success") {
          handleFetchProductData();
        }
        enqueueSnackbar("Vendor added successfully", {
          variant: "success",
        });
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const handleFetchProductData = async () => {
    const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productsData[keyForReduxStateData].master_product_id,
    };
    const json = await appFetch(url, data);
    if (json.status === "success") {
      dispatch(updateCreateProductData(json.result[0]));

      handleClickNextButton();
      // setTableItems(json.result[0].items);
      // dispatch(setCreateProductSelectedOptions(selectedOptions));
      // console.log({ json });
    }
  };
  // filter vendor list wit the vendorfrom state and show the vendor from state on top
  const filterVendorList = vendorsList.filter((item) =>
    item.vendor_id === vendorFromState ? item : null
  );
  const filterVendorList2 = vendorsList.filter((item) =>
    item.vendor_id !== vendorFromState ? item : null
  );
  // const filterVendorList = vendorsList.filter((item) =>

  const [openSaveAsDraftDialog, setOpenSaveAsDraftDialog] = useState(false);

  const handleSaveAsDraftDialogOpen = () => {
    setOpenSaveAsDraftDialog(true);
  };
  const handleSaveAsDraftDialogClose = () => {
    setOpenSaveAsDraftDialog(false);
  };

  const handleSaveAsDraftButtonClick = () => {
    const data = {
      user_id: currentUser.merchant_id,
      status: "draft",
      master_product_id: productsData[keyForReduxStateData].master_product_id,
      vendor_id: [selectedVendor],
    };
    console.log({ data });
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          enqueueSnackbar("Product saved as draft", {
            variant: "success",
          });
          router.push(`/app/products`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const BUNDLE_OR_PRODUCT = "product";

  return (
    <>
      {isLoading && <PageLoader />}
      <Box>
        {/* <NewProductOnboardingBottomNavButtons
				maxWidthPage={"800px"}
				saveButtonClick={() => handleAddVendorToProduct()}
				// saveButtonTitle={"Save "}
			/> */}
        <Box
          sx={{
            maxWidth: "800px",
            margin: "auto",
            mt: 2,
          }}
        >
          {/* <SectionTitleText
						sx={{
							pb: 2,
							borderBottom: (theme) =>
								`1px solid ${theme.palette.grey[200]}`,

							mb: 2,
							fontSize: "18px",
							fontWeight: "600",
						}}
					>
						Vendor
					</SectionTitleText> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              position: "sticky",
              top: "65px",
              py: 2,
              background: "white",
              zIndex: "300",
            }}
          >
            <SectionTitleText
              sx={{
                // pb: 2,
                // borderBottom: (theme) =>
                // 	`1px solid ${theme.palette.grey[200]}`,

                // mb: 2,
                // fontSize: "18px",
                // fontWeight: "600",
                color: (theme) => theme.palette.text.title,
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "39px",

                // ...sectionTitleStyles,
              }}
            >
              Vendor
            </SectionTitleText>
            <SaveAsDraftComponent
              BUNDLE_OR_PRODUCT={BUNDLE_OR_PRODUCT}
              handleSaveAsDraftDialogOpen={handleSaveAsDraftDialogOpen}
              // disableDraftButton={
              // 	productImages === "" ||
              // 	productImages.length === 0
              // 		? true
              // 		: false
              // }
              handleSaveAsDraftButtonClick={handleSaveAsDraftButtonClick}
              handleSaveAsDraftDialogClose={handleSaveAsDraftDialogClose}
              openSaveAsDraftDialog={openSaveAsDraftDialog}
            />
          </Box>

          <TextInput
            placeholder="Search Vendor"
            containerStyles={{
              maxWidth: "100%",
            }}
            value={searchValue}
            onChange={handleSearchValue}
            onKeyUp={handleSearchVendorOnBlur}
          />
          {/* <input 
				onKey
				
				/> */}

          {/* 

Create a list of radio group items for showing the title and logo of the vendor.
*/}
          {/*  */}

          <Grid container spacing={2} marginTop={2}>
            {Array.isArray(vendorsList) &&
              vendorsList.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <SelectVendorCard
                    title={item?.company_name ?? "Name will be added"}
                    logo={item.logo_url || ""}
                    onClick={(e) => handleClick(e, item.vendor_id)}
                    isSelected={selectedVendor === item.vendor_id}
                  />
                </Grid>
              ))}
          </Grid>

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
            }}
          >
            <NewProductOnboardingBottomNavButtons
              maxWidthPage={"800px"}
              saveButtonClick={() => handleAddVendorToProduct()}
              // discardButtonTitle={`Back`}
              discardButtonTitle={`Previous Step`}
              discardButtonClick={() =>
                IS_COMPONENT
                  ? router.push(
                      `/app/products/create/product/${pageId}?step=media&id=1`
                    )
                  : router.push(
                      `/app/products/create/product/${pageId}?step=variants&id=2`
                    )
              }
              // saveButtonTitle={"Save "}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

import {
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import VerticalRouterTabs from "components/Common/Tabs/VerticalRouterTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProductDataStart } from "redux/products/productsSlice";
import NewProductOnboardingGroupedInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingGroupedInventorySection";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingVariantLevelInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import NewProductOnboardingVariantsInfoSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantsInfoSection";
import appFetch from "utils/appFetch";

const mapState = ({ user, productsData, views }) => ({
  currentUser: user.currentUser,
  productsData,
  isLoading: views.isLoading,
});
export default function NewEditProductDetailsSection() {
  const router = useRouter();
  const { productId } = router.query;
  const { currentUser, productsData, isLoading } = useSelector(mapState);
  const { editProductData } = productsData;
  const IS_COMPONENT = editProductData?.is_component === true;
  const dispatch = useDispatch();
  // const handleFetchProductData = () => {
  // 	const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 		master_product_id: productId,
  // 	};
  // 	dispatch(fetchEditProductDataStart({ url: URL, data }));
  // };
  // useEffect(() => {
  // 	if (productId) {
  // 		handleFetchProductData();
  // 	}
  // 	// console.log("productId", productId);
  // }, [productId]);
  const staticData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="icon"
        >
          <path
            d="M13.1 2.10001L3.20103 3.51501L1.78703 13.415L10.979 22.607C11.1666 22.7945 11.4209 22.8998 11.686 22.8998C11.9512 22.8998 12.2055 22.7945 12.393 22.607L22.293 12.707C22.4805 12.5195 22.5858 12.2652 22.5858 12C22.5858 11.7348 22.4805 11.4805 22.293 11.293L13.1 2.10001ZM12.393 4.22201L20.172 12L11.686 20.485L3.90803 12.707L4.96803 5.28201L12.393 4.22201ZM10.273 10.586C10.6482 10.2107 10.8589 9.70179 10.8588 9.17115C10.8587 8.90841 10.8069 8.64825 10.7064 8.40552C10.6058 8.1628 10.4583 7.94226 10.2725 7.75651C10.0867 7.57075 9.86612 7.42342 9.62336 7.32291C9.3806 7.22241 9.12042 7.1707 8.85767 7.17075C8.32704 7.17084 7.81818 7.38172 7.44303 7.75701C7.06788 8.13229 6.85718 8.64123 6.85727 9.17186C6.85736 9.70249 7.06825 10.2114 7.44353 10.5865C7.81881 10.9617 8.32775 11.1724 8.85838 11.1723C9.38902 11.1722 9.89788 10.9613 10.273 10.586Z"
            fill="#2A2A2F"
          />
        </svg>
      ),
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.1 2.10001L3.20103 3.51501L1.78703 13.415L10.979 22.607C11.1666 22.7945 11.4209 22.8998 11.686 22.8998C11.9512 22.8998 12.2055 22.7945 12.393 22.607L22.293 12.707C22.4805 12.5195 22.5858 12.2652 22.5858 12C22.5858 11.7348 22.4805 11.4805 22.293 11.293L13.1 2.10001ZM10.272 10.586C10.0863 10.7717 9.86576 10.919 9.62309 11.0194C9.38041 11.1199 9.12033 11.1716 8.85767 11.1716C8.59502 11.1715 8.33496 11.1197 8.09232 11.0192C7.84968 10.9186 7.62922 10.7713 7.44353 10.5855C7.25784 10.3998 7.11055 10.1792 7.01009 9.93657C6.90962 9.69389 6.85793 9.4338 6.85798 9.17115C6.85802 8.9085 6.9098 8.64843 7.01036 8.40579C7.11091 8.16315 7.25827 7.9427 7.44403 7.75701C7.62978 7.57132 7.85029 7.42403 8.09297 7.32356C8.33564 7.22309 8.59573 7.17141 8.85838 7.17145C9.38883 7.17155 9.89751 7.38236 10.2725 7.75751C10.6475 8.13266 10.8582 8.64141 10.8581 9.17186C10.858 9.70231 10.6472 10.211 10.272 10.586Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      label: <span>Product Details</span>,

      component: (
        <>
          <NewProductOnboardingProductDetailsSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
            hideVariantQuestion
          />
        </>
      ),
      route: `general-info`,
      show: true,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="outlined-icon"
        >
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="#313131"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
            stroke="#313131"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.66998 18.95L7.59998 15.64C8.38998 15.11 9.52998 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
            stroke="#313131"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M2.57999 19.01L2.55999 19.03C2.28999 18.44 2.11999 17.77 2.04999 17.03C2.11999 17.76 2.30999 18.42 2.57999 19.01Z"
            fill="#4F44E0"
          />
          <path
            d="M9 10.38C10.3144 10.38 11.38 9.31443 11.38 8C11.38 6.68556 10.3144 5.62 9 5.62C7.68556 5.62 6.62 6.68556 6.62 8C6.62 9.31443 7.68556 10.38 9 10.38Z"
            fill="#4F44E0"
          />
          <path
            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      label: <span>Product Media </span>,
      component: (
        <Box sx={{ paddingBottom: "64px" }}>
          <NewProductOnboardingProductMediaSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
            configObject={{
              sectionTitle: "Product Media",
            }}
          />
        </Box>
      ),
      route: `product-media`,
      show: true,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="outlined-icon"
        >
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 2.44V12.42C17 14.39 15.59 15.16 13.86 14.12L12.54 13.33C12.24 13.15 11.76 13.15 11.46 13.33L10.14 14.12C8.41 15.15 7 14.39 7 12.42V2.44"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 2.44V12.42C17 14.39 15.59 15.16 13.86 14.12L12.54 13.33C12.24 13.15 11.76 13.15 11.46 13.33L10.14 14.12C8.41 15.15 7 14.39 7 12.42V2.44"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 7.81001V16.19C22 19.4 19.4 22 16.19 22H7.81C4.6 22 2 19.4 2 16.19V7.81001C2 5.32001 3.02 3.51001 4.83 2.63001C5.49 2.31001 6.25 2.81001 6.25 3.54001V12.42C6.25 13.61 6.71 14.56 7.54 15.04C8.38 15.51 9.44 15.41 10.52 14.76L11.82 13.98C11.9 13.94 12.1 13.94 12.16 13.97L13.48 14.76C14.2 15.19 14.82 15.33 15.32 15.33C15.84 15.33 16.24 15.17 16.48 15.03C17.29 14.56 17.75 13.61 17.75 12.42V3.54001C17.75 2.81001 18.52 2.31001 19.17 2.63001C20.98 3.51001 22 5.32001 22 7.81001Z"
            fill="#4F44E0"
          />
          <path
            d="M15.25 2C15.8 2 16.25 2.45 16.25 3V12.42C16.25 13.06 16.06 13.54 15.73 13.73C15.39 13.93 14.85 13.83 14.25 13.47L12.93 12.68C12.42 12.37 11.58 12.37 11.07 12.68L9.75 13.47C9.15 13.83 8.61 13.92 8.27 13.73C7.94 13.54 7.75 13.06 7.75 12.42V3C7.75 2.45 8.2 2 8.75 2H15.25Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      label: <span>Variants </span>,
      component: (
        <Box sx={{ paddingBottom: "64px", pt: 4 }}>
          <NewProductOnboardingVariantsInfoSection
            keyForReduxStateData={"editProductData"}
            hideContinueNavigation
          />
        </Box>
      ),
      route: `options-variants`,
      show: !IS_COMPONENT,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="icon"
        >
          <path
            d="M3 20V8.7C2.71667 8.51667 2.479 8.28334 2.287 8C2.095 7.71667 1.99934 7.38334 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.98 2.195 3.45067 1.99934 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V7C22 7.38334 21.904 7.71667 21.712 8C21.52 8.28334 21.2827 8.51667 21 8.7V20C21 20.55 20.804 21.021 20.412 21.413C20.02 21.805 19.5493 22.0007 19 22H5C4.45 22 3.979 21.804 3.587 21.412C3.195 21.02 2.99934 20.5493 3 20ZM5 9V20H19V9H5ZM20 7V4H4V7H20ZM9 14H15V12H9V14Z"
            fill="#2A2A2F"
          />
        </svg>
      ),
      filledIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 20V8.7C2.71667 8.51667 2.479 8.28334 2.287 8C2.095 7.71667 1.99934 7.38334 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.98 2.195 3.45067 1.99934 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V7C22 7.38334 21.904 7.71667 21.712 8C21.52 8.28334 21.2827 8.51667 21 8.7V20C21 20.55 20.804 21.021 20.412 21.413C20.02 21.805 19.5493 22.0007 19 22H5C4.45 22 3.979 21.804 3.587 21.412C3.195 21.02 2.99934 20.5493 3 20ZM20 7V4H4V7H20ZM9 14H15V12H9V14Z"
            fill="#4F44E0"
          />
        </svg>
      ),

      label: <span>Inventory </span>,
      component: (
        <>
          <Box sx={{ paddingBottom: "64px", pt: 4 }}>
            <NewProductOnboardingVariantLevelInventorySection
              keyForReduxStateData={"editProductData"}
              hideContinueNavigation
            />
          </Box>
        </>
      ),
      route: `inventory`,
      show: true,
    },
  ];
  const filterStaticData = staticData.filter((item) => item.show);

  const handleClickSaveButton = () => {
    // console.log("save button clicked");
    const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      ...editProductData,
    };
    appFetch(URL, data)
      .then((res) => {
        if (res.status === "success") {
          handleFetchProductData();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box
      sx={
        {
          // maxWidth: "100%",
          // margin: "auto",
        }
      }
    >
      {isLoading && <PageLoader />}
      {
        <>
          <Box
            sx={{
              mt: 4,
              ml: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box
              sx={{
                position: "fixed",
                background: "#fff",
                top: "112px",
                width: "100%",
                // width: "100%",
                // height: "50px",

                zIndex: (theme) => theme.zIndex.drawer + 10,
                display: "flex",
                alignItems: "center",
                py: 2,
              }}
            >
              {/* add arrow emoji */}
              <IconButton
                LinkComponent={AppLink}
                href={`/app/products/${productId}?tab=overview`}
                sx={{
                  borderRadius: "3px",
                  border: "1px solid  rgba(0, 0, 0, 0.10)",
                  mr: 2,
                  mt: 2,
                }}
              >
                <MdArrowBack />
              </IconButton>
              <SectionTitleText
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "28px",
                  mt: 2,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                {editProductData.title || editProductData.product_title}
              </SectionTitleText>
            </Box>

            {/* <PrimaryButton onClick={() => handleClickSaveButton()}>
					Save
				</PrimaryButton> */}
          </Box>

          <VerticalRouterTabs
            data={filterStaticData}
            tabContainerStyles={{
              pl: "16px",
              // position: "sticky",
              top: "192px",
              // background: "#fff",
              py: 1,
              width: "14%",

              zIndex: (theme) => theme.zIndex.drawer + 1,
              // background: "orange",
            }}
            tabRowStyles={{
              position: "sticky",
              top: "192px",
              width: "100%",
              maxWidth: "100%",
              margin: "auto",

              // background: "yellow",
            }}
            tabChildStyles={{
              width: "75%",
              // background: "red",
              // width:'100%'
            }}
            basePath={`/app/products/edit/${productId}`}
          />
        </>
      }
    </Box>
  );
}

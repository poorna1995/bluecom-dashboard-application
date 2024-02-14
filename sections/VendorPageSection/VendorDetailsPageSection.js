import { Phone } from "@mui/icons-material";
import { Box } from "@mui/system";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import { CHANNEL, PRODUCT, VENDOR } from "constants/API_URL";
import { de } from "date-fns/locale";
import { result } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection";
import appFetch from "utils/appFetch";
import VendorDPOverviewSection from "./VendorDPOverviewSection";
import VendorDPProductSection from "./VendorDPProductSection";
import VendorDPPurchaseOrder from "./VendorDPPurchaseOrder";
import VendorDetailsMobilePageSection from "sections/AppPageSections/AppDetailsPageSection/VendorDetailsMobilePageSection";
import MobileViewProductCard from "sections/ProductsPageSection/components/MobileViewComponents/MobileViewProductCard";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDetailsPageSection() {
  const router = useRouter();
  const tab = router.query.tab;
  const [productDataWithId, setProductDataWithId] = useState([]);
  const { currentUser } = useSelector(mapState);
  const vendorId = router.query.vendorId;

  const [data, setData] = useState({});

  const USER_ID = currentUser.merchant_id;
  const [vendorData, setVendorData] = useState({});

  const handleFetchVendorsList = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log(json);
        setVendorData(json.result[0]);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchVendorsList();
    }
  }, [vendorId]);

  const staticData = [
    {
      label: "Overview",
      component: (
        <>
          {vendorData && (
            <VendorDPOverviewSection
            // company_name={vendorData?.company_name}
            // address1={vendorData?.address1}
            // email_id={vendorData?.email_id}
            // phone_number={vendorData?.phone_number}
            // website_link={vendorData?.website_link}
            />
          )}
        </>
        // <div>
        // Vendor Name: {vendorData?.company_name}
        //  </div>
      ),
      route: "overview",
    },
    {
      label: "Products",
      component: (
        <VendorDPProductSection
        //  data={productDataWithId}
        //  rowIdkey="id"
        />

        // <MuiBaseDataGrid
        //   sx={{
        //     display: "flex",
        //     justifyContent: "center",
        //     width: "auto",
        //     height: "400px",
        //   }}
        //   data={productDataWithId}
        //   rowIdkey="id"
        // />
      ),
      route: "products",
    },
    {
      label: "Purchase Order",
      component: (
        <VendorDPPurchaseOrder
        // sx={{
        //   display: "flex",
        //   justifyContent: "center",
        //   width: "auto",
        //   height: "400px",
        // }}
        // data={productPurchaseOrderWithId}
        // rowIdkey="id"
        />
      ),
      route: "purchase-order",
    },
  ];
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    if (data) {
      setTabsData(staticData);
    }
  }, [data]);

  return (
    <div>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <AppDetailsPageSection
          // sx={{
          //   backgroundColor: "#595959",
          // }}
          basePath={`/app/vendors/${vendorId}`}
          display_image={vendorData && vendorData?.logo_url}
          title={vendorData && vendorData?.company_name}
          products={vendorData && vendorData?.product_count}
          activePO={vendorData && vendorData?.active_po}
          lead_time={vendorData && vendorData?.vendor_lead_time}
          last_updated={vendorData && vendorData?.updated_at}
          created_on={vendorData && vendorData?.created_at}
          tabsData={tabsData}
          pageType={"Vendor"}
          pageID={vendorId}
        />
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        <VendorDetailsMobilePageSection
          basePath={`/app/vendors/${vendorId}`}
          display_image={vendorData && vendorData?.logo_url}
          title={vendorData && vendorData?.company_name}
          products={vendorData && vendorData?.product_count}
          activePO={vendorData && vendorData?.active_po}
          lead_time={vendorData && vendorData?.vendor_lead_time}
          last_updated={vendorData && vendorData?.updated_at}
          created_on={vendorData && vendorData?.created_at}
          tabsData={tabsData}
          pageType={"Vendor"}
          pageID={vendorId}
        />
      </Box>
    </div>
  );
}

import { VENDOR } from "constants/API_URL";
import DrawerLayout from "layouts/DrawerLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VendorOnboardingSection from "sections/OnboardingSections/VendorOnboardingSection";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function EditVendorPage() {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const vendorId = router.query.vendorId;
  const [data, setData] = useState({});

  const handleFetchAllData = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: vendorId,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setData(json.result[0]);
    });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchAllData();
    }
  }, [vendorId]);

  return (
    // <div>edit vendor page</div>
    <DrawerLayout>
      <VendorOnboardingSection
        usedIn="edit"
        data={data}
        pageTitle={"Edit Vendor Details"}
        nextButton={"Save Changes"}
        backButton={"Discard Changes"}
      />
      {/* <h1>Hello</h1> */}
    </DrawerLayout>
  );
}

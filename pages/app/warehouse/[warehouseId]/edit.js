import { WAREHOUSE } from "constants/API_URL";
import DrawerLayout from "layouts/DrawerLayout";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WarehouseOnboardingSection from "sections/OnboardingSections/WarehouseOnboardingSection";
import appFetch from "utils/appFetch";

const mapState = ({ views, user }) => ({
  pageView: views.warehousePageView,
  currentUser: user.currentUser,
});

export default function EditWarehouseDetails() {
  const router = useRouter();
  const wh_id = router.query.warehouseId;

  const [data, setData] = useState({});
  const { pageView, currentUser } = useSelector(mapState);

  const [loading, setLoading] = useState(false);
  const handleFetchAllData = () => {
    setLoading(true);
    const URL = WAREHOUSE.FETCH_WAREHOUSE;
    const data = {
      user_id: currentUser.merchant_id,
      wh_id,
    };
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        setData(json.result[0]);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    if (wh_id) {
      handleFetchAllData();
    }
  }, [wh_id]);

  return (
    <DrawerLayout>
      {loading && <PageLoader />}
      <WarehouseOnboardingSection
        data={data}
        pageTitle={"Edit Location Details"}
        buttonName={"Update"}
        usedIn="edit"
      />
    </DrawerLayout>
  );
}

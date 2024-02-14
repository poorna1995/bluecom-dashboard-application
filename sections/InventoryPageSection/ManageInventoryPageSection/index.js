import BasicTabs from "components/Common/Tabs/BasicTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL } from "constants/API_URL";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnectedApps } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import InventorySection from "./InventorySection";
import TransfersSection from "./TransfersSection";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ManageInventoryPageSection() {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const data = [
    {
      label: "Inventory",
      component: <InventorySection />,
    },
    {
      label: "Transfers",
      component: <TransfersSection />,
    },
  ];
  const handleFetchConnectedApps = () => {
    const url = CHANNEL.FETCH_CONNECTED_APPS;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        dispatch(setConnectedApps(json.result));
      }
    });
  };
  useEffect(() => {
    handleFetchConnectedApps();
  }, []);

  return (
    <div>
      <div>
        <SectionTitleText>Manage Inventory</SectionTitleText>
      </div>
      <BasicTabs data={data} />
    </div>
  );
}

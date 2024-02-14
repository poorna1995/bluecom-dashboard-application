import React from "react";
import NewStoreDetailsHeader from "./components/NewStoreDetailsHeader";
import NewStoreDetailsDataList from "./components/NewStoreDetailsDataList";
import { useRouter } from "next/router";
import { CHANNEL } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function NewStoreDetailsPageSection() {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const { storeId } = router.query;
  console.log({ storeId });

  const [loading, setLoading] = React.useState(true);
  const [connectedApps, setConnectedApps] = React.useState([]);
  const [storeData, setStoreData] = React.useState({});
  const [catalogData, setCatalogData] = React.useState({});
  const [isCatalogLoading, setIsCatalogLoading] = React.useState(true);
  const [isReloading, setIsReloading] = React.useState(false);
  const handleFetchCatalogData = () => {
    const url = CHANNEL.FETCH_STORE_CATALOG_DETAILS;
    const data = {
      user_id: currentUser.merchant_id,
      store_id: storeId,
    };
    console.log({ data });
    setIsCatalogLoading(true);
    appFetch(url, data)
      .then((json) => {
        setIsCatalogLoading(false);
        if (json.status === "success") {
          console.log(json);
          if (json.result.length > 0) {
            setCatalogData(json.result[0]);
          }
        }
      })
      .catch((err) => {
        setIsCatalogLoading(false);
        console.log(err);
      });
  };
  const handleFetchStoreDetails = ({ setLoading }) => {
    const url = CHANNEL.FETCH_STORE_DETAILS;
    const data = {
      user_id: currentUser.merchant_id,
      store_id: storeId,
    };
    console.log({ data });
    setLoading(true);
    appFetch(url, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          console.log(json);
          setConnectedApps(json.result);
          if (json.result.length > 0) {
            setStoreData(json.result[0]);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  React.useEffect(() => {
    if (currentUser && storeId) {
      handleFetchStoreDetails({ setLoading });
      handleFetchCatalogData();
    }
  }, [storeId]);
  if (currentUser)
    return (
      <div>
        <NewStoreDetailsHeader
          isPrimary={storeData.is_primary}
          status={storeData.status}
          isLoading={loading}
          storeName={storeData.shop}
          storeData={storeData}
          catalogData={catalogData}
        />
        <NewStoreDetailsDataList
          isLoading={loading}
          storeData={storeData}
          catalogData={catalogData}
          isCardsLoading={isCatalogLoading}
          userId={currentUser.merchant_id}
          handleFetchStoreDetails={() =>
            handleFetchStoreDetails({ setLoading: setIsReloading })
          }
        />
      </div>
    );
}

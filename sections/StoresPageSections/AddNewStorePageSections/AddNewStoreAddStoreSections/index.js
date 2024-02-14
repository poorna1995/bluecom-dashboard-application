import { useRouter } from "next/router";
import React from "react";
import AddNewStoreShopifyStoreSection from "./AddNewStoreShopifyStoreSection";
import AddNewStoreWooCommerceSection from "./AddNewStoreWooCommerceSection";
import AddNewStoreBigCommerceSection from "./AddNewStoreBigCommerceSection";

const selectStoreData = {
  shopify: {
    component: AddNewStoreShopifyStoreSection,
  },
  woocommerce: {
    component: AddNewStoreWooCommerceSection,
  },
  bigcommerce: {
    component: AddNewStoreBigCommerceSection,
  },
};
export default function AddNewStoreAddStoreSections() {
  const router = useRouter();
  const { channel } = router.query;
  const MyComponent =
    (channel &&
      selectStoreData[channel] &&
      selectStoreData[channel].component) ||
    "";
  return (
    <div style={{ margin: "auto", maxWidth: "760px" }}>
      <MyComponent />
    </div>
  );
}

/***
 * service to validate shopify credentials
https://api.bluecom.ai/api/shopify/validateCredentials
POST
{
    "user_id":"123",
    "code":"548c5464fb4d3cad2f9c1e9205165d90",
    "shop":"hivepath-test-store"
}
Result
{
    "message": "Successfully established connection with shopify",
    "products_count": 46,
    "status": "success",
    "store_id": "139070545406036591"
}

Service to sync store
https://api.bluecom.ai/api/shopify/syncStore
POST
{
    "user_id":"123",
    "store_id":"139070545406036591"
}
Result
{
    "status": "success",
    "task_id": "b869bad7-b489-4963-a18f-86d1014d3a4f"
}


service to validate woocommerce credentials
https://api.bluecom.ai/api/woocommerce/validateCredentials
POST
{
    "user_id": "123",
    "shop": "143.244.133.144/wordpress",
    "consumer_key": "ck_ea9d1c416a9188746f9e33d63bb62c176d8672c8",
    "consumer_secret": "cs_75599181e1bdfd4f0c5bc4f83a6993bac57d6e9c",
    "scope": ""
}

Result
{
    "message": "Successfully added credentials",
    "products_count": 10,
    "status": "success",
    "store_id": "410799507680802395"
}

Service to sync store
https://api.bluecom.ai/api/woocommerce/syncStore
POST
{
    "user_id":"123",
    "store_id":"139070545406036591"
}
Result
{
    "status": "success",
    "task_id": "b869bad7-b489-4963-a18f-86d1014d3a4f"
}


service to validate bigcommerce credentials
https://api.bluecom.ai/api/bigcommerce/validateCredentials
POST
{
    "user_id":"123",
    "client_id":"k1lxcz9ir6ysmwc544k8r6lfg3i4b7r",
    "client_secret":"54413aa512762e4963ceb5b3130b302de08093550149871a67cf468ddbeffcd6",
    "shop_hash":"58jfruz8se",
    "shop":"test-bluecom-store",
    "access_token":"ryulgpelhqoodyb99p5rys39ym7nw6j"
}

Result
{
    "message": "Successfully added credentials",
    "products_count": 10,
    "status": "success",
    "store_id": "410799507680802395"
}

Service to sync store
https://api.bluecom.ai/api/bigcommerce/syncStore
POST
{
    "user_id":"123",
    "store_id":"139070545406036591"
}
Result
{
    "status": "success",
    "task_id": "b869bad7-b489-4963-a18f-86d1014d3a4f"
}
 * 
 * 
 * 
 * 
 * 
 */

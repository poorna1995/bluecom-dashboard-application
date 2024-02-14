import OnboardingHeader from "components/AppHeader/OnboardingHeader";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function ShopifyAuthPage() {
  const router = useRouter();
  const shop = router.query.shop;
  const clientID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
  const baseURL = process.env.NEXT_PUBLIC_SHOPIFY_APP_URL;
  const redirectURI = `${baseURL}auth/shopify-auth-callback`;
  const scopes = [
    "read_products",
    "read_locations",
    "read_inventory",
    "write_inventory",
    "write_products",
    "write_locations",
  ];

  useEffect(() => {
    if (shop) {
      let URL = `https://${shop}/admin/oauth/authorize?client_id=${clientID}&&redirect_uri=${redirectURI}&&scope=${scopes}`;
      window.location = URL;
    }
  }, [shop]);
  return (
    <div>
      <OnboardingHeader />

      <SectionLoader />
    </div>
  );
}

// https://app.bluecom.ai/auth/shopify-auth?hmac=992bd548a541bef03c4ee3c9a210321231541fc3b619905bef3a34f43cbd41e3&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvYXBwLWluc3RhbGwtc3RvcmU&shop=app-install-store.myshopify.com&timestamp=1697618737

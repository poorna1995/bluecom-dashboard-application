export const shopifyClientID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
export const shopifyAppURL = process.env.NEXT_PUBLIC_SHOPIFY_APP_URL;
export const shopifyRedirectURI = `${baseURL}auth/shopify-auth-callback`;
export const shopifyAuthScopes = [
  "read_products",
  "read_locations",
  "read_inventory",
  "write_inventory",
  "write_products",
  "write_locations",
];

import Shopify from "public/assets/icons/shopifyListIcon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import Woocommerce from "public/assets/icons/woocommerceListIcon.png";
import bigcommerce from "public/assets/icons/bigcommerce.svg";

let channelsOptions = {
  1: { image: Shopify, title: "shopify" },
  3: { image: Unlisted, title: "native" },
  4: { image: Woocommerce, title: "WooCommerce" },
  5: { image: bigcommerce, title: "bigcommerce" },
};

export let CHANNEL_IDS = {
  shopify: 1,
  native: 3,
  woocommerce: 4,
  bigcommerce: 5,
};

export default channelsOptions;

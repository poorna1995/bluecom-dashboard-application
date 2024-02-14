import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";

export const handleFetchProductsCount = ({ userId }) => {
  const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_COUNT;
  const data = {
    user_id: userId,
  };
  return appFetch(URL, data)
    .then((res) => {
      if (res.status === "success") {
        return res.result;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const handleFetchProductsList = ({
  userId,
  perPage,
  page,
  productTitle,
  channelId,
  storeId,
  tag,
  type,
  category,
}) => {
  const URL = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
  const data = {
    user_id: userId,
    per_page: perPage ?? 10,
    page: page ?? 1,
    product_title: productTitle ?? "",
    channel_id: channelId ?? "",
    store_id: storeId ?? "",
    tag: tag ?? [],
    type: type ?? "",
    category: category ?? "",
  };
  return appFetch(URL, data)
    .then((json) => {
      console.log({ json }, "inside react query");
      if (json.status === "success") {
        return json.result;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

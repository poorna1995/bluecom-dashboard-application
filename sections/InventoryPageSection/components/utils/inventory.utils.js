import { PRODUCT } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import appFetch from "utils/appFetch";

export function fetchInventoryForProduct({ user_id, productId }) {
  const url = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
  const data = {
    user_id,
    master_product_id: productId,
  };
  return new Promise((resolve, reject) => {
    appFetch(url, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          resolve(json);
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          reject(json);
        }
      })
      .catch((err) => {
        reject(err);
        console.error({ err });
      });
  });
}

function fetchProductInfo() {}

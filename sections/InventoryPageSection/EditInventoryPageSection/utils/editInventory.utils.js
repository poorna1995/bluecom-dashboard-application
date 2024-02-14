import { PRODUCT } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import appFetch from "utils/appFetch";

export const fetchProductDetails = ({ data }) => {
  const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;

  return new Promise((resolve, reject) =>
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          resolve(json.result[0]);
        }
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      })
  );
};

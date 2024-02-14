import appFetch from "utils/appFetch";
import { renderStatusString } from "../components/OrdersPageTableComponents/RenderOrderStatus";
import { ORDER_STATUS } from "./orders.constants";
import { ORDERS } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";

export const syncWooCommerceOrders = async ({ data }) => {
  const URL = "https://onboarding.bluecom.ai/api/woocommerce/syncOrders";
  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const syncBigCommerceOrders = async ({ data }) => {
  const URL = "https://onboarding.bluecom.ai/api/bigcommerce/syncOrders";
  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateOrderLineItem = ({ data }) => {
  const URL = ORDERS.UPDATE_ORDER_ITEM;
  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export function fetchOrdersCount({ data }) {
  const URL = ORDERS.FETCH_ORDERS_COUNT;
  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          resolve(json);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export const fetchOrderDetails = ({ data }) => {
  const URL = ORDERS.FETCH_ORDER_DETAILS;

  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          resolve(json.result[0]);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const fetchOrdersList = ({ data }) => {
  const URL = ORDERS.FETCH_ORDERS;

  return new Promise((resolve, reject) => {
    appFetch(URL, data)
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOrderStatus = (status) => {
  // console.log({ status });
  if (Array.isArray(status) && status.length > 1) {
    let result = Object.values(ORDER_STATUS).filter((item) =>
      status.includes(item)
    );
    // console.log({ status, result });

    return result;
  }
  const result = Object.values(ORDER_STATUS).find((item) => item === status);

  return result;
};

export const filteredOrders = (list, status) => {
  const orderStatus = getOrderStatus(status);
  if (Array.isArray(orderStatus) && orderStatus.length > 0) {
    const result = orderStatus
      .map((item) => {
        return list.filter((order) => order.status === item);
      })
      .flat();
    // console.log({ result });
    return result;
  }
  // console.log({ orderStatus });
  if (orderStatus === "all") return list;

  return list.filter((item) => item.status === orderStatus);
};

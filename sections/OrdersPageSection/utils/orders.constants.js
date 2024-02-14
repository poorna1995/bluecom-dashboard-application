export const ORDER_STATUS = {
  NOT_STARTED: "not started",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  FULFILLED: "fulfilled",
  PARTIALLY_FULFILLED: "partially fulfilled",
  PENDING: "pending",
  ALL: "all",
  REFUND: "refund",
};

export const ORDERS_PAGE_TABS = {
  all: {
    title: "All",
    route: "all",
    status: ORDER_STATUS.ALL,
  },
  unfulfilled: {
    title: "Not Started",
    route: "unfulfilled",
    status: ORDER_STATUS.NOT_STARTED,
  },
  "partially-fulfilled": {
    title: "Partially Fulfilled",
    route: "partially-fulfilled",
    status: ORDER_STATUS.PARTIALLY_FULFILLED,
  },
  fulfilled: {
    title: "Fulfilled",
    route: "fulfilled",
    status: ORDER_STATUS.FULFILLED,
  },
  cancelled: {
    title: "Cancelled",
    route: "cancelled",
    status: ORDER_STATUS.CANCELLED,
  },
  // pending: {
  // 	title: "Pending",
  // 	route: "pending",
  // 	status: ORDER_STATUS.PENDING,
  // },
  refund: {
    title: "Refund",
    route: "refund",
    status: ORDER_STATUS.REFUND,
  },
};

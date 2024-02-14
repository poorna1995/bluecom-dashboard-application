import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleApiCalls } from "./purchaseOrders.helpers";
import {
  fetchPurchaseOrderDataStart,
  setPurchaseOrderData,
} from "./purchaseOrdersSlice";

export function* fetchPurchaseOrderData({ payload: { url, data } }) {
  try {
    // yield put(setViewLoading(true));

    const response = yield handleApiCalls(url, data);
    const result = (response && response.result[0]) ?? {};

    console.log({ response }, "inside saga action fetchPurchaseOrderData");
    yield put(setPurchaseOrderData(result));
    // yield put(setViewLoading(false));
  } catch (error) {
    console.log({ error }, "fetchPurchaseOrderData");
    // yield put(setErrorMessage(error));
  }
}

export function* onFetchPurchaseOrderDataStart() {
  yield takeLatest(fetchPurchaseOrderDataStart.type, fetchPurchaseOrderData);
}
export default function* purchaseOrdersSagas() {
  yield all([call(onFetchPurchaseOrderDataStart)]);
}

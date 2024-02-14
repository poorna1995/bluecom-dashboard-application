import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchOrderDetailsStart,
  setOrderDetails,
  setOrderDetailsLoading,
} from "./ordersSlice";
import { fetchOrderDetails } from "sections/OrdersPageSection/utils/orders.utils";

export function* fetchOrderDetailsAction({ payload: { data } }) {
  try {
    // yield put()
    yield put(setOrderDetailsLoading(true));

    const order = yield fetchOrderDetails({ data });
    yield put(setOrderDetails(order));
    // setTimeout(() => {
    //     yield put(setOrderDetailsLoading(false));
    // }, 1200);

    yield put(setOrderDetailsLoading(false));
    // yield put(setViewLoading(true));
    // const userData = yield handleApiCalls(url, data);
    // console.log({ userData }, "inside saga action");
    // yield put(setOrderDetails(userData[0]));
    // yield put(setViewLoading(false));
  } catch (error) {
    console.log(error);
    // yield put(setErrorMessage(error));
  }
}

export function* onFetchOrderDetailsStart() {
  yield takeLatest(fetchOrderDetailsStart.type, fetchOrderDetailsAction);
}

export default function* ordersSagas() {
  yield all([call(onFetchOrderDetailsStart)]);
}

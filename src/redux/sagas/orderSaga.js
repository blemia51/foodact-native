import { takeLatest, put, call } from "redux-saga/effects";
import OrderApi from "../../api/OrderApi";
import {
  POST_ORDER,
  postOrderSuccess,
  postOrderFailure
} from "../actions/order";

export function* postOrder(action) {
  try {
    const { order } = action.payload;
    const orderApi = new OrderApi();
    const orderPosted = yield call(orderApi.postOrder, order);
    yield put(
      postOrderSuccess(
        orderPosted
      )
    );
  } catch (e) {
    if (e.response) {
      yield put(postOrderFailure(e.response.data.code));
    } else {
      yield put(postOrderFailure(e.message));
    }
  }
}

export default function* orderSaga() {
  console.log("test de orderSaga");
  yield takeLatest(POST_ORDER, postOrder);
}

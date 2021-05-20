import { takeLatest, put, call } from "redux-saga/effects";
import CategoriesApi from "../../api/CategoriesApi";
import {
  FETCH_CATEGORIES,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../actions/categories";

export function* getCategories() {
  const categoriesApi = new CategoriesApi();
  try {
    let categories = yield call(categoriesApi.fetchCategories);
    yield put(
      fetchCategoriesSuccess(
        categories
          .filter((data) => data.isActive && data.id !== 22)
          .sort((a, b) => a.orderCategory - b.orderCategory)
      )
    );
  } catch (e) {
    if (e.response) {
      yield put(fetchCategoriesFailure(e.response.data.code));
    } else {
      yield put(fetchCategoriesFailure(e.message));
    }
  }
}

export default function* categoriesSaga() {
  console.log("test de categories Saga");
  yield takeLatest(FETCH_CATEGORIES, getCategories);
}

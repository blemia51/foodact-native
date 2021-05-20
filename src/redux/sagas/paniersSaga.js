import { takeLatest, put, call } from 'redux-saga/effects';
//import request from '../utils/request';
import PaniersApi from '../../api/PaniersApi'
import { 
  FETCH_PANIERS,
  fetchPaniersSuccess,
  fetchPaniersFailure,
  FETCH_PANIERS_NAME,
  fetchPaniersNameSuccess,
  fetchPaniersNameFailure,
  FETCH_PANIERS_PRICE,
  fetchPaniersPriceSuccess,
  fetchPaniersPriceFailure
} from "../actions/paniers";
 
  
export function* getPaniers() {
  //const url = '/api/travels'
  const paniersApi = new PaniersApi()
  try {      
    const paniers = yield call(paniersApi.fetchPaniers);
    yield put(fetchPaniersSuccess(paniers));
  } catch (e) {
    if (e.response) {
      yield put(fetchPaniersFailure(e.response.data.code));
    } else {
      yield put(fetchPaniersFailure(e.message));
    }
  }
}

export function* getPaniersName() {
  //const url = '/api/travels'
  const paniersApi = new PaniersApi()
  try {      
    const paniersName = yield call(paniersApi.fetchPaniersName);
    yield put(fetchPaniersNameSuccess(paniersName));
  } catch (e) {
    if (e.response) {
      yield put(fetchPaniersNameFailure(e.response.data.code));
    } else {
      yield put(fetchPaniersNameFailure(e.message));
    }
  }
}

export function* getPaniersPrice() {
  //const url = '/api/travels'
  const paniersApi = new PaniersApi()
  try {      
    const paniersPrice = yield call(paniersApi.fetchPaniersPrice);
    yield put(fetchPaniersPriceSuccess(paniersPrice));
  } catch (e) {
    if (e.response) {
      yield put(fetchPaniersPriceFailure(e.response.data.code));
    } else {
      yield put(fetchPaniersPriceFailure(e.message));
    }
  }
}

export default function* paniersSaga() {
  console.log('test de paniers Saga')
  yield takeLatest(FETCH_PANIERS, getPaniers)
  yield takeLatest(FETCH_PANIERS_NAME, getPaniersName)
  yield takeLatest(FETCH_PANIERS_PRICE, getPaniersPrice)
}
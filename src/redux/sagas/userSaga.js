import jwtDecode from 'jwt-decode';
import { takeLatest, put, call } from 'redux-saga/effects';
//import request from '../utils/request';
import UserApi from '../../api/UserApi';
//import history from '../history'

import { 
  FETCH_USER_PROFILE,
  fetchUserProfileSuccess,
  userProfileFailure,
  POST_USER_PROFILE,
  postUserProfileSuccess,
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
  FETCH_CLIENT_ORDERS,
  fetchClientOrdersSuccess,
  clientOrdersFailure,
  LOG_OUT,
  logOutSuccess,
  logOutFailure,
  LOG_IN_START,
  logInSuccess,
  logInFailure,
} from "../actions/user";


export function* getUserProfile(token) {
  const userApi = new UserApi();
  try {      
    const userProfile = yield call(userApi.fetchUserProfile, token);
    console.log('saga userProfile', userProfile)
    const { client } = userProfile
    const clientId = client.split('/')[3].toString('')*1
    const clientProfile = yield call(userApi.fetchClientProfile, clientId)
    yield put(fetchUserProfileSuccess(clientProfile));
    yield call(getUserProfile, clientId)
    //history.push('/accueil')
    //console.log('history', history);
  } catch (e) {
    if (e.response) {
      yield put(userProfileFailure(e.response.data.code));
    } else {
      yield put(userProfileFailure(e.message));
    }
  }
}

export function* getClientOrders(clientId) {
  const userApi = new UserApi();
  try {      
    const clientOrders = yield call(userApi.fetchClientOrders);
    //const { client } = userProfile
    yield put(fetchClientOrdersSuccess(
      clientOrders
        .filter((data) => data.client === `/api/clients/${clientId}`
         && data.isPaid
        )
    ));
  } catch (e) {
    if (e.response) {
      yield put(clientOrdersFailure(e.response.data.code));
    } else {
      yield put(clientOrdersFailure(e.message));
    }
  }
}

export function* postUserProfile(action) {
  const { userProfile } = action.payload;
  //const url = '';
  const userApi = new UserApi();
  try {
    const userProfileFetched = yield call(userApi.postUserProfile, userProfile);
    yield put(postUserProfileSuccess(userProfileFetched));
  } catch (e) {
    yield put(userProfileFailure(e.message));
  }
}

export function* updateUserProfile(action) {
  try {
    const { userProfile } = action.payload;
    const userApi = new UserApi();
    const userProfileUpdated = yield call(userApi.updateUserProfile, userProfile);
    yield put(updateUserProfileSuccess(userProfileUpdated));
  } catch (e) {
    yield put(userProfileFailure(e.message));
  }
}


export function* logIn(action) {
  try {
    const { login } = action.payload;
    const userApi = new UserApi();
    const userLoggedIn = yield call(userApi.logIn, login);
    
    const { token } = userLoggedIn;
    const tokenDecoded = jwtDecode(token)
    
    yield put(
      logInSuccess(
        token,
        tokenDecoded,
      ));
    
    yield call(getUserProfile, token);
    //history.push('/accueil')
    
    
  } catch(e) {
    yield put(logInFailure(e.message));
  }
}

export function* logOut() {
  try {
    yield put(logOutSuccess());
  } catch(e) {
    yield put(logOutFailure(e.message));
  }
}

export default function* userSaga() {
  console.log('test de userSaga')

  yield takeLatest(LOG_IN_START, logIn);
  yield takeLatest(FETCH_USER_PROFILE, getUserProfile);
  yield takeLatest(FETCH_CLIENT_ORDERS, getClientOrders);
  yield takeLatest(POST_USER_PROFILE, postUserProfile);
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(LOG_OUT, logOut);
}

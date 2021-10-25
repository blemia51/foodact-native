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
  PUT_USER_PUSHTOKEN,
  //putUserPushTokenSuccess,
  putUserPushTokenFailure,
  POST_PASSWORD_FORGOTTEN,
  postPasswordForgottenSuccess,
  postPasswordForgottenFailure,
  POST_PUSHTOKEN,
  postPushTokenSuccess,
  postPushTokenFailure,
  GET_PUSHTOKEN,
  getPushTokenSuccess,
  getPushTokenFailure
} from "../actions/user";


export function* getUserProfile(token) {
  const userApi = new UserApi();
  try {      
    const userProfile = yield call(userApi.fetchUserProfile, token);
    const { client } = userProfile
    const clientId = client.split('/')[4].toString('')*1
    
    const clientProfile = yield call(userApi.fetchClientProfile, clientId, token)
    //console.log('saga clientprofile', clientProfile)
    yield put(fetchUserProfileSuccess(clientProfile));
    //yield call(getUserProfile, clientId)
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

export function* getClientOrders(action) {
  const userApi = new UserApi()
  const { email } = action.payload
  try {      
    const clientOrders = yield call(userApi.fetchClientOrders, email);
    console.log('saga clientorders', clientOrders)
    yield put(fetchClientOrdersSuccess(clientOrders))
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

export function* postPasswordForgotten(action) {
  const { userEmail } = action.payload;
  const userApi = new UserApi()
  try {
    const passwordForgotten = yield call(userApi.postPasswordForgotten, userEmail);
    console.log('saga password', passwordForgotten)
    yield put(postPasswordForgottenSuccess(passwordForgotten))
  } catch (e) {
    yield put(postPasswordForgottenFailure(e.message));
  }
}

export function* updateUserProfile(action) {
  try {
    const { userProfile, token } = action.payload;
    const userApi = new UserApi();
    const userProfileUpdated = yield call(userApi.updateUserProfile, userProfile, token);
    yield put(updateUserProfileSuccess(userProfileUpdated));
  } catch (e) {
    yield put(userProfileFailure(e.message));
  }
}

export function* putUserPushToken(action) {
  try { 
    const { pushToken, userId, token } = action.payload;
    const userApi = new UserApi();
    const userPushTokenPosted = yield call(userApi.putUserPushToken, pushToken, userId, token);
    yield put(updateUserProfileSuccess(userPushTokenPosted));
  } catch (e) {
    yield put(putUserPushTokenFailure(e.message));
  }
}

export function* postPushToken(action) {
  try { 
    const { pushToken } = action.payload;
    const userApi = new UserApi();
    const pushTokenPosted = yield call(userApi.postPushToken, pushToken);
    yield put(postPushTokenSuccess(pushTokenPosted));
  } catch (e) {
    yield put(postPushTokenFailure(e.message));
  }
}

export function* getPushToken() {
  try {
    const userApi = new UserApi()
    const pushTokenFetched = yield call(userApi.getPushToken)
    yield put(getPushTokenSuccess(pushTokenFetched))
  } catch (e) {
    yield put(getPushTokenFailure(e.message))
    
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
  yield takeLatest(PUT_USER_PUSHTOKEN, putUserPushToken)
  yield takeLatest(POST_PASSWORD_FORGOTTEN, postPasswordForgotten)
  yield takeLatest(POST_PUSHTOKEN, postPushToken)
  yield takeLatest(GET_PUSHTOKEN, getPushToken)
}

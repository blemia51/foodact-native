export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export const FETCH_CLIENT_ORDERS = 'FETCH_CLIENT_ORDERS';
export const FETCH_CLIENT_ORDERS_SUCCESS = 'FETCH_CLIENT_ORDERS_SUCCESS';
export const CLIENT_ORDERS_FAILURE = 'CLIENT_ORDERS_FAILURE';

export const logIn = (login) => ({
  type: LOG_IN_START,
  payload: {
    login
  }
});

export const logInSuccess = (token, tokenDecoded) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    token,
    tokenDecoded
  }
});

export const logInFailure = (error) => ({
  type: LOG_IN_FAILURE,
  payload: {
    error,
  }
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

export const logOutFailure = (error) => ({
  type: LOG_IN_FAILURE,
  payload: {
    error,
  }
});

export const fetchUserProfile = (userId, token) => ({
  type: FETCH_USER_PROFILE,
  payload: {
    userId,
    //token,
  },
});

export const fetchUserProfileSuccess = (userState) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: {
    userProfile: userState,
  },
});

export const userProfileFailure = (error) => ({
  type: USER_PROFILE_FAILURE,
  payload: {
    error,
  },
});

export const fetchClientOrders = () => ({
  type: FETCH_CLIENT_ORDERS,
  payload: {
    //userId,
    //token,
  },
});

export const fetchClientOrdersSuccess = (clientOrders) => ({
  type: FETCH_CLIENT_ORDERS_SUCCESS,
  payload: {
    clientOrders: clientOrders,
  },
});

export const clientOrdersFailure = (error) => ({
  type: CLIENT_ORDERS_FAILURE,
  payload: {
    error,
  },
});
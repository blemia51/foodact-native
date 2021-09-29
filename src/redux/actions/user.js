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
export const POST_USER_PROFILE = 'POST_USER_PROFILE';
export const POST_USER_PROFILE_SUCCESS = 'POST_USER_PROFILE_SUCCESS';
export const POST_USER_PROFILE_FAILURE = 'POST_USER_PROFILE_FAILURE';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';
export const PUT_USER_PUSHTOKEN = 'PUT_USER_PUSHTOKEN';
export const PUT_USER_PUSHTOKEN_SUCCESS = 'PUT_USER_PUSHTOKEN_SUCCESS';
export const PUT_USER_PUSHTOKEN_FAILURE = 'PUT_USER_PUSHTOKEN_FAILURE';


export const putUserPushToken = (userId, pushToken) => ({
  type: PUT_USER_PUSHTOKEN,
  payload: {
    pushToken,
    userId,
  }
});

export const putUserPushTokenSuccess = (userProfile) => ({
  type: PUT_USER_PUSHTOKEN_SUCCESS,
  payload: {
    userProfile
  }
});

export const putUserPushTokenFailure = (error) => ({
  type: PUT_USER_PUSHTOKEN_FAILURE,
  payload: {
    error
  }
});

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

export const postUserProfile = (userProfile) => ({
  type: POST_USER_PROFILE,
  payload: {
    userProfile
  }
})

export const postUserProfileSuccess = (response) => ({
  type: POST_USER_PROFILE_SUCCESS,
  payload: {
    response,
  },
});

export const updateUserProfile = (userProfile) => ({
  type: UPDATE_USER_PROFILE,
  payload: {
    userProfile
  }
})

export const updateUserProfileSuccess = (response) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: {
    response,
  },
})

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

export const fetchClientOrders = (email) => ({
  type: FETCH_CLIENT_ORDERS,
  payload: {
    email
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
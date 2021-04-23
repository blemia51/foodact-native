export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export const FETCH_USER_COMMANDES = 'FETCH_USER_COMMANDEs';
export const FETCH_USER_COMMANDES_SUCCESS = 'FETCH_USER_COMMANDES_SUCCESS';
export const USER_COMMANDES_FAILURE = 'USER_COMMANDES_FAILURE';

export const logIn = (login) => ({
  type: LOG_IN_START,
  payload: {
    login
  }
});

export const logInSuccess = (userId, token) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    userId,
    token
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

export const fetchUserCommandes = () => ({
  type: FETCH_USER_COMMANDES,
  payload: {
    //userId,
    //token,
  },
});

export const fetchUserCommandesSuccess = (userCommandes) => ({
  type: FETCH_USER_COMMANDES_SUCCESS,
  payload: {
    userCommandes: userCommandes,
  },
});

export const userCommandesFailure = (error) => ({
  type: USER_COMMANDES_FAILURE,
  payload: {
    error,
  },
});
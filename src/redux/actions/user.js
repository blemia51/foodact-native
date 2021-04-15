export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';

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

export const fetchUserProfile = (userID, token) => ({
  type: FETCH_USER_PROFILE,
  payload: {
    userID: userID,
    token,
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
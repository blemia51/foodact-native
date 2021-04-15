import { 
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
} from '../actions/user'
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../../constants/statusConstants';


export default function (state = {}, action) {
  switch (action.type) {
    case LOG_IN_START:
      return {
        ...state,
        login: action.payload.login,
        status: STATUS_LOADING,
      };
      case LOG_IN_SUCCESS:
        return {
          ...state,
          userID: action.payload.userID,
          token: action.payload.token,
          status: STATUS_SUCCESS,
        };
      case LOG_IN_FAILURE:
        return {
          ...state,
          error: action.payload,
          status: STATUS_FAILURE,
        };
        case FETCH_USER_PROFILE:
          return {
            ...state,
            status: STATUS_LOADING,
          };
        case FETCH_USER_PROFILE_SUCCESS:
          return {
            ...state,
            userProfile: action.payload.userProfile,
            status: STATUS_SUCCESS,
          };
        case USER_PROFILE_FAILURE:
          return {
            ...state,
            status: STATUS_FAILURE,
          };
      default:
        return state;
  }
}

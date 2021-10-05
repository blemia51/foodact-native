import { 
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_CLIENT_ORDERS,
  FETCH_CLIENT_ORDERS_SUCCESS,
  CLIENT_ORDERS_FAILURE,
  POST_USER_PROFILE_SUCCESS,
  POST_PASSWORD_FORGOTTEN,
  POST_PASSWORD_FORGOTTEN_SUCCESS,
  POST_PASSWORD_FORGOTTEN_FAILURE,
  GET_PUSHTOKEN,
  GET_PUSHTOKEN_SUCCESS,
  GET_PUSHTOKEN_FAILURE
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
          token: action.payload.token,
          tokenDecoded: action.payload.tokenDecoded,
          status: STATUS_SUCCESS,
        };
      case LOG_IN_FAILURE:
        return {
          ...state,
          error: action.payload,
          status: STATUS_FAILURE,
        };
        case LOG_OUT:
          return {
            ...state,
            status: STATUS_LOADING,
          };
          case LOG_OUT_SUCCESS:
            return {
              ...state,
              token: null,
              userProfile: null,
              status: STATUS_SUCCESS,
            };
          case LOG_OUT_FAILURE:
            return {
              ...state,
              error: action.payload,
              status: STATUS_FAILURE,
            };
          case POST_USER_PROFILE_SUCCESS:
              return {
                ...state,
                postSuccess: action.payload.response,
                postStatus: STATUS_SUCCESS,
            };
        case FETCH_USER_PROFILE:
          return {
            ...state,
            profilStatus: STATUS_LOADING,
          };
        case FETCH_USER_PROFILE_SUCCESS:
          return {
            ...state,
            userProfile: action.payload.userProfile,
            profilStatus: STATUS_SUCCESS,
          };
        case USER_PROFILE_FAILURE:
          return {
            ...state,
            profilStatus: STATUS_FAILURE,
          };
        case FETCH_CLIENT_ORDERS:
          return {
            ...state,
            orderStatus: STATUS_LOADING,
          };
        case FETCH_CLIENT_ORDERS_SUCCESS:
          return {
            ...state,
            clientOrders: action.payload.clientOrders,
            orderStatus: STATUS_SUCCESS,
          };
        case CLIENT_ORDERS_FAILURE:
          return {
            ...state,
            orderStatus: STATUS_FAILURE,
          };
        case POST_PASSWORD_FORGOTTEN:
          return {
            ...state,
            passwordStatus: STATUS_LOADING
          };
        case POST_PASSWORD_FORGOTTEN_SUCCESS:
          return {
            ...state,
            passwordForgotten: action.payload.passwordForgotten,
            passwordStatus: STATUS_SUCCESS
          };
        case POST_PASSWORD_FORGOTTEN_FAILURE:
          return {
            ...state,
            passwordStatus: STATUS_FAILURE
          };
        case GET_PUSHTOKEN:
          return {
            ...state,
            pushTokenStatus: STATUS_LOADING
          };
        case GET_PUSHTOKEN_SUCCESS:
          return {
            ...state,
            pushTokens: action.payload.pushTokens,
            pushTokenStatus: STATUS_SUCCESS
          }
        case GET_PUSHTOKEN_FAILURE:
          return {
            ...state,
            pushTokenStatus: STATUS_FAILURE
          }
      default:
        return state;
  }
}

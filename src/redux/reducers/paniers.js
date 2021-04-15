import {
  FETCH_PANIERS,
  FETCH_PANIERS_SUCCESS,
  FETCH_PANIERS_FAILURE,
  FETCH_PANIERS_NAME,
  FETCH_PANIERS_NAME_SUCCESS,
  FETCH_PANIERS_NAME_FAILURE,
  FETCH_PANIERS_PRICE,
  FETCH_PANIERS_PRICE_SUCCESS,
  FETCH_PANIERS_PRICE_FAILURE
} from "../actions/paniers"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PANIERS:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_PANIERS_SUCCESS:
      return {
        ...state,
        paniers: action.payload.paniers,
        status: STATUS_SUCCESS,
      };
    case FETCH_PANIERS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
      case FETCH_PANIERS_NAME:
        return {
          ...state,
          status: STATUS_LOADING,
        };
      case FETCH_PANIERS_NAME_SUCCESS:
        return {
          ...state,
          paniersName: action.payload.paniersName,
          status: STATUS_SUCCESS,
        };
      case FETCH_PANIERS_NAME_FAILURE:
        return {
          ...state,
          status: STATUS_FAILURE,
        };
        case FETCH_PANIERS_PRICE:
          return {
            ...state,
            status: STATUS_LOADING,
          };
        case FETCH_PANIERS_PRICE_SUCCESS:
          return {
            ...state,
            paniersPrice: action.payload.paniersPrice,
            status: STATUS_SUCCESS,
          };
        case FETCH_PANIERS_PRICE_FAILURE:
          return {
            ...state,
            status: STATUS_FAILURE,
          }; 
    default:
      return state;
  }
}
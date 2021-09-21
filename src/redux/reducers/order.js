import {
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE,
} from "../actions/order"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case POST_ORDER:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        status: STATUS_SUCCESS,
      };
    case POST_ORDER_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
    default:
      return state;
  }
}
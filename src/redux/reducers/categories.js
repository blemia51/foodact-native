import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/categories"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        status: STATUS_SUCCESS,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
    default:
      return state;
  }
}
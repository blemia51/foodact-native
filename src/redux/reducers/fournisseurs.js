import {
  FETCH_FOURNISSEURS,
  FETCH_FOURNISSEURS_SUCCESS,
  FETCH_FOURNISSEURS_FAILURE,
  FETCH_CRENEAUX_FOURNISSEURS,
  FETCH_CRENEAUX_FOURNISSEURS_SUCCESS,
  FETCH_CRENEAUX_FOURNISSEURS_FAILURE
} from "../actions/fournisseurs"
import { STATUS_LOADING, STATUS_FAILURE, STATUS_SUCCESS } from '../../constants/statusConstants';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FOURNISSEURS:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_FOURNISSEURS_SUCCESS:
      return {
        ...state,
        fournisseurs: action.payload.fournisseurs,
        status: STATUS_SUCCESS,
      };
    case FETCH_FOURNISSEURS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
    case FETCH_CRENEAUX_FOURNISSEURS:
      return {
        ...state,
        status: STATUS_LOADING,
      };
    case FETCH_CRENEAUX_FOURNISSEURS_SUCCESS:
      return {
        ...state,
        creneauxFournisseurs: action.payload.creneauxFournisseurs,
        status: STATUS_SUCCESS,
      };
    case FETCH_CRENEAUX_FOURNISSEURS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE,
      };
    default:
      return state;
  }
}
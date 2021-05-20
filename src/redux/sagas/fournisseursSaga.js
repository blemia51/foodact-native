import { takeLatest, put, call } from 'redux-saga/effects';
//import request from '../utils/request';
import FournisseursApi from '../../api/FournisseursApi'
import { 
  FETCH_FOURNISSEURS,
  fetchFournisseursSuccess,
  fetchFournisseursFailure,
  FETCH_CRENEAUX_FOURNISSEURS,
  fetchCreneauxFournisseursSuccess,
  fetchCreneauxFournisseursFailure,
} from "../actions/fournisseurs";
 
  
export function* getFournisseurs() {
  //const url = '/api/travels'
  const fournisseursApi = new FournisseursApi()
  try {      
    const fournisseurs = yield call(fournisseursApi.fetchFournisseurs);
    yield put(
      fetchFournisseursSuccess(
        fournisseurs
          .filter(
            (data) =>
              data.ville === "/api/villes/10" &&
              data.isEnabled &&
              data.paniers.length > 0
          )
          .map((fournisseur) => ({
            id: fournisseur.id,
            nom: fournisseur.nom,
            adresse: fournisseur.adresse,
            latitude: fournisseur.lat,
            longitude: fournisseur.lng,
            creneaux: fournisseur.expirationCreaneau,
            paniers: fournisseur.paniers.map((data) =>
              data.split("/")[3].toString("")
            ),
          }))
        ));
  } catch (e) {
    if (e.response) {
      yield put(fetchFournisseursFailure(e.response.data.code));
    } else {
      yield put(fetchFournisseursFailure(e.message));
    }
  }
}

export function* getCreneauxFournisseurs() {
  //const url = '/api/travels'
  const fournisseursApi = new FournisseursApi()
  try {      
    const creneauxFournisseurs = yield call(fournisseursApi.fetchCreneauxFournisseurs);
    yield put(
      fetchCreneauxFournisseursSuccess(
        creneauxFournisseurs
        .map((value) => ({
          id: value.id,
          lundi: {
            dayName: 'lundi',
            id: 1,
            isActive: value.lunIsActive,
            start: value.lunStart,
            end: value.lunEnd,
            marche: value.marcheLun,
          },
          mardi: {
            dayName: 'mardi',
            id: 2,
            isActive: value.marIsActive,
            start: value.marStart,
            end: value.marEnd,
            marche: value.marcheMar,
          },
          mercredi: {
            dayName: 'mercredi',
            id: 3,
            isActive: value.merIsActive,
            start: value.merStart,
            end: value.merEnd,
            marche: value.marcheMer,
          },
          jeudi: {
            dayName: 'jeudi',
            id: 4,
            isActive: value.jeuIsActive,
            start: value.jeuStart,
            end: value.jeuEnd,
            marche: value.marcheJeu,
          },
          vendredi: {
            dayName: 'vendredi',
            id: 5,
            isActive: value.venIsActive,
            start: value.venStart,
            end: value.venEnd,
            marche: value.marcheVen,
          },
          samedi: {
            dayName: 'samedi',
            id: 6,
            isActive: value.samIsActive,
            start: value.samStart,
            end: value.samEnd,
            marche: value.marcheSam,
          },
          dimanche: {
            dayName: 'dimanche',
            id: 0,
            isActive: value.dimIsActive,
            start: value.dimStart,
            end: value.dimEnd,
            marche: value.marcheDim,
          }
        }))
      ));
  } catch (e) {
    if (e.response) {
      yield put(fetchCreneauxFournisseursFailure(e.response.data.code));
    } else {
      yield put(fetchCreneauxFournisseursFailure(e.message));
    }
  }
}

export default function* fournisseursSaga() {
  console.log('test de fournisseurs Saga')
  yield takeLatest(FETCH_FOURNISSEURS, getFournisseurs)
  yield takeLatest(FETCH_CRENEAUX_FOURNISSEURS, getCreneauxFournisseurs)
}

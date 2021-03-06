import { spawn, all } from "redux-saga/effects";
import userSaga from './userSaga';
import paniersSaga from './paniersSaga'
import fournisseursSaga from './fournisseursSaga'
import categoriesSaga from './categoriesSaga'

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(paniersSaga),
    spawn(fournisseursSaga),
    spawn(categoriesSaga),
  ]);
}

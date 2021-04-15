export const FETCH_FOURNISSEURS = 'FETCH_FOURNISSEURS';
export const FETCH_FOURNISSEURS_SUCCESS = 'FETCH_FOURNISSEURS_SUCCESS';
export const FETCH_FOURNISSEURS_FAILURE = 'FETCH_FOURNISSEURS_FAILURE';
export const FETCH_CRENEAUX_FOURNISSEURS = 'FETCH_CRENEAUX_FOURNISSEURS';
export const FETCH_CRENEAUX_FOURNISSEURS_SUCCESS = 'FETCH_CRENEAUX_FOURNISSEURS_SUCCESS';
export const FETCH_CRENEAUX_FOURNISSEURS_FAILURE = 'FETCH_CRENEAUX_FOURNISSEURS_FAILURE';


export const fetchFournisseurs = (success) => ({
  type: FETCH_FOURNISSEURS,
  payload: {
    success,
  },
});

export const fetchFournisseursSuccess = (fournisseurs) => ({
  type: FETCH_FOURNISSEURS_SUCCESS,
  payload: {
    fournisseurs: fournisseurs,
  },
});

export const fetchFournisseursFailure = (error) => ({
  type: FETCH_FOURNISSEURS_FAILURE,
  payload: {
    error,
  },
});

export const fetchCreneauxFournisseurs = (success) => ({
  type: FETCH_CRENEAUX_FOURNISSEURS,
  payload: {
    success,
  },
});

export const fetchCreneauxFournisseursSuccess = (creneauxFournisseurs) => ({
  type: FETCH_CRENEAUX_FOURNISSEURS_SUCCESS,
  payload: {
    creneauxFournisseurs: creneauxFournisseurs,
  },
});

export const fetchCreneauxFournisseursFailure = (error) => ({
  type: FETCH_CRENEAUX_FOURNISSEURS_FAILURE,
  payload: {
    error,
  },
});


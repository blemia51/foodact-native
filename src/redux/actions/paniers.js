export const FETCH_PANIERS = 'FETCH_PANIERS';
export const FETCH_PANIERS_SUCCESS = 'FETCH_PANIERS_SUCCESS';
export const FETCH_PANIERS_FAILURE = 'FETCH_PANIERS_FAILURE';
export const FETCH_PANIERS_NAME = 'FETCH_PANIERS_NAME';
export const FETCH_PANIERS_NAME_SUCCESS = 'FETCH_PANIER_NAME_SUCCESS';
export const FETCH_PANIERS_NAME_FAILURE = 'FETCH_PANIERS_NAME_FAILURE';
export const FETCH_PANIERS_PRICE = 'FETCH_PANIERS_PRICE';
export const FETCH_PANIERS_PRICE_SUCCESS = 'FETCH_PANIER_PRICE_SUCCESS';
export const FETCH_PANIERS_PRICE_FAILURE = 'FETCH_PANIERS_PRICE_FAILURE';


export const fetchPaniers = (success) => ({
  type: FETCH_PANIERS,
  payload: {
    success,
  },
});

export const fetchPaniersSuccess = (paniers) => ({
  type: FETCH_PANIERS_SUCCESS,
  payload: {
    paniers: paniers,
  },
});

export const fetchPaniersFailure = (error) => ({
  type: FETCH_PANIERS_FAILURE,
  payload: {
    error,
  },
});

export const fetchPaniersName = (success) => ({
  type: FETCH_PANIERS_NAME,
  payload: {
    success,
  },
});

export const fetchPaniersNameSuccess = (paniersName) => ({
  type: FETCH_PANIERS_NAME_SUCCESS,
  payload: {
    paniersName: paniersName,
  },
});

export const fetchPaniersNameFailure = (error) => ({
  type: FETCH_PANIERS_NAME_FAILURE,
  payload: {
    error,
  },
});

export const fetchPaniersPrice = (success) => ({
  type: FETCH_PANIERS_PRICE,
  payload: {
    success,
  },
});

export const fetchPaniersPriceSuccess = (paniersPrice) => ({
  type: FETCH_PANIERS_PRICE_SUCCESS,
  payload: {
    paniersPrice: paniersPrice,
  },
});

export const fetchPaniersPriceFailure = (error) => ({
  type: FETCH_PANIERS_PRICE_FAILURE,
  payload: {
    error,
  },
});
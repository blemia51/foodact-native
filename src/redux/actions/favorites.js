export const UPLOAD_FAVORITE = 'UPLOAD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export const uploadFavorite = (favorites) => ({
  type: UPLOAD_FAVORITE,
  payload: {
    favorites: favorites,
  },
});

export const deleteFavorite = () => ({
  type: DELETE_FAVORITE,
  payload: {
    favorites: null,
  },
});

export const UPLOAD_FAVORITE_DATA = 'UPLOAD_FAVORITE_DATA';
export const DELETE_FAVORITE_DATA = 'DELETE_FAVORITE_DATA';

export const uploadFavoriteData = (favoritesDatas) => ({
  type: UPLOAD_FAVORITE_DATA,
  payload: {
    favoritesDatas: favoritesDatas,
  },
});

export const deleteFavoriteData = () => ({
  type: DELETE_FAVORITE_DATA,
  payload: {  
    favoritesDatas: null,
  },
});

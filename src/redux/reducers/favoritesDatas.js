import { UPLOAD_FAVORITE_DATA, DELETE_FAVORITE_DATA } from '../actions/favoritesDatas'

export default function (state = { favoritesDatas: [] }, action) {
  switch (action.type) {
    case UPLOAD_FAVORITE_DATA:
      return {
        ...state,
        favoritesDatas: action.payload.favoritesDatas,
      };
    case DELETE_FAVORITE_DATA:
      return state;
    default:
      return state;
  }
}
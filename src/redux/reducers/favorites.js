import { UPLOAD_FAVORITE, DELETE_FAVORITE } from '../actions/favorites'

export default function (state = { favorites: [] }, action) {
  switch (action.type) {
    case UPLOAD_FAVORITE:
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    case DELETE_FAVORITE:
      return state;
    default:
      return state;
  }
}
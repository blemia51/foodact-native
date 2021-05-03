import { UPLOAD_LOCATION, DELETE_LOCATION } from '../actions/location'

export default function (state = {}, action) {
  switch (action.type) {
    case UPLOAD_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };
    case DELETE_LOCATION:
      return state;
    default:
      return state;
  }
}
export const UPLOAD_LOCATION = 'UPLOAD_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';

export const uploadLocation = (location) => ({
  type: UPLOAD_LOCATION,
  payload: {
    location: location,
  },
});

export const deleteLocation = () => ({
  type: DELETE_LOCATION,
  payload: {
    location: null,
  },
});
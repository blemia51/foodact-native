export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILURE = 'POST_ORDER_FAILURE';


export const postOrder = (order) => ({
  type: POST_ORDER,
  payload: {
    order,
  },
});

export const postOrderSuccess = (order) => ({
  type: POST_ORDER_SUCCESS,
  payload: {
    order: order,
  },
});

export const postOrderFailure = (error) => ({
  type: POST_ORDER_FAILURE,
  payload: {
    error,
  },
});
import { FETCH_CASHBOXES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CASHBOXES:
      return action.payload;
    default:
      return state;
  }
};

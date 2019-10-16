import { FETCH_CASHBOX_LIST, FETCH_CASHBOX } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CASHBOX_LIST:
      return action.payload;
    case FETCH_CASHBOX:
      return action.payload;
    default:
      return state;
  }
};

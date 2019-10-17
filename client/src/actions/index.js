import axios from 'axios';
import { FETCH_USER, FETCH_CASHBOX_LIST, FETCH_CASHBOX } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/users/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSignup = (values, history) => async dispatch => {
  const res = await axios.post('/api/users/signup', values);

  history.push('/cashboxes');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSignin = (values, history) => async dispatch => {
  const res = await axios.post('/api/users/signin', values);

  history.push('/cashboxes');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCashboxes = () => async dispatch => {
  const res = await axios.get('/api/cashboxes');

  dispatch({ type: FETCH_CASHBOX_LIST, payload: res.data });
};

export const submitCashbox = (values, history) => async dispatch => {
  const res = await axios.post('/api/cashboxes', values);

  history.push('/cashboxes');
  dispatch({ type: FETCH_CASHBOX_LIST, payload: res.data });
};

export const fetchCashbox = cashboxId => async dispatch => {
  console.log(`fetching cashbox with id of ${cashboxId}`);
  const res = await axios.get(`/api/cashboxes/${cashboxId}`);

  console.log(res);
  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const submitTransaction = (values, history) => async dispatch => {
  console.log(`submitting transaction with values of ${values}`);
  const res = await axios.post(
    `/api/cashboxes/${values.cashboxId}/transactions`
  );

  console.log(res);
  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

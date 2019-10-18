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
  const res = await axios.get(`/api/cashboxes/${cashboxId}`);

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const submitTransaction = (
  values,
  cashboxId,
  history
) => async dispatch => {
  const res = await axios.post(
    `/api/cashboxes/${cashboxId}/transactions`,
    values
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

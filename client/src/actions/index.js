import axios from 'axios';
import { FETCH_USER, FETCH_CASHBOX_LIST, FETCH_CASHBOX } from './types';
import makePdf from '../utils/makePdf';

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
  console.log(`POSTING to /api/cashboxes/${cashboxId}/transactions`);
  const res = await axios.post(
    `/api/cashboxes/${cashboxId}/transactions`,
    values
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const getPDF = fullCashbox => dispatch => {
  console.log(fullCashbox);
  makePdf(fullCashbox);
};

export const deleteCashbox = (cashboxId, history) => dispatch => {
  console.log(`DELETE to /api/cashboxes/${cashboxId}`);
  axios.delete(`/api/cashboxes/${cashboxId}`);

  history.push('/cashboxes');
};

export const deleteTransaction = (
  cashboxId,
  transactionId
) => async dispatch => {
  console.log(
    `DELETE to /api/cashboxes/${cashboxId}/transactions/${transactionId}`
  );
  const res = await axios.delete(
    `/api/cashboxes/${cashboxId}/transactions/${transactionId}`
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const updateTransaction = (
  values,
  cashboxId,
  transactionId
) => async dispatch => {
  console.log(
    `PUTTING to /api/cashboxes/${cashboxId}/transactions/${transactionId}`
  );
  console.log(values);
  const res = await axios.put(
    `/api/cashboxes/${cashboxId}/transactions/${transactionId}`,
    values
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

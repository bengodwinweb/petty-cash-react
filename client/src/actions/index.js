import axios from "axios";
import { FETCH_USER, FETCH_CASHBOX_LIST, FETCH_CASHBOX } from "./types";
import makePdf from "../utils/makePdf";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/users/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSignup = (values, history) => async dispatch => {
  const res = await axios.post("/api/users/signup", values);

  history.push("/");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSignin = (values, history) => async dispatch => {
  const res = await axios.post("/api/users/signin", values);

  history.push("/");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCashboxes = () => async dispatch => {
  const res = await axios.get("/api/cashboxes");

  dispatch({ type: FETCH_CASHBOX_LIST, payload: res.data });
};

export const submitCashbox = (values, history) => async dispatch => {
  const res = await axios.post("/api/cashboxes", values);

  history.push("/");
  dispatch({ type: FETCH_CASHBOX_LIST, payload: res.data });
};

export const fetchCashbox = cashboxId => async dispatch => {
  const res = await axios.get(`/api/cashboxes/${cashboxId}`);

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const submitTransaction = (values, cashboxId) => async dispatch => {
  console.log(`POST to /api/cashboxes/${cashboxId}/transactions`);
  const res = await axios.post(
    `/api/cashboxes/${cashboxId}/transactions`,
    values
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const getPDF = fullCashbox => dispatch => {
  makePdf(fullCashbox);
};

export const deleteCashbox = (cashboxId, history) => dispatch => {
  console.log(`DELETE to /api/cashboxes/${cashboxId}`);
  axios.delete(`/api/cashboxes/${cashboxId}`);

  history.push("/");
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

export const updateTransaction = values => async dispatch => {
  console.log(
    `PUT to /api/cashboxes/${values._cashbox}/transactions/${values._id}`
  );
  const res = await axios.put(
    `/api/cashboxes/${values._cashbox}/transactions/${values._id}`,
    values
  );

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const updateCashbox = values => async dispatch => {
  console.log(`PUT to /api/cashboxes/${values._id}`);
  const res = await axios.put(`/api/cashboxes/${values._id}`, values);

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const updateBox = values => async dispatch => {
  console.log(`PUT to /api/cashboxes/${values._cashbox}/box/`, values);
  const res = await axios.put(`/api/cashboxes/${values._cashbox}/box/`, values);

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

export const resetBox = cashboxId => async dispatch => {
  console.log(`GET to /api/cashboxes/${cashboxId}/reset`);
  const res = await axios.get(`/api/cashboxes/${cashboxId}/reset`);

  dispatch({ type: FETCH_CASHBOX, payload: res.data });
};

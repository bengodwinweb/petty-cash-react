import axios from 'axios';
import { FETCH_USER } from './types';

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

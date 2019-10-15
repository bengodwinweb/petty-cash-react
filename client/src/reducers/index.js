import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import cashboxReducer from './cashboxReducer';

export default combineReducers({
  auth: authReducer,
  cashboxes: cashboxReducer,
  form: reduxForm
});

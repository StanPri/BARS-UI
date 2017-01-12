import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import items from './itemReducer';
import fetchCallsInProgress from './fetchStatusReducer';

const rootReducer = combineReducers({
  form: formReducer,
  items,
  fetchCallsInProgress
});

export default rootReducer;

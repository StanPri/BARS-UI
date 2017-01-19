import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import records from './recordReducer';
import fetchCallsInProgress from './fetchStatusReducer';

const rootReducer = combineReducers({
  form: formReducer,
  records,
  fetchCallsInProgress
});

export default rootReducer;

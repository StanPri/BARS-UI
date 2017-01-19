import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import fetchCallsInProgress from './fetchStatusReducer';
import {formReducer as formPage} from './formReducer'; // TODO:needed?delete?
import {userReducer as user} from './userReducer';
import {listsReducer as lists} from './listsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  formPage,
  lists,
  user,
  fetchCallsInProgress
});

export default rootReducer;

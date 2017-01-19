import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import items from './itemReducer'; // TODO:DELETE THROUGHOUT APP!!
import fetchCallsInProgress from './fetchStatusReducer';
import {formReducer as formPage} from './formReducer'; // TODO:needed?delete?
import {userReducer as user} from './userReducer';
import {listsReducer as lists} from './listsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  formPage,
  lists,
  user,
  items,
  fetchCallsInProgress
});

export default rootReducer;

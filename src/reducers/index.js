import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import fetchCallsInProgress from './fetchStatusReducer';
import {userReducer as user} from './userReducer';
import {authUserReducer as authUser} from './authUserReducer.js';
import {empDirReducer as empDir} from './empDirReducer.js';
import {requestFormReducer as requestForm} from './requestFormReducer';
import {requestsAllReducer as requestsAll} from './requestsAllReducer';
import {requestsUserReducer as requestsUser} from './requestsUserReducer';

const rootReducer = combineReducers({
  form: formReducer,
  requestForm,
  user,
  empDir,
  authUser,
  requestsAll,
  requestsUser,
  fetchCallsInProgress
});

export default rootReducer;

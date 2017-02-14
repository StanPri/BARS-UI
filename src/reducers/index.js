import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import fetchCallsInProgress from './fetchStatusReducer';
import {authReducer as auth} from './authReducer.js';
import {empDirReducer as empDir} from './empDirReducer.js';
import {requestFormReducer as requestForm} from './requestFormReducer';
import {requestsAllReducer as requestsAll} from './requestsAllReducer';
import {requestsUserReducer as requestsUser} from './requestsUserReducer';

// ALL reducers must got through this reducer
const rootReducer = combineReducers({
  form: formReducer,
  requestForm,
  empDir,
  auth,
  requestsAll,
  requestsUser,
  fetchCallsInProgress
});

export default rootReducer;

////////////// COMMON REDUCER FUNCTIONS ////////////////////
/**
 * Converts repsonse from api into byId object
 * @param  {object} data - repsonse from api
 * @return {object}      - object with signature {id1: data1, id2: data2, ...etc}
 */
export const getById = (data, key) => {
  let _data = {};
  Object.keys(data).forEach(k => {
    _data[data[k][key]] = data[k];
  });
  return _data;
};

/**
 * Converts repsonse from api into allIds array
 * @param  {object} data - repsonse from api
 * @return {array}      - array of all ids with signature [id1, id2, ...etc]
 */
export const getAllIds = (data, key) => Object.keys(data).map(k => data[k][key]);


// TODO:
// calling bars before jwt returns - wait for jwt to finish before bars
// not refreshiing after approve manager - wait for api to finish before redirect
// TDC infront of sam accounts -> emp dir

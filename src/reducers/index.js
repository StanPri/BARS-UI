import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import fetchCallsInProgress from './fetchStatusReducer';
import {authReducer as auth} from './authReducer.js';
import {empDirReducer as empDir} from './empDirReducer.js';
import {requestFormReducer as requestForm} from './requestFormReducer';
import {requestsAllReducer as requestsAll} from './requestsAllReducer';
import {requestsUserReducer as requestsUser} from './requestsUserReducer';
import * as KEYS from '../store/keyMap';

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

export const mapRequestsToById = (data, key) => {
  let _data = {};
  Object.keys(data).forEach(k => {
    _data[data[k][key]] = data[k];
    if (data[k][KEYS.FORM_EXPIRE_DATE]) {
      _data[data[k][key]][KEYS.FORM_EXPIRE_DATE] = data[k][KEYS.FORM_EXPIRE_DATE].slice(0,10);
    }
    if (data[k][KEYS.FORM_SECURITY_TIME]) {
      _data[data[k][key]][KEYS.FORM_SECURITY_TIME] = data[k][KEYS.FORM_SECURITY_TIME].slice(0,10);
    }
    if (data[k][KEYS.FORM_TERMS]) {
      _data[data[k][key]][KEYS.FORM_TERMS] = data[k][KEYS.FORM_TERMS].slice(0,10);
    }
    if (data[k][KEYS.FORM_TERMS_SUP]) {
      _data[data[k][key]][KEYS.FORM_TERMS_SUP] = data[k][KEYS.FORM_TERMS_SUP].slice(0,10);
    }
    if (_data[data[k][key]][KEYS.FORM_IS_ESCALATED]) {
      _data[data[k][key]][KEYS.FORM_APPROVER_NAME] = data[k][KEYS.FORM_MANAGER_NAME];
      _data[data[k][key]][KEYS.FORM_APPROVER_EMAIL] = data[k][KEYS.FORM_MANAGER_EMAIL];
      _data[data[k][key]][KEYS.FORM_APPROVER_PHONE] = data[k][KEYS.FORM_MANAGER_PHONE];
      _data[data[k][key]][KEYS.FORM_APPROVER_SAM] = data[k][KEYS.FORM_SAM_MANAGER];
    }
    else {
      _data[data[k][key]][KEYS.FORM_APPROVER_NAME] = data[k][KEYS.FORM_SUP_NAME];
      _data[data[k][key]][KEYS.FORM_APPROVER_EMAIL] = data[k][KEYS.FORM_SUP_EMAIL];
      _data[data[k][key]][KEYS.FORM_APPROVER_PHONE] = data[k][KEYS.FORM_SUP_PHONE];
      _data[data[k][key]][KEYS.FORM_APPROVER_SAM] = data[k][KEYS.FORM_SAM_SUPER];
    }
  });
  return _data;
}

/**
 * Converts repsonse from api into allIds array
 * @param  {object} data - repsonse from api
 * @return {array}      - array of all ids with signature [id1, id2, ...etc]
 */
export const getAllIds = (data, key) => Object.keys(data).map(k => data[k][key]);

import {
  REQUESTS_SEC_REQUEST,
  REQUESTS_SEC_SUCCESS,
  REQUESTS_SEC_FAILURE,
  REQUESTS_MGR_REQUEST,
  REQUESTS_MGR_SUCCESS,
  REQUESTS_MGR_FAILURE,
  REQUESTS_USER_REQUEST,
  REQUESTS_USER_SUCCESS,
  REQUESTS_USER_FAILURE
} from '../actions/actionTypes';
import {combineReducers} from 'redux';
import initialState from './initialState';
import {getById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

// list of requests for SECURITY
export const security = (state = initialState.requestsUser.security, action) => {
  switch (action.type) {
    case REQUESTS_SEC_REQUEST:
      return state;
    case REQUESTS_SEC_SUCCESS:
      return {
        byId: getById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID)
      };
    case REQUESTS_SEC_FAILURE:
      return state;
    default:
      return state;
  }
};

// list of requests for MANAGERS
export const approvals = (state = initialState.requestsUser.approvals, action) => {
  switch (action.type) {
    case REQUESTS_MGR_REQUEST:
      return state;
    case REQUESTS_MGR_SUCCESS:
      return {
        byId: getById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID)
      };
    case REQUESTS_MGR_FAILURE:
      return state;
    default:
      return state;
  }
};

// list of requests for ALL USERS
export const requests = (state = initialState.requestsUser.requests, action) => {
  switch (action.type) {
    case REQUESTS_USER_REQUEST:
      return state;
    case REQUESTS_USER_SUCCESS:
      return {
        byId: getById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID)
      };
    case REQUESTS_USER_FAILURE:
      return state;
    default:
      return state;
  }
};

export const requestsUserReducer = combineReducers({security, approvals, requests});

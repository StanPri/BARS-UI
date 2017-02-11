import {
  REQUESTS_APPROVE_REQUEST,
  REQUESTS_APPROVE_SUCCESS,
  REQUESTS_APPROVE_FAILURE,
  REQUESTS_USER_REQUEST,
  REQUESTS_USER_SUCCESS,
  REQUESTS_USER_FAILURE
} from '../actions/actionTypes';
import {combineReducers} from 'redux';
import initialState from './initialState';
import {getById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

const debug = 0;

// list of requests for APPROVERS
export const approvals = (state = initialState.requestsUser.approvals, action) => {
  switch (action.type) {
    case REQUESTS_APPROVE_REQUEST:
      return state;
    case REQUESTS_APPROVE_SUCCESS:
      if (debug) console.log("REQUESTS_APPROVE_SUCCESS: ", action.response);
      return {
        byId: getById(action.response, KEYS.FORM_ID),
        allIds: getAllIds(action.response, KEYS.FORM_ID)
      };
    case REQUESTS_APPROVE_FAILURE:
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
      if (debug) console.log("REQUESTS_USER_SUCCESS: ", action.response);
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

export const requestsUserReducer = combineReducers({approvals, requests});

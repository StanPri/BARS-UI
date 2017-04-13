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
import {mapRequestsToById, getAllIds} from './index';
import * as KEYS from '../store/keyMap';

const debug = 0;

// list of requests for APPROVERS
export const approvals = (state = initialState.requestsUser.approvals, action) => {
  switch (action.type) {
    case REQUESTS_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case REQUESTS_USER_SUCCESS:
      if (debug)
        console.log("REQUESTS_APPROVE_SUCCESS: ", action.response.requestsNeedingApproval);
      return {
        byId: mapRequestsToById(action.response.requestsNeedingApproval, KEYS.FORM_ID),
        allIds: getAllIds(action.response.requestsNeedingApproval, KEYS.FORM_ID),
        error: null,
        isFetching: false
      };
    case REQUESTS_USER_FAILURE:
      return {
        ...initialState.requestsUser.approvals,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};

// list of requests for ALL USERS
export const requests = (state = initialState.requestsUser.requests, action) => {
  switch (action.type) {
    case REQUESTS_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case REQUESTS_USER_SUCCESS:
      if (debug)
        console.log("REQUESTS_USER_SUCCESS: ", action.response.requestsForSelf);
      return {
        byId: mapRequestsToById(action.response.requestsForSelf, KEYS.FORM_ID),
        allIds: getAllIds(action.response.requestsForSelf, KEYS.FORM_ID),
        error: null,
        isFetching: false
      };
    case REQUESTS_USER_FAILURE:
      return {
        ...initialState.requestsUser.requests,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};

// list of requests for ALL USERS
export const group = (state = initialState.requestsUser.group, action) => {
  switch (action.type) {
    case REQUESTS_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case REQUESTS_USER_SUCCESS:
      if (debug)
        console.log("REQUESTS_USER_SUCCESS: ", action.response.previousRequestsForPeople);
      return {
        byId: action.response.previousRequestsForPeople,
        allIds: Object.keys(action.response.previousRequestsForPeople),
        error: null,
        isFetching: false
      };
    case REQUESTS_USER_FAILURE:
      return {
        ...initialState.requestsUser.group,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};

export const requestsUserReducer = combineReducers({approvals, requests, group});

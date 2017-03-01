import {reset} from 'redux-form';
import {CALL_API} from '../middleware/api';
import * as types from "./actionTypes";
import * as KEYS from '../store/keyMap';

// get requests for all users
export const requestsGetAll = () => ({
  [CALL_API]: {
    endpoint: '/',
    types: [types.REQUESTS_ALL_REQUEST, types.REQUESTS_ALL_SUCCESS, types.REQUESTS_ALL_FAILURE]
  }
});

// get requests for user not pending their approval
export const requestsGetUser = () => ({
  [CALL_API]: {
    endpoint: `/RequestsForSelf/`,
    types: [types.REQUESTS_USER_REQUEST, types.REQUESTS_USER_SUCCESS, types.REQUESTS_USER_FAILURE]
  }
});

// get requests for user that are pending their approval
export const requestsGetApprovals = () => ({
  [CALL_API]: {
    endpoint: `/RequestsNeedingApproval/`,
    types: [types.REQUESTS_APPROVE_REQUEST, types.REQUESTS_APPROVE_SUCCESS, types.REQUESTS_APPROVE_FAILURE]
  }
});

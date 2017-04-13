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

// get requests for user
// - contains past requests, requests needing their approval, users in group
export const requestsGetUser = () => ({
  [CALL_API]: {
    endpoint: `/GetBarsAppStartupData/`,
    types: [types.REQUESTS_USER_REQUEST, types.REQUESTS_USER_SUCCESS, types.REQUESTS_USER_FAILURE]
  }
});

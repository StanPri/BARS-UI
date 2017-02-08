import {reset} from 'redux-form';
import { CALL_API } from '../middleware/api';
import * as types from "./actionTypes";

export const requestsGetAll = () => ({
  [CALL_API]: {
    endpoint: '/',
    types: [types.REQUESTS_ALL_REQUEST, types.REQUESTS_ALL_SUCCESS, types.REQUESTS_ALL_FAILURE]
  }
});

export const requestsGetUser = () => ({
  [CALL_API]: {
    endpoint: '/RequestsForSelf',
    types: [types.REQUESTS_USER_REQUEST, types.REQUESTS_USER_SUCCESS, types.REQUESTS_USER_FAILURE]
  }
});

export const requestsGetManager = () => ({
  [CALL_API]: {
    endpoint: '/RequestsNeedingApproval',
    types: [types.REQUESTS_MGR_REQUEST, types.REQUESTS_MGR_SUCCESS, types.REQUESTS_MGR_FAILURE]
  }
});

export const requestsGetSecurity = () => ({
  [CALL_API]: {
    endpoint: '/RequestsNeedingApproval',
    types: [types.REQUESTS_SEC_REQUEST, types.REQUESTS_SEC_SUCCESS, types.REQUESTS_SEC_FAILURE]
  }
});

import {reset} from 'redux-form';
import { CALL_API } from '../middleware/api';
import * as types from "./actionTypes";

// TODO: REMOVE AFTER TESTING DONE
// TODO: UPDATE URLS TO NOT HAVE PARAMS!
export const _roles = ['User', 'Manager', 'Security'];
export const _types = ['Submitter', 'Recipient', 'Approver', 'Security'];
export const user = {role: _roles[1], type: _types[1]}

export const requestsGetAll = () => ({
  [CALL_API]: {
    endpoint: '/',
    types: [types.REQUESTS_ALL_REQUEST, types.REQUESTS_ALL_SUCCESS, types.REQUESTS_ALL_FAILURE]
  }
});

export const requestsGetUser = () => ({
  [CALL_API]: {
    endpoint: `/RequestsForSelf/${user.role}/${user.type}`,
    types: [types.REQUESTS_USER_REQUEST, types.REQUESTS_USER_SUCCESS, types.REQUESTS_USER_FAILURE]
  }
});

export const requestsGetApprovals = () => ({
  [CALL_API]: {
    endpoint: `/RequestsNeedingApproval/${user.role}/${user.type}`,
    types: [types.REQUESTS_APPROVE_REQUEST, types.REQUESTS_APPROVE_SUCCESS, types.REQUESTS_APPROVE_FAILURE]
  }
});

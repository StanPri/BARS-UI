import {reset} from 'redux-form';
import {CALL_API} from '../middleware/api';
import * as types from "./actionTypes";
import * as KEYS from '../store/keyMap';
// mock data for testing
import * as mock from '../mock/user';

// View exisiting request
export const requestFormView = data => ({type: types.REQUEST_FORM_VIEW, data});
export const requestFormReset = data => ({type: types.REQUEST_FORM_RESET});

// Submit new request
export const submitNewRequest = data => {
  console.log("Submitting new request: ", data);
  return ({
    [CALL_API]: {
      endpoint: mock.useMock.BARS
        ? `/CreateNewRequest/`
        : `/CreateNewRequest/`,
      method: 'post',
      body: data,
      types: [types.SUBMIT_NEW_REQUEST, types.SUBMIT_NEW_SUCCESS, types.SUBMIT_NEW_FAILURE]
    }
  });
}

// Submit existing request for approval
export const submitExistingRequest = id => {
  console.log("Submitting existing request: ", id);
  return ({
    [CALL_API]: {
      endpoint: mock.useMock.BARS
        ? `/Approve/`
        : `/Approve/${id}`,
      method: 'put',
      types: [types.SUBMIT_EXISTING_REQUEST, types.SUBMIT_EXISTING_SUCCESS, types.SUBMIT_EXISTING_FAILURE]
    }
  });
}

// Submit existing request for approval
export const deleteExistingRequest = (id, reason) => {
  console.log("Deleting existing request: ", id);
  console.log("\t\twith reason: ", reason);
  return ({
    [CALL_API]: {
      endpoint: mock.useMock.BARS
        ? `/CancelBadgeRequest/`
        : `/CancelBadgeRequest/${id}`,
      method: 'put',
      body: {[KEYS.FORM_REJECT_REASON] : reason},
      types: [types.CANCEL_EXISTING_REQUEST, types.CANCEL_EXISTING_SUCCESS, types.CANCEL_EXISTING_FAILURE]
    }
  });
}

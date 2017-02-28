import {reset} from 'redux-form';
import {CALL_API} from '../middleware/api';
import * as types from "./actionTypes";
import * as KEYS from '../store/keyMap';
// mock data for testing
import * as mock from '../mock/user';

const debug = 0;

// View exisiting request
export const requestFormView = data => ({type: types.REQUEST_FORM_VIEW, data});
export const requestFormReset = data => ({type: types.REQUEST_FORM_RESET});

// Submit new request
export const submitNewRequest = data => {
  if (debug)
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
  if (debug)
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
  if (debug)
    console.log("Deleting existing request: ", id, "  with reason: ", reason);
  return ({
    [CALL_API]: {
      endpoint: mock.useMock.BARS
        ? `/CancelBadgeRequest/`
        : `/CancelBadgeRequest/${id}`,
      method: 'put',
      body: {
        "reason": reason
      },
      types: [types.CANCEL_EXISTING_REQUEST, types.CANCEL_EXISTING_SUCCESS, types.CANCEL_EXISTING_FAILURE]
    }
  });
}

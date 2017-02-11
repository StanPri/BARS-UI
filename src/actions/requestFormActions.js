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

import * as KEYS from '../store/keyMap';

/**
 * Initial state of application
 */
export default {
  form : {}, // redux-form, single form entry (our form has key of 'form' inside this)
  empDir : {
    byId: {},
    allIds: []
  }, // information for all users in employee directory
  requestForm : {}, // used to set state of redux form, single form entry
  requestsAll : {
    byId: {},
    allIds: []
  }, // all requests
  requestsUser : {
    approvals: {
      byId: {},
      allIds: []
    },
    requests: {
      byId: {},
      allIds: []
    }
  }, // requests for user -> approvals, requests
  auth: {
    [KEYS.USER_ROLE]: '',
    [KEYS.USER_SAM]: ''
  }, // user information -> if authenicatied, role, etc
  fetchCallsInProgress : 0 // status of if fetch in progress
};

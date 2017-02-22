import * as KEYS from '../store/keyMap';

/**
 * Initial state of application
 */
export default {
  form : {
    form: {},
    wizard: {}
  }, // redux-form, single form entry (our form has key of 'form' inside this)
  empDir : {
    byId: {},
    allIds: [],
    error: null,
    isFetching: false
  }, // information for all users in employee directory
  requestForm : {}, // used to set state of exisitng entry in redux form, single form entry
  requestsAll : {
    byId: {},
    allIds: [],
    error: null,
    isFetching: false
  }, // all requests
  requestsUser : {
    approvals: {
      byId: {},
      allIds: [],
      error: null,
      isFetching: false
    },
    requests: {
      byId: {},
      allIds: [],
      error: null,
      isFetching: false
    }
  }, // requests for user -> approvals, requests
  auth : {
    [KEYS.USER_ROLE]: '',
    [KEYS.USER_SAM]: '',
    error: null,
    isFetching: false
  }, // user information -> if authenicatied, role, etc
  fetchCallsInProgress : 0 // status of if fetch in progress
};

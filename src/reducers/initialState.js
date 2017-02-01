/**
 * Initial state of application
 */
import {MOCK_user} from '../MOCK/user';
import * as KEYS from '../store/keyMap';

//TODO: remove mock data / hook up to api. current sets mock data on load here
//TODO: consolidate reducers/state and rethink/rework overall layout
export default {
  form : {}, // redux-form, single form entry (our form has key of 'form' inside this)
  user : MOCK_user, // user information -> authenticated?, account id, etc
  empDir: [], // information for all users in employee directory
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
  authUser : {
    errorMessage: "",
    isAuthenticated: localStorage.getItem('id_token')
      ? true
      : false
  },
  fetchCallsInProgress : 0 // status of if fetch in progress
};

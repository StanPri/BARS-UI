import {MOCK_user} from '../MOCK/user';
import {MOCK_lists} from '../MOCK/lists';
import * as KEYS from '../store/keyMap';

//TODO: remove mock data / hook up to api. current sets mock data on load here
export default {
  form : {}, // redux-form, single form entry (our form has key of 'form' inside this)
  user : MOCK_user, // user information -> authenticated?, account id, etc
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

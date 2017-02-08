import {combineReducers} from 'redux';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import * as KEYS from '../store/keyMap';

// TODO: remove this mock data
const roles = [KEYS.ROLE_USERS, KEYS.ROLE_MANAGER, KEYS.ROLE_SECURITY];
const user = {
  [KEYS.USER_ROLE]: roles[2],
  [KEYS.USER_SAM]: 'SAM : MANAGER : APPROVER : SUBMITTER'
}

/**
 * Information about user's authrentication, including their role, name and if authenicated
 * @param  {object} state       - immutible store state, information about user
 * @param  {object} action      - action containing type and other information
 * @return {object} state       - new state based off actions
 */
export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return state;
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        [KEYS.USER_ROLE]: user[KEYS.USER_ROLE],
        [KEYS.USER_SAM]: user[KEYS.USER_SAM]
      });
    case AUTH_FAILURE:
      return initialState.auth; // TODO: add error handling
    default:
      return state;
  }
};

import {combineReducers} from 'redux';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import * as KEYS from '../store/keyMap';
// mock data for testing
import * as mock from '../mock/user';

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
        // [KEYS.USER_ROLE]: mock.useMock.ED ? mock.user.role : action.role,
        // [KEYS.USER_SAM]: mock.useMock.ED ? mock.user.sam : action.sam
        [KEYS.USER_ROLE]: action.role,
        [KEYS.USER_SAM]: action.sam
      });
    case AUTH_FAILURE:
      return initialState.auth; // TODO: add error handling
    default:
      return state;
  }
};

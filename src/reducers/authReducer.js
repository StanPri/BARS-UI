import {combineReducers} from 'redux';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';
import * as KEYS from '../store/keyMap';

/**
 * Information about user's authrentication, including their role, name and if authenicated
 * @param  {object} state       - immutible store state, information about user
 * @param  {object} action      - action containing type and other information
 * @return {object} state       - new state based off actions
 */
export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        [KEYS.USER_ROLE]: action.role,
        [KEYS.USER_SAM]: action.sam,
        error: null,
        isFetching: false
      });
    case AUTH_FAILURE:
      return {
        ...initialState.auth,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};

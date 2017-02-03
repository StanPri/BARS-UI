import {combineReducers} from 'redux';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';

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
        isAuthenticated: true,
        role: action.role,
        name: action.name
      });
    case AUTH_FAILURE:
      return initialState.auth; // TODO: add error handling
    default:
      return state;
  }
};

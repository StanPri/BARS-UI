import {combineReducers} from 'redux';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';

// The auth reducer. The starting state sets authentication based on a token
// being in local storage. In a real app, we would also want a util to check if
// the token is expired.
// TODO: check if expired
// TODO: add fetchCallInprogress
export const authUser = (state = initialState.authUser, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: action.creds
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
};

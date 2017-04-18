/***********************************************************
 *  /src/reducers/tests/authReducer.test.js
 *
 *  Tests for user authentication reducer.
 **********************************************************/
import expect from 'expect';
import {authReducer} from '../authReducer';
import initialState from '../initialState';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE} from '../../actions/actionTypes';
import * as KEYS from '../../store/keyMap';

describe('authReducer', () => {
  let state = {};
  beforeEach(() => {
    state = initialState.auth;
  });
  it('should return the inital state by default', () => {
    const expectedResult = {...state};
    expect(authReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should update its fetch status when in progress', () => {
    const action = {
      type: AUTH_REQUEST
    };
    const expectedResult = {
      ...state,
      error: null,
      isFetching: true
    };
    expect(authReducer(state, action)).toEqual(expectedResult);
  });
  it('should populate user information on success', () => {
    const role = 'test-role';
    const sam = 'test-sam';
    const action = {
      type: AUTH_SUCCESS,
      role: role,
      sam: sam
    };
    const expectedResult = {
      [KEYS.USER_ROLE]: role,
      [KEYS.USER_SAM]: sam,
      error: null,
      isFetching: false
    };
    expect(authReducer(state, action)).toEqual(expectedResult);
  });
  it('should set an error on failure', () => {
    const error = 'test-error';
    const action = {
      type: AUTH_FAILURE,
      error: error
    };
    const expectedResult = {
      ...state,
      error: error,
      isFetching: false
    };
    expect(authReducer(state, action)).toEqual(expectedResult);
  });
});

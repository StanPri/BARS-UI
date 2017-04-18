/***********************************************************
 *  /src/reducers/tests/requestsAllReducer.test.js
 *
 *  Tests for all requests reducer.
 **********************************************************/
import expect from 'expect';
import {requestsAllReducer} from '../requestsAllReducer';
import initialState from '../initialState';
import {REQUESTS_ALL_REQUEST, REQUESTS_ALL_SUCCESS, REQUESTS_ALL_FAILURE} from '../../actions/actionTypes';
import * as KEYS from '../../store/keyMap';

describe('requestsAllReducer', () => {
  let state = {};
  beforeEach(() => {
    state = initialState.requestsAll;
  });
  it('should return the inital state by default', () => {
    const expectedResult = {
      ...state
    };
    expect(requestsAllReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should update its fetch status when in progress', () => {
    const action = {
      type: REQUESTS_ALL_REQUEST
    };
    const expectedResult = {
      ...state,
      error: null,
      isFetching: true
    };
    expect(requestsAllReducer(state, action)).toEqual(expectedResult);
  });
  it('should populate the request list on success', () => {
    const response = [
      {
        [KEYS.FORM_ID]: 'one',
        name: 'test-one'
      }, {
        [KEYS.FORM_ID]: 'two',
        name: 'test-two'
      }, {
        [KEYS.FORM_ID]: 'three',
        name: 'test-three'
      }
    ];
    const action = {
      type: REQUESTS_ALL_SUCCESS,
      response
    };
    const expectedById = {
      'one': response[0],
      'two': response[1],
      'three': response[2]
    };
    const expectedAllIds = ['one', 'two', 'three'];
    const expectedResult = {
      byId: expectedById,
      allIds: expectedAllIds,
      error: null,
      isFetching: false
    };
    expect(requestsAllReducer(state, action)).toEqual(expectedResult);
  });
  it('should set an error on failure', () => {
    const error = 'test-error';
    const action = {
      type: REQUESTS_ALL_FAILURE,
      error: error
    };
    const expectedResult = {
      ...state,
      error: error,
      isFetching: false
    };
    expect(requestsAllReducer(state, action)).toEqual(expectedResult);
  });
});

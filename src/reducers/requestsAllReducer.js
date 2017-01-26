import {REQUESTS_ALL_REQUEST, REQUESTS_ALL_SUCCESS, REQUESTS_ALL_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';

// list of requests
// TODO: for inital state pass all (isfetching, etc, or just requestALl?)
export const requestsAllReducer = (state = initialState.requestsAll, action) => {
  switch (action.type) {
    case REQUESTS_ALL_REQUEST:
      return Object.assign({}, state, {});  // TODO: pass isFetching here like chuck norris has?
    case REQUESTS_ALL_SUCCESS:
    console.log('in requestsAllReducer REQUESTS_ALL_SUCCESS' + action.response);
      return Object.assign({}, state, {});  // TODO: ya.
    case REQUESTS_ALL_FAILURE:
      return state; // TODO
    default:
      return state;
  }
};

import {REQUESTS_USER_REQUEST, REQUESTS_USER_SUCCESS, REQUESTS_USER_FAILURE} from '../actions/actionTypes';
import initialState from './initialState';

// list of requests
export const requestsUserReducer = (state = initialState.requestsUser, action) => {
  switch (action.type) {
    case REQUESTS_USER_REQUEST:
      return state;  // TODO: pass isFetching here like chuck norris has?
    case REQUESTS_USER_SUCCESS:
      return state;  // TODO: ya.
    case REQUESTS_USER_FAILURE:
      return state; // TODO
    default:
      return state;
  }
};

// TODO implement this..
// +// The quotes reducer
// +function quotes(state = {
// +    isFetching: false,
// +    quote: '',
// +    authenticated: false
// +  }, action) {
// +  switch (action.type) {
// +    case QUOTE_REQUEST:
// +      return Object.assign({}, state, {
// +        isFetching: true
// +      });
// +    case QUOTE_SUCCESS:
// +      return Object.assign({}, state, {
// +        isFetching: false,
// +        quote: action.response,
// +        authenticated: action.authenticated || false
// +      });
// +    case QUOTE_FAILURE:
// +      return Object.assign({}, state, {
// +        isFetching: false
// +      });
// +    default:
// +      return state;
// +  }
// +}

import {REQUEST_FORM_NEW, REQUEST_FORM_VIEW} from '../actions/actionTypes';
import initialState from './initialState';

// form data for single request
export const requestFormReducer = (state = initialState.requestForm, action) => {
  switch (action.type) {
    case REQUEST_FORM_NEW:
      return {data: {}};
    case REQUEST_FORM_VIEW:
      return {data: action.data};
    default:
      return state;
  }
};

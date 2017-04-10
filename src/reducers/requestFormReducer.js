import {REQUEST_FORM_RESET, REQUEST_FORM_VIEW} from '../actions/actionTypes';
import initialState from './initialState';

// form data for single request
export const requestFormReducer = (state = initialState.requestForm, action) => {
  switch (action.type) {
    case REQUEST_FORM_RESET:
      return initialState.requestForm;
    case REQUEST_FORM_VIEW:
      return {
        ...action.data
      };
    default:
      return state;
  }
};

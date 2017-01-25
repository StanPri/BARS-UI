import {FORM_VIEW, FORM_NEW} from '../actions/actionTypes';
import initialState from './initialState';

export const formReducer = (state = initialState.formPage, action) => {
  switch (action.type) {
    case FORM_NEW:
      return {data: {}};
    case FORM_VIEW:
      return {data: action.data};
    default:
      return state;
  }
};

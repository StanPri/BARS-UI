import {FORM_VIEW} from '../actions/actionTypes';
import initialState from './initialState';

export const formReducer = (state = initialState.formPage, action) => {
  switch (action.type) {
    case FORM_VIEW:
    /*eslint no-console: 0 */
      console.log(`SETTING FORM VIEW ::::::: ${action.data}`);
      // return {   data: action.data }
      return state;
    default:
      return state;
  }
};

import {FORM_VIEW} from '../actions/formActions';
import initialState from './initialState';

export const formReducer = (state = initialState.formPage, action) => {
  switch (action.type) {
    case FORM_VIEW:
      console.log(`SETTING FORM VIEW ::::::: ${action.data}`);
      // return {
      //   data: action.data
      // }
      return state;
    default:
      return state
  }
};

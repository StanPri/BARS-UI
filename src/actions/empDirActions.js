/**
 * Actions to call Employee Directory API
 * Used to populate information of users
 */
import * as types from './actionTypes';

const debug = false;
const EMP_DIR_URL = 'http://EDAPI/employees';

export const empDirRequest = () => ({type: types.EMP_DIR_REQUEST});
export const empDirSuccess = employees => ({type: types.EMP_DIR_SUCCESS, employees});
export const empDirFailure = message => ({type: types.EMP_DIR_FAILURE, message});

export const empDir = () => dispatch => {
  dispatch(empDirRequest());

  return fetch(EMP_DIR_URL).then(response => response.json().then(data => ({data, response}))).then(({data, response}) => {
    if (!response.ok) {
      // If there was a problem, we want to dispatch the error condition
      if (debug)
        console.error(`error: empDir fetch failed`);
      dispatch(empDirFailure(data.message));
      return Promise.reject(data);
    } else {
      // Dispatch the success action
      if (debug)
        console.log(`SETTING empDir -> employees: `, data);
      dispatch(empDirSuccess(data));
    }
  }).catch(err => console.log("Error: ", err));
};

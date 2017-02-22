/**
 * Actions to call Employee Directory API
 * Used to populate information of users
 */
import * as types from './actionTypes';
// mock data for testing
import * as mock from '../mock/user';

const debug = false;
const EMP_DIR_URL = mock.useMock.ED
  ? 'http://localhost:3001/ED'
  : process.env.API_ED;

export const empDirRequest = () => ({type: types.EMP_DIR_REQUEST});
export const empDirSuccess = employees => ({type: types.EMP_DIR_SUCCESS, employees});
export const empDirFailure = error => ({type: types.EMP_DIR_FAILURE, error});

export const empDir = () => dispatch => {
  dispatch(empDirRequest());
  if (debug)
    console.log(`empDirActions.js: using ${EMP_DIR_URL}`);
  return fetch(EMP_DIR_URL).then(response => response.json().then(data => ({data, response}))).then(({data, response}) => {
    if (!response.ok) {
      // If there was a problem, we want to dispatch the error
      // condition
      if (debug)
        console.error(`\terror: empDir fetch failed`);
      dispatch(empDirFailure(data.message));
      return Promise.reject(data);
    } else {
      // Dispatch the success action
      if (debug)
        console.log(`\tsuccess: empDir -> employees: `, data);
      dispatch(empDirSuccess(data));
    }
  }).catch(err => dispatch(empDirFailure(err.message)));
};
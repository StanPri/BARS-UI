/**
 * Actions to call authentication (security) api
 * Used to retrieve JWT for authentication
 */
import decode from 'jwt-decode';
import * as types from './actionTypes';

const debug = false;
const AUTH_URL = 'https://sec.api.technology.ca.gov:3001/createToken';

export const authRequest = () => ({type: types.AUTH_REQUEST});
export const authSuccess = ({sam, role}) => ({type: types.AUTH_SUCCESS, sam, role});
export const authFailure = error => ({type: types.AUTH_FAILURE, error});

export const auth = () => dispatch => {
  // check if token alreday exists in local storage
  let local_token = localStorage.getItem('id_token');
local_token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnYXJ5LmNveCIsIkJBUlMiOlsiVXNlciIsIkd1YXJkIl0sIkNUUyI6IlVzZXItY3drIiwiVkwiOiJBZG1pbiIsImlhdCI6MTQ4NjQyNDEyNCwiZXhwIjoxOTg2NDI3NzI0fQ.AsyKs2G1xLhoqsvSm1ojiAgw7j183BQaqHZhkhiV0fs';
local_token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsZG9ja3RlciIsIkJBUlMiOlsiVXNlciIsIkd1YXJkIl0sIkNUUyI6IlVzZXItY3drIiwiVkwiOiJBZG1pbiIsImlhdCI6MTQ4NjQyNDEyNCwiZXhwIjoxOTg2NDI3NzI0fQ.TFAUcuoRbkwpC-c1SHeE1GGHbJyRd1GpL_K7h4_VVAQ';

  // /** TEST DATA **/
  // local_token = null; // force request from api instedad of localstorage
  // // chris -> user, guard
  // local_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpcy5rdW1tZXIiLCJCQVJTIjpbIlVzZXIiLCJHdWFyZCJdLCJDVFMiOiJVc2VyLWN3ayIsIlZMIjoiQWRtaW4iLCJpYXQiOjE0ODY0MjQxMjQsImV4cCI6MTk4NjQyNzcyNH0.CM-LgIbvGi0UXjMa2TtEnF2Q_meZxZqZmauLoYMas1w';
  // // van -> user
  //local_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkY2N0NTAiLCJCQVJTIjpbIlVzZXIiXSwiQ1RTIjoiVXNlci1jd2siLCJWTCI6IkFkbWluIiwiaWF0IjoxNDg2NDI0MTI0LCJleHAiOjE5ODY0Mjc3MjR9.OZoCzjbS4IfTWojImiz1va1ysOyJXTyySiniF8jTgiI';
  // // ryan -> user, security
  //local_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyeWFuLnZvbGxtZXIiLCJCQVJTIjpbIlVzZXIiLCJTZWN1cml0eSJdLCJDVFMiOiJVc2VyLWN3ayIsIlZMIjoiQWRtaW4iLCJpYXQiOjE0ODY0MjQxMjQsImV4cCI6MTk4NjQyNzcyNH0.vJvbR2jhWmGDli-9jb6Wu7quNrfRKubSij_FbtLgamg';
  // // throw an error (invalid token)
  // local_token = '1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJURENcXHJ5YW4udm9sbG1lciIsIkJBUlMiOlsiVXNlciIsIlNlY3VyaXR5Il0sIkNUUyI6IlVzZXItY3drIiwiVkwiOiJBZG1pbiIsImlhdCI6MTQ4NjQyNDEyNCwiZXhwIjoxOTg2NDI3NzI0fQ.lvzunf24JDCVJgCha7eytDVkfUdvDpStGDFPUEOmC28';
  localStorage.setItem('id_token', local_token);
  // /** END TEST USERS **/

  dispatch(authRequest()); // update fetchCallsInProgress

  // if token exists
  if (local_token) {
    const {sub: sam, BARS: role, exp, iat} = decode(local_token);
    if (debug)
      console.log(`token recieved. exp: ${exp}, iat: ${iat}, sub(sam): ${sam}, BARS(role): ${role}`);
    const now = new Date();
    // if not expired
    if (exp > + now.getTime().toString().substring(0, 10)) {
      // directly dispatch instead of calling api
      if (debug)
        console.log(`SETTING auth from localStorage -> sam: ${sam}, role: ${role}`);
      return dispatch(authSuccess({sam, role}));
    }
  }

  let config = {
    method: 'get',
    credentials: 'include'
  };

  return fetch(AUTH_URL, config).then(response => response.json().then(user => ({user, response}))).then(({user, response}) => {
    if (!response.ok) {
      // If there was a problem, we want to dispatch the error condition
      dispatch(authFailure(user.message));
      return Promise.reject(user);
    } else {
      // If login was successful, set the token in local storage
      localStorage.setItem('id_token', user.id_token);
      const {sub: sam, BARS: role} = decode(user.id_token);
      // Dispatch the success action
      if (debug)
        console.log(`SETTING auth from API -> sam: ${sam}, role: ${role}`);
      dispatch(authSuccess({sam, role}));
    }
  }).catch(err => dispatch(authFailure(err.message)));
};

/**
 * Actions to call authentication (security) api
 * Used to retrieve JWT for authentication
 */
import decode from 'jwt-decode';
import * as types from './actionTypes';

const debug = false;
const AUTH_URL = 'https://sec.api.technology.ca.gov:3001/createToken';

export const authRequest = () => ({type: types.AUTH_REQUEST, isAuthenticated: false});
export const authSuccess = ({name, role}) => ({type: types.AUTH_SUCCESS, isAuthenticated: true, name, role});
export const authFailure = message => ({type: types.AUTH_FAILURE, isAuthenticated: false, message});

export const auth = () => dispatch => {
  // check if token alreday exists in local storage
  let local_token = localStorage.getItem('id_token');
  if (local_token) {
    // if token has not expired
    const {sub: name, BARS: role, exp, iat} = decode(local_token);
    if (debug)
      console.log(`token recieved. exp: ${exp}, iat: ${iat}, sub(name): ${name}, BARS(role): ${role}`);
    const now = new Date();
    // TODO: why is time 3 more than exp?
    if (exp > + now.getTime().toString().substring(0, 10)) {
      // directly dispatch instead of calling api
      if (debug)
        console.log(`SETTING auth from localStorage -> name: ${name}, role: ${role}`);
      return dispatch(authSuccess({name, role}));
    }
  }

  dispatch(authRequest());

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
      const {sub: name, BARS: role} = decode(user.id_token);
      // Dispatch the success action
      if (debug)
        console.log(`SETTING auth from API -> name: ${name}, role: ${role}`);
      dispatch(authSuccess({name, role}));
    }
  }).catch(err => console.log("Error: ", err));
};

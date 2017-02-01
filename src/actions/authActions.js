/**
 * Actions to call authentication (security) api
 * Used to retrieve JWT for authentication
 */
import * as types from './actionTypes';

const AUTH_URL = 'https://sec.api.technology.ca.gov:3001/createToken'; // TODO: change to gloabl based off prod/test?

export const authRequest = () => ({type: types.AUTH_REQUEST, isAuthenticated: false});
export const authSuccess = user => ({type: types.AUTH_SUCCESS, isAuthenticated: true, id_token: user.id_token});
export const authFailure = message => ({type: types.AUTH_FAILURE, isAuthenticated: false, message});

export const authUser = () => dispatch => {
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
      console.log(`SETTING authUser -> id_token: ${user.id_token}`);
      // Dispatch the success action
      dispatch(authSuccess(user));
    }
  }).catch(err => console.log("Error: ", err));
};

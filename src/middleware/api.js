// https://github.com/auth0-blog/redux-auth mock data for testing
import * as mock from '../mock/user';

const BASE_URL = mock.useMock.BARS
  ? 'http://localhost:3001/BARS'
  : 'http://barsapi.technology.ca.gov/api/BadgeRequests';

const debug = 0;

function callApi(endpoint, method, body) {
  let token = localStorage.getItem('id_token') || null;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJURENcXGNocmlzLmt1bW1lciIsIkJBUlMiOlsiVXNlciIsIk1hbmFnZXIiLCJTZWN1cml0eSJdLCJDVFMiOiJVc2VyLWN3ayIsIlZMIjoiQWRtaW4iLCJpYXQiOjE0ODY0MjQxMjQsImV4cCI6MTk4NjQyNzcyNH0.oGNEAw3yHTW8LOggEBE8YCKBM7rVzms18H57gj58MrI';
  if (debug)
    console.log(`api.js:\tCallApi with token : ${token}`);
  let config = {
    method: method || 'get',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if (debug)
    console.log(`api.js:\t\t with config : `, config);
  return fetch(BASE_URL + endpoint, config).then(response => response.json().then(text => ({text, response}))).then(({text, response}) => {
    if (!response.ok) {
      if (debug)
        console.error("error: api.js : failed BARS api call");
      return Promise.reject(text);
    }
    if (debug)
      console.log(`api.js:\tBARS api call success`, text, response);
    return text;
  }).catch(err => console.log(err));
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint, types, method, body} = callAPI;
  const [requestType,
    successType,
    errorType] = types;

  // Passing the authenticated boolean back in our data will let us distinguish
  // between normal and secret quotes
  return callApi(endpoint, method, body).then(response => next({response, type: successType}), error => next({
    error: error.message || 'There was an error.',
    type: errorType
  }));
};

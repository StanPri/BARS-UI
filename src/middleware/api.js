// const BASE_URL = 'http://barsapi.technology.ca.gov/api/BadgeRequests';
const BASE_URL = 'http://localhost:3001/BARS';

const debug = false;

function callApi(endpoint, method) {
  let token = localStorage.getItem('id_token') || null;
  if (debug)
    console.log(`api.js: CallApi with token : ${token}`);
  let config = {
    method: method || 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  return fetch(BASE_URL + endpoint, config).then(response => response.json().then(text => ({text, response}))).then(({text, response}) => {
    if (!response.ok) {
      return Promise.reject(text);
    }
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

  let {endpoint, types, method} = callAPI;
  const [requestType,
    successType,
    errorType] = types;

  // Passing the authenticated boolean back in our data will let us distinguish
  // between normal and secret quotes
  return callApi(endpoint, method).then(response => next({response, type: successType}), error => next({
    error: error.message || 'There was an error.',
    type: errorType
  }));
};

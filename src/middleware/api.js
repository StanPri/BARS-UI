const BASE_URL = 'http://barsapi.technology.ca.gov/api/BadgeRequests';

function callApi(endpoint, authenticated) {

  let token = localStorage.getItem('id_token') || null
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJURENcXFJ5YW4uVm9sbG1lciIsIkJBUlMiOiJVc2VyIiwiQ04iOiJVc2VyIiwiQ1RTIjoiVXNlci1jd2siLCJWTCI6IkFkbWluLWN3ayIsImlhdCI6MTQ4NTgwMzk0NCwiZXhwIjoxNDg1ODA3NTQ0fQ.3QGGg060jqp3_QOM7GSD4G1DxeUdIUpSpoze1zDd5tY';
  let config = {
    method: 'get',
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` }
  };

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text()
      .then(text => ({ text, response }))
    ).then(({ text, response }) => {
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

  let { endpoint, types, authenticated } = callAPI;

  const [ requestType, successType, errorType ] = types;

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  );
};

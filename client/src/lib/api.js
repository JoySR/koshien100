import {API_URL} from '../common/constant'

const api = ({endPoint, method = 'POST', data, request, success, failure}) => {
  const body = {
    token: 'iqag5eqn3e8xn7g3', // FIXME: mock
    ...data
  }

  const tmpData = {
    method,
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer', // *client, no-referrer
  }

  if (method !== 'GET') {
    tmpData.body = JSON.stringify(body);
  }

  return dispatch => {
    dispatch(request());
    return fetch(`${API_URL}${endPoint}`, tmpData).then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json));
        return json;
      })
      .catch(error => dispatch(failure(error)));
  };
}

// Handle HTTP errors since fetch won't.
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default api;
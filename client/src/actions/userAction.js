import {REGISTER, LOG_IN, LOG_OUT} from './actionTypes';
import api from '../lib/api';
import {removeToken, saveToken} from '../lib/token';

export function register(user) {
  return api({
    endPoint: '/register',
    method: 'POST',
    data: user,
    request: registerRequest,
    success: registerSuccess,
    failure: registerFailure,
  });
}

export const registerRequest = () => {
  return {
    type: REGISTER.REQUEST,
  };
};

export const registerSuccess = result => {
  return {
    type: REGISTER.SUCCESS,
    payload: {id: result.id},
  };
};

export const registerFailure = error => {
  return {
    type: REGISTER.FAILURE,
    payload: {error},
  };
};

export function login(user) {
  return api({
    endPoint: '/login',
    method: 'POST',
    data: user,
    request: loginRequest,
    success: loginSuccess,
    failure: loginFailure,
  });
}

export const loginRequest = () => {
  return {
    type: LOG_IN.REQUEST,
  };
};

export const loginSuccess = result => {
  const token = result.token;
  saveToken(token);
  return {
    type: LOG_IN.SUCCESS,
    payload: {token},
  };
};

export const loginFailure = error => {
  return {
    type: LOG_IN.FAILURE,
    payload: {error},
  };
};

export function logout(user) {
  return api({
    endPoint: '/logout',
    method: 'POST',
    data: user,
    request: logoutRequest,
    success: logoutSuccess,
    failure: logoutFailure,
  });
}

export const logoutRequest = () => {
  return {
    type: LOG_OUT.REQUEST,
  };
};

export const logoutSuccess = result => {
  removeToken();
  return {
    type: LOG_OUT.SUCCESS,
    payload: {id: result.id},
  };
};

export const logoutFailure = error => {
  return {
    type: LOG_OUT.FAILURE,
    payload: {error},
  };
};

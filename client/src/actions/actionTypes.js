import createRequestTypes from '../lib/createRequestType'

export const ADD_AREA = createRequestTypes('ADD_AREA');
export const FETCH_AREA = createRequestTypes('FETCH_AREA');
export const UPDATE_AREA = createRequestTypes('UPDATE_AREA');
export const REMOVE_AREA = createRequestTypes('REMOVE_AREA');

export const ADD_PREFECTURE = createRequestTypes('ADD_PREFECTURE');
export const FETCH_PREFECTURE = createRequestTypes('FETCH_PREFECTURE');
export const UPDATE_PREFECTURE = createRequestTypes('UPDATE_PREFECTURE');
export const REMOVE_PREFECTURE = createRequestTypes('REMOVE_PREFECTURE');

export const ADD_USER = 'ADD_USER';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

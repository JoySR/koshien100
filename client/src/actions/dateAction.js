import {
  ADD_DATE,
  FETCH_DATES,
  REMOVE_DATE,
  UPDATE_DATE,
  SET_CURRENT_DATE,
} from './actionTypes';
import api from '../lib/api';

export function addDate(date) {
  return api({
    endPoint: '/date',
    method: 'POST',
    data: date,
    request: addDateRequest,
    success: addDateSuccess,
    failure: addDateFailure,
  });
}

export const addDateRequest = () => {
  return {
    type: ADD_DATE.REQUEST,
  };
};

export const addDateSuccess = result => {
  return {
    type: ADD_DATE.SUCCESS,
    payload: {id: result.id},
  };
};

export const addDateFailure = error => {
  return {
    type: ADD_DATE.FAILURE,
    payload: {error},
  };
};

export function fetchDates() {
  return api({
    endPoint: '/dates',
    method: 'GET',
    request: fetchDatesRequest,
    success: fetchDatesSuccess,
    failure: fetchDatesFailure,
  });
}

export const fetchDatesRequest = () => {
  return {
    type: FETCH_DATES.REQUEST,
  };
};

export const fetchDatesSuccess = result => {
  return {
    type: FETCH_DATES.SUCCESS,
    payload: {dates: result.dates},
  };
};

export const fetchDatesFailure = error => {
  return {
    type: FETCH_DATES.FAILURE,
    payload: {error},
  };
};

export function updateDate(date) {
  return api({
    endPoint: '/date',
    method: 'PUT',
    data: date,
    request: updateDateRequest,
    success: updateDateSuccess,
    failure: updateDateFailure,
  });
}

export const updateDateRequest = () => {
  return {
    type: UPDATE_DATE.REQUEST,
  };
};

export const updateDateSuccess = result => {
  return {
    type: UPDATE_DATE.SUCCESS,
    payload: {id: result.id},
  };
};

export const updateDateFailure = error => {
  return {
    type: UPDATE_DATE.FAILURE,
    payload: {error},
  };
};

export function removeDate(date) {
  return api({
    endPoint: '/date',
    method: 'DELETE',
    data: date,
    request: removeDateRequest,
    success: removeDateSuccess,
    failure: removeDateFailure,
  });
}

export const removeDateRequest = () => {
  return {
    type: REMOVE_DATE.REQUEST,
  };
};

export const removeDateSuccess = result => {
  return {
    type: REMOVE_DATE.SUCCESS,
    payload: {id: result.id},
  };
};

export const removeDateFailure = error => {
  return {
    type: REMOVE_DATE.FAILURE,
    payload: {error},
  };
};

export const setCurrentDate = dateId => {
  return {
    type: SET_CURRENT_DATE,
    payload: {dateId},
  };
};

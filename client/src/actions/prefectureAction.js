import {
  ADD_PREFECTURE,
  FETCH_PREFECTURE,
  REMOVE_PREFECTURE,
  UPDATE_PREFECTURE,
} from './actionTypes';
import api from '../lib/api';

export function addPrefecture(prefecture) {
  return api({
    endPoint: '/prefecture',
    method: 'POST',
    data: prefecture,
    request: addPrefectureRequest,
    success: addPrefectureSuccess,
    failure: addPrefectureFailure,
  });
}

export const addPrefectureRequest = () => {
  return {
    type: ADD_PREFECTURE.REQUEST,
  };
};

export const addPrefectureSuccess = result => {
  return {
    type: ADD_PREFECTURE.SUCCESS,
    payload: {id: result.id},
  };
};

export const addPrefectureFailure = error => {
  return {
    type: ADD_PREFECTURE.FAILURE,
    payload: {error},
  };
};

export function fetchPrefecture() {
  return api({
    endPoint: '/prefectures',
    method: 'GET',
    request: fetchPrefectureRequest,
    success: fetchPrefectureSuccess,
    failure: fetchPrefectureFailure,
  });
}

export const fetchPrefectureRequest = () => {
  return {
    type: FETCH_PREFECTURE.REQUEST,
  };
};

export const fetchPrefectureSuccess = result => {
  return {
    type: FETCH_PREFECTURE.SUCCESS,
    payload: {prefectures: result.prefectures},
  };
};

export const fetchPrefectureFailure = error => {
  return {
    type: FETCH_PREFECTURE.FAILURE,
    payload: {error},
  };
};

export function updatePrefecture(prefecture) {
  return api({
    endPoint: '/prefecture',
    method: 'PUT',
    data: prefecture,
    request: updatePrefectureRequest,
    success: updatePrefectureSuccess,
    failure: updatePrefectureFailure,
  });
}

export const updatePrefectureRequest = () => {
  return {
    type: UPDATE_PREFECTURE.REQUEST,
  };
};

export const updatePrefectureSuccess = result => {
  return {
    type: UPDATE_PREFECTURE.SUCCESS,
    payload: {id: result.id},
  };
};

export const updatePrefectureFailure = error => {
  return {
    type: UPDATE_PREFECTURE.FAILURE,
    payload: {error},
  };
};

export function removePrefecture(prefecture) {
  return api({
    endPoint: '/prefecture',
    method: 'DELETE',
    data: prefecture,
    request: removePrefectureRequest,
    success: removePrefectureSuccess,
    failure: removePrefectureFailure,
  });
}

export const removePrefectureRequest = () => {
  return {
    type: REMOVE_PREFECTURE.REQUEST,
  };
};

export const removePrefectureSuccess = result => {
  return {
    type: REMOVE_PREFECTURE.SUCCESS,
    payload: {id: result.id},
  };
};

export const removePrefectureFailure = error => {
  return {
    type: REMOVE_PREFECTURE.FAILURE,
    payload: {error},
  };
};

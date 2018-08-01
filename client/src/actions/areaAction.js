import {ADD_AREA, FETCH_AREA, REMOVE_AREA, UPDATE_AREA} from './actionTypes'
import api from '../lib/api'

export function addArea(area) {
  return api({
    endPoint: '/area',
    method: 'POST',
    data: area,
    request: addAreaRequest,
    success: addAreaSuccess,
    failure: addAreaFailure,
  })
}

export const addAreaRequest = () => {
  return {
    type: ADD_AREA.REQUEST,
  }
}

export const addAreaSuccess = (result) => {
  return {
    type: ADD_AREA.SUCCESS,
    payload: { id: result.id }
  }
}

export const addAreaFailure = (error) => {
  return {
    type: ADD_AREA.FAILURE,
    payload: { error }
  }
}

export function fetchArea() {
  return api({
    endPoint: '/area',
    method: 'GET',
    request: fetchAreaRequest,
    success: fetchAreaSuccess,
    failure: fetchAreaFailure,
  })
}

export const fetchAreaRequest = () => {
  return {
    type: FETCH_AREA.REQUEST,
  }
}

export const fetchAreaSuccess = (result) => {
  return {
    type: FETCH_AREA.SUCCESS,
    payload: { areas: result.areas }
  }
}

export const fetchAreaFailure = (error) => {
  return {
    type: FETCH_AREA.FAILURE,
    payload: { error }
  }
}

export function updateArea(area) {
  return api({
    endPoint: '/area',
    method: 'PUT',
    data: area,
    request: updateAreaRequest,
    success: updateAreaSuccess,
    failure: updateAreaFailure,
  })
}

export const updateAreaRequest = () => {
  return {
    type: UPDATE_AREA.REQUEST,
  }
}

export const updateAreaSuccess = (result) => {
  return {
    type: UPDATE_AREA.SUCCESS,
    payload: { id: result.id }
  }
}

export const updateAreaFailure = (error) => {
  return {
    type: UPDATE_AREA.FAILURE,
    payload: { error }
  }
}

export function removeArea(area) {
  return api({
    endPoint: '/area',
    method: 'DELETE',
    data: area,
    request: removeAreaRequest,
    success: removeAreaSuccess,
    failure: removeAreaFailure,
  })
}

export const removeAreaRequest = () => {
  return {
    type: REMOVE_AREA.REQUEST,
  }
}

export const removeAreaSuccess = (result) => {
  return {
    type: REMOVE_AREA.SUCCESS,
    payload: { id: result.id }
  }
}

export const removeAreaFailure = (error) => {
  return {
    type: REMOVE_AREA.FAILURE,
    payload: { error }
  }
}

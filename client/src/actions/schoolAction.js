import {ADD_SCHOOL, FETCH_SCHOOLS, REMOVE_SCHOOL, UPDATE_SCHOOL} from './actionTypes'
import api from '../lib/api'

export function addSchool(school) {
  return api({
    endPoint: '/school',
    method: 'POST',
    data: school,
    request: addSchoolRequest,
    success: addSchoolSuccess,
    failure: addSchoolFailure,
  })
}

export const addSchoolRequest = () => {
  return {
    type: ADD_SCHOOL.REQUEST,
  }
}

export const addSchoolSuccess = (result) => {
  return {
    type: ADD_SCHOOL.SUCCESS,
    payload: { id: result.id }
  }
}

export const addSchoolFailure = (error) => {
  return {
    type: ADD_SCHOOL.FAILURE,
    payload: { error }
  }
}

export function fetchSchools() {
  return api({
    endPoint: '/schools',
    method: 'GET',
    request: fetchSchoolsRequest,
    success: fetchSchoolsSuccess,
    failure: fetchSchoolsFailure,
  })
}

export const fetchSchoolsRequest = () => {
  return {
    type: FETCH_SCHOOLS.REQUEST,
  }
}

export const fetchSchoolsSuccess = (result) => {
  return {
    type: FETCH_SCHOOLS.SUCCESS,
    payload: { schools: result.schools }
  }
}

export const fetchSchoolsFailure = (error) => {
  return {
    type: FETCH_SCHOOLS.FAILURE,
    payload: { error }
  }
}

export function updateSchool(school) {
  return api({
    endPoint: '/school',
    method: 'PUT',
    data: school,
    request: updateSchoolRequest,
    success: updateSchoolSuccess,
    failure: updateSchoolFailure,
  })
}

export const updateSchoolRequest = () => {
  return {
    type: UPDATE_SCHOOL.REQUEST,
  }
}

export const updateSchoolSuccess = (result) => {
  return {
    type: UPDATE_SCHOOL.SUCCESS,
    payload: { id: result.id }
  }
}

export const updateSchoolFailure = (error) => {
  return {
    type: UPDATE_SCHOOL.FAILURE,
    payload: { error }
  }
}

export function removeSchool(school) {
  return api({
    endPoint: '/school',
    method: 'DELETE',
    data: school,
    request: removeSchoolRequest,
    success: removeSchoolSuccess,
    failure: removeSchoolFailure,
  })
}

export const removeSchoolRequest = () => {
  return {
    type: REMOVE_SCHOOL.REQUEST,
  }
}

export const removeSchoolSuccess = (result) => {
  return {
    type: REMOVE_SCHOOL.SUCCESS,
    payload: { id: result.id }
  }
}

export const removeSchoolFailure = (error) => {
  return {
    type: REMOVE_SCHOOL.FAILURE,
    payload: { error }
  }
}

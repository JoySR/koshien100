import {ADD_GAME, FETCH_GAMES, REMOVE_GAME, UPDATE_GAME} from './actionTypes'
import api from '../lib/api'

export function addGame(game) {
  return api({
    endPoint: '/game',
    method: 'POST',
    data: game,
    request: addGameRequest,
    success: addGameSuccess,
    failure: addGameFailure,
  })
}

export const addGameRequest = () => {
  return {
    type: ADD_GAME.REQUEST,
  }
}

export const addGameSuccess = (result) => {
  return {
    type: ADD_GAME.SUCCESS,
    payload: { id: result.id }
  }
}

export const addGameFailure = (error) => {
  return {
    type: ADD_GAME.FAILURE,
    payload: { error }
  }
}

export function fetchGames() {
  return api({
    endPoint: '/games',
    method: 'GET',
    request: fetchGamesRequest,
    success: fetchGamesSuccess,
    failure: fetchGamesFailure,
  })
}

export const fetchGamesRequest = () => {
  return {
    type: FETCH_GAMES.REQUEST,
  }
}

export const fetchGamesSuccess = (result) => {
  return {
    type: FETCH_GAMES.SUCCESS,
    payload: { games: result.games }
  }
}

export const fetchGamesFailure = (error) => {
  return {
    type: FETCH_GAMES.FAILURE,
    payload: { error }
  }
}

export function updateGame(game) {
  return api({
    endPoint: '/game',
    method: 'PUT',
    data: game,
    request: updateGameRequest,
    success: updateGameSuccess,
    failure: updateGameFailure,
  })
}

export const updateGameRequest = () => {
  return {
    type: UPDATE_GAME.REQUEST,
  }
}

export const updateGameSuccess = (result) => {
  return {
    type: UPDATE_GAME.SUCCESS,
    payload: { id: result.id }
  }
}

export const updateGameFailure = (error) => {
  return {
    type: UPDATE_GAME.FAILURE,
    payload: { error }
  }
}

export function removeGame(game) {
  return api({
    endPoint: '/game',
    method: 'DELETE',
    data: game,
    request: removeGameRequest,
    success: removeGameSuccess,
    failure: removeGameFailure,
  })
}

export const removeGameRequest = () => {
  return {
    type: REMOVE_GAME.REQUEST,
  }
}

export const removeGameSuccess = (result) => {
  return {
    type: REMOVE_GAME.SUCCESS,
    payload: { id: result.id }
  }
}

export const removeGameFailure = (error) => {
  return {
    type: REMOVE_GAME.FAILURE,
    payload: { error }
  }
}

import {ADD_GAME, FETCH_GAMES} from '../actions/actionTypes'

const gameInitialState = {};

const gameReducer = (state=gameInitialState, action) => {
  switch (action.type) {
    case ADD_GAME.SUCCESS:
      return {
        ...state,
        newGameId: action.payload.id,
      }
    case FETCH_GAMES.SUCCESS:
      return {
        ...state,
        list: action.payload.games
      }
    default:
      return state;
  }
}

export default gameReducer

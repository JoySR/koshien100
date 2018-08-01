import {ADD_AREA, FETCH_AREA} from '../actions/actionTypes'

const areaInitialState = {};

const areaReducer = (state=areaInitialState, action) => {
  switch (action.type) {
    case ADD_AREA.SUCCESS:
      return {
        ...state,
        newAreaId: action.payload.id,
      }
    case FETCH_AREA.SUCCESS:
      return {
        ...state,
        list: action.payload.areas
      }
    default:
      return state;
  }
}

export default areaReducer

import {ADD_DATE, FETCH_DATES, SET_CURRENT_DATE} from '../actions/actionTypes'

const dateInitialState = {};

const dateReducer = (state=dateInitialState, action) => {
  switch (action.type) {
    case ADD_DATE.SUCCESS:
      return {
        ...state,
        newDateId: action.payload.id,
      }
    case FETCH_DATES.SUCCESS:
      return {
        ...state,
        list: action.payload.dates
      }
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDateId: `${action.payload.dateId}`
      }
    default:
      return state;
  }
}

export default dateReducer

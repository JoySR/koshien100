import {ADD_DATE, FETCH_DATES} from '../actions/actionTypes'

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
    default:
      return state;
  }
}

export default dateReducer

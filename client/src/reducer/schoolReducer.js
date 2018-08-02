import {ADD_SCHOOL, FETCH_SCHOOLS} from '../actions/actionTypes'

const schoolInitialState = {};

const schoolReducer = (state=schoolInitialState, action) => {
  switch (action.type) {
    case ADD_SCHOOL.SUCCESS:
      return {
        ...state,
        newSchoolId: action.payload.id,
      }
    case FETCH_SCHOOLS.SUCCESS:
      return {
        ...state,
        list: action.payload.schools
      }
    default:
      return state;
  }
}

export default schoolReducer

import {ADD_PREFECTURE, FETCH_PREFECTURE} from '../actions/actionTypes'

const prefectureInitialState = {};

const prefectureReducer = (state=prefectureInitialState, action) => {
  switch (action.type) {
    case ADD_PREFECTURE.SUCCESS:
      return {
        ...state,
        newPrefectureId: action.payload.id,
      }
    case FETCH_PREFECTURE.SUCCESS:
      return {
        ...state,
        list: action.payload.prefectures
      }
    default:
      return state;
  }
}

export default prefectureReducer

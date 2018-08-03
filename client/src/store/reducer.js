import { combineReducers } from 'redux';
import areaReducer from '../reducer/areaReducer';
import prefectureReducer from '../reducer/prefectureReducer';
import dateReducer from '../reducer/dateReducer';
import schoolReducer from '../reducer/schoolReducer'
import gameReducer from '../reducer/gameReducer'
import userReducer from '../reducer/userReducer'

export const makeRootReducer = (asyncReducers) => {

  return combineReducers({
    area: areaReducer,
    prefecture: prefectureReducer,
    date: dateReducer,
    school: schoolReducer,
    game: gameReducer,
    user: userReducer,
    ...asyncReducers
  });
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;

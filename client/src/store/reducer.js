import { combineReducers } from 'redux';
import areaReducer from '../reducer/areaReducer';
import prefectureReducer from '../reducer/prefectureReducer';
import dateReducer from '../reducer/dateReducer';

export const makeRootReducer = (asyncReducers) => {

  return combineReducers({
    area: areaReducer,
    prefecture: prefectureReducer,
    date: dateReducer,
    ...asyncReducers
  });
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;

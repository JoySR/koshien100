import { combineReducers } from 'redux';
import areaReducer from '../reducer/areaReducer';

export const makeRootReducer = (asyncReducers) => {

  return combineReducers({
    area: areaReducer,
    ...asyncReducers
  });
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;

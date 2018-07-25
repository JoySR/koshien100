import { combineReducers } from 'redux';
import userReducer from '../reducer/userReducer';

export const makeRootReducer = (asyncReducers) => {

  return combineReducers({
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
